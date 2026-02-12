"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import type { Product } from "@/lib/db"

interface ProductCardProps {
  product: Product
  onAddToCart?: (product: Product) => void
  onBuyNow?: (product: Product) => void
}

export default function ProductCard({ product, onAddToCart, onBuyNow }: ProductCardProps) {
  return (
    <div
  className="w-full max-w-[280px] sm:min-w-[280px] sm:max-w-[280px] bg-amber-50 rounded-xl shadow-lg group transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer relative"
    >
      <Link href={`/products/${product.id}`} className="block">
        <div className="aspect-square bg-gray-100 relative">
          <Image
            src={product.image_url || `/placeholder.svg?height=300&width=300&query=Peshawari chappal ${product.name}`}
            alt={`${product.name} - Premium Handmade Peshawari Chappal`}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-110 rounded-t-xl"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={false}
          />
        </div>
      </Link>
      <div className="flex items-center justify-between px-3 sm:px-4 pt-3 sm:pt-4 pb-2 sm:pb-3">
        <span className="font-semibold text-xs sm:text-base text-gray-900 truncate max-w-[140px] sm:max-w-[160px]">{product.name}</span>
        <span className="text-xs sm:text-base font-bold text-primary whitespace-nowrap">Rs. {product.price.toLocaleString()}</span>
      </div>
      <div className="flex flex-row gap-2 px-3 sm:px-4 pb-3 sm:pb-4 w-full">
        <Button
          className="bg-primary text-white text-xs sm:text-sm flex-1"
          size="sm"
          onClick={e => {
            e.preventDefault();
            e.stopPropagation();
            onAddToCart?.(product);
          }}
        >
          Add to Cart
        </Button>
        <Button
          className="bg-green-700 text-white text-xs sm:text-sm flex-1"
          size="sm"
          onClick={e => {
            e.preventDefault();
            e.stopPropagation();
            onBuyNow?.(product);
          }}
        >
          Buy Now
        </Button>
      </div>
    </div>
  )
}
