"use client"

export { AdminDashboard } from "@/components/secure-admin-dashboard"

/* Legacy implementation retained only for patch history.

import { FormEvent, useCallback, useEffect, useState } from "react"

import type { Product } from "@/lib/types"

type Metric = { event: string; target: string | null; total: number }

const emptyProduct = {
  slug: "",
  name: "",
  category: "",
  description: "",
  imageSrc: "",
  sortOrder: 0,
}

export function AdminDashboard() {
  const [token, setToken] = useState("")
  const [products, setProducts] = useState<Product[]>([])
  const [metrics, setMetrics] = useState<Metric[]>([])
  const [editing, setEditing] = useState<Product | null>(null)
  const [message, setMessage] = useState("")

  const loadCatalog = useCallback(async () => {
    const response = await fetch("/api/catalog", { cache: "no-store" })
    if (!response.ok) throw new Error("No se pudo cargar el catálogo")
    const data = await response.json() as { products: Product[] }
    setProducts(data.products)
  }, [])

  useEffect(() => { void loadCatalog().catch(() => setMessage("No se pudo cargar el catálogo.")) }, [loadCatalog])

  const adminFetch = async (url: string, init: RequestInit = {}) => {
    const response = await fetch(url, {
      ...init,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        ...init.headers,
      },
    })
    if (!response.ok) {
      const body = await response.json().catch(() => ({ error: "Error" })) as { error?: string }
      throw new Error(body.error ?? "La operación falló")
    }
    return response
  }

  const loadMetrics = async () => {
    try {
      const response = await adminFetch("/api/metrics")
      const data = await response.json() as { metrics: Metric[] }
      setMetrics(data.metrics)
      setMessage("Acceso verificado. El token permanece solo en esta pestaña.")
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "No se pudieron cargar las métricas.")
    }
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
    try {
      await adminFetch(editing ? `/api/catalog/${editing.id}` : "/api/catalog", {
        method: editing ? "PATCH" : "POST",
        body: JSON.stringify(payload),
      })
      setEditing(null)
      form.reset()
      await loadCatalog()
      setMessage(editing ? "Producto actualizado." : "Producto creado.")
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "No se pudo guardar.")
    }
  }

  const removeProduct = async (product: Product) => {
    if (!window.confirm(`¿Ocultar “${product.name}” del catálogo?`)) return
    try {
      await adminFetch(`/api/catalog/${product.id}`, { method: "DELETE" })
      await loadCatalog()
      setMessage("Producto ocultado.")
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "No se pudo ocultar.")
    }
  }

  const formValue = editing ?? emptyProduct

  return (
    <main className="admin-shell">
      <header className="admin-header"><a href="/">← Volver al sitio</a><h1>Pink Pixel <span>admin</span></h1><p>Catálogo y métricas de los últimos 30 días.</p></header>
      <section className="admin-auth"><label>Token administrativo<input type="password" value={token} onChange={(event) => setToken(event.target.value)} autoComplete="off" minLength={32} /></label><button type="button" onClick={loadMetrics} disabled={token.length < 32}>Verificar y cargar métricas</button><p aria-live="polite">{message}</p></section>

      <section className="admin-section"><h2>Métricas</h2>{metrics.length ? <div className="metric-grid">{metrics.map((metric) => <article key={`${metric.event}-${metric.target}`}><strong>{metric.total}</strong><span>{metric.event}</span><small>{metric.target ?? "General"}</small></article>)}</div> : <p>Ingresá el token para ver datos. No se recopilan IP, email ni identificadores personales.</p>}</section>

      <section className="admin-section"><h2>Catálogo</h2><div className="admin-product-list">{products.map((product) => <article key={product.id}><div><small>{product.category}</small><strong>{product.name}</strong><span>{product.slug}</span></div><div><button type="button" onClick={() => setEditing(product)}>Editar</button><button className="danger" type="button" onClick={() => removeProduct(product)}>Ocultar</button></div></article>)}</div></section>

      <section className="admin-section"><h2>{editing ? `Editar ${editing.name}` : "Agregar producto"}</h2><form className="admin-form" key={editing?.id ?? "new"} onSubmit={saveProduct}><label>Nombre<input name="name" defaultValue={formValue.name} required minLength={2} maxLength={100} /></label><label>Slug<input name="slug" defaultValue={formValue.slug} required pattern="[a-z0-9]+(?:-[a-z0-9]+)*" /></label><label>Categoría<input name="category" defaultValue={formValue.category} required maxLength={50} /></label><label>Orden<input name="sortOrder" type="number" defaultValue={formValue.sortOrder} min={0} max={10000} required /></label><label className="wide">Descripción<textarea name="description" defaultValue={formValue.description} required minLength={10} maxLength={300} /></label><label className="wide">Ruta de imagen<input name="imageSrc" defaultValue={formValue.imageSrc} placeholder="/assets/trabajos/.../cover.webp" required /></label><div className="admin-actions"><button type="submit" disabled={token.length < 32}>{editing ? "Guardar cambios" : "Crear producto"}</button>{editing && <button type="button" onClick={() => setEditing(null)}>Cancelar</button>}</div></form></section>
    </main>
  )
}
*/
