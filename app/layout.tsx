import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
})

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
})

export const metadata: Metadata = {
  title: "Pink Pixel | Decoracion para fiestas",
  description:
    "Landing oficial de Pink Pixel: productos personalizados para fiestas, galeria de trabajos realizados y contacto por WhatsApp, Instagram o TikTok.",
  metadataBase: new URL("https://pinkpixel.uy"),
  openGraph: {
    title: "Pink Pixel",
    description: "Decoracion para fiestas y productos personalizados.",
    type: "website",
    locale: "es_UY",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`} suppressHydrationWarning>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
