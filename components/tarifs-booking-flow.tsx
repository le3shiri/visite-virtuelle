"use client"

import { useState, useRef } from "react"
import { PriceCalculator } from "@/components/price-calculator"
import { ContactForm } from "@/components/contact-form"
import { ArrowUp } from "lucide-react"
import { Button } from "@/components/ui/button"

export function TarifsBookingFlow() {
  const [showForm, setShowForm] = useState(false)
  const [calcParams, setCalcParams] = useState<{
    surface: number
    typeLocal: string
    points: number
    price: number
  } | null>(null)
  const formRef = useRef<HTMLDivElement>(null)

  const handleReserve = (surface: number, typeLocal: string, points: number, price: number) => {
    setCalcParams({ surface, typeLocal, points, price })
    setShowForm(true)
    // Scroll to the form after a short delay to allow render
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
    }, 80)
  }

  const handleBackToCalculator = () => {
    setShowForm(false)
    setCalcParams(null)
    // Scroll back up to calculator
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" })
    }, 80)
  }

  return (
    <>
      {/* Calculator — always mounted, hidden when form is shown */}
      <div className={showForm ? "hidden" : "block"}>
        <PriceCalculator onReserve={handleReserve} />
      </div>

      {/* Inline contact form — revealed after clicking Réserver */}
      {showForm && calcParams && (
        <div ref={formRef} className="w-full max-w-6xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Finalisez votre réservation</h2>
              <p className="text-muted-foreground text-sm mt-1">
                Remplissez le formulaire ci-dessous — vos paramètres sont pré-remplis.
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleBackToCalculator}
              className="flex items-center gap-2 text-sm"
            >
              <ArrowUp className="h-4 w-4" />
              Modifier l&apos;estimation
            </Button>
          </div>
          <ContactForm
            initialSurface={calcParams.surface}
            initialTypeLocal={calcParams.typeLocal}
            initialPoints={calcParams.points}
          />
        </div>
      )}
    </>
  )
}
