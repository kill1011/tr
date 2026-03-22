import { useEffect, useRef, useState } from 'react'
import { Cloud, Sun, CloudRain, Wind, MapPin, Calendar, Navigation, Search, Clock, Thermometer } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'

interface WeatherData {
  temp: number
  condition: string
  humidity: number
  windSpeed: number
  forecast: { day: string; temp: number; condition: string }[]
}

interface Itinerary {
  id: number
  title: string
  duration: string
  highlights: string[]
  price: string
  image: string
}

const weatherData: Record<string, WeatherData> = {
  'Santorini': {
    temp: 24,
    condition: 'Sunny',
    humidity: 65,
    windSpeed: 12,
    forecast: [
      { day: 'Mon', temp: 25, condition: 'sunny' },
      { day: 'Tue', temp: 26, condition: 'sunny' },
      { day: 'Wed', temp: 24, condition: 'cloudy' },
      { day: 'Thu', temp: 23, condition: 'sunny' },
      { day: 'Fri', temp: 25, condition: 'sunny' },
    ]
  },
  'Kyoto': {
    temp: 18,
    condition: 'Partly Cloudy',
    humidity: 70,
    windSpeed: 8,
    forecast: [
      { day: 'Mon', temp: 19, condition: 'cloudy' },
      { day: 'Tue', temp: 20, condition: 'sunny' },
      { day: 'Wed', temp: 17, condition: 'rainy' },
      { day: 'Thu', temp: 18, condition: 'cloudy' },
      { day: 'Fri', temp: 21, condition: 'sunny' },
    ]
  },
  'Maldives': {
    temp: 29,
    condition: 'Sunny',
    humidity: 80,
    windSpeed: 15,
    forecast: [
      { day: 'Mon', temp: 30, condition: 'sunny' },
      { day: 'Tue', temp: 29, condition: 'sunny' },
      { day: 'Wed', temp: 28, condition: 'cloudy' },
      { day: 'Thu', temp: 29, condition: 'sunny' },
      { day: 'Fri', temp: 30, condition: 'sunny' },
    ]
  },
}

const itineraries: Itinerary[] = [
  {
    id: 1,
    title: 'Classic Greece Island Hopper',
    duration: '7 Days',
    highlights: ['Athens Acropolis', 'Santorini Sunset', 'Mykonos Beaches', 'Delphi Oracle'],
    price: '$1,899',
    image: '/images/dest-santorini.jpg'
  },
  {
    id: 2,
    title: 'Japan Cultural Immersion',
    duration: '10 Days',
    highlights: ['Tokyo Temples', 'Kyoto Geisha District', 'Mount Fuji', 'Osaka Castle'],
    price: '$2,499',
    image: '/images/dest-kyoto.jpg'
  },
  {
    id: 3,
    title: 'Maldives Luxury Escape',
    duration: '5 Days',
    highlights: ['Overwater Villa', 'Sunset Cruise', 'Snorkeling', 'Spa Treatment'],
    price: '$3,299',
    image: '/images/dest-maldives.jpg'
  },
]

const getWeatherIcon = (condition: string) => {
  switch (condition.toLowerCase()) {
    case 'sunny': return <Sun className="w-6 h-6 text-lime" />
    case 'cloudy': return <Cloud className="w-6 h-6 text-gray-400" />
    case 'rainy': return <CloudRain className="w-6 h-6 text-blue-400" />
    default: return <Sun className="w-6 h-6 text-lime" />
  }
}

