import { NextResponse } from "next/server"
import { z } from "zod"

import {
  createAdminSession,
  CSRF_COOKIE_NAME,
  SESSION_COOKIE_NAME,
  SESSION_TTL_SECONDS,
} from "@/lib/admin-auth"
import { apiError, HttpError, readJsonBody, requireSameOrigin } from "@/lib/security"

const loginSchema = z.object({
  username: z.string().trim().min(1).max(64),
  password: z.string().min(1).max(256),
})

export async function POST(request: Request) {
  try {
    requireSameOrigin(request)
    const input = loginSchema.parse(await readJsonBody(request, 1_024))
    const session = await createAdminSession(input.username, input.password)
    if (!session) throw new HttpError(401, "Usuario o contraseña incorrectos")

    const response = NextResponse.json({
      user: { username: session.username },
      csrfToken: session.csrfToken,
    })
    const secure = new URL(request.url).protocol === "https:"
    const cookieOptions = {
      httpOnly: true,
      secure,
      sameSite: "strict" as const,
      path: "/",
      maxAge: SESSION_TTL_SECONDS,
      priority: "high" as const,
    }
    response.cookies.set(SESSION_COOKIE_NAME, session.sessionToken, cookieOptions)
    response.cookies.set(CSRF_COOKIE_NAME, session.csrfToken, cookieOptions)
    response.headers.set("Cache-Control", "private, no-store")
    return response
  } catch (error) {
    return apiError(error)
  }
}
