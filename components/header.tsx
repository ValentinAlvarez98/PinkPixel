"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, Sparkles } from "lucide-react"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      setIsMenuOpen(false)
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <Sparkles className="h-8 w-8 text-primary" />
          <span className="text-2xl font-bold text-primary">Pink Pixel</span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <button
            onClick={() => scrollToSection("categorias")}
            className="text-sm font-medium text-foreground hover:text-primary transition-colors"
          >
            Categorías
          </button>
          <button
            onClick={() => scrollToSection("productos")}
            className="text-sm font-medium text-foreground hover:text-primary transition-colors"
          >
            Productos
          </button>
          <button
            onClick={() => scrollToSection("personalizados")}
            className="text-sm font-medium text-foreground hover:text-primary transition-colors"
          >
            Pedidos Personalizados
          </button>
          <button
            onClick={() => scrollToSection("contacto")}
            className="text-sm font-medium text-foreground hover:text-primary transition-colors"
          >
            Contacto
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-border bg-background">
          <nav className="container mx-auto flex flex-col gap-4 p-4">
            <button
              onClick={() => scrollToSection("categorias")}
              className="text-left text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              Categorías
            </button>
            <button
              onClick={() => scrollToSection("productos")}
              className="text-left text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              Productos
            </button>
            <button
              onClick={() => scrollToSection("personalizados")}
              className="text-left text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              Pedidos Personalizados
            </button>
            <button
              onClick={() => scrollToSection("contacto")}
              className="text-left text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              Contacto
            </button>
          </nav>
        </div>
      )}
    </header>
  )
}
