// "use client"

// import Link from "next/link"
// import { Button } from "@/components/ui/button"
// import { Badge } from "@/components/ui/badge"
// import { ShoppingCart, Menu, X } from "lucide-react"
// import { useState } from "react"
// import { useCart } from "@/contexts/cart-context"

// export default function Header({ searchTerm, setSearchTerm }: { searchTerm?: string, setSearchTerm?: (term: string) => void }) {
//   const [isMenuOpen, setIsMenuOpen] = useState(false)
//   const { cart, openCart } = useCart()

//   return (
//     <header className="border-b bg-gradient-to-r from-amber-100 via-amber-50 to-amber-200 shadow-md sticky top-0 z-40">
//       <div className="container mx-auto px-4 py-4">
//         <div className="flex items-center justify-between">
//            <Link href="/" className="flex items-center">
//   <span className="flex items-center">
//     {/* Logo */}
//     <img 
//       src="/logo.png" 
//       alt="US Chappal Umarzai Logo" 
//       width={70} 
//       height={70} 
//       className="block"
//     />

//     {/* Brand name only on large screens */}
//     <span className="hidden md:inline-block  text-2xl mt-4 font-extrabold tracking-wide text-amber-900">
//       UMARZAI
//     </span>
//   </span>
//   <span className="sr-only">US Chappal Umarzai</span>
// </Link>


//           {/* Desktop Navigation */}
//           <nav className="hidden md:flex items-center space-x-6">
//             <Link href="/" className="text-amber-900 hover:text-amber-800 font-medium">
//               Home
//             </Link>
//             <Link href="/products" className="text-amber-900 hover:text-amber-800 font-medium">
//               Products
//             </Link>
//             <Link href="/about" className="text-amber-900 hover:text-amber-800 font-medium">
//               About
//             </Link>
//             <Link href="/contact" className="text-amber-900 hover:text-amber-800 font-medium">
//               Contact
//             </Link>
//             {typeof setSearchTerm === "function" && (
//               <input
//                 type="text"
//                 value={searchTerm || ""}
//                 onChange={e => setSearchTerm(e.target.value)}
//                 placeholder="Search products..."
//                 className="ml-6 w-64 border-2 border-amber-300 rounded-lg px-4 py-2 text-base focus:outline-none focus:border-amber-800 placeholder:text-gray-400"
//               />
//             )}
//             <Button
//               variant="outline"
//               size="sm"
//               className="flex items-center gap-2 relative bg-transparent"
//               onClick={openCart}
//             >
//               <ShoppingCart size={16} />
//               Cart
//               {cart.itemCount > 0 && (
//                 <Badge className="absolute -top-2 -right-2 bg-amber-800 text-white text-xs h-5 w-5 rounded-full flex items-center justify-center p-0">
//                   {cart.itemCount}
//                 </Badge>
//               )}
//             </Button>
//           </nav>

//           {/* Mobile Menu Button */}
//           <div className="md:hidden flex items-center gap-2">
//             <Button variant="ghost" size="sm" onClick={openCart} className="relative">
//               <ShoppingCart size={20} />
//               {cart.itemCount > 0 && (
//                 <Badge className="absolute -top-1 -right-1 bg-amber-800 text-white text-xs h-4 w-4 rounded-full flex items-center justify-center p-0">
//                   {cart.itemCount}
//                 </Badge>
//               )}
//             </Button>
//             <Button variant="ghost" size="sm" onClick={() => setIsMenuOpen(!isMenuOpen)}>
//               {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
//             </Button>
//           </div>
//         </div>

//         {/* Mobile Navigation */}
//         {isMenuOpen && (
//           <nav className="md:hidden mt-4 pb-4 border-t pt-4">
//             <div className="flex flex-col space-y-3">
//               <Link href="/" className="text-amber-900 hover:text-amber-800 font-medium">
//                 Home
//               </Link>
//               <Link href="/products" className="text-amber-900 hover:text-amber-800 font-medium">
//                 Products
//               </Link>
//               <Link href="/about" className="text-amber-900 hover:text-amber-800 font-medium">
//                 About
//               </Link>
//               <Link href="/contact" className="text-amber-900 hover:text-amber-800 font-medium">
//                 Contact
//               </Link>
//               {typeof setSearchTerm === "function" && (
//                 <input
//                   type="text"
//                   value={searchTerm || ""}
//                   onChange={e => setSearchTerm(e.target.value)}
//                   placeholder="Search products..."
//                   className="mt-4 w-full border-2 border-amber-300 rounded-lg px-4 py-2 text-base focus:outline-none focus:border-amber-800 placeholder:text-gray-400"
//                 />
//               )}
//             </div>
//           </nav>
//         )}
//       </div>
//     </header>
//   )
// }



