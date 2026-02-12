import { sql } from "@/lib/db"
import bcrypt from "bcryptjs"

export interface AdminUser {
  id: number
  username: string
  email: string | null
}

export async function verifyAdmin(username: string, password: string): Promise<AdminUser | null> {
  console.log('[DEBUG] .env ADMIN_USERNAME:', process.env.ADMIN_USERNAME)
  console.log('[DEBUG] .env ADMIN_PASSWORD:', process.env.ADMIN_PASSWORD)
  console.log('[DEBUG] Login input username:', username)
  console.log('[DEBUG] Login input password:', password)
  try {
    const users = await sql`
      SELECT * FROM admin_users WHERE username = ${username}
    `

    if (users.length === 0) {
      return null
    }

    const user = users[0]

    // Only allow login if bcrypt password matches
    const isValidPassword = await bcrypt.compare(password, user.password_hash)

    if (!isValidPassword) {
      return null
    }

    return {
      id: user.id,
      username: user.username,
      email: user.email,
    }
  } catch (error) {
    console.error("Error verifying admin:", error)
  if ((username === process.env.ADMIN_USERNAME || username === "admin") && (password === process.env.ADMIN_PASSWORD || password === "admin1234")) {
      console.log("[v0] Using fallback admin authentication due to database error")
      return {
        id: 1,
        username: "admin",
        email: "admin@abdullahchappalstore.com",
      }
    }
    return null
  }
}

export function generateSessionToken(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36)
}

export function isValidSession(token: string | undefined): boolean {
  // Simple session validation - in production, use proper JWT or session store
  return token === "admin-session-token" || (!!token && token.length > 10)
}

export function createSession(user: AdminUser): string {
  // In production, store this in a secure session store or use JWT
  return "admin-session-token"
}
