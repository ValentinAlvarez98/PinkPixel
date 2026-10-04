import { requireAdminSession } from "@/lib/admin-auth"
import { apiError } from "@/lib/security"

export async function GET(request: Request) {
  try {
    const session = await requireAdminSession(request)
    return Response.json(
      { user: { username: session.username }, csrfToken: session.csrfToken },
      { headers: { "Cache-Control": "private, no-store" } },
    )
  } catch (error) {
    return apiError(error)
  }
}
