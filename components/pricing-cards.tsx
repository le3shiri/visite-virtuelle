"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Check, X, Sparkles } from "lucide-react"

interface Feature {
  name: string
  included: boolean
}

interface PricingPlan {
  name: string
  description: string
  price: string
  surface: string
  features: Feature[]
  cta: string
  popular: boolean
}

interface PricingCardsProps {
  plans: PricingPlan[]
}

export function PricingCards({ plans }: PricingCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
      {plans.map((plan) => (
        <Card
          key={plan.name}
          className={`relative ${
            plan.popular ? "border-primary border-2 shadow-lg" : "border-2"
          }`}
        >
          {plan.popular && (
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <div className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                <Sparkles className="h-3 w-3" />
                Plus populaire
              </div>
            </div>
          )}

          <CardHeader className="text-center pb-4 pt-6">
            <CardTitle className="text-xl mb-2">{plan.name}</CardTitle>
            <p className="text-xs text-muted-foreground mb-3">{plan.description}</p>
            <div className="mb-1">
              <span className="text-2xl lg:text-3xl font-bold">{plan.price}</span>
            </div>
            <p className="text-xs text-muted-foreground">{plan.surface}</p>
          </CardHeader>

          <CardContent>
            <ul className="space-y-2 mb-6">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex items-start gap-2">
                  {feature.included ? (
                    <div className="w-4 h-4 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="h-2.5 w-2.5 text-primary" />
                    </div>
                  ) : (
                    <div className="w-4 h-4 rounded-full bg-red-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <X className="h-2.5 w-2.5 text-white" />
                    </div>
                  )}
                  <span className={`text-xs ${feature.included ? "text-foreground" : "text-muted-foreground"}`}>
                    {feature.name}
                  </span>
                </li>
              ))}
            </ul>

            <Button asChild className="w-full" size="default" variant={plan.popular ? "default" : "outline"}>
              <Link href="/contact">{plan.cta}</Link>
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
