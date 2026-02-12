"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, ShoppingCart, Plus, Minus, MessageCircle } from "lucide-react"
import Link from "next/link"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { useRouter } from "next/navigation"
import { useCart } from "@/contexts/cart-context"
import { generateInquiryMessage, openWhatsApp } from "@/lib/whatsapp"
import dynamic from "next/dynamic"
const ProductCard = dynamic(() => import("@/components/product-card"), { ssr: false })

// Temporary Product type definition
interface Product {
  id: number
  name: string
  description: string | null
  price: number
  image_url: string | null
  category: string | null
  size: string | null
  color: string | null
  stock_quantity: number
  is_featured: boolean
  created_at: Date
  updated_at: Date
}

interface ProductPageClientProps {
  product: Product
}

async function getRelatedProducts(category: string, currentId: number): Promise<Product[]> {
  try {
    const response = await fetch("/api/admin/products")
    const data = await response.json()
    if (!data.products) return []
    
    // Filter related products by category and exclude current product
    const related = data.products.filter((p: Product) => 
      p.category === category && p.id !== currentId
    )
    
    // If no related products in same category, return other featured products
    if (related.length === 0) {
      return data.products.filter((p: Product) => p.is_featured && p.id !== currentId).slice(0, 4)
    }
    
    return related.slice(0, 4)
  } catch (error) {
    console.error("Error fetching related products:", error)
    return []
  }
}

