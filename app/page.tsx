import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { Eye, Users, TrendingUp, Zap, Building2, Hotel, ShoppingBag, GraduationCap } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-16 lg:pt-20">
        {/* Background Image/Video Placeholder */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-accent/20 to-background" />
          <img
            src="/modern-360-virtual-tour-hotel-lobby-immersive.jpg"
            alt="Visite virtuelle immersive"
            className="w-full h-full object-cover opacity-40"
          />
        </div>

        {/* Hero Content */}
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-6 text-balance leading-tight">
              Vos espaces comme vous ne les avez <span className="text-primary">jamais vus</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 text-pretty max-w-2xl mx-auto leading-relaxed">
              Transformez vos espaces en expériences immersives 360°. Séduisez un nombre infini de visiteurs avec nos
              visites virtuelles professionnelles.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button asChild size="lg" className="text-lg px-8 py-6">
                <Link href="/contact">Demandez votre Devis</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-lg px-8 py-6 bg-transparent">
                <Link href="/portfolio">Voir nos Réalisations</Link>
              </Button>
            </div>

            {/* Video Demo CTA */}
            <div className="mt-12">
              <p className="text-sm text-muted-foreground mb-4">Découvrez nos visites virtuelles en action</p>
              <div className="relative aspect-video max-w-3xl mx-auto rounded-xl overflow-hidden border-2 border-border shadow-2xl">
                <img
                  src="/360-virtual-tour-demo-video-thumbnail-play-button.jpg"
                  alt="Vidéo de démonstration"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/30 transition-colors cursor-pointer">
                  <div className="w-20 h-20 rounded-full bg-primary/90 flex items-center justify-center">
                    <div className="w-0 h-0 border-t-[12px] border-t-transparent border-l-[20px] border-l-primary-foreground border-b-[12px] border-b-transparent ml-1" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 lg:py-24 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold mb-4 text-balance">
              Pourquoi choisir les visites virtuelles ?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
              Dépassez les limites de la présence physique et touchez un public illimité
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            <Card className="border-2 hover:border-primary/50 transition-colors">
              <CardContent className="pt-6">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Visiteurs Illimités</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Présence physique = dizaines de clients par jour. Visite virtuelle = nombre infini de visiteurs 24/7
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary/50 transition-colors">
              <CardContent className="pt-6">
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                  <Eye className="h-6 w-6 text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Expérience Immersive</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Permettez à vos clients de découvrir vos espaces comme s'ils y étaient, depuis n'importe où
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary/50 transition-colors">
              <CardContent className="pt-6">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <TrendingUp className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Augmentez vos Ventes</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Les visites virtuelles augmentent la confiance et accélèrent les décisions d'achat
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary/50 transition-colors">
              <CardContent className="pt-6">
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                  <Zap className="h-6 w-6 text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Démarquez-vous</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Modernisez votre image et surpassez vos concurrents avec une technologie innovante
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Sectors Preview */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold mb-4 text-balance">Tous les secteurs d'activité</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
              Des solutions adaptées à chaque type d'espace professionnel
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link href="/secteurs#hotellerie" className="group">
              <Card className="h-full border-2 hover:border-primary transition-all hover:shadow-lg">
                <CardContent className="p-6">
                  <div className="aspect-square rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-4">
                    <Hotel className="h-12 w-12 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                    Hôtellerie & Restauration
                  </h3>
                  <p className="text-sm text-muted-foreground">Hôtels, riads, restaurants, cafés, maisons d'hôtes</p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/secteurs#immobilier" className="group">
              <Card className="h-full border-2 hover:border-primary transition-all hover:shadow-lg">
                <CardContent className="p-6">
                  <div className="aspect-square rounded-lg bg-gradient-to-br from-accent/20 to-primary/20 flex items-center justify-center mb-4">
                    <Building2 className="h-12 w-12 text-accent" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">Immobilier</h3>
                  <p className="text-sm text-muted-foreground">Appartements, villas, bureaux, projets immobiliers</p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/secteurs#commerce" className="group">
              <Card className="h-full border-2 hover:border-primary transition-all hover:shadow-lg">
                <CardContent className="p-6">
                  <div className="aspect-square rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-4">
                    <ShoppingBag className="h-12 w-12 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                    Commerce & Retail
                  </h3>
                  <p className="text-sm text-muted-foreground">Magasins, showrooms, boutiques, grandes surfaces</p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/secteurs#education" className="group">
              <Card className="h-full border-2 hover:border-primary transition-all hover:shadow-lg">
                <CardContent className="p-6">
                  <div className="aspect-square rounded-lg bg-gradient-to-br from-accent/20 to-primary/20 flex items-center justify-center mb-4">
                    <GraduationCap className="h-12 w-12 text-accent" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                    Éducation & Santé
                  </h3>
                  <p className="text-sm text-muted-foreground">Écoles, universités, campus, cabinets médicaux</p>
                </CardContent>
              </Card>
            </Link>
          </div>

          <div className="text-center mt-8">
            <Button asChild size="lg" variant="outline">
              <Link href="/secteurs">Voir tous les secteurs →</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-primary to-accent">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl lg:text-5xl font-bold mb-6 text-primary-foreground text-balance">
              Prêt à transformer votre espace ?
            </h2>
            <p className="text-lg text-primary-foreground/90 mb-8 text-pretty leading-relaxed">
              Obtenez un devis personnalisé gratuit et découvrez comment nos visites virtuelles peuvent booster votre
              activité
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="secondary" className="text-lg px-8 py-6">
                <Link href="/contact">Demander un Devis Gratuit</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="text-lg px-8 py-6 bg-transparent text-primary-foreground border-primary-foreground hover:bg-primary-foreground/10"
              >
                <Link href="/tarifs">Voir nos Tarifs</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
