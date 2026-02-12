// import Header from "@/components/header"
// import Footer from "@/components/footer"
// import { Card, CardContent } from "@/components/ui/card"

// export default function AboutPage() {
//   return (
//   <div className="min-h-screen bg-amber-50">
//       <Header />

//       <div className="container mx-auto px-4 py-8">
//         {/* Hero Section */}
//         <section className="text-center mb-16">
//           <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 text-balance">
//             About Us Chappal Umarzai
//           </h1>
//           <p className="text-xl text-gray-600 max-w-3xl mx-auto text-pretty">
//             For generations, we have been preserving the art of traditional Peshawari chappal making, combining
//             time-honored craftsmanship with modern comfort and style.
//           </p>
//         </section>

//         {/* Story Section */}
//         <section className="grid md:grid-cols-2 gap-12 items-center mb-16">
//           <div>
//             <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
//             <div className="space-y-4 text-gray-600 leading-relaxed">
//               <p>
//                 Us Chappal Umarzai was founded with a simple mission: to preserve and share the authentic art of
//                 Peshawari chappal making with the world. What started as a small family workshop in Peshawar has grown
//                 into a trusted name for quality traditional footwear.
//               </p>
//               <p>
//                 Our founder, Abdullah, learned the craft from his father and grandfather, who were master artisans in
//                 their own right. Each technique, each stitch, and each finishing touch has been passed down through
//                 generations, ensuring that every pair of chappals we create maintains the authentic character and
//                 superior quality of traditional Peshawari craftsmanship.
//               </p>
//               <p>
//                 Today, we continue to honor this legacy while adapting to modern needs, creating chappals that are not
//                 only beautiful and authentic but also comfortable for contemporary lifestyles.
//               </p>
//             </div>
//           </div>
//           <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
//             <img src="/placeholder-7v6go.png" alt="Traditional workshop" className="w-full h-full object-cover" />
//           </div>
//         </section>

//         {/* Values Section */}
//         <section className="mb-16">
//           <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Our Values</h2>
//           <div className="grid md:grid-cols-3 gap-8">
//             <Card className="text-center">
//               <CardContent className="p-8">
//                 <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                   <span className="text-2xl">🏺</span>
//                 </div>
//                 <h3 className="text-xl font-semibold mb-4">Authentic Craftsmanship</h3>
//                 <p className="text-gray-600">
//                   Every chappal is handcrafted using traditional techniques passed down through generations, ensuring
//                   authentic quality and character.
//                 </p>
//               </CardContent>
//             </Card>

//             <Card className="text-center">
//               <CardContent className="p-8">
//                 <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                   <span className="text-2xl">🌟</span>
//                 </div>
//                 <h3 className="text-xl font-semibold mb-4">Premium Quality</h3>
//                 <p className="text-gray-600">
//                   We use only the finest genuine leather and materials, ensuring durability, comfort, and long-lasting
//                   beauty in every pair.
//                 </p>
//               </CardContent>
//             </Card>

//             <Card className="text-center">
//               <CardContent className="p-8">
//                 <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                   <span className="text-2xl">🤝</span>
//                 </div>
//                 <h3 className="text-xl font-semibold mb-4">Customer Satisfaction</h3>
//                 <p className="text-gray-600">
//                   Your satisfaction is our priority. We're committed to providing excellent service and products that
//                   exceed your expectations.
//                 </p>
//               </CardContent>
//             </Card>
//           </div>
//         </section>

