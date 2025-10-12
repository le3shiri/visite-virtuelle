import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import Image from "next/image"
import { Hotel, Building2, ShoppingBag, GraduationCap, Stethoscope, Factory } from "lucide-react"

export const metadata = {
  title: "Secteurs d'Activité - Visites Virtuelles 360° | Ladrissi Com",
  description:
    "Visites virtuelles pour tous les secteurs : hôtellerie, immobilier, commerce, éducation, santé et industrie à Tanger.",
}

const sectors = [
  {
    id: "hotellerie",
    title: "Hôtellerie & Restauration",
    icon: Hotel,
    description: "Séduisez vos futurs clients en leur offrant une visite immersive de vos établissements",
    services: ["Hôtels & Resorts", "Riads & Maisons d'hôtes", "Restaurants & Cafés", "Bars & Lounges"],
    benefits: [
      "Augmentez vos réservations directes",
      "Réduisez les annulations",
      "Démarquez-vous sur les plateformes de réservation",
      "Valorisez vos espaces et services",
    ],
    image: "/luxury-hotel-lobby-360-view.jpg",
    color: "from-blue-500/20 to-cyan-500/20",
  },
  {
    id: "immobilier",
    title: "Immobilier",
    icon: Building2,
    description: "Vendez et louez plus rapidement avec des visites virtuelles qui donnent confiance",
    services: [
      "Appartements & Villas",
      "Bureaux & Espaces commerciaux",
      "Projets immobiliers neufs",
      "Locations saisonnières",
    ],
    benefits: [
      "Attirez des acheteurs qualifiés",
      "Économisez du temps sur les visites",
      "Vendez à distance",
      "Présentez des projets en construction",
    ],
    image: "/modern-apartment-interior-360.jpg",
    color: "from-cyan-500/20 to-blue-500/20",
  },
  {
    id: "commerce",
    title: "Commerce & Retail",
    icon: ShoppingBag,
    description: "Attirez plus de clients en magasin et augmentez vos ventes en ligne",
    services: ["Magasins & Boutiques", "Showrooms", "Supermarchés & Grandes surfaces", "Centres commerciaux"],
    benefits: [
      "Augmentez le trafic en magasin",
      "Présentez vos produits en contexte",
      "Créez une expérience shopping unique",
      "Intégrez à votre site e-commerce",
    ],
    image: "/modern-retail-store-showroom-360.jpg",
    color: "from-blue-500/20 to-cyan-500/20",
  },
  {
    id: "education",
    title: "Éducation",
    icon: GraduationCap,
    description: "Attirez plus d'étudiants en leur permettant de découvrir vos installations",
    services: ["Écoles privées", "Universités & Campus", "Centres de formation", "Bibliothèques"],
    benefits: [
      "Facilitez les inscriptions à distance",
      "Rassurez les parents",
      "Valorisez vos infrastructures",
      "Organisez des portes ouvertes virtuelles",
    ],
    image: "/modern-university-campus-classroom-360.jpg",
    color: "from-cyan-500/20 to-blue-500/20",
  },
  {
    id: "sante",
    title: "Santé & Bien-être",
    icon: Stethoscope,
    description: "Rassurez vos patients en leur montrant vos installations modernes et accueillantes",
    services: ["Cabinets médicaux", "Cliniques & Hôpitaux", "Centres dentaires", "Spas & Centres de bien-être"],
    benefits: [
      "Rassurez les nouveaux patients",
      "Montrez votre professionnalisme",
      "Réduisez l'anxiété pré-visite",
      "Différenciez-vous de la concurrence",
    ],
    image: "/modern-medical-clinic-reception-360.jpg",
    color: "from-blue-500/20 to-cyan-500/20",
  },
  {
    id: "industrie",
    title: "Industrie & Logistique",
    icon: Factory,
    description: "Présentez vos capacités de production et vos infrastructures à vos partenaires",
    services: ["Usines & Sites de production", "Entrepôts & Centres logistiques", "Laboratoires", "Ateliers"],
    benefits: [
      "Rassurez vos clients B2B",
      "Facilitez les audits à distance",
      "Valorisez vos équipements",
      "Attirez des investisseurs",
    ],
    image: "/modern-factory-warehouse-interior-360.jpg",
    color: "from-cyan-500/20 to-blue-500/20",
  },
]

