// import Link from "next/link"

// export default function Footer() {
//   return (
//     <footer className="bg-gray-500 text-white py-12">
//       <div className="container mx-auto px-4">
//         <div className="grid md:grid-cols-3 gap-8">
//           <div>
//             <h4 className="text-xl font-bold mb-4 "><Link href="/" className="flex items-center">
//   <span className="flex items-center">
//     {/* Logo */}
//     <img 
//       src="/logo2.png" 
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
// </h4>
//             <p className="text-gray-200 mb-4">
//               Your trusted source for authentic Peshawari chappals. Quality craftsmanship since generations.
//             </p>
//             <div className="text-gray-400 space-y-1">
//               <p>📍 Charsadda, umarzai, Pakistan</p>
//               <p>📞 +92 345 9095280</p>
//               <p>✉️ uschappal@gmail.com</p>
//             </div>
//           </div>
//           <div>
//             <h5 className="font-semibold mb-4">Quick Links</h5>
//             <ul className="space-y-2 text-gray-400">
//               <li>
//                 <Link href="/products" className="hover:text-white transition-colors">
//                   Products
//                 </Link>
//               </li>
//               <li>
//                 <Link href="/about" className="hover:text-white transition-colors">
//                   About Us
//                 </Link>
//               </li>
//               <li>
//                 <Link href="/contact" className="hover:text-white transition-colors">
//                   Contact
//                 </Link>
//               </li>
//               <li>
//                 <Link href="/admin" className="hover:text-white transition-colors">
//                   Admin
//                 </Link>
//               </li>
//             </ul>
//           </div>
//           <div>
//             <h5 className="font-semibold mb-4">Categories</h5>
//             <ul className="space-y-2 text-gray-400">
//               <li>Men's Chappals</li>
//               <li>Women's Chappals</li>
//               <li>Kids Chappals</li>
//               <li>Premium Collection</li>
//             </ul>
//           </div>
//         </div>
//         <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
//           <p>&copy; US Chappal Umarzai. All rights reserved.</p>
//         </div>
//       </div>
//     </footer>
//   )
// }





import Link from "next/link"
import { Facebook } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-200 py-4">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Logo & Info */}
          <div>
            <h4 className="text-xl font-bold mb-4 drop-shadow-lg">
              <Link href="/" className="flex items-center">
                <span className="flex items-center">
                  {/* Logo */}
                  <img 
                    src="/logo2.png" 
                    alt="US Chappal Umarzai Logo" 
                    width={70} 
                    height={70} 
                    className="block"
                  />

                  {/* Brand name (always visible now) */}
                  <span className="text-2xl mt-4 font-extrabold tracking-wide text-amber-700">
                    UMARZAI
                  </span>
                </span>
                <span className="sr-only">US Chappal Umarzai</span>
              </Link>
            </h4>

            <p className="text-gray-400 mb-3 text-sm">
              Your trusted source for authentic Peshawari chappals. Quality craftsmanship since generations.
            </p>
            <div className="text-gray-400 space-y-1 text-sm">
              <p>📍 Charsadda, Umarzai, Pakistan</p>
              <p>📞 +92 345 9095280</p>
              <p>✉️ uschappal@gmail.com</p>
            </div>
            <div className="flex space-x-4 mt-4 text-amber-400">
              <a
                href="https://www.facebook.com/profile.php?id=61587401301518&sk=photos"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                <Facebook size={20} />
              </a>
              <a
                href="https://wa.me/923459095280"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12.04 2C6.49 2 2 6.39 2 11.92c0 2.1.62 4.04 1.7 5.7L2 22l4.5-1.62c1.6.87 3.45 1.37 5.54 1.37 5.55 0 10.04-4.39 10.04-9.92C22.08 6.39 17.59 2 12.04 2zm0 17.92c-1.73 0-3.34-.5-4.69-1.36l-.34-.2-2.67.96.91-2.6-.22-.34c-1.01-1.46-1.6-3.2-1.6-5.04 0-4.43 3.66-8.04 8.2-8.04s8.2 3.61 8.2 8.04c0 4.44-3.66 8.04-8.2 8.04zm4.59-6.06c-.25-.13-1.48-.73-1.71-.81-.23-.08-.4-.13-.57.13-.17.26-.65.81-.8.98-.15.17-.3.2-.55.07-.25-.13-1.05-.39-2-1.25-.74-.66-1.24-1.47-1.39-1.72-.15-.26-.02-.4.11-.53.11-.11.25-.3.38-.45.13-.15.17-.26.25-.43.08-.17.04-.32-.02-.45-.07-.13-.57-1.36-.78-1.86-.2-.48-.4-.42-.57-.43-.15-.01-.32-.01-.49-.01s-.45.06-.68.32c-.23.26-.89.87-.89 2.13 0 1.26.92 2.48 1.05 2.65.13.17 1.8 2.74 4.36 3.85.61.26 1.08.41 1.45.52.61.19 1.17.16 1.61.1.49-.07 1.48-.61 1.69-1.19.21-.57.21-1.05.15-1.15-.06-.1-.23-.16-.48-.29z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links + Categories in two columns */}
          <div className="col-span-2">
            <div className="grid grid-cols-2 gap-6">
              {/* Quick Links */}
              <div>
                <h5 className="font-semibold mb-3 text-white">Quick Links</h5>
                <ul className="space-y-2 text-gray-400 text-sm">
                  <li>
                    <Link href="/products" className="hover:text-amber-400 transition-colors">
                      Products
                    </Link>
                  </li>
                  <li>
                    <Link href="/about" className="hover:text-amber-400 transition-colors">
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link href="/contact" className="hover:text-amber-400 transition-colors">
                      Contact
                    </Link>
                  </li>
                  <li>
                    <Link href="/admin" className="hover:text-amber-400 transition-colors">
                      Admin
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Categories */}
              <div>
                <h5 className="font-semibold mb-3 text-white">Categories</h5>
                <ul className="space-y-2 text-gray-400 text-sm">
                  <li>Men's Chappals</li>
                  <li>Women's Chappals</li>
                  <li>Kids Chappals</li>
                  <li>Premium Collection</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-6 pt-3 text-center text-gray-400 text-sm">
          <p>&copy; US Chappal Umarzai. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
