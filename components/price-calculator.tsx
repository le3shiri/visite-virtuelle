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

// ─────────────────────────────────────────────────────────────────────────────
// FORMULA (from formule prix visite virtuelle.md) — market-adjusted rates
// Prix total = Forfait de base (by type) + Prix surface (bracketed) + Prix info points
//
// Forfait de base:
//   • Appartement / petit local  → 1 500 DH
//   • Villa / Showroom / Bureau  → 2 000 DH
//   • Grand espace / Industriel  → 3 000 DH
//
// Prix surface (cumulative brackets — market-adjusted):
//   •    0 – 100 m² : 25 DH/m²
//   •  101 – 250 m² : 18 DH/m²
//   •  251 – 500 m² : 12 DH/m²
//   •  501 – 1000 m²:  8 DH/m²
//   • 1001+      m² :  4 DH/m²
//
// Prix points d'information : 120 DH / point
// ─────────────────────────────────────────────────────────────────────────────

type PropertyTier = "small" | "medium" | "large"

const propertyTypes = [
  {
    id: "Immobilier",
    label: "Immobilier",
    sublabel: "Appartements, Studios",
    icon: Building2,
    tier: "small" as PropertyTier,
    forfait: 1500,
    color: "from-blue-500/20 to-cyan-500/20 text-blue-600 dark:text-blue-400"
  },
  {
    id: "Commerce",
    label: "Commerce",
    sublabel: "Boutiques, Showrooms",
    icon: ShoppingBag,
    tier: "medium" as PropertyTier,
    forfait: 2000,
    color: "from-emerald-500/20 to-teal-500/20 text-emerald-600 dark:text-emerald-400"
  },
  {
    id: "Hôtellerie",
    label: "Hôtellerie",
    sublabel: "Hôtels, Riads, Restos",
    icon: Hotel,
    tier: "medium" as PropertyTier,
    forfait: 2000,
    color: "from-amber-500/20 to-orange-500/20 text-amber-600 dark:text-amber-400"
  },
  {
    id: "Éducation",
    label: "Éducation & Santé",
    sublabel: "Campus, Écoles, Cliniques",
    icon: GraduationCap,
    tier: "medium" as PropertyTier,
    forfait: 2000,
    color: "from-indigo-500/20 to-purple-500/20 text-indigo-600 dark:text-indigo-400"
  },
  {
    id: "Industrie",
    label: "Industrie",
    sublabel: "Bureaux, Usines, Dépôts",
    icon: Factory,
    tier: "large" as PropertyTier,
    forfait: 3000,
    color: "from-rose-500/20 to-pink-500/20 text-rose-600 dark:text-rose-400"
  }
]

// Cumulative bracketed area cost (market-adjusted rates)
// ≤100 m²       → 25 DH/m²
// 101–250 m²    → 18 DH/m²
// 251–500 m²    → 12 DH/m²
// 501–1000 m²   →  8 DH/m²
// >1000 m²      →  4 DH/m²
const BASE_500  = 100 * 25 + 150 * 18 + 250 * 12  // 8 200 DH at 500 m²
const BASE_1000 = BASE_500 + 500 * 8               // 12 200 DH at 1 000 m²

const getAreaCost = (s: number): number => {
  if (s <= 100)  return s * 25
  if (s <= 250)  return 100 * 25 + (s - 100) * 18
  if (s <= 500)  return 100 * 25 + 150 * 18 + (s - 250) * 12
  if (s <= 1000) return BASE_500 + (s - 500) * 8
  return BASE_1000 + (s - 1000) * 4
}

// Tier label for display
const tierLabel: Record<PropertyTier, string> = {
  small: "Petit local",
  medium: "Moyen / Professionnel",
  large: "Grand espace / Industriel"
}

const infoPointRate = 120 // DH per info point

