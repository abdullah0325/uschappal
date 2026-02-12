"use client"

import { useState, useEffect } from "react"
import AdminLayout from "@/components/admin-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Package, ShoppingCart, DollarSign, Clock, TrendingUp, Users } from "lucide-react"

interface DashboardStats {
  totalProducts: number
  totalOrders: number
  pendingOrders: number
  totalRevenue: number
  recentOrders: any[]
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalProducts: 0,
    totalOrders: 0,
    pendingOrders: 0,
    totalRevenue: 0,
    recentOrders: [],
  })
  const [currentTime, setCurrentTime] = useState<string>("")

  useEffect(() => {
    console.log("[v0] AdminDashboard component mounted")
    fetchDashboardData()

    // Set current time on client side only
    const updateTime = () => {
      setCurrentTime(new Date().toLocaleTimeString())
    }

    updateTime() // Set initial time
    const interval = setInterval(updateTime, 1000) // Update every second

    return () => clearInterval(interval)
  }, [])

  const fetchDashboardData = async () => {
    try {
      // Fetch products list and derive count for consistency
      const productRes = await fetch("/api/admin/products", { cache: "no-store" })
      const productData = await productRes.json()
      const totalProducts = Array.isArray(productData.products) ? productData.products.length : 0

      // Fetch all orders
      const ordersRes = await fetch("/api/orders", { cache: "no-store" })
      const ordersData = await ordersRes.json()
      const orders = ordersData.orders || []

      const totalOrders = orders.length
      const pendingOrders = orders.filter((o: any) => o.status === "pending").length
      const totalRevenue = orders
        .filter((o: any) => o.status === "completed")
        .reduce((sum: number, o: any) => sum + Number(o.total_amount), 0)
      const recentOrders = orders.slice(0, 5)

      setStats({
        totalProducts,
        totalOrders,
        pendingOrders,
        totalRevenue,
        recentOrders,
      })
    } catch (error) {
      console.error("Error fetching dashboard data:", error)
    }
  }


  console.log("[v0] AdminDashboard rendering with stats:", stats)
  
  return (
    <AdminLayout currentPage="dashboard">
      <div className="space-y-8 max-w-7xl mx-auto bg-amber-50">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
            <p className="text-muted-foreground mt-1">Welcome to your e-commerce admin panel</p>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <TrendingUp className="w-4 h-4" />
            <span>Last updated: {currentTime || "Loading..."}</span>
          </div>
        </div>


        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          <Card className="border-l-4 border-l-primary bg-amber-100">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Products</CardTitle>
              <Package className="h-5 w-5 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">{stats.totalProducts}</div>
              <p className="text-xs text-muted-foreground mt-1">Active products in store</p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-secondary bg-amber-100">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Orders</CardTitle>
              <ShoppingCart className="h-5 w-5 text-secondary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">{stats.totalOrders}</div>
              <p className="text-xs text-muted-foreground mt-1">All time orders</p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-chart-2 bg-amber-100">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Pending Orders</CardTitle>
              <Clock className="h-5 w-5 text-chart-2" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">{stats.pendingOrders}</div>
              <p className="text-xs text-muted-foreground mt-1">Awaiting processing</p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-chart-4 bg-amber-100">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Revenue</CardTitle>
              <DollarSign className="h-5 w-5 text-chart-4" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">Rs. {stats.totalRevenue.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground mt-1">All time revenue</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <Card className="xl:col-span-2 bg-amber-100">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShoppingCart className="w-5 h-5" />
                Recent Orders
              </CardTitle>
            </CardHeader>
            <CardContent>
              {stats.recentOrders.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <Package className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <h3 className="font-medium mb-2">No orders yet</h3>
                  <p className="text-sm">Orders will appear here once customers start placing them.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {stats.recentOrders.map((order: any) => (
                    <div
                      key={order.id}
                      className="flex items-center justify-between p-4 border border-border rounded-lg bg-amber-100 hover:bg-amber-200 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                          <Users className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-medium text-foreground">Order #{order.id}</h4>
                          <p className="text-sm text-muted-foreground">{order.customer_name}</p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(order.created_at).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-foreground">
                          Rs. {Number.parseFloat(order.total_amount).toLocaleString()}
                        </p>
                        <span
                          className={`inline-block px-2 py-1 text-xs rounded-full font-medium ${
                            order.status === "pending"
                              ? "bg-chart-2/10 text-chart-2"
                              : order.status === "completed"
                                ? "bg-chart-4/10 text-chart-4"
                                : "bg-amber-100 text-amber-900"
                          }`}
                        >
                          {order.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <a
                href="/admin/dashboard/products"
                className="flex items-center gap-3 p-3 rounded-lg border border-border bg-amber-100 hover:bg-amber-200 transition-colors"
              >
                <Package className="w-5 h-5 text-primary" />
                <div>
                  <p className="font-medium text-sm">Manage Products</p>
                  <p className="text-xs text-muted-foreground">Add, edit, or remove products</p>
                </div>
              </a>
              <a
                href="/admin/dashboard/orders"
                className="flex items-center gap-3 p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors"
              >
                <ShoppingCart className="w-5 h-5 text-secondary" />
                <div>
                  <p className="font-medium text-sm">View Orders</p>
                  <p className="text-xs text-muted-foreground">Process and track orders</p>
                </div>
              </a>
              <a
                href="/"
                target="_blank"
                className="flex items-center gap-3 p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors"
                rel="noreferrer"
              >
                <TrendingUp className="w-5 h-5 text-chart-4" />
                <div>
                  <p className="font-medium text-sm">View Store</p>
                  <p className="text-xs text-muted-foreground">See your live storefront</p>
                </div>
              </a>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  )
}
