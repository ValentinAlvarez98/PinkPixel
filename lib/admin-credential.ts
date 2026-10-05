export const ADMIN_CREDENTIAL_ITERATIONS = 600_000
export const ADMIN_CREDENTIAL_ALGORITHM = "pbkdf2-sha256-client+hmac-sha256"

const encoder = new TextEncoder()

function bytesToBase64(bytes: Uint8Array): string {
  let binary = ""
  for (const byte of bytes) binary += String.fromCharCode(byte)
  return btoa(binary)
}

export async function deriveAdminCredential(username: string, password: string): Promise<string> {
  const normalizedUsername = username.trim().toLowerCase()
  const key = await crypto.subtle.importKey("raw", encoder.encode(password), "PBKDF2", false, ["deriveBits"])
  const result = await crypto.subtle.deriveBits(
    {
      name: "PBKDF2",
      hash: "SHA-256",
      salt: encoder.encode(`pinkpixel-admin-credential-v1|pinkpixel.uy|${normalizedUsername}`),
      iterations: ADMIN_CREDENTIAL_ITERATIONS,
    },
    key,
    256,
  )
  return bytesToBase64(new Uint8Array(result))
}
