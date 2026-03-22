import { useEffect, useRef, useState } from 'react'
import { Play, Pause, Volume2, VolumeX } from 'lucide-react'

export default function VideoExperience() {
  const [isVisible, setIsVisible] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
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

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
  }

  return (
    <section
      id="video"
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden flex items-center justify-center"
    >
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/video-poster.jpg"
          alt="Mountain landscape"
          className={`w-full h-full object-cover transition-transform duration-[1500ms] ${
            isVisible ? 'scale-100' : 'scale-110'
          }`}
        />
        <div className="absolute inset-0 bg-dark/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4">
        {/* Headline */}
        <h2
          className={`font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-4 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
          style={{ transitionDelay: '300ms' }}
        >
          Let the Journey Begin
        </h2>
        <p
          className={`text-xl text-white/80 mb-12 transition-all duration-800 ${
            isVisible ? 'opacity-100 blur-0' : 'opacity-0 blur-sm'
          }`}
          style={{ transitionDelay: '600ms' }}
        >
          Watch our story unfold
        </p>

        {/* Play Button */}
        <div
          className={`relative transition-all duration-800 ${
            isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
          }`}
          style={{ transitionDelay: '800ms' }}
        >
          {/* Pulse Rings */}
          {!isPlaying && (
            <>
              <div className="absolute inset-0 rounded-full bg-white/20 animate-pulse-ring" />
              <div className="absolute inset-0 rounded-full bg-white/10 animate-pulse-ring" style={{ animationDelay: '0.5s' }} />
            </>
          )}

          <button
            onClick={togglePlay}
            className="relative w-24 h-24 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-300 hover:scale-110 group"
          >
            {isPlaying ? (
              <Pause className="w-10 h-10 text-white" />
            ) : (
              <Play className="w-10 h-10 text-white ml-1" />
            )}
          </button>
        </div>

        {/* Video Controls */}
        {isPlaying && (
          <div
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-4 animate-fade-in"
          >
            <button
              onClick={toggleMute}
              className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
            >
              {isMuted ? <VolumeX className="w-5 h-5 text-white" /> : <Volume2 className="w-5 h-5 text-white" />}
            </button>
          </div>
        )}
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent z-10" />
    </section>
  )
}
