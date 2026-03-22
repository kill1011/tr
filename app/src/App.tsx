import { useEffect, useRef, useState } from 'react'
import './App.css'
import Navigation from './sections/Navigation'
import Hero from './sections/Hero'
import About from './sections/About'
import Destinations from './sections/Destinations'
import VideoExperience from './sections/VideoExperience'
import Features from './sections/Features'
import Testimonials from './sections/Testimonials'
import Blog from './sections/Blog'
import Newsletter from './sections/Newsletter'
import Footer from './sections/Footer'
import ScenicSpots from './sections/ScenicSpots'
import InformationQuery from './sections/InformationQuery'
import ReservationBooking from './sections/ReservationBooking'
import Transportation from './sections/Transportation'
import Feedback from './sections/Feedback'

function App() {
  const [scrollY, setScrollY] = useState(0)
  const mainRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div ref={mainRef} className="min-h-screen bg-white overflow-x-hidden">
      <Navigation scrollY={scrollY} />
      <Hero />
      <About />
      <ScenicSpots />
      <Destinations />
      <InformationQuery />
      <ReservationBooking />
      <Transportation />
      <VideoExperience />
      <Features />
      <Testimonials />
      <Feedback />
      <Blog />
      <Newsletter />
      <Footer />
    </div>
  )
}

export default App
