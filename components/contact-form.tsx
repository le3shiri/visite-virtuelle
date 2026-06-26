"use client"

import type React from "react"
import { useState, Suspense } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { 
  Building2, 
  ShoppingBag, 
  Hotel, 
  GraduationCap, 
  Factory, 
  Info, 
  Plus, 
  Minus, 
  ArrowRight, 
  ArrowLeft, 
  Sparkles, 
  Send, 
  CalendarIcon, 
  CheckCircle2, 
  HelpCircle,
  ImagePlus,
  Tag
} from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { format, startOfDay } from "date-fns"
import { fr } from "date-fns/locale"
import { cn } from "@/lib/utils"
import { useSearchParams } from "next/navigation"
import * as fbq from "@/lib/fbpixel"

// Formula (from formule prix visite virtuelle.md)
// Prix total = Forfait de base (by type) + Prix surface (cumulative brackets) + Prix points d’info
//
// Forfaits:
//   Immobilier             → 1 500 DH
//   Commerce / Hôtellerie / Éducation → 2 000 DH
//   Industrie              → 3 000 DH
//
// Brackets cumulatifs:
//   ≤ 100 m²       : 35 DH/m²
//   101 – 250 m²   : 28 DH/m²
//   251 – 500 m²   : 22 DH/m²
//   501 – 1 000 m² : 15 DH/m²
//   > 1 000 m²     : 10 DH/m²
//
// Points d’information : 120 DH / point

const propertyTypes = [
  {
    id: "Immobilier",
    label: "Immobilier",
    sublabel: "Appartements, Villas",
    icon: Building2,
    forfait: 1500,
    color: "from-blue-500/20 to-cyan-500/20 text-blue-600 dark:text-blue-400"
  },
  {
    id: "Commerce",
    label: "Commerce",
    sublabel: "Boutiques, Showrooms",
    icon: ShoppingBag,
    forfait: 2000,
    color: "from-emerald-500/20 to-teal-500/20 text-emerald-600 dark:text-emerald-400"
  },
  {
    id: "Hôtellerie",
    label: "Hôtellerie",
    sublabel: "Hôtels, Riads, Restos",
    icon: Hotel,
    forfait: 3000,
    color: "from-amber-500/20 to-orange-500/20 text-amber-600 dark:text-amber-400"
  },
  {
    id: "Éducation",
    label: "Éducation & Santé",
    sublabel: "Campus, Écoles, Cliniques",
    icon: GraduationCap,
    forfait: 2000,
    color: "from-indigo-500/20 to-purple-500/20 text-indigo-600 dark:text-indigo-400"
  },
  {
    id: "Industrie",
    label: "Industrie",
    sublabel: "Bureaux, Usines, Dépôts",
    icon: Factory,
    forfait: 3000,
    color: "from-rose-500/20 to-pink-500/20 text-rose-600 dark:text-rose-400"
  }
]

