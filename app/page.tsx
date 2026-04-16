"use client"

import type React from "react"
import { useEffect, useMemo, useState } from "react"
import { AboutSection } from "@/components/landing/about-section"
import { ContactSection } from "@/components/landing/contact-section"
import { HeroSection } from "@/components/landing/hero-section"
import { ProductsSection } from "@/components/landing/products-section"
import { SiteFooter } from "@/components/landing/site-footer"
import { SiteHeader } from "@/components/landing/site-header"
import { WorkGallerySection } from "@/components/landing/work-gallery-section"
import { WorkLightbox } from "@/components/landing/work-lightbox"
import { WhatsAppButton } from "@/components/whatsapp-button"
import {
  emailAddress,
  featuredProducts,
  heroPreview,
  instagramUrl,
  services,
  tiktokUrl,
  whatsappNumber,
  whatsappQuickMessage,
  workProjects,
  type NavSectionId,
} from "@/lib/landing-data"

type ContactFormData = {
  name: string
  email: string
  phone: string
  eventDate: string
  message: string
}

function buildWhatsappUrl() {
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappQuickMessage)}`
}

export default function Home() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    phone: "",
    eventDate: "",
    message: "",
  })
  const [viewer, setViewer] = useState<{ projectId: string; index: number } | null>(null)

  const activeProject = useMemo(
    () => (viewer ? workProjects.find((project) => project.id === viewer.projectId) ?? null : null),
    [viewer],
  )

  const scrollTo = (id: NavSectionId) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const openWhatsApp = () => {
    window.open(buildWhatsappUrl(), "_blank", "noopener,noreferrer")
  }

  const onChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target
    setFormData((previous) => ({ ...previous, [name]: value }))
  }

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const subject = `Consulta - ${formData.name}`
    const body = [
      `Nombre: ${formData.name}`,
      `Email: ${formData.email}`,
      `Telefono: ${formData.phone}`,
      `Fecha estimada: ${formData.eventDate || "Sin definir"}`,
      "",
      "Mensaje:",
      formData.message,
    ].join("\n")

    window.location.href = `mailto:${emailAddress}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }

  const openProject = (projectId: string) => setViewer({ projectId, index: 0 })
  const closeViewer = () => setViewer(null)

  const goToImage = (index: number) => {
    setViewer((previous) => (previous ? { ...previous, index } : previous))
  }

  const goNextImage = () => {
    setViewer((previous) => {
      if (!previous) return previous
      const project = workProjects.find((item) => item.id === previous.projectId)
      if (!project) return previous
      return { ...previous, index: (previous.index + 1) % project.images.length }
    })
  }

  const goPrevImage = () => {
    setViewer((previous) => {
      if (!previous) return previous
      const project = workProjects.find((item) => item.id === previous.projectId)
      if (!project) return previous
      return { ...previous, index: (previous.index - 1 + project.images.length) % project.images.length }
    })
  }

  useEffect(() => {
    if (!viewer) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") goNextImage()
      if (event.key === "ArrowLeft") goPrevImage()
    }

    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [viewer])

  return (
    <>
      <main className="min-h-screen bg-background text-foreground">
        <SiteHeader onNavigate={scrollTo} />

        <HeroSection heroPreview={heroPreview} onGalleryClick={() => scrollTo("galeria")} onWhatsAppClick={openWhatsApp} />

        <AboutSection services={services} />

        <ProductsSection products={featuredProducts} />

        <WorkGallerySection projects={workProjects} onOpenProject={openProject} />

        <ContactSection
          formData={formData}
          onChange={onChange}
          onSubmit={onSubmit}
          onWhatsAppClick={openWhatsApp}
          instagramUrl={instagramUrl}
          tiktokUrl={tiktokUrl}
          emailAddress={emailAddress}
        />

        <SiteFooter instagramUrl={instagramUrl} tiktokUrl={tiktokUrl} whatsappUrl={buildWhatsappUrl()} />

        <WhatsAppButton />
      </main>

      <WorkLightbox
        open={Boolean(viewer)}
        activeProject={activeProject}
        activeIndex={viewer?.index ?? 0}
        onClose={closeViewer}
        onSelectImage={goToImage}
        onPrev={goPrevImage}
        onNext={goNextImage}
      />
    </>
  )
}
