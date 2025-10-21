"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react"
import Link from "next/link"

interface PortfolioItem {
  id: string
  title: string
  category: string
  location: string
  image: string
  description: string
  virtualTourUrl: string
}

interface PortfolioSliderProps {
  items: PortfolioItem[]
}

export function PortfolioSlider({ items }: PortfolioSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % items.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length)
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  if (!items || items.length === 0) {
    return null
  }

  const currentItem = items[currentIndex]

  return (
    <div className="relative max-w-5xl mx-auto">
      <div className="overflow-hidden rounded-xl">
        <Card className="border-2">
          <CardContent className="p-0">
            <div className="grid md:grid-cols-2 gap-0">
              {/* Image/Preview Section */}
              <div className="relative aspect-[4/3] md:aspect-auto bg-muted">
                <iframe
                  src={currentItem.virtualTourUrl}
                  className="w-full h-full min-h-[300px] md:min-h-[350px]"
                  frameBorder="0"
                  allowFullScreen
                  allow="autoplay; fullscreen; web-share; xr-spatial-tracking"
                />
              </div>

              {/* Content Section */}
              <div className="p-4 lg:p-6 flex flex-col justify-between">
                <div>
                  <div className="inline-block px-2.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium mb-3">
                    {currentItem.category}
                  </div>
                  <h3 className="text-xl lg:text-2xl font-bold mb-2">{currentItem.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4 leading-relaxed line-clamp-3">{currentItem.description}</p>
                </div>

                <div className="space-y-3">
                  <Button asChild className="w-full" size="default">
                    <Link href={currentItem.virtualTourUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="mr-2 h-3.5 w-3.5" />
                      Voir la visite complète
                    </Link>
                  </Button>

                  {/* Slide indicators */}
                  <div className="flex items-center justify-center gap-1.5 pt-1">
                    {items.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`h-1.5 rounded-full transition-all ${
                          index === currentIndex ? "w-6 bg-primary" : "w-1.5 bg-muted-foreground/30"
                        }`}
                        aria-label={`Aller au projet ${index + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Navigation Buttons */}
      {items.length > 1 && (
        <>
          <Button
            variant="outline"
            size="icon"
            className="absolute left-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background"
            onClick={prevSlide}
            aria-label="Projet précédent"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background"
            onClick={nextSlide}
            aria-label="Projet suivant"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </>
      )}
    </div>
  )
}
