export type NavSectionId = "inicio" | "empresa" | "productos" | "galeria" | "contacto"

export type WorkImage = {
  fullSrc: string
  thumbSrc: string
  alt: string
}

export type WorkProject = {
  id: string
  title: string
  summary: string
  coverSrc: string
  images: WorkImage[]
}

export type ServiceItem = {
  title: string
  description: string
  icon: "sparkles" | "palette" | "badge"
}

export type ProductItem = {
  name: string
  detail: string
  icon: "party" | "grid" | "gift" | "images"
}

type WorkProjectSeed = {
  id: string
  title: string
  summary: string
  folder: string
  imageCount: number
}

export const whatsappNumber = "59899152065"
export const whatsappQuickMessage =
  "Hola Pink Pixel! Quiero consultar por decoracion y productos personalizados para una fiesta."
export const instagramUrl = "https://www.instagram.com/pinkpixel.uy"
export const tiktokUrl = "https://www.tiktok.com/@pink.pixel.uy"
export const emailAddress = "pinkpixeluy@gmail.com"

export const services: ServiceItem[] = [
  {
    title: "Diseno que impacta",
    description: "Creamos piezas visuales que hacen que tu mesa se vea premium desde el primer vistazo.",
    icon: "sparkles",
  },
  {
    title: "Todo personalizado",
    description: "Adaptamos nombre, edad, tematica y colores para que cada detalle represente tu estilo.",
    icon: "palette",
  },
  {
    title: "Acompanamiento real",
    description: "Te guiamos paso a paso para que vos disfrutes el evento sin estres ni dudas.",
    icon: "badge",
  },
]

export const featuredProducts: ProductItem[] = [
  {
    name: "Toppers tematicos",
    detail: "Son el foco de la torta y levantan toda la estetica de la fiesta en segundos.",
    icon: "party",
  },
  {
    name: "Juegos de memoria",
    detail: "Ideal para entretener y para dejar un souvenir que se sigue usando despues.",
    icon: "grid",
  },
  {
    name: "Cajas de pintar",
    detail: "Un detalle util y lindo que te ayuda a entregar algo distinto y memorable.",
    icon: "gift",
  },
  {
    name: "Sets para mesa",
    detail: "Combinamos piezas para que todo se vea alineado, prolijo y super fotografiable.",
    icon: "images",
  },
]

const workProjectSeeds: WorkProjectSeed[] = [
  {
    id: "topper-sirena",
    title: "Topper Sirena",
    summary: "Capas, volumen y detalles para una torta protagonista.",
    folder: "topper-sirena",
    imageCount: 4,
  },
  {
    id: "topper-safari",
    title: "Topper Safari",
    summary: "Composicion con animales y capas en distintos planos.",
    folder: "topper-safari",
    imageCount: 4,
  },
  {
    id: "topper-capibara",
    title: "Topper Capibara",
    summary: "Serie capibara en tonos suaves y terminacion limpia.",
    folder: "topper-capibara",
    imageCount: 3,
  },
  {
    id: "topper-candy",
    title: "Topper Candy",
    summary: "Visual dulce con foco en detalles y numeracion.",
    folder: "topper-candy",
    imageCount: 3,
  },
  {
    id: "memoria-minecraft",
    title: "Juego Memoria Minecraft",
    summary: "Set completo para souvenir y dinamica en evento.",
    folder: "memoria-minecraft",
    imageCount: 6,
  },
  {
    id: "memoria-sirena",
    title: "Juego Memoria Sirena",
    summary: "Version sirena con paleta pastel y packaging a juego.",
    folder: "memoria-sirena",
    imageCount: 4,
  },
  {
    id: "caja-pintar-sirena",
    title: "Caja de Pintar Sirena",
    summary: "Souvenir util para entregar con presentacion prolija.",
    folder: "caja-pintar-sirena",
    imageCount: 2,
  },
]

function buildProjectImages(folder: string, imageCount: number, title: string): WorkImage[] {
  return Array.from({ length: imageCount }, (_, index) => {
    const number = index + 1
    return {
      fullSrc: `/trabajos-opt/${folder}/full-${number}.webp`,
      thumbSrc: `/trabajos-opt/${folder}/thumb-${number}.webp`,
      alt: `${title} foto ${number}`,
    }
  })
}

export const workProjects: WorkProject[] = workProjectSeeds.map((seed) => ({
  id: seed.id,
  title: seed.title,
  summary: seed.summary,
  coverSrc: `/trabajos-opt/${seed.folder}/cover.webp`,
  images: buildProjectImages(seed.folder, seed.imageCount, seed.title),
}))

export const heroPreview = [
  { src: workProjects[0].coverSrc, alt: `${workProjects[0].title} portada` },
  { src: workProjects[1].coverSrc, alt: `${workProjects[1].title} portada` },
  { src: workProjects[4].coverSrc, alt: `${workProjects[4].title} portada` },
]
