import { useEffect, useRef, useState } from 'react'
import { 
  Users, 
  Star, 
  Map, 
  Headphones, 
  Shield, 
  Leaf, 
  Sparkles, 
  CalendarCheck 
} from 'lucide-react'

interface Feature {
  icon: React.ReactNode
  title: string
  description: string
}

const features: Feature[] = [
  {
    icon: <Users className="w-7 h-7" />,
    title: 'Expert Guides',
    description: 'Local experts who reveal hidden gems and authentic experiences you won\'t find in guidebooks.'
  },
  {
    icon: <Star className="w-7 h-7" />,
    title: 'Premium Comfort',
    description: 'Handpicked accommodations that blend luxury with local character and stunning locations.'
  },
  {
    icon: <Map className="w-7 h-7" />,
    title: 'Tailored Journeys',
    description: 'Every itinerary crafted to your desires, pace, and dreams—no two journeys are alike.'
  },
  {
    icon: <Headphones className="w-7 h-7" />,
    title: '24/7 Support',
    description: 'Peace of mind with round-the-clock assistance wherever your adventures take you.'
  },
  {
    icon: <Shield className="w-7 h-7" />,
    title: 'Best Price Guarantee',
    description: 'Exceptional value with our price match promise and transparent pricing.'
  },
  {
    icon: <Leaf className="w-7 h-7" />,
    title: 'Sustainable Travel',
    description: 'Responsible tourism that protects the places we love and supports local communities.'
  },
  {
    icon: <Sparkles className="w-7 h-7" />,
    title: 'Unique Experiences',
    description: 'Exclusive access to extraordinary moments and once-in-a-lifetime opportunities.'
  },
  {
    icon: <CalendarCheck className="w-7 h-7" />,
    title: 'Easy Booking',
    description: 'Seamless planning with flexible options and instant confirmation.'
  },
]

export default function Features() {
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
    <section id="features" ref={sectionRef} className="py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span
            className={`inline-block text-sand-dark font-medium tracking-wider text-sm uppercase mb-4 transition-all duration-600 ${
              isVisible ? 'opacity-100 tracking-normal' : 'opacity-0 tracking-[10px]'
            }`}
          >
            Why Choose Us
          </span>
          <h2
            className={`font-display text-4xl sm:text-5xl font-bold text-dark mb-6 transition-all duration-800 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '100ms' }}
          >
            The Wanderlust Difference
          </h2>
          <p
            className={`text-dark/60 max-w-2xl mx-auto text-lg transition-all duration-600 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
            style={{ transitionDelay: '200ms' }}
          >
            We craft every detail of your journey with passion, expertise, 
            and unwavering commitment to excellence.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className={`group relative transition-all duration-600 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
              }`}
              style={{ 
                transitionDelay: `${300 + index * 100}ms`,
              }}
            >
              {/* Icon */}
              <div className="relative mb-6">
                <div className="w-16 h-16 bg-sand/10 rounded-2xl flex items-center justify-center text-sand-dark group-hover:bg-sand group-hover:text-dark transition-all duration-300 group-hover:scale-110 animate-float" style={{ animationDelay: `${index * 0.5}s` }}>
                  {feature.icon}
                </div>
              </div>

              {/* Content */}
              <h3 className="font-display text-xl font-bold text-dark mb-3 group-hover:text-sand-dark transition-colors">
                {feature.title}
              </h3>
              <p className="text-dark/60 leading-relaxed">
                {feature.description}
              </p>

              {/* Hover Effect */}
              <div className="absolute -inset-4 bg-sand/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
