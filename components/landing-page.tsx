"use client"

import Image from "next/image"
import { FormEvent, useEffect, useMemo, useRef, useState } from "react"

import type { MetricEventName, Product } from "@/lib/types"

const whatsappNumber = "59899152065"

const heroSlides = [
  { src: "/assets/trabajos/topper-capibara/full-1.webp", title: "Topper Capibara", note: "muchas capas, mucho brillo", alt: "Topper personalizado de capibara hecho por Pink Pixel" },
  { src: "/assets/trabajos/topper-safari/full-1.webp", title: "Topper Safari", note: "una aventura en papel", alt: "Topper personalizado con animales de safari hecho por Pink Pixel" },
  { src: "/assets/trabajos/memoria-minecraft/full-1.webp", title: "Memoria Minecraft", note: "para regalar y seguir jugando", alt: "Juego de memoria Minecraft personalizado hecho por Pink Pixel" },
]

type Project = { id: string; title: string; kind: string; summary: string; categories: string[]; count: number }

const projects: Project[] = [
  { id: "topper-sirena", title: "Sirena", kind: "Topper", summary: "Capas, escamas y una paleta salida del mar.", categories: ["toppers"], count: 4 },
  { id: "topper-safari", title: "Safari", kind: "Topper", summary: "Una pequeña selva con nombre propio.", categories: ["toppers"], count: 4 },
  { id: "memoria-minecraft", title: "Minecraft", kind: "Juego de memoria", summary: "Un clásico para jugar, ahora hecho souvenir.", categories: ["juegos", "souvenirs"], count: 6 },
  { id: "topper-capibara", title: "Capibara", kind: "Topper", summary: "Brillos, movimiento y una invitada muy simpática.", categories: ["toppers"], count: 2 },
  { id: "memoria-sirena", title: "Bajo el mar", kind: "Juego de memoria", summary: "Juego y empaque pensados como un solo regalo.", categories: ["juegos", "souvenirs"], count: 4 },
  { id: "caja-pintar-sirena", title: "Para pintar", kind: "Souvenir", summary: "Una cajita con todo listo para crear.", categories: ["souvenirs"], count: 2 },
  { id: "topper-candy", title: "Candy", kind: "Topper", summary: "Rosa, brillo y volumen para una torta protagonista.", categories: ["toppers"], count: 3 },
]

const values = [
  { number: "01", title: "Empieza con tu idea", copy: "Tema, nombre, edad, colores: tomamos lo que imaginás y lo convertimos en una pieza que no se repite." },
  { number: "02", title: "Se hace con detalle", copy: "Diseñamos, cortamos y armamos cada capa acá, cuidando el frente, el dorso y todo lo que pasa entre medio." },
  { number: "03", title: "Lo pensamos contigo", copy: "No necesitás llegar con todo resuelto. Te ayudamos a elegir qué funciona mejor para tu fiesta y tu presupuesto." },
]

