"use client"

import { useCart } from "@/contexts/cart-context"
import { Button } from "@/components/ui/button"
import { X, Plus, Minus, ShoppingBag } from "lucide-react"
import Link from "next/link"

import { useEffect, useRef } from "react"

export default function CartDrawer() {
  const { cart, isOpen, closeCart, removeItem, updateQuantity } = useCart()
  const drawerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isOpen) return
    function handleClickOutside(event: MouseEvent) {
      if (drawerRef.current && !drawerRef.current.contains(event.target as Node)) {
        closeCart()
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [isOpen, closeCart])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50">
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/20" />
      {/* Cart Drawer */}
      <div ref={drawerRef} className="fixed right-0 top-0 h-full w-full max-w-md bg-amber-50 shadow-xl z-50 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">Shopping Cart</h2>
          <Button variant="ghost" size="sm" onClick={closeCart}>
            <X size={20} />
          </Button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-4">
          {cart.items.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingBag size={48} className="mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Your cart is empty</h3>
              <p className="text-gray-600 mb-6">Add some beautiful chappals to get started!</p>
              <Button onClick={closeCart} className="bg-amber-800 hover:bg-amber-900" asChild>
                <Link href="/products">Continue Shopping</Link>
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.items.map((item) => (
                <div key={`${item.id}-${item.size}-${item.color}`} className="flex gap-4 p-4 border rounded-lg">
                  <div className="w-16 h-16 bg-gray-100 border-2 border-amber-300 rounded-md overflow-hidden flex-shrink-0">
                    <img
                      src={item.image_url || `/placeholder.svg?height=64&width=64&query=${item.name}`}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm line-clamp-2">{item.name}</h4>
                    <div className="text-xs text-gray-500 mt-1 mb-1">
                      Color: {item.color}
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs">Size:</span>
                      <input
                        type="number"
                        min={6}
                        max={13}
                        value={item.size || ""}
                        onChange={e => {
                          const newSize = e.target.value;
                          const sizeNum = parseInt(newSize);
                          if (newSize === "" || (sizeNum >= 6 && sizeNum <= 13)) {
                            updateQuantity(item.id, newSize, item.color, item.quantity);
                          }
                        }}
                        className="w-14 px-1 py-0.5 border rounded text-center text-xs"
                        placeholder="6-13"
                      />
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <span className="font-semibold text-amber-800">Rs. {item.price.toLocaleString()}</span>
                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-6 w-6 p-0 bg-transparent"
                          onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                        >
                          <Minus size={12} />
                        </Button>
                        <span className="text-sm font-medium w-8 text-center">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-6 w-6 p-0 bg-transparent"
                          onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity + 1)}
                          disabled={item.quantity >= item.stock_quantity}
                        >
                          <Plus size={12} />
                        </Button>
                      </div>
                    </div>

                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-red-600 hover:text-red-700 p-0 h-auto mt-2"
                      onClick={() => removeItem(item.id, item.size, item.color)}
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cart.items.length > 0 && (
          <div className="border-t p-4 space-y-4">
            <div className="flex items-center justify-between text-lg font-semibold">
              <span>Total:</span>
              <span className="text-amber-800">Rs. {cart.total.toLocaleString()}</span>
            </div>

            <div className="space-y-2">
              <Button className="w-full bg-amber-800 hover:bg-amber-900" onClick={closeCart} asChild>
                <Link href="/checkout">Proceed to Checkout</Link>
              </Button>
              <Button variant="outline" className="w-full bg-transparent" onClick={closeCart} asChild>
                <Link href="/products">Continue Shopping</Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
