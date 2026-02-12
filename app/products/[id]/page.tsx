"use client"

import { useState, useEffect } from "react"
// import { sql } from "@/lib/db"
// import type { Product } from "@/lib/db"

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

async function getProduct(id: string): Promise<Product | null> {
  try {
    const response = await fetch(`/api/admin/products`)
    const data = await response.json()
    if (!data.products) return null
    const productId = Number.parseInt(id)
    if (isNaN(productId)) return null
    const product = data.products.find((p: Product) => p.id === productId)
    return product || null
  } catch (error) {
    console.error("Error fetching product:", error)
    return null
  }
}

async function getRelatedProducts(category: string, currentId: number): Promise<Product[]> {
  try {
    // Fallback data for related products - using same data as main products
    const fallbackProducts: Product[] = [
      {
        id: 1,
        name: "Classic Brown Peshawari Chappal",
        description: "Traditional handcrafted Peshawari chappal made from premium leather with authentic design.",
        price: 2500.00,
        image_url: "/traditional-pakistani-artisan-making-peshawari-cha.jpg",
        category: "Traditional",
        size: "42",
        color: "Brown",
        stock_quantity: 10,
        is_featured: true,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 2,
        name: "Premium Leather Chappal",
        description: "High-quality leather chappal with comfortable sole, perfect for daily wear and special occasions.",
        price: 3200.00,
        image_url: "/premium-leather-chappal-brown.jpg",
        category: "Premium",
        size: "41",
        color: "Black",
        stock_quantity: 8,
        is_featured: true,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 3,
        name: "Embroidered Chappal",
        description: "Beautiful handmade chappal with traditional embroidery work, showcasing the rich cultural heritage.",
        price: 2800.00,
        image_url: "/embroidered-pakistani-chappal.jpg",
        category: "Embroidered",
        size: "43",
        color: "Tan",
        stock_quantity: 5,
        is_featured: true,
        created_at: new Date(),
        updated_at: new Date()
      }
    ]
    
    return fallbackProducts.filter(p => p.category === category && p.id !== currentId).slice(0, 4)
  } catch (error) {
    console.error("Error fetching related products:", error)
    return []
  }
}

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const [product, setProduct] = useState<Product | null>(null)
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([])
  const [quantity, setQuantity] = useState(1)
    const [selectedSize, setSelectedSize] = useState<string>("0")
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)
  const { addItem, openCart } = useCart()
  const router = useRouter()

  useEffect(() => {
    async function loadData() {
      console.log("[v0] Loading product data for ID:", params.id, "Type:", typeof params.id)
      console.log("[v0] Params object:", params)
      
      const productData = await getProduct(params.id)
      console.log("[v0] Product data received:", productData)
      
      if (!productData) {
        console.log("[v0] No product found, setting notFound to true")
        setNotFound(true)
        setLoading(false)
        return
      }

      console.log("[v0] Product found, setting product data")
      setProduct(productData)
      const related = await getRelatedProducts(productData.category || "", productData.id)
      setRelatedProducts(related)
      setLoading(false)
    }

    loadData()
  }, [params.id])

  const handleAddToCart = () => {
    if (product) {
      addItem(product, quantity)
      openCart()
    }
  }

  const handleWhatsAppInquiry = () => {
    if (product) {
  let message = `Hello! I'm interested in this product at Us Chappal Umarzai.%0A%0A`;
      message += `Product: ${product.name}%0A`;
      if (product.description) message += `Description: ${product.description}%0A`;
      message += `Price: Rs. ${product.price.toLocaleString()}%0A`;
      message += `%0AYou can add more details here...`;
      openWhatsApp(message);
    }
  }

  console.log("[v0] Render state - loading:", loading, "notFound:", notFound, "product:", product)

  if (loading) {
    return (
  <div className="min-h-screen bg-amber-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-32 mb-6"></div>
            <div className="grid md:grid-cols-2 gap-12">
              <div className="aspect-square bg-gray-200 rounded-lg"></div>
              <div className="space-y-4">
                <div className="h-8 bg-gray-200 rounded w-3/4"></div>
                <div className="h-6 bg-gray-200 rounded w-1/2"></div>
                <div className="h-20 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  if (notFound) {
    console.log("[v0] Rendering 404 page")
    return (
  <div className="min-h-screen bg-amber-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">Product Not Found</h1>
          <p className="text-muted-foreground mb-8">The product you're looking for doesn't exist.</p>
          <Button asChild>
            <Link href="/products" className="flex items-center gap-2">
              <ArrowLeft size={16} />
              Back to Products
            </Link>
          </Button>
        </div>
      </div>
    )
  }

  if (!product) {
    return null
  }

  return (
  <div className="min-h-screen bg-amber-50">
      <Header />
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <Button variant="ghost" className="mb-8" asChild>
          <Link href="/products" className="flex items-center gap-2">
            <ArrowLeft size={16} />
            Back to Products
          </Link>
        </Button>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 mb-16">
          {/* Product Image */}
          <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden relative w-full mx-auto max-w-xs md:max-w-full">
            <img
              src={product.image_url || `/placeholder.svg?height=600&width=600&query=Peshawari chappal ${product.name}`}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            {product.is_featured && <Badge className="absolute top-4 left-4 bg-amber-800">Featured</Badge>}
          </div>
          {/* Product Details */}
          <div className="w-full md:w-4/5 mx-auto flex flex-col justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-6">{product.name}</h1>
              
              <div className="space-y-4 mb-8">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Description</h3>
                  <p className="text-gray-600 leading-relaxed text-sm">{product.description || "No description available."}</p>
                </div>
              </div>
              
              {/* Product features */}
              <div className="text-sm text-gray-600 space-y-3 mb-10 pl-2">
                <p>✓ Handcrafted with traditional techniques</p>
                <p>✓ 100% genuine leather</p>
                <p>✓ Comfortable and durable</p>
                <p>✓ Free delivery in Pakistan</p>
              </div>
              
              <div className="flex justify-between items-center gap-4 mb-8 border-t border-b border-gray-200 py-4">
                <div className="flex-1">
                  {/* Size selector with +/- buttons and numeric input (1-100) */}
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium text-gray-900 mr-2">Size:</h4>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        let size = parseInt(selectedSize || "6");
                        if (size > 6) {
                          setSelectedSize((size - 1).toString());
                        }
                      }}
                      aria-label="Decrease size"
                    >
                      <Minus size={16} />
                    </Button>
                    <input
                      type="number"
                      min={6}
                      max={13}
                      value={selectedSize || ""}
                      onChange={e => {
                        let val = e.target.value;
                        // Only allow numbers between 6 and 13
                        if (/^\d+$/.test(val)) {
                          let num = Math.max(6, Math.min(13, parseInt(val)));
                          setSelectedSize(num.toString());
                        } else if (val === "") {
                          setSelectedSize("");
                        }
                      }}
                      className="w-16 px-2 py-1 border rounded text-center focus:outline-none focus:ring-2 focus:ring-amber-500"
                      aria-label="Select size"
                    />
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        let size = parseInt(selectedSize || "6");
                        if (size < 13) {
                          setSelectedSize((size + 1).toString());
                        }
                      }}
                      aria-label="Increase size"
                    >
                      <Plus size={16} />
                    </Button>
                  </div>
                  {!selectedSize && <p className="text-red-600 text-xs mt-2">Please select a size (6-13).</p>}
                </div>
                <span className="text-2xl font-bold text-amber-800 text-right">Rs. {product.price.toLocaleString()}</span>
              </div>
            </div>
            
            {/* Buttons at the bottom with more margin */}
            <div className="flex flex-col md:flex-row gap-4 mt-auto">
              <Button
                size="sm"
                className="flex-1 bg-amber-800 hover:bg-amber-900 flex items-center gap-1"
                disabled={!selectedSize}
                onClick={handleAddToCart}
              >
                <ShoppingCart size={16} />
                Add to Cart
              </Button>
              <Button
                size="sm"
                className="flex-1 bg-green-700 hover:bg-green-800 text-white flex items-center gap-1"
                disabled={!selectedSize}
                onClick={() => {
                  if (product && selectedSize) {
                    // Add to cart first
                    addItem(product, quantity);
                    // Then redirect to checkout
                    window.location.href = "/checkout";
                  }
                }}
              >
                Buy Now
              </Button>
              {/* WhatsApp button */}
              <Button
                size="sm"
                className="flex-1 bg-green-500 hover:bg-green-600 text-white flex items-center gap-1"
                onClick={handleWhatsAppInquiry}
              >
                <MessageCircle size={16} />
                WhatsApp
              </Button>
            </div>
          </div>
        </div>
        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <Card key={relatedProduct.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-square bg-gray-100 relative">
                    <img
                      src={
                        relatedProduct.image_url ||
                        `/placeholder.svg?height=300&width=300&query=Peshawari chappal ${relatedProduct.name || "/placeholder.svg"}`
                      }
                      alt={relatedProduct.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-2 line-clamp-1">{relatedProduct.name}</h3>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-lg font-bold text-amber-800">
                        Rs. {relatedProduct.price.toLocaleString()}
                      </span>
                    </div>
                    <Button size="sm" className="w-full bg-amber-800 hover:bg-amber-900" asChild>
                      <Link href={`/products/${relatedProduct.id}`}>View Details</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}
      </div>
      <Footer />
    </div>
  )
}
