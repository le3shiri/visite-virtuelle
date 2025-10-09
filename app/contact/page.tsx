import { ContactForm } from "@/components/contact-form"
import { Card, CardContent } from "@/components/ui/card"
import { Mail, Phone, MapPin, Clock, MessageSquare } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export const metadata = {
  title: "Contact & Devis - Demandez votre Visite Virtuelle | Ladrissi Com",
  description:
    "Contactez Ladrissi Com pour obtenir un devis gratuit pour votre visite virtuelle 360°. Réponse sous 24h.",
}

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/modern-factory-warehouse-interior-360.jpg"
            alt="Contactez-nous"
            fill
            className="object-cover opacity-10"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background/95 to-accent/20" />
        </div>

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block px-4 py-2 bg-primary/10 rounded-full text-primary font-semibold text-sm mb-6">
              Contact
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 text-balance">
              Demandez votre <span className="text-primary">devis gratuitement</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 text-pretty">
              Remplissez le formulaire ci-dessous et recevez une proposition personnalisée sous 24 heures
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-accent hover:bg-accent/90">
                <a href="#formulaire">Remplir le formulaire</a>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href="https://wa.me/21269499987" target="_blank" rel="noopener noreferrer">
                  WhatsApp Direct
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="formulaire" className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 max-w-7xl mx-auto">
            {/* Contact Info */}
            <div className="lg:col-span-1 space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-6">Contactez-nous</h2>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Notre équipe est à votre disposition pour répondre à toutes vos questions et vous accompagner dans
                  votre projet.
                </p>
              </div>

              <Card className="border-2">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Phone className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="font-semibold mb-1">Téléphone</div>
                      <a href="tel:+212600000000" className="text-sm text-muted-foreground hover:text-primary">
                        +212 69 49 99 87
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <MessageSquare className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <div className="font-semibold mb-1">WhatsApp</div>
                      <a
                        href="https://wa.me/21269499987"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-muted-foreground hover:text-primary"
                      >
                        +212 69 49 99 87
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Mail className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="font-semibold mb-1">Email</div>
                      <a
                        href="mailto:Ladrissicom@gmail.com"
                        className="text-sm text-muted-foreground hover:text-primary"
                      >
                        Ladrissicom@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <MapPin className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <div className="font-semibold mb-1">Adresse</div>
                      <p className="text-sm text-muted-foreground">Avenue Moulay Smail immeuble farah num 2 tanger</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Clock className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="font-semibold mb-1">Horaires</div>
                      <p className="text-sm text-muted-foreground">Lun - Ven : 9h - 18h</p>
                      <p className="text-sm text-muted-foreground">Sam : 9h - 13h</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 lg:py-24 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">Questions fréquentes</h2>
              <p className="text-muted-foreground">
                Avant de nous contacter, consultez nos réponses aux questions les plus courantes
              </p>
            </div>

            <div className="space-y-4">
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">Combien coûte une visite virtuelle ?</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Nos tarifs commencent à 2 500 DH pour le Pack Découverte (jusqu'à 60m²). Le prix varie selon la
                    surface, le nombre de points de vue et les options choisies. Demandez un devis personnalisé pour
                    obtenir un prix exact.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">Quels sont les délais de réalisation ?</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Comptez 5-7 jours ouvrés après la séance photo pour recevoir votre visite virtuelle complète. Nous
                    pouvons accélérer la livraison sur demande moyennant un supplément.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">Intervenez-vous en dehors de Tanger ?</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Oui, nous intervenons dans toute la région de Tanger-Tétouan-Al Hoceima. Pour les projets plus
                    éloignés, des frais de déplacement peuvent s'appliquer. Contactez-nous pour plus d'informations.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">Comment se déroule la prise de vue ?</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Nous nous déplaçons sur site avec notre équipement professionnel. La séance dure 2-4 heures selon la
                    surface. Nous vous conseillons sur la préparation de l'espace avant notre venue pour un résultat
                    optimal.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
