import { NextResponse } from "next/server"
import { verifyOtp } from "@/lib/otp-store"

const ADMIN_EMAIL = "uschappal@gmail.com"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { otp } = body

    if (!otp) {
      return NextResponse.json({ error: "OTP is required", verified: false }, { status: 400 })
    }

    const isValid = await verifyOtp(ADMIN_EMAIL, otp)

    if (isValid) {
      return NextResponse.json({ verified: true })
    } else {
      return NextResponse.json({ error: "Invalid or expired OTP", verified: false }, { status: 400 })
    }
  } catch (error) {
    console.error("Error verifying OTP:", error)
    return NextResponse.json({ error: "Failed to verify OTP", verified: false }, { status: 500 })
  }
}