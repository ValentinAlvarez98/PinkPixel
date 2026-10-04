import "server-only"

import { getDb } from "@/lib/db"
import { HttpError, requireSameOrigin } from "@/lib/security"

export const ADMIN_USERNAME = "maru.pink.pixel"
export const SESSION_COOKIE_NAME = "pinkpixel_admin_session"
export const CSRF_COOKIE_NAME = "pinkpixel_admin_csrf"
export const SESSION_TTL_SECONDS = 8 * 60 * 60

const PASSWORD_ALGORITHM = "pbkdf2-sha256"
const PASSWORD_ITERATIONS = 600_000
const MAX_FAILED_ATTEMPTS = 5
const LOCK_SECONDS = 15 * 60
const encoder = new TextEncoder()

type AdminUserRow = {
  id: string
  username: string
  password_hash: string | null
  password_salt: string | null
  password_iterations: number | null
  password_algorithm: string | null
  active: number
  failed_attempts: number
  locked_until: number | null
}

type AdminSessionRow = {
  user_id: string
  username: string
  csrf_token_hash: string
  expires_at: number
}

export type AdminSession = {
  userId: string
  username: string
  csrfToken: string
  expiresAt: number
}

export type NewAdminSession = AdminSession & {
  sessionToken: string
}

function bytesToBase64(bytes: Uint8Array): string {
  let binary = ""
  for (const byte of bytes) binary += String.fromCharCode(byte)
  return btoa(binary)
}

function base64ToBytes(value: string): Uint8Array {
  const binary = atob(value)
  return Uint8Array.from(binary, (character) => character.charCodeAt(0))
}

function randomToken(byteLength = 32): string {
  const bytes = crypto.getRandomValues(new Uint8Array(byteLength))
  return bytesToBase64(bytes).replaceAll("+", "-").replaceAll("/", "_").replace(/=+$/u, "")
}

async function sha256Base64(value: string): Promise<string> {
  const digest = await crypto.subtle.digest("SHA-256", encoder.encode(value))
  return bytesToBase64(new Uint8Array(digest))
}

async function derivePasswordHash(
  password: string,
  saltBase64: string,
  iterations: number,
): Promise<Uint8Array> {
  const key = await crypto.subtle.importKey("raw", encoder.encode(password), "PBKDF2", false, ["deriveBits"])
  const saltBytes = base64ToBytes(saltBase64)
  const salt = new ArrayBuffer(saltBytes.byteLength)
  new Uint8Array(salt).set(saltBytes)
  const result = await crypto.subtle.deriveBits(
    { name: "PBKDF2", hash: "SHA-256", salt, iterations },
    key,
    256,
  )
  return new Uint8Array(result)
}

function timingSafeEqual(left: Uint8Array, right: Uint8Array): boolean {
  if (left.length !== right.length) return false
  let difference = 0
  for (let index = 0; index < left.length; index += 1) difference |= left[index] ^ right[index]
  return difference === 0
}

function readCookie(request: Request, name: string): string | null {
  const cookies = request.headers.get("cookie")
  if (!cookies) return null
  for (const item of cookies.split(";")) {
    const separator = item.indexOf("=")
    if (separator < 0) continue
    if (item.slice(0, separator).trim() === name) return item.slice(separator + 1).trim()
  }
  return null
}

async function verifyPassword(password: string, user: AdminUserRow | null): Promise<boolean> {
  const hasUsableHash = Boolean(
    user?.password_hash &&
    user.password_salt &&
    user.password_algorithm === PASSWORD_ALGORITHM &&
    user.password_iterations &&
    user.password_iterations >= PASSWORD_ITERATIONS,
  )

  const salt = hasUsableHash ? user!.password_salt! : "AAAAAAAAAAAAAAAAAAAAAA=="
  const iterations = hasUsableHash ? user!.password_iterations! : PASSWORD_ITERATIONS
  const expected = hasUsableHash ? base64ToBytes(user!.password_hash!) : new Uint8Array(32)
  const actual = await derivePasswordHash(password, salt, iterations)
  return hasUsableHash && timingSafeEqual(actual, expected)
}

