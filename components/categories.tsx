import { Card, CardContent } from "@/components/ui/card"
import { Cake, Flag, Gift, Sparkles } from "lucide-react"

const categories = [
  {
    name: "Cake Toppers",
    icon: Cake,
    description: "Decoración personalizada para tortas",
    color: "bg-primary/10 text-primary",
  },
  {
    name: "Banderines",
    icon: Flag,
    description: "Guirnaldas y banderines decorativos",
    color: "bg-secondary/10 text-secondary-foreground",
  },
  {
    name: "Souvenirs y Sorpresitas",
    icon: Gift,
    description: "Detalles únicos para tus invitados",
    color: "bg-accent/10 text-accent-foreground",
  },
  {
    name: "Sets Temáticos",
    icon: Sparkles,
    description: "Kits completos para tu fiesta",
    color: "bg-chart-2/10 text-chart-2",
  },
]

export function Categories() {
  return (
    <section id="categorias" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl mb-4 text-balance">
            {"Explora Nuestras Categorías"}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            {"Encuentra todo lo que necesitas para hacer de tu fiesta un evento inolvidable"}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => {
            const Icon = category.icon
            return (
              <Card
                key={category.name}
                className="group hover:shadow-lg transition-all duration-300 cursor-pointer border-2 hover:border-primary/50"
              >
                <CardContent className="p-6">
                  <div
                    className={`inline-flex items-center justify-center w-14 h-14 rounded-xl ${category.color} mb-4 group-hover:scale-110 transition-transform`}
                  >
                    <Icon className="h-7 w-7" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">{category.name}</h3>
                  <p className="text-muted-foreground leading-relaxed">{category.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
