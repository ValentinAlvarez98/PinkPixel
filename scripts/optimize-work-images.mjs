import fs from "node:fs/promises"
import path from "node:path"
import sharp from "sharp"

const sourceRoot = path.join(process.cwd(), "public", "trabajos")
const outputRoot = path.join(process.cwd(), "public", "trabajos-opt")

async function ensureDir(dir) {
  await fs.mkdir(dir, { recursive: true })
}

async function listFiles(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true })
  return entries
    .filter((entry) => entry.isFile() && entry.name.toLowerCase().endsWith(".webp"))
    .map((entry) => entry.name)
    .sort((a, b) => {
      const na = Number.parseInt(a, 10)
      const nb = Number.parseInt(b, 10)
      if (Number.isNaN(na) || Number.isNaN(nb)) return a.localeCompare(b)
      return na - nb
    })
}

async function optimizeProject(projectDirName) {
  const projectInput = path.join(sourceRoot, projectDirName)
  const projectOutput = path.join(outputRoot, projectDirName)
  await ensureDir(projectOutput)

  const files = await listFiles(projectInput)

  for (let i = 0; i < files.length; i += 1) {
    const fileName = files[i]
    const sourcePath = path.join(projectInput, fileName)
    const index = i + 1

    const fullTarget = path.join(projectOutput, `full-${index}.webp`)
    const thumbTarget = path.join(projectOutput, `thumb-${index}.webp`)

    await sharp(sourcePath)
      .rotate()
      .resize({ width: 1600, withoutEnlargement: true })
      .webp({ quality: 72, effort: 5 })
      .toFile(fullTarget)

    await sharp(sourcePath)
      .rotate()
      .resize({ width: 420, withoutEnlargement: true })
      .webp({ quality: 58, effort: 4 })
      .toFile(thumbTarget)

    if (index === 1) {
      const coverTarget = path.join(projectOutput, "cover.webp")
      await sharp(sourcePath)
        .rotate()
        .resize({ width: 700, withoutEnlargement: true })
        .webp({ quality: 60, effort: 4 })
        .toFile(coverTarget)
    }
  }

  return files.length
}

async function main() {
  await ensureDir(outputRoot)
  const entries = await fs.readdir(sourceRoot, { withFileTypes: true })
  const projects = entries.filter((entry) => entry.isDirectory()).map((entry) => entry.name)

  let total = 0
  for (const project of projects) {
    const count = await optimizeProject(project)
    total += count
    console.log(`optimized ${project}: ${count} files`)
  }

  console.log(`done, optimized ${total} source images`)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
