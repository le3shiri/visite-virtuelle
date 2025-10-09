import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { PortfolioGallery } from "@/components/portfolio-gallery"
import { Testimonials } from "@/components/testimonials"
import Link from "next/link"
import { MapPin } from "lucide-react"

export const metadata = {
  title: "Portfolio - Nos Réalisations | Ladrissi Com",
  description:
    "Découvrez nos visites virtuelles 360° réalisées à Tanger pour hôtels, restaurants, showrooms et projets immobiliers.",
}

const portfolioItems = [
  {
    id: "1",
    title: "Hôtel Marina Bay",
    category: "Hôtellerie",
    location: "Tanger, Maroc",
    image: "/placeholder.svg?key=hotel1",
    description:
      "Visite virtuelle complète d'un hôtel 5 étoiles avec 120 chambres, restaurant panoramique, spa et piscine. Intégration de points d'information interactifs pour présenter les services.",
    features: [
      "120 chambres photographiées",
      "Restaurant et bar",
      "Spa et piscine",
      "Salles de conférence",
      "Intégration site web",
      "Version mobile optimisée",
    ],
    virtualTourUrl: "#",
  },
  {
    id: "2",
    title: "Résidence Les Jardins",
    category: "Immobilier",
    location: "Tanger, Maroc",
    image: "/placeholder.svg?key=immo1",
    description:
      "Projet immobilier neuf de 45 appartements. Visites virtuelles des appartements témoins et des espaces communs pour faciliter la pré-commercialisation.",
    features: [
      "3 types d'appartements",
      "Espaces communs",
      "Vue panoramique",
      "Plans interactifs",
      "Mesures précises",
      "Mode VR disponible",
    ],
    virtualTourUrl: "#",
  },
  {
    id: "3",
    title: "Showroom Design Plus",
    category: "Commerce",
    location: "Tanger, Maroc",
    image: "/placeholder.svg?key=show1",
    description:
      "Showroom de mobilier haut de gamme sur 500m². Visite virtuelle avec tags produits cliquables et liens directs vers le catalogue en ligne.",
    features: [
      "500m² d'exposition",
      "Tags produits interactifs",
      "Liens e-commerce",
      "Mise à jour mensuelle",
      "Zoom haute définition",
      "Catalogue intégré",
    ],
    virtualTourUrl: "#",
  },
  {
    id: "4",
    title: "Restaurant Le Détroit",
    category: "Restauration",
    location: "Tanger, Maroc",
    image: "/placeholder.svg?key=resto1",
    description:
      "Restaurant gastronomique avec vue sur le détroit. Visite virtuelle mettant en valeur l'ambiance, la décoration et les différents espaces.",
    features: [
      "Salle principale",
      "Terrasse panoramique",
      "Cuisine ouverte",
      "Salon privé",
      "Ambiance sonore",
      "Menu interactif",
    ],
    virtualTourUrl: "#",
  },
  {
    id: "5",
    title: "École Internationale",
    category: "Éducation",
    location: "Tanger, Maroc",
    image: "/placeholder.svg?key=school1",
    description:
      "Campus scolaire moderne avec salles de classe, laboratoires, bibliothèque et installations sportives. Outil de recrutement pour les inscriptions.",
    features: [
      "Salles de classe",
      "Laboratoires scientifiques",
      "Bibliothèque",
      "Installations sportives",
      "Cantine",
      "Espaces extérieurs",
    ],
    virtualTourUrl: "#",
  },
  {
    id: "6",
    title: "Villa Méditerranée",
    category: "Immobilier",
    location: "Tanger, Maroc",
    image: "/placeholder.svg?key=villa1",
    description:
      "Villa de luxe de 400m² avec piscine et jardin. Visite virtuelle haute définition pour location saisonnière haut de gamme.",
    features: ["5 chambres", "Piscine à débordement", "Jardin paysager", "Vue mer", "Garage double", "Photos HDR"],
    virtualTourUrl: "#",
  },
  {
    id: "7",
    title: "Boutique Mode & Style",
    category: "Commerce",
    location: "Tanger, Maroc",
    image: "/placeholder.svg?key=boutique1",
    description:
      "Boutique de prêt-à-porter de 150m². Visite virtuelle permettant de découvrir les collections et l'agencement du magasin.",
    features: [
      "Espace femme",
      "Espace homme",
      "Cabines d'essayage",
      "Vitrine virtuelle",
      "Collections saisonnières",
      "Mise à jour trimestrielle",
    ],
    virtualTourUrl: "#",
  },
  {
    id: "8",
    title: "Riad Dar Tanja",
    category: "Hôtellerie",
    location: "Tanger, Maroc",
    image: "/placeholder.svg?key=riad1",
    description:
      "Riad traditionnel rénové avec 8 suites. Visite virtuelle mettant en valeur l'architecture authentique et le charme marocain.",
    features: [
      "8 suites uniques",
      "Patio central",
      "Terrasse panoramique",
      "Hammam traditionnel",
      "Salon marocain",
      "Narration audio",
    ],
    virtualTourUrl: "#",
  },
  {
    id: "9",
    title: "Centre Médical Atlas",
    category: "Santé",
    location: "Tanger, Maroc",
    image: "/placeholder.svg?key=medical1",
    description:
      "Centre médical moderne avec 15 cabinets spécialisés. Visite virtuelle rassurante pour les nouveaux patients.",
    features: ["Salle d'attente", "15 cabinets", "Laboratoire", "Radiologie", "Pharmacie", "Accès handicapés"],
    virtualTourUrl: "#",
  },
]

export default function PortfolioPage() {
  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-16 lg:pt-40 lg:pb-24 bg-gradient-to-b from-muted/50 to-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-balance">
              Nos <span className="text-primary">réalisations</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground text-pretty leading-relaxed">
              Découvrez nos visites virtuelles 360° réalisées pour nos clients à Tanger et dans toute la région.
            </p>
          </div>
        </div>
      </section>

      {/* Portfolio Gallery */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <PortfolioGallery items={portfolioItems} />
        </div>
      </section>

      {/* Interactive Map Section */}
      <section className="py-16 lg:py-24 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Nos projets à Tanger</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Nous avons réalisé des visites virtuelles dans toute la région de Tanger
            </p>
          </div>

          <div className="relative aspect-video max-w-4xl mx-auto rounded-2xl overflow-hidden border-2 border-border shadow-xl">
            <img src="/placeholder.svg?key=map1" alt="Carte des projets" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            <div className="absolute bottom-8 left-8 right-8 text-white">
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="h-5 w-5" />
                <span className="font-semibold">Tanger et région</span>
              </div>
              <p className="text-sm text-white/90">Plus de 50 projets réalisés dans la région</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Ce que disent nos clients</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Découvrez les retours d'expérience de nos clients satisfaits
            </p>
          </div>

          <Testimonials />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-primary to-accent">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl lg:text-5xl font-bold mb-6 text-primary-foreground text-balance">
              Votre projet sera le prochain ?
            </h2>
            <p className="text-lg text-primary-foreground/90 mb-8 text-pretty leading-relaxed">
              Rejoignez nos clients satisfaits et donnez une nouvelle dimension à vos espaces
            </p>
            <Button asChild size="lg" variant="secondary" className="text-lg px-8 py-6">
              <Link href="/contact">Demander un Devis Gratuit</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
