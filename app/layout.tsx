import type { Metadata, Viewport } from "next"

import "@fontsource-variable/nunito"
import "@fontsource/titan-one/400.css"
import "./globals.css"

const siteUrl = "https://pinkpixel.uy"

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Pink Pixel | Papelería creativa y fiestas personalizadas",
    template: "%s | Pink Pixel",
  },
  description:
    "Toppers, souvenirs, juegos y papelería creativa personalizados para fiestas en Uruguay.",
  keywords: [
    "papelería personalizada Uruguay",
    "toppers personalizados",
    "souvenirs para fiestas",
    "decoración cumpleaños Uruguay",
    "Pink Pixel",
  ],
  authors: [{ name: "Pink Pixel" }],
  creator: "Pink Pixel",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/icon.png", type: "image/png", sizes: "96x96" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "es_UY",
    url: siteUrl,
    siteName: "Pink Pixel",
    title: "Pink Pixel | Detalles para celebrar a tu manera",
    description: "Papelería creativa y productos personalizados para fiestas en Uruguay.",
    images: [
      {
        url: "/assets/trabajos/topper-safari/cover.webp",
        width: 720,
        height: 960,
        alt: "Trabajo personalizado de Pink Pixel",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pink Pixel | Detalles para celebrar a tu manera",
    description: "Papelería creativa y productos personalizados para fiestas en Uruguay.",
    images: ["/assets/trabajos/topper-safari/cover.webp"],
  },
  robots: { index: true, follow: true },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#eb6f92",
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es-UY">
      <body>{children}</body>
    </html>
  )
}
