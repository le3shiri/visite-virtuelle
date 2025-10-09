"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { X, MapPin, ExternalLink } from "lucide-react"

interface PortfolioItem {
  id: string
  title: string
  category: string
  location: string
  image: string
  description: string
  features: string[]
  virtualTourUrl?: string
}

interface PortfolioGalleryProps {
  items: PortfolioItem[]
}

export function PortfolioGallery({ items }: PortfolioGalleryProps) {
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null)
  const [filter, setFilter] = useState<string>("all")

  const categories = ["all", ...Array.from(new Set(items.map((item) => item.category)))]

  const filteredItems = filter === "all" ? items : items.filter((item) => item.category === filter)

  return (
    <>
      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-2 justify-center mb-12">
        {categories.map((category) => (
          <Button
            key={category}
            variant={filter === category ? "default" : "outline"}
            onClick={() => setFilter(category)}
            className="capitalize"
          >
            {category === "all" ? "Tous" : category}
          </Button>
        ))}
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {filteredItems.map((item) => (
          <Card
            key={item.id}
            className="group cursor-pointer border-2 hover:border-primary transition-all hover:shadow-xl overflow-hidden"
            onClick={() => setSelectedItem(item)}
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              <img
                src={item.image || "/placeholder.svg"}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <Badge className="absolute top-4 left-4 bg-primary/90 backdrop-blur-sm">{item.category}</Badge>
              <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
                <div className="flex items-center gap-1 text-sm">
                  <MapPin className="h-3 w-3" />
                  <span>{item.location}</span>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Modal */}
      {selectedItem && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelectedItem(null)}
        >
          <div
            className="bg-background rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              <img
                src={selectedItem.image || "/placeholder.svg"}
                alt={selectedItem.title}
                className="w-full aspect-video object-cover rounded-t-2xl"
              />
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-background/90 backdrop-blur-sm flex items-center justify-center hover:bg-background transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
              <Badge className="absolute top-4 left-4 bg-primary/90 backdrop-blur-sm">{selectedItem.category}</Badge>
            </div>

            <div className="p-6 lg:p-8">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <h2 className="text-2xl lg:text-3xl font-bold mb-2">{selectedItem.title}</h2>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>{selectedItem.location}</span>
                  </div>
                </div>
              </div>

              <p className="text-muted-foreground mb-6 leading-relaxed">{selectedItem.description}</p>

              <div className="mb-6">
                <h3 className="font-semibold mb-3">Caractéristiques</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedItem.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {selectedItem.virtualTourUrl && (
                <Button asChild className="w-full sm:w-auto">
                  <a
                    href={selectedItem.virtualTourUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Voir la visite virtuelle
                  </a>
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
