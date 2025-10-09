import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { Eye, Users, TrendingUp, Zap, Building2, Hotel, ShoppingBag, GraduationCap } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden pt-16 lg:pt-20">
        {/* Subtle background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left: Text Content */}
            <div className="space-y-6 lg:space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 my-7">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                <span className="text-sm font-medium text-primary">Technologie immersive 360°</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-balance leading-tight">
                Vos espaces comme vous ne les avez <span className="text-primary">jamais vus</span>
              </h1>

              <p className="text-lg md:text-xl text-muted-foreground text-pretty leading-relaxed">
                Transformez vos espaces en expériences immersives 360°. Séduisez un nombre infini de visiteurs avec nos
                visites virtuelles professionnelles.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="text-base px-8 py-6 shadow-lg hover:shadow-xl transition-shadow">
                  <Link href="/contact">Demandez votre Devis</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="text-base px-8 py-6 bg-transparent">
                  <Link href="/portfolio">Voir nos Réalisations</Link>
                </Button>
              </div>

              {/* Trust indicators */}
              <div className="flex flex-wrap items-center gap-6 pt-4">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    <div className="w-8 h-8 rounded-full bg-primary/20 border-2 border-background" />
                    <div className="w-8 h-8 rounded-full bg-accent/20 border-2 border-background" />
                    <div className="w-8 h-8 rounded-full bg-primary/30 border-2 border-background" />
                  </div>
                  <span className="text-sm text-muted-foreground">+50 clients satisfaits</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-4 h-4 fill-primary" viewBox="0 0 20 20">
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">5.0 étoiles</span>
                </div>
              </div>
            </div>

            {/* Right: Video Demo */}
            <div className="relative">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border-2 border-border shadow-2xl bg-muted">
                <img
                  src="/360-virtual-tour-demo-video-thumbnail-play-button.jpg"
                  alt="Vidéo de démonstration"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/30 transition-colors cursor-pointer group">
                  <div className="w-20 h-20 rounded-full bg-primary/90 flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                    <div className="w-0 h-0 border-t-[12px] border-t-transparent border-l-[20px] border-l-primary-foreground border-b-[12px] border-b-transparent ml-1" />
                  </div>
                </div>
              </div>

              {/* Floating badge */}
              <div className="absolute -bottom-4 -left-4 bg-card border-2 border-border rounded-xl p-4 shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Eye className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">360°</p>
                    <p className="text-xs text-muted-foreground">Vue immersive</p>
                  </div>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-accent/10 rounded-full blur-2xl" />
              <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
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
    </div>
  )
}
