import { revalidatePath } from "next/cache"

import { requireAdminSession } from "@/lib/admin-auth"
import { getCatalog } from "@/lib/catalog"
import { getDb } from "@/lib/db"
import {
  apiError,
  productCreateSchema,
  readJsonBody,
} from "@/lib/security"

export async function GET() {
  const products = await getCatalog()
  return Response.json(
    { products },
    { headers: { "Cache-Control": "public, max-age=60, stale-while-revalidate=300" } },
  )
}

export async function POST(request: Request) {
  try {
    await requireAdminSession(request, { csrf: true })
    const input = productCreateSchema.parse(await readJsonBody(request))
    const id = crypto.randomUUID()

    await getDb()
      .prepare(
        `INSERT INTO products
         (id, slug, name, category, description, image_src, sort_order, active)
         VALUES (?, ?, ?, ?, ?, ?, ?, 1)`,
      )
      .bind(id, input.slug, input.name, input.category, input.description, input.imageSrc, input.sortOrder)
      .run()

    revalidatePath("/")
    return Response.json({ id }, { status: 201 })
  } catch (error) {
    return apiError(error)
  }
}
