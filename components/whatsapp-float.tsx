"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { MessageCircle, X } from "lucide-react"
import { generateInquiryMessage, openWhatsApp } from "@/lib/whatsapp"

export default function WhatsAppFloat() {
  const [isOpen, setIsOpen] = useState(false)
  const [customMessage, setCustomMessage] = useState("")
  const [sending, setSending] = useState(false)

  const handleSend = () => {
    if (!customMessage.trim()) return
    setSending(true)
    openWhatsApp(encodeURIComponent(customMessage))
    setSending(false)
    setIsOpen(false)
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen && (
        <div className="mb-4 bg-amber-50 rounded-lg shadow-lg border p-4 w-72">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-semibold text-gray-900">WhatsApp Us</h4>
            <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)} className="h-6 w-6 p-0">
              <X size={14} />
            </Button>
          </div>
          <textarea
            className="w-full border rounded p-2 text-sm mb-2 resize-none focus:outline-none focus:ring-2 focus:ring-amber-400"
            rows={3}
            placeholder="Type your message..."
            value={customMessage}
            onChange={e => setCustomMessage(e.target.value)}
            disabled={sending}
          />
          <Button
            className="w-full bg-green-600 hover:bg-green-700 text-white mt-2"
            onClick={handleSend}
            disabled={sending || !customMessage.trim()}
          >
            Send on WhatsApp
          </Button>
          <div className="mt-3 pt-3 border-t text-xs text-gray-500">
            We typically respond within minutes during business hours.
          </div>
        </div>
      )}

      <Button
        className="rounded-full w-14 h-14 bg-green-500 hover:bg-green-600 shadow-lg"
        onClick={() => setIsOpen(!isOpen)}
      >
        <MessageCircle size={24} className="text-white" />
      </Button>
    </div>
  )
}
