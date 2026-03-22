import { useEffect, useRef, useState } from 'react'
import { MessageSquare, ThumbsUp, AlertTriangle, Send, Star, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'

interface FeedbackItem {
  id: number
  type: 'experience' | 'complaint'
  author: string
  rating?: number
  content: string
  date: string
  status: 'pending' | 'resolved' | 'addressed'
}

const sampleFeedback: FeedbackItem[] = [
  {
    id: 1,
    type: 'experience',
    author: 'Maria G.',
    rating: 5,
    content: 'The booking process was seamless and the hotel exceeded our expectations. Highly recommend!',
    date: '2024-03-15',
    status: 'addressed'
  },
  {
    id: 2,
    type: 'complaint',
    author: 'John D.',
    content: 'The shuttle bus was 20 minutes late. Please improve punctuality.',
    date: '2024-03-14',
    status: 'resolved'
  },
  {
    id: 3,
    type: 'experience',
    author: 'Lisa K.',
    rating: 4,
    content: 'Great itinerary suggestions! The weather feature helped us plan perfectly.',
    date: '2024-03-12',
    status: 'addressed'
  },
]

export default function Feedback() {
  const [isVisible, setIsVisible] = useState(false)
  const [activeTab, setActiveTab] = useState('share')
  const [rating, setRating] = useState(0)
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    content: '',
    type: 'experience'
  })
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setFormData({ name: '', email: '', content: '', type: 'experience' })
      setRating(0)
    }, 3000)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'resolved':
        return <Badge className="bg-lime/20 text-lime-dark"><CheckCircle2 className="w-3 h-3 mr-1" /> Resolved</Badge>
      case 'addressed':
        return <Badge className="bg-blue/20 text-blue-dark"><ThumbsUp className="w-3 h-3 mr-1" /> Addressed</Badge>
      default:
        return <Badge className="bg-amber/20 text-amber-dark"><AlertTriangle className="w-3 h-3 mr-1" /> Pending</Badge>
    }
  }

  return (
    <section id="feedback" ref={sectionRef} className="py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <span
            className={`inline-block text-sand-dark font-medium tracking-wider text-sm uppercase mb-4 transition-all duration-600 ${
              isVisible ? 'opacity-100 tracking-normal' : 'opacity-0 tracking-[10px]'
            }`}
          >
            Testimonials & Feedback
          </span>
          <h2
            className={`font-display text-4xl sm:text-5xl font-bold text-dark mb-6 transition-all duration-800 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '100ms' }}
          >
            Share Your Experience
          </h2>
          <p
            className={`text-dark/60 max-w-2xl mx-auto text-lg transition-all duration-600 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
            style={{ transitionDelay: '200ms' }}
          >
            We value your feedback. Share your travel stories or let us know 
            how we can improve your experience.
          </p>
        </div>

        {/* Main Content */}
        <div
          className={`transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '300ms' }}
        >
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8 bg-gray-100 p-1 rounded-full">
              <TabsTrigger value="share" className="rounded-full data-[state=active]:bg-sand data-[state=active]:text-dark">
                <MessageSquare className="w-4 h-4 mr-2" />
                Share Experience
              </TabsTrigger>
              <TabsTrigger value="view" className="rounded-full data-[state=active]:bg-sand data-[state=active]:text-dark">
                <ThumbsUp className="w-4 h-4 mr-2" />
                View Feedback
              </TabsTrigger>
            </TabsList>

            {/* Share Experience Tab */}
            <TabsContent value="share" className="mt-0">
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Form */}
                <div className="bg-gray-50 rounded-2xl p-8">
                  {submitted ? (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 bg-lime/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle2 className="w-8 h-8 text-lime" />
                      </div>
                      <h3 className="font-display text-2xl font-bold text-dark mb-2">Thank You!</h3>
                      <p className="text-dark/60">Your feedback has been submitted successfully.</p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit}>
                      <h3 className="font-display text-2xl font-bold text-dark mb-6">Submit Your Feedback</h3>
                      
                      {/* Feedback Type */}
                      <div className="flex gap-4 mb-6">
                        <button
                          type="button"
                          onClick={() => setFormData({ ...formData, type: 'experience' })}
                          className={`flex-1 py-3 px-4 rounded-xl border-2 transition-all ${
                            formData.type === 'experience'
                              ? 'border-sand bg-sand/10 text-dark'
                              : 'border-gray-200 text-dark/60 hover:border-sand/50'
                          }`}
                        >
                          <ThumbsUp className="w-5 h-5 mx-auto mb-1" />
                          <span className="text-sm">Share Experience</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setFormData({ ...formData, type: 'complaint' })}
                          className={`flex-1 py-3 px-4 rounded-xl border-2 transition-all ${
                            formData.type === 'complaint'
                              ? 'border-sand bg-sand/10 text-dark'
                              : 'border-gray-200 text-dark/60 hover:border-sand/50'
                          }`}
                        >
                          <AlertTriangle className="w-5 h-5 mx-auto mb-1" />
                          <span className="text-sm">Report Issue</span>
                        </button>
                      </div>

                      {/* Rating (only for experiences) */}
                      {formData.type === 'experience' && (
                        <div className="mb-6">
                          <label className="block text-sm font-medium text-dark mb-2">Your Rating</label>
                          <div className="flex gap-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <button
                                key={star}
                                type="button"
                                onClick={() => setRating(star)}
                                className="transition-transform hover:scale-110"
                              >
                                <Star
                                  className={`w-8 h-8 ${
                                    star <= rating ? 'fill-lime text-lime' : 'text-gray-300'
                                  }`}
                                />
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="space-y-4">
                        <div>
                          <Input
                            placeholder="Your Name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="rounded-xl py-5"
                            required
                          />
                        </div>
                        <div>
                          <Input
                            type="email"
                            placeholder="Your Email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="rounded-xl py-5"
                            required
                          />
                        </div>
                        <div>
                          <Textarea
                            placeholder={formData.type === 'experience' 
                              ? 'Tell us about your experience...' 
                              : 'Describe the issue you encountered...'}
                            value={formData.content}
                            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                            className="rounded-xl min-h-[120px]"
                            required
                          />
                        </div>
                      </div>

                      <Button
                        type="submit"
                        className="w-full mt-6 bg-sand text-dark hover:bg-dark hover:text-white rounded-xl py-6"
                      >
                        <Send className="w-5 h-5 mr-2" />
                        Submit Feedback
                      </Button>
                    </form>
                  )}
                </div>

                {/* Info */}
                <div className="flex flex-col justify-center">
                  <h3 className="font-display text-2xl font-bold text-dark mb-4">Why Your Feedback Matters</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-sand/20 rounded-lg flex items-center justify-center flex-shrink-0">
                        <ThumbsUp className="w-5 h-5 text-sand-dark" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-dark mb-1">Improve Our Services</h4>
                        <p className="text-dark/60 text-sm">Your feedback helps us enhance our offerings and create better experiences.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-sand/20 rounded-lg flex items-center justify-center flex-shrink-0">
                        <MessageSquare className="w-5 h-5 text-sand-dark" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-dark mb-1">Quick Response</h4>
                        <p className="text-dark/60 text-sm">We aim to respond to all feedback within 24 hours.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-sand/20 rounded-lg flex items-center justify-center flex-shrink-0">
                        <CheckCircle2 className="w-5 h-5 text-sand-dark" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-dark mb-1">Issue Resolution</h4>
                        <p className="text-dark/60 text-sm">Complaints are tracked until fully resolved to your satisfaction.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* View Feedback Tab */}
            <TabsContent value="view" className="mt-0">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sampleFeedback.map((item) => (
                  <div key={item.id} className="bg-gray-50 rounded-2xl p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-sand/20 rounded-full flex items-center justify-center">
                          <span className="font-semibold text-sand-dark">{item.author[0]}</span>
                        </div>
                        <div>
                          <div className="font-semibold text-dark">{item.author}</div>
                          <div className="text-xs text-dark/50">{item.date}</div>
                        </div>
                      </div>
                      {getStatusBadge(item.status)}
                    </div>
                    
                    {item.rating && (
                      <div className="flex gap-1 mb-3">
                        {[...Array(item.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-lime text-lime" />
                        ))}
                      </div>
                    )}
                    
                    <p className="text-dark/70 text-sm">{item.content}</p>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  )
}
