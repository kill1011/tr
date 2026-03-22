import { useEffect, useRef, useState } from 'react'
import { Mail, Send, CheckCircle2, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function Newsletter() {
  const [isVisible, setIsVisible] = useState(false)
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubmitted(true)
      setTimeout(() => {
        setSubmitted(false)
        setEmail('')
      }, 3000)
    }
  }

  return (
    <section id="newsletter" ref={sectionRef} className="py-24 lg:py-32 bg-white relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -right-1/4 w-[800px] h-[800px] bg-sand/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-1/2 -left-1/4 w-[600px] h-[600px] bg-lime/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div
          className={`bg-dark rounded-3xl p-8 lg:p-16 text-center relative overflow-hidden transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          {/* Decorative Elements */}
          <div className="absolute top-4 left-4 w-20 h-20 bg-sand/10 rounded-full blur-2xl" />
          <div className="absolute bottom-4 right-4 w-32 h-32 bg-lime/10 rounded-full blur-2xl" />
          <Sparkles className="absolute top-8 right-8 w-6 h-6 text-sand/30" />

          {/* Content */}
          <div className="relative z-10">
            <div
              className={`inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6 transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: '200ms' }}
            >
              <Mail className="w-4 h-4 text-sand" />
              <span className="text-white/80 text-sm">Join 50,000+ travelers</span>
            </div>

            <h2
              className={`font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 transition-all duration-800 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: '300ms' }}
            >
              Join the Adventure
            </h2>

            <p
              className={`text-white/70 text-lg max-w-xl mx-auto mb-8 transition-all duration-600 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
              style={{ transitionDelay: '400ms' }}
            >
              Subscribe for exclusive travel deals, destination inspiration, 
              and insider tips delivered to your inbox.
            </p>

            {/* Form */}
            {submitted ? (
              <div
                className="flex items-center justify-center gap-3 bg-white/10 backdrop-blur-sm rounded-2xl p-6 animate-scale-in"
              >
                <CheckCircle2 className="w-8 h-8 text-lime" />
                <div className="text-left">
                  <div className="text-white font-semibold">Welcome Aboard!</div>
                  <div className="text-white/60 text-sm">Check your inbox for confirmation</div>
                </div>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className={`flex flex-col sm:flex-row gap-4 max-w-lg mx-auto transition-all duration-700 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: '500ms' }}
              >
                <div className="relative flex-1">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-dark/40" />
                  <Input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-12 py-6 rounded-full bg-white border-0 text-dark placeholder:text-dark/40 focus:ring-2 focus:ring-sand"
                    required
                  />
                </div>
                <Button
                  type="submit"
                  className="bg-sand text-dark hover:bg-white rounded-full px-8 py-6 font-semibold transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
                >
                  <Send className="w-5 h-5 mr-2" />
                  Subscribe
                </Button>
              </form>
            )}

            <p
              className={`text-white/40 text-sm mt-6 transition-all duration-600 ${
                isVisible ? 'opacity-100' : 'opacity-0'
              }`}
              style={{ transitionDelay: '600ms' }}
            >
              We respect your privacy. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
