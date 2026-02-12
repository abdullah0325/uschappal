import { sql } from "@/lib/db"
import { type NextRequest, NextResponse } from "next/server"

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()
  const { name, description, price, image_url, category, size, color, stock_quantity, is_featured, is_active } = body

    const productId = Number.parseInt(params.id)

    if (!name || !price) {
      return NextResponse.json({ error: "Name and price are required" }, { status: 400 })
    }

    const result = await sql`
      UPDATE products 
      SET 
        name = ${name},
        description = ${description},
        price = ${Number.parseFloat(price)},
        image_url = ${image_url},
        category = ${category},
        size = ${size},
        color = ${color},
        stock_quantity = ${Number.parseInt(stock_quantity) || 0},
        is_featured = ${is_featured || false},
        is_active = ${is_active ?? true},
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ${productId}
      RETURNING *
    `

    if (result.length === 0) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      product: result[0],
      message: "Product updated successfully",
    })
  } catch (error) {
    console.error("Error updating product:", error)
    return NextResponse.json({ error: "Failed to update product" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const productId = Number.parseInt(params.id)

    await sql`DELETE FROM products WHERE id = ${productId}`

    return NextResponse.json({
      success: true,
      message: "Product deleted successfully",
    })
  } catch (error) {
    console.error("Error deleting product:", error)
    return NextResponse.json({ error: "Failed to delete product" }, { status: 500 })
  }
}
