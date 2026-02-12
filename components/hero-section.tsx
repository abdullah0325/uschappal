"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import Image from "next/image"

const heroImages = [
  "/brown-peshawari-chappal-traditional-leather.jpg",
  "/black-peshawari-chappal-formal-leather.jpg",
  "/tan-suede-peshawari-chappal-comfortable.jpg",
  "/premium-leather-chappal-brown.jpg",
  "/wedding-special-chappal-gold.jpg",
  "/embroidered-pakistani-chappal.jpg",
]

export default function HeroSection() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        (prevIndex + 1) % heroImages.length
      )
    }, 6000) // Change image every 6 seconds (2 seconds longer)

    return () => clearInterval(interval)
  }, [])

  return (
  <section className="relative h-[50vh] sm:h-[60vh] md:h-[70vh] min-h-[400px] sm:min-h-[450px] md:min-h-[470px] max-h-[600px] sm:max-h-[650px] md:max-h-[700px] overflow-hidden">
      {/* Background Carousel */}
  <div className="absolute inset-0">
        {heroImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentImageIndex ? 'opacity-70' : 'opacity-0'
            }`}
          >
            <Image
              src={image}
              alt={`Featured product ${index + 1}`}
              fill
              className="object-cover scale-110"
              priority={index === 0}
              style={{ objectPosition: 'center' }}
            />
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
  <div className="container mx-auto px-6 md:px-12 lg:px-16 text-center overflow-x-hidden">
          <h2 className="text-2xl sm:text-3xl md:text-6xl lg:text-7xl font-bold text-white mb-4 md:mb-6 text-balance drop-shadow-lg">
            Premium Handcrafted Chappals
          </h2>
          <p className="text-sm sm:text-base md:text-xl lg:text-2xl text-white/90 mb-6 md:mb-8 max-w-3xl mx-auto text-pretty drop-shadow-md">
            Discover our collection of traditional Peshawari chappals. Each piece crafted with heritage and premium materials.
          </p>
          <div className="flex flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-amber-600 hover:bg-amber-700 text-white shadow-lg hover:shadow-xl transition-all duration-300" 
              asChild
            >
              <Link href="/products">Shop Now</Link>
            </Button>
            <Button 
              size="lg" 
              className="bg-white text-amber-800 border-amber-300 hover:bg-amber-100 hover:text-amber-900 shadow-lg hover:shadow-xl transition-all duration-300" 
              asChild
            >
              <Link href="/about">Learn More</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Carousel Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10">
        <div className="flex space-x-2">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentImageIndex 
                  ? 'bg-white scale-125' 
                  : 'bg-white/50 hover:bg-white/75'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
