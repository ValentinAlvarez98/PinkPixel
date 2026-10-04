import "server-only"

import { seedProducts } from "@/lib/catalog-seed"
import { getDb } from "@/lib/db"
import type { Product } from "@/lib/types"

type ProductRow = {
  id: string
  slug: string
  name: string
  category: string
  description: string
  image_src: string
  sort_order: number
}

function mapProduct(row: ProductRow): Product {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    category: row.category,
    description: row.description,
    imageSrc: row.image_src,
    sortOrder: row.sort_order,
  }
}

export async function getCatalog(): Promise<Product[]> {
  try {
    const { results } = await getDb()
      .prepare(
        `SELECT id, slug, name, category, description, image_src, sort_order
         FROM products
         WHERE active = 1
         ORDER BY sort_order ASC, name ASC`,
      )
      .all<ProductRow>()

    return results.length > 0 ? results.map(mapProduct) : seedProducts
  } catch {
    return seedProducts
  }
}
