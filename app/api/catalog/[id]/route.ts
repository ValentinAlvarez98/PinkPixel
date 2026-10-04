import { revalidatePath } from "next/cache"
import { z } from "zod"

import { requireAdminSession } from "@/lib/admin-auth"
import { getDb } from "@/lib/db"
import {
  apiError,
  HttpError,
  productUpdateSchema,
  readJsonBody,
} from "@/lib/security"

const idSchema = z.uuid()

type RouteContext = { params: Promise<{ id: string }> }

export async function PATCH(request: Request, context: RouteContext) {
  try {
    await requireAdminSession(request, { csrf: true })
    const { id } = await context.params
    idSchema.parse(id)
    const input = productUpdateSchema.parse(await readJsonBody(request))

    const fields: string[] = []
    const values: Array<string | number> = []
    const columns: Record<string, string> = {
      slug: "slug",
      name: "name",
      category: "category",
      description: "description",
      imageSrc: "image_src",
      sortOrder: "sort_order",
    }

    for (const [key, value] of Object.entries(input)) {
      fields.push(`${columns[key]} = ?`)
      values.push(value)
    }
    fields.push("updated_at = CURRENT_TIMESTAMP")
    values.push(id)

    const result = await getDb()
      .prepare(`UPDATE products SET ${fields.join(", ")} WHERE id = ? AND active = 1`)
      .bind(...values)
      .run()

    if (!result.meta.changes) throw new HttpError(404, "Product not found")
    revalidatePath("/")
    return Response.json({ ok: true })
  } catch (error) {
    return apiError(error)
  }
}

export async function DELETE(request: Request, context: RouteContext) {
  try {
    await requireAdminSession(request, { csrf: true })
    const { id } = await context.params
    idSchema.parse(id)

    const result = await getDb()
      .prepare("UPDATE products SET active = 0, updated_at = CURRENT_TIMESTAMP WHERE id = ? AND active = 1")
      .bind(id)
      .run()

    if (!result.meta.changes) throw new HttpError(404, "Product not found")
    revalidatePath("/")
    return Response.json({ ok: true })
  } catch (error) {
    return apiError(error)
  }
}
