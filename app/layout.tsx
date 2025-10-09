import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { FloatingWhatsApp } from "@/components/floating-cta"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"

export const metadata: Metadata = {
  title: "Ladrissi Com - Visites Virtuelles 360° à Tanger",
  description:
    "Spécialiste des visites virtuelles immersives pour hôtels, restaurants, showrooms, écoles et projets immobiliers à Tanger. Vos espaces comme vous ne les avez jamais vus.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased`}>
        <Suspense fallback={null}>{children}</Suspense>
        <Analytics />
        <FloatingWhatsApp />
      </body>
    </html>
  )
}
