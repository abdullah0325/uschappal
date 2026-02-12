"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, Package, ShoppingCart, Users, Settings, LogOut, Menu, X, Store } from "lucide-react"
import Link from "next/link"

interface AdminLayoutProps {
  children: React.ReactNode
  currentPage?: string
}

export default function AdminLayout({ children, currentPage = "dashboard" }: AdminLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const router = useRouter()

  const handleLogout = async () => {
    setIsLoggingOut(true)
    try {
      await fetch("/api/admin/auth", { method: "DELETE" })
      router.push("/admin")
    } catch (error) {
      console.error("Logout error:", error)
    } finally {
      setIsLoggingOut(false)
    }
  }

  const navigation = [
    { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard, id: "dashboard" },
    { name: "Products", href: "/admin/dashboard/products", icon: Package, id: "products" },
    { name: "Orders", href: "/admin/dashboard/orders", icon: ShoppingCart, id: "orders" },
    { name: "Categories", href: "/admin/dashboard/categories", icon: Users, id: "categories" },
    { name: "Settings", href: "/admin/dashboard/settings", icon: Settings, id: "settings" },
  ]

  return (
  <div className="min-h-screen bg-amber-50 flex flex-col">
      {/* Navbar/Header at the top */}
  <header className="bg-gradient-to-r from-amber-100 via-amber-50 to-amber-200 shadow-md border-b border-border h-16 flex items-center justify-between px-6 fixed w-full z-30 top-0 left-0">
        <Button
          variant="ghost"
          size="sm"
          className="lg:hidden hover:bg-accent"
          onClick={() => setIsSidebarOpen(true)}
        >
          <Menu size={20} />
        </Button>
        <div className="flex items-center space-x-4">
          <span className="text-sm text-muted-foreground">Welcome, Admin</span>
          <Button variant="outline" size="sm" asChild>
            <Link href="/">View Store</Link>
          </Button>
        </div>
      </header>

      <div className="flex flex-1 pt-16">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:block fixed top-16 left-0 z-40 w-64 h-[calc(100vh-4rem)] bg-sidebar shadow-lg">
          <div className="flex items-center justify-between h-16 px-6 border-b border-sidebar-border">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-sidebar-accent rounded-lg flex items-center justify-center">
                <Store className="w-5 h-5 text-sidebar-accent-foreground" />
              </div>
              <h1 className="text-lg font-semibold text-sidebar-foreground">Admin Panel</h1>
            </div>
          </div>

          <div className="flex flex-col h-full">
            <nav className="flex-1 mt-6 px-3 overflow-y-auto">
              <div className="space-y-1">
                {navigation.map((item) => {
                  const Icon = item.icon
                  const isActive = currentPage === item.id
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`flex items-center px-3 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
                        isActive
                          ? "bg-sidebar-accent text-sidebar-accent-foreground shadow-sm"
                          : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
                      }`}
                    >
                      <Icon size={20} className="mr-3" />
                      {item.name}
                    </Link>
                  )
                })}
              </div>
            </nav>

            <div className="p-4 border-t border-sidebar-border">
              <Button
                variant="ghost"
                className="w-full justify-start text-destructive hover:text-destructive-foreground hover:bg-destructive/10"
                onClick={handleLogout}
                disabled={isLoggingOut}
              >
                <LogOut size={20} className="mr-3" />
                {isLoggingOut ? "Logging out..." : "Logout"}
              </Button>
            </div>
          </div>
        </aside>

        {/* Mobile Sidebar Drawer */}
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 z-50 bg-black/40 flex justify-start lg:hidden" 
            onClick={() => setIsSidebarOpen(false)}
          >
            <div 
              className="bg-sidebar shadow-lg rounded-r-2xl w-48 max-w-[75%] p-4 flex flex-col space-y-3 mt-20"
              onClick={e => e.stopPropagation()}
            >
              {/* Menu Links */}
              {navigation.map((item) => {
                const Icon = item.icon
                const isActive = currentPage === item.id
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center px-3 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
                      isActive
                        ? "bg-sidebar-accent text-sidebar-accent-foreground shadow-sm"
                        : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
                    }`}
                    onClick={() => setIsSidebarOpen(false)}
                  >
                    <Icon size={18} className="mr-3" />
                    {item.name}
                  </Link>
                )
              })}
              
              {/* Logout Button */}
              <Button
                variant="ghost"
                className="w-full justify-start text-destructive hover:text-destructive-foreground hover:bg-destructive/10 mt-4"
                onClick={() => {
                  handleLogout()
                  setIsSidebarOpen(false)
                }}
                disabled={isLoggingOut}
              >
                <LogOut size={18} className="mr-3" />
                {isLoggingOut ? "Logging out..." : "Logout"}
              </Button>
            </div>
          </div>
        )}

        {/* Main content */}
        <div className="flex-1 flex flex-col lg:ml-64">
          <main className="p-6 min-h-[calc(100vh-4rem)]">{children}</main>
        </div>
      </div>
    </div>
  )
}
