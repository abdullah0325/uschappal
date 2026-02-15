import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { CartProvider } from "@/contexts/cart-context"
import CartDrawer from "@/components/cart-drawer"
import WhatsAppFloat from "@/components/whatsapp-float"
import { Suspense } from "react"
import "./globals.css"

export const metadata: Metadata = {
  title: {
    default: "US Chappal Umarzai - Premium Handmade Peshawari Chappals",
    template: "%s | US Chappal Umarzai"
  },
  description: "Shop authentic handmade Peshawari chappals and traditional footwear from US Chappal Umarzai. Premium leather, custom designs, free delivery across Pakistan. Order now!",
  keywords: [
    "Peshawari chappals",
    "handmade chappals",
    "traditional footwear",
    "leather chappals",
    "US Chappal Umarzai",
    "custom chappals",
    "Pakistani footwear",
    "authentic chappals",
    "premium leather",
    "Umarzai chappals"
  ],
  authors: [{ name: "US Chappal Umarzai" }],
  creator: "US Chappal Umarzai",
  publisher: "US Chappal Umarzai",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://uschappalumarzai.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://uschappalumarzai.com',
    siteName: 'US Chappal Umarzai',
    title: 'US Chappal Umarzai - Premium Handmade Peshawari Chappals',
    description: 'Shop authentic handmade Peshawari chappals and traditional footwear from US Chappal Umarzai. Premium leather, custom designs, free delivery across Pakistan.',
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: 'US Chappal Umarzai - Premium Handmade Peshawari Chappals',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'US Chappal Umarzai - Premium Handmade Peshawari Chappals',
    description: 'Shop authentic handmade Peshawari chappals and traditional footwear from US Chappal Umarzai.',
    images: ['/logo.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code', // Replace with actual verification code
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "US Chappal Umarzai",
    "description": "Premium handmade Peshawari chappals and traditional footwear manufacturer",
    "url": "https://uschappalumarzai.com",
    "logo": "https://uschappalumarzai.com/logo.png",
    "image": "https://uschappalumarzai.com/logo.png",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Harechand Road, Main Bazar Umarzai",
      "addressLocality": "Charsadda",
      "addressRegion": "KPK",
      "addressCountry": "Pakistan"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+92-345-9095280",
      "contactType": "customer service",
      "areaServed": "Pakistan",
      "availableLanguage": ["English", "Urdu", "Pashto"]
    },
    "sameAs": [
      "https://www.facebook.com/profile.php?id=61587401301518&sk=photos",
      "https://wa.me/923459095280"
    ],
    "foundingDate": "2020",
    "founder": {
      "@type": "Person",
      "name": "Usman Ali Khan"
    }
  }

  return (
    <html lang="en" className="overflow-x-hidden">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} overflow-x-hidden`}>
        <CartProvider>
          <Suspense fallback={null}>
            {children}
            <CartDrawer />
            <WhatsAppFloat />
          </Suspense>
        </CartProvider>
        <Analytics />
      </body>
    </html>
  )
}