export default function SecteursPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/modern-360-virtual-tour-hotel-lobby-immersive.jpg"
            alt="Secteurs d'activité"
            fill
            className="object-cover opacity-10"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background/95 to-accent/20" />
        </div>

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block px-4 py-2 bg-primary/10 rounded-full text-primary font-semibold text-sm mb-6">
              Nos Secteurs
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 text-balance">
              Des solutions pour tous les <span className="text-primary">secteurs d'activité</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 text-pretty">
              Que vous soyez dans l'hôtellerie, l'immobilier, le commerce ou l'éducation, nos visites virtuelles 360°
              sont adaptées à vos besoins spécifiques.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-accent hover:bg-accent/90">
                <Link href="/contact">Demander un Devis</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/tarifs">Voir nos Tarifs</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Sectors Grid */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="space-y-24">
            {sectors.map((sector, index) => (
              <div
                key={sector.id}
                id={sector.id}
                className={`scroll-mt-24 ${
                  index % 2 === 0 ? "" : "lg:flex-row-reverse"
                } flex flex-col lg:flex-row gap-8 lg:gap-12 items-center`}
              >
                {/* Image */}
                <div className="w-full lg:w-1/2">
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border-2 border-border shadow-xl">
                    <img
                      src={sector.image || "/placeholder.svg"}
                      alt={sector.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 left-4 w-16 h-16 rounded-xl bg-background/90 backdrop-blur-sm flex items-center justify-center">
                      <sector.icon className="h-8 w-8 text-primary" />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="w-full lg:w-1/2">
                  <h2 className="text-3xl lg:text-4xl font-bold mb-4">{sector.title}</h2>
                  <p className="text-lg text-muted-foreground mb-6 leading-relaxed">{sector.description}</p>

                  {/* Services */}
                  <div className="mb-6">
                    <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
                      Nos services pour ce secteur
                    </h3>
                    <div className="grid grid-cols-2 gap-2">
                      {sector.services.map((service) => (
                        <div key={service} className="flex items-center gap-2 text-sm">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                          <span>{service}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Benefits */}
                  <div className="mb-8">
                    <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
                      Avantages
                    </h3>
                    <div className="space-y-2">
                      {sector.benefits.map((benefit) => (
                        <div key={benefit} className="flex items-start gap-2 text-sm">
                          <div className="w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <div className="w-2 h-2 rounded-full bg-accent" />
                          </div>
                          <span>{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button asChild size="lg">
                      <Link href="/contact">Demander un Devis</Link>
                    </Button>
                    {/* <Button asChild size="lg" variant="outline">
                      <Link href="/portfolio">Voir des Exemples</Link>
                    </Button> */}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="py-16 lg:py-24 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Navigation rapide</h2>
            <p className="text-muted-foreground">Accédez directement au secteur qui vous intéresse</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {sectors.map((sector) => (
              <a key={sector.id} href={`#${sector.id}`} className="group">
                <Card className="h-full border-2 hover:border-primary transition-all hover:shadow-lg">
                  <CardContent className="p-4 flex flex-col items-center text-center gap-3">
                    <div
                      className={`w-12 h-12 rounded-lg bg-gradient-to-br ${sector.color} flex items-center justify-center`}
                    >
                      <sector.icon className="h-6 w-6 text-primary" />
                    </div>
                    <span className="text-sm font-medium group-hover:text-primary transition-colors">
                      {sector.title}
                    </span>
                  </CardContent>
                </Card>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5">
            <CardContent className="p-8 lg:p-12">
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-balance">Votre secteur n'est pas listé ?</h2>
                <p className="text-lg text-muted-foreground mb-8 text-pretty leading-relaxed">
                  Nous créons des visites virtuelles sur mesure pour tous types d'espaces professionnels. Contactez-nous
                  pour discuter de votre projet spécifique.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild size="lg">
                    <Link href="/contact">Contactez-nous</Link>
                  </Button>
                  <Button asChild variant="outline" size="lg">
                    <Link href="/tarifs">Voir nos Tarifs</Link>
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
