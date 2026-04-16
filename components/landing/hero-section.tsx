import Image from "next/image"
import { BadgeCheck, Images, MessageCircle, PartyPopper } from "lucide-react"
import { Button } from "@/components/ui/button"

type HeroPreviewItem = {
  src: string
  alt: string
}

type HeroSectionProps = {
  heroPreview: HeroPreviewItem[]
  onGalleryClick: () => void
  onWhatsAppClick: () => void
}

export function HeroSection({ heroPreview, onGalleryClick, onWhatsAppClick }: HeroSectionProps) {
  return (
    <section id="inicio" className="relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,rgba(235,111,146,0.24),transparent_45%),radial-gradient(circle_at_100%_0%,rgba(181,151,133,0.20),transparent_38%)]" />
      <div className="relative mx-auto grid max-w-6xl gap-10 px-4 py-16 md:grid-cols-[1.1fr_0.9fr] md:py-24">
        <div className="space-y-6">
          <p className="inline-flex items-center gap-2 rounded-full bg-primary/15 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
            <PartyPopper className="h-4 w-4" />
            Decoracion personalizada para momentos especiales
          </p>

          <h1 className="text-4xl font-black leading-tight md:text-6xl">
            Vos imaginas la fiesta.
            <br />
            Nosotras la hacemos inolvidable.
          </h1>

          <p className="max-w-xl text-lg text-muted-foreground">
            Creamos piezas que venden emocion: papeleria creativa, souvenirs y detalles personalizados que hacen que tu
            evento se vea profesional, cuidado y super fotografiable desde el primer minuto.
          </p>

          <div className="flex flex-wrap gap-3">
            <Button size="lg" onClick={onGalleryClick}>
              <Images className="mr-2 h-4 w-4" />
              Quiero ver trabajos reales
            </Button>
            <Button variant="outline" size="lg" className="bg-transparent" onClick={onWhatsAppClick}>
              <MessageCircle className="mr-2 h-4 w-4" />
              Pedi tu propuesta por WhatsApp
            </Button>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
            <BadgeCheck className="h-4 w-4 text-primary" />
            <span>Diseno a medida</span>
            <span className="h-1 w-1 rounded-full bg-muted-foreground/60" />
            <span>Calidad artesanal</span>
            <span className="h-1 w-1 rounded-full bg-muted-foreground/60" />
            <span>Asesoria cercana</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {heroPreview.map((image, index) => (
            <article key={image.src} className="group overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
              <div className="relative aspect-square">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  quality={index === 0 ? 76 : 65}
                  priority={index === 0}
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
