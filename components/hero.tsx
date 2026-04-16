"use client"

import { Button } from "@/components/ui/button"
import { Sparkles, PartyPopper, Gift } from "lucide-react"

export function Hero() {
  const scrollToProducts = () => {
    const element = document.getElementById("productos")
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
          <div className="flex flex-col gap-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary w-fit">
              <Sparkles className="h-4 w-4" />
              <span>{"Decoración de Fiestas Infantiles"}</span>
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl text-balance">
              {"Haz de cada fiesta un momento mágico"}
            </h1>

            <p className="text-lg text-muted-foreground leading-relaxed text-pretty">
              {
                "Encuentra todo lo que necesitas para decorar fiestas infantiles inolvidables. Desde souvenirs hasta decoración completa, con la opción de personalizar cada detalle."
              }
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="text-lg" onClick={scrollToProducts}>
                <PartyPopper className="mr-2 h-5 w-5" />
                {"Ver Catálogo"}
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-lg bg-transparent"
                onClick={() => {
                  const element = document.getElementById("contacto")
                  if (element) element.scrollIntoView({ behavior: "smooth" })
                }}
              >
                <Gift className="mr-2 h-5 w-5" />
                {"Pedido Personalizado"}
              </Button>
            </div>
          </div>

          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="aspect-square rounded-2xl bg-primary/20 overflow-hidden">
                  <img
                    src="/colorful-party-balloons-and-decorations.jpg"
                    alt="Decoración de globos"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="aspect-square rounded-2xl bg-secondary/20 overflow-hidden">
                  <img
                    src="/birthday-party-favors-and-gift-boxes.jpg"
                    alt="Souvenirs de fiesta"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="aspect-square rounded-2xl bg-accent/20 overflow-hidden">
                  <img
                    src="/colorful-birthday-cake-toppers.jpg"
                    alt="Toppers para tortas"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="aspect-square rounded-2xl bg-secondary/20 overflow-hidden">
                  <img
                    src="/party-table-decorations-for-kids.jpg"
                    alt="Decoración de mesa"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