export function PriceCalculator() {
  const [propertyType, setPropertyType] = useState("Immobilier")
  const [surface, setSurface] = useState(80)
  const [infoPoints, setInfoPoints] = useState(5)
  const [totalPrice, setTotalPrice] = useState(0)
  const [avgPricePerM2, setAvgPricePerM2] = useState(0)

  const activeProperty = propertyTypes.find(t => t.id === propertyType) || propertyTypes[0]
  const forfait = activeProperty.forfait
  const areaCost = getAreaCost(surface)
  const infoPointsCost = infoPoints * infoPointRate

  useEffect(() => {
    // Prix total = Forfait de base + Prix surface + Prix points d'information
    const calculatedTotal = Math.round(forfait + areaCost + infoPointsCost)
    setTotalPrice(calculatedTotal)
    setAvgPricePerM2(Math.round(calculatedTotal / surface))
  }, [surface, propertyType, infoPoints, forfait, areaCost, infoPointsCost])

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
                    {/* Show forfait badge on selected */}
                    {isSelected && (
                      <span className="mt-2 text-[9px] font-bold text-primary bg-primary/10 px-1.5 py-0.5 rounded-full">
                        Forfait {type.forfait.toLocaleString("fr-FR")} DH
                      </span>
                    )}
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

            {/* Pricing bracket indicator */}
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-1.5 text-center text-[9px]">
              {[
                { range: "≤ 100 m²",    rate: "25 DH/m²", active: surface <= 100 },
                { range: "101–250 m²",   rate: "18 DH/m²", active: surface > 100  && surface <= 250 },
                { range: "251–500 m²",   rate: "12 DH/m²", active: surface > 250  && surface <= 500 },
                { range: "501–1000 m²",  rate:  "8 DH/m²", active: surface > 500  && surface <= 1000 },
                { range: "> 1 000 m²",   rate:  "4 DH/m²", active: surface > 1000 },
              ].map((bracket) => (
                <div
                  key={bracket.range}
                  className={`rounded-lg p-2 border transition-all ${
                    bracket.active
                      ? "bg-primary/10 border-primary/30 text-primary font-bold"
                      : "bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-muted-foreground"
                  }`}
                >
                  <p className="font-semibold">{bracket.range}</p>
                  <p className={bracket.active ? "text-primary" : ""}>{bracket.rate}</p>
                </div>
              ))}
            </div>

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
              Tags cliquables intégrés à la visite 360° pour afficher du contenu (texte, images, liens externes, vidéos, fiches produits). <span className="font-semibold text-foreground">120 DH / point.</span>
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

              {/* Base Forfait by type */}
              <div className="flex justify-between items-center">
                <span className="text-slate-400 flex items-center gap-1.5">
                  Forfait de base
                  <HelpCircle className="h-3.5 w-3.5 opacity-50" title={tierLabel[activeProperty.tier]} />
                </span>
                <span className="font-bold">{forfait.toLocaleString("fr-FR")} DH</span>
              </div>

              {/* Tier label */}
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-500 italic">{activeProperty.label}</span>
                <span className="text-slate-400 italic">{tierLabel[activeProperty.tier]}</span>
              </div>

              {/* Surface Cost */}
              <div className="flex justify-between items-start">
                <span className="text-slate-400">
                  Coût superficie ({surface} m²)
                  <p className="text-[10px] text-slate-500 italic">Tranches progressives cumulées</p>
                </span>
                <span className="font-bold">{areaCost.toLocaleString("fr-FR")} DH</span>
              </div>

              {/* Active bracket display */}
              <div className="text-[10px] text-slate-500 bg-white/5 rounded-lg px-3 py-2 border border-white/10 space-y-1">
                <p className="font-semibold text-slate-400 mb-1">Barème appliqué :</p>
                {surface > 0 && (
                  <p>≤ 100 m² → {Math.min(surface, 100)} m² × 25 DH = {(Math.min(surface, 100) * 25).toLocaleString("fr-FR")} DH</p>
                )}
                {surface > 100 && (
                  <p>101–250 m² → {Math.min(surface - 100, 150)} m² × 18 DH = {(Math.min(surface - 100, 150) * 18).toLocaleString("fr-FR")} DH</p>
                )}
                {surface > 250 && (
                  <p>251–500 m² → {Math.min(surface - 250, 250)} m² × 12 DH = {(Math.min(surface - 250, 250) * 12).toLocaleString("fr-FR")} DH</p>
                )}
                {surface > 500 && (
                  <p>501–1 000 m² → {Math.min(surface - 500, 500)} m² × 8 DH = {(Math.min(surface - 500, 500) * 8).toLocaleString("fr-FR")} DH</p>
                )}
                {surface > 1000 && (
                  <p>&gt; 1 000 m² → {surface - 1000} m² × 4 DH = {((surface - 1000) * 4).toLocaleString("fr-FR")} DH</p>
                )}
              </div>

              {/* Info Points Cost */}
              {infoPointsCost > 0 && (
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">
                    Points d'information ({infoPoints} × 120 DH)
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
