"use client"

import { useState } from "react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ShoppingBag, MessageCircle, Sparkles, ChevronLeft, ChevronRight } from "lucide-react"
import type { ProductWithDetails, SelectedVariants } from "@/lib/database-types"

interface ProductCardProps {
  product: ProductWithDetails
  onCustomize?: (product: ProductWithDetails) => void
}

export function ProductCard({ product, onCustomize }: ProductCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [selectedVariants, setSelectedVariants] = useState<SelectedVariants>({})

  const images = product.images.sort((a, b) => a.display_order - b.display_order)
  const variants = product.variants.sort((a, b) => a.display_order - b.display_order)

  // Calcular precio final basado en variantes seleccionadas
  const calculateFinalPrice = () => {
    let finalPrice = product.base_price

    variants.forEach((variant) => {
      const selectedOptionId = selectedVariants[variant.id]
      if (selectedOptionId) {
        const option = variant.options.find((opt) => opt.id === selectedOptionId)
        if (option) {
          finalPrice += option.price_modifier
        }
      }
    })

    return finalPrice
  }

  const handleVariantChange = (variantId: string, optionId: string) => {
    setSelectedVariants((prev) => ({
      ...prev,
      [variantId]: optionId,
    }))
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  const formatPrice = (price: number) => {
    return `$${price.toLocaleString("es-AR")}`
  }

  return (
    <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300">
      {/* Carousel de imágenes */}
      <div className="relative aspect-square overflow-hidden bg-muted">
        <img
          src={images[currentImageIndex]?.image_url || "/placeholder.svg"}
          alt={images[currentImageIndex]?.alt_text || product.name}
          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Controles del carousel */}
        {images.length > 1 && (
          <>
            <Button
              variant="secondary"
              size="icon"
              className="absolute left-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={prevImage}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="secondary"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={nextImage}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>

            {/* Indicadores de imagen */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`h-1.5 rounded-full transition-all ${
                    index === currentImageIndex ? "w-6 bg-primary" : "w-1.5 bg-white/50"
                  }`}
                  aria-label={`Ver imagen ${index + 1}`}
                />
              ))}
            </div>
          </>
        )}

        {/* Badges */}
        {product.subcategory && <Badge className="absolute top-3 right-3 bg-primary">{product.subcategory}</Badge>}
        {product.is_customizable && (
          <Badge className="absolute top-3 left-3 bg-accent text-accent-foreground">
            <Sparkles className="h-3 w-3 mr-1" />
            Personalizable
          </Badge>
        )}
      </div>

      <CardContent className="p-4">
        <div className="mb-2">
          <Badge variant="outline" className="text-xs">
            {product.category.name}
          </Badge>
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2 line-clamp-2">{product.name}</h3>

        {/* Selector de variantes */}
        {variants.length > 0 && !product.is_customizable && (
          <div className="space-y-3 mb-4">
            {variants.map((variant) => (
              <div key={variant.id} className="space-y-2">
                <Label className="text-sm font-medium">
                  {variant.name}
                  {variant.is_required && <span className="text-destructive ml-1">*</span>}
                </Label>

                {variant.type === "select" && (
                  <Select
                    value={selectedVariants[variant.id] || ""}
                    onValueChange={(value) => handleVariantChange(variant.id, value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder={`Seleccionar ${variant.name.toLowerCase()}`} />
                    </SelectTrigger>
                    <SelectContent>
                      {variant.options
                        .sort((a, b) => a.display_order - b.display_order)
                        .map((option) => (
                          <SelectItem key={option.id} value={option.id} disabled={!option.is_available}>
                            {option.name}
                            {option.price_modifier !== 0 && ` (+${formatPrice(option.price_modifier)})`}
                            {!option.is_available && " (Agotado)"}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                )}

                {variant.type === "button" && (
                  <div className="flex flex-wrap gap-2">
                    {variant.options
                      .sort((a, b) => a.display_order - b.display_order)
                      .map((option) => (
                        <Button
                          key={option.id}
                          variant={selectedVariants[variant.id] === option.id ? "default" : "outline"}
                          size="sm"
                          onClick={() => handleVariantChange(variant.id, option.id)}
                          disabled={!option.is_available}
                          className="text-xs"
                        >
                          {option.name}
                          {option.price_modifier !== 0 && ` (+${formatPrice(option.price_modifier)})`}
                        </Button>
                      ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        <p className="text-2xl font-bold text-primary">
          {product.is_customizable ? `Desde ${formatPrice(product.base_price)}` : formatPrice(calculateFinalPrice())}
        </p>
      </CardContent>

      <CardFooter className="p-4 pt-0 flex gap-2">
        {product.is_customizable ? (
          <Button className="flex-1" onClick={() => onCustomize?.(product)}>
            <Sparkles className="mr-2 h-4 w-4" />
            Personalizar
          </Button>
        ) : (
          <>
            <Button
              variant="outline"
              className="flex-1 bg-transparent"
              onClick={() => product.whatsapp_url && window.open(product.whatsapp_url, "_blank")}
            >
              <MessageCircle className="mr-2 h-4 w-4" />
              WhatsApp
            </Button>
            <Button
              className="flex-1"
              onClick={() => product.mercadolibre_url && window.open(product.mercadolibre_url, "_blank")}
            >
              <ShoppingBag className="mr-2 h-4 w-4" />
              MercadoLibre
            </Button>
          </>
        )}
      </CardFooter>
    </Card>
  )
}
