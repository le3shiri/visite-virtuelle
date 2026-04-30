"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { CheckCircle2, ArrowRight, ArrowLeft, Sparkles, Send, CalendarIcon } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { format, addDays, startOfDay } from "date-fns"
import { fr } from "date-fns/locale"
import { cn } from "@/lib/utils"

export function ContactForm() {
  const [step, setStep] = useState<1 | 2>(1)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [date, setDate] = useState<Date>()
  const [time, setTime] = useState<string | null>(null)

  const timeSlots = [
    "09:00", "10:00", "11:00", "14:00", "15:00", "16:00", "17:00"
  ]

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    const formData = new FormData(e.currentTarget)
    const data = {
      nom: formData.get("nom"),
      email: formData.get("email"),
      telephone: formData.get("telephone"),
      entreprise: formData.get("entreprise") || 'Non spécifiée',
      typeLocal: formData.get("typeLocal"),
      dateTournage: date ? format(date, "yyyy-MM-dd", { locale: fr }) : null,
      heureTournage: time,
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
        
        // WhatsApp redirection
        const whatsappNumber = "212651344038"
        const whatsappMessage = `Nouvelle demande de réservation :
👤 Nom: ${data.nom}
📧 Email: ${data.email}
📞 Tél: ${data.telephone}
🏢 Entreprise: ${data.entreprise}
🏠 Type de local: ${data.typeLocal}
📅 Date: ${data.dateTournage}
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
          <h3 className="text-2xl font-bold mb-4">Merci pour votre demande !</h3>
          <p className="text-muted-foreground mb-6 leading-relaxed">
            Nous avons bien reçu votre demande de réservation. 
            Notre équipe vous contactera dans les 24 heures pour finaliser votre projet.
          </p>
          <Button
            onClick={() => {
              setIsSubmitted(false)
              setStep(1)
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
      <div className="mb-12">
        <div className="inline-block px-4 py-2 bg-primary/10 rounded-full text-primary font-bold text-[10px] uppercase tracking-[0.2em] mb-4">
          Étape {step} sur 2
        </div>
        <h3 className="text-3xl font-black text-slate-900 mb-2 tracking-tight">
          {step === 1 ? "Vos informations" : "Choisir la date & heure"}
        </h3>
        <p className="text-slate-500 font-medium">
          {step === 1 
            ? "Remplissez les détails pour votre projet de visite virtuelle." 
            : "Sélectionnez le créneau qui vous convient le mieux."}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* STEP 1: Personal Information */}
        <div className={cn("space-y-8", step !== 1 && "hidden")}>
          <Card className="border-slate-100 shadow-[0_20px_50px_rgba(0,0,0,0.03)] overflow-hidden">
            <CardContent className="p-8 lg:p-12 space-y-12">
              <div>
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-primary" />
                  </div>
                  <h4 className="font-black text-xl text-slate-900 tracking-tight">Informations personnelles</h4>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="nom" className="text-[11px] font-black uppercase tracking-wider text-slate-400">Nom complet *</Label>
                    <Input id="nom" name="nom" placeholder="Mohammed Alami" className="h-12 border-slate-200 focus:border-primary transition-colors" required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-[11px] font-black uppercase tracking-wider text-slate-400">Email *</Label>
                    <Input id="email" name="email" type="email" placeholder="contact@exemple.com" className="h-12 border-slate-200 focus:border-primary transition-colors" required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="telephone" className="text-[11px] font-black uppercase tracking-wider text-slate-400">Téléphone *</Label>
                    <Input id="telephone" name="telephone" type="tel" placeholder="+212 6 00 00 00 00" className="h-12 border-slate-200 focus:border-primary transition-colors" required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="entreprise" className="text-[11px] font-black uppercase tracking-wider text-slate-400">Entreprise (Optionnel)</Label>
                    <Input id="entreprise" name="entreprise" placeholder="Nom de votre entreprise" className="h-12 border-slate-200 focus:border-primary transition-colors" />
                  </div>
                </div>

                <div className="space-y-2 mt-6">
                  <Label htmlFor="typeLocal" className="text-[11px] font-black uppercase tracking-wider text-slate-400">Type de local *</Label>
                  <select 
                    id="typeLocal" 
                    name="typeLocal" 
                    className="flex h-12 w-full rounded-md border border-slate-200 bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 focus:border-primary transition-colors"
                    required
                  >
                    <option value="">Sélectionnez le type de local</option>
                    <option value="Immobilier">Immobilier (Appartement, Villa)</option>
                    <option value="Showroom">Showroom / Boutique</option>
                    <option value="Hôtellerie">Hôtellerie / Restauration</option>
                    <option value="Industrie">Industrie / Entreprise</option>
                    <option value="Éducation">Éducation / Santé</option>
                    <option value="Autre">Autre</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2 pt-12 border-t border-slate-100">
                <Label htmlFor="message" className="text-[11px] font-black uppercase tracking-wider text-slate-400">Message complémentaire</Label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Informations supplémentaires, questions, besoins spécifiques..."
                  rows={4}
                  className="border-slate-200 focus:border-primary"
                />
              </div>

              <div className="flex justify-end pt-8 border-t border-slate-100">
                <Button
                  type="button"
                  onClick={(e) => {
                    const form = e.currentTarget.closest('form');
                    if (form) {
                      // Check only inputs in Step 1
                      const step1Inputs = form.querySelectorAll('input[required], select[required]');
                      let isValid = true;
                      step1Inputs.forEach((input) => {
                        if (!(input as HTMLInputElement).checkValidity()) {
                          (input as HTMLInputElement).reportValidity();
                          isValid = false;
                        }
                      });
                      if (isValid) setStep(2);
                    }
                  }}
                  className="w-full sm:w-auto px-12 py-7 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl shadow-xl shadow-slate-200 transition-all hover:-translate-y-1 active:translate-y-0"
                >
                  Choisir la date & heure
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* STEP 2: Calendar */}
        <div className={cn("mt-8 animate-in fade-in slide-in-from-bottom-8 duration-700", step !== 2 && "hidden")}>
          <div className="max-w-5xl mx-auto">
            <div className="bg-white rounded-[2rem] overflow-hidden border border-slate-200 shadow-xl p-8 lg:p-12">
              <div className="flex flex-col lg:flex-row gap-12">
                {/* Left: Calendar */}
                <div className="flex-1">
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold text-slate-900 mb-1">Choisir une date</h3>
                    <p className="text-sm text-slate-500">Sélectionnez le jour de votre tournage</p>
                  </div>
                  <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 flex justify-center">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      className="rounded-md border shadow-sm bg-white"
                      initialFocus
                      disabled={(date) => date < startOfDay(new Date())}
                      locale={fr}
                    />
                  </div>
                </div>

                {/* Right: Time Slots */}
                <div className="flex-1 space-y-8">
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-1">Choisir l'heure</h3>
                    <p className="text-sm text-slate-500">Horaires disponibles pour la date choisie</p>
                  </div>

                  {!date ? (
                    <div className="h-48 flex flex-col items-center justify-center text-center p-8 bg-slate-50 rounded-2xl border border-dashed border-slate-200 text-slate-400">
                      <CalendarIcon className="w-10 h-10 mb-2 opacity-20" />
                      <p className="text-sm font-medium">Veuillez d'abord sélectionner une date</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 animate-in fade-in duration-500">
                      {timeSlots.map((slot) => (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => setTime(slot)}
                          className={cn(
                            "py-3 rounded-xl text-sm font-bold transition-all border-2",
                            time === slot
                              ? "bg-primary border-primary text-white shadow-lg shadow-primary/20 scale-105"
                              : "bg-white border-slate-100 text-slate-600 hover:border-primary/50 hover:bg-primary/5"
                          )}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  )}

                  <div className={cn(
                    "p-6 rounded-2xl border transition-all duration-500",
                    date && time 
                      ? "bg-slate-900 border-slate-900 text-white shadow-xl shadow-slate-900/20" 
                      : "bg-slate-50 border-slate-100 text-slate-300"
                  )}>
                    <p className="text-[10px] font-bold uppercase tracking-widest mb-3 opacity-60">Récapitulatif du rendez-vous</p>
                    {date && time ? (
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <p className="text-lg font-bold capitalize">
                            {format(date, "EEEE d MMMM", { locale: fr })}
                          </p>
                          <p className="text-primary font-bold">{time}</p>
                        </div>
                        <CheckCircle2 className="w-8 h-8 text-primary" />
                      </div>
                    ) : (
                      <p className="text-sm font-medium italic">Sélectionnez une date et une heure pour confirmer</p>
                    )}
                  </div>

                  <div className="flex flex-col gap-3">
                    <Button
                      type="submit"
                      className="w-full py-7 bg-primary hover:bg-primary/90 text-white font-black text-lg rounded-xl shadow-xl shadow-primary/20 transition-all disabled:opacity-50"
                      disabled={!date || !time || isLoading}
                    >
                      {isLoading ? (
                        <div className="animate-spin rounded-full h-6 w-6 border-3 border-white border-t-transparent" />
                      ) : (
                        <>
                          <Send className="w-5 h-5 mr-3" />
                          Finaliser ma réservation
                        </>
                      )}
                    </Button>
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="w-full py-2 text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-slate-900 transition-colors flex items-center justify-center gap-2"
                    >
                      <ArrowLeft className="w-3 h-3" />
                      Retour aux informations
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

