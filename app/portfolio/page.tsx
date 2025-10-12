
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { PortfolioGallery } from "@/components/portfolio-gallery"
import { Testimonials } from "@/components/testimonials"
import Link from "next/link"
import { MapPin } from 'lucide-react'

export const metadata = {
  title: "Portfolio - Nos Réalisations | Ladrissi Com",
  description:
    "Découvrez nos visites virtuelles 360° réalisées à Tanger pour hôtels, restaurants, showrooms et projets immobiliers.",
}

const portfolioItems = [
  {
    id: "1",
    title: "Visite Virtuelle Matterport",
    category: "Immobilier",
    location: "Tanger, Maroc",
    image: "/placeholder.svg?key=matterport1",
    description:
      "Découvrez cette visite virtuelle immersive créée avec la technologie Matterport. Explorez chaque détail en 3D.",
    features: [
      "Visite 3D immersive",
      "Navigation intuitive",
      "Haute définition",
      "Compatible VR",
      "Mesures précises",
      "Mode plan 3D",
    ],
    embedCode: '<iframe width="100%" height="600px" src="https://my.matterport.com/show/?m=oyaicKWaEQw&play=1&tour=3&ts=3&hl=0&pin=0&back=1" frameborder="0" allowfullscreen allow="autoplay; fullscreen; web-share; xr-spatial-tracking;" style="height: 600px; min-height: 600px;"></iframe>',
    virtualTourUrl: "https://my.matterport.com/show/?m=oyaicKWaEQw&play=1&tour=3&ts=3&hl=0&pin=0&back=1",
  },
]

export default function PortfolioPage() {
  return (
    <div className="min-h-screen">
      <Navigation />

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

      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <PortfolioGallery items={portfolioItems} />
        </div>
      </section>

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


// import { Navigation } from "@/components/navigation"
// import { Footer } from "@/components/footer"

// export default function PortfolioPage() {
//   return (
//     <div className="min-h-screen">
//       <Navigation />
//       <div className="pt-32 pb-16 container mx-auto px-4">
//         <h1 className="text-4xl font-bold text-center">Page en construction</h1>
//         <p className="text-center text-muted-foreground mt-4">Cette page sera bientôt disponible.</p>
//       </div>
//       <Footer />
//     </div>
//   )
// }
