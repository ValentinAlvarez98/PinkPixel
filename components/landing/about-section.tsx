import { BadgeCheck, Palette, Sparkles } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { ServiceItem } from "@/lib/landing-data"
import { SectionHeading } from "./section-heading"

const iconMap = {
  sparkles: Sparkles,
  palette: Palette,
  badge: BadgeCheck,
}

type AboutSectionProps = {
  services: ServiceItem[]
}

export function AboutSection({ services }: AboutSectionProps) {
  return (
    <section id="empresa" className="border-y border-border/60 bg-card/70">
      <div className="mx-auto max-w-6xl px-4 py-16">
        <SectionHeading
          title="Quienes somos"
          description="Somos Pink Pixel, una marca enfocada en transformar ideas en fiestas que dejan huella. Nuestro objetivo es que vos mires el resultado final y sientas que cada detalle te representa."
          className="max-w-3xl"
        />

        <div className="grid gap-4 md:grid-cols-3">
          {services.map((service) => {
            const Icon = iconMap[service.icon]
            return (
              <Card key={service.title} className="border-border/80 bg-background/95">
                <CardHeader className="space-y-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/12 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <CardTitle className="text-lg">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm leading-relaxed text-muted-foreground">
                    {service.description}
                  </CardDescription>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