//         {/* Process Section */}
//         <section className="bg-amber-50 rounded-lg p-8 md:p-12 mb-16">
//           <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Our Crafting Process</h2>
//           <div className="grid md:grid-cols-4 gap-8">
//             <div className="text-center">
//               <div className="w-12 h-12 bg-amber-800 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold">
//                 1
//               </div>
//               <h4 className="font-semibold mb-2">Material Selection</h4>
//               <p className="text-sm text-gray-600">
//                 We carefully select premium genuine leather and traditional materials.
//               </p>
//             </div>
//             <div className="text-center">
//               <div className="w-12 h-12 bg-amber-800 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold">
//                 2
//               </div>
//               <h4 className="font-semibold mb-2">Hand Cutting</h4>
//               <p className="text-sm text-gray-600">
//                 Each piece is hand-cut by skilled artisans using traditional patterns.
//               </p>
//             </div>
//             <div className="text-center">
//               <div className="w-12 h-12 bg-amber-800 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold">
//                 3
//               </div>
//               <h4 className="font-semibold mb-2">Traditional Stitching</h4>
//               <p className="text-sm text-gray-600">
//                 Master craftsmen stitch each chappal using time-honored techniques.
//               </p>
//             </div>
//             <div className="text-center">
//               <div className="w-12 h-12 bg-amber-800 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold">
//                 4
//               </div>
//               <h4 className="font-semibold mb-2">Quality Finishing</h4>
//               <p className="text-sm text-gray-600">Final touches and quality checks ensure perfection in every pair.</p>
//             </div>
//           </div>
//         </section>

//         {/* Team Section */}
//         <section className="text-center">
//           <h2 className="text-3xl font-bold text-gray-900 mb-6">Meet Our Team</h2>
//           <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
//             Our skilled artisans and craftsmen are the heart of Us Chappal Umarzai. Each brings years of experience
//             and passion for traditional craftsmanship.
//           </p>
//           <div className="grid md:grid-cols-3 gap-8">
//             <div className="text-center">
//               <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4 overflow-hidden">
//                 <img src="/pakistani-craftsman-portrait-traditional-clothing.jpg" alt="Abdullah - Founder" className="w-full h-full object-cover" />
//               </div>
//               <h4 className="font-semibold text-lg">Abdullah</h4>
//               <p className="text-gray-600">Founder & Master Craftsman</p>
//             </div>
//             <div className="text-center">
//               <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4 overflow-hidden">
//                 <img src="/pakistani-artisan-portrait-traditional-workshop.jpg" alt="Master Craftsman" className="w-full h-full object-cover" />
//               </div>
//               <h4 className="font-semibold text-lg">Ustad Mahmood</h4>
//               <p className="text-gray-600">Senior Artisan</p>
//             </div>
//             <div className="text-center">
//               <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4 overflow-hidden">
//                 <img src="/young-pakistani-craftsman-learning-traditional-ski.jpg" alt="Junior Craftsman" className="w-full h-full object-cover" />
//               </div>
//               <h4 className="font-semibold text-lg">Ahmad</h4>
//               <p className="text-gray-600">Quality Control Specialist</p>
//             </div>
//           </div>
//         </section>
//       </div>

//       <Footer />
//     </div>
//   )
// }

"use client"

import Header from "@/components/header"
import Footer from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Facebook, Instagram, Linkedin } from "lucide-react"
import { useState } from "react"

