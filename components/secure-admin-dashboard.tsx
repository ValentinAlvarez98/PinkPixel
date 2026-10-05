"use client"

import { FormEvent, useCallback, useEffect, useState } from "react"

import { deriveAdminCredential } from "@/lib/admin-credential"
import type { Product } from "@/lib/types"

type Metric = { event: string; target: string | null; total: number }
type AuthStatus = "checking" | "guest" | "authenticated"
type SessionPayload = { user: { username: string }; csrfToken: string }

const emptyProduct = {
  slug: "",
  name: "",
  category: "",
  description: "",
  imageSrc: "",
  sortOrder: 0,
}

export function AdminDashboard() {
  const [authStatus, setAuthStatus] = useState<AuthStatus>("checking")
  const [username, setUsername] = useState("maru.pink.pixel")
  const [password, setPassword] = useState("")
  const [csrfToken, setCsrfToken] = useState("")
  const [products, setProducts] = useState<Product[]>([])
  const [metrics, setMetrics] = useState<Metric[]>([])
  const [editing, setEditing] = useState<Product | null>(null)
  const [message, setMessage] = useState("")
  const [isBusy, setIsBusy] = useState(false)

  const loadCatalog = useCallback(async () => {
    const response = await fetch("/api/catalog", { cache: "no-store", credentials: "same-origin" })
    if (!response.ok) throw new Error("No se pudo cargar el catálogo")
    const data = await response.json() as { products: Product[] }
    setProducts(data.products)
  }, [])

  const loadMetrics = useCallback(async () => {
    const response = await fetch("/api/metrics", { cache: "no-store", credentials: "same-origin" })
    if (!response.ok) throw new Error("No se pudieron cargar las métricas")
    const data = await response.json() as { metrics: Metric[] }
    setMetrics(data.metrics)
  }, [])

  useEffect(() => {
    let active = true
    void (async () => {
      try {
        const response = await fetch("/api/auth/session", {
          cache: "no-store",
          credentials: "same-origin",
        })
        if (!response.ok) {
          if (active) setAuthStatus("guest")
          return
        }
        const session = await response.json() as SessionPayload
        if (!active) return
        setUsername(session.user.username)
        setCsrfToken(session.csrfToken)
        setAuthStatus("authenticated")
        await Promise.all([loadCatalog(), loadMetrics()])
      } catch {
        if (active) {
          setAuthStatus("guest")
          setMessage("No se pudo comprobar la sesión.")
        }
      }
    })()
    return () => { active = false }
  }, [loadCatalog, loadMetrics])

  const login = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsBusy(true)
    setMessage("")
    try {
      const credential = await deriveAdminCredential(username, password)
      setPassword("")
      const response = await fetch("/api/auth/login", {
        method: "POST",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, credential }),
      })
      const body = await response.json().catch(() => ({ error: "No se pudo iniciar sesión" })) as
        SessionPayload & { error?: string }
      if (!response.ok) throw new Error(body.error ?? "No se pudo iniciar sesión")

      setPassword("")
      setUsername(body.user.username)
      setCsrfToken(body.csrfToken)
      setAuthStatus("authenticated")
      await Promise.all([loadCatalog(), loadMetrics()])
      setMessage("Sesión iniciada correctamente.")
    } catch (error) {
      setPassword("")
      setMessage(error instanceof Error ? error.message : "No se pudo iniciar sesión.")
    } finally {
      setIsBusy(false)
    }
  }

  const logout = async () => {
    setIsBusy(true)
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "same-origin",
        headers: { "X-CSRF-Token": csrfToken },
      })
    } finally {
      setAuthStatus("guest")
      setCsrfToken("")
      setMetrics([])
      setProducts([])
      setEditing(null)
      setMessage("Sesión cerrada.")
      setIsBusy(false)
    }
  }

  const adminFetch = async (url: string, init: RequestInit = {}) => {
    const headers = new Headers(init.headers)
    if (init.body) headers.set("Content-Type", "application/json")
    const method = (init.method ?? "GET").toUpperCase()
    if (!["GET", "HEAD"].includes(method)) headers.set("X-CSRF-Token", csrfToken)

    const response = await fetch(url, {
      ...init,
      cache: "no-store",
      credentials: "same-origin",
      headers,
    })
    if (!response.ok) {
      if (response.status === 401) {
        setAuthStatus("guest")
        setCsrfToken("")
      }
      const body = await response.json().catch(() => ({ error: "Error" })) as { error?: string }
      throw new Error(body.error ?? "La operación falló")
    }
    return response
  }

  const saveProduct = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)
    const payload = {
      slug: String(data.get("slug")),
      name: String(data.get("name")),
      category: String(data.get("category")),
      description: String(data.get("description")),
      imageSrc: String(data.get("imageSrc")),
      sortOrder: Number(data.get("sortOrder")),
    }
    setIsBusy(true)
    try {
      await adminFetch(editing ? `/api/catalog/${editing.id}` : "/api/catalog", {
        method: editing ? "PATCH" : "POST",
        body: JSON.stringify(payload),
      })
      const wasEditing = Boolean(editing)
      setEditing(null)
      form.reset()
      await loadCatalog()
      setMessage(wasEditing ? "Producto actualizado." : "Producto creado.")
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "No se pudo guardar.")
    } finally {
      setIsBusy(false)
    }
  }

  const removeProduct = async (product: Product) => {
    if (!window.confirm(`¿Ocultar “${product.name}” del catálogo?`)) return
    setIsBusy(true)
    try {
      await adminFetch(`/api/catalog/${product.id}`, { method: "DELETE" })
      await loadCatalog()
      setMessage("Producto ocultado.")
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "No se pudo ocultar.")
    } finally {
      setIsBusy(false)
    }
  }

  const formValue = editing ?? emptyProduct

  if (authStatus !== "authenticated") {
    return (
      <main className="admin-shell admin-login-shell">
        <header className="admin-header admin-login-header">
          <a href="/">← Volver al sitio</a>
          <h1>Pink Pixel <span>admin</span></h1>
          <p>Un espacio privado para mantener el catálogo y revisar las consultas.</p>
        </header>
        <section className="admin-auth" aria-busy={authStatus === "checking" || isBusy}>
          <div className="admin-auth-heading">
            <span aria-hidden="true">✿</span>
            <div><small>Acceso privado</small><h2>Hola, Maru</h2></div>
          </div>
          {authStatus === "checking" ? (
            <p className="admin-checking" role="status">Comprobando tu sesión…</p>
          ) : (
            <form className="admin-login-form" onSubmit={login}>
              <label>Usuario<input type="text" value={username} onChange={(event) => setUsername(event.target.value)} autoComplete="username" autoCapitalize="none" spellCheck={false} maxLength={64} required /></label>
              <label>Contraseña<input type="password" value={password} onChange={(event) => setPassword(event.target.value)} autoComplete="current-password" maxLength={256} required /></label>
              <button type="submit" disabled={isBusy}>{isBusy ? "Ingresando…" : "Ingresar"}</button>
            </form>
          )}
          <p className="admin-auth-message" aria-live="polite">{message}</p>
        </section>
      </main>
    )
  }

  return (
    <main className="admin-shell">
      <header className="admin-header">
        <a href="/">← Volver al sitio</a>
        <div className="admin-header-row"><div><h1>Pink Pixel <span>admin</span></h1><p>Catálogo y métricas de los últimos 30 días.</p></div><button type="button" className="admin-logout" onClick={logout} disabled={isBusy}>Cerrar sesión</button></div>
        <p className="admin-status" aria-live="polite">{message}</p>
      </header>

      <section className="admin-section"><h2>Métricas</h2>{metrics.length ? <div className="metric-grid">{metrics.map((metric) => <article key={`${metric.event}-${metric.target}`}><strong>{metric.total}</strong><span>{metric.event}</span><small>{metric.target ?? "General"}</small></article>)}</div> : <p>Todavía no hay eventos en los últimos 30 días. No se recopilan IP, email ni identificadores personales.</p>}</section>

      <section className="admin-section"><h2>Catálogo</h2><div className="admin-product-list">{products.map((product) => <article key={product.id}><div><small>{product.category}</small><strong>{product.name}</strong><span>{product.slug}</span></div><div><button type="button" onClick={() => setEditing(product)}>Editar</button><button className="danger" type="button" onClick={() => removeProduct(product)}>Ocultar</button></div></article>)}</div></section>

      <section className="admin-section"><h2>{editing ? `Editar ${editing.name}` : "Agregar producto"}</h2><form className="admin-form" key={editing?.id ?? "new"} onSubmit={saveProduct}><label>Nombre<input name="name" defaultValue={formValue.name} required minLength={2} maxLength={100} /></label><label>Slug<input name="slug" defaultValue={formValue.slug} required pattern="[a-z0-9]+(?:-[a-z0-9]+)*" /></label><label>Categoría<input name="category" defaultValue={formValue.category} required maxLength={50} /></label><label>Orden<input name="sortOrder" type="number" defaultValue={formValue.sortOrder} min={0} max={10000} required /></label><label className="wide">Descripción<textarea name="description" defaultValue={formValue.description} required minLength={10} maxLength={300} /></label><label className="wide">Ruta de imagen<input name="imageSrc" defaultValue={formValue.imageSrc} placeholder="/assets/trabajos/.../cover.webp" required /></label><div className="admin-actions"><button type="submit" disabled={isBusy}>{editing ? "Guardar cambios" : "Crear producto"}</button>{editing && <button type="button" onClick={() => setEditing(null)}>Cancelar</button>}</div></form></section>
    </main>
  )
}
