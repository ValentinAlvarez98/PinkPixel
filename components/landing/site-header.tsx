type SiteHeaderProps = {
  onNavigate: (id: "inicio" | "empresa" | "productos" | "galeria" | "contacto") => void
}

export function SiteHeader({ onNavigate }: SiteHeaderProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <button
          className="inline-flex items-center gap-2 text-left transition-opacity hover:opacity-85"
          onClick={() => onNavigate("inicio")}
        >
          <span className="text-xl font-bold text-primary">Pink Pixel</span>
        </button>

        <nav className="hidden items-center gap-5 text-sm font-medium md:flex">
          <button className="transition-colors hover:text-primary" onClick={() => onNavigate("empresa")}>
            Empresa
          </button>
          <button className="transition-colors hover:text-primary" onClick={() => onNavigate("productos")}>
            Productos
          </button>
          <button className="transition-colors hover:text-primary" onClick={() => onNavigate("galeria")}>
            Galeria
          </button>
          <button className="transition-colors hover:text-primary" onClick={() => onNavigate("contacto")}>
            Contacto
          </button>
        </nav>
      </div>
    </header>
  )
}
