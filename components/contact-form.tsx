"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CheckCircle2 } from "lucide-react"

export function ContactForm() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsLoading(false)
    setIsSubmitted(true)
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
            Nous avons bien reçu votre message et nous vous répondrons dans les plus brefs délais, généralement sous 24
            heures.
          </p>
          <Button onClick={() => setIsSubmitted(false)} variant="outline">
            Envoyer un autre message
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-2">
      <CardContent className="p-6 lg:p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="nom">Nom complet *</Label>
              <Input id="nom" name="nom" placeholder="Mohammed Alami" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input id="email" name="email" type="email" placeholder="contact@exemple.com" required />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="telephone">Téléphone *</Label>
              <Input id="telephone" name="telephone" type="tel" placeholder="+212 6 00 00 00 00" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="entreprise">Entreprise</Label>
              <Input id="entreprise" name="entreprise" placeholder="Nom de votre entreprise" />
            </div>
          </div>

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
            <Label htmlFor="surface">Surface approximative (m²)</Label>
            <Input id="surface" name="surface" type="number" placeholder="Ex: 150" />
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
            <Label htmlFor="message">Message complémentaire</Label>
            <Textarea
              id="message"
              name="message"
              placeholder="Informations supplémentaires, questions, délais souhaités..."
              rows={4}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="budget">Budget estimé</Label>
            <Select name="budget">
              <SelectTrigger>
                <SelectValue placeholder="Sélectionnez votre budget" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2500-5000">2 500 - 5 000 DH</SelectItem>
                <SelectItem value="5000-10000">5 000 - 10 000 DH</SelectItem>
                <SelectItem value="10000+">Plus de 10 000 DH</SelectItem>
                <SelectItem value="non-defini">Budget non défini</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button type="submit" size="lg" className="w-full" disabled={isLoading}>
            {isLoading ? "Envoi en cours..." : "Envoyer ma demande de devis"}
          </Button>

          <p className="text-sm text-muted-foreground text-center">
            En soumettant ce formulaire, vous acceptez d'être contacté par Ladrissi Com concernant votre projet.
          </p>
        </form>
      </CardContent>
    </Card>
  )
}
