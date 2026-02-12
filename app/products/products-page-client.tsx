"use client"

import { useState, useEffect } from "react"
import type { Product } from "@/lib/db"
import Header from "@/components/header"
import dynamic from "next/dynamic"
import Footer from "@/components/footer"
import { useCart } from "@/contexts/cart-context"
import { useRouter } from "next/navigation"

const ProductCard = dynamic(() => import("@/components/product-card"), { ssr: false })

interface ProductsPageClientProps {
  initialProducts: Product[]
}

export default function ProductsPageClient({ initialProducts }: ProductsPageClientProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [allProducts, setAllProducts] = useState<Product[]>(initialProducts)
  const [loading, setLoading] = useState(false)
  const { addItem, openCart } = useCart()
  const router = useRouter()

  useEffect(() => {
    setAllProducts(initialProducts)
  }, [initialProducts])

  const filteredProducts = searchTerm.trim() === ""
    ? allProducts
    : allProducts.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      )

  const handleAddToCart = (product: Product) => {
    addItem(product, 1)
    // Do not open cart
  }

  const handleBuyNow = (product: Product) => {
    addItem(product, 1)
    router.push("/checkout")
  }

  return (
    <div className="min-h-screen bg-amber-50 overflow-x-hidden">
      <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <div className="container mx-auto px-2 sm:px-4 py-8 overflow-x-hidden">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Products</h1>
          <p className="text-gray-600">Showing {filteredProducts.length} products</p>
        </div>
        {loading ? (
          <div className="text-center py-16 text-gray-500">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-600 mx-auto mb-4"></div>
            Loading products...
            <p className="text-sm mt-2">If this takes too long, check the console for errors</p>
          </div>
        ) : (
          <>
            <div className="flex flex-wrap gap-3 sm:gap-6 justify-center px-1">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={handleAddToCart}
                  onBuyNow={handleBuyNow}
                />
              ))}
            </div>
            {filteredProducts.length === 0 && (
              <div className="text-center py-16">
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">No Products Found</h3>
                <p className="text-gray-600">Please check back later for our latest collection.</p>
              </div>
            )}
          </>
        )}
      </div>
      <Footer />
    </div>
  )
}
