import { sql } from "@/lib/db"
import type { Product } from "@/lib/db"
import type { Metadata } from "next"
import ProductsPageClient from "./products-page-client"

// Ensure fresh list of active products (no cache)
export const dynamic = "force-dynamic"
export const revalidate = 0

export const metadata: Metadata = {
  title: "All Products - Handmade Peshawari Chappals Collection",
  description: "Browse our complete collection of handmade Peshawari chappals. Traditional designs, premium leather, custom sizes available. Free delivery across Pakistan.",
  keywords: [
    "Peshawari chappals collection",
    "handmade chappals all products",
    "traditional footwear catalog",
    "leather chappals Pakistan",
    "custom chappals sizes",
    "authentic Pakistani footwear",
    "premium leather collection",
    "US Chappal Umarzai products"
  ],
  openGraph: {
    title: "All Products - Handmade Peshawari Chappals Collection",
    description: "Browse our complete collection of handmade Peshawari chappals. Traditional designs, premium leather, custom sizes available.",
    images: [
      {
        url: '/traditional-pakistani-artisan-making-peshawari-cha.jpg',
        width: 1200,
        height: 630,
        alt: 'Complete Collection of Handmade Peshawari Chappals',
      },
    ],
  },
  alternates: {
    canonical: '/products',
  },
}

async function getAllProducts(): Promise<Product[]> {
  try {
    const products = await sql`
      SELECT * FROM products
      WHERE COALESCE(is_active, true) = true
      ORDER BY updated_at DESC, created_at DESC
    `
    return products as Product[]
  } catch (error) {
    console.error("Error fetching products:", error)
    return []
  }
}



export default async function ProductsPage() {
  const allProducts = await getAllProducts()

  return <ProductsPageClient initialProducts={allProducts} />
}
