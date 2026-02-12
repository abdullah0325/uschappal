import { sql, initializeDatabase } from "@/lib/db"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    await initializeDatabase()

    const body = await request.json()
    const {
      customer_name,
      customer_email,
      customer_phone,
      customer_address,
      city,
      total_amount,
      payment_method,
      notes,
      items,
    } = body

    // Validate required fields
    if (
      !customer_name ||
      !customer_phone ||
      !customer_address ||
      !city ||
      !total_amount ||
      !items ||
      items.length === 0
    ) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Create the order
    const orderResult = await sql`
      INSERT INTO orders (
        customer_name, customer_email, customer_phone, customer_address, 
        city, total_amount, payment_method, notes, status
      )
      VALUES (
        ${customer_name}, ${customer_email}, ${customer_phone}, ${customer_address},
        ${city}, ${total_amount}, ${payment_method || "cash_on_delivery"}, ${notes}, 'pending'
      )
      RETURNING id
    `

    const orderId = orderResult[0].id

    // Insert order items
    for (const item of items) {
      await sql`
        INSERT INTO order_items (
          order_id, product_id, product_name, product_price, quantity, size, color
        )
        VALUES (
          ${orderId}, ${item.id}, ${item.name}, ${item.price}, ${item.quantity}, ${item.size}, ${item.color}
        )
      `
    }

    // Update product stock quantities
    for (const item of items) {
      await sql`
        UPDATE products 
        SET stock_quantity = stock_quantity - ${item.quantity}
        WHERE id = ${item.id}
      `
    }

    return NextResponse.json({
      success: true,
      orderId,
      message: "Order placed successfully!",
    })
  } catch (error) {
    console.error("Error creating order:", error)
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    await initializeDatabase()

    const { searchParams } = new URL(request.url)
    const orderId = searchParams.get("id")

    if (orderId) {
      // Get specific order with items
      const order = await sql`
        SELECT * FROM orders WHERE id = ${Number.parseInt(orderId)}
      `

      if (order.length === 0) {
        return NextResponse.json({ error: "Order not found" }, { status: 404 })
      }

      const orderItems = await sql`
        SELECT * FROM order_items WHERE order_id = ${Number.parseInt(orderId)}
      `

      return NextResponse.json({
        order: order[0],
        items: orderItems,
      })
    }

    // Get all orders (for admin)
    const orders = await sql`
      SELECT o.*, COUNT(oi.id) as item_count
      FROM orders o
      LEFT JOIN order_items oi ON o.id = oi.order_id
      GROUP BY o.id
      ORDER BY o.created_at DESC
    `

    return NextResponse.json({ orders })
  } catch (error) {
    console.error("Error fetching orders:", error)
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    await initializeDatabase()

    const { searchParams } = new URL(request.url)
    const orderId = searchParams.get("id")

    if (!orderId) {
      return NextResponse.json({ error: "Order ID is required" }, { status: 400 })
    }

    // First, get the order items to restore stock
    const orderItems = await sql`
      SELECT product_id, quantity FROM order_items WHERE order_id = ${Number.parseInt(orderId)}
    `

    // Restore stock quantities for each item
    for (const item of orderItems) {
      await sql`
        UPDATE products 
        SET stock_quantity = stock_quantity + ${item.quantity}
        WHERE id = ${item.product_id}
      `
    }

    // Delete the order (order_items will be deleted automatically due to CASCADE)
    await sql`
      DELETE FROM orders WHERE id = ${Number.parseInt(orderId)}
    `

    return NextResponse.json({
      success: true,
      message: "Order deleted successfully",
    })
  } catch (error) {
    console.error("Error deleting order:", error)
    return NextResponse.json({ error: "Failed to delete order" }, { status: 500 })
  }
}
