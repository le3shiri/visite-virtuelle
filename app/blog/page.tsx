import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import Image from "next/image"
import { Calendar, Clock, ArrowRight, TrendingUp, Lightbulb, BookOpen } from "lucide-react"

export const metadata = {
  title: "Blog & Ressources - Conseils Visites Virtuelles | Ladrissi Com",
  description:
    "Découvrez nos articles sur les visites virtuelles 360°, conseils pour préparer votre espace, études de cas et tendances du marché.",
}

const articles = [
  {
    id: "1",
    title: "5 raisons d'investir dans une visite virtuelle pour votre hôtel",
    excerpt:
      "Découvrez comment les visites virtuelles peuvent transformer votre stratégie marketing hôtelière et augmenter vos réservations directes de 40%.",
    category: "Hôtellerie",
    image: "/placeholder.svg?key=blog1",
    date: "15 Mars 2024",
    readTime: "5 min",
    featured: true,
  },
  {
    id: "2",
    title: "Comment préparer votre espace pour une visite virtuelle réussie",
    excerpt:
      "Un guide complet pour préparer votre local avant la séance photo 360°. Éclairage, rangement, mise en scène : tous nos conseils d'experts.",
    category: "Conseils",
    image: "/placeholder.svg?key=blog2",
    date: "10 Mars 2024",
    readTime: "7 min",
    featured: true,
  },
  {
    id: "3",
    title: "Étude de cas : Comment un showroom a doublé ses ventes grâce à la visite virtuelle",
    excerpt:
      "Retour d'expérience d'un showroom de mobilier à Tanger qui a intégré une visite virtuelle 360° et vu ses conversions exploser.",
    category: "Études de cas",
    image: "/placeholder.svg?key=blog3",
    date: "5 Mars 2024",
    readTime: "6 min",
    featured: true,
  },
  {
    id: "4",
    title: "Les visites virtuelles dans l'immobilier : un outil indispensable en 2024",
    excerpt:
      "Pourquoi les agences immobilières qui n'utilisent pas les visites virtuelles perdent des clients face à la concurrence.",
    category: "Immobilier",
    image: "/placeholder.svg?key=blog4",
    date: "28 Février 2024",
    readTime: "5 min",
    featured: false,
  },
  {
    id: "5",
    title: "Visite virtuelle vs vidéo : quel format choisir pour votre entreprise ?",
    excerpt:
      "Comparaison détaillée des avantages et inconvénients de chaque format pour vous aider à faire le bon choix.",
    category: "Conseils",
    image: "/placeholder.svg?key=blog5",
    date: "20 Février 2024",
    readTime: "8 min",
    featured: false,
  },
  {
    id: "6",
    title: "L'impact des visites virtuelles sur le référencement Google",
    excerpt:
      "Comment les visites virtuelles améliorent votre SEO et augmentent votre visibilité sur Google Maps et Google Search.",
    category: "Marketing Digital",
    image: "/placeholder.svg?key=blog6",
    date: "15 Février 2024",
    readTime: "6 min",
    featured: false,
  },
  {
    id: "7",
    title: "Restaurants : attirez plus de clients avec une visite virtuelle de votre établissement",
    excerpt:
      "Les restaurants qui proposent une visite virtuelle voient leur taux de réservation augmenter de 30%. Découvrez pourquoi.",
    category: "Restauration",
    image: "/placeholder.svg?key=blog7",
    date: "10 Février 2024",
    readTime: "5 min",
    featured: false,
  },
  {
    id: "8",
    title: "Écoles et universités : le pouvoir des visites virtuelles pour le recrutement",
    excerpt:
      "Comment les établissements d'enseignement utilisent les visites virtuelles pour attirer des étudiants du monde entier.",
    category: "Éducation",
    image: "/placeholder.svg?key=blog8",
    date: "5 Février 2024",
    readTime: "7 min",
    featured: false,
  },
  {
    id: "9",
    title: "Les tendances 2024 des visites virtuelles : VR, IA et interactivité",
    excerpt: "Découvrez les innovations technologiques qui transforment l'expérience des visites virtuelles en 2024.",
    category: "Technologie",
    image: "/placeholder.svg?key=blog9",
    date: "1 Février 2024",
    readTime: "6 min",
    featured: false,
  },
]

