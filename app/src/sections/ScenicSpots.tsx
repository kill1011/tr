import { useEffect, useRef, useState } from 'react'
import { MapPin, Search, Filter, Star, Compass, Mountain, Palmtree, Building2 } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogDescription,
} from '@/components/ui/dialog'

interface ScenicSpot {
  id: number
  name: string
  location: string
  category: string
  rating: number
  reviews: number
  description: string
  culturalFeatures: string[]
  bestTime: string
  image: string
  price: string
}

const scenicSpots: ScenicSpot[] = [
  {
    id: 1,
    name: 'Ancient Temple Valley',
    location: 'Kyoto, Japan',
    category: 'Cultural Heritage',
    rating: 4.9,
    reviews: 2847,
    description: 'A serene valley home to over 1,000 ancient Buddhist temples and Shinto shrines, offering a glimpse into Japan\'s spiritual heritage.',
    culturalFeatures: ['Buddhist Architecture', 'Zen Gardens', 'Traditional Ceremonies', 'Historic Artifacts'],
    bestTime: 'March - May (Cherry Blossom)',
    image: '/images/dest-kyoto.jpg',
    price: 'Free - ¥500'
  },
  {
    id: 2,
    name: 'Santorini Caldera',
    location: 'Santorini, Greece',
    category: 'Natural Wonder',
    rating: 4.8,
    reviews: 3421,
    description: 'Dramatic volcanic cliffs with iconic white-washed buildings and blue domes overlooking the crystal-clear Aegean Sea.',
    culturalFeatures: ['Cycladic Architecture', 'Wine Heritage', 'Sunset Traditions', 'Volcanic History'],
    bestTime: 'April - October',
    image: '/images/dest-santorini.jpg',
    price: 'Free'
  },
  {
    id: 3,
    name: 'Machu Picchu Citadel',
    location: 'Cusco Region, Peru',
    category: 'Archaeological Site',
    rating: 5.0,
    reviews: 5102,
    description: 'The legendary Incan citadel perched high in the Andes Mountains, shrouded in mist and mystery.',
    culturalFeatures: ['Incan Engineering', 'Astrrological Alignments', 'Sacred Geometry', 'Ancient Terraces'],
    bestTime: 'May - September',
    image: '/images/dest-machu.jpg',
    price: '$45 - $70'
  },
  {
    id: 4,
    name: 'Maldives Atolls',
    location: 'Maldives',
    category: 'Marine Paradise',
    rating: 4.9,
    reviews: 2156,
    description: 'Pristine coral atolls with crystal-clear lagoons, vibrant marine life, and luxurious overwater accommodations.',
    culturalFeatures: ['Marine Biodiversity', 'Coral Reefs', 'Island Culture', 'Sustainable Tourism'],
    bestTime: 'November - April',
    image: '/images/dest-maldives.jpg',
    price: 'Resort Dependent'
  },
  {
    id: 5,
    name: 'Swiss Alpine Peaks',
    location: 'Interlaken, Switzerland',
    category: 'Mountain Scenery',
    rating: 4.8,
    reviews: 1893,
    description: 'Majestic snow-capped peaks, pristine alpine lakes, and charming villages in nature\'s grandest amphitheater.',
    culturalFeatures: ['Alpine Culture', 'Mountain Railways', 'Cheese Making', 'Winter Sports'],
    bestTime: 'Year-round',
    image: '/images/dest-swiss.jpg',
    price: 'Free - CHF 100'
  },
  {
    id: 6,
    name: 'Bali Rice Terraces',
    location: 'Ubud, Indonesia',
    category: 'Agricultural Heritage',
    rating: 4.7,
    reviews: 2754,
    description: 'Ancient subak irrigation system creating stunning layered rice terraces, a UNESCO World Heritage site.',
    culturalFeatures: ['Subak System', 'Hindu Temples', 'Traditional Farming', 'Balinese Culture'],
    bestTime: 'April - October',
    image: '/images/dest-bali.jpg',
    price: 'Donation Based'
  },
]

const categories = ['All', 'Cultural Heritage', 'Natural Wonder', 'Archaeological Site', 'Marine Paradise', 'Mountain Scenery', 'Agricultural Heritage']

const categoryIcons: Record<string, React.ReactNode> = {
  'Cultural Heritage': <Building2 className="w-4 h-4" />,
  'Natural Wonder': <Star className="w-4 h-4" />,
  'Archaeological Site': <Compass className="w-4 h-4" />,
  'Marine Paradise': <Palmtree className="w-4 h-4" />,
  'Mountain Scenery': <Mountain className="w-4 h-4" />,
  'Agricultural Heritage': <MapPin className="w-4 h-4" />,
}

