import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Check, X, Sparkles } from "lucide-react"
import Image from "next/image"
import { TarifsBookingFlow } from "@/components/tarifs-booking-flow"

export const metadata = {
  title: "Simulateur de Tarif - Visites Virtuelles 360° | Ladrissi Com",
  description:
    "Estimez le tarif de votre visite virtuelle 360° en temps réel grâce à notre calculateur intelligent selon votre superficie et vos besoins.",
}

const addons = [
  {
    name: "Photos HDR 360° supplémentaires",
    description: "Photos haute définition avec traitement HDR professionnel additionnelles.",
  },
  {
    name: "Vidéo teaser de présentation",
    description: "Vidéo de montage de 1-2 minutes de votre visite virtuelle pour vos réseaux sociaux.",
  },
  {
    name: "Voix off professionnelle",
    description: "Narration audio en français ou arabe enregistrée en studio par un professionnel.",
  },
  {
    name: "Mise à jour annuelle",
    description: "Actualisation de votre visite virtuelle existante si vos espaces changent.",
  },
  {
    name: "Points d'information interactifs additionnels",
    description: "Ajout de tags interactifs supplémentaires contenant des médias ou liens externes.",
  },
  {
    name: "Intégration Google Street View",
    description: "Publication directe de vos panoramiques 360° sur Google Maps.",
  },
]

export default function TarifsPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/modern-retail-store-showroom-360.jpg"
            alt="Tarifs et offres"
            fill
            className="object-cover opacity-10"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background/95 to-accent/20" />
        </div>

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block px-4 py-2 bg-primary/10 rounded-full text-primary font-semibold text-sm mb-6">
              Tarification Transparente
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 text-balance">
              Obtenez votre tarif<span className="text-primary"> immédiatement</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 text-pretty">
              Définissez votre tarif sur mesure en fonction de votre espace, de sa complexité et de vos besoins en points d'information interactifs.
            </p>
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="py-12 lg:py-16 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-8 lg:mb-12">
            <h2 className="text-3xl font-bold mb-3">Calculateur de Tarif 360°</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Ajustez la superficie et le nombre de points d'information pour obtenir une estimation immédiate.
            </p>
          </div>

          <TarifsBookingFlow />
        </div>
      </section>

      {/* Add-ons Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Options supplémentaires</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Personnalisez votre visite virtuelle avec nos options à la carte
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {addons.map((addon) => (
              <Card key={addon.name} className="border-2 hover:border-primary/50 transition-colors">
                <CardContent className="pt-6">
                  <h3 className="font-semibold text-lg mb-2">{addon.name}</h3>
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
                  Le délai moyen est de 5 à 10 jours ouvrés selon la superficie du local et le nombre de points d'information interactifs. Des livraisons express sont envisageables sur demande.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2">Comment se déroule la prise de vue ?</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Nous nous déplaçons sur site avec notre équipement professionnel. La séance dure généralement 2 à 4 heures selon la superficie du lieu. Nous vous conseillons sur la préparation de l'espace avant notre venue pour un rendu parfait.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2">Puis-je modifier ma visite virtuelle après livraison ?</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Oui, les modifications mineures (comme la mise à jour des liens ou textes dans vos points d'information) sont gratuites pendant 30 jours après livraison. Pour des ajouts de points de vue ou des refontes majeures, un devis de mise à jour à tarif préférentiel sera proposé.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2">Les visites virtuelles fonctionnent-elles sur mobile ?</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Absolument ! Toutes nos visites virtuelles sont 100% responsive et optimisées pour ordinateurs, tablettes et smartphones. Elles fonctionnent également sur les casques VR pour une immersion totale.
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
              Prêt à commencer ?
            </h2>
            <p className="text-lg text-primary-foreground/90 mb-8 text-pretty leading-relaxed">
              Utilisez notre simulateur ci-dessus ou contactez-nous directement pour discuter des détails de votre projet et valider votre date de prise de vue.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="secondary" className="text-lg px-8 py-6">
                <Link href="/contact">Réserver votre visite</Link>
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
    </div>
  )
}
