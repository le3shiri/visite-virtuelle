"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import * as fbq from "@/lib/fbpixel"
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
  Sparkles,
  HelpCircle
} from "lucide-react"

// Types of properties, labels, icons, and multipliers
const propertyTypes = [
  {
    id: "Immobilier",
    label: "Immobilier",
    sublabel: "Appartements, Villas",
    icon: Building2,
    multiplier: 1.0,
    color: "from-blue-500/20 to-cyan-500/20 text-blue-600 dark:text-blue-400"
  },
  {
    id: "Commerce",
    label: "Commerce",
    sublabel: "Boutiques, Showrooms",
    icon: ShoppingBag,
    multiplier: 1.2,
    color: "from-emerald-500/20 to-teal-500/20 text-emerald-600 dark:text-emerald-400"
  },
  {
    id: "Hôtellerie",
    label: "Hôtellerie",
    sublabel: "Hôtels, Riads, Restos",
    icon: Hotel,
    multiplier: 1.3,
    color: "from-amber-500/20 to-orange-500/20 text-amber-600 dark:text-amber-400"
  },
  {
    id: "Éducation",
    label: "Éducation & Santé",
    sublabel: "Campus, Écoles, Cliniques",
    icon: GraduationCap,
    multiplier: 1.1,
    color: "from-indigo-500/20 to-purple-500/20 text-indigo-600 dark:text-indigo-400"
  },
  {
    id: "Industrie",
    label: "Industrie",
    sublabel: "Bureaux, Usines, Dépôts",
    icon: Factory,
    multiplier: 1.4,
    color: "from-rose-500/20 to-pink-500/20 text-rose-600 dark:text-rose-400"
  }
]