export default function AboutPage() {
  const [searchTerm, setSearchTerm] = useState("")

  return (
    <div className="min-h-screen bg-amber-50">
      <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 text-balance">
          Us Chappal Umarzai
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto text-pretty">
            We are passionate about creating and selling handmade footwear,
            including Peshawari chappals, Kaptaan chappals, and modern designs.
            Our vision is to provide the best quality and comfort to our valued
            customers with love and dedication.
          </p>
        </section>

        {/* Story Section */}
        <section className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                Us Chappal Umarzai was founded by{" "}
                <strong>Usman Ali Khan</strong> in Umarzai, Charsadda, KPK. What
                started as a small idea has grown into a trusted brand known for
                authentic handmade chappals and modern footwear designs.
              </p>
              <p>
                We specialize in creating a wide range of styles – from
                traditional Peshawari chappals to modern designs. We also accept
                custom orders, so our customers can get footwear designed just
                the way they want.
              </p>
              <p>
                With free home delivery, online selling, and cash on delivery
                services, our goal is to make it easy for everyone to enjoy
                premium quality chappals. Our loyal and repeat customers are the
                reason we keep working harder every day.
              </p>
            </div>
          </div>
          <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
            <img
              src="/shop.jpg"
              alt="Us Chappal Umarzai Shop"
              className="w-full h-full object-cover"
            />
          </div>
        </section>

        {/* Values Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Our Values
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🪡</span>
                </div>
                <h3 className="text-xl font-semibold mb-4">Handmade Craft</h3>
                <p className="text-gray-600">
                  Every chappal is handmade by skilled artisans, keeping alive
                  the art of traditional footwear making.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">⭐</span>
                </div>
                <h3 className="text-xl font-semibold mb-4">Best Quality</h3>
                <p className="text-gray-600">
                  We use premium materials to ensure durability, comfort, and
                  customer satisfaction.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🤝</span>
                </div>
                <h3 className="text-xl font-semibold mb-4">Customer First</h3>
                <p className="text-gray-600">
                  We focus on trust, service, and building long-term
                  relationships with our customers.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Team Section */}
        <section className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Meet Our Team
          </h2>
          <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
            Our dedicated team works hard to make sure you always get the best
            quality and service.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Usman Ali Khan */}
            <div className="text-center">
              <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4 overflow-hidden">
                <img
                  src="/pakistani-craftsman-portrait-traditional-clothing.jpg"
                  alt="Usman Ali Khan"
                  className="w-full h-full object-cover"
                />
              </div>
              <h4 className="font-semibold text-lg">Usman Ali Khan</h4>
              <p className="text-gray-600">Founder & CEO</p>
              <div className="flex justify-center space-x-4 mt-3 text-amber-800">
                <a
                  href="https://www.facebook.com/share/17JwY8kQjA/"
                  target="_blank"
                >
                  <Facebook size={20} />
                </a>
                <a
                  href="https://wa.me/923459095280"
                  target="_blank"
                  rel="noopener noreferrer"
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
                <a href="#" target="_blank">
                  <Instagram size={20} />
                </a>
              </div>
            </div>

            {/* Manager (Dummy for now) */}
            <div className="text-center">
              <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4 overflow-hidden">
                <img
                  src="/pakistani-artisan-portrait-traditional-workshop.jpg"
                  alt="Manager"
                  className="w-full h-full object-cover"
                />
              </div>
              <h4 className="font-semibold text-lg">Manager</h4>
              <p className="text-gray-600">Operations Manager</p>
              <div className="flex justify-center space-x-4 mt-3 text-amber-800">
                <a href="#">
                  <Facebook size={20} />
                </a>
                <a href="#">
                  <Instagram size={20} />
                </a>
              </div>
            </div>

            {/* Muhammad Abdullah */}
            <div className="text-center">
              <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4 overflow-hidden">
                <img
                  src="/young-pakistani-craftsman-learning-traditional-ski.jpg"
                  alt="Muhammad Abdullah"
                  className="w-full h-full object-cover"
                />
              </div>
              <h4 className="font-semibold text-lg">Muhammad Abdullah</h4>
              <p className="text-gray-600">Head of IT Department</p>
              <div className="flex justify-center space-x-4 mt-3 text-amber-800">
                <a
                  href="https://web.facebook.com/muhammad.abdullah.474791"
                  target="_blank"
                >
                  <Facebook size={20} />
                </a>
                <a
                  href="https://wa.me/923251851838"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12.04 2C6.49 2 2 6.39 2 11.92c0 2.1.62 4.04 1.7 5.7L2 22l4.5-1.62c1.6.87 3.45 1.37 5.54 1.37 5.55 0 10.04-4.39 10.04-9.92C22.08 6.39 17.59 2 12.04 2zm0 17.92c-1.73 0-3.34-.5-4.69-1.36l-.34-.2-2.67.96.91-2.6-.22-.34c-1.01-1.46-1.6-3.2-1.6-5.04 0-4.43 3.66-8.04 8.2-8.04s8.2 3.61 8.2 8.04c0 4.44-3.66 8.04-8.2 8.04zm4.59-6.06c-.25-.13-1.48-.73-1.71-.81-.23-.08-.4" />
                  </svg>
                </a>
                <a
                  href="https://www.linkedin.com/in/muhammad-abdullah-41b82028b/"
                  target="_blank"
                >
                  <Linkedin size={20} />
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  )
}
