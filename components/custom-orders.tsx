"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Palette, Sparkles, Heart, Star } from "lucide-react"

const features = [
  {
    icon: Palette,
    title: "Diseños Únicos",
    description: "Creamos decoraciones personalizadas según tu temática y colores favoritos",
  },
  {
    icon: Sparkles,
    title: "Cualquier Evento",
    description: "Cumpleaños, baby shower, bautismos, comuniones y más",
  },
  {
    icon: Heart,
    title: "Atención Personalizada",
    description: "Te asesoramos en cada paso para que tu fiesta sea perfecta",
  },
  {
    icon: Star,
    title: "Calidad Garantizada",
    description: "Materiales de primera calidad y acabados profesionales",
  },
]

export function CustomOrders() {
  const scrollToContact = () => {
    const element = document.getElementById("contacto")
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section id="personalizados" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary mb-6">
              <Star className="h-4 w-4" />
              <span>{"Pedidos Personalizados"}</span>
            </div>

            <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl mb-4 text-balance">
              {"Hacemos realidad tus ideas"}
            </h2>

            <p className="text-lg text-muted-foreground mb-8 leading-relaxed text-pretty">
              {
                "¿Tienes una idea especial para tu fiesta? Trabajamos contigo para crear decoraciones únicas y personalizadas que harán de tu evento algo inolvidable."
              }
            </p>

            <div className="grid gap-6 sm:grid-cols-2 mb-8">
              {features.map((feature) => {
                const Icon = feature.icon
                return (
                  <div key={feature.title} className="flex gap-3">
                    <div className="flex-shrink-0">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>

            <Button size="lg" onClick={scrollToContact}>
              {"Solicitar Presupuesto"}
            </Button>
          </div>

          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <Card className="overflow-hidden">
                  <img
                    src="/custom-party-decorations-personalized.jpg"
                    alt="Decoración personalizada"
                    className="h-full w-full object-cover"
                  />
                </Card>
                <Card className="overflow-hidden">
                  <img
                    src="/personalized-birthday-party-setup.jpg"
                    alt="Setup personalizado"
                    className="h-full w-full object-cover"
                  />
                </Card>
              </div>
              <div className="space-y-4 pt-8">
                <Card className="overflow-hidden">
                  <img
                    src="/custom-party-favors-unique-design.jpg"
                    alt="Souvenirs personalizados"
                    className="h-full w-full object-cover"
                  />
                </Card>
                <Card className="overflow-hidden">
                  <img
                    src="/themed-party-decoration-custom.jpg"
                    alt="Decoración temática"
                    className="h-full w-full object-cover"
                  />
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
