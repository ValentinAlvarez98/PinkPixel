import type React from "react"
import { Instagram, Mail, MessageCircle, Music2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { SectionHeading } from "./section-heading"

type ContactFormData = {
  name: string
  email: string
  phone: string
  eventDate: string
  message: string
}

type ContactSectionProps = {
  formData: ContactFormData
  onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void
  onWhatsAppClick: () => void
  instagramUrl: string
  tiktokUrl: string
  emailAddress: string
}

export function ContactSection({
  formData,
  onChange,
  onSubmit,
  onWhatsAppClick,
  instagramUrl,
  tiktokUrl,
  emailAddress,
}: ContactSectionProps) {
  return (
    <section id="contacto" className="mx-auto max-w-6xl px-4 py-16">
      <SectionHeading
        title="Contacto"
        description="Si ya tenes fecha, escribinos hoy y te ayudamos a definir todo rapido. Te respondemos por email, WhatsApp, Instagram o TikTok."
      />

      <div className="grid gap-6 md:grid-cols-[1.1fr_0.9fr]">
        <Card className="border-border/70">
          <CardHeader>
            <CardTitle>Formulario de consulta</CardTitle>
            <CardDescription>Contanos que tenes en mente para tu evento.</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={onSubmit}>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Nombre</Label>
                  <Input id="name" name="name" required value={formData.name} onChange={onChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Telefono</Label>
                  <Input id="phone" name="phone" required value={formData.phone} onChange={onChange} />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" name="email" type="email" required value={formData.email} onChange={onChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="eventDate">Fecha estimada del evento</Label>
                  <Input id="eventDate" name="eventDate" type="date" value={formData.eventDate} onChange={onChange} />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Mensaje</Label>
                <Textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  value={formData.message}
                  onChange={onChange}
                  placeholder="Tema, tipo de producto, cantidad aproximada y cualquier referencia que nos ayude."
                />
              </div>

              <Button type="submit" size="lg" className="w-full sm:w-auto">
                <Mail className="mr-2 h-4 w-4" />
                Enviar consulta
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Card className="border-primary/25 bg-primary/5">
            <CardHeader>
              <CardTitle>Canales rapidos</CardTitle>
              <CardDescription>Elegi el medio que te quede mas comodo.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start" onClick={onWhatsAppClick}>
                <MessageCircle className="mr-2 h-4 w-4" />
                WhatsApp
              </Button>
              <Button asChild variant="outline" className="w-full justify-start bg-transparent">
                <a href={instagramUrl} target="_blank" rel="noopener noreferrer">
                  <Instagram className="mr-2 h-4 w-4" />
                  Instagram
                </a>
              </Button>
              <Button asChild variant="outline" className="w-full justify-start bg-transparent">
                <a href={tiktokUrl} target="_blank" rel="noopener noreferrer">
                  <Music2 className="mr-2 h-4 w-4" />
                  TikTok
                </a>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-sm text-muted-foreground">
              <p className="font-semibold text-foreground">Pink Pixel</p>
              <p>Decoracion para fiestas y eventos personalizados.</p>
              <p className="mt-2">
                Email:{" "}
                <a className="font-medium text-primary hover:underline" href={`mailto:${emailAddress}`}>
                  {emailAddress}
                </a>
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
