// lib/otp-store.ts
// Database-backed OTP store for admin verification
import { sql } from './db'

const OTP_EXPIRY_MINUTES = 10

export async function saveOtp(email: string, otp: string, expiryMs: number) {
  // Delete any existing OTPs for this email
  await sql`DELETE FROM admin_otps WHERE email = ${email}`
  
  // Calculate expiry timestamp
  const expiresAt = new Date(Date.now() + expiryMs)
  
  // Insert new OTP
  await sql`
    INSERT INTO admin_otps (email, otp, expires_at) 
    VALUES (${email}, ${otp}, ${expiresAt})
  `
}

export async function getOtp(email: string): Promise<string | null> {
  // Clean up expired OTPs first
  await sql`DELETE FROM admin_otps WHERE expires_at < NOW()`
  
  // Get the latest valid OTP for this email
  const result = await sql`
    SELECT otp 
    FROM admin_otps 
    WHERE email = ${email} 
      AND expires_at > NOW() 
      AND used = FALSE 
    ORDER BY created_at DESC 
    LIMIT 1
  `
  
  if (result.length === 0) {
    return null
  }
  
  return result[0].otp
}

export async function clearOtp(email: string) {
  await sql`DELETE FROM admin_otps WHERE email = ${email}`
}

export async function verifyOtp(email: string, otp: string): Promise<boolean> {
  // Clean up expired OTPs first
  await sql`DELETE FROM admin_otps WHERE expires_at < NOW()`
  
  // Check if OTP is valid
  const result = await sql`
    SELECT id 
    FROM admin_otps 
    WHERE email = ${email} 
      AND otp = ${otp} 
      AND expires_at > NOW() 
      AND used = FALSE
  `
  
  if (result.length === 0) {
    return false
  }
  
  // Mark OTP as used
  await sql`UPDATE admin_otps SET used = TRUE WHERE id = ${result[0].id}`
  
  return true
}