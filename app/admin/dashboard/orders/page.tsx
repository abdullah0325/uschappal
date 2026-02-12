"use client"

import { useState, useEffect } from "react"
import AdminLayout from "@/components/admin-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Search, Eye, Phone, MapPin, Package, User, Calendar, CreditCard, MessageSquare, Trash2 } from "lucide-react"

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
  item_count: number
}

interface OrderItem {
  id: number
  product_name: string
  product_price: number
  quantity: number
  size: string | null
  color: string | null
}

export default function OrdersManagement() {
  const [orders, setOrders] = useState<Order[]>([])
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [orderItems, setOrderItems] = useState<OrderItem[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    try {
      const response = await fetch("/api/orders")
      const data = await response.json()
      setOrders(data.orders || [])
    } catch (error) {
      console.error("Error fetching orders:", error)
    } finally {
      setLoading(false)
    }
  }

  const fetchOrderDetails = async (orderId: number) => {
    try {
      const response = await fetch(`/api/orders?id=${orderId}`)
      const data = await response.json()
      setSelectedOrder(data.order)
      setOrderItems(data.items || [])
      setIsDialogOpen(true)
    } catch (error) {
      console.error("Error fetching order details:", error)
    }
  }

  const updateOrderStatus = async (orderId: number, newStatus: string) => {
    try {
      const response = await fetch(`/api/orders/${orderId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      })

      const result = await response.json()

      if (result.success) {
        await fetchOrders()
        if (selectedOrder && selectedOrder.id === orderId) {
          setSelectedOrder({ ...selectedOrder, status: newStatus })
        }
        alert("Order status updated successfully")
      } else {
        alert(result.error || "Failed to update status")
      }
    } catch (error) {
      console.error("Error updating order status:", error)
      alert("Failed to update order status")
    }
  }

  const deleteOrder = async (orderId: number) => {
    if (!confirm("Are you sure you want to delete this order? This action cannot be undone and will restore product stock.")) {
      return
    }

    try {
      const response = await fetch(`/api/orders?id=${orderId}`, {
        method: "DELETE",
      })

      const result = await response.json()

      if (result.success) {
        await fetchOrders()
        if (selectedOrder && selectedOrder.id === orderId) {
          setIsDialogOpen(false)
          setSelectedOrder(null)
        }
        alert("Order deleted successfully")
      } else {
        alert(result.error || "Failed to delete order")
      }
    } catch (error) {
      console.error("Error deleting order:", error)
      alert("Failed to delete order")
    }
  }

  const getStatusConfig = (status: string) => {
    switch (status) {
      case "pending":
        return { color: "bg-chart-2/10 text-chart-2", label: "Pending" }
      case "confirmed":
        return { color: "bg-primary/10 text-primary", label: "Confirmed" }
      case "shipped":
        return { color: "bg-chart-3/10 text-chart-3", label: "Shipped" }
      case "delivered":
        return { color: "bg-chart-4/10 text-chart-4", label: "Delivered" }
      case "cancelled":
        return { color: "bg-destructive/10 text-destructive", label: "Cancelled" }
      default:
  return { color: "bg-amber-100 text-amber-900", label: status }
    }
  }

  const generateWhatsAppMessage = (order: Order) => {
    const message = `Hello ${order.customer_name}! \n\nYour order #${order.id} from our store has been confirmed.\n\nOrder Details:\n- Total Amount: Rs. ${order.total_amount.toLocaleString()}\n- Delivery Address: ${order.customer_address}, ${order.city}\n- Payment Method: ${order.payment_method === "cash_on_delivery" ? "Cash on Delivery" : "Online Payment"}\n\nWe will contact you soon for delivery confirmation. Thank you for choosing us!`

    return encodeURIComponent(message)
  }

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id.toString().includes(searchTerm) ||
      order.customer_phone.includes(searchTerm)

    const matchesStatus = statusFilter === "all" || order.status === statusFilter

    return matchesSearch && matchesStatus
  })

  if (loading) {
    return (
      <AdminLayout currentPage="orders">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-amber-100 rounded w-1/4"></div>
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-32 bg-amber-100 rounded-lg"></div>
            ))}
          </div>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout currentPage="orders">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Orders</h1>
            <p className="text-muted-foreground mt-1">Manage customer orders and deliveries</p>
          </div>
          <div className="text-sm text-muted-foreground">
            {filteredOrders.length} of {orders.length} orders
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 px-4 sm:px-0">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
            <Input
              placeholder="Search orders..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Orders</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="confirmed">Confirmed</SelectItem>
              <SelectItem value="shipped">Shipped</SelectItem>
              <SelectItem value="delivered">Delivered</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-4 px-4 sm:px-0">
          {filteredOrders.map((order) => {
            const statusConfig = getStatusConfig(order.status)

            return (
              <Card key={order.id} className="hover:shadow-md transition-shadow bg-amber-100">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4 gap-4">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <User className="w-6 h-6 text-primary" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="text-lg font-semibold text-foreground">Order #{order.id}</h3>
                        <p className="text-muted-foreground">{order.customer_name}</p>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mt-2 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Phone size={14} />
                            <span className="truncate">{order.customer_phone}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin size={14} />
                            <span>{order.city}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Package size={14} />
                            <span>{order.item_count} items</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="text-left sm:text-right">
                      <p className="text-xl sm:text-2xl font-bold text-primary">Rs. {order.total_amount.toLocaleString()}</p>
                      <Badge className={statusConfig.color}>{statusConfig.label}</Badge>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pt-4 border-t gap-4">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar size={14} />
                        <span>
                          {new Date(order.created_at).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <CreditCard size={14} />
                        <span>
                          {order.payment_method === "cash_on_delivery" ? "Cash on Delivery" : "Online Payment"}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                      <Select value={order.status} onValueChange={(value) => updateOrderStatus(order.id, value)}>
                        <SelectTrigger className="w-full sm:w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="confirmed">Confirmed</SelectItem>
                          <SelectItem value="shipped">Shipped</SelectItem>
                          <SelectItem value="delivered">Delivered</SelectItem>
                          <SelectItem value="cancelled">Cancelled</SelectItem>
                        </SelectContent>
                      </Select>

                      <Button variant="outline" size="sm" onClick={() => fetchOrderDetails(order.id)} className="w-full sm:w-auto">
                        <Eye size={16} className="mr-1" />
                        View
                      </Button>

                      <Button 
                        variant="destructive" 
                        size="sm" 
                        onClick={() => deleteOrder(order.id)} 
                        className="w-full sm:w-auto"
                      >
                        <Trash2 size={16} className="mr-1" />
                        Delete
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {filteredOrders.length === 0 && (
          <div className="text-center py-12">
            <Package className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
            <h3 className="text-lg font-medium text-foreground mb-2">No orders found</h3>
            <p className="text-muted-foreground">
              {searchTerm || statusFilter !== "all"
                ? "Try adjusting your search or filter criteria."
                : "Orders will appear here once customers start placing them."}
            </p>
          </div>
        )}

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Package className="w-5 h-5" />
                Order #{selectedOrder?.id} Details
              </DialogTitle>
            </DialogHeader>

            {selectedOrder && (
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <User className="w-5 h-5" />
                        Customer Information
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Name:</span>
                        <span className="font-medium">{selectedOrder.customer_name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Phone:</span>
                        <span className="font-medium">{selectedOrder.customer_phone}</span>
                      </div>
                      {selectedOrder.customer_email && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Email:</span>
                          <span className="font-medium">{selectedOrder.customer_email}</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Address:</span>
                        <span className="font-medium text-right">
                          {selectedOrder.customer_address}, {selectedOrder.city}
                        </span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Package className="w-5 h-5" />
                        Order Details
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Status:</span>
                        <Badge className={getStatusConfig(selectedOrder.status).color}>
                          {getStatusConfig(selectedOrder.status).label}
                        </Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Payment:</span>
                        <span className="font-medium">
                          {selectedOrder.payment_method === "cash_on_delivery" ? "Cash on Delivery" : "Online Payment"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Order Date:</span>
                        <span className="font-medium">
                          {new Date(selectedOrder.created_at).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>
                      {selectedOrder.notes && (
                        <div>
                          <span className="text-muted-foreground">Notes:</span>
                          <p className="mt-1 text-sm bg-amber-100 p-2 rounded">{selectedOrder.notes}</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Order Items</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {orderItems.map((item) => (
                        <div
                          key={item.id}
                          className="flex justify-between items-center p-4 border border-border rounded-lg"
                        >
                          <div>
                            <h4 className="font-medium">{item.product_name}</h4>
                            <p className="text-sm text-muted-foreground">
                              Size: {item.size} | Color: {item.color}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              Qty: {item.quantity} × Rs. {item.product_price.toLocaleString()}
                            </p>
                          </div>
                          <div className="font-semibold text-primary">
                            Rs. {(item.product_price * item.quantity).toLocaleString()}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="border-t pt-4 mt-4">
                      <div className="flex justify-between text-xl font-bold">
                        <span>Total:</span>
                        <span className="text-primary">Rs. {selectedOrder.total_amount.toLocaleString()}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="flex gap-3">
                  <Button className="flex-1 bg-chart-4 hover:bg-chart-4/90" asChild>
                    <a
                      href={`https://wa.me/${selectedOrder.customer_phone.replace(/[^0-9]/g, "")}?text=${generateWhatsAppMessage(selectedOrder)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Contact on WhatsApp
                    </a>
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  )
}