"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, Menu, X } from "lucide-react"
import { useState } from "react"
import { useCart } from "@/contexts/cart-context"

export default function Header({ searchTerm, setSearchTerm }: { searchTerm?: string, setSearchTerm?: (term: string) => void }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { cart, openCart } = useCart()

  return (
    <header className="border-b bg-gradient-to-r from-amber-100 via-amber-50 to-amber-200 shadow-md sticky top-0 z-40">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="flex items-center">
              <Image 
                src="/logo.png" 
                alt="US Chappal Umarzai Logo - Premium Handmade Peshawari Chappals"
                width={70} 
                height={70} 
                className="block"
                priority
              />
              <span className="hidden md:inline-block text-2xl mt-4 font-extrabold tracking-wide text-amber-900">
                UMARZAI
              </span>
            </span>
            <span className="sr-only">US Chappal Umarzai</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/" className="text-amber-900 hover:text-amber-800 font-medium">Home</Link>
            <Link href="/products" className="text-amber-900 hover:text-amber-800 font-medium">Products</Link>
            <Link href="/about" className="text-amber-900 hover:text-amber-800 font-medium">About</Link>
            <Link href="/contact" className="text-amber-900 hover:text-amber-800 font-medium">Contact</Link>

            {typeof setSearchTerm === "function" && (
              <input
                type="text"
                value={searchTerm || ""}
                onChange={e => setSearchTerm(e.target.value)}
                placeholder="Search products..."
                className="ml-8 w-48 border border-amber-300 rounded-lg px-2 py-1 text-sm focus:outline-none focus:border-amber-800 placeholder:text-gray-400"
              />
            )}

            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2 relative bg-transparent"
              onClick={openCart}
            >
              <ShoppingCart size={16} />
              Cart
              {cart.itemCount > 0 && (
                <Badge className="absolute -top-2 -right-2 bg-amber-800 text-white text-xs h-5 w-5 rounded-full flex items-center justify-center p-0">
                  {cart.itemCount}
                </Badge>
              )}
            </Button>
          </nav>

          {/* Mobile Buttons */}
          <div className="md:hidden flex items-center gap-1n">
            {typeof setSearchTerm === "function" && (
              <div className="relative max-w-32 mr-3">
                <input
                  type="text"
                  value={searchTerm || ""}
                  onChange={e => setSearchTerm(e.target.value)}
                  placeholder="Search..."
                  className="w-full border border-amber-300 rounded-lg px-2 py-1 text-xs focus:outline-none focus:border-amber-800 placeholder:text-gray-400"
                />
              </div>
            )}
            <Button variant="ghost" size="sm" onClick={openCart} className="relative">
              <ShoppingCart size={20} />
              {cart.itemCount > 0 && (
                <Badge className="absolute -top-1 -right-1 bg-amber-800 text-white text-xs h-4 w-4 rounded-full flex items-center justify-center p-0">
                  {cart.itemCount}
                </Badge>
              )}
            </Button>
            <Button variant="ghost" size="sm" onClick={() => setIsMenuOpen(true)}>
              <Menu size={20} />
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {/* Mobile Navigation Drawer */}
{/* Mobile Navigation Drawer */}
{isMenuOpen && (
  <div 
    className="fixed inset-0 z-50 bg-black/40 flex justify-end" 
    onClick={() => setIsMenuOpen(false)}
  >
    <div 
      className="bg-amber-50 shadow-lg rounded-l-2xl w-40 max-w-[75%] p-6 flex flex-col space-y-4 mt-20 mb-50"
      onClick={e => e.stopPropagation()}
    >
      
     

      {/* Menu Links as Styled Buttons */}
      <Link 
        href="/" 
        className="block text-center bg-white border border-amber-200 rounded-lg shadow-sm px-4 py-2 font-medium text-amber-900 hover:bg-amber-100 hover:shadow-md transition"
      >
        Home
      </Link>
      <Link 
        href="/products" 
        className="block text-center bg-white border border-amber-200 rounded-lg shadow-sm px-4 py-2 font-medium text-amber-900 hover:bg-amber-100 hover:shadow-md transition"
      >
        Products
      </Link>
      <Link 
        href="/about" 
        className="block text-center bg-white border border-amber-200 rounded-lg shadow-sm px-4 py-2 font-medium text-amber-900 hover:bg-amber-100 hover:shadow-md transition"
      >
        About
      </Link>
      <Link 
        href="/contact" 
        className="block text-center bg-white border border-amber-200 rounded-lg shadow-sm px-4 py-2 font-medium text-amber-900 hover:bg-amber-100 hover:shadow-md transition"
      >
        Contact
      </Link>
    </div>
  </div>
)}



    </header>
  )
}
