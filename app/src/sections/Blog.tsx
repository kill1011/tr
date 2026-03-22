import { useEffect, useRef, useState } from 'react'
import { ArrowRight, Calendar, Clock, Tag } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

interface BlogPost {
  id: number
  title: string
  excerpt: string
  category: string
  date: string
  readTime: string
  image: string
  featured?: boolean
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: '10 Hidden Gems of the Mediterranean',
    excerpt: 'Beyond the crowded tourist spots lie secret coves, ancient villages, and untouched islands waiting to be discovered. Explore the Mediterranean\'s best-kept secrets.',
    category: 'Destinations',
    date: 'March 15, 2024',
    readTime: '8 min read',
    image: '/images/blog-mediterranean.jpg',
    featured: true
  },
  {
    id: 2,
    title: 'A Complete Guide to Cherry Blossom Season in Japan',
    excerpt: 'Planning the perfect sakura viewing experience, from Tokyo\'s best spots to Kyoto\'s secret gardens.',
    category: 'Seasonal',
    date: 'March 10, 2024',
    readTime: '6 min read',
    image: '/images/blog-japan.jpg'
  },
  {
    id: 3,
    title: 'Sustainable Travel: How to Explore Responsibly',
    excerpt: 'Simple ways to minimize your impact while maximizing your experience as a conscious traveler.',
    category: 'Tips',
    date: 'March 5, 2024',
    readTime: '5 min read',
    image: '/images/blog-sustainable.jpg'
  },
]

export default function Blog() {
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

  const featuredPost = blogPosts.find(post => post.featured)
  const regularPosts = blogPosts.filter(post => !post.featured)

  return (
    <section id="blog" ref={sectionRef} className="py-24 lg:py-32 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12">
          <div>
            <span
              className={`inline-block text-sand-dark font-medium tracking-wider text-sm uppercase mb-4 transition-all duration-600 ${
                isVisible ? 'opacity-100 tracking-normal' : 'opacity-0 tracking-[10px]'
              }`}
            >
              Travel Journal
            </span>
            <h2
              className={`font-display text-4xl sm:text-5xl font-bold text-dark transition-all duration-800 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: '100ms' }}
            >
              Stories & Inspiration
            </h2>
          </div>
          <Button
            variant="outline"
            className={`self-start sm:self-auto border-dark text-dark hover:bg-dark hover:text-white rounded-full group transition-all duration-600 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '200ms' }}
          >
            View All Articles
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>

        {/* Blog Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Featured Post */}
          {featuredPost && (
            <div
              className={`group relative bg-white rounded-2xl overflow-hidden shadow-soft hover:shadow-hover transition-all duration-700 lg:row-span-2 ${
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-16'
              }`}
              style={{ transitionDelay: '300ms' }}
            >
              <div className="relative h-64 lg:h-full min-h-[400px]">
                <img
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/50 to-transparent" />
                
                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
                  <Badge className="bg-sand text-dark mb-4">
                    <Tag className="w-3 h-3 mr-1" />
                    {featuredPost.category}
                  </Badge>
                  <h3 className="font-display text-2xl lg:text-3xl font-bold text-white mb-3 group-hover:text-sand transition-colors">
                    {featuredPost.title}
                  </h3>
                  <p className="text-white/80 mb-4 line-clamp-2">
                    {featuredPost.excerpt}
                  </p>
                  <div className="flex items-center gap-4 text-white/60 text-sm">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {featuredPost.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {featuredPost.readTime}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Regular Posts */}
          <div className="space-y-8">
            {regularPosts.map((post, index) => (
              <div
                key={post.id}
                className={`group bg-white rounded-2xl overflow-hidden shadow-soft hover:shadow-hover transition-all duration-700 ${
                  isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-16'
                }`}
                style={{ transitionDelay: `${500 + index * 150}ms` }}
              >
                <div className="flex flex-col sm:flex-row">
                  <div className="relative w-full sm:w-48 h-48 sm:h-auto flex-shrink-0 overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                  <div className="p-6 flex flex-col justify-center">
                    <Badge variant="secondary" className="w-fit mb-3">
                      {post.category}
                    </Badge>
                    <h3 className="font-display text-xl font-bold text-dark mb-2 group-hover:text-sand-dark transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-dark/60 text-sm mb-4 line-clamp-2">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 text-dark/50 text-xs">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {post.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {post.readTime}
                        </span>
                      </div>
                      <Button variant="ghost" size="sm" className="text-sand-dark hover:text-dark hover:bg-sand/10 p-0 h-auto">
                        Read More
                        <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