export default function InformationQuery() {
  const [isVisible, setIsVisible] = useState(false)
  const [selectedLocation, setSelectedLocation] = useState('Santorini')
  const [searchQuery, setSearchQuery] = useState('')
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

  const currentWeather = weatherData[selectedLocation]

  return (
    <section id="information" ref={sectionRef} className="py-24 lg:py-32 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <span
            className={`inline-block text-sand-dark font-medium tracking-wider text-sm uppercase mb-4 transition-all duration-600 ${
              isVisible ? 'opacity-100 tracking-normal' : 'opacity-0 tracking-[10px]'
            }`}
          >
            Information Query & Search
          </span>
          <h2
            className={`font-display text-4xl sm:text-5xl font-bold text-dark mb-6 transition-all duration-800 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '100ms' }}
          >
            Plan Your Perfect Trip
          </h2>
          <p
            className={`text-dark/60 max-w-2xl mx-auto text-lg transition-all duration-600 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
            style={{ transitionDelay: '200ms' }}
          >
            Access real-time weather updates, curated itineraries, and navigation 
            assistance for your next adventure.
          </p>
        </div>

        {/* Main Content */}
        <div
          className={`transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '300ms' }}
        >
          <Tabs defaultValue="weather" className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-8 bg-white p-1 rounded-full shadow-soft">
              <TabsTrigger value="weather" className="rounded-full data-[state=active]:bg-sand data-[state=active]:text-dark">
                <Cloud className="w-4 h-4 mr-2" />
                Weather
              </TabsTrigger>
              <TabsTrigger value="itinerary" className="rounded-full data-[state=active]:bg-sand data-[state=active]:text-dark">
                <Calendar className="w-4 h-4 mr-2" />
                Itineraries
              </TabsTrigger>
              <TabsTrigger value="navigation" className="rounded-full data-[state=active]:bg-sand data-[state=active]:text-dark">
                <Navigation className="w-4 h-4 mr-2" />
                Navigate
              </TabsTrigger>
            </TabsList>

            {/* Weather Tab */}
            <TabsContent value="weather" className="mt-0">
              <div className="grid lg:grid-cols-3 gap-6">
                {/* Location Selector */}
                <div className="lg:col-span-1">
                  <div className="bg-white rounded-2xl shadow-soft p-6">
                    <h3 className="font-display text-xl font-bold text-dark mb-4">Select Location</h3>
                    <div className="relative mb-4">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-dark/40" />
                      <Input
                        placeholder="Search location..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 rounded-full"
                      />
                    </div>
                    <div className="space-y-2">
                      {Object.keys(weatherData).map((location) => (
                        <button
                          key={location}
                          onClick={() => setSelectedLocation(location)}
                          className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-300 ${
                            selectedLocation === location
                              ? 'bg-sand/20 text-dark'
                              : 'hover:bg-gray-50 text-dark/70'
                          }`}
                        >
                          <MapPin className="w-4 h-4" />
                          <span className="font-medium">{location}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Weather Display */}
                <div className="lg:col-span-2">
                  <div className="bg-white rounded-2xl shadow-soft p-8">
                    <div className="flex items-center justify-between mb-8">
                      <div>
                        <h3 className="font-display text-3xl font-bold text-dark">{selectedLocation}</h3>
                        <p className="text-dark/60">Current Weather</p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-2">
                          {getWeatherIcon(currentWeather.condition)}
                          <span className="text-4xl font-bold text-dark">{currentWeather.temp}°C</span>
                        </div>
                        <p className="text-dark/60">{currentWeather.condition}</p>
                      </div>
                    </div>

                    {/* Weather Details */}
                    <div className="grid grid-cols-3 gap-4 mb-8">
                      <div className="bg-gray-50 rounded-xl p-4 text-center">
                        <Thermometer className="w-6 h-6 text-sand-dark mx-auto mb-2" />
                        <div className="text-sm text-dark/60">Humidity</div>
                        <div className="font-semibold text-dark">{currentWeather.humidity}%</div>
                      </div>
                      <div className="bg-gray-50 rounded-xl p-4 text-center">
                        <Wind className="w-6 h-6 text-sand-dark mx-auto mb-2" />
                        <div className="text-sm text-dark/60">Wind</div>
                        <div className="font-semibold text-dark">{currentWeather.windSpeed} km/h</div>
                      </div>
                      <div className="bg-gray-50 rounded-xl p-4 text-center">
                        <Clock className="w-6 h-6 text-sand-dark mx-auto mb-2" />
                        <div className="text-sm text-dark/60">Updated</div>
                        <div className="font-semibold text-dark">Just now</div>
                      </div>
                    </div>

                    {/* 5-Day Forecast */}
                    <div>
                      <h4 className="font-semibold text-dark mb-4">5-Day Forecast</h4>
                      <div className="flex justify-between">
                        {currentWeather.forecast.map((day, index) => (
                          <div key={index} className="text-center">
                            <div className="text-sm text-dark/60 mb-2">{day.day}</div>
                            <div className="mb-2">{getWeatherIcon(day.condition)}</div>
                            <div className="font-semibold text-dark">{day.temp}°</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Itinerary Tab */}
            <TabsContent value="itinerary" className="mt-0">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {itineraries.map((itinerary) => (
                  <div
                    key={itinerary.id}
                    className="bg-white rounded-2xl shadow-soft overflow-hidden hover:shadow-hover transition-all duration-500 hover:-translate-y-2"
                  >
                    <div className="relative h-48">
                      <img
                        src={itinerary.image}
                        alt={itinerary.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-dark/60 to-transparent" />
                      <Badge className="absolute top-4 left-4 bg-white/90 text-dark">
                        <Clock className="w-3 h-3 mr-1" />
                        {itinerary.duration}
                      </Badge>
                    </div>
                    <div className="p-6">
                      <h3 className="font-display text-xl font-bold text-dark mb-2">{itinerary.title}</h3>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {itinerary.highlights.map((highlight) => (
                          <span key={highlight} className="text-xs px-2 py-1 bg-sand/10 text-sand-dark rounded-full">
                            {highlight}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-dark">{itinerary.price}</span>
                        <Button size="sm" className="bg-sand text-dark hover:bg-dark hover:text-white rounded-full">
                          View Details
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            {/* Navigation Tab */}
            <TabsContent value="navigation" className="mt-0">
              <div className="bg-white rounded-2xl shadow-soft p-8">
                <div className="grid lg:grid-cols-2 gap-8">
                  <div>
                    <h3 className="font-display text-2xl font-bold text-dark mb-4">Get Directions</h3>
                    <p className="text-dark/60 mb-6">
                      Enter your current location and destination to get real-time navigation 
                      assistance with estimated travel times and route options.
                    </p>
                    <div className="space-y-4">
                      <div className="relative">
                        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-lime" />
                        <Input
                          placeholder="Your current location"
                          className="pl-12 py-6 rounded-xl border-gray-200"
                        />
                      </div>
                      <div className="relative">
                        <Navigation className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-sand-dark" />
                        <Input
                          placeholder="Destination"
                          className="pl-12 py-6 rounded-xl border-gray-200"
                        />
                      </div>
                      <Button className="w-full py-6 bg-sand text-dark hover:bg-dark hover:text-white rounded-xl font-semibold">
                        <Navigation className="w-5 h-5 mr-2" />
                        Get Directions
                      </Button>
                    </div>
                  </div>
                  <div className="bg-gray-100 rounded-xl flex items-center justify-center min-h-[300px]">
                    <div className="text-center">
                      <div className="w-20 h-20 bg-sand/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <MapPin className="w-10 h-10 text-sand-dark" />
                      </div>
                      <p className="text-dark/60">Interactive map will appear here</p>
                      <p className="text-sm text-dark/40">Showing routes and points of interest</p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  )
}
