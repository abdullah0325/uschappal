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
