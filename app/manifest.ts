import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Pink Pixel",
    short_name: "Pink Pixel",
    description: "Papelería creativa y productos personalizados para fiestas.",
    start_url: "/",
    display: "standalone",
    background_color: "#f7f3ed",
    theme_color: "#eb6f92",
    icons: [{ src: "/assets/pinkpixel-mark.png", sizes: "512x512", type: "image/png" }],
  }
}
