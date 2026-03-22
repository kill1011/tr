import { useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface Testimonial {
  id: number
  name: string
  trip: string
  avatar: string
  rating: number
  text: string
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Sarah Mitchell',
    trip: 'Santorini Escape',
    avatar: '/images/avatar-sarah.jpg',
    rating: 5,
    text: 'An absolutely magical experience. Every detail was perfect, from the sunset dinner to the private boat tour. This wasn\'t just a vacation; it was a dream come true. The team went above and beyond to make our honeymoon unforgettable.'
  },
  {
    id: 2,
    name: 'James & Emily Chen',
    trip: 'Japan Discovery',
    avatar: '/images/avatar-chen.jpg',
    rating: 5,
    text: 'The cultural immersion was beyond what we imagined. Our guide revealed hidden temples and local traditions we\'ll cherish forever. Truly transformative experience that deepened our appreciation for Japanese culture.'
  },
  {
    id: 3,
    name: 'Michael Torres',
    trip: 'Peru Adventure',
    avatar: '/images/avatar-michael.jpg',
    rating: 5,
    text: 'Standing at Machu Picchu at sunrise, I felt a connection to history I\'ve never experienced. The journey there was as incredible as the destination. Every step of the way was perfectly organized.'
  },
  {
    id: 4,
    name: 'Emma Larsson',
    trip: 'Maldives Retreat',
    avatar: '/images/avatar-emma.jpg',
    rating: 5,
    text: 'Pure paradise. The overwater villa, the diving, the service—everything exceeded expectations. I\'ve found my happy place. Can\'t wait to return for another unforgettable experience.'
  },
]

export default function Testimonials() {
  const [isVisible, setIsVisible] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section id="testimonials" ref={sectionRef} className="py-24 lg:py-32 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span
            className={`inline-block text-sand-dark font-medium tracking-wider text-sm uppercase mb-4 transition-all duration-600 ${
              isVisible ? 'opacity-100 tracking-normal' : 'opacity-0 tracking-[10px]'
            }`}
          >
            Testimonials
          </span>
          <h2
            className={`font-display text-4xl sm:text-5xl font-bold text-dark mb-6 transition-all duration-800 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '100ms' }}
          >
            Traveler Stories
          </h2>
          <p
            className={`text-dark/60 max-w-2xl mx-auto text-lg transition-all duration-600 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
            style={{ transitionDelay: '200ms' }}
          >
            Hear from those who've embarked on unforgettable journeys with us.
          </p>
        </div>

        {/* Testimonials Carousel */}
        <div
          className={`relative max-w-4xl mx-auto transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '300ms' }}
        >
          {/* Quote Icon */}
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-16 h-16 bg-sand/20 rounded-full flex items-center justify-center">
            <Quote className="w-8 h-8 text-sand-dark" />
          </div>

          {/* Main Testimonial */}
          <div className="bg-white rounded-3xl shadow-soft p-8 lg:p-12 pt-16">
            <div className="text-center">
              {/* Rating */}
              <div className="flex justify-center gap-1 mb-6">
                {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-lime text-lime" />
                ))}
              </div>

              {/* Text */}
              <p className="text-xl lg:text-2xl text-dark/80 leading-relaxed mb-8 font-display italic">
                "{testimonials[activeIndex].text}"
              </p>

              {/* Author */}
              <div className="flex items-center justify-center gap-4">
                <img
                  src={testimonials[activeIndex].avatar}
                  alt={testimonials[activeIndex].name}
                  className="w-16 h-16 rounded-full object-cover ring-4 ring-sand/20"
                />
                <div className="text-left">
                  <div className="font-semibold text-dark">{testimonials[activeIndex].name}</div>
                  <div className="text-sm text-dark/60">{testimonials[activeIndex].trip}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <Button
              variant="outline"
              size="icon"
              onClick={prevTestimonial}
              className="w-12 h-12 rounded-full border-gray-200 hover:bg-sand hover:border-sand hover:text-dark transition-all"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>

            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === activeIndex ? 'w-8 bg-sand' : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={nextTestimonial}
              className="w-12 h-12 rounded-full border-gray-200 hover:bg-sand hover:border-sand hover:text-dark transition-all"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
