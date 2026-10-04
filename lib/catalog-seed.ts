import type { Product } from "@/lib/types"

export const seedProducts: Product[] = [
  {
    id: "c156b727-1524-4bcf-820a-8cf1e4c2af05",
    slug: "toppers-personalizados",
    name: "Toppers personalizados",
    category: "Tortas",
    description: "Nombre, edad y temática en una pieza con capas, volumen y brillo.",
    imageSrc: "/assets/trabajos/topper-safari/cover.webp",
    sortOrder: 10,
  },
  {
    id: "8112fcef-33e9-44ce-9617-e0680b37e18f",
    slug: "juegos-de-memoria",
    name: "Juegos de memoria",
    category: "Juegos",
    description: "Pares ilustrados y empaque a juego para regalar y seguir jugando.",
    imageSrc: "/assets/trabajos/memoria-minecraft/cover.webp",
    sortOrder: 20,
  },
  {
    id: "c96b3177-6391-4b74-a540-3e0db6e32d85",
    slug: "cajas-para-pintar",
    name: "Cajas para pintar",
    category: "Souvenirs",
    description: "Láminas, colores y empaque personalizado, todo listo para regalar.",
    imageSrc: "/assets/trabajos/caja-pintar-sirena/cover.webp",
    sortOrder: 30,
  },
  {
    id: "bd12fd10-e0b6-4f33-87ab-18489ee449b8",
    slug: "sets-coordinados",
    name: "Sets coordinados",
    category: "Sets",
    description: "Distintas piezas con una misma paleta para que toda la mesa converse.",
    imageSrc: "/assets/trabajos/topper-candy/cover.webp",
    sortOrder: 40,
  },
]
