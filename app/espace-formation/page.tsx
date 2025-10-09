import { FormationApplicationForm } from "@/components/formation-application-form"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Camera, Video, Lightbulb, Users, Award, Clock, Star, CheckCircle } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function EspaceFormationPage() {
  const formations = [
    {
      icon: Camera,
      title: "Photographie de Base",
      description: "Maîtrisez les fondamentaux : exposition, composition, lumière naturelle et artificielle.",
      duration: "4 semaines",
      level: "Débutant",
    },
    {
      icon: Video,
      title: "Photographie 360°",
      description: "Apprenez à créer des visites virtuelles immersives avec notre équipement professionnel.",
      duration: "3 semaines",
      level: "Intermédiaire",
    },
    {
      icon: Lightbulb,
      title: "Éclairage Studio",
      description: "Techniques avancées d'éclairage pour la photographie commerciale et de produits.",
      duration: "2 semaines",
      level: "Intermédiaire",
    },
    {
      icon: Camera,
      title: "Photographie Immobilière",
      description: "Spécialisez-vous dans la photographie d'architecture et d'intérieur pour l'immobilier.",
      duration: "3 semaines",
      level: "Tous niveaux",
    },
    {
      icon: Video,
      title: "Post-Production",
      description: "Retouche photo professionnelle avec Lightroom, Photoshop et logiciels de visite virtuelle.",
      duration: "4 semaines",
      level: "Intermédiaire",
    },
    {
      icon: Award,
      title: "Formation Complète Pro",
      description: "Programme complet pour devenir photographe professionnel spécialisé en visites virtuelles.",
      duration: "12 semaines",
      level: "Tous niveaux",
    },
  ]

  const advantages = [
    {
      icon: Users,
      title: "Formateurs Experts",
      description: "Apprenez auprès de professionnels actifs avec des années d'expérience terrain.",
    },
    {
      icon: Camera,
      title: "Équipement Professionnel",
      description: "Accès à du matériel haut de gamme : caméras 360°, drones, éclairage studio.",
    },
    {
      icon: Award,
      title: "Certification Reconnue",
      description: "Obtenez un certificat valorisant vos compétences auprès des employeurs.",
    },
    {
      icon: Clock,
      title: "Horaires Flexibles",
      description: "Formations en semaine, weekend, et cours du soir pour s'adapter à votre emploi du temps.",
    },
  ]

  const testimonials = [
    {
      name: "Youssef Alami",
      role: "Photographe Immobilier",
      image: "/professional-photographer-portrait.png",
      content:
        "La formation 360° m'a permis de lancer mon activité de visites virtuelles. Les formateurs sont excellents et le matériel est top !",
      rating: 5,
    },
    {
      name: "Fatima Bennis",
      role: "Photographe Freelance",
      image: "/female-photographer-portrait.png",
      content:
        "J'ai suivi la formation complète et je ne regrette rien. Aujourd'hui je travaille avec plusieurs agences immobilières à Tanger.",
      rating: 5,
    },
    {
      name: "Mehdi Tazi",
      role: "Créateur de Contenu",
      image: "/young-photographer-portrait.jpg",
      content:
        "Formation très pratique avec beaucoup de mises en situation réelles. J'ai appris en 3 mois ce qui m'aurait pris des années seul.",
      rating: 5,
    },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/photography-training-studio-equipment.jpg"
            alt="Formation photographie"
            fill
            className="object-cover opacity-10"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background/95 to-accent/20" />
        </div>

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block px-4 py-2 bg-primary/10 rounded-full text-primary font-semibold text-sm mb-6">
              Espace Formation
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 text-balance">
              Devenez Expert en Photographie & Visites Virtuelles
            </h1>
            <p className="text-xl text-muted-foreground mb-8 text-pretty">
              Formations professionnelles dispensées par les experts de Ladrissi Com. Maîtrisez tous les aspects de la
              photographie moderne et des visites virtuelles 360°.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-accent hover:bg-accent/90">
                <a href="#candidature">Postuler maintenant</a>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/contact">Nous contacter</Link>
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-8 mt-16 max-w-2xl mx-auto">
              <div>
                <div className="text-4xl font-bold text-primary mb-2">150+</div>
                <div className="text-sm text-muted-foreground">Étudiants formés</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary mb-2">95%</div>
                <div className="text-sm text-muted-foreground">Taux de satisfaction</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary mb-2">12</div>
                <div className="text-sm text-muted-foreground">Formations disponibles</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Formations Section */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold mb-6">Nos Formations</h2>
            <p className="text-lg text-muted-foreground">
              Des programmes adaptés à tous les niveaux, du débutant au professionnel confirmé.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {formations.map((formation, index) => (
              <Card key={index} className="border-2 hover:border-primary transition-all hover:shadow-lg group">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <formation.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{formation.title}</h3>
                  <p className="text-muted-foreground mb-4">{formation.description}</p>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="px-3 py-1 bg-accent/20 text-accent rounded-full font-medium">
                      {formation.duration}
                    </span>
                    <span className="text-muted-foreground">{formation.level}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Advantages Section */}
      <section className="py-20 lg:py-32 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold mb-6">Pourquoi Nous Choisir ?</h2>
            <p className="text-lg text-muted-foreground">
              Une formation de qualité avec des professionnels reconnus dans le domaine.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {advantages.map((advantage, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <advantage.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">{advantage.title}</h3>
                <p className="text-muted-foreground">{advantage.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 max-w-4xl mx-auto">
            <Card className="border-2">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-6 text-center">Ce que vous allez apprendre</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    "Maîtrise des techniques de prise de vue",
                    "Utilisation d'équipement professionnel",
                    "Post-production et retouche avancée",
                    "Création de visites virtuelles 360°",
                    "Gestion de projets clients",
                    "Marketing et développement commercial",
                    "Techniques d'éclairage studio",
                    "Photographie d'architecture et immobilier",
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{item}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold mb-6">Témoignages d'Anciens Étudiants</h2>
            <p className="text-lg text-muted-foreground">Découvrez les retours de ceux qui ont suivi nos formations.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-2">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <Image
                      src={testimonial.image || "/placeholder.svg"}
                      alt={testimonial.name}
                      width={60}
                      height={60}
                      className="rounded-full"
                    />
                    <div>
                      <h4 className="font-bold">{testimonial.name}</h4>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                  <div className="flex gap-1 mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                    ))}
                  </div>
                  <p className="text-muted-foreground italic">&ldquo;{testimonial.content}&rdquo;</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form Section */}
      <section id="candidature" className="py-20 lg:py-32 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-5xl font-bold mb-6">Postulez Maintenant</h2>
              <p className="text-lg text-muted-foreground">
                Remplissez le formulaire ci-dessous pour rejoindre nos prochaines sessions de formation.
              </p>
            </div>

            <FormationApplicationForm />

            <div className="mt-8 p-6 bg-background rounded-lg border-2">
              <h3 className="font-bold mb-4 flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-primary" />
                Informations pratiques
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Les places sont limitées à 12 participants par session</li>
                <li>• Prochaine session : Début chaque mois</li>
                <li>• Lieu : Centre de formation Ladrissi Com, Tanger</li>
                <li>• Possibilité de financement et facilités de paiement</li>
                <li>• Matériel fourni pendant toute la durée de la formation</li>
                <li>• Certificat délivré en fin de formation</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-32 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-5xl font-bold mb-6">Des Questions ?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Notre équipe est disponible pour répondre à toutes vos questions sur nos formations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary">
              <Link href="/contact">Contactez-nous</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="bg-transparent border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
            >
              <a href="tel:+212612345678">Appelez-nous</a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
