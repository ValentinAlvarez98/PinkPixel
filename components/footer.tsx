import { Sparkles, Instagram, Facebook, Mail } from "lucide-react"

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.04-.1z" />
    </svg>
  )
}

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Sparkles className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold text-primary">Pink Pixel</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {"Hacemos de cada fiesta un momento mágico con decoraciones únicas y personalizadas."}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">{"Enlaces Rápidos"}</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#categorias" className="hover:text-primary transition-colors">
                  {"Categorías"}
                </a>
              </li>
              <li>
                <a href="#productos" className="hover:text-primary transition-colors">
                  {"Productos"}
                </a>
              </li>
              <li>
                <a href="#personalizados" className="hover:text-primary transition-colors">
                  {"Pedidos Personalizados"}
                </a>
              </li>
              <li>
                <a href="#contacto" className="hover:text-primary transition-colors">
                  {"Contacto"}
                </a>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">{"Categorías"}</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>{"Cake Toppers"}</li>
              <li>{"Banderines"}</li>
              <li>{"Souvenirs y Sorpresitas"}</li>
              <li>{"Sets Temáticos"}</li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">{"Síguenos"}</h3>
            <div className="flex gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <TikTokIcon className="h-5 w-5" />
              </a>
              <a
                href="mailto:contacto@pinkpixel.com"
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>{"© 2025 Pink Pixel. Todos los derechos reservados."}</p>
        </div>
      </div>
    </footer>
  )
}
