"use client"

import { useState, useEffect } from "react"
import AdminLayout from "@/components/admin-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Phone, MapPin, ShoppingBag } from "lucide-react"

interface Customer {
  customer_name: string
  customer_email: string | null
  customer_phone: string
  city: string
  total_orders: number
  total_spent: number
  last_order_date: string
}

export default function CustomersManagement() {
  const [customers, setCustomers] = useState<Customer[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    fetchCustomers()
  }, [])

  const fetchCustomers = async () => {
    try {
      const response = await fetch("/api/orders")
      const data = await response.json()

      // Process orders to create customer summary
      const orders = data.orders || []
      const customerMap = new Map()

      orders.forEach((order: any) => {
        const key = order.customer_phone
        if (customerMap.has(key)) {
          const existing = customerMap.get(key)
          existing.total_orders += 1
          existing.total_spent += Number.parseFloat(order.total_amount)
          if (new Date(order.created_at) > new Date(existing.last_order_date)) {
            existing.last_order_date = order.created_at
          }
        } else {
          customerMap.set(key, {
            customer_name: order.customer_name,
            customer_email: order.customer_email,
            customer_phone: order.customer_phone,
            city: order.city,
            total_orders: 1,
            total_spent: Number.parseFloat(order.total_amount),
            last_order_date: order.created_at,
          })
        }
      })

      const customersArray = Array.from(customerMap.values()).sort((a, b) => b.total_spent - a.total_spent)

      setCustomers(customersArray)
    } catch (error) {
      console.error("Error fetching customers:", error)
    } finally {
      setLoading(false)
    }
  }

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.customer_phone.includes(searchTerm) ||
      customer.city.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getCustomerTier = (totalSpent: number) => {
    if (totalSpent >= 20000) return { label: "VIP", color: "bg-purple-100 text-purple-800" }
    if (totalSpent >= 10000) return { label: "Gold", color: "bg-yellow-100 text-yellow-800" }
    if (totalSpent >= 5000) return { label: "Silver", color: "bg-gray-100 text-gray-800" }
    return { label: "Bronze", color: "bg-orange-100 text-orange-800" }
  }

  if (loading) {
    return (
      <AdminLayout currentPage="customers">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout currentPage="customers">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Customers</h1>
          <p className="text-gray-600">View and manage your customer base</p>
        </div>

        {/* Search */}
        <div className="flex items-center space-x-2">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            <Input
              placeholder="Search customers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Customer Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Total Customers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-amber-800">{customers.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Average Order Value</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-amber-800">
                Rs.{" "}
                {customers.length > 0
                  ? Math.round(
                      customers.reduce((sum, c) => sum + c.total_spent, 0) /
                        customers.reduce((sum, c) => sum + c.total_orders, 0),
                    ).toLocaleString()
                  : "0"}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Repeat Customers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-amber-800">
                {customers.filter((c) => c.total_orders > 1).length}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Customers List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCustomers.map((customer, index) => {
            const tier = getCustomerTier(customer.total_spent)

            return (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-lg">{customer.customer_name}</h3>
                      <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                        <Phone size={14} />
                        {customer.customer_phone}
                      </div>
                      {customer.customer_email && (
                        <div className="text-sm text-gray-600 mt-1">{customer.customer_email}</div>
                      )}
                    </div>
                    <Badge className={tier.color}>{tier.label}</Badge>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Total Spent:</span>
                      <span className="font-semibold text-amber-800">Rs. {customer.total_spent.toLocaleString()}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Total Orders:</span>
                      <div className="flex items-center gap-1">
                        <ShoppingBag size={14} className="text-gray-400" />
                        <span className="font-medium">{customer.total_orders}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Location:</span>
                      <div className="flex items-center gap-1">
                        <MapPin size={14} className="text-gray-400" />
                        <span className="text-sm">{customer.city}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Last Order:</span>
                      <span className="text-sm">{new Date(customer.last_order_date).toLocaleDateString()}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {filteredCustomers.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900 mb-2">No customers found</h3>
            <p className="text-gray-600">
              {searchTerm ? "Try adjusting your search terms." : "Customers will appear here once orders are placed."}
            </p>
          </div>
        )}
      </div>
    </AdminLayout>
  )
}
