"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CheckCircle, Upload } from "lucide-react"

export function FormationApplicationForm() {
  const [submitted, setSubmitted] = useState(false)
  const [fileName, setFileName] = useState<string>("")

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 5000)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFileName(file.name)
    }
  }

  return (
    <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl p-8 lg:p-12 border border-primary/10">
      {submitted ? (
        <div className="text-center py-12">
          <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-white" />
          </div>
          <h3 className="text-3xl font-bold mb-3">Candidature envoyée !</h3>
          <p className="text-lg text-muted-foreground max-w-md mx-auto">
            Nous avons bien reçu votre candidature. Notre équipe vous contactera sous 48h.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-base font-semibold">
              Nom complet
            </Label>
            <Input id="name" name="name" placeholder="Entrez votre nom complet" required className="h-12 text-base" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-base font-semibold">
              Email
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="votre@email.com"
              required
              className="h-12 text-base"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="text-base font-semibold">
              Téléphone
            </Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              placeholder="+212 6XX XXX XXX"
              required
              className="h-12 text-base"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="resume" className="text-base font-semibold">
              CV / Portfolio
            </Label>
            <div className="relative">
              <label
                htmlFor="resume"
                className="flex items-center justify-center gap-3 h-32 border-2 border-dashed border-primary/30 rounded-lg cursor-pointer hover:border-primary/50 hover:bg-primary/5 transition-all"
              >
                <Upload className="h-8 w-8 text-primary" />
                <div className="text-center">
                  <p className="font-semibold text-foreground">{fileName || "Cliquez pour télécharger votre CV"}</p>
                  <p className="text-sm text-muted-foreground mt-1">PDF, DOC, DOCX (max 5MB)</p>
                </div>
              </label>
              <Input
                id="resume"
                name="resume"
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                required
                className="hidden"
              />
            </div>
          </div>

          <Button type="submit" size="lg" className="w-full h-14 text-lg font-semibold bg-accent hover:bg-accent/90">
            Envoyer ma candidature
          </Button>
        </form>
      )}
    </div>
  )
}
