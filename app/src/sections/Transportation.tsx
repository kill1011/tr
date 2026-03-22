import { useEffect, useRef, useState } from 'react'
import { Bus, Clock, MapPin, Route, Calendar, AlertCircle, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

interface RouteStop {
  name: string
  time: string
  type: 'pickup' | 'dropoff' | 'both'
}

interface TransportRoute {
  id: number
  name: string
  routeNumber: string
  type: string
  frequency: string
  duration: string
  stops: RouteStop[]
  status: 'active' | 'delayed' | 'maintenance'
}

const transportRoutes: TransportRoute[] = [
  {
    id: 1,
    name: 'Airport Express',
    routeNumber: 'AE-101',
    type: 'Shuttle Bus',
    frequency: 'Every 30 min',
    duration: '45 min',
    status: 'active',
    stops: [
      { name: 'International Airport', time: '08:00', type: 'pickup' },
      { name: 'City Center Station', time: '08:20', type: 'both' },
      { name: 'Grand Hotel', time: '08:35', type: 'dropoff' },
      { name: 'Beach Resort', time: '08:45', type: 'dropoff' },
    ]
  },
  {
    id: 2,
    name: 'Coastal Scenic Route',
    routeNumber: 'CS-205',
    type: 'Tour Bus',
    frequency: 'Every 2 hours',
    duration: '2 hours',
    status: 'active',
    stops: [
      { name: 'Town Square', time: '09:00', type: 'pickup' },
      { name: 'Lighthouse Point', time: '09:30', type: 'both' },
      { name: 'Marina Bay', time: '10:00', type: 'both' },
      { name: 'Sunset Cliff', time: '10:45', type: 'both' },
      { name: 'Old Town', time: '11:00', type: 'dropoff' },
    ]
  },
  {
    id: 3,
    name: 'Mountain Explorer',
    routeNumber: 'ME-301',
    type: 'Shuttle Van',
    frequency: 'Every hour',
    duration: '1.5 hours',
    status: 'delayed',
    stops: [
      { name: 'Visitor Center', time: '07:30', type: 'pickup' },
      { name: 'Trail Head', time: '08:00', type: 'both' },
      { name: 'Mountain Lodge', time: '08:45', type: 'both' },
      { name: 'Summit View', time: '09:00', type: 'dropoff' },
    ]
  },
  {
    id: 4,
    name: 'Historic District Loop',
    routeNumber: 'HD-102',
    type: 'Hop-on Hop-off',
    frequency: 'Every 20 min',
    duration: '1 hour',
    status: 'active',
    stops: [
      { name: 'Central Station', time: '10:00', type: 'pickup' },
      { name: 'Ancient Temple', time: '10:15', type: 'both' },
      { name: 'Museum Quarter', time: '10:35', type: 'both' },
      { name: 'Old Market', time: '10:50', type: 'both' },
      { name: 'Palace Gardens', time: '11:05', type: 'both' },
      { name: 'Central Station', time: '11:20', type: 'dropoff' },
    ]
  },
]

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'active':
      return <Badge className="bg-lime/20 text-lime-dark hover:bg-lime/30"><CheckCircle2 className="w-3 h-3 mr-1" /> On Time</Badge>
    case 'delayed':
      return <Badge className="bg-amber/20 text-amber-dark hover:bg-amber/30"><AlertCircle className="w-3 h-3 mr-1" /> Delayed</Badge>
    case 'maintenance':
      return <Badge className="bg-red/20 text-red-dark hover:bg-red/30"><AlertCircle className="w-3 h-3 mr-1" /> Maintenance</Badge>
    default:
      return <Badge>Unknown</Badge>
  }
}

