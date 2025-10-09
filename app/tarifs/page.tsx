import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Check, X, Sparkles } from "lucide-react"

export const metadata = {
  title: "Tarifs & Offres - Visites Virtuelles 360° | Ladrissi Com",
  description:
    "Découvrez nos packs de visites virtuelles adaptés à tous les budgets. Pack Découverte, Professionnel et Sur Mesure.",
}

const pricingPlans = [
  {
    name: "Pack Découverte",
    description: "Idéal pour les petits commerces et espaces compacts",
    price: "À partir de 2 500 DH",
    surface: "Jusqu'à 60m²",
    features: [
      { name: "Visite virtuelle 360° simple", included: true },
      { name: "Jusqu'à 10 points de vue", included: true },
      { name: "Photos HD (10 photos)", included: true },
      { name: "Hébergement 1 an", included: true },
      { name: "Lien de partage", included: true },
      { name: "Intégration site web", included: false },
      { name: "Photos HDR professionnelles", included: false },
      { name: "Storytelling & voix off", included: false },
      { name: "Points d'information interactifs", included: false },
      { name: "Mise à jour incluse", included: false },
    ],
    cta: "Choisir ce pack",
    popular: false,
  },
  {
    name: "Pack Professionnel",
    description: "Le choix idéal pour la plupart des entreprises",
    price: "À partir de 5 500 DH",
    surface: "Jusqu'à 200m²",
    features: [
      { name: "Visite virtuelle 360° avancée", included: true },
      { name: "Jusqu'à 30 points de vue", included: true },
      { name: "Photos HDR professionnelles (30 photos)", included: true },
      { name: "Hébergement 2 ans", included: true },
      { name: "Intégration site web complète", included: true },
      { name: "Code embed personnalisé", included: true },
      { name: "Plan interactif 2D", included: true },
      { name: "Logo et branding", included: true },
      { name: "Points d'information (10 max)", included: true },
      { name: "Support prioritaire", included: true },
    ],
    cta: "Choisir ce pack",
    popular: true,
  },
  {
    name: "Pack Sur Mesure",
    description: "Solution personnalisée pour projets d'envergure",
    price: "Sur devis",
    surface: "Sans limite",
    features: [
      { name: "Visite virtuelle 360° premium", included: true },
      { name: "Points de vue illimités", included: true },
      { name: "Photos HDR professionnelles illimitées", included: true },
      { name: "Hébergement illimité", included: true },
      { name: "Scénarisation personnalisée", included: true },
      { name: "Voix off professionnelle", included: true },
      { name: "Storytelling sur mesure", included: true },
      { name: "Points d'information illimités", included: true },
      { name: "Guidage interactif", included: true },
      { name: "Intégration CRM/PMS", included: true },
      { name: "Mises à jour régulières", included: true },
      { name: "Support dédié 24/7", included: true },
    ],
    cta: "Demander un devis",
    popular: false,
  },
]

const addons = [
  {
    name: "Photos HDR supplémentaires",
    price: "150 DH/photo",
    description: "Photos haute définition avec traitement HDR professionnel",
  },
  {
    name: "Vidéo de présentation",
    price: "À partir de 2 000 DH",
    description: "Vidéo montage de 1-2 minutes de votre visite virtuelle",
  },
  {
    name: "Voix off professionnelle",
    price: "1 500 DH",
    description: "Narration audio en français ou arabe par un professionnel",
  },
  {
    name: "Mise à jour de la visite",
    price: "800 DH",
    description: "Actualisation de votre visite virtuelle existante",
  },
  {
    name: "Points d'information supplémentaires",
    price: "100 DH/point",
    description: "Ajout de tags interactifs avec texte, images ou liens",
  },
  {
    name: "Intégration Google Street View",
    price: "1 200 DH",
    description: "Publication de votre visite sur Google Maps",
  },
]