export async function createAdminSession(usernameInput: string, password: string): Promise<NewAdminSession | null> {
  const username = usernameInput.trim().toLowerCase()
  const db = getDb()
  const now = Math.floor(Date.now() / 1000)
  const user = await db
    .prepare(
      `SELECT id, username, password_hash, password_salt, password_iterations, password_algorithm,
              active, failed_attempts, locked_until
       FROM admin_users
       WHERE username = ? COLLATE NOCASE
       LIMIT 1`,
    )
    .bind(username)
    .first<AdminUserRow>()

  const isLocked = Boolean(user?.locked_until && user.locked_until > now)
  if (!user || user.active !== 1 || isLocked) return null

  const passwordMatches = await verifyPassword(password, user)

  if (!passwordMatches) {
    const previousAttempts = user.locked_until && user.locked_until <= now ? 0 : user.failed_attempts
    const failedAttempts = previousAttempts + 1
    const lockedUntil = failedAttempts >= MAX_FAILED_ATTEMPTS ? now + LOCK_SECONDS : null
    await db
      .prepare(
        `UPDATE admin_users
         SET failed_attempts = ?, locked_until = ?, updated_at = ?
         WHERE id = ?`,
      )
      .bind(failedAttempts, lockedUntil, now, user.id)
      .run()
    return null
  }

  const sessionToken = randomToken()
  const csrfToken = randomToken()
  const [sessionTokenHash, csrfTokenHash] = await Promise.all([
    sha256Base64(sessionToken),
    sha256Base64(csrfToken),
  ])
  const expiresAt = now + SESSION_TTL_SECONDS

  await db.batch([
    db.prepare(
      `UPDATE admin_users
       SET failed_attempts = 0, locked_until = NULL, last_login_at = ?, updated_at = ?
       WHERE id = ?`,
    ).bind(now, now, user!.id),
    db.prepare("DELETE FROM admin_sessions WHERE expires_at <= ?").bind(now),
    db.prepare(
      `INSERT INTO admin_sessions
       (token_hash, csrf_token_hash, user_id, expires_at, created_at)
       VALUES (?, ?, ?, ?, ?)`,
    ).bind(sessionTokenHash, csrfTokenHash, user!.id, expiresAt, now),
  ])

  return { userId: user!.id, username: user!.username, sessionToken, csrfToken, expiresAt }
}

export async function requireAdminSession(
  request: Request,
  options: { csrf?: boolean } = {},
): Promise<AdminSession> {
  const sessionToken = readCookie(request, SESSION_COOKIE_NAME)
  const csrfToken = readCookie(request, CSRF_COOKIE_NAME)
  if (!sessionToken || !csrfToken) throw new HttpError(401, "No autorizado")

  const sessionTokenHash = await sha256Base64(sessionToken)
  const now = Math.floor(Date.now() / 1000)
  const row = await getDb()
    .prepare(
      `SELECT s.user_id, u.username, s.csrf_token_hash, s.expires_at
       FROM admin_sessions s
       INNER JOIN admin_users u ON u.id = s.user_id
       WHERE s.token_hash = ? AND s.expires_at > ? AND u.active = 1
       LIMIT 1`,
    )
    .bind(sessionTokenHash, now)
    .first<AdminSessionRow>()

  if (!row) throw new HttpError(401, "No autorizado")

  const suppliedCsrfHash = await sha256Base64(csrfToken)
  if (!timingSafeEqual(base64ToBytes(suppliedCsrfHash), base64ToBytes(row.csrf_token_hash))) {
    throw new HttpError(401, "No autorizado")
  }

  if (options.csrf) {
    requireSameOrigin(request)
    const csrfHeader = request.headers.get("x-csrf-token") ?? ""
    if (!csrfHeader || !timingSafeEqual(encoder.encode(csrfHeader), encoder.encode(csrfToken))) {
      throw new HttpError(403, "Solicitud rechazada")
    }
  }

  return { userId: row.user_id, username: row.username, csrfToken, expiresAt: row.expires_at }
}

export async function deleteAdminSession(request: Request): Promise<void> {
  requireSameOrigin(request)
  const sessionToken = readCookie(request, SESSION_COOKIE_NAME)
  const csrfToken = readCookie(request, CSRF_COOKIE_NAME)
  const csrfHeader = request.headers.get("x-csrf-token") ?? ""

  if (csrfToken && (!csrfHeader || !timingSafeEqual(encoder.encode(csrfHeader), encoder.encode(csrfToken)))) {
    throw new HttpError(403, "Solicitud rechazada")
  }

  if (sessionToken) {
    await getDb()
      .prepare("DELETE FROM admin_sessions WHERE token_hash = ?")
      .bind(await sha256Base64(sessionToken))
      .run()
  }
}
