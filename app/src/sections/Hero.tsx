import { useEffect, useRef, useState } from 'react'
import { ChevronDown, Play } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function Hero() {
  const [isLoaded, setIsLoaded] = useState(false)
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative min-h-screen w-full overflow-hidden flex items-center"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/hero-bg.jpg"
          alt="Beautiful ocean view"
          className={`w-full h-full object-cover transition-transform duration-[1500ms] ease-expo-out ${
            isLoaded ? 'scale-100' : 'scale-110'
          }`}
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-dark/70 via-dark/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-dark/50 via-transparent to-dark/20" />
      </div>

      {/* Decorative Script */}
      <div
        className={`absolute top-1/4 left-10 z-10 font-script text-[12rem] text-white/10 pointer-events-none select-none transition-all duration-1200 ${
          isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
        }`}
        style={{ transitionDelay: '200ms' }}
      >
        Adventure
      </div>

      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="max-w-2xl">
          {/* Headline */}
          <div className="overflow-hidden mb-2">
            <h1
              className={`font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight transition-all duration-1000 ease-dramatic ${
                isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
              }`}
              style={{ transitionDelay: '400ms' }}
            >
              DISCOVER
            </h1>
          </div>
          <div className="overflow-hidden mb-8">
            <h1
              className={`font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight transition-all duration-1000 ease-dramatic ${
                isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
              }`}
              style={{ transitionDelay: '600ms' }}
            >
              THE WORLD
            </h1>
          </div>

          {/* Subheadline */}
          <p
            className={`text-lg sm:text-xl text-white/90 leading-relaxed mb-10 max-w-xl transition-all duration-800 ${
              isLoaded ? 'opacity-100 blur-0' : 'opacity-0 blur-sm'
            }`}
            style={{ transitionDelay: '900ms' }}
          >
            Embark on extraordinary journeys to hidden paradises, ancient wonders, 
            and breathtaking landscapes that will forever change your perspective.
          </p>

          {/* CTA Buttons */}
          <div
            className={`flex flex-wrap gap-4 transition-all duration-600 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
            style={{ transitionDelay: '1100ms' }}
          >
            <Button
              onClick={() => scrollToSection('#destinations')}
              className="px-8 py-6 bg-sand text-dark font-semibold rounded-full hover:bg-white hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
            >
              Start Your Journey
            </Button>
            <Button
              variant="outline"
              onClick={() => scrollToSection('#video')}
              className="px-8 py-6 bg-white/10 backdrop-blur-sm text-white border-white/30 font-semibold rounded-full hover:bg-white/20 hover:border-white/50 transition-all duration-300 group"
            >
              <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
              Watch Film
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        className={`absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 transition-all duration-500 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ transitionDelay: '1500ms' }}
      >
        <span className="text-white/70 text-sm font-medium">Scroll to explore</span>
        <div className="w-8 h-12 border-2 border-white/30 rounded-full flex justify-center pt-2">
          <ChevronDown className="w-4 h-4 text-white/70 animate-bounce-subtle" />
        </div>
      </div>

      {/* Floating Decorative Elements */}
      <div className="absolute top-1/3 right-1/4 w-2 h-2 bg-sand rounded-full animate-float opacity-60" />
      <div className="absolute bottom-1/3 right-1/3 w-3 h-3 bg-white/30 rounded-full animate-float opacity-40" style={{ animationDelay: '2s' }} />
      <div className="absolute top-1/2 right-1/5 w-1.5 h-1.5 bg-lime rounded-full animate-float opacity-50" style={{ animationDelay: '4s' }} />
    </section>
  )
}
