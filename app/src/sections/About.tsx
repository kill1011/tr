import { useEffect, useRef, useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface StatProps {
  value: string
  label: string
  delay: number
  isVisible: boolean
}

function AnimatedStat({ value, label, delay, isVisible }: StatProps) {
  const [displayValue, setDisplayValue] = useState('0')
  const numericValue = parseInt(value.replace(/\D/g, ''))
  const suffix = value.replace(/[0-9]/g, '')

  useEffect(() => {
    if (!isVisible) return

    const timeout = setTimeout(() => {
      let start = 0
      const duration = 1500
      const increment = numericValue / (duration / 16)

      const timer = setInterval(() => {
        start += increment
        if (start >= numericValue) {
          setDisplayValue(numericValue + suffix)
          clearInterval(timer)
        } else {
          setDisplayValue(Math.floor(start) + suffix)
        }
      }, 16)

      return () => clearInterval(timer)
    }, delay)

    return () => clearTimeout(timeout)
  }, [isVisible, numericValue, suffix, delay])

  return (
    <div className={`text-center transition-all duration-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`} style={{ transitionDelay: `${delay}ms` }}>
      <div className="font-display text-4xl sm:text-5xl font-bold text-dark mb-2">
        {displayValue}
      </div>
      <div className="text-sm text-dark/60 font-medium">{label}</div>
    </div>
  )
}

export default function About() {
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
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const stats = [
    { value: '20+', label: 'Years of Excellence' },
    { value: '50K+', label: 'Happy Travelers' },
    { value: '100+', label: 'Destinations' },
  ]

  return (
    <section id="about" ref={sectionRef} className="py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content */}
          <div className="order-2 lg:order-1">
            <h2
              className={`font-display text-4xl sm:text-5xl font-bold text-dark mb-8 transition-all duration-800 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              Crafting Unforgettable
              <span className="text-sand-dark"> Journeys</span>
            </h2>

            <div className="space-y-6 mb-10">
              <p
                className={`text-dark/70 leading-relaxed text-lg transition-all duration-700 ${
                  isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
                }`}
                style={{ transitionDelay: '200ms' }}
              >
                For over two decades, we've been curating extraordinary travel experiences 
                that transcend the ordinary. Our team of passionate explorers and local 
                experts craft journeys that immerse you in the heart of each destination.
              </p>
              <p
                className={`text-dark/70 leading-relaxed text-lg transition-all duration-700 ${
                  isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
                }`}
                style={{ transitionDelay: '350ms' }}
              >
                From hidden alpine villages to sun-kissed Mediterranean coves, we reveal 
                the world's most captivating secrets. Every itinerary is a masterpiece, 
                woven with authentic encounters, luxurious comforts, and moments that 
                take your breath away.
              </p>
            </div>

            <Button
              variant="outline"
              className={`group px-6 py-5 border-dark text-dark hover:bg-dark hover:text-white rounded-full transition-all duration-500 ${
                isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
              }`}
              style={{ transitionDelay: '500ms' }}
            >
              Our Story
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mt-12 pt-12 border-t border-gray-100">
              {stats.map((stat, index) => (
                <AnimatedStat
                  key={stat.label}
                  value={stat.value}
                  label={stat.label}
                  delay={600 + index * 150}
                  isVisible={isVisible}
                />
              ))}
            </div>
          </div>

          {/* Image */}
          <div className="order-1 lg:order-2 relative">
            <div
              className={`relative transition-all duration-1000 ${
                isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
              }`}
              style={{ transitionDelay: '100ms' }}
            >
              {/* Main Image */}
              <div className="relative rounded-3xl overflow-hidden shadow-large">
                <img
                  src="/images/about.jpg"
                  alt="Traveler exploring"
                  className="w-full h-[500px] lg:h-[600px] object-cover"
                />
                {/* Subtle overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-dark/20 to-transparent" />
              </div>

              {/* Decorative Elements */}
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-sand/20 rounded-full blur-2xl" />
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-lime/20 rounded-full blur-2xl" />

              {/* Floating Card */}
              <div
                className={`absolute -bottom-8 -right-4 lg:right-8 bg-white rounded-2xl shadow-large p-6 transition-all duration-800 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: '800ms' }}
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-sand/20 rounded-full flex items-center justify-center">
                    <span className="text-2xl">🏆</span>
                  </div>
                  <div>
                    <div className="font-display text-xl font-bold text-dark">Award Winning</div>
                    <div className="text-sm text-dark/60">Travel Agency 2024</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Orbiting decorative circle */}
            <div
              className={`absolute top-1/2 right-0 w-4 h-4 bg-sand rounded-full transition-all duration-1000 ${
                isVisible ? 'opacity-30' : 'opacity-0'
              }`}
              style={{
                transform: 'translate(50%, -50%)',
                animation: isVisible ? 'orbit 20s linear infinite' : 'none',
              }}
            />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes orbit {
          from {
            transform: translate(50%, -50%) rotate(0deg) translateX(120px) rotate(0deg);
          }
          to {
            transform: translate(50%, -50%) rotate(360deg) translateX(120px) rotate(-360deg);
          }
        }
      `}</style>
    </section>
  )
}