function whatsappUrl(message: string) {
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`
}

function track(event: MetricEventName, target?: string) {
  const payload = JSON.stringify({ event, target, path: window.location.pathname })
  if (navigator.sendBeacon) {
    navigator.sendBeacon("/api/metrics", new Blob([payload], { type: "application/json" }))
    return
  }
  void fetch("/api/metrics", { method: "POST", headers: { "Content-Type": "application/json" }, body: payload, keepalive: true, credentials: "same-origin" })
}

function Burst({ className = "" }: { className?: string }) {
  return <svg className={className} viewBox="0 0 100 100" aria-hidden="true"><path d="M50 3 58 34 80 11 66 40 97 32 69 48 98 59 66 57 84 84 59 64 55 98 48 66 29 94 39 63 7 76 35 56 2 48 35 47 9 23 40 39Z" /></svg>
}

export function LandingPage({ products }: { products: Product[] }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [heroIndex, setHeroIndex] = useState(0)
  const [filter, setFilter] = useState("todos")
  const [viewer, setViewer] = useState<{ project: Project; image: number } | null>(null)
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    track("page_view")
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const timer = window.setInterval(() => setHeroIndex((current) => (current + 1) % heroSlides.length), 5_200)
    return () => window.clearInterval(timer)
  }, [])

  useEffect(() => {
    document.body.classList.toggle("no-scroll", menuOpen || Boolean(viewer))
    return () => document.body.classList.remove("no-scroll")
  }, [menuOpen, viewer])

  useEffect(() => {
    if (viewer) dialogRef.current?.showModal()
    else if (dialogRef.current?.open) dialogRef.current.close()
  }, [viewer])

  const visibleProjects = useMemo(() => filter === "todos" ? projects : projects.filter((project) => project.categories.includes(filter)), [filter])

  const moveViewer = (direction: number) => {
    setViewer((current) => current ? { ...current, image: ((current.image - 1 + direction + current.project.count) % current.project.count) + 1 } : null)
  }

  const submitContact = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const name = String(data.get("name") ?? "")
    const body = [`Nombre: ${name}`, `Email: ${data.get("email") ?? ""}`, `Teléfono: ${data.get("phone") || "No indicado"}`, `Fecha del evento: ${data.get("date") || "A definir"}`, "", "Consulta:", String(data.get("message") ?? "")].join("\n")
    track("contact_email")
    window.location.href = `mailto:pinkpixeluy@gmail.com?subject=${encodeURIComponent(`Consulta personalizada de ${name}`)}&body=${encodeURIComponent(body)}`
  }

  const changeHero = (direction: number) => setHeroIndex((current) => (current + direction + heroSlides.length) % heroSlides.length)

  return (
    <>
      <a className="skip-link" href="#contenido">Saltar al contenido</a>

      <div className="ticker" aria-hidden="true"><div><span>papelería para celebrar</span><b>✿</b><span>hecho a medida</span><b>✿</b><span>pedidos en Uruguay</span><b>✿</b><span>papelería para celebrar</span><b>✿</b><span>hecho a medida</span><b>✿</b><span>pedidos en Uruguay</span><b>✿</b></div></div>

      <header className="site-header">
        <nav className="desktop-nav nav-left" aria-label="Navegación principal"><a href="#trabajos">Trabajos</a><a href="#productos">Productos</a></nav>
        <a className="brand" href="#inicio" aria-label="Pink Pixel, volver al inicio"><Image src="/assets/pinkpixel-logo.png" alt="Pink Pixel" width={4376} height={1261} priority /></a>
        <nav className="desktop-nav nav-right" aria-label="Más secciones"><a href="#sobre-mi">Sobre mí</a><a href="#contacto">Contacto</a></nav>
        <button className="menu-toggle" type="button" aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"} aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}><span /><span /><span /></button>
        <nav className={`mobile-nav ${menuOpen ? "is-open" : ""}`} aria-label="Navegación móvil">
          {[["trabajos", "Trabajos"], ["productos", "Productos"], ["sobre-mi", "Sobre mí"], ["contacto", "Contacto"]].map(([id, label]) => <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)}>{label}</a>)}
          <a className="mobile-order" href={whatsappUrl("Hola Pink Pixel, quiero hacer una consulta para mi fiesta.")} target="_blank" rel="noopener noreferrer">Hacer una consulta ↗</a>
        </nav>
      </header>

      <main id="contenido">
        <section className="hero" id="inicio" aria-labelledby="hero-title">
          <div className="hero-doodle hero-doodle-one" aria-hidden="true">✿</div><div className="hero-doodle hero-doodle-two" aria-hidden="true">✦</div>
          <div className="hero-copy">
            <p className="kicker"><span>Pink Pixel</span> · Uruguay</p>
            <h1 id="hero-title">Tu fiesta.<br /><em>Más tuya</em> que nunca.</h1>
            <p className="hero-intro">Toppers, juegos y souvenirs personalizados para convertir una idea en ese detalle del que todos hablan.</p>
            <div className="hero-actions">
              <a className="button button-ink" href={whatsappUrl("Hola Pink Pixel, quiero contarte una idea para mi fiesta.")} target="_blank" rel="noopener noreferrer" onClick={() => track("product_whatsapp", "hero")}>Quiero hacer un pedido <span aria-hidden>↗</span></a>
              <a className="scribble-link" href="#trabajos">Ver lo que hacemos <span aria-hidden>↓</span></a>
            </div>
          </div>

          <div className="hero-carousel" aria-roledescription="carrusel" aria-label="Trabajos destacados">
            <div className="hero-photo-stack">
              {heroSlides.map((slide, index) => {
                const offset = (index - heroIndex + heroSlides.length) % heroSlides.length
                const position = offset === 0 ? "is-active" : offset === 1 ? "is-next" : "is-previous"
                return <figure className={`hero-photo ${position}`} key={slide.src} aria-hidden={index !== heroIndex}><div className="hero-photo-image"><Image src={slide.src} alt={index === heroIndex ? slide.alt : ""} fill sizes="(max-width: 850px) 82vw, 42vw" priority={index === 0} /></div><figcaption><strong>{slide.title}</strong><span>{slide.note}</span></figcaption></figure>
              })}
              <div className="hero-sticker" aria-hidden="true"><span>100%</span> personalizado</div><Burst className="hero-burst" />
            </div>
            <div className="hero-controls"><button type="button" aria-label="Trabajo anterior" onClick={() => changeHero(-1)}>←</button><span><b>{String(heroIndex + 1).padStart(2, "0")}</b> / {String(heroSlides.length).padStart(2, "0")}</span><button type="button" aria-label="Trabajo siguiente" onClick={() => changeHero(1)}>→</button></div>
          </div>
        </section>

        <div className="promise-ribbon" aria-label="Diseñado para tu fiesta"><span>pensado para vos</span><b>♥</b><span>armado a mano</span><b>♥</b><span>listo para festejar</span><b>♥</b><span>pensado para vos</span></div>

        <section className="difference section" id="diferencia" aria-labelledby="difference-title">
          <header className="section-heading centered-heading"><p className="kicker">¿Qué tiene de especial?</p><h2 id="difference-title">No sale de una plantilla.<br /><em>Sale de tu historia.</em></h2></header>
          <div className="values-grid">{values.map((value, index) => <article className="value-card" key={value.number}><div className={`value-shape shape-${index + 1}`} aria-hidden="true"><span>{value.number}</span></div><h3>{value.title}</h3><p>{value.copy}</p></article>)}</div>
        </section>

        <section className="gallery-section section" id="trabajos" aria-labelledby="gallery-title">
          <div className="gallery-pattern" aria-hidden="true" />
          <header className="section-heading gallery-heading"><div><p className="kicker kicker-light">Nuestro trabajo</p><h2 id="gallery-title">Un poquito de<br /><em>lo que hacemos.</em></h2></div><p className="gallery-intro">Siete ideas distintas, hechas para siete momentos distintos. Tocá una para verla de cerca.</p></header>
          <div className="gallery-filters" role="group" aria-label="Filtrar trabajos">{[["todos", "Todo"], ["toppers", "Toppers"], ["juegos", "Juegos"], ["souvenirs", "Souvenirs"]].map(([value, label]) => <button className={filter === value ? "is-active" : ""} type="button" key={value} onClick={() => setFilter(value)}>{label}</button>)}</div>
          <div className="gallery-grid" aria-live="polite">{visibleProjects.map((project, index) => <button className={`gallery-card card-${(index % 6) + 1}`} type="button" key={project.id} onClick={() => { setViewer({ project, image: 1 }); track("gallery_open", project.id) }} aria-label={`Abrir ${project.title}, ${project.count} fotos`}><span className="gallery-image"><Image src={`/assets/trabajos/${project.id}/cover.webp`} alt={project.title} fill sizes="(max-width: 620px) 88vw, 34vw" /></span><span className="gallery-card-copy"><small>{project.kind} · {project.count} fotos</small><strong>{project.title}</strong><span>{project.summary}</span></span></button>)}</div>
        </section>

        <section className="products section" id="productos" aria-labelledby="products-title">
          <header className="section-heading products-heading"><div><p className="kicker">El catálogo</p><h2 id="products-title">Elegí por dónde<br /><em>empezar.</em></h2></div><p>Todo se adapta a la temática, la cantidad y la fecha de tu evento. Elegí una opción y escribinos: la cotización se arma para vos.</p></header>
          <div className="product-list">{products.map((product, index) => <article className="product-card" key={product.id}><a className="product-image" href={whatsappUrl(`Hola Pink Pixel, me gustaría consultar por ${product.name.toLowerCase()}.`)} target="_blank" rel="noopener noreferrer" onClick={() => track("product_whatsapp", product.slug)} aria-label={`Consultar por ${product.name}`}><Image src={product.imageSrc} alt={product.name} fill sizes="(max-width: 620px) 78vw, 23vw" /><span className="product-number">0{index + 1}</span></a><div className="product-copy"><small>{product.category}</small><h3>{product.name}</h3><p>{product.description}</p><a href={whatsappUrl(`Hola Pink Pixel, me gustaría consultar por ${product.name.toLowerCase()}.`)} target="_blank" rel="noopener noreferrer" onClick={() => track("product_whatsapp", product.slug)}>Consultar por WhatsApp <span aria-hidden>↗</span></a></div></article>)}</div>
          <div className="custom-note"><span aria-hidden>✦</span><p><strong>¿Tenés otra cosa en mente?</strong> Buenísimo. También hacemos propuestas desde cero.</p><a href={whatsappUrl("Hola Pink Pixel, tengo una idea distinta y me gustaría contártela.")} target="_blank" rel="noopener noreferrer">Contame tu idea →</a></div>
        </section>

        <section className="about section" id="sobre-mi" aria-labelledby="about-title">
          <div className="about-collage"><div className="about-photo about-photo-main"><Image src="/assets/trabajos/topper-capibara/full-1.webp" alt="Detalle artesanal de un topper de capibara" fill sizes="(max-width: 850px) 78vw, 38vw" /></div><div className="about-photo about-photo-small"><Image src="/assets/trabajos/memoria-sirena/full-2.webp" alt="Juego de memoria de sirena hecho por Pink Pixel" fill sizes="36vw" /></div><div className="about-tape" aria-hidden="true" /><div className="about-flower" aria-hidden="true">✿</div></div>
          <div className="about-copy"><p className="kicker">Detrás de Pink Pixel</p><h2 id="about-title">Hola, soy quien está <em>detrás de cada detalle.</em></h2><p className="about-lead">Pink Pixel es mi espacio para hacer algo que me encanta: escuchar una idea y verla tomar forma entre papeles, colores y capas.</p><p>Acá cada pedido pasa por las mismas manos, desde la primera charla hasta el armado final. Por eso puedo acompañarte de cerca, probar combinaciones y cuidar que todo llegue como lo imaginaste.</p><p className="about-signoff">Gracias por elegir algo hecho especialmente para vos.</p><a className="scribble-link" href="https://www.instagram.com/pinkpixel.uy" target="_blank" rel="noopener noreferrer">Nos vemos en Instagram <span aria-hidden>↗</span></a></div>
        </section>

        <section className="contact section" id="contacto" aria-labelledby="contact-title">
          <div className="contact-intro"><p className="kicker kicker-light">Hagámoslo realidad</p><h2 id="contact-title">Contame la idea.<br /><em>Yo le doy forma.</em></h2><p>Dejame los datos principales de tu evento. Al enviar, se abre tu correo con el mensaje listo para revisar.</p><div className="contact-direct"><span>También podés escribir directo:</span><a href="mailto:pinkpixeluy@gmail.com">pinkpixeluy@gmail.com</a><a href={whatsappUrl("Hola Pink Pixel, quiero hacer una consulta.")} target="_blank" rel="noopener noreferrer">WhatsApp · 099 152 065</a></div></div>
          <form className="contact-form" onSubmit={submitContact}><div className="form-title"><span>Tu consulta</span><b aria-hidden>✿</b></div><div className="field-row"><label>Tu nombre<input name="name" autoComplete="name" maxLength={80} placeholder="¿Cómo te llamás?" required /></label><label>Tu email<input name="email" type="email" autoComplete="email" maxLength={120} placeholder="nombre@email.com" required /></label></div><div className="field-row"><label>Teléfono<input name="phone" type="tel" autoComplete="tel" maxLength={30} placeholder="099 000 000" /></label><label>Fecha del evento<input name="date" type="date" /></label></div><label>¿Qué te gustaría crear?<textarea name="message" rows={4} maxLength={1200} placeholder="Contame la temática, qué producto te gustó y cuántos necesitás…" required /></label><button className="button button-ink" type="submit">Preparar mi consulta <span aria-hidden>↗</span></button><p className="form-note">No guardamos tus datos en la web.</p></form>
        </section>
      </main>

      <footer className="site-footer"><div className="footer-brand"><Image src="/assets/pinkpixel-logo.png" alt="Pink Pixel" width={4376} height={1261} /><p>Papelería creativa para celebrar a tu manera.</p></div><nav aria-label="Enlaces del pie"><a href="#trabajos">Trabajos</a><a href="#productos">Productos</a><a href="#sobre-mi">Sobre mí</a><a href="#contacto">Contacto</a></nav><div className="footer-social"><a href="https://www.instagram.com/pinkpixel.uy" target="_blank" rel="noopener noreferrer">Instagram ↗</a><a href="https://www.tiktok.com/@pink.pixel.uy" target="_blank" rel="noopener noreferrer">TikTok ↗</a><a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noopener noreferrer">WhatsApp ↗</a></div><small>© {new Date().getFullYear()} Pink Pixel · Uruguay</small></footer>

      <a className="whatsapp-fab" href={whatsappUrl("Hola Pink Pixel, quiero hacer una consulta.")} target="_blank" rel="noopener noreferrer" aria-label="Consultar por WhatsApp"><svg viewBox="0 0 32 32" aria-hidden="true"><path d="M16.02 3A12.8 12.8 0 0 0 5.11 22.5L3 29l6.7-2.02A12.97 12.97 0 1 0 16.02 3Zm0 23.58c-1.9 0-3.75-.51-5.37-1.48l-.38-.23-3.98 1.2 1.23-3.86-.25-.4A10.5 10.5 0 1 1 16.02 26.58Zm5.77-7.87c-.32-.16-1.87-.92-2.16-1.03-.29-.11-.5-.16-.71.16-.21.32-.82 1.03-1 1.24-.19.21-.37.24-.69.08-.32-.16-1.33-.49-2.54-1.57a9.5 9.5 0 0 1-1.76-2.18c-.18-.32-.02-.49.14-.65.14-.14.32-.37.47-.55.16-.18.21-.32.32-.53.1-.21.05-.4-.03-.55-.08-.16-.71-1.71-.98-2.34-.26-.62-.52-.54-.71-.55h-.61c-.21 0-.55.08-.84.4-.29.31-1.11 1.08-1.11 2.63s1.14 3.06 1.29 3.27c.16.21 2.24 3.41 5.42 4.79.76.33 1.35.52 1.81.67.76.24 1.45.21 2 .13.61-.09 1.87-.76 2.13-1.5.26-.74.26-1.37.18-1.5-.08-.14-.29-.21-.61-.37Z" /></svg></a>

      <dialog className="lightbox" ref={dialogRef} onClose={() => setViewer(null)} onClick={(event) => { if (event.target === dialogRef.current) setViewer(null) }}>{viewer && <><button className="lightbox-close" type="button" aria-label="Cerrar visor" onClick={() => setViewer(null)}>×</button><button className="lightbox-arrow prev" type="button" aria-label="Foto anterior" onClick={() => moveViewer(-1)}>←</button><figure><div className="lightbox-image"><Image src={`/assets/trabajos/${viewer.project.id}/full-${viewer.image}.webp`} alt={`${viewer.project.title}, foto ${viewer.image}`} fill sizes="90vw" /></div><figcaption><span>{viewer.project.kind}</span><strong>{viewer.project.title}</strong><small>{String(viewer.image).padStart(2, "0")} / {String(viewer.project.count).padStart(2, "0")}</small></figcaption></figure><button className="lightbox-arrow next" type="button" aria-label="Foto siguiente" onClick={() => moveViewer(1)}>→</button></>}</dialog>
    </>
  )
}
