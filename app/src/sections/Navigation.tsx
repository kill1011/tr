import { useState, useEffect } from 'react'
import { Menu, X, Compass } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface NavigationProps {
  scrollY: number
}

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Scenic Spots', href: '#scenic-spots' },
  { name: 'Explore', href: '#destinations' },
  { name: 'Services', href: '#features' },
  { name: 'Transport', href: '#transportation' },
  { name: 'Feedback', href: '#feedback' },
  { name: 'Contact', href: '#newsletter' },
]

export default function Navigation({ scrollY }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    setIsScrolled(scrollY > 100)
  }, [scrollY])

  const scrollToSection = (href: string) => {
    setIsMobileMenuOpen(false)
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-expo-out ${
          isScrolled
            ? 'bg-white/90 backdrop-blur-xl shadow-soft py-3'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault()
                scrollToSection('#home')
              }}
              className="flex items-center gap-2 group"
            >
              <div className={`p-2 rounded-full transition-all duration-300 ${
                isScrolled ? 'bg-dark' : 'bg-white/20 backdrop-blur-sm'
              }`}>
                <Compass className={`w-5 h-5 transition-colors duration-300 ${
                  isScrolled ? 'text-sand' : 'text-white'
                }`} />
              </div>
              <span className={`font-display text-xl font-semibold transition-colors duration-300 ${
                isScrolled ? 'text-dark' : 'text-white'
              }`}>
                Wanderlust
              </span>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link, index) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToSection(link.href)
                  }}
                  className={`relative text-sm font-medium transition-colors duration-300 group ${
                    isScrolled
                      ? 'text-dark/80 hover:text-sand-dark'
                      : 'text-white/90 hover:text-white'
                  }`}
                  style={{ animationDelay: `${index * 80}ms` }}
                >
                  {link.name}
                  <span className={`absolute -bottom-1 left-1/2 w-0 h-0.5 transition-all duration-300 group-hover:w-full group-hover:left-0 ${
                    isScrolled ? 'bg-sand' : 'bg-white'
                  }`} />
                </a>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden lg:block">
              <Button
                onClick={() => scrollToSection('#reservation')}
                className={`px-6 py-2 rounded-full font-medium text-sm transition-all duration-300 ${
                  isScrolled
                    ? 'bg-sand text-dark hover:bg-dark hover:text-white'
                    : 'bg-white/20 backdrop-blur-sm text-white hover:bg-white hover:text-dark'
                }`}
              >
                Book Now
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`lg:hidden p-2 rounded-lg transition-colors duration-300 ${
                isScrolled ? 'text-dark' : 'text-white'
              }`}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-500 ${
          isMobileMenuOpen ? 'visible' : 'invisible'
        }`}
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-dark/60 backdrop-blur-sm transition-opacity duration-500 ${
            isMobileMenuOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setIsMobileMenuOpen(false)}
        />

        {/* Menu Panel */}
        <div
          className={`absolute right-0 top-0 h-full w-80 bg-white shadow-2xl transition-transform duration-500 ease-expo-out ${
            isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="p-6 pt-20">
            <div className="flex flex-col gap-4">
              {navLinks.map((link, index) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToSection(link.href)
                  }}
                  className="text-lg font-medium text-dark/80 hover:text-sand transition-colors duration-300 py-2 border-b border-gray-100"
                  style={{
                    animation: isMobileMenuOpen ? `slide-up 0.4s ease-out ${index * 80}ms forwards` : 'none',
                    opacity: isMobileMenuOpen ? 1 : 0,
                  }}
                >
                  {link.name}
                </a>
              ))}
            </div>
            <Button
              onClick={() => scrollToSection('#reservation')}
              className="w-full mt-8 bg-sand text-dark hover:bg-dark hover:text-white rounded-full py-3"
            >
              Book Now
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
