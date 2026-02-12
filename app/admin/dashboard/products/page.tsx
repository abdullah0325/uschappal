"use client"

import type React from "react"
import { useState, useEffect } from "react"
import AdminLayout from "@/components/admin-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Edit, Trash2, Package, AlertTriangle, CheckCircle } from "lucide-react"
import CloudinaryUpload from "@/components/cloudinary-upload"
import type { Product } from "@/lib/db"

export default function Page() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    image_url: "",
    category: "",
    size: "",
    color: "",
    stock_quantity: "",
    is_featured: false,
    is_active: true,
  })

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const response = await fetch("/api/admin/products")
      const data = await response.json()
      setProducts(data.products || [])
    } catch (error) {
      console.error("Error fetching products:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const url = editingProduct ? `/api/admin/products/${editingProduct.id}` : "/api/admin/products"
      const method = editingProduct ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (result.success) {
        await fetchProducts()
        setIsDialogOpen(false)
        resetForm()
        alert(result.message)
      } else {
        alert(result.error || "Operation failed")
      }
    } catch (error) {
      console.error("Error saving product:", error)
      alert("Failed to save product")
    }
  }

  const handleEdit = (product: Product) => {
    setEditingProduct(product)
    setFormData({
      name: product.name,
      description: product.description || "",
      price: product.price.toString(),
      image_url: product.image_url || "",
      category: product.category || "",
      size: product.size || "",
      color: product.color || "",
      stock_quantity: product.stock_quantity.toString(),
      is_featured: product.is_featured,
      is_active: product.is_active ?? true,
    })
    setIsDialogOpen(true)
  }

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this product?")) return

    try {
      const response = await fetch(`/api/admin/products/${id}`, {
        method: "DELETE",
      })

      const result = await response.json()

      if (result.success) {
        await fetchProducts()
        alert(result.message)
      } else {
        alert(result.error || "Delete failed")
      }
    } catch (error) {
      console.error("Error deleting product:", error)
      alert("Failed to delete product")
    }
  }

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      price: "",
      image_url: "",
      category: "",
      size: "",
      color: "",
      stock_quantity: "",
      is_featured: false,
      is_active: true,
    })
    setEditingProduct(null)
  }

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category?.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getStockStatus = (quantity: number) => {
    if (quantity === 0)
      return { label: "Out of Stock", color: "bg-destructive/10 text-destructive", icon: AlertTriangle }
    if (quantity <= 5) return { label: "Low Stock", color: "bg-chart-2/10 text-chart-2", icon: AlertTriangle }
    return { label: "In Stock", color: "bg-chart-4/10 text-chart-4", icon: CheckCircle }
  }

  if (loading) {
    return (
      <AdminLayout currentPage="products">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-amber-100 rounded w-1/4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="h-80 bg-amber-100 rounded-lg"></div>
            ))}
          </div>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout currentPage="products">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Products</h1>
            <p className="text-muted-foreground mt-1">Manage your product inventory</p>
          </div>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-primary hover:bg-primary/90" onClick={resetForm}>
                <Plus size={16} className="mr-2" />
                Add Product
              </Button>
            </DialogTrigger>

            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{editingProduct ? "Edit Product" : "Add New Product"}</DialogTitle>
              </DialogHeader>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Product Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="price">Price (Rs.) *</Label>
                    <Input
                      id="price"
                      type="number"
                      value={formData.price}
                      onChange={(e) => setFormData((prev) => ({ ...prev, price: e.target.value }))}
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                    rows={3}
                  />
                </div>

                <CloudinaryUpload
                  value={formData.image_url}
                  onChange={(url) => setFormData((prev) => ({ ...prev, image_url: url }))}
                />

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value) => setFormData((prev) => ({ ...prev, category: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Men">Men</SelectItem>
                        <SelectItem value="Women">Women</SelectItem>
                        <SelectItem value="Kids">Kids</SelectItem>
                        <SelectItem value="Traditional">Traditional</SelectItem>
                        <SelectItem value="Premium">Premium</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="size">Size</Label>
                    <Input
                      id="size"
                      value={formData.size}
                      onChange={(e) => setFormData((prev) => ({ ...prev, size: e.target.value }))}
                      placeholder="6 - 13"
                    />
                  </div>

                  <div>
                    <Label htmlFor="color">Color</Label>
                    <Input
                      id="color"
                      value={formData.color}
                      onChange={(e) => setFormData((prev) => ({ ...prev, color: e.target.value }))}
                      placeholder="e.g., Brown"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="stock_quantity">Stock Quantity</Label>
                    <Input
                      id="stock_quantity"
                      type="number"
                      min="0"
                      value={formData.stock_quantity}
                      onChange={(e) => setFormData((prev) => ({ ...prev, stock_quantity: e.target.value }))}
                    />
                  </div>

                  <div className="flex flex-col space-y-3">
                    <div className="flex items-center space-x-2 pt-6">
                      <Switch
                        id="is_featured"
                        checked={formData.is_featured}
                        onCheckedChange={(checked) =>
                          setFormData((prev) => ({ ...prev, is_featured: checked }))
                        }
                      />
                      <Label htmlFor="is_featured">Featured Product</Label>
                    </div>

                    <div className="flex items-center space-x-2 pt-2">
                      <Label htmlFor="is_active">Status</Label>
                      <Select
                        value={formData.is_active ? "active" : "inactive"}
                        onValueChange={(value) =>
                          setFormData((prev) => ({ ...prev, is_active: value === "active" }))
                        }
                      >
                        <SelectTrigger className="w-32">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="inactive">Inactive</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end space-x-2 pt-4 border-t">
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" className="bg-primary hover:bg-primary/90">
                    {editingProduct ? "Update" : "Create"} Product
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => {
            const stockStatus = getStockStatus(product.stock_quantity)
            const StockIcon = stockStatus.icon

            return (
              <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-all bg-amber-100">
                <div className="aspect-square relative">
                  <img
                    src={product.image_url || `/placeholder.svg?height=200&width=200&query=${product.name}`}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 left-2 flex gap-2">
                    {product.is_featured && <Badge className="bg-primary text-white">Featured</Badge>}
                  </div>
                  <div className="absolute top-2 right-2">
                    <Badge className={stockStatus.color}>
                      <StockIcon className="w-3 h-3 mr-1" />
                      {stockStatus.label}
                    </Badge>
                  </div>
                </div>

                <CardContent className="p-4">
                  <div className="space-y-2">
                    <h3 className="font-semibold text-lg">{product.name}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>

                    <div className="text-sm text-gray-600">
                      <div>Price: <strong>Rs. {product.price.toLocaleString()}</strong></div>
                      <div>Stock: {product.stock_quantity}</div>
                      <div>
                        Status:{" "}
                        <Badge className={product.is_active ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}>
                          {product.is_active ? "Active" : "Inactive"}
                        </Badge>
                      </div>
                    </div>

                    <div className="flex gap-2 pt-2 border-t">
                      <Button variant="outline" size="sm" onClick={() => handleEdit(product)}>
                        <Edit size={14} className="mr-1" /> Edit
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-destructive hover:text-white hover:bg-destructive"
                        onClick={() => handleDelete(product.id)}
                      >
                        <Trash2 size={14} />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <Package className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
            <h3 className="text-lg font-medium text-foreground mb-2">No products found</h3>
            <p className="text-muted-foreground">
              {searchTerm ? "Try adjusting your search terms." : "Add your first product to get started."}
            </p>
          </div>
        )}
      </div>
    </AdminLayout>
  )
}