export default function Transportation() {
  const [isVisible, setIsVisible] = useState(false)
  const [selectedRoute, setSelectedRoute] = useState<TransportRoute | null>(null)
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
    <section id="transportation" ref={sectionRef} className="py-24 lg:py-32 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <span
            className={`inline-block text-sand-dark font-medium tracking-wider text-sm uppercase mb-4 transition-all duration-600 ${
              isVisible ? 'opacity-100 tracking-normal' : 'opacity-0 tracking-[10px]'
            }`}
          >
            Transportation Module
          </span>
          <h2
            className={`font-display text-4xl sm:text-5xl font-bold text-dark mb-6 transition-all duration-800 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '100ms' }}
          >
            Local Transport Network
          </h2>
          <p
            className={`text-dark/60 max-w-2xl mx-auto text-lg transition-all duration-600 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
            style={{ transitionDelay: '200ms' }}
          >
            Comprehensive local transportation system with real-time schedules, 
            route information, and pick-up/drop-off points throughout the town.
          </p>
        </div>

        {/* Main Content */}
        <div
          className={`transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '300ms' }}
        >
          <Tabs defaultValue="routes" className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8 bg-white p-1 rounded-full shadow-soft">
              <TabsTrigger value="routes" className="rounded-full data-[state=active]:bg-sand data-[state=active]:text-dark">
                <Route className="w-4 h-4 mr-2" />
                Routes & Schedules
              </TabsTrigger>
              <TabsTrigger value="map" className="rounded-full data-[state=active]:bg-sand data-[state=active]:text-dark">
                <MapPin className="w-4 h-4 mr-2" />
                Route Map
              </TabsTrigger>
            </TabsList>

            {/* Routes Tab */}
            <TabsContent value="routes" className="mt-0">
              <div className="grid lg:grid-cols-3 gap-6">
                {/* Routes List */}
                <div className="lg:col-span-1 space-y-4">
                  <h3 className="font-display text-xl font-bold text-dark mb-4">Available Routes</h3>
                  {transportRoutes.map((route) => (
                    <button
                      key={route.id}
                      onClick={() => setSelectedRoute(route)}
                      className={`w-full text-left p-4 rounded-xl transition-all duration-300 ${
                        selectedRoute?.id === route.id
                          ? 'bg-sand/20 shadow-soft'
                          : 'bg-white hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <div className="font-semibold text-dark">{route.name}</div>
                          <div className="text-sm text-dark/60">{route.routeNumber}</div>
                        </div>
                        {getStatusBadge(route.status)}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-dark/60">
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {route.frequency}
                        </span>
                        <span className="flex items-center gap-1">
                          <Route className="w-4 h-4" />
                          {route.duration}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>

                {/* Route Details */}
                <div className="lg:col-span-2">
                  {selectedRoute ? (
                    <div className="bg-white rounded-2xl shadow-soft p-6">
                      <div className="flex items-start justify-between mb-6">
                        <div>
                          <h3 className="font-display text-2xl font-bold text-dark">{selectedRoute.name}</h3>
                          <div className="flex items-center gap-3 mt-2">
                            <Badge variant="secondary">{selectedRoute.type}</Badge>
                            <span className="text-dark/60">{selectedRoute.routeNumber}</span>
                          </div>
                        </div>
                        {getStatusBadge(selectedRoute.status)}
                      </div>

                      {/* Route Info */}
                      <div className="grid grid-cols-3 gap-4 mb-8">
                        <div className="bg-gray-50 rounded-xl p-4 text-center">
                          <Clock className="w-6 h-6 text-sand-dark mx-auto mb-2" />
                          <div className="text-sm text-dark/60">Frequency</div>
                          <div className="font-semibold text-dark">{selectedRoute.frequency}</div>
                        </div>
                        <div className="bg-gray-50 rounded-xl p-4 text-center">
                          <Route className="w-6 h-6 text-sand-dark mx-auto mb-2" />
                          <div className="text-sm text-dark/60">Duration</div>
                          <div className="font-semibold text-dark">{selectedRoute.duration}</div>
                        </div>
                        <div className="bg-gray-50 rounded-xl p-4 text-center">
                          <MapPin className="w-6 h-6 text-sand-dark mx-auto mb-2" />
                          <div className="text-sm text-dark/60">Stops</div>
                          <div className="font-semibold text-dark">{selectedRoute.stops.length}</div>
                        </div>
                      </div>

                      {/* Stops Timeline */}
                      <div>
                        <h4 className="font-semibold text-dark mb-4">Route Stops</h4>
                        <div className="relative">
                          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-sand/30" />
                          {selectedRoute.stops.map((stop, index) => (
                            <div key={index} className="relative flex items-start gap-4 mb-6 last:mb-0">
                              <div className={`w-8 h-8 rounded-full flex items-center justify-center z-10 ${
                                stop.type === 'pickup' ? 'bg-lime/20' :
                                stop.type === 'dropoff' ? 'bg-sand/20' :
                                'bg-blue/20'
                              }`}>
                                <div className={`w-3 h-3 rounded-full ${
                                  stop.type === 'pickup' ? 'bg-lime' :
                                  stop.type === 'dropoff' ? 'bg-sand' :
                                  'bg-blue'
                                }`} />
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center justify-between">
                                  <span className="font-medium text-dark">{stop.name}</span>
                                  <span className="text-sm text-dark/60">{stop.time}</span>
                                </div>
                                <Badge variant="outline" className="mt-1 text-xs">
                                  {stop.type === 'pickup' && 'Pick-up Point'}
                                  {stop.type === 'dropoff' && 'Drop-off Point'}
                                  {stop.type === 'both' && 'Pick-up & Drop-off'}
                                </Badge>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <Button className="w-full mt-6 bg-sand text-dark hover:bg-dark hover:text-white rounded-xl py-5">
                        <Calendar className="w-5 h-5 mr-2" />
                        View Full Schedule
                      </Button>
                    </div>
                  ) : (
                    <div className="bg-white rounded-2xl shadow-soft p-12 text-center">
                      <div className="w-20 h-20 bg-sand/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Bus className="w-10 h-10 text-sand-dark" />
                      </div>
                      <h3 className="font-display text-xl font-bold text-dark mb-2">Select a Route</h3>
                      <p className="text-dark/60">Click on a route from the list to view detailed information and stops.</p>
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>

            {/* Map Tab */}
            <TabsContent value="map" className="mt-0">
              <div className="bg-white rounded-2xl shadow-soft p-8">
                <div className="grid lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-1">
                    <h3 className="font-display text-xl font-bold text-dark mb-4">Route Map</h3>
                    <p className="text-dark/60 mb-6">
                      Interactive map showing all transport routes, stops, and real-time vehicle locations.
                    </p>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-4 h-4 rounded-full bg-lime" />
                        <span className="text-sm text-dark">Active Routes</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-4 h-4 rounded-full bg-sand" />
                        <span className="text-sm text-dark">Pick-up Points</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-4 h-4 rounded-full bg-blue" />
                        <span className="text-sm text-dark">Drop-off Points</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-4 h-4 rounded-full bg-amber" />
                        <span className="text-sm text-dark">Delayed Routes</span>
                      </div>
                    </div>
                  </div>
                  <div className="lg:col-span-2">
                    <div className="bg-gray-100 rounded-xl h-[400px] flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-20 h-20 bg-sand/20 rounded-full flex items-center justify-center mx-auto mb-4">
                          <MapPin className="w-10 h-10 text-sand-dark" />
                        </div>
                        <p className="text-dark/60">Interactive route map</p>
                        <p className="text-sm text-dark/40">Showing all stops and live vehicle positions</p>
                      </div>
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
