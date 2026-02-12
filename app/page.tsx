import { sql } from "@/lib/db"
import type { Product } from "@/lib/db"
import type { Metadata } from "next"
import HomePageClient from "./home-page-client"

// Always render dynamically so featured list reflects latest DB (no cache)
export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "Premium Handmade Peshawari Chappals | US Chappal Umarzai",
  description: "Discover authentic handmade Peshawari chappals crafted with premium leather. Custom designs, traditional craftsmanship, free delivery across Pakistan. Shop now!",
  keywords: [
    "Peshawari chappals",
    "handmade chappals Pakistan",
    "traditional footwear",
    "leather chappals Umarzai",
    "custom chappals",
    "authentic Pakistani footwear",
    "premium leather chappals",
    "US Chappal Umarzai"
  ],
  openGraph: {
    title: "Premium Handmade Peshawari Chappals | US Chappal Umarzai",
    description: "Discover authentic handmade Peshawari chappals crafted with premium leather. Custom designs, traditional craftsmanship, free delivery across Pakistan.",
    images: [
      {
        url: '/brown-peshawari-chappal-traditional-leather.jpg',
        width: 1200,
        height: 630,
        alt: 'Premium Handmade Peshawari Chappals from US Chappal Umarzai',
      },
    ],
  },
  alternates: {
    canonical: '/',
  },
}

// Disable ISR; always fetch fresh
export const revalidate = 0


async function getFeaturedProducts(): Promise<Product[]> {
  try {
    const products = await sql`
      SELECT * FROM products 
      WHERE is_featured = true AND COALESCE(is_active, true) = true
      ORDER BY updated_at DESC, created_at DESC 
      LIMIT 10
    ` as Product[];
    if (products.length > 0) return products;
    const fallback = await sql`
      SELECT * FROM products 
      WHERE COALESCE(is_active, true) = true
      ORDER BY updated_at DESC, created_at DESC 
      LIMIT 10
    ` as Product[];
    return fallback;
  } catch (error) {
    console.error("Error fetching featured products:", error)
    return []
  }
}

export default async function HomePage() {
  const featuredProducts = await getFeaturedProducts()

  return <HomePageClient featuredProducts={featuredProducts} />
}
