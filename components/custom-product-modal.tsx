"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Send, Sparkles } from "lucide-react"

type CustomProductModalProps = {
  isOpen: boolean
  onClose: () => void
  productName: string
  productCategory: string
}

export function CustomProductModal({ isOpen, onClose, productName, productCategory }: CustomProductModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    eventDate: "",
    details: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const whatsappMessage = `Hola! Quiero personalizar: ${productName} (${productCategory})

Mis datos:
Nombre: ${formData.name}
Email: ${formData.email}
Teléfono: ${formData.phone}
Fecha del evento: ${formData.eventDate}

Detalles de personalización:
${formData.details}`

    const whatsappUrl = `https://wa.me/5491112345678?text=${encodeURIComponent(whatsappMessage)}`
    window.open(whatsappUrl, "_blank")
    onClose()
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            Personalizar Producto
          </DialogTitle>
          <DialogDescription>
            <strong>{productName}</strong> - {productCategory}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="modal-name">Nombre completo</Label>
            <Input
              id="modal-name"
              name="name"
              placeholder="Tu nombre"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="modal-email">Email</Label>
            <Input
              id="modal-email"
              name="email"
              type="email"
              placeholder="tu@email.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="modal-phone">Teléfono</Label>
            <Input
              id="modal-phone"
              name="phone"
              type="tel"
              placeholder="+54 9 11 1234-5678"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="modal-eventDate">Fecha del evento</Label>
            <Input
              id="modal-eventDate"
              name="eventDate"
              type="date"
              value={formData.eventDate}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="modal-details">Detalles de personalización</Label>
            <Textarea
              id="modal-details"
              name="details"
              placeholder="Describe cómo te gustaría personalizar este producto (colores, nombres, tema, etc.)"
              rows={4}
              value={formData.details}
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex gap-3 pt-2">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1 bg-transparent">
              Cancelar
            </Button>
            <Button type="submit" className="flex-1">
              <Send className="mr-2 h-4 w-4" />
              Enviar Consulta
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
