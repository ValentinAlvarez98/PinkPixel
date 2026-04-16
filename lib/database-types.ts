// Tabla: categories
export interface Category {
  id: string
  name: string
  slug: string
  description: string | null
  created_at: Date
  updated_at: Date
}

// Tabla: products
export interface Product {
  id: string
  category_id: string
  name: string
  description: string | null
  base_price: number
  is_customizable: boolean
  mercadolibre_url: string | null
  whatsapp_url: string | null
  subcategory: string | null
  created_at: Date
  updated_at: Date
}

// Tabla: product_images
export interface ProductImage {
  id: string
  product_id: string
  image_url: string
  display_order: number
  alt_text: string | null
  created_at: Date
}

// Tabla: product_variants (ej: Color, Tamaño, Tema)
export interface ProductVariant {
  id: string
  product_id: string
  name: string // "Color", "Tamaño", "Tema"
  type: "select" | "radio" | "button" // Tipo de selector en UI
  is_required: boolean
  display_order: number
  created_at: Date
}

// Tabla: variant_options (opciones específicas de cada variante)
export interface VariantOption {
  id: string
  variant_id: string
  name: string // "Rojo", "Grande", "Unicornio"
  price_modifier: number // Modificador de precio (puede ser positivo o negativo)
  stock_quantity: number | null
  is_available: boolean
  display_order: number
  created_at: Date
}

// Tipos para uso en la aplicación (con relaciones)
export interface ProductWithDetails extends Product {
  category: Category
  images: ProductImage[]
  variants: ProductVariantWithOptions[]
}

export interface ProductVariantWithOptions extends ProductVariant {
  options: VariantOption[]
}

// Estado de selección de variantes en el frontend
export interface SelectedVariants {
  [variantId: string]: string // variantId -> optionId
}
