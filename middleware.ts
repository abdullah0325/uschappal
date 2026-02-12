import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  console.log("[v0] Middleware checking path:", request.nextUrl.pathname)
  
  // Check if the request is for admin dashboard routes
  if (request.nextUrl.pathname.startsWith("/admin/dashboard")) {
    const sessionToken = request.cookies.get("admin-session")?.value
    console.log("[v0] Session token:", sessionToken)

    // Simple session validation - in production, use proper JWT validation
    if (!sessionToken || sessionToken !== "admin-session-token") {
      console.log("[v0] Redirecting to /admin due to invalid session")
      return NextResponse.redirect(new URL("/admin", request.url))
    }
    
    console.log("[v0] Session valid, allowing access to dashboard")
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/dashboard(.*)"],
}
