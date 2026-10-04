import { NextResponse } from "next/server"

import { CSRF_COOKIE_NAME, deleteAdminSession, SESSION_COOKIE_NAME } from "@/lib/admin-auth"
import { apiError } from "@/lib/security"

export async function POST(request: Request) {
  try {
    await deleteAdminSession(request)
    const response = new NextResponse(null, { status: 204 })
    const secure = new URL(request.url).protocol === "https:"
    const cookieOptions = {
      httpOnly: true,
      secure,
      sameSite: "strict" as const,
      path: "/",
      maxAge: 0,
      expires: new Date(0),
      priority: "high" as const,
    }
    response.cookies.set(SESSION_COOKIE_NAME, "", cookieOptions)
    response.cookies.set(CSRF_COOKIE_NAME, "", cookieOptions)
    response.headers.set("Cache-Control", "private, no-store")
    return response
  } catch (error) {
    return apiError(error)
  }
}
