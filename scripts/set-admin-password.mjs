import { createHmac, pbkdf2Sync, randomBytes, randomUUID } from "node:crypto"
import { mkdtemp, rm, writeFile } from "node:fs/promises"
import { tmpdir } from "node:os"
import { join } from "node:path"
import { spawn } from "node:child_process"

const USERNAME = "maru.pink.pixel"
const ITERATIONS = 600_000
const ALGORITHM = "pbkdf2-sha256-client+hmac-sha256"
const CREDENTIAL_SALT = `pinkpixel-admin-credential-v1|pinkpixel.uy|${USERNAME}`

function readHidden(label) {
  if (!process.stdin.isTTY || !process.stdout.isTTY) {
    throw new Error("Este comando necesita una terminal interactiva.")
  }

  return new Promise((resolve, reject) => {
    let value = ""
    process.stdout.write(label)
    process.stdin.setRawMode(true)
    process.stdin.setEncoding("utf8")
    process.stdin.resume()

    const finish = (error) => {
      process.stdin.off("data", onData)
      process.stdin.setRawMode(false)
      process.stdin.pause()
      process.stdout.write("\n")
      if (error) reject(error)
      else resolve(value)
    }

    const onData = (chunk) => {
      for (const character of chunk) {
        if (character === "\u0003") {
          finish(new Error("Operación cancelada."))
          return
        }
        if (character === "\r" || character === "\n") {
          finish()
          return
        }
        if (character === "\u007f" || character === "\b") {
          value = value.slice(0, -1)
          continue
        }
        if (character >= " " && value.length < 256) value += character
      }
    }

    process.stdin.on("data", onData)
  })
}

function runWrangler(mode, sqlPath) {
  const wranglerPath = join(process.cwd(), "node_modules", "wrangler", "bin", "wrangler.js")
  const args = [wranglerPath, "d1", "execute", "pinkpixel-db", mode, "--file", sqlPath]

  return new Promise((resolve, reject) => {
    const child = spawn(process.execPath, args, { cwd: process.cwd(), stdio: "inherit", shell: false })
    child.once("error", reject)
    child.once("exit", (code) => {
      if (code === 0) resolve()
      else reject(new Error(`Wrangler terminó con código ${code ?? "desconocido"}.`))
    })
  })
}

const modes = process.argv.slice(2).filter((value) => value === "--local" || value === "--remote")
if (modes.length !== 1) {
  console.error("Uso: node scripts/set-admin-password.mjs --local|--remote")
  process.exitCode = 1
} else {
  let temporaryDirectory
  try {
    const password = await readHidden("Contraseña nueva: ")
    const confirmation = await readHidden("Repetir contraseña: ")
    if (password !== confirmation) throw new Error("Las contraseñas no coinciden.")
    if (password.length < 16) throw new Error("La contraseña debe tener al menos 16 caracteres.")

    const salt = randomBytes(16)
    const credential = pbkdf2Sync(password, CREDENTIAL_SALT, ITERATIONS, 32, "sha256")
    const hash = createHmac("sha256", salt).update(credential).digest()
    const userId = randomUUID()
    temporaryDirectory = await mkdtemp(join(tmpdir(), "pinkpixel-admin-"))
    const sqlPath = join(temporaryDirectory, "set-admin-password.sql")
    const sql = `INSERT INTO admin_users
  (id, username, password_hash, password_salt, password_iterations, password_algorithm, active)
VALUES
  ('${userId}', '${USERNAME}', '${hash.toString("base64")}', '${salt.toString("base64")}', ${ITERATIONS}, '${ALGORITHM}', 1)
ON CONFLICT(username) DO UPDATE SET
  password_hash = excluded.password_hash,
  password_salt = excluded.password_salt,
  password_iterations = excluded.password_iterations,
  password_algorithm = excluded.password_algorithm,
  active = 1,
  failed_attempts = 0,
  locked_until = NULL,
  updated_at = unixepoch();

DELETE FROM admin_sessions
WHERE user_id = (SELECT id FROM admin_users WHERE username = '${USERNAME}' COLLATE NOCASE);
`
    await writeFile(sqlPath, sql, { encoding: "utf8", mode: 0o600 })
    await runWrangler(modes[0], sqlPath)
    console.log(`Credencial de ${USERNAME} actualizada. Las sesiones anteriores fueron revocadas.`)
  } catch (error) {
    console.error(error instanceof Error ? error.message : "No se pudo actualizar la credencial.")
    process.exitCode = 1
  } finally {
    if (temporaryDirectory) await rm(temporaryDirectory, { recursive: true, force: true })
  }
}
