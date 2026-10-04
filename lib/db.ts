import "server-only"

import { getCloudflareContext } from "@opennextjs/cloudflare"

export function getCloudflareEnv(): CloudflareEnv {
  return getCloudflareContext().env as CloudflareEnv
}

export function getDb(): D1Database {
  const env = getCloudflareEnv()
  if (!env.DB) throw new Error("D1 binding DB is unavailable")
  return env.DB
}
