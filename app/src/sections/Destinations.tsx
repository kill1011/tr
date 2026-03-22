import { useEffect, useRef, useState } from 'react'
import { MapPin, ArrowRight, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface Destination {
  id: number
  name: string
  country: string
  description: string
  price: string
  rating: number
  image: string
}

const destinations: Destination[] = [
  {
    id: 1,
    name: 'Santorini',
    country: 'Greece',
    description: 'White-washed buildings cascading down volcanic cliffs, overlooking the endless azure of the Aegean Sea.',
    price: 'From $1,299',
    rating: 4.9,
    image: '/images/dest-santorini.jpg'
  },
  {
    id: 2,
    name: 'Kyoto',
    country: 'Japan',
    description: 'Ancient temples, serene gardens, and the ethereal beauty of cherry blossoms in spring.',
    price: 'From $1,599',
    rating: 4.8,
    image: '/images/dest-kyoto.jpg'
  },
  {
    id: 3,
    name: 'Machu Picchu',
    country: 'Peru',
    description: 'The lost city of the Incas, shrouded in mist and mystery, perched high in the Andes.',
    price: 'From $1,899',
    rating: 5.0,
    image: '/images/dest-machu.jpg'
  },
  {
    id: 4,
    name: 'Maldives',
    country: 'Indian Ocean',
    description: 'Paradise found in overwater bungalows, crystal lagoons, and pristine coral reefs.',
    price: 'From $2,299',
    rating: 4.9,
    image: '/images/dest-maldives.jpg'
  },
  {
    id: 5,
    name: 'Swiss Alps',
    country: 'Switzerland',
    description: 'Majestic peaks, pristine lakes, and charming villages in nature\'s grandest amphitheater.',
    price: 'From $1,499',
    rating: 4.8,
    image: '/images/dest-swiss.jpg'
  },
  {
    id: 6,
    name: 'Bali',
    country: 'Indonesia',
    description: 'Temples, terraces, and tropical bliss in the Island of the Gods.',
    price: 'From $999',
    rating: 4.7,
    image: '/images/dest-bali.jpg'
  },
  {
    id: 7,
    name: 'Patagonia',
    country: 'Argentina',
    description: 'Untamed wilderness of glaciers, mountains, and endless horizons at the edge of the world.',
    price: 'From $2,099',
    rating: 4.8,
    image: '/images/dest-patagonia.jpg'
  },
  {
    id: 8,
    name: 'Morocco',
    country: 'North Africa',
    description: 'Vibrant souks, ancient medinas, and the magic of the Sahara under starlit skies.',
    price: 'From $1,199',
    rating: 4.7,
    image: '/images/dest-morocco.jpg'
  },
]

export default function Destinations() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section id="destinations" ref={sectionRef} className="py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span
            className={`inline-block text-sand-dark font-medium tracking-wider text-sm uppercase mb-4 transition-all duration-600 ${
              isVisible ? 'opacity-100 tracking-normal' : 'opacity-0 tracking-[10px]'
            }`}
          >
            Explore
          </span>
          <h2
            className={`font-display text-4xl sm:text-5xl font-bold text-dark mb-6 transition-all duration-800 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '100ms' }}
          >
            Popular Destinations
          </h2>
          <p
            className={`text-dark/60 max-w-2xl mx-auto text-lg transition-all duration-600 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
            style={{ transitionDelay: '200ms' }}
          >
            Discover our most beloved locations, each offering unique experiences 
            and unforgettable memories.
          </p>
        </div>

        {/* Destinations Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 perspective-1000">
          {destinations.map((destination, index) => (
            <div
              key={destination.id}
              className={`group relative bg-white rounded-2xl overflow-hidden shadow-soft hover:shadow-hover transition-all duration-500 preserve-3d hover:-translate-y-4 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
              }`}
              style={{ 
                transitionDelay: `${400 + (index % 4) * 100}ms`,
                transform: isVisible ? `rotateX(${index % 2 === 0 ? -1 : 1}deg)` : undefined
              }}
            >
              {/* Image */}
              <div className="relative h-72 overflow-hidden">
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-dark/20 to-transparent" />

                {/* Rating */}
                <div className="absolute top-4 right-4 flex items-center gap-1 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1">
                  <Star className="w-3 h-3 fill-lime text-lime" />
                  <span className="text-xs font-semibold text-dark">{destination.rating}</span>
                </div>

                {/* Content Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <div className="flex items-center gap-1 text-white/80 text-sm mb-2">
                    <MapPin className="w-4 h-4" />
                    <span>{destination.country}</span>
                  </div>
                  <h3 className="font-display text-2xl font-bold text-white mb-2">
                    {destination.name}
                  </h3>
                  <p className="text-white/70 text-sm line-clamp-2 mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {destination.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sand font-semibold text-sm">{destination.price}</span>
                    <Button
                      size="sm"
                      className="bg-white text-dark hover:bg-sand hover:text-dark rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0"
                    >
                      Explore
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div
          className={`text-center mt-12 transition-all duration-600 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '800ms' }}
        >
          <Button
            variant="outline"
            className="px-8 py-6 border-dark text-dark hover:bg-dark hover:text-white rounded-full group"
          >
            View All Destinations
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  )
}
