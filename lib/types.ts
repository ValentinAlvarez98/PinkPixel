export type Product = {
  id: string
  slug: string
  name: string
  category: string
  description: string
  imageSrc: string
  sortOrder: number
}

export type MetricEventName =
  | "page_view"
  | "gallery_open"
  | "product_whatsapp"
  | "contact_email"
