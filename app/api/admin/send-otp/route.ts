import nodemailer from "nodemailer"
import crypto from "crypto"
import { NextResponse } from "next/server"
import { saveOtp } from "@/lib/otp-store"

const RATE_LIMIT_WINDOW = 60 * 1000 // 1 min
const OTP_EXPIRY = 10 * 60 * 1000 // 10 min
const ADMIN_EMAIL = "uschappal@gmail.com"

let lastRequestTime = 0

export async function POST(request: Request) {
  const now = Date.now()
  if (now - lastRequestTime < RATE_LIMIT_WINDOW) {
    return NextResponse.json({ error: "Please wait before requesting another code." }, { status: 429 })
  }
  lastRequestTime = now

  // Generate secure 6-digit OTP
  const otp = crypto.randomInt(100000, 999999).toString()
  await saveOtp(ADMIN_EMAIL, otp, OTP_EXPIRY)

  try {
    // Send OTP via Gmail
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: ADMIN_EMAIL,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    })

    await transporter.sendMail({
      from: `US Chappal Admin <${ADMIN_EMAIL}>`,
      to: ADMIN_EMAIL,
      subject: "Your US Chappal Admin Verification Code",
      text: `Your verification code is: ${otp}\nThis code expires in 10 minutes.`,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error sending OTP:", error)
    return NextResponse.json({ error: "Failed to send OTP email" }, { status: 500 })
  }
}