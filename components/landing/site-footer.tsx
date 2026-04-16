type SiteFooterProps = {
  instagramUrl: string
  tiktokUrl: string
  whatsappUrl: string
}

export function SiteFooter({ instagramUrl, tiktokUrl, whatsappUrl }: SiteFooterProps) {
  return (
    <footer className="border-t border-border bg-card/60">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 py-6 text-sm text-muted-foreground md:flex-row">
        <p>Pink Pixel - Diseno para fiestas que se recuerdan.</p>
        <div className="flex items-center gap-3">
          <a className="transition-colors hover:text-primary" href={instagramUrl} target="_blank" rel="noopener noreferrer">
            Instagram
          </a>
          <span className="h-1 w-1 rounded-full bg-muted-foreground/60" />
          <a className="transition-colors hover:text-primary" href={tiktokUrl} target="_blank" rel="noopener noreferrer">
            TikTok
          </a>
          <span className="h-1 w-1 rounded-full bg-muted-foreground/60" />
          <a className="transition-colors hover:text-primary" href={whatsappUrl} target="_blank" rel="noopener noreferrer">
            WhatsApp
          </a>
        </div>
      </div>
    </footer>
  )
}
