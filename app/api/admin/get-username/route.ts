import { NextResponse } from "next/server"
import { sql } from "@/lib/db"

const ADMIN_EMAIL = "uschappal@gmail.com"

export async function GET() {
  try {
    const result = await sql`
      SELECT username FROM admin_users WHERE email = ${ADMIN_EMAIL}
    `
    if (result.length === 0) {
      return NextResponse.json({ username: "" })
    }
    return NextResponse.json({ username: result[0].username })
  } catch (error) {
    return NextResponse.json({ username: "" })
  }
}