export default function ScenicSpots() {
  const [isVisible, setIsVisible] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedSpot, setSelectedSpot] = useState<ScenicSpot | null>(null)
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

  const filteredSpots = scenicSpots.filter(spot => {
    const matchesCategory = selectedCategory === 'All' || spot.category === selectedCategory
    const matchesSearch = spot.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         spot.location.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <section id="scenic-spots" ref={sectionRef} className="py-24 lg:py-32 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <span
            className={`inline-block text-sand-dark font-medium tracking-wider text-sm uppercase mb-4 transition-all duration-600 ${
              isVisible ? 'opacity-100 tracking-normal' : 'opacity-0 tracking-[10px]'
            }`}
          >
            Tourism Resource Database
          </span>
          <h2
            className={`font-display text-4xl sm:text-5xl font-bold text-dark mb-6 transition-all duration-800 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '100ms' }}
          >
            Discover Scenic Spots
          </h2>
          <p
            className={`text-dark/60 max-w-2xl mx-auto text-lg transition-all duration-600 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
            style={{ transitionDelay: '200ms' }}
          >
            Explore our comprehensive database of local attractions, featuring detailed information 
            about locations, cultural features, and visitor insights.
          </p>
        </div>

        {/* Search and Filter */}
        <div
          className={`flex flex-col md:flex-row gap-4 mb-10 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '300ms' }}
        >
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-dark/40" />
            <Input
              type="text"
              placeholder="Search destinations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 py-6 rounded-full border-gray-200 focus:border-sand focus:ring-sand/20"
            />
          </div>

          {/* Category Filters */}
          <div className="flex items-center gap-2 flex-wrap">
            <Filter className="w-5 h-5 text-dark/40 mr-2" />
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className={`rounded-full text-xs ${
                  selectedCategory === category
                    ? 'bg-sand text-dark hover:bg-sand-dark'
                    : 'border-gray-200 text-dark/70 hover:border-sand hover:text-sand-dark'
                }`}
              >
                {category !== 'All' && categoryIcons[category]}
                <span className="ml-1">{category}</span>
              </Button>
            ))}
          </div>
        </div>

        {/* Scenic Spots Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSpots.map((spot, index) => (
            <div
              key={spot.id}
              onClick={() => setSelectedSpot(spot)}
              className={`group bg-white rounded-2xl overflow-hidden shadow-soft hover:shadow-hover transition-all duration-500 cursor-pointer hover:-translate-y-2 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
              style={{ transitionDelay: `${400 + index * 100}ms` }}
            >
              {/* Image */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={spot.image}
                  alt={spot.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark/60 via-transparent to-transparent" />
                
                {/* Category Badge */}
                <Badge className="absolute top-4 left-4 bg-white/90 text-dark backdrop-blur-sm">
                  {categoryIcons[spot.category]}
                  <span className="ml-1">{spot.category}</span>
                </Badge>

                {/* Rating */}
                <div className="absolute bottom-4 right-4 flex items-center gap-1 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
                  <Star className="w-4 h-4 fill-lime text-lime" />
                  <span className="text-sm font-semibold text-dark">{spot.rating}</span>
                  <span className="text-xs text-dark/50">({spot.reviews})</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-display text-xl font-bold text-dark group-hover:text-sand-dark transition-colors">
                    {spot.name}
                  </h3>
                </div>

                <div className="flex items-center gap-2 text-dark/60 mb-3">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">{spot.location}</span>
                </div>

                <p className="text-dark/60 text-sm line-clamp-2 mb-4">
                  {spot.description}
                </p>

                {/* Cultural Features Preview */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {spot.culturalFeatures.slice(0, 2).map((feature) => (
                    <span
                      key={feature}
                      className="text-xs px-3 py-1 bg-sand/10 text-sand-dark rounded-full"
                    >
                      {feature}
                    </span>
                  ))}
                  {spot.culturalFeatures.length > 2 && (
                    <span className="text-xs px-3 py-1 bg-gray-100 text-dark/50 rounded-full">
                      +{spot.culturalFeatures.length - 2}
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <span className="text-sm text-dark/50">{spot.price}</span>
                  <Button variant="ghost" size="sm" className="text-sand-dark hover:text-dark hover:bg-sand/10">
                    View Details
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredSpots.length === 0 && (
          <div className="text-center py-16">
            <Compass className="w-16 h-16 text-dark/20 mx-auto mb-4" />
            <h3 className="font-display text-xl text-dark mb-2">No destinations found</h3>
            <p className="text-dark/60">Try adjusting your search or filters</p>
          </div>
        )}
      </div>

      {/* Detail Dialog */}
      <Dialog open={!!selectedSpot} onOpenChange={() => setSelectedSpot(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          {selectedSpot && (
            <>
              <div className="relative h-64 -mx-6 -mt-6 mb-6 overflow-hidden rounded-t-lg">
                <img
                  src={selectedSpot.image}
                  alt={selectedSpot.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark/60 to-transparent" />
                <div className="absolute bottom-4 left-6 right-6">
                  <Badge className="bg-white/90 text-dark mb-2">
                    {selectedSpot.category}
                  </Badge>
                  <h2 className="font-display text-3xl font-bold text-white">
                    {selectedSpot.name}
                  </h2>
                </div>
              </div>

              <DialogHeader>
                <DialogDescription className="text-left">
                  <div className="flex items-center gap-2 text-dark/60 mb-4">
                    <MapPin className="w-5 h-5" />
                    <span>{selectedSpot.location}</span>
                  </div>

                  <p className="text-dark/80 mb-6">{selectedSpot.description}</p>

                  <div className="space-y-6">
                    {/* Cultural Features */}
                    <div>
                      <h4 className="font-semibold text-dark mb-3">Cultural Features</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedSpot.culturalFeatures.map((feature) => (
                          <span
                            key={feature}
                            className="px-4 py-2 bg-sand/10 text-sand-dark rounded-full text-sm"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Best Time to Visit */}
                    <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                      <div className="w-12 h-12 bg-lime/20 rounded-full flex items-center justify-center">
                        <span className="text-2xl">🌤</span>
                      </div>
                      <div>
                        <div className="text-sm text-dark/50">Best Time to Visit</div>
                        <div className="font-medium text-dark">{selectedSpot.bestTime}</div>
                      </div>
                    </div>

                    {/* Rating & Price */}
                    <div className="flex items-center justify-between pt-4 border-t">
                      <div className="flex items-center gap-2">
                        <Star className="w-5 h-5 fill-lime text-lime" />
                        <span className="font-semibold text-dark">{selectedSpot.rating}</span>
                        <span className="text-dark/50">({selectedSpot.reviews} reviews)</span>
                      </div>
                      <div className="font-semibold text-dark">
                        {selectedSpot.price}
                      </div>
                    </div>
                  </div>
                </DialogDescription>
              </DialogHeader>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  )
}
