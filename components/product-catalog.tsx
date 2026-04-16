"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { CustomProductModal } from "./custom-product-modal"
import { ProductCard } from "./product-card"
import type { ProductWithDetails } from "@/lib/database-types"
import { categories, products, productImages, productVariants, variantOptions } from "@/lib/sample-data"

const productsWithDetails: ProductWithDetails[] = products.map((product) => {
  const category = categories.find((cat) => cat.id === product.category_id)!
  const images = productImages.filter((img) => img.product_id === product.id)
  const variants = productVariants
    .filter((variant) => variant.product_id === product.id)
    .map((variant) => ({
      ...variant,
      options: variantOptions.filter((opt) => opt.variant_id === variant.id),
    }))

  return {
    ...product,
    category,
    images,
    variants,
  }
})

const categoryList = ["Todos", ...categories.map((cat) => cat.name)]

const ITEMS_PER_PAGE = 12

export function ProductCatalog() {
  const [selectedCategory, setSelectedCategory] = useState("Todos")
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [modalState, setModalState] = useState<{
    isOpen: boolean
    product: ProductWithDetails | null
  }>({
    isOpen: false,
    product: null,
  })

  const filteredProducts = productsWithDetails.filter((product) => {
    const matchesCategory = selectedCategory === "Todos" || product.category.name === selectedCategory
    const matchesSearch =
      searchQuery === "" ||
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.subcategory?.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const currentProducts = filteredProducts.slice(startIndex, endIndex)

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
    setCurrentPage(1)
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
    setCurrentPage(1)
  }

  const handleCustomProduct = (product: ProductWithDetails) => {
    setModalState({
      isOpen: true,
      product,
    })
  }

  return (
    <>
      <section id="productos" className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl mb-4 text-balance">
              Nuestro Catálogo
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
              Descubre nuestra amplia variedad de productos para decorar tu fiesta
            </p>
          </div>

          {/* Buscador */}
          <div className="max-w-md mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Buscar productos..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="pl-10"
              />
            </div>
          </div>

          {/* Filtros de categoría */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categoryList.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => handleCategoryChange(category)}
                className="rounded-full"
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Grid de productos */}
          {currentProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">No se encontraron productos</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentProducts.map((product) => (
                  <ProductCard key={product.id} product={product} onCustomize={handleCustomProduct} />
                ))}
              </div>

              {/* Paginación */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-12">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                  >
                    Anterior
                  </Button>
                  <div className="flex gap-2">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <Button
                        key={page}
                        variant={currentPage === page ? "default" : "outline"}
                        onClick={() => setCurrentPage(page)}
                        className="w-10"
                      >
                        {page}
                      </Button>
                    ))}
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                    disabled={currentPage === totalPages}
                  >
                    Siguiente
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Modal de personalización */}
      <CustomProductModal
        isOpen={modalState.isOpen}
        onClose={() => setModalState({ isOpen: false, product: null })}
        productName={modalState.product?.name || ""}
        productCategory={modalState.product?.category.name || ""}
      />
    </>
  )
}
