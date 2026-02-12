"use client"

import type React from "react"
import { createContext, useContext, useReducer, useEffect } from "react"
import { type Cart, getCartFromStorage, addToCart, removeFromCart, updateCartItemQuantity, clearCart } from "@/lib/cart"

interface CartContextType {
  cart: Cart
  addItem: (product: any, quantity?: number) => void
  removeItem: (itemId: number, size: string | null, color: string | null) => void
  updateQuantity: (itemId: number, size: string | null, color: string | null, quantity: number) => void
  clearCart: () => void
  isOpen: boolean
  openCart: () => void
  closeCart: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

type CartAction =
  | { type: "LOAD_CART"; payload: Cart }
  | { type: "ADD_ITEM"; payload: { product: any; quantity: number } }
  | { type: "REMOVE_ITEM"; payload: { itemId: number; size: string | null; color: string | null } }
  | {
      type: "UPDATE_QUANTITY"
      payload: { itemId: number; size: string | null; color: string | null; quantity: number; prevSize?: string | null }
    }
  | { type: "CLEAR_CART" }
  | { type: "OPEN_CART" }
  | { type: "CLOSE_CART" }

interface CartState {
  cart: Cart
  isOpen: boolean
}

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case "LOAD_CART":
      return { ...state, cart: action.payload }
    case "ADD_ITEM":
      return { ...state, cart: addToCart(state.cart, action.payload.product, action.payload.quantity) }
    case "REMOVE_ITEM":
      return {
        ...state,
        cart: removeFromCart(state.cart, action.payload.itemId, action.payload.size, action.payload.color),
      }
    case "UPDATE_QUANTITY":
      return {
        ...state,
        cart: updateCartItemQuantity(
          state.cart,
          action.payload.itemId,
          action.payload.size,
          action.payload.color,
          action.payload.quantity,
          action.payload.prevSize,
        ),
      }
    case "CLEAR_CART":
      return { ...state, cart: clearCart() }
    case "OPEN_CART":
      return { ...state, isOpen: true }
    case "CLOSE_CART":
      return { ...state, isOpen: false }
    default:
      return state
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, {
    cart: { items: [], total: 0, itemCount: 0 },
    isOpen: false,
  })

  useEffect(() => {
    // Load cart from localStorage on mount
    const savedCart = getCartFromStorage()
    dispatch({ type: "LOAD_CART", payload: savedCart })
  }, [])

  const addItem = (product: any, quantity = 1) => {
    dispatch({ type: "ADD_ITEM", payload: { product, quantity } })
  }

  const removeItem = (itemId: number, size: string | null, color: string | null) => {
    dispatch({ type: "REMOVE_ITEM", payload: { itemId, size, color } })
  }

  const updateQuantity = (itemId: number, size: string | null, color: string | null, quantity: number, prevSize?: string | null) => {
    dispatch({ type: "UPDATE_QUANTITY", payload: { itemId, size, color, quantity, prevSize } })
  }

  const clearCartItems = () => {
    dispatch({ type: "CLEAR_CART" })
  }

  const openCart = () => {
    dispatch({ type: "OPEN_CART" })
  }

  const closeCart = () => {
    dispatch({ type: "CLOSE_CART" })
  }

  return (
    <CartContext.Provider
      value={{
        cart: state.cart,
        addItem,
        removeItem,
        updateQuantity,
        clearCart: clearCartItems,
        isOpen: state.isOpen,
        openCart,
        closeCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