function ContactFormInner() {
  const [step, setStep] = useState<1 | 2 | 3>(1)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [date, setDate] = useState<Date>()
  const [time, setTime] = useState<string | null>(null)

  // Info points detail state
  const [infoPointsData, setInfoPointsData] = useState<{ title: string; file: File | null }[]>([])

  const searchParams = useSearchParams()
  const paramSurface = searchParams.get("surface")
  const paramType = searchParams.get("typeLocal")
  const paramPoints = searchParams.get("points")

  // Map paramType parameter to matching propertyType
  const getInitialType = () => {
    if (!paramType) return "Immobilier"
    if (paramType.toLowerCase() === "showroom" || paramType.toLowerCase() === "commerce") return "Commerce"
    const found = propertyTypes.some(t => t.id.toLowerCase() === paramType.toLowerCase())
    if (found) {
      return propertyTypes.find(t => t.id.toLowerCase() === paramType.toLowerCase())?.id || "Immobilier"
    }
    return "Immobilier"
  }

  // Calculator states
  const [propertyType, setPropertyType] = useState(getInitialType())
  const [surface, setSurface] = useState(paramSurface ? Math.max(1, Number(paramSurface)) : 80)
  const [infoPoints, setInfoPoints] = useState(paramPoints ? Math.max(0, Number(paramPoints)) : 5)

  // Sync infoPointsData length when infoPoints changes
  const syncInfoPointsData = (newCount: number) => {
    setInfoPointsData(prev => {
      if (newCount > prev.length) {
        return [...prev, ...Array(newCount - prev.length).fill(null).map(() => ({ title: "", file: null }))]
      }
      return prev.slice(0, newCount)
    })
  }

  const handleSetInfoPoints = (val: number) => {
    const clamped = Math.max(0, val)
    setInfoPoints(clamped)
    syncInfoPointsData(clamped)
  }

  const updateInfoPoint = (index: number, field: "title" | "file", value: string | File | null) => {
    setInfoPointsData(prev => {
      const next = [...prev]
      next[index] = { ...next[index], [field]: value }
      return next
    })
  }

  // Pricing formula from formule prix visite virtuelle.md (market-adjusted rates)
  // Prix total = Forfait de base + Prix surface (cumulative brackets) + Prix points d’info
  const infoPointRate = 120  // 120 DH / point

  // Cumulative area cost (market-adjusted)
  const BASE_500  = 100 * 25 + 150 * 18 + 250 * 14  // 8 700 DH at 500 m²
  const BASE_1000 = BASE_500 + 500 * 8               // 12 700 DH at 1 000 m²

  const getAreaCost = (s: number): number => {
    if (s <= 100)  return s * 25
    if (s <= 250)  return 100 * 25 + (s - 100) * 18
    if (s <= 500)  return 100 * 25 + 150 * 18 + (s - 250) * 14
    if (s <= 1000) return BASE_500 + (s - 500) * 8
    return BASE_1000 + (s - 1000) * 4
  }

  const activeProperty = propertyTypes.find(t => t.id === propertyType) || propertyTypes[0]
  const forfait        = activeProperty.forfait
  const areaCost       = getAreaCost(surface)
  const infoPointsCost = infoPoints * infoPointRate
  const totalPrice     = Math.round(forfait + areaCost + infoPointsCost)
  const avgPricePerM2  = surface > 0 ? Math.round(totalPrice / surface) : 0

  const timeSlots = [
    "09:00", "10:00", "11:00", "14:00", "15:00", "16:00", "17:00"
  ]

  const scrollToForm = () => {
    const formElement = document.getElementById("formulaire")
    if (formElement) {
      formElement.scrollIntoView({ behavior: "smooth" })
    }
  }

  const handleStep1Next = () => {
    fbq.trackPricingView(propertyType)
    fbq.trackQuoteRequest(propertyType, totalPrice)
    setStep(2)
    scrollToForm()
  }

  const handleStep2Next = (e: React.MouseEvent<HTMLButtonElement>) => {
    const form = e.currentTarget.closest('form')
    if (form) {
      // Validate only inputs in step 2 (nom, email, telephone)
      const inputs = form.querySelectorAll('input[required]')
      let isValid = true
      inputs.forEach((input) => {
        if (!(input as HTMLInputElement).checkValidity()) {
          (input as HTMLInputElement).reportValidity()
          isValid = false
        }
      })
      if (isValid) {
        setStep(3)
        scrollToForm()
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!date || !time) {
      alert("Veuillez sélectionner une date et une heure pour votre tournage.")
      return
    }
    setIsLoading(true)

    const formData = new FormData(e.currentTarget)
    const data = {
      nom: formData.get("nom"),
      email: formData.get("email"),
      telephone: formData.get("telephone"),
      entreprise: formData.get("entreprise") || 'Non spécifiée',
      typeLocal: propertyType,
      dateTournage: date ? format(date, "yyyy-MM-dd", { locale: fr }) : null,
      heureTournage: time,
      message: formData.get("message"),
      surface: surface.toString(),
      points: infoPoints.toString(),
      price: totalPrice.toString(),
    }

    try {
      const response = await fetch("/api/send-quote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (result.success) {
        setIsSubmitted(true)
        
        // Facebook Pixel Event Tracking
        fbq.trackQuoteRequest(propertyType, totalPrice)
        fbq.trackLead({
          content_name: `Réservation - ${propertyType}`,
          value: totalPrice,
          currency: "MAD"
        })

        // WhatsApp redirection
        const whatsappNumber = "212669499987"
        const formattedDate = format(date, "EEEE d MMMM yyyy", { locale: fr })
        let whatsappMessage = `Nouvelle demande de réservation :
👤 Nom: ${data.nom}
📧 Email: ${data.email}
📞 Tél: ${data.telephone}
🏢 Entreprise: ${data.entreprise}
🏠 Type de local: ${data.typeLocal}
📐 Superficie: ${data.surface} m²
ℹ️ Points d'info: ${data.points}
💰 Tarif estimé: ${totalPrice.toLocaleString("fr-FR")} DH
📅 Date souhaitée: ${formattedDate}
⏰ Heure: ${data.heureTournage}
💬 Message: ${data.message || 'Aucun'}`
        
        const encodedMessage = encodeURIComponent(whatsappMessage)
        window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, '_blank')
      } else {
        alert("Erreur lors de l'envoi de votre demande. Veuillez réessayer.")
      }
    } catch (error) {
      console.error("Error submitting form:", error)
      alert("Erreur lors de l'envoi de votre demande. Veuillez réessayer.")
    } finally {
      setIsLoading(false)
    }
  }

  if (isSubmitted) {
    return (
      <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5">
        <CardContent className="p-8 lg:p-12 text-center">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="h-8 w-8 text-primary" />
          </div>
          <h3 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">Merci pour votre demande !</h3>
          <p className="text-muted-foreground mb-6 leading-relaxed">
            Nous avons bien reçu votre demande de réservation. 
            Notre équipe vous contactera dans les 24 heures pour finaliser votre projet.
          </p>
          <Button
            onClick={() => {
              setIsSubmitted(false)
              setStep(1)
              setDate(undefined)
              setTime(null)
            }}
            variant="outline"
          >
            Faire une nouvelle demande
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
      {/* Stepper progress indicator */}
      <div className="mb-10 max-w-xl mx-auto">
        <div className="flex items-center justify-between relative">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-slate-100 dark:bg-slate-800 -z-10 rounded-full" />
          <div 
            className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-primary -z-10 rounded-full transition-all duration-500"
            style={{ width: `${((step - 1) / 2) * 100}%` }}
          />

          {/* Step 1 */}
          <div className="flex flex-col items-center gap-2">
            <button
              type="button"
              onClick={() => { if (step > 1) { setStep(1); scrollToForm(); } }}
              disabled={step === 1}
              className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all border-2 duration-500",
                step >= 1 
                  ? "bg-primary border-primary text-white shadow-lg shadow-primary/20" 
                  : "bg-background border-slate-200 text-slate-400"
              )}
            >
              1
            </button>
            <span className={cn("text-xs font-bold transition-colors", step === 1 ? "text-primary" : "text-muted-foreground")}>Configuration</span>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col items-center gap-2">
            <button
              type="button"
              onClick={() => { if (step > 2) { setStep(2); scrollToForm(); } }}
              disabled={step <= 2}
              className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all border-2 duration-500",
                step >= 2 
                  ? "bg-primary border-primary text-white shadow-lg shadow-primary/20" 
                  : "bg-background border-slate-200 text-slate-400 animate-pulse"
              )}
            >
              2
            </button>
            <span className={cn("text-xs font-bold transition-colors", step === 2 ? "text-primary" : "text-muted-foreground")}>Coordonnées</span>
          </div>

          {/* Step 3 */}
          <div className="flex flex-col items-center gap-2">
            <div 
              className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all border-2 duration-500",
                step >= 3 
                  ? "bg-primary border-primary text-white shadow-lg shadow-primary/20" 
                  : "bg-background border-slate-200 text-slate-400"
              )}
            >
              3
            </div>
            <span className={cn("text-xs font-bold transition-colors", step === 3 ? "text-primary" : "text-muted-foreground")}>Planification</span>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        {/* STEP 1: Pricing Calculator & Live Estimation */}
        <div className={cn("w-full rounded-3xl overflow-hidden border border-border/80 bg-card shadow-[0_20px_50px_rgba(0,0,0,0.03)] text-foreground", step !== 1 && "hidden")}>
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Left controls */}
            <div className="lg:col-span-7 p-6 sm:p-8 space-y-6 lg:border-r border-border/50">
              
              {/* Nature du bien */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="h-6 w-6 rounded-full p-0 flex items-center justify-center border-primary/30 text-primary font-bold text-xs bg-primary/5">1</Badge>
                  <h3 className="font-bold text-base text-slate-800 dark:text-slate-100">Nature du bien à photographier</h3>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
                  {propertyTypes.map((type) => {
                    const Icon = type.icon
                    const isSelected = propertyType === type.id
                    return (
                      <button
                        key={type.id}
                        type="button"
                        onClick={() => setPropertyType(type.id)}
                        className={cn(
                          "flex flex-col items-center justify-between p-3 rounded-xl border-2 text-center transition-all cursor-pointer",
                          isSelected 
                            ? "border-primary bg-primary/5 shadow-md shadow-primary/5 scale-[1.03]" 
                            : "border-slate-100 dark:border-slate-800 hover:border-slate-300 hover:bg-slate-50/50"
                        )}
                      >
                        <div className={cn("p-2.5 rounded-lg bg-gradient-to-br mb-2 flex items-center justify-center", type.color)}>
                          <Icon className="h-4 w-4" />
                        </div>
                        <div className="space-y-0.5">
                          <p className="text-[11px] font-bold leading-tight">{type.label}</p>
                          <p className="text-[8px] text-muted-foreground leading-none">{type.sublabel}</p>
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Superficie */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="h-6 w-6 rounded-full p-0 flex items-center justify-center border-primary/30 text-primary font-bold text-xs bg-primary/5">2</Badge>
                    <h3 className="font-bold text-base text-slate-800 dark:text-slate-100">Superficie du local</h3>
                  </div>
                  <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-3 py-1 rounded-lg">
                    <Input 
                      type="number" 
                      value={surface} 
                      onChange={(e) => setSurface(Math.max(0, Number(e.target.value)))}
                      className="w-20 h-8 text-center font-bold text-sm bg-transparent border-none p-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-foreground"
                      min={0}
                    />
                    <span className="text-xs font-semibold text-muted-foreground">m²</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <input
                    type="range"
                    min={0}
                    max={10000}
                    step={10}
                    value={surface}
                    onChange={(e) => setSurface(Number(e.target.value))}
                    className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-primary"
                  />
                  <div className="flex justify-between text-[10px] text-muted-foreground font-semibold px-1">
                    <span>0 m²</span>
                    <span>2 500 m²</span>
                    <span>5 000 m²</span>
                    <span>7 500 m²</span>
                    <span>10 000 m²</span>
                  </div>
                </div>
                <div className="p-3 bg-primary/5 rounded-xl border border-primary/10 flex items-start gap-2">
                  <Info className="h-3.5 w-3.5 text-primary mt-0.5 flex-shrink-0" />
                  <div className="text-[11px] leading-relaxed text-muted-foreground">
                    <span className="font-bold text-primary">Tarification optimisée :</span> Nos tarifs s'adaptent automatiquement à l'envergure de votre projet. Vous bénéficiez d'une dégressivité avantageuse sur le coût moyen par m² à mesure que la superficie augmente.
                  </div>
                </div>
              </div>

              {/* Points d'info */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="h-6 w-6 rounded-full p-0 flex items-center justify-center border-primary/30 text-primary font-bold text-xs bg-primary/5">3</Badge>
                    <h3 className="font-bold text-base text-slate-800 dark:text-slate-100">Points d'information interactifs</h3>
                  </div>
                  <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-2 py-1 rounded-lg">
                    <button
                      type="button"
                      onClick={() => handleSetInfoPoints(infoPoints - 1)}
                      disabled={infoPoints <= 0}
                      className="w-8 h-8 rounded-full border border-slate-200/50 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 flex items-center justify-center hover:bg-slate-50 dark:hover:bg-slate-900 disabled:opacity-30 disabled:pointer-events-none transition-colors"
                    >
                      <Minus className="h-3.5 w-3.5 text-foreground" />
                    </button>
                    <Input 
                      type="number"
                      value={infoPoints}
                      onChange={(e) => handleSetInfoPoints(Number(e.target.value))}
                      className="w-12 h-8 text-center font-bold text-sm bg-transparent border-none p-0 focus-visible:ring-0 focus-visible:ring-offset-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none text-foreground"
                      min={0}
                    />
                    <button
                      type="button"
                      onClick={() => handleSetInfoPoints(infoPoints + 1)}
                      className="w-8 h-8 rounded-full border border-slate-200/50 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 flex items-center justify-center hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors"
                    >
                      <Plus className="h-3.5 w-3.5 text-foreground" />
                    </button>
                  </div>
                </div>
                <p className="text-[11px] text-muted-foreground">
                  Tags cliquables intégrés à la visite 360° pour afficher du contenu (texte, images, liens externes, vidéos, fiches produits).
                </p>
              </div>
            </div>

            {/* Right estimation summary */}
            <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 via-slate-950 to-primary/85 text-white p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden">
              <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:20px_20px]" />
              <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl" />

              <div className="relative z-10 space-y-5">
                <div>
                  <h3 className="text-lg font-black tracking-tight mb-0.5">Résumé de l'estimation</h3>
                  <p className="text-[10px] text-slate-400">Détail des coûts de votre visite 360°</p>
                </div>

                <div className="space-y-3.5 text-xs border-t border-slate-800 pt-5">
                  {/* Base Forfait by type */}
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400 flex items-center gap-1" title={activeProperty.label}>
                      Forfait de base
                      <HelpCircle className="h-3 w-3 opacity-50" />
                    </span>
                    <span className="font-bold">{forfait.toLocaleString("fr-FR")} DH</span>
                  </div>
                  <div className="flex justify-between items-center text-[10px]">
                    <span className="text-slate-500 italic">{activeProperty.label}</span>
                  </div>

                  {/* Surface Cost */}
                  <div className="flex justify-between items-start">
                    <span className="text-slate-400">
                      Coût superficie ({surface} m²)
                      <p className="text-[9px] text-slate-500 italic">Tranches progressives cumulées</p>
                    </span>
                    <span className="font-bold">{areaCost.toLocaleString("fr-FR")} DH</span>
                  </div>

                  {/* Hotspots Cost */}
                  {infoPointsCost > 0 && (
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400">
                        Points d’information ({infoPoints} × 120 DH)
                      </span>
                      <span className="font-bold">{infoPointsCost.toLocaleString("fr-FR")} DH</span>
                    </div>
                  )}

                  {/* Average rate */}
                  <div className="flex justify-between items-center text-[10px] text-slate-400 bg-white/5 p-2.5 rounded-lg border border-white/10 mt-1">
                    <span>Coût moyen estimé / m²</span>
                    <span className="font-bold text-white">{avgPricePerM2} DH / m²</span>
                  </div>
                </div>
              </div>

              <div className="relative z-10 mt-6 space-y-4">
                <div className="border-t border-slate-800 pt-5 flex flex-col gap-0.5">
                  <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">Tarif Estimé Clé en Main</span>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-primary/80">
                      {totalPrice.toLocaleString("fr-FR")}
                    </span>
                    <span className="text-lg font-bold text-primary">DH</span>
                  </div>
                  <span className="text-[9px] text-slate-500 italic">*Prix estimatif hors taxes, sujet à ajustement.</span>
                </div>

                <Button 
                  type="button" 
                  onClick={handleStep1Next} 
                  size="lg" 
                  className="w-full py-5 text-sm font-bold shadow-lg bg-primary hover:bg-primary/90 text-white rounded-xl transition-all hover:scale-[1.01] active:scale-[1.0] cursor-pointer"
                >
                  Continuer vers mes coordonnées
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* STEP 2: Personal Information */}
        <div className={cn("space-y-6 animate-in fade-in duration-500", step !== 2 && "hidden")}>
          <Card className="border-slate-100 dark:border-slate-800 shadow-[0_20px_50px_rgba(0,0,0,0.03)] overflow-hidden bg-card">
            <CardContent className="p-6 sm:p-8 lg:p-10 space-y-10">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-primary" />
                  </div>
                  <h4 className="font-black text-lg text-slate-900 dark:text-white tracking-tight">Vos Coordonnées</h4>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
                  <div className="space-y-1.5">
                    <Label htmlFor="nom" className="text-[10px] font-black uppercase tracking-wider text-slate-400">Nom complet *</Label>
                    <Input 
                      id="nom" 
                      name="nom" 
                      placeholder="Mohammed Alami" 
                      className="h-11 border-slate-200 focus:border-primary transition-colors text-foreground" 
                      required={step >= 2} 
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="email" className="text-[10px] font-black uppercase tracking-wider text-slate-400">Email *</Label>
                    <Input 
                      id="email" 
                      name="email" 
                      type="email" 
                      placeholder="contact@exemple.com" 
                      className="h-11 border-slate-200 focus:border-primary transition-colors text-foreground" 
                      required={step >= 2} 
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="telephone" className="text-[10px] font-black uppercase tracking-wider text-slate-400">Téléphone *</Label>
                    <Input 
                      id="telephone" 
                      name="telephone" 
                      type="tel" 
                      placeholder="0669499987" 
                      className="h-11 border-slate-200 focus:border-primary transition-colors text-foreground" 
                      required={step >= 2} 
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="entreprise" className="text-[10px] font-black uppercase tracking-wider text-slate-400">Entreprise (Optionnel)</Label>
                    <Input 
                      id="entreprise" 
                      name="entreprise" 
                      placeholder="Nom de votre entreprise" 
                      className="h-11 border-slate-200 focus:border-primary transition-colors text-foreground" 
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-1.5 pt-8 border-t border-slate-100 dark:border-slate-800">
                <Label htmlFor="message" className="text-[10px] font-black uppercase tracking-wider text-slate-400">Message complémentaire (Optionnel)</Label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Informations supplémentaires, questions, besoins spécifiques..."
                  rows={4}
                  className="border-slate-200 focus:border-primary text-foreground"
                />
              </div>

              {/* Info Points Detail Section */}
              {infoPoints > 0 && (
                <div className="pt-8 border-t border-slate-100 dark:border-slate-800 space-y-5">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
                      <Tag className="w-4 h-4 text-accent" />
                    </div>
                    <div>
                      <h4 className="font-black text-base text-slate-900 dark:text-white tracking-tight">
                        Détail des {infoPoints} point{infoPoints > 1 ? "s" : ""} d'information
                      </h4>
                      <p className="text-[11px] text-muted-foreground">
                        Donnez un titre à chaque point et joignez l'image ou le contenu à afficher (optionnel).
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Array.from({ length: infoPoints }).map((_, i) => (
                      <div
                        key={i}
                        className="rounded-2xl border-2 border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 p-4 space-y-3 hover:border-primary/30 transition-colors"
                      >
                        {/* Point number badge */}
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-[10px] font-black flex items-center justify-center flex-shrink-0">
                            {i + 1}
                          </span>
                          <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                            Point d'information #{i + 1}
                          </span>
                        </div>

                        {/* Title */}
                        <div className="space-y-1">
                          <Label className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                            Titre du point
                          </Label>
                          <Input
                            placeholder={`Ex: Chambre principale, Salle de réunion…`}
                            value={infoPointsData[i]?.title ?? ""}
                            onChange={(e) => updateInfoPoint(i, "title", e.target.value)}
                            className="h-10 border-slate-200 focus:border-primary transition-colors text-foreground text-sm"
                          />
                        </div>

                        {/* File upload */}
                        <div className="space-y-1">
                          <Label className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                            Image / Fichier joint <span className="normal-case font-normal text-slate-400">(optionnel)</span>
                          </Label>
                          <label
                            htmlFor={`info-point-file-${i}`}
                            className={cn(
                              "flex flex-col items-center justify-center gap-1.5 h-24 rounded-xl border-2 border-dashed cursor-pointer transition-all text-center px-3",
                              infoPointsData[i]?.file
                                ? "border-primary/50 bg-primary/5 text-primary"
                                : "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-400 hover:border-primary/40 hover:bg-primary/5 hover:text-primary/70"
                            )}
                          >
                            <ImagePlus className="h-5 w-5 flex-shrink-0" />
                            {infoPointsData[i]?.file ? (
                              <>
                                <span className="text-[10px] font-bold leading-tight line-clamp-1 max-w-full">
                                  {infoPointsData[i].file!.name}
                                </span>
                                <span className="text-[9px] opacity-60">
                                  {(infoPointsData[i].file!.size / 1024).toFixed(0)} Ko
                                </span>
                              </>
                            ) : (
                              <span className="text-[10px] font-medium leading-tight">
                                Cliquez pour joindre<br />
                                <span className="opacity-60">PNG, JPG, PDF — max 10 Mo</span>
                              </span>
                            )}
                            <input
                              id={`info-point-file-${i}`}
                              type="file"
                              accept="image/*,.pdf"
                              className="sr-only"
                              onChange={(e) => {
                                const file = e.target.files?.[0] ?? null
                                updateInfoPoint(i, "file", file)
                              }}
                            />
                          </label>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex flex-col sm:flex-row justify-between gap-3 pt-6 border-t border-slate-100 dark:border-slate-800">
                <Button
                  type="button"
                  onClick={() => { setStep(1); scrollToForm(); }}
                  variant="outline"
                  className="w-full sm:w-auto px-6 py-5 rounded-xl border-slate-200 cursor-pointer"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Retour à l'estimation
                </Button>
                <Button
                  type="button"
                  onClick={handleStep2Next}
                  className="w-full sm:w-auto px-8 py-5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl shadow-md transition-all cursor-pointer"
                >
                  Choisir la date & heure
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* STEP 3: Planification & Finalisation */}
        <div className={cn("mt-6 animate-in fade-in duration-500", step !== 3 && "hidden")}>
          <div className="max-w-5xl mx-auto">
            <div className="bg-white dark:bg-card rounded-[2rem] overflow-hidden border border-slate-200 dark:border-slate-800 shadow-xl p-6 sm:p-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left side calendar */}
                <div className="lg:col-span-7 space-y-6">
                  <div>
                    <div className="mb-3">
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-0.5">Choisir une date</h3>
                      <p className="text-xs text-slate-500">Sélectionnez le jour de votre tournage</p>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-950 rounded-2xl p-4 border border-slate-100 dark:border-slate-900 flex justify-center">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        className="rounded-md border shadow-sm bg-white dark:bg-slate-900 text-foreground"
                        initialFocus
                        disabled={(date) => date < startOfDay(new Date())}
                        locale={fr}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="mb-3">
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-0.5">Choisir l'heure</h3>
                      <p className="text-xs text-slate-500">Horaires disponibles pour la date choisie</p>
                    </div>

                    {!date ? (
                      <div className="h-28 flex flex-col items-center justify-center text-center p-5 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800 text-slate-400">
                        <CalendarIcon className="w-8 h-8 mb-1 opacity-20" />
                        <p className="text-xs font-medium">Veuillez d'abord sélectionner une date</p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                        {timeSlots.map((slot) => (
                          <button
                            key={slot}
                            type="button"
                            onClick={() => setTime(slot)}
                            className={cn(
                              "py-2 rounded-xl text-xs font-bold transition-all border-2 cursor-pointer",
                              time === slot
                                ? "bg-primary border-primary text-white shadow-lg shadow-primary/20 scale-105"
                                : "bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:border-primary/50 hover:bg-primary/5"
                            )}
                          >
                            {slot}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Right side Invoice summary */}
                <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
                  <div>
                    <h3 className="text-lg font-black text-slate-900 dark:text-white mb-3 tracking-tight">Récapitulatif final</h3>
                    
                    <div className="border border-dashed border-slate-200 dark:border-slate-800 rounded-2xl p-5 bg-slate-50/50 dark:bg-slate-950/50 space-y-4 relative overflow-hidden">
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex gap-1">
                        {[...Array(10)].map((_, i) => (
                          <div key={i} className="w-2 h-2 rounded-full bg-white dark:bg-card border border-slate-200 dark:border-slate-800" />
                        ))}
                      </div>

                      <div className="pt-2 text-xs space-y-3 font-medium text-slate-600 dark:text-slate-400">
                        <div className="flex justify-between">
                          <span>Type de bien :</span>
                          <span className="font-bold text-slate-950 dark:text-white">{propertyType}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Superficie :</span>
                          <span className="font-bold text-slate-950 dark:text-white">{surface} m²</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Points d'information :</span>
                          <span className="font-bold text-slate-950 dark:text-white">{infoPoints}</span>
                        </div>
                        
                        <div className="border-t border-slate-200/60 dark:border-slate-800/60 my-2" />
                        
                        <div className="flex justify-between">
                          <span>Date de prise de vue :</span>
                          <span className="font-bold text-primary">
                            {date ? format(date, "d MMMM yyyy", { locale: fr }) : "Non sélectionnée"}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Créneau horaire :</span>
                          <span className="font-bold text-primary">
                            {time ? time : "Non sélectionné"}
                          </span>
                        </div>

                        <div className="border-t border-slate-200/60 dark:border-slate-800/60 my-2" />

                        <div className="flex justify-between items-baseline pt-1">
                          <span className="text-xs font-black text-slate-900 dark:text-white">Total estimé :</span>
                          <span className="text-xl font-black text-primary">
                            {totalPrice.toLocaleString("fr-FR")} <span className="text-xs font-bold">DH</span>
                          </span>
                        </div>
                        <p className="text-[9px] text-slate-400 italic text-center mt-1">
                          *Hors taxes, sujet à ajustement final.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2.5">
                    <Button
                      type="submit"
                      className="w-full py-5 bg-primary hover:bg-primary/90 text-white font-black text-sm rounded-xl shadow-xl shadow-primary/20 transition-all disabled:opacity-50 cursor-pointer"
                      disabled={!date || !time || isLoading}
                    >
                      {isLoading ? (
                        <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                      ) : (
                        <>
                          <Send className="w-4 h-4 mr-2" />
                          Finaliser ma réservation
                        </>
                      )}
                    </Button>
                    <button
                      type="button"
                      onClick={() => { setStep(2); scrollToForm(); }}
                      className="w-full py-2 text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-slate-900 transition-colors flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <ArrowLeft className="w-3 h-3" />
                      Retour aux coordonnées
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export function ContactForm() {
  return (
    <Suspense fallback={<div className="h-64 flex items-center justify-center animate-pulse text-muted-foreground">Chargement du formulaire...</div>}>
      <ContactFormInner />
    </Suspense>
  )
}



