export interface CartItem {
  id: number
  name: string
  price: number
  image_url: string | null
  size: string | null
  color: string | null
  quantity: number
  stock_quantity: number
}

export interface Cart {
  items: CartItem[]
  total: number
  itemCount: number
}

export const getCartFromStorage = (): Cart => {
  if (typeof window === "undefined") {
    return { items: [], total: 0, itemCount: 0 }
  }

  try {
    const cartData = localStorage.getItem("abdullah-chappal-cart")
    if (cartData) {
      const cart = JSON.parse(cartData)
      return {
        ...cart,
        total: calculateCartTotal(cart.items),
        itemCount: calculateItemCount(cart.items),
      }
    }
  } catch (error) {
    console.error("Error loading cart from storage:", error)
  }

  return { items: [], total: 0, itemCount: 0 }
}

export const saveCartToStorage = (cart: Cart): void => {
  if (typeof window === "undefined") return

  try {
    localStorage.setItem("abdullah-chappal-cart", JSON.stringify(cart))
  } catch (error) {
    console.error("Error saving cart to storage:", error)
  }
}

export const calculateCartTotal = (items: CartItem[]): number => {
  return items.reduce((total, item) => total + item.price * item.quantity, 0)
}

export const calculateItemCount = (items: CartItem[]): number => {
  return items.reduce((count, item) => count + item.quantity, 0)
}

export const addToCart = (cart: Cart, product: any, quantity = 1): Cart => {
  const existingItemIndex = cart.items.findIndex(
    (item) => item.id === product.id && item.size === product.size && item.color === product.color,
  )

  let newItems: CartItem[]

  if (existingItemIndex >= 0) {
    // Update existing item quantity
    newItems = cart.items.map((item, index) =>
      index === existingItemIndex
        ? { ...item, quantity: Math.min(item.quantity + quantity, item.stock_quantity) }
        : item,
    )
  } else {
    // Add new item
    const newItem: CartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      image_url: product.image_url,
      size: product.size,
      color: product.color,
      quantity: Math.min(quantity, product.stock_quantity),
      stock_quantity: product.stock_quantity,
    }
    newItems = [...cart.items, newItem]
  }

  const newCart = {
    items: newItems,
    total: calculateCartTotal(newItems),
    itemCount: calculateItemCount(newItems),
  }

  saveCartToStorage(newCart)
  return newCart
}

export const removeFromCart = (cart: Cart, itemId: number, size: string | null, color: string | null): Cart => {
  const newItems = cart.items.filter((item) => !(item.id === itemId && item.size === size && item.color === color))

  const newCart = {
    items: newItems,
    total: calculateCartTotal(newItems),
    itemCount: calculateItemCount(newItems),
  }

  saveCartToStorage(newCart)
  return newCart
}

export const updateCartItemQuantity = (
  cart: Cart,
  itemId: number,
  size: string | null,
  color: string | null,
  quantity: number,
  prevSize?: string | null,
): Cart => {
  let newItems = cart.items.map((item) => {
    // If prevSize is provided, update the item with prevSize to the new size
    if (item.id === itemId && (prevSize ? item.size === prevSize : item.size === size) && item.color === color) {
      return { ...item, size, quantity: Math.min(Math.max(quantity, 1), item.stock_quantity) }
    }
    return item
  })

  const newCart = {
    items: newItems,
    total: calculateCartTotal(newItems),
    itemCount: calculateItemCount(newItems),
  }

  saveCartToStorage(newCart)
  return newCart
}

export const clearCart = (): Cart => {
  const emptyCart = { items: [], total: 0, itemCount: 0 }
  saveCartToStorage(emptyCart)
  return emptyCart
}
