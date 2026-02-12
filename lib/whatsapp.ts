// WhatsApp integration utilities for Us Chappal Umarzai

export const WHATSAPP_NUMBER = "+923459095280" // Store's WhatsApp number

export interface WhatsAppMessageData {
  customerName?: string
  orderId?: number
  orderTotal?: number
  customerPhone?: string
  customerAddress?: string
  city?: string
  items?: Array<{
    name: string
    quantity: number
    price: number
    size?: string
    color?: string
  }>
  paymentMethod?: string
  notes?: string
}

export function generateOrderConfirmationMessage(data: WhatsAppMessageData): string {
  const { customerName, orderId, orderTotal, customerPhone, customerAddress, city, items, paymentMethod, notes } = data

  let message = `Hello! I have placed an order on Us Chappal Umarzai.

Order Details:
- Order ID: #${orderId}
- Customer: ${customerName}
- Phone: ${customerPhone}
- Address: ${customerAddress}, ${city}
- Total Amount: Rs. ${orderTotal?.toLocaleString()}
- Payment Method: ${paymentMethod === "cash_on_delivery" ? "Cash on Delivery" : "Online Payment"}`

  if (items && items.length > 0) {
    message += "\n\nItems:"
    items.forEach((item) => {
      message += `\n- ${item.name} (Size: ${item.size}, Color: ${item.color}) x${item.quantity} = Rs. ${(item.price * item.quantity).toLocaleString()}`
    })
  }

  if (notes) {
    message += `\n\nSpecial Instructions: ${notes}`
  }

  message += "\n\nPlease confirm my order. Thank you!"

  return encodeURIComponent(message)
}

export function generateAdminOrderMessage(data: WhatsAppMessageData): string {
  const { customerName, orderId, orderTotal, customerAddress, city, paymentMethod } = data

  const message = `Hello ${customerName}! 

Your order #${orderId} from Us Chappal Umarzai has been confirmed.

Order Details:
- Total Amount: Rs. ${orderTotal?.toLocaleString()}
- Delivery Address: ${customerAddress}, ${city}
- Payment Method: ${paymentMethod === "cash_on_delivery" ? "Cash on Delivery" : "Online Payment"}

We will contact you soon for delivery confirmation. Thank you for choosing Us Chappal Umarzai!`

  return encodeURIComponent(message)
}

export function generateInquiryMessage(productName?: string): string {
  let message = `Hello! I'm interested in your products at Us Chappal Umarzai.`

  if (productName) {
    message += `\n\nI would like to know more about: ${productName}`
  }

  message += `\n\nCould you please provide more information about availability, sizes, and delivery options?`

  return encodeURIComponent(message)
}

export function generateCustomMessage(message: string): string {
  return encodeURIComponent(message)
}

export function getWhatsAppUrl(message: string, phoneNumber?: string): string {
  const number = phoneNumber || WHATSAPP_NUMBER
  return `https://wa.me/${number.replace(/[^0-9]/g, "")}?text=${message}`
}

export function openWhatsApp(message: string, phoneNumber?: string): void {
  const url = getWhatsAppUrl(message, phoneNumber)
  window.open(url, "_blank", "noopener,noreferrer")
}
