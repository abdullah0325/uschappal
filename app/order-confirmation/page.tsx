"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Package, Phone, MapPin } from "lucide-react"
import Link from "next/link"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { generateOrderConfirmationMessage, openWhatsApp } from "@/lib/whatsapp"

interface Order {
  id: number
  customer_name: string
  customer_email: string | null
  customer_phone: string
  customer_address: string
  city: string
  total_amount: number
  status: string
  payment_method: string
  notes: string | null
  created_at: string
}

interface OrderItem {
  id: number
  product_name: string
  product_price: number
  quantity: number
  size: string | null
  color: string | null
}

export default function OrderConfirmationPage() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get("id")
  const [order, setOrder] = useState<Order | null>(null)
  const [orderItems, setOrderItems] = useState<OrderItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (orderId) {
      fetchOrder(orderId)
    }
  }, [orderId])

  const fetchOrder = async (id: string) => {
    try {
      const response = await fetch(`/api/orders?id=${id}`)
      const data = await response.json()

      if (data.order) {
        setOrder(data.order)
        setOrderItems(data.items || [])
      }
    } catch (error) {
      console.error("Error fetching order:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleWhatsAppContact = () => {
    if (!order) return

    const message = generateOrderConfirmationMessage({
      customerName: order.customer_name,
      orderId: order.id,
      orderTotal: order.total_amount,
      customerPhone: order.customer_phone,
      customerAddress: order.customer_address,
      city: order.city,
      items: orderItems.map((item) => ({
        name: item.product_name,
        quantity: item.quantity,
        price: item.product_price,
        size: item.size || undefined,
        color: item.color || undefined,
      })),
      paymentMethod: order.payment_method,
      notes: order.notes || undefined,
    })

    openWhatsApp(message)
  }

  if (loading) {
    return (
  <div className="min-h-screen bg-amber-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded w-1/3"></div>
            <div className="h-32 bg-gray-200 rounded"></div>
            <div className="h-48 bg-gray-200 rounded"></div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  if (!order) {
    return (
  <div className="min-h-screen bg-amber-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-16">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Order Not Found</h1>
            <p className="text-gray-600 mb-8">The order you're looking for doesn't exist.</p>
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
        {/* Success Header */}
        <div className="text-center mb-8">
          <CheckCircle size={64} className="mx-auto text-green-600 mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Confirmed!</h1>
          <p className="text-gray-600">
            Thank you for your order. We'll contact you shortly to confirm delivery details.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Order Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package size={20} />
                  Order #{order.id}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-gray-900">Order Date</h4>
                    <p className="text-gray-600">
                      {new Date(order.created_at).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Status</h4>
                    <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </Badge>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Payment Method</h4>
                    <p className="text-gray-600">
                      {order.payment_method === "cash_on_delivery" ? "Cash on Delivery" : "Online Payment"}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Total Amount</h4>
                    <p className="text-amber-800 font-semibold text-lg">Rs. {order.total_amount.toLocaleString()}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Customer Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone size={20} />
                  Customer Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <h4 className="font-medium text-gray-900">Name</h4>
                  <p className="text-gray-600">{order.customer_name}</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Phone</h4>
                  <p className="text-gray-600">{order.customer_phone}</p>
                </div>
                {order.customer_email && (
                  <div>
                    <h4 className="font-medium text-gray-900">Email</h4>
                    <p className="text-gray-600">{order.customer_email}</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Shipping Address */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin size={20} />
                  Shipping Address
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  {order.customer_address}
                  <br />
                  {order.city}
                </p>
              </CardContent>
            </Card>

            {/* Special Instructions */}
            {order.notes && (
              <Card>
                <CardHeader>
                  <CardTitle>Special Instructions</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{order.notes}</p>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Order Items */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Order Items</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {orderItems.map((item) => (
                  <div key={item.id} className="flex justify-between items-start">
                    <div className="flex-1">
                      <h4 className="font-medium text-sm line-clamp-2">{item.product_name}</h4>
                      <div className="text-xs text-gray-500 mt-1">
                        Size: {item.size} | {item.color}
                      </div>
                      <div className="text-sm text-gray-600">
                        Qty: {item.quantity} × Rs. {item.product_price.toLocaleString()}
                      </div>
                    </div>
                    <div className="font-semibold text-amber-800 ml-4">
                      Rs. {(item.product_price * item.quantity).toLocaleString()}
                    </div>
                  </div>
                ))}

                <div className="border-t pt-4">
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total:</span>
                    <span className="text-amber-800">Rs. {order.total_amount.toLocaleString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <div className="mt-6 space-y-3">
              <Button className="w-full bg-green-600 hover:bg-green-700" onClick={handleWhatsAppContact}>
                Contact us on WhatsApp
              </Button>

              <Button variant="outline" className="w-full bg-transparent" asChild>
                <Link href="/products">Continue Shopping</Link>
              </Button>
            </div>

            {/* Next Steps */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-lg">What's Next?</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-gray-600 space-y-2">
                <p>1. We'll call you within 24 hours to confirm your order</p>
                <p>2. Your chappals will be carefully prepared</p>
                <p>3. We'll deliver to your doorstep</p>
                <p>4. Pay cash on delivery</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
