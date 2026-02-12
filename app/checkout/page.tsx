"use client"

import type React from "react"

import { useState } from "react"
import { useCart } from "@/contexts/cart-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ArrowLeft, CreditCard, Truck } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default function CheckoutPage() {
  const { cart, clearCart, updateQuantity } = useCart()
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    customer_name: "",
    customer_email: "",
    customer_phone: "",
    customer_address: "",
    city: "",
    payment_method: "cash_on_delivery",
    notes: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          total_amount: cart.total,
          items: cart.items,
        }),
      })

      const result = await response.json()

      if (result.success) {
        clearCart()
        router.push(`/order-confirmation?id=${result.orderId}`)
      } else {
        alert("Failed to place order. Please try again.")
      }
    } catch (error) {
      console.error("Error placing order:", error)
      alert("Failed to place order. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (cart.items.length === 0) {
    return (
  <div className="min-h-screen bg-amber-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-16">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
            <p className="text-gray-600 mb-8">Add some products to your cart before checking out.</p>
            <Button className="bg-amber-800 hover:bg-amber-900" asChild>
              <Link href="/products">Continue Shopping</Link>
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
  <div className="min-h-screen bg-amber-50">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <Button variant="ghost" className="mb-6" asChild>
          <Link href="/products" className="flex items-center gap-2">
            <ArrowLeft size={16} />
            Back to Shopping
          </Link>
        </Button>

        <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Customer Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Customer Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="customer_name">Full Name *</Label>
                      <Input
                        id="customer_name"
                        name="customer_name"
                        value={formData.customer_name}
                        onChange={handleInputChange}
                        required
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="customer_phone">Phone Number *</Label>
                      <Input
                        id="customer_phone"
                        name="customer_phone"
                        value={formData.customer_phone}
                        onChange={handleInputChange}
                        required
                        placeholder="+92-300-1234567"
                        className="mt-1"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="customer_email">Email Address</Label>
                    <Input
                      id="customer_email"
                      name="customer_email"
                      type="email"
                      value={formData.customer_email}
                      onChange={handleInputChange}
                      className="mt-1"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Shipping Address */}
              <Card>
                <CardHeader>
                  <CardTitle>Shipping Address</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="customer_address">Complete Address *</Label>
                    <Textarea
                      id="customer_address"
                      name="customer_address"
                      value={formData.customer_address}
                      onChange={handleInputChange}
                      required
                      rows={3}
                      placeholder="House/Flat number, Street, Area, Landmark"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="city">City *</Label>
                    <Input
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                      placeholder="e.g., Karachi, Lahore, Islamabad"
                      className="mt-1"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Payment Method */}
              <Card>
                <CardHeader>
                  <CardTitle>Payment Method</CardTitle>
                </CardHeader>
                <CardContent>
                  <RadioGroup
                    value={formData.payment_method}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, payment_method: value }))}
                  >
                    <div className="flex items-center space-x-2 p-4 border rounded-lg">
                      <RadioGroupItem value="cash_on_delivery" id="cod" />
                      <Label htmlFor="cod" className="flex items-center gap-3 cursor-pointer flex-1">
                        <Truck size={20} className="text-amber-800" />
                        <div>
                          <div className="font-medium">Cash on Delivery</div>
                          <div className="text-sm text-gray-600">Pay when you receive your order</div>
                        </div>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 p-4 border rounded-lg opacity-50">
                      <RadioGroupItem value="online_payment" id="online" disabled />
                      <Label htmlFor="online" className="flex items-center gap-3 cursor-not-allowed flex-1">
                        <CreditCard size={20} className="text-gray-400" />
                        <div>
                          <div className="font-medium">Online Payment</div>
                          <div className="text-sm text-gray-600">Coming soon</div>
                        </div>
                      </Label>
                    </div>
                  </RadioGroup>
                </CardContent>
              </Card>

              {/* Additional Notes */}
              <Card>
                <CardHeader>
                  <CardTitle>Additional Notes</CardTitle>
                </CardHeader>
                <CardContent>
                  <Textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    rows={3}
                    placeholder="Any special instructions for delivery or preferences..."
                    className="w-full"
                  />
                </CardContent>
              </Card>

              <Button
                type="submit"
                size="lg"
                className="w-full bg-amber-800 hover:bg-amber-900"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Placing Order..." : "Place Order"}
              </Button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {cart.items.map((item) => (
                  <div key={`${item.id}-${item.size}-${item.color}`} className="flex gap-3">
                    <div className="w-16 h-16 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                      <img
                        src={item.image_url || `/placeholder.svg?height=64&width=64&query=${item.name}`}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm line-clamp-2">{item.name}</h4>
                      <div className="text-xs text-gray-500 mb-1">
                        Color: {item.color}
                      </div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs">Size:</span>
                        <input
                          type="number"
                          min={6}
                          max={13}
                          value={item.size || ""}
                          onChange={e => {
                            const newSize = e.target.value;
                            // Validate size is between 6-13
                            const sizeNum = parseInt(newSize);
                            if (newSize === "" || (sizeNum >= 6 && sizeNum <= 13)) {
                              updateQuantity(item.id, newSize, item.color, item.quantity, item.size);
                            }
                          }}
                          className="w-14 px-1 py-0.5 border rounded text-center text-xs"
                          placeholder="6-13"
                        />
                      </div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs">Qty:</span>
                        <button
                          className="px-2 py-0.5 border rounded text-xs"
                          onClick={() => updateQuantity(item.id, item.size, item.color, Math.max(1, item.quantity - 1))}
                          aria-label="Decrease quantity"
                        >-</button>
                        <input
                          type="number"
                          min={1}
                          max={item.stock_quantity}
                          value={item.quantity}
                          onChange={e => {
                            const newQty = Math.max(1, Math.min(item.stock_quantity, Number(e.target.value)));
                            updateQuantity(item.id, item.size, item.color, newQty);
                          }}
                          className="w-12 px-1 py-0.5 border rounded text-center text-xs"
                        />
                        <button
                          className="px-2 py-0.5 border rounded text-xs"
                          onClick={() => updateQuantity(item.id, item.size, item.color, Math.min(item.stock_quantity, item.quantity + 1))}
                          aria-label="Increase quantity"
                        >+</button>
                        <span className="font-semibold text-amber-800 ml-auto">
                          Rs. {(item.price * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}

                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>Rs. {cart.total.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery:</span>
                    <span className="text-green-600">Free</span>
                  </div>
                  <div className="flex justify-between text-lg font-semibold border-t pt-2">
                    <span>Total:</span>
                    <span className="text-amber-800">Rs. {cart.total.toLocaleString()}</span>
                  </div>
                </div>

                <div className="text-sm text-gray-600 space-y-1">
                  <p>✓ Free delivery across Pakistan</p>
                  <p>✓ Cash on delivery available</p>
                  <p>✓ Quality guarantee</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
