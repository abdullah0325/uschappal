import { sql, initializeDatabase } from "@/lib/db"
import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"

export async function GET() {
  try {
    await initializeDatabase()

    const result = await sql`SELECT COUNT(*) as count FROM products`
    return new NextResponse(JSON.stringify({ count: Number.parseInt(result[0].count) }), {
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
        "Pragma": "no-cache",
        "Expires": "0",
        "Surrogate-Control": "no-store",
      },
    })
  } catch (error) {
    console.error("Error counting products:", error)
    return NextResponse.json({ error: "Failed to count products" }, { status: 500 })
  }
}
