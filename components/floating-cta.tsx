"use client"

import Link from "next/link"
import { MessageCircle } from "lucide-react"

export function FloatingWhatsApp() {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Link
        href="https://wa.me/qr/M4CJLL7HF4M7G1"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-14 h-14 rounded-full bg-green-500 hover:bg-green-600 shadow-lg hover:scale-110 transition-all duration-300"
      >
        <MessageCircle className="w-7 h-7 text-white animate-pulse" />
      </Link>
    </div>
  )
}
