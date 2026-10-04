import { headers } from "next/headers"

import { LandingPage } from "@/components/landing-page"
import { getCatalog } from "@/lib/catalog"

export const dynamic = "force-dynamic"

const structuredData = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Pink Pixel",
  url: "https://pinkpixel.uy",
  email: "pinkpixeluy@gmail.com",
  telephone: "+59899152065",
  image: "https://pinkpixel.uy/assets/pinkpixel-logo.png",
  sameAs: [
    "https://www.instagram.com/pinkpixel.uy",
    "https://www.tiktok.com/@pink.pixel.uy",
  ],
  areaServed: { "@type": "Country", name: "Uruguay" },
}

export default async function HomePage() {
  const [products, requestHeaders] = await Promise.all([getCatalog(), headers()])
  const nonce = requestHeaders.get("x-nonce") ?? undefined

  return (
    <>
      <script
        nonce={nonce}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }}
      />
      <LandingPage products={products} />
    </>
  )
}