export default function TarifsPage() {
  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-16 lg:pt-40 lg:pb-24 bg-gradient-to-b from-muted/50 to-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-balance">
              Des <span className="text-primary">tarifs transparents</span> pour tous les budgets
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground text-pretty leading-relaxed">
              Choisissez le pack qui correspond à vos besoins. Tous nos tarifs incluent la création, l'hébergement et le
              support technique.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {pricingPlans.map((plan) => (
              <Card
                key={plan.name}
                className={`relative ${
                  plan.popular ? "border-primary border-2 shadow-xl scale-105 lg:scale-110" : "border-2"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <div className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                      <Sparkles className="h-3 w-3" />
                      Plus populaire
                    </div>
                  </div>
                )}

                <CardHeader className="text-center pb-8 pt-8">
                  <CardTitle className="text-2xl mb-2">{plan.name}</CardTitle>
                  <p className="text-sm text-muted-foreground mb-4">{plan.description}</p>
                  <div className="mb-2">
                    <span className="text-4xl font-bold">{plan.price}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{plan.surface}</p>
                </CardHeader>

                <CardContent>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        {feature.included ? (
                          <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Check className="h-3 w-3 text-primary" />
                          </div>
                        ) : (
                          <div className="w-5 h-5 rounded-full bg-muted flex items-center justify-center flex-shrink-0 mt-0.5">
                            <X className="h-3 w-3 text-muted-foreground" />
                          </div>
                        )}
                        <span className={`text-sm ${feature.included ? "text-foreground" : "text-muted-foreground"}`}>
                          {feature.name}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <Button asChild className="w-full" size="lg" variant={plan.popular ? "default" : "outline"}>
                    <Link href="/contact">{plan.cta}</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-16 lg:py-24 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Comparatif détaillé des packs</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Comparez les fonctionnalités de chaque pack pour faire le meilleur choix
            </p>
          </div>

          <div className="max-w-5xl mx-auto overflow-x-auto">
            <table className="w-full bg-background rounded-xl border-2 border-border">
              <thead>
                <tr className="border-b-2 border-border">
                  <th className="text-left p-4 font-semibold">Fonctionnalité</th>
                  <th className="text-center p-4 font-semibold">Découverte</th>
                  <th className="text-center p-4 font-semibold bg-primary/5">Professionnel</th>
                  <th className="text-center p-4 font-semibold">Sur Mesure</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border">
                  <td className="p-4 text-sm">Surface maximale</td>
                  <td className="text-center p-4 text-sm">60m²</td>
                  <td className="text-center p-4 text-sm bg-primary/5">200m²</td>
                  <td className="text-center p-4 text-sm">Illimité</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="p-4 text-sm">Points de vue</td>
                  <td className="text-center p-4 text-sm">10</td>
                  <td className="text-center p-4 text-sm bg-primary/5">30</td>
                  <td className="text-center p-4 text-sm">Illimité</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="p-4 text-sm">Photos HD/HDR</td>
                  <td className="text-center p-4 text-sm">10 HD</td>
                  <td className="text-center p-4 text-sm bg-primary/5">30 HDR</td>
                  <td className="text-center p-4 text-sm">Illimité HDR</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="p-4 text-sm">Hébergement</td>
                  <td className="text-center p-4 text-sm">1 an</td>
                  <td className="text-center p-4 text-sm bg-primary/5">2 ans</td>
                  <td className="text-center p-4 text-sm">Illimité</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="p-4 text-sm">Intégration web</td>
                  <td className="text-center p-4">
                    <X className="h-4 w-4 text-muted-foreground mx-auto" />
                  </td>
                  <td className="text-center p-4 bg-primary/5">
                    <Check className="h-4 w-4 text-primary mx-auto" />
                  </td>
                  <td className="text-center p-4">
                    <Check className="h-4 w-4 text-primary mx-auto" />
                  </td>
                </tr>
                <tr className="border-b border-border">
                  <td className="p-4 text-sm">Storytelling & voix off</td>
                  <td className="text-center p-4">
                    <X className="h-4 w-4 text-muted-foreground mx-auto" />
                  </td>
                  <td className="text-center p-4 bg-primary/5">
                    <X className="h-4 w-4 text-muted-foreground mx-auto" />
                  </td>
                  <td className="text-center p-4">
                    <Check className="h-4 w-4 text-primary mx-auto" />
                  </td>
                </tr>
                <tr>
                  <td className="p-4 text-sm">Support</td>
                  <td className="text-center p-4 text-sm">Standard</td>
                  <td className="text-center p-4 text-sm bg-primary/5">Prioritaire</td>
                  <td className="text-center p-4 text-sm">Dédié 24/7</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Add-ons Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Options supplémentaires</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Personnalisez votre pack avec nos options à la carte
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {addons.map((addon) => (
              <Card key={addon.name} className="border-2 hover:border-primary/50 transition-colors">
                <CardContent className="pt-6">
                  <h3 className="font-semibold text-lg mb-2">{addon.name}</h3>
                  <p className="text-2xl font-bold text-primary mb-3">{addon.price}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{addon.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 lg:py-24 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Questions fréquentes</h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2">Quels sont les délais de réalisation ?</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Comptez 5-7 jours ouvrés pour le Pack Découverte, 7-10 jours pour le Pack Professionnel, et selon la
                  complexité pour le Pack Sur Mesure. Nous pouvons accélérer la livraison sur demande.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2">Comment se déroule la prise de vue ?</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Nous nous déplaçons sur site avec notre équipement professionnel. La séance dure généralement 2-4
                  heures selon la surface. Nous vous conseillons sur la préparation de l'espace avant notre venue.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2">Puis-je modifier ma visite virtuelle après livraison ?</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Oui, nous proposons des mises à jour à 800 DH par session. Le Pack Sur Mesure inclut des mises à jour
                  régulières. Les modifications mineures (textes, liens) sont gratuites pendant 30 jours.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2">Les visites virtuelles fonctionnent-elles sur mobile ?</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Absolument ! Toutes nos visites virtuelles sont 100% responsive et optimisées pour smartphones et
                  tablettes. Elles fonctionnent également en mode VR avec un casque compatible.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-primary to-accent">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl lg:text-5xl font-bold mb-6 text-primary-foreground text-balance">
              Besoin d'un devis personnalisé ?
            </h2>
            <p className="text-lg text-primary-foreground/90 mb-8 text-pretty leading-relaxed">
              Contactez-nous pour discuter de votre projet et recevoir une offre adaptée à vos besoins spécifiques
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="secondary" className="text-lg px-8 py-6">
                <Link href="/contact">Demander un Devis</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="text-lg px-8 py-6 bg-transparent text-primary-foreground border-primary-foreground hover:bg-primary-foreground/10"
              >
                <Link href="/portfolio">Voir nos Réalisations</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
