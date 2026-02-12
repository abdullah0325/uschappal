import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { clearOtp } from "@/lib/otp-store"
import { sql } from "@/lib/db"

const ADMIN_EMAIL = "uschappal@gmail.com"

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const { username, password } = body

    if (!username || !password) {
      return NextResponse.json({ error: "Username and password are required", success: false }, { status: 400 })
    }

    // Validate password strength
    if (password.length < 8) {
      return NextResponse.json({ error: "Password must be at least 8 characters", success: false }, { status: 400 })
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Update admin credentials in database
    const result = await sql`
      UPDATE admin_users 
      SET username = ${username}, password_hash = ${hashedPassword}
      WHERE email = ${ADMIN_EMAIL}
      RETURNING *
    `

    if (result.length === 0) {
      console.error("No admin user found to update for email:", ADMIN_EMAIL)
      return NextResponse.json({ error: "No admin user found to update", success: false }, { status: 404 })
    }

    console.log("Admin credentials updated successfully for:", result[0])

    // Clear the OTP after successful update
    await clearOtp(ADMIN_EMAIL)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error updating credentials:", error)
    return NextResponse.json({ error: "Failed to update credentials", success: false }, { status: 500 })
  }
}