// "use client"

// import type React from "react"

// import { useState } from "react"
// import Header from "@/components/header"
// import Footer from "@/components/footer"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
// import { Textarea } from "@/components/ui/textarea"
// import { Label } from "@/components/ui/label"
// import { MapPin, Phone, Mail, Clock } from "lucide-react"

// export default function ContactPage() {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     subject: "",
//     message: "",
//   })
//   const [isSubmitting, setIsSubmitting] = useState(false)
//   const [submitMessage, setSubmitMessage] = useState("")

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setIsSubmitting(true)

//     // Simulate form submission
//     setTimeout(() => {
//       setSubmitMessage("Thank you for your message! We will get back to you soon.")
//       setFormData({ name: "", email: "", phone: "", subject: "", message: "" })
//       setIsSubmitting(false)
//     }, 1000)
//   }

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     setFormData((prev) => ({
//       ...prev,
//       [e.target.name]: e.target.value,
//     }))
//   }

//   return (
//   <div className="min-h-screen bg-amber-50">
//       <Header />

//       <div className="container mx-auto px-4 py-8">
//         {/* Header */}
//         <div className="text-center mb-12">
//           <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
//           <p className="text-xl text-gray-600 max-w-2xl mx-auto">
//             Have questions about our products or need assistance? We're here to help! Get in touch with us through any
//             of the methods below.
//           </p>
//         </div>

//         <div className="grid lg:grid-cols-3 gap-12">
//           {/* Contact Information */}
//           <div className="lg:col-span-1">
//             <div className="space-y-6">
//               <Card>
//                 <CardContent className="p-6">
//                   <div className="flex items-start space-x-4">
//                     <MapPin className="text-amber-800 mt-1" size={20} />
//                     <div>
//                       <h3 className="font-semibold text-gray-900 mb-1">Address</h3>
//                       <p className="text-gray-600">
//                         Qissa Khwani Bazaar
//                         <br />
//                         Peshawar, Khyber Pakhtunkhwa
//                         <br />
//                         Pakistan
//                       </p>
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>

//               <Card>
//                 <CardContent className="p-6">
//                   <div className="flex items-start space-x-4">
//                     <Phone className="text-amber-800 mt-1" size={20} />
//                     <div>
//                       <h3 className="font-semibold text-gray-900 mb-1">Phone</h3>
//                       <p className="text-gray-600">+92-300-1234567</p>
//                       <p className="text-gray-600">+92-91-5234567</p>
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>

//               <Card>
//                 <CardContent className="p-6">
//                   <div className="flex items-start space-x-4">
//                     <Mail className="text-amber-800 mt-1" size={20} />
//                     <div>
//                       <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
//                       <p className="text-gray-600">info@abdullahchappal.com</p>
//                       <p className="text-gray-600">orders@abdullahchappal.com</p>
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>

//               <Card>
//                 <CardContent className="p-6">
//                   <div className="flex items-start space-x-4">
//                     <Clock className="text-amber-800 mt-1" size={20} />
//                     <div>
//                       <h3 className="font-semibold text-gray-900 mb-1">Business Hours</h3>
//                       <div className="text-gray-600 space-y-1">
//                         <p>Monday - Saturday: 9:00 AM - 8:00 PM</p>
//                         <p>Sunday: 10:00 AM - 6:00 PM</p>
//                         <p className="text-sm text-amber-800 font-medium">Friday: Closed 12:00 PM - 2:00 PM</p>
//                       </div>
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>
//             </div>
//           </div>

//           {/* Contact Form */}
//           <div className="lg:col-span-2">
//             <Card>
//               <CardHeader>
//                 <CardTitle className="text-2xl">Send us a Message</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 {submitMessage && (
//                   <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-md mb-6">
//                     {submitMessage}
//                   </div>
//                 )}

//                 <form onSubmit={handleSubmit} className="space-y-6">
//                   <div className="grid md:grid-cols-2 gap-4">
//                     <div>
//                       <Label htmlFor="name">Full Name *</Label>
//                       <Input
//                         id="name"
//                         name="name"
//                         value={formData.name}
//                         onChange={handleChange}
//                         required
//                         className="mt-1"
//                       />
//                     </div>
//                     <div>
//                       <Label htmlFor="email">Email Address *</Label>
//                       <Input
//                         id="email"
//                         name="email"
//                         type="email"
//                         value={formData.email}
//                         onChange={handleChange}
//                         required
//                         className="mt-1"
//                       />
//                     </div>
//                   </div>

//                   <div className="grid md:grid-cols-2 gap-4">
//                     <div>
//                       <Label htmlFor="phone">Phone Number</Label>
//                       <Input id="phone" name="phone" value={formData.phone} onChange={handleChange} className="mt-1" />
//                     </div>
//                     <div>
//                       <Label htmlFor="subject">Subject *</Label>
//                       <Input
//                         id="subject"
//                         name="subject"
//                         value={formData.subject}
//                         onChange={handleChange}
//                         required
//                         className="mt-1"
//                       />
//                     </div>
//                   </div>

//                   <div>
//                     <Label htmlFor="message">Message *</Label>
//                     <Textarea
//                       id="message"
//                       name="message"
//                       value={formData.message}
//                       onChange={handleChange}
//                       required
//                       rows={6}
//                       className="mt-1"
//                       placeholder="Tell us about your inquiry, preferred products, sizes, or any special requirements..."
//                     />
//                   </div>

//                   <Button
//                     type="submit"
//                     size="lg"
//                     className="w-full bg-amber-800 hover:bg-amber-900"
//                     disabled={isSubmitting}
//                   >
//                     {isSubmitting ? "Sending..." : "Send Message"}
//                   </Button>
//                 </form>
//               </CardContent>
//             </Card>
//           </div>
//         </div>

//         {/* Additional Information */}
//         <div className="mt-16 bg-amber-50 rounded-lg p-8">
//           <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">Why Choose Us Chappal Umarzai?</h2>
//           <div className="grid md:grid-cols-3 gap-8 text-center">
//             <div>
//               <h3 className="font-semibold text-lg mb-2">Fast Response</h3>
//               <p className="text-gray-600">
//                 We typically respond to all inquiries within 24 hours during business days.
//               </p>
//             </div>
//             <div>
//               <h3 className="font-semibold text-lg mb-2">Expert Guidance</h3>
//               <p className="text-gray-600">
//                 Our team can help you choose the perfect chappal for your needs and preferences.
//               </p>
//             </div>
//             <div>
//               <h3 className="font-semibold text-lg mb-2">Custom Orders</h3>
//               <p className="text-gray-600">
//                 We accept custom orders for special sizes, colors, or designs. Contact us for details.
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>

//       <Footer />
//     </div>
//   )
// }



"use client"

import type React from "react"
import { useState } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { MapPin, Phone, Mail, Clock } from "lucide-react"

export default function ContactPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Build WhatsApp message
    const whatsappNumber = "923459095280" // Usman Ali Khan
    const text = `
New Contact Form Submission:

Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Subject: ${formData.subject}

Message:
${formData.message}
    `

    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      text
    )}`

    // Redirect to WhatsApp
    window.open(url, "_blank")

    setIsSubmitting(false)
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" })
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <div className="min-h-screen bg-amber-50">
      <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Have questions about our handmade footwear or want a custom order?
            Reach out to us via the form below or directly on WhatsApp.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Information */}
          <div className="lg:col-span-1">
            <div className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <MapPin className="text-amber-800 mt-1" size={20} />
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">
                        Address
                      </h3>
                      <p className="text-gray-600">
                        Harechand Road
                        <br />
                        Main Bazar Umarzai
                        <br />
                        Charsadda, KPK
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <Phone className="text-amber-800 mt-1" size={20} />
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">
                        Phone / WhatsApp
                      </h3>
                      <p className="text-gray-600">+92 345 9095280</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <Mail className="text-amber-800 mt-1" size={20} />
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">
                        Email
                      </h3>
                      <p className="text-gray-600">uschappal@gmail.com</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <Clock className="text-amber-800 mt-1" size={20} />
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">
                        Business Hours
                      </h3>
                      <div className="text-gray-600 space-y-1">
                        <p>Monday - Saturday: 9:00 AM - 8:00 PM</p>
                        <p>Sunday: 10:00 AM - 6:00 PM</p>
                        <p className="text-sm text-amber-800 font-medium">
                          Friday: Closed 12:00 PM - 2:00 PM
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Send us a Message</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="subject">Subject *</Label>
                      <Input
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="mt-1"
                      placeholder="Tell us about your inquiry, preferred products, or custom requirements..."
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-amber-800 hover:bg-amber-900"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Sending..." : "Send via WhatsApp"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Additional Information */}
        <div className="mt-16 bg-amber-50 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">
            Why Choose Us Chappal Umarzai?
          </h2>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <h3 className="font-semibold text-lg mb-2">Fast Response</h3>
              <p className="text-gray-600">
                We reply quickly via WhatsApp to answer your questions.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">Expert Guidance</h3>
              <p className="text-gray-600">
                Our team can help you select the best handmade chappal for your
                needs.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">Custom Orders</h3>
              <p className="text-gray-600">
                We accept custom orders in design, size, and color for your
                special requirements.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
