import { useEffect, useRef, useState } from 'react'
import { Hotel, Bus, Ticket, Calendar, Users, MapPin, Star, Check, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'

interface HotelOption {
  id: number
  name: string
  location: string
  rating: number
  reviews: number
  price: number
  amenities: string[]
  image: string
}

interface TransportOption {
  id: number
  type: string
  from: string
  to: string
  departure: string
  arrival: string
  price: number
  seats: number
}

interface Event {
  id: number
  name: string
  date: string
  location: string
  price: number
  category: string
  image: string
}

const hotels: HotelOption[] = [
  {
    id: 1,
    name: 'Azure Resort & Spa',
    location: 'Santorini, Greece',
    rating: 4.9,
    reviews: 1247,
    price: 289,
    amenities: ['Pool', 'Spa', 'WiFi', 'Breakfast'],
    image: '/images/dest-santorini.jpg'
  },
  {
    id: 2,
    name: 'Royal Garden Hotel',
    location: 'Kyoto, Japan',
    rating: 4.7,
    reviews: 892,
    price: 195,
    amenities: ['Garden', 'Onsen', 'WiFi', 'Restaurant'],
    image: '/images/dest-kyoto.jpg'
  },
  {
    id: 3,
    name: 'Paradise Overwater Villas',
    location: 'Maldives',
    rating: 5.0,
    reviews: 567,
    price: 599,
    amenities: ['Private Pool', 'Butler', 'WiFi', 'All-inclusive'],
    image: '/images/dest-maldives.jpg'
  },
]

const transportOptions: TransportOption[] = [
  {
    id: 1,
    type: 'Shuttle Bus',
    from: 'Airport',
    to: 'City Center',
    departure: '08:00',
    arrival: '09:30',
    price: 25,
    seats: 12
  },
  {
    id: 2,
    type: 'Express Bus',
    from: 'City Center',
    to: 'Beach Resort',
    departure: '10:00',
    arrival: '11:15',
    price: 15,
    seats: 24
  },
  {
    id: 3,
    type: 'Airport Transfer',
    from: 'Hotel',
    to: 'Airport',
    departure: '14:00',
    arrival: '15:30',
    price: 35,
    seats: 4
  },
]

const events: Event[] = [
  {
    id: 1,
    name: 'Sunset Wine Tasting',
    date: '2024-04-15',
    location: 'Santorini Vineyard',
    price: 85,
    category: 'Culinary',
    image: '/images/dest-santorini.jpg'
  },
  {
    id: 2,
    name: 'Traditional Tea Ceremony',
    date: '2024-04-20',
    location: 'Kyoto Temple',
    price: 45,
    category: 'Cultural',
    image: '/images/dest-kyoto.jpg'
  },
  {
    id: 3,
    name: 'Sunset Cruise & Dinner',
    date: '2024-04-18',
    location: 'Maldives Lagoon',
    price: 150,
    category: 'Experience',
    image: '/images/dest-maldives.jpg'
  },
]

export default function ReservationBooking() {
  const [isVisible, setIsVisible] = useState(false)
  const [selectedItem, setSelectedItem] = useState<HotelOption | TransportOption | Event | null>(null)
  const [dialogType, setDialogType] = useState<'hotel' | 'transport' | 'event' | null>(null)
  const [bookingSuccess, setBookingSuccess] = useState(false)
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

  const handleBook = (item: HotelOption | TransportOption | Event, type: 'hotel' | 'transport' | 'event') => {
    setSelectedItem(item)
    setDialogType(type)
    setBookingSuccess(false)
  }

  const confirmBooking = () => {
    setBookingSuccess(true)
    setTimeout(() => {
      setSelectedItem(null)
      setDialogType(null)
    }, 2000)
  }

  return (
    <section id="reservation" ref={sectionRef} className="py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <span
            className={`inline-block text-sand-dark font-medium tracking-wider text-sm uppercase mb-4 transition-all duration-600 ${
              isVisible ? 'opacity-100 tracking-normal' : 'opacity-0 tracking-[10px]'
            }`}
          >
            Reservation & Booking
          </span>
          <h2
            className={`font-display text-4xl sm:text-5xl font-bold text-dark mb-6 transition-all duration-800 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '100ms' }}
          >
            Book Your Experience
          </h2>
          <p
            className={`text-dark/60 max-w-2xl mx-auto text-lg transition-all duration-600 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
            style={{ transitionDelay: '200ms' }}
          >
            Integrated platform for booking hotels, transportation, and local events. 
            Your complete travel solution in one place.
          </p>
        </div>

        {/* Booking Tabs */}
        <div
          className={`transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '300ms' }}
        >
          <Tabs defaultValue="hotels" className="w-full">
            <TabsList className="grid w-full max-w-lg mx-auto grid-cols-3 mb-8 bg-gray-100 p-1 rounded-full">
              <TabsTrigger value="hotels" className="rounded-full data-[state=active]:bg-sand data-[state=active]:text-dark">
                <Hotel className="w-4 h-4 mr-2" />
                Hotels
              </TabsTrigger>
              <TabsTrigger value="transport" className="rounded-full data-[state=active]:bg-sand data-[state=active]:text-dark">
                <Bus className="w-4 h-4 mr-2" />
                Transport
              </TabsTrigger>
              <TabsTrigger value="events" className="rounded-full data-[state=active]:bg-sand data-[state=active]:text-dark">
                <Ticket className="w-4 h-4 mr-2" />
                Events
              </TabsTrigger>
            </TabsList>

            {/* Hotels Tab */}
            <TabsContent value="hotels" className="mt-0">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {hotels.map((hotel) => (
                  <div
                    key={hotel.id}
                    className="bg-white rounded-2xl shadow-soft overflow-hidden hover:shadow-hover transition-all duration-500 hover:-translate-y-2"
                  >
                    <div className="relative h-56">
                      <img
                        src={hotel.image}
                        alt={hotel.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-dark/60 to-transparent" />
                      <div className="absolute top-4 right-4 flex items-center gap-1 bg-white/90 rounded-full px-3 py-1">
                        <Star className="w-4 h-4 fill-lime text-lime" />
                        <span className="text-sm font-semibold">{hotel.rating}</span>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="font-display text-xl font-bold text-dark mb-1">{hotel.name}</h3>
                      <div className="flex items-center gap-1 text-dark/60 text-sm mb-3">
                        <MapPin className="w-4 h-4" />
                        {hotel.location}
                      </div>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {hotel.amenities.map((amenity) => (
                          <span key={amenity} className="text-xs px-2 py-1 bg-sand/10 text-sand-dark rounded-full">
                            {amenity}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-2xl font-bold text-dark">${hotel.price}</span>
                          <span className="text-dark/50 text-sm">/night</span>
                        </div>
                        <Button
                          onClick={() => handleBook(hotel, 'hotel')}
                          className="bg-sand text-dark hover:bg-dark hover:text-white rounded-full"
                        >
                          Book Now
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            {/* Transport Tab */}
            <TabsContent value="transport" className="mt-0">
              <div className="bg-white rounded-2xl shadow-soft overflow-hidden">
                <div className="p-6 border-b border-gray-100">
                  <div className="grid md:grid-cols-4 gap-4">
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-dark/40" />
                      <Input placeholder="From" className="pl-10 py-5 rounded-xl" />
                    </div>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-dark/40" />
                      <Input placeholder="To" className="pl-10 py-5 rounded-xl" />
                    </div>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-dark/40" />
                      <Input type="date" className="pl-10 py-5 rounded-xl" />
                    </div>
                    <Button className="bg-sand text-dark hover:bg-dark hover:text-white rounded-xl py-5">
                      <Bus className="w-5 h-5 mr-2" />
                      Search Routes
                    </Button>
                  </div>
                </div>
                <div className="divide-y divide-gray-100">
                  {transportOptions.map((option) => (
                    <div key={option.id} className="p-6 flex items-center justify-between hover:bg-gray-50 transition-colors">
                      <div className="flex items-center gap-6">
                        <div className="w-14 h-14 bg-sand/20 rounded-xl flex items-center justify-center">
                          <Bus className="w-7 h-7 text-sand-dark" />
                        </div>
                        <div>
                          <div className="flex items-center gap-3 mb-1">
                            <Badge variant="secondary">{option.type}</Badge>
                            <span className="text-sm text-dark/60">{option.seats} seats available</span>
                          </div>
                          <div className="flex items-center gap-4 text-dark">
                            <span className="font-semibold">{option.from}</span>
                            <ArrowRight className="w-4 h-4 text-dark/40" />
                            <span className="font-semibold">{option.to}</span>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-dark/60 mt-1">
                            <span>Departure: {option.departure}</span>
                            <span>Arrival: {option.arrival}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-dark">${option.price}</div>
                        <Button
                          size="sm"
                          onClick={() => handleBook(option, 'transport')}
                          className="mt-2 bg-sand text-dark hover:bg-dark hover:text-white rounded-full"
                        >
                          Book Seat
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* Events Tab */}
            <TabsContent value="events" className="mt-0">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {events.map((event) => (
                  <div
                    key={event.id}
                    className="bg-white rounded-2xl shadow-soft overflow-hidden hover:shadow-hover transition-all duration-500 hover:-translate-y-2"
                  >
                    <div className="relative h-48">
                      <img
                        src={event.image}
                        alt={event.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-dark/60 to-transparent" />
                      <Badge className="absolute top-4 left-4 bg-white/90 text-dark">
                        {event.category}
                      </Badge>
                    </div>
                    <div className="p-6">
                      <h3 className="font-display text-xl font-bold text-dark mb-2">{event.name}</h3>
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center gap-2 text-dark/60 text-sm">
                          <Calendar className="w-4 h-4" />
                          {event.date}
                        </div>
                        <div className="flex items-center gap-2 text-dark/60 text-sm">
                          <MapPin className="w-4 h-4" />
                          {event.location}
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-2xl font-bold text-dark">${event.price}</span>
                          <span className="text-dark/50 text-sm">/person</span>
                        </div>
                        <Button
                          onClick={() => handleBook(event, 'event')}
                          className="bg-sand text-dark hover:bg-dark hover:text-white rounded-full"
                        >
                          <Ticket className="w-4 h-4 mr-2" />
                          Get Tickets
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Booking Dialog */}
      <Dialog open={!!selectedItem} onOpenChange={() => setSelectedItem(null)}>
        <DialogContent className="max-w-md">
          {bookingSuccess ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-lime/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-lime" />
              </div>
              <h3 className="font-display text-2xl font-bold text-dark mb-2">Booking Confirmed!</h3>
              <p className="text-dark/60">Your reservation has been successfully made.</p>
            </div>
          ) : (
            <>
              <DialogHeader>
                <DialogTitle className="font-display text-2xl">
                  {dialogType === 'hotel' && 'Book Hotel'}
                  {dialogType === 'transport' && 'Book Transport'}
                  {dialogType === 'event' && 'Book Event Tickets'}
                </DialogTitle>
                <DialogDescription>
                  {selectedItem && 'name' in selectedItem && selectedItem.name}
                  {selectedItem && 'type' in selectedItem && `${selectedItem.type}: ${selectedItem.from} → ${selectedItem.to}`}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-dark mb-2 block">Check-in / Date</label>
                    <Input type="date" className="rounded-xl" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-dark mb-2 block">
                      {dialogType === 'hotel' ? 'Check-out' : 'Guests / Seats'}
                    </label>
                    {dialogType === 'hotel' ? (
                      <Input type="date" className="rounded-xl" />
                    ) : (
                      <div className="relative">
                        <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-dark/40" />
                        <Input type="number" defaultValue={1} min={1} className="pl-10 rounded-xl" />
                      </div>
                    )}
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-dark mb-2 block">Contact Email</label>
                  <Input type="email" placeholder="your@email.com" className="rounded-xl" />
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-dark/60">Price</span>
                    <span className="font-semibold">
                      ${selectedItem && 'price' in selectedItem ? selectedItem.price : 0}
                    </span>
                  </div>
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>${selectedItem && 'price' in selectedItem ? selectedItem.price : 0}</span>
                  </div>
                </div>
              </div>
              <Button onClick={confirmBooking} className="w-full bg-sand text-dark hover:bg-dark hover:text-white rounded-xl py-6">
                Confirm Booking
              </Button>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  )
}