export default function ProductPageClient({ product }: ProductPageClientProps) {
  const [quantity, setQuantity] = useState(1)
  const [selectedSize, setSelectedSize] = useState<string>("6")
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const { addItem, openCart } = useCart()
  const router = useRouter()

  useEffect(() => {
    async function loadRelatedProducts() {
      if (product.category) {
        const related = await getRelatedProducts(product.category, product.id)
        setRelatedProducts(related)
      }
      setLoading(false)
    }
    loadRelatedProducts()
  }, [product.category, product.id])

  const handleAddToCart = () => {
    const productWithSize = { ...product, size: selectedSize }
    addItem(productWithSize, quantity)
    openCart()
  }

  const handleBuyNow = () => {
    const productWithSize = { ...product, size: selectedSize }
    addItem(productWithSize, quantity)
    router.push("/checkout")
  }

  const handleWhatsAppInquiry = () => {
    const message = generateInquiryMessage(product)
    openWhatsApp(message)
  }

  const getStockStatus = () => {
    if (product.stock_quantity === 0) return { status: "Out of Stock", color: "bg-red-100 text-red-800" }
    if (product.stock_quantity <= 5) return { status: "Low Stock", color: "bg-yellow-100 text-yellow-800" }
    return { status: "In Stock", color: "bg-green-100 text-green-800" }
  }

  const stockStatus = getStockStatus()

  return (
    <div className="min-h-screen bg-amber-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
          <Link href="/" className="hover:text-amber-800">Home</Link>
          <span>/</span>
          <Link href="/products" className="hover:text-amber-800">Products</Link>
          <span>/</span>
          <span className="text-gray-900">{product.name}</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Product Image */}
          <div className="space-y-4">
            <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
              <img
                src={product.image_url || `/placeholder.svg?height=600&width=600&query=${product.name}`}
                alt={`${product.name} - Premium Handmade Peshawari Chappal`}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
              <div className="flex items-center gap-4 mb-4">
                <Badge className={stockStatus.color}>{stockStatus.status}</Badge>
                {product.is_featured && (
                  <Badge className="bg-amber-100 text-amber-800">Featured</Badge>
                )}
              </div>
              <p className="text-3xl font-bold text-amber-800 mb-4">
                Rs. {product.price.toLocaleString()}
              </p>
            </div>

            {product.description && (
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-2">Description</h2>
                <p className="text-gray-600 leading-relaxed">{product.description}</p>
              </div>
            )}

            {/* Product Specifications */}
            <div className="grid grid-cols-2 gap-4">
              {product.category && (
                <div>
                  <h3 className="font-medium text-gray-900">Category</h3>
                  <p className="text-gray-600">{product.category}</p>
                </div>
              )}
              {product.size && (
                <div>
                  <h3 className="font-medium text-gray-900">Size</h3>
                  <p className="text-gray-600">{product.size}</p>
                </div>
              )}
              {product.color && (
                <div>
                  <h3 className="font-medium text-gray-900">Color</h3>
                  <p className="text-gray-600">{product.color}</p>
                </div>
              )}
              <div>
                <h3 className="font-medium text-gray-900">Stock</h3>
                <p className="text-gray-600">{product.stock_quantity} available</p>
              </div>
            </div>

            {/* Size Selector */}
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Size (6-13)</h3>
                <div className="flex items-center space-x-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      const currentSize = parseInt(selectedSize);
                      if (currentSize > 6) {
                        setSelectedSize((currentSize - 1).toString());
                      }
                    }}
                    disabled={parseInt(selectedSize) <= 6}
                  >
                    <Minus size={16} />
                  </Button>
                  <input
                    type="number"
                    min={6}
                    max={13}
                    value={selectedSize}
                    onChange={e => {
                      const newSize = e.target.value;
                      const sizeNum = parseInt(newSize);
                      if (newSize === "" || (sizeNum >= 6 && sizeNum <= 13)) {
                        setSelectedSize(newSize);
                      }
                    }}
                    className="w-16 px-2 py-1 border rounded text-center focus:outline-none focus:ring-2 focus:ring-amber-500"
                    placeholder="6-13"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      const currentSize = parseInt(selectedSize);
                      if (currentSize < 13) {
                        setSelectedSize((currentSize + 1).toString());
                      }
                    }}
                    disabled={parseInt(selectedSize) >= 13}
                  >
                    <Plus size={16} />
                  </Button>
                </div>
                <p className="text-sm text-gray-500 mt-1">Select your shoe size (6-13)</p>
              </div>

              {/* Quantity Selector */}
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Quantity</h3>
                <div className="flex items-center space-x-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                  >
                    <Minus size={16} />
                  </Button>
                  <span className="text-lg font-medium w-12 text-center">{quantity}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setQuantity(Math.min(product.stock_quantity, quantity + 1))}
                    disabled={quantity >= product.stock_quantity}
                  >
                    <Plus size={16} />
                  </Button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <Button
                  onClick={handleAddToCart}
                  disabled={product.stock_quantity === 0}
                  className="w-full bg-amber-800 hover:bg-amber-900 text-white"
                  size="lg"
                >
                  <ShoppingCart size={20} className="mr-2" />
                  Add to Cart
                </Button>
                
                <Button
                  onClick={handleBuyNow}
                  disabled={product.stock_quantity === 0}
                  className="w-full bg-green-700 hover:bg-green-800 text-white"
                  size="lg"
                >
                  Buy Now
                </Button>

                <Button
                  onClick={handleWhatsAppInquiry}
                  variant="outline"
                  className="w-full border-green-500 text-green-700 hover:bg-green-50"
                  size="lg"
                >
                  <MessageCircle size={20} className="mr-2" />
                  Inquire on WhatsApp
                </Button>
              </div>
            </div>

            {/* Additional Info */}
            <div className="bg-amber-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">Why Choose This Product?</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• 100% Handmade with traditional techniques</li>
                <li>• Premium quality leather materials</li>
                <li>• Free delivery across Pakistan</li>
                <li>• Custom sizes available on request</li>
                <li>• Authentic Peshawari craftsmanship</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard
                  key={relatedProduct.id}
                  product={relatedProduct}
                  onAddToCart={() => addItem(relatedProduct, 1)}
                  onBuyNow={() => {
                    addItem(relatedProduct, 1)
                    router.push("/checkout")
                  }}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}