const resources = [
  {
    title: "Guide complet de la visite virtuelle",
    description: "Tout ce que vous devez savoir sur les visites virtuelles 360°",
    icon: BookOpen,
    link: "#",
  },
  {
    title: "Checklist de préparation",
    description: "Liste complète pour préparer votre espace avant la séance photo",
    icon: Lightbulb,
    link: "#",
  },
  {
    title: "ROI des visites virtuelles",
    description: "Calculez le retour sur investissement de votre visite virtuelle",
    icon: TrendingUp,
    link: "#",
  },
]

export default function BlogPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/360-virtual-tour-demo-video-thumbnail-play-button.jpg"
            alt="Blog et ressources"
            fill
            className="object-cover opacity-10"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background/95 to-accent/20" />
        </div>

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block px-4 py-2 bg-primary/10 rounded-full text-primary font-semibold text-sm mb-6">
              Blog & Ressources
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 text-balance">
              Conseils & <span className="text-primary">Actualités</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 text-pretty">
              Découvrez nos articles, études de cas et ressources pour tirer le meilleur parti des visites virtuelles
              360°
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-accent hover:bg-accent/90">
                <Link href="/contact">Démarrer un Projet</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/tarifs">Voir nos Tarifs</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Articles */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Articles à la une</h2>
            <p className="text-muted-foreground">Nos derniers articles et conseils d'experts</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {articles
              .filter((article) => article.featured)
              .map((article) => (
                <Card
                  key={article.id}
                  className="group border-2 hover:border-primary transition-all hover:shadow-xl overflow-hidden"
                >
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={article.image || "/placeholder.svg"}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <Badge className="absolute top-4 left-4 bg-primary/90 backdrop-blur-sm">{article.category}</Badge>
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>{article.date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{article.readTime}</span>
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-3">{article.excerpt}</p>
                    
                  </CardContent>
                </Card>
              ))}
          </div>
        </div>
      </section>

      {/* All Articles */}
      <section className="py-16 lg:py-24 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Tous les articles</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {articles
              .filter((article) => !article.featured)
              .map((article) => (
                <Card
                  key={article.id}
                  className="group border-2 hover:border-primary transition-all hover:shadow-lg overflow-hidden"
                >
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={article.image || "/placeholder.svg"}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <Badge className="absolute top-4 left-4 bg-primary/90 backdrop-blur-sm">{article.category}</Badge>
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>{article.date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{article.readTime}</span>
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-2">{article.excerpt}</p>
                    <Button variant="ghost" className="group/btn p-0 h-auto text-sm">
                      Lire l'article
                      <ArrowRight className="h-4 w-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
          </div>
        </div>
      </section>

      {/* Resources Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Ressources gratuites</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Téléchargez nos guides et outils pour tirer le meilleur parti de votre visite virtuelle
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
            {resources.map((resource) => (
              <Card key={resource.title} className="border-2 hover:border-primary transition-all hover:shadow-lg">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mx-auto mb-4">
                    <resource.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{resource.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{resource.description}</p>
                  <Button variant="outline" size="sm" className="w-full bg-transparent">
                    Télécharger
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-primary to-accent">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl lg:text-5xl font-bold mb-6 text-primary-foreground text-balance">
              Restez informé des dernières tendances
            </h2>
            <p className="text-lg text-primary-foreground/90 mb-8 text-pretty leading-relaxed">
              Inscrivez-vous à notre newsletter pour recevoir nos conseils, études de cas et actualités sur les visites
              virtuelles
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="Votre email"
                className="flex-1 px-4 py-3 rounded-lg border-2 border-transparent focus:border-primary-foreground focus:outline-none"
              />
              <Button size="lg" variant="secondary" className="px-8">
                S'inscrire
              </Button>
            </div>
            <p className="text-sm text-primary-foreground/70 mt-4">
              Pas de spam. Désinscription possible à tout moment.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5">
            <CardContent className="p-8 lg:p-12">
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-balance">
                  Prêt à créer votre visite virtuelle ?
                </h2>
                <p className="text-lg text-muted-foreground mb-8 text-pretty leading-relaxed">
                  Contactez-nous pour discuter de votre projet et découvrir comment nous pouvons vous aider
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild size="lg">
                    <Link href="/contact">Demander un Devis</Link>
                  </Button>
                  <Button asChild variant="outline" size="lg">
                    <Link href="/portfolio">Voir nos Réalisations</Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
