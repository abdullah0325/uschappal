import { sql } from "@/lib/db"
import { type NextRequest, NextResponse } from "next/server"

export const dynamic = "force-dynamic"

export async function GET() {
  try {
    const products = await sql`
      SELECT * FROM products 
      ORDER BY created_at DESC
    `
    return new NextResponse(JSON.stringify({ products }), {
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
        "Pragma": "no-cache",
        "Expires": "0",
        "Surrogate-Control": "no-store",
      },
    })
  } catch (error) {
    console.error("Error fetching products:", error)
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
  const { name, description, price, image_url, category, size, color, stock_quantity, is_featured, is_active } = body

    if (!name || !price) {
      return NextResponse.json({ error: "Name and price are required" }, { status: 400 })
    }

    const result = await sql`
      INSERT INTO products (
        name, description, price, image_url, category, size, color, stock_quantity, is_featured, is_active
      )
      VALUES (
        ${name}, ${description}, ${Number.parseFloat(price)}, ${image_url}, ${category}, 
        ${size}, ${color}, ${Number.parseInt(stock_quantity) || 0}, ${is_featured || false}, ${is_active ?? true}
      )
      RETURNING *
    `

    return NextResponse.json({
      success: true,
      product: result[0],
      message: "Product created successfully",
    })
  } catch (error) {
    console.error("Error creating product:", error)
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 })
  }
}