export function PriceCalculator() {
  const [propertyType, setPropertyType] = useState("Immobilier")
  const [surface, setSurface] = useState(80)
  const [infoPoints, setInfoPoints] = useState(5)
  const [totalPrice, setTotalPrice] = useState(0)
  const [avgPricePerM2, setAvgPricePerM2] = useState(0)

  // Calculations details for invoice details
  const baseSetupFee = 1500
  const infoPointRate = 100

  // Calculate bracketed area cost (Minus 2 DH on each tranche: 48, 38, 28, 18)
  const getAreaCost = (s: number) => {
    if (s <= 50) return s * 48
    if (s <= 100) return 2400 + (s - 50) * 38
    if (s <= 250) return 4300 + (s - 100) * 28
    return 8500 + (s - 250) * 18
  }

  const activeProperty = propertyTypes.find(t => t.id === propertyType) || propertyTypes[0]
  const areaCost = getAreaCost(surface)
  const infoPointsCost = infoPoints * infoPointRate

  useEffect(() => {
    // Total calculation: (Base setup + Area cost) * multiplier + info points cost
    const calculatedTotal = Math.round((baseSetupFee + areaCost) * activeProperty.multiplier + infoPointsCost)
    setTotalPrice(calculatedTotal)
    setAvgPricePerM2(Math.round(calculatedTotal / surface))
  }, [surface, propertyType, infoPoints, areaCost, activeProperty.multiplier, infoPointsCost])

  const handleInfoPointsChange = (amount: number) => {
    setInfoPoints(prev => Math.max(0, prev + amount))
  }

  return (
    <div className="w-full max-w-6xl mx-auto rounded-3xl overflow-hidden border border-border/80 bg-card shadow-[0_20px_50px_rgba(0,0,0,0.05)] text-foreground">
      <div className="grid grid-cols-1 lg:grid-cols-12">
        {/* Left pane: Controls */}
        <div className="lg:col-span-7 p-6 sm:p-10 space-y-8 lg:border-r border-border/50">
          
          {/* Section 1: Property Nature */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="h-6 w-6 rounded-full p-0 flex items-center justify-center border-primary/30 text-primary font-bold text-xs bg-primary/5">1</Badge>
              <h3 className="font-bold text-lg text-slate-800 dark:text-slate-100">Nature du bien à photographier</h3>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
              {propertyTypes.map((type) => {
                const Icon = type.icon
                const isSelected = propertyType === type.id
                return (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => setPropertyType(type.id)}
                    className={`flex flex-col items-center justify-between p-4 rounded-xl border-2 text-center transition-all ${
                      isSelected 
                        ? "border-primary bg-primary/5 shadow-md shadow-primary/5 scale-[1.03]" 
                        : "border-slate-100 hover:border-slate-300 dark:border-slate-800 hover:bg-slate-50/50"
                    }`}
                  >
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${type.color} mb-3 flex items-center justify-center`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs font-bold leading-tight">{type.label}</p>
                      <p className="text-[9px] text-muted-foreground leading-none">{type.sublabel}</p>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Section 2: Surface */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="h-6 w-6 rounded-full p-0 flex items-center justify-center border-primary/30 text-primary font-bold text-xs bg-primary/5">2</Badge>
                <h3 className="font-bold text-lg text-slate-800 dark:text-slate-100">Superficie du local</h3>
              </div>
              <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-3 py-1 rounded-lg">
                <Input 
                  type="number" 
                  value={surface} 
                  onChange={(e) => setSurface(Math.max(1, Number(e.target.value)))}
                  className="w-16 h-8 text-center font-bold text-sm bg-transparent border-none p-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                  min={1}
                />
                <span className="text-xs font-semibold text-muted-foreground">m²</span>
              </div>
            </div>

            <div className="space-y-2">
              <input
                type="range"
                min={10}
                max={1000}
                step={5}
                value={Math.min(surface, 1000)}
                onChange={(e) => setSurface(Number(e.target.value))}
                className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-primary"
              />
              <div className="flex justify-between text-[10px] text-muted-foreground font-semibold px-1">
                <span>10 m²</span>
                <span>250 m²</span>
                <span>500 m²</span>
                <span>750 m²</span>
                <span>1 000 m² +</span>
              </div>
            </div>
            
            {/* Economy of Scale indicator */}
            <div className="p-3 bg-primary/5 rounded-xl border border-primary/10 flex items-start gap-2.5">
              <Info className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
              <div className="text-xs">
                <span className="font-bold text-primary">Tarification optimisée :</span> Nos tarifs s'adaptent automatiquement à l'envergure de votre projet. Vous bénéficiez d'une dégressivité avantageuse sur le coût moyen par m² à mesure que la superficie augmente.
              </div>
            </div>
          </div>

          {/* Section 3: Hotspots / Info Points */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="h-6 w-6 rounded-full p-0 flex items-center justify-center border-primary/30 text-primary font-bold text-xs bg-primary/5">3</Badge>
                <h3 className="font-bold text-lg text-slate-800 dark:text-slate-100">Points d'information interactifs</h3>
              </div>
              <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-2 py-1 rounded-lg">
                <button
                  type="button"
                  onClick={() => handleInfoPointsChange(-1)}
                  disabled={infoPoints <= 0}
                  className="w-8 h-8 rounded-full border border-slate-200/50 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 flex items-center justify-center hover:bg-slate-50 dark:hover:bg-slate-900 disabled:opacity-30 disabled:pointer-events-none transition-colors"
                >
                  <Minus className="h-3.5 w-3.5" />
                </button>
                <Input 
                  type="number"
                  value={infoPoints}
                  onChange={(e) => setInfoPoints(Math.max(0, Number(e.target.value)))}
                  className="w-12 h-8 text-center font-bold text-sm bg-transparent border-none p-0 focus-visible:ring-0 focus-visible:ring-offset-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  min={0}
                />
                <button
                  type="button"
                  onClick={() => handleInfoPointsChange(1)}
                  className="w-8 h-8 rounded-full border border-slate-200/50 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 flex items-center justify-center hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors"
                >
                  <Plus className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
            
            <p className="text-xs text-muted-foreground">
              Tags cliquables intégrés à la visite 360° pour afficher du contenu (texte, images, liens externes, vidéos, fiches produits).
            </p>
          </div>
        </div>

        {/* Right pane: Billing Summary (Glassmorphism design) */}
        <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 via-slate-950 to-primary/80 text-white p-6 sm:p-10 flex flex-col justify-between relative overflow-hidden">
          {/* Background overlay details */}
          <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:20px_20px]" />
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl" />

          <div className="relative z-10 space-y-6">
            <div>
              <h3 className="text-xl font-black tracking-tight mb-1">Résumé de l'estimation</h3>
              <p className="text-xs text-slate-400">Détail des coûts de votre visite 360°</p>
            </div>

            <div className="space-y-4 text-sm border-t border-slate-800 pt-6">
              {/* Setup Fixed Fee */}
              <div className="flex justify-between items-center">
                <span className="text-slate-400 flex items-center gap-1.5">
                  Frais de configuration
                  <HelpCircle className="h-3.5 w-3.5 opacity-50" title="Montage, étalonnage de base et gestion du projet" />
                </span>
                <span className="font-bold">{baseSetupFee.toLocaleString("fr-FR")} DH</span>
              </div>

              {/* Surface Cost (Calculated dynamic) */}
              <div className="flex justify-between items-start">
                <span className="text-slate-400">
                  Coût superficie ({surface} m²)
                  <p className="text-[10px] text-slate-500 italic">Tranches progressives cumulées</p>
                </span>
                <span className="font-bold">{areaCost.toLocaleString("fr-FR")} DH</span>
              </div>

              {/* Multiplier applied */}
              {activeProperty.multiplier !== 1.0 && (
                <div className="flex justify-between items-center text-primary-foreground/90">
                  <span className="text-slate-400 flex items-center gap-1">
                    Complexité ({activeProperty.label})
                  </span>
                  <span className="font-bold bg-primary/20 text-primary border border-primary/20 px-2 py-0.5 rounded text-xs">
                    x {activeProperty.multiplier}
                  </span>
                </div>
              )}

              {/* Hotspots Cost */}
              {infoPointsCost > 0 && (
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">
                    Points d'information ({infoPoints})
                  </span>
                  <span className="font-bold">{infoPointsCost.toLocaleString("fr-FR")} DH</span>
                </div>
              )}

              {/* Average rate indicator */}
              <div className="flex justify-between items-center text-xs text-slate-400 bg-white/5 p-3 rounded-lg border border-white/10 mt-2">
                <span>Coût moyen estimé / m²</span>
                <span className="font-bold text-white">{avgPricePerM2} DH / m²</span>
              </div>
            </div>
          </div>

          <div className="relative z-10 mt-8 space-y-6">
            <div className="border-t border-slate-800 pt-6 flex flex-col gap-1">
              <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">Tarif Estimé Clé en Main</span>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-primary/80">
                  {totalPrice.toLocaleString("fr-FR")}
                </span>
                <span className="text-xl font-bold text-primary">DH</span>
              </div>
              <span className="text-[10px] text-slate-500 italic">*Prix estimatif hors taxes, sujet à ajustement après visite de repérage.</span>
            </div>

            <Button asChild size="lg" className="w-full py-6 text-base font-bold shadow-lg bg-primary hover:bg-primary/90 text-white rounded-xl transition-all hover:scale-[1.02] active:scale-[1.0]">
              <Link 
                href={`/contact?surface=${surface}&typeLocal=${propertyType}&points=${infoPoints}&price=${totalPrice}`}
                onClick={() => {
                  fbq.trackPricingView(propertyType)
                  fbq.trackQuoteRequest(propertyType, totalPrice)
                }}
              >
                Réserver à ce tarif
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
