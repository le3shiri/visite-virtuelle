"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CheckCircle2, Check, ArrowRight, ArrowLeft, Sparkles, Send } from "lucide-react"

type PackType = "decouverte" | "professionnel" | "sur-mesure" | null

const packs = [
  {
    id: "decouverte" as const,
    name: "Pack Découverte",
    price: "3 000 DH",
    surface: "Jusqu'à 35m²",
    description: "Idéal pour les petits commerces",
    features: ["Visite 360° simple", "10 points de vue", "10 photos HD", "Hébergement 1 an"],
  },
  {
    id: "professionnel" as const,
    name: "Pack Professionnel",
    price: "5 500 DH",
    surface: "Jusqu'à 85m²",
    description: "Le choix idéal pour la plupart des entreprises",
    features: ["Visite 360° avancée", "30 points de vue", "30 photos HDR", "Intégration web", "Support prioritaire"],
    popular: true,
  },
  {
    id: "sur-mesure" as const,
    name: "Pack Sur Mesure",
    price: "Sur devis",
    surface: "Sans limite",
    description: "Solution personnalisée",
    features: ["Tout illimité", "Scénarisation", "Voix off", "Storytelling", "Support 24/7"],
  },
]

export function ContactForm() {
  const [step, setStep] = useState<1 | 2>(1)
  const [selectedPack, setSelectedPack] = useState<PackType>(null)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handlePackSelect = (packId: PackType) => {
    setSelectedPack(packId)
    setStep(2)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    const formData = new FormData(e.currentTarget)
    const data = {
      selectedPack,
      nom: formData.get("nom"),
      email: formData.get("email"),
      telephone: formData.get("telephone"),
      entreprise: formData.get("entreprise"),
      adresse: formData.get("adresse"),
      dateTournage: formData.get("date-tournage"),
      secteur: formData.get("secteur"),
      typeEspace: formData.get("type-espace"),
      surface: formData.get("surface"),
      objectifs: formData.get("objectifs"),
      options: formData.get("options"),
      delai: formData.get("delai"),
      message: formData.get("message"),
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
          <h3 className="text-2xl font-bold mb-4">Merci pour votre demande !</h3>
          <p className="text-muted-foreground mb-6 leading-relaxed">
            Nous avons bien reçu votre demande de devis pour le{" "}
            <span className="font-semibold text-foreground">{packs.find((p) => p.id === selectedPack)?.name}</span>.
            Notre équipe vous contactera dans les 24 heures pour finaliser votre projet.
          </p>
          <Button
            onClick={() => {
              setIsSubmitted(false)
              setStep(1)
              setSelectedPack(null)
            }}
            variant="outline"
          >
            Faire une nouvelle demande
          </Button>
        </CardContent>
      </Card>
    )
  }

  // Step 1: Pack Selection
  if (step === 1) {
    return (
      <div className="space-y-8">
        <div className="text-center">
          <div className="inline-block px-4 py-2 bg-primary/10 rounded-full text-primary font-semibold text-sm mb-4">
            Étape 1 sur 2
          </div>
          <h3 className="text-2xl lg:text-3xl font-bold mb-3">Choisissez votre pack</h3>
          <p className="text-muted-foreground">Sélectionnez le pack qui correspond le mieux à vos besoins</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {packs.map((pack) => (
            <Card
              key={pack.id}
              className={`relative cursor-pointer transition-all hover:shadow-lg hover:scale-105 ${
                pack.popular ? "border-primary border-2" : "border-2"
              }`}
              onClick={() => handlePackSelect(pack.id)}
            >
              {pack.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <div className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                    <Sparkles className="h-3 w-3" />
                    Populaire
                  </div>
                </div>
              )}

              <CardContent className="p-6">
                <h4 className="font-bold text-xl mb-2">{pack.name}</h4>
                <p className="text-2xl font-bold text-primary mb-1">{pack.price}</p>
                <p className="text-sm text-muted-foreground mb-4">{pack.surface}</p>
                <p className="text-sm mb-4">{pack.description}</p>

                <ul className="space-y-2 mb-6">
                  {pack.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <Check className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button className="w-full" variant={pack.popular ? "default" : "outline"}>
                  Choisir ce pack
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  // Step 2: Form based on selected pack
  const isCustomPack = selectedPack === "sur-mesure"
  const selectedPackInfo = packs.find((p) => p.id === selectedPack)

  return (
    <Card className="border-2">
      <CardContent className="p-6 lg:p-8">
        <div className="mb-6">
          <div className="inline-block px-4 py-2 bg-primary/10 rounded-full text-primary font-semibold text-sm mb-4">
            Étape 2 sur 2
          </div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-2xl font-bold mb-1">Vos informations</h3>
              <p className="text-sm text-muted-foreground">
                Pack sélectionné : <span className="font-semibold text-foreground">{selectedPackInfo?.name}</span>
              </p>
            </div>
            <Button variant="ghost" size="sm" onClick={() => setStep(1)}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Changer de pack
            </Button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information - Always shown */}
          <div className="space-y-6">
            <div>
              <h4 className="font-semibold mb-4 text-lg">Informations personnelles</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="nom">Nom complet *</Label>
                  <Input id="nom" name="nom" placeholder="Mohammed Alami" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input id="email" name="email" type="email" placeholder="contact@exemple.com" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="telephone">Téléphone *</Label>
                  <Input id="telephone" name="telephone" type="tel" placeholder="+212 6 00 00 00 00" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="entreprise">Entreprise *</Label>
                  <Input id="entreprise" name="entreprise" placeholder="Nom de votre entreprise" required />
                </div>
              </div>

              <div className="space-y-2 mt-6">
                <Label htmlFor="adresse">Adresse du lieu à photographier *</Label>
                <Input id="adresse" name="adresse" placeholder="Adresse complète" required />
              </div>

              <div className="space-y-2 mt-6">
                <Label htmlFor="date-tournage">Date de tournage souhaitée *</Label>
                <Input id="date-tournage" name="date-tournage" type="date" required />
              </div>
            </div>
          </div>

          {/* Additional Details - Only for Custom Pack */}
          {isCustomPack && (
            <div className="space-y-6 pt-6 border-t-2">
              <div>
                <h4 className="font-semibold mb-4 text-lg">Détails du projet</h4>

                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="secteur">Secteur d'activité *</Label>
                    <Select name="secteur" required>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionnez votre secteur" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hotellerie">Hôtellerie & Restauration</SelectItem>
                        <SelectItem value="immobilier">Immobilier</SelectItem>
                        <SelectItem value="commerce">Commerce & Retail</SelectItem>
                        <SelectItem value="education">Éducation</SelectItem>
                        <SelectItem value="sante">Santé & Bien-être</SelectItem>
                        <SelectItem value="industrie">Industrie & Logistique</SelectItem>
                        <SelectItem value="autre">Autre</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="type-espace">Type d'espace *</Label>
                    <Select name="type-espace" required>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionnez le type d'espace" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hotel">Hôtel / Riad / Maison d'hôtes</SelectItem>
                        <SelectItem value="restaurant">Restaurant / Café</SelectItem>
                        <SelectItem value="appartement">Appartement / Villa</SelectItem>
                        <SelectItem value="bureau">Bureau / Espace commercial</SelectItem>
                        <SelectItem value="magasin">Magasin / Boutique / Showroom</SelectItem>
                        <SelectItem value="ecole">École / Université / Campus</SelectItem>
                        <SelectItem value="medical">Cabinet médical / Clinique</SelectItem>
                        <SelectItem value="usine">Usine / Entrepôt / Laboratoire</SelectItem>
                        <SelectItem value="autre">Autre</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="surface">Surface approximative (m²) *</Label>
                    <Input id="surface" name="surface" type="number" placeholder="Ex: 250" required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="objectifs">Objectifs de votre projet *</Label>
                    <Textarea
                      id="objectifs"
                      name="objectifs"
                      placeholder="Décrivez vos objectifs : augmenter les réservations, vendre plus rapidement, attirer des clients, etc."
                      rows={4}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="options">Options spéciales souhaitées</Label>
                    <Textarea
                      id="options"
                      name="options"
                      placeholder="Voix off, storytelling, intégrations spécifiques, etc."
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="delai">Délai souhaité</Label>
                    <Select name="delai">
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionnez un délai" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="urgent">Urgent (moins de 7 jours)</SelectItem>
                        <SelectItem value="normal">Normal (7-14 jours)</SelectItem>
                        <SelectItem value="flexible">Flexible (plus de 14 jours)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Message field for standard packs */}
          {!isCustomPack && (
            <div className="space-y-2">
              <Label htmlFor="message">Message complémentaire</Label>
              <Textarea
                id="message"
                name="message"
                placeholder="Informations supplémentaires, questions, besoins spécifiques..."
                rows={4}
              />
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-3 pt-6 justify-center items-center">
            <Button
              type="button"
              variant="outline"
              onClick={() => setStep(1)}
              className="w-full sm:w-auto px-6 border-2 hover:bg-muted"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour
            </Button>
            <Button
              type="submit"
              className="w-full sm:w-auto px-6 bg-gradient-to-r from-primary via-primary to-accent hover:from-primary/90 hover:via-primary/90 hover:to-accent/90 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2" />
                  Envoi en cours...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Envoyer ma demande
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </div>

          <p className="text-sm text-muted-foreground text-center">
            En soumettant ce formulaire, vous acceptez d'être contacté par Ladrissi Com concernant votre projet.
          </p>
        </form>
      </CardContent>
    </Card>
  )
}
