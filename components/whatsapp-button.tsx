"use client"

import { MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

const whatsappNumber = "59899152065"
const message = "Hola Pink Pixel! Quiero consultar por decoracion y productos personalizados para una fiesta."

export function WhatsAppButton() {
  const handleClick = () => {
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank", "noopener,noreferrer")
  }

  return (
    <Button
      onClick={handleClick}
      size="lg"
      className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl p-0"
      aria-label="Contactar por WhatsApp"
    >
      <MessageCircle className="h-6 w-6" />
    </Button>
  )
}
