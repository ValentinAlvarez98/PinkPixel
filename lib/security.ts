import "server-only"

import { z } from "zod"

const imagePathPattern = /^\/assets\/trabajos\/[a-z0-9-]+\/(?:cover|full-[1-9][0-9]*)\.webp$/

export const productCreateSchema = z.object({
  slug: z.string().trim().min(3).max(80).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  name: z.string().trim().min(2).max(100),
  category: z.string().trim().min(2).max(50),
  description: z.string().trim().min(10).max(300),
  imageSrc: z.string().trim().max(180).regex(imagePathPattern),
  sortOrder: z.number().int().min(0).max(10_000),
})

export const productUpdateSchema = productCreateSchema.partial().refine(
  (value) => Object.keys(value).length > 0,
  "At least one field is required",
)

export const metricSchema = z.object({
  event: z.enum(["page_view", "gallery_open", "product_whatsapp", "contact_email"]),
  target: z.string().trim().max(80).regex(/^[a-z0-9-]*$/).optional(),
  path: z.string().trim().min(1).max(120).regex(/^\/[a-zA-Z0-9/_-]*$/),
})

export async function readJsonBody(request: Request, maxBytes = 4_096): Promise<unknown> {
  if (!request.headers.get("content-type")?.toLowerCase().startsWith("application/json")) {
    throw new HttpError(415, "Content-Type must be application/json")
  }

  const contentLength = Number(request.headers.get("content-length") ?? 0)
  if (Number.isFinite(contentLength) && contentLength > maxBytes) {
    throw new HttpError(413, "Request body is too large")
  }

  const text = await request.text()
  if (new TextEncoder().encode(text).byteLength > maxBytes) {
    throw new HttpError(413, "Request body is too large")
  }

  try {
    return JSON.parse(text) as unknown
  } catch {
    throw new HttpError(400, "Invalid JSON")
  }
}

export function requireSameOrigin(request: Request): void {
  const origin = request.headers.get("origin")
  const requestUrl = new URL(request.url)
  let originUrl: URL | null = null
  try {
    originUrl = origin ? new URL(origin) : null
  } catch {
    originUrl = null
  }

  const loopbackAliases = new Set(["localhost", "127.0.0.1", "[::1]"])
  const isLocalAlias = Boolean(
    originUrl &&
    requestUrl.protocol === "http:" &&
    originUrl.protocol === "http:" &&
    requestUrl.port === originUrl.port &&
    loopbackAliases.has(requestUrl.hostname) &&
    loopbackAliases.has(originUrl.hostname),
  )

  if (!originUrl || (originUrl.origin !== requestUrl.origin && !isLocalAlias)) {
    throw new HttpError(403, "Cross-origin request rejected")
  }
}

export class HttpError extends Error {
  constructor(
    public readonly status: number,
    message: string,
  ) {
    super(message)
  }
}

export function apiError(error: unknown): Response {
  const headers = { "Cache-Control": "private, no-store" }
  if (error instanceof HttpError) {
    return Response.json({ error: error.message }, { status: error.status, headers })
  }
  if (error instanceof z.ZodError) {
    return Response.json({ error: "Invalid request", issues: error.issues }, { status: 400, headers })
  }
  return Response.json({ error: "Unexpected server error" }, { status: 500, headers })
}
