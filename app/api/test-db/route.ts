import { sql } from "@/lib/db"

export async function GET() {
  try {
    console.log("Testing database connection...")
    
    // Test basic connection
    const result = await sql`SELECT 1 as test`
    console.log("Basic connection test:", result)
    
    // Test products table
    const products = await sql`SELECT COUNT(*) as count FROM products`
    console.log("Products count:", products)
    
    // Get all products
    const allProducts = await sql`SELECT * FROM products ORDER BY created_at DESC`
    console.log("All products:", allProducts)
    
    return Response.json({
      success: true,
      basicTest: result,
      productCount: products,
      allProducts: allProducts
    })
  } catch (error) {
    console.error("Database test error:", error)
    return Response.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
