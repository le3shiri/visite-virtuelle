import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { Target, Lightbulb, Award, Users, MapPin, Camera, Zap, Heart } from "lucide-react"

export const metadata = {
  title: "À Propos - Notre Histoire & Expertise | Ladrissi Com",
  description:
    "Découvrez Ladrissi Com, spécialiste des visites virtuelles 360° à Tanger. Notre expertise, notre vision et notre engagement pour moderniser l'image des entreprises locales.",
}

const values = [
  {
    icon: Lightbulb,
    title: "Innovation",
    description:
      "Nous adoptons les dernières technologies pour offrir des expériences immersives de pointe à nos clients.",
  },
  {
    icon: Award,
    title: "Excellence",
    description:
      "Chaque projet est traité avec le plus grand soin pour garantir un résultat professionnel et impactant.",
  },
  {
    icon: Users,
    title: "Accessibilité",
    description:
      "Nous rendons la technologie des visites virtuelles accessible à toutes les entreprises, quelle que soit leur taille.",
  },
  {
    icon: Heart,
    title: "Engagement local",
    description: "Nous sommes fiers de contribuer au développement économique de Tanger et de sa région.",
  },
]

const stats = [
  { number: "50+", label: "Projets réalisés" },
  { number: "40+", label: "Clients satisfaits" },
  { number: "5 ans", label: "D'expérience" },
  { number: "100%", label: "Satisfaction client" },
]

const team = [
  {
    name: "Younes Ladrissi",
    role: "Fondateur & Photographe 360°",
    description:
      "Passionné de photographie et de technologie, Younes a fondé Ladrissi Com pour apporter l'innovation des visites virtuelles à Tanger.",
    image: "/placeholder.svg?key=team1",
  },
  {
    name: "abdelkader Ladrissi",
    role: "Responsable Développement Web",
    description:
      "Expert en intégration web, Abdelkader assure que chaque visite virtuelle s'intègre parfaitement aux sites de nos clients.",
    image: "/placeholder.svg?key=team2",
  },
  {
    name: "Anas ........",
    role: "Chef de Projet",
    description:
      "Anas coordonne tous nos projets pour garantir des livraisons dans les délais et conformes aux attentes de nos clients.",
    image: "/placeholder.svg?key=team3",
  },
]

export default function AProposPage() {
  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-16 lg:pt-40 lg:pb-24 bg-gradient-to-b from-muted/50 to-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-balance">
              Nous modernisons l'image des <span className="text-primary">entreprises de Tanger</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground text-pretty leading-relaxed">
              Ladrissi Com est né d'une passion pour la technologie et d'une vision : rendre les espaces professionnels
              accessibles au monde entier grâce aux visites virtuelles 360°.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold mb-6">Notre histoire</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Fondée en 2019 à Tanger, Ladrissi Com est née de la rencontre entre la passion pour la photographie et
                  l'innovation technologique. Notre fondateur, Mohammed Ladrissi, a identifié un besoin crucial :
                  permettre aux entreprises locales de se démarquer dans un monde de plus en plus digital.
                </p>
                <p>
                  Nous avons commencé avec quelques projets pour des hôtels et restaurants de la région. Rapidement,
                  notre expertise et notre approche professionnelle nous ont permis de nous développer et de servir tous
                  les secteurs d'activité : immobilier, commerce, éducation, santé et industrie.
                </p>
                <p>
                  Aujourd'hui, nous sommes fiers d'avoir accompagné plus de 40 clients dans leur transformation
                  digitale, avec des visites virtuelles qui génèrent des résultats concrets : plus de visibilité, plus
                  de confiance, et plus de conversions.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden border-2 border-border shadow-xl">
                <img src="/placeholder.svg?key=story1" alt="Notre équipe" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center">
                <Camera className="h-16 w-16 text-primary-foreground" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-primary to-accent">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-4xl lg:text-5xl font-bold text-primary-foreground mb-2">{stat.number}</div>
                <div className="text-sm lg:text-base text-primary-foreground/90">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <Target className="h-8 w-8 text-primary" />
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">Notre vision</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Nous croyons que chaque entreprise, quelle que soit sa taille, mérite de présenter ses espaces de
                manière professionnelle et innovante. Notre vision est de démocratiser l'accès aux visites virtuelles
                360° et de faire de Tanger une référence en matière de digitalisation des espaces professionnels.
              </p>
            </div>

            <Card className="border-2 bg-gradient-to-br from-muted/50 to-background">
              <CardContent className="p-8 lg:p-12">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Notre lien avec Tanger</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Tanger est une ville en pleine transformation, un carrefour entre l'Europe et l'Afrique, un hub
                      économique en croissance. Nous sommes fiers d'être basés ici et de contribuer à son rayonnement
                      international en aidant les entreprises locales à se présenter au monde entier.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <Zap className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Notre engagement</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Nous nous engageons à fournir un service de qualité supérieure, à respecter nos délais, et à
                      accompagner nos clients dans leur réussite. Chaque projet est une opportunité de créer quelque
                      chose d'exceptionnel et de durable.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 lg:py-24 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Nos valeurs</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Les principes qui guident notre travail au quotidien
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 max-w-6xl mx-auto">
            {values.map((value) => (
              <Card key={value.title} className="border-2 hover:border-primary/50 transition-colors">
                <CardContent className="pt-6 text-center">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mx-auto mb-4">
                    <value.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Notre équipe</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Des professionnels passionnés au service de votre projet
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {team.map((member) => (
              <Card key={member.name} className="border-2 hover:border-primary/50 transition-colors">
                <CardContent className="pt-6">
                  <div className="aspect-square rounded-xl overflow-hidden mb-4 bg-gradient-to-br from-primary/20 to-accent/20">
                    <img
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-lg font-semibold mb-1">{member.name}</h3>
                  <p className="text-sm text-primary mb-3">{member.role}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{member.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-primary to-accent">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl lg:text-5xl font-bold mb-6 text-primary-foreground text-balance">
              Prêt à travailler avec nous ?
            </h2>
            <p className="text-lg text-primary-foreground/90 mb-8 text-pretty leading-relaxed">
              Rejoignez les dizaines d'entreprises qui nous font confiance pour moderniser leur image et attirer plus de
              clients
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="secondary" className="text-lg px-8 py-6">
                <Link href="/contact">Démarrer un Projet</Link>
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
