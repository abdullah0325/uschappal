"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Product } from "@/lib/db"
import Header from "@/components/header"
import dynamic from "next/dynamic"
const ProductCard = dynamic(() => import("@/components/product-card"), { ssr: false })
import Footer from "@/components/footer"
import HeroSection from "@/components/hero-section"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { useCart } from "@/contexts/cart-context"
import { useRouter } from "next/navigation"
import { useState } from "react"

interface HomePageClientProps {
  featuredProducts: Product[]
}

export default function HomePageClient({ featuredProducts }: HomePageClientProps) {
  const { addItem, openCart } = useCart()
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")

  const handleAddToCart = (product: Product) => {
    addItem(product, 1)
    openCart()
  }

  const handleBuyNow = (product: Product) => {
    addItem(product, 1)
    router.push("/checkout")
  }

  const filteredProducts = searchTerm.trim() === ""
    ? featuredProducts
    : featuredProducts.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      )

  return (
    <div className="min-h-screen bg-amber-50 overflow-x-hidden">
      <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      {/* Hero Section */}
      <HeroSection />

      {/* Featured Products */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-0 md:px-6 overflow-x-hidden">
          <h3 className="text-2xl md:text-4xl font-bold text-center mb-8 md:mb-16 text-gray-900">Featured Products</h3>
          {/* Mobile: Vertical Grid Layout */}
          <div className="block md:hidden">
            <div className="grid grid-cols-1 gap-3 px-0">
              {filteredProducts.map((product) => (
                <div key={product.id} className="flex justify-center">
                  <ProductCard 
                    product={product} 
                    onAddToCart={handleAddToCart}
                    onBuyNow={handleBuyNow}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Desktop: Horizontal Carousel */}
          <div className="hidden md:block relative overflow-hidden">
            <Carousel
              opts={{
                align: "start",
                loop: true,
                skipSnaps: false,
                dragFree: true,
              }}
              className="w-full"
            >
              <CarouselContent className="-ml-2">
                {filteredProducts.map((product) => (
                  <CarouselItem key={product.id} className="pl-2 basis-1/3 lg:basis-1/4">
                    <div className="flex justify-center">
                      <ProductCard 
                        product={product} 
                        onAddToCart={handleAddToCart}
                        onBuyNow={handleBuyNow}
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-2 bg-amber-50/90 hover:bg-amber-100 shadow-lg" />
              <CarouselNext className="right-2 bg-amber-50/90 hover:bg-amber-100 shadow-lg" />
            </Carousel>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="bg-muted py-12 md:py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-gray-900">Crafted with Tradition</h3>
              <p className="text-sm md:text-base text-gray-600 mb-4 md:mb-6 leading-relaxed">
                For generations, our artisans have been creating authentic footwear using time-honored techniques passed
                down through families. Each pair is meticulously handcrafted with premium materials and traditional
                tools.
              </p>
              <ul className="space-y-2 md:space-y-3 text-sm md:text-base text-gray-600">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-primary rounded-full mr-3 flex-shrink-0"></span>
                  100% Genuine Materials
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-primary rounded-full mr-3 flex-shrink-0"></span>
                  Handcrafted by Skilled Artisans
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-primary rounded-full mr-3 flex-shrink-0"></span>
                  Traditional Design Heritage
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-primary rounded-full mr-3 flex-shrink-0"></span>
                  Comfortable & Durable
                </li>
              </ul>
            </div>
            <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
              <img
                src="/WhatsApp Image 2026-02-13 at 5.26.05 PM (2).jpeg"
                alt="Classic Brown Peshawari Chappal"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}




