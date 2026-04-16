import { Gift, Images, LayoutGrid, PartyPopper } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { ProductItem } from "@/lib/landing-data"
import { SectionHeading } from "./section-heading"

const iconMap = {
  party: PartyPopper,
  grid: LayoutGrid,
  gift: Gift,
  images: Images,
}

type ProductsSectionProps = {
  products: ProductItem[]
}

export function ProductsSection({ products }: ProductsSectionProps) {
  return (
    <section id="productos" className="mx-auto max-w-6xl px-4 py-16">
      <SectionHeading
        title="Productos y propuestas"
        description="Cada propuesta se define por mensaje para ajustar cantidades, tiempos y personalizacion. Asi te llevas algo pensado para tu evento, no un producto generico."
      />

      <div className="grid gap-4 md:grid-cols-2">
        {products.map((item) => {
          const Icon = iconMap[item.icon]
          return (
            <Card key={item.name} className="border-primary/20">
              <CardHeader className="space-y-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <CardTitle className="text-xl">{item.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{item.detail}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </section>
  )
}
