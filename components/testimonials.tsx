import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"

interface Testimonial {
  name: string
  role: string
  company: string
  content: string
  rating: number
  image?: string
}

const testimonials: Testimonial[] = [
  {
    name: "Ahmed Bennani",
    role: "Directeur",
    company: "Hôtel Marina Bay",
    content:
      "Grâce à Ladrissi Com, nos réservations directes ont augmenté de 40%. Les clients apprécient pouvoir visiter nos chambres avant de réserver.",
    rating: 5,
  },
  {
    name: "Fatima Alaoui",
    role: "Promoteur Immobilier",
    company: "Tanger Immobilier",
    content:
      "Les visites virtuelles nous ont permis de vendre des appartements à des clients internationaux sans qu'ils aient besoin de se déplacer. Un vrai gain de temps !",
    rating: 5,
  },
  {
    name: "Karim Tazi",
    role: "Propriétaire",
    company: "Showroom Design Plus",
    content:
      "Notre showroom est maintenant accessible 24/7 à nos clients. C'est un outil marketing incroyable qui nous démarque de la concurrence.",
    rating: 5,
  },
]

export function Testimonials() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
      {testimonials.map((testimonial, index) => (
        <Card key={index} className="border-2">
          <CardContent className="pt-6">
            <div className="flex gap-1 mb-4">
              {Array.from({ length: testimonial.rating }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-primary text-primary" />
              ))}
            </div>
            <p className="text-sm leading-relaxed mb-6 text-muted-foreground">"{testimonial.content}"</p>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center font-semibold text-primary">
                {testimonial.name.charAt(0)}
              </div>
              <div>
                <div className="font-semibold text-sm">{testimonial.name}</div>
                <div className="text-xs text-muted-foreground">
                  {testimonial.role}, {testimonial.company}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
