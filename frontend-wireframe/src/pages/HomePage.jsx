import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight, Star, Zap, Package, Award } from 'lucide-react'
import { useEffect } from 'react'

// Services data
const SERVICES = [
  { id: 1, name: 'Water Purifier', emoji: '💧' },
  { id: 2, name: 'Air Conditioner', emoji: '❄️' },
  { id: 3, name: 'Fridge', emoji: '🧊' },
  { id: 4, name: 'Washing Machine', emoji: '🌊' },
  { id: 5, name: 'Microwave', emoji: '🍕' },
  { id: 6, name: 'Kitchen Chimney', emoji: '💨' },
  { id: 7, name: 'LED TV', emoji: '📺' },
  { id: 8, name: 'Vacuum Cleaner', emoji: '🧹' },
  { id: 9, name: 'Air Purifier', emoji: '💨' },
  { id: 10, name: 'Geyser', emoji: '🚿' },
]

const REVIEWS = [
  {
    id: 1,
    rating: 5,
    text: 'Best service I\'ve received! Professional and quick.',
    author: 'Rajesh Kumar',
    verified: true,
    days: 2
  },
  {
    id: 2,
    rating: 5,
    text: 'Excellent work on my AC maintenance. Highly recommended!',
    author: 'Priya Sharma',
    verified: true,
    days: 5
  },
  {
    id: 3,
    rating: 4,
    text: 'Good service, fair pricing. Minor delay but worth it.',
    author: 'Amit Singh',
    verified: true,
    days: 7
  },
  {
    id: 4,
    rating: 5,
    text: 'Very satisfied with the washing machine repair. Thank you!',
    author: 'Neha Patel',
    verified: true,
    days: 10
  },
]

const CAROUSEL_IMAGES = [
  { id: 1, title: 'Professional AC Maintenance', image: '/images/ac1.jpg', description: 'Get expert AC servicing with our certified technicians' },
  { id: 2, title: 'Advanced Cooling Solutions', image: '/images/ac2.png', description: 'Experience optimal cooling with our premium services' },
  { id: 3, title: 'Quick & Reliable Service', image: '/images/ac3.png', description: 'Same-day service available in your area' },
  { id: 4, title: 'Customer Satisfaction Guaranteed', image: '/images/ac4.jpg', description: 'Join thousands of satisfied customers' },
]

export default function HomePage() {
  const [carouselIndex, setCarouselIndex] = useState(0)

  // Auto-rotate carousel every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCarouselIndex((prev) => (prev + 1) % CAROUSEL_IMAGES.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const nextCarousel = () => {
    setCarouselIndex((prev) => (prev + 1) % CAROUSEL_IMAGES.length)
  }

  const prevCarousel = () => {
    setCarouselIndex((prev) => (prev - 1 + CAROUSEL_IMAGES.length) % CAROUSEL_IMAGES.length)
  }

  return (
    <div className="animate-fadeIn">
      {/* Hero Carousel */}
      <section className="text-white py-0 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="relative rounded-xl overflow-hidden">
            <img 
              src={CAROUSEL_IMAGES[carouselIndex].image} 
              alt={CAROUSEL_IMAGES[carouselIndex].title}
              className="w-full h-96 object-cover"
              loading="lazy"
            />
            
            {/* Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-40"></div>
            
            {/* Content */}
            <div className="absolute inset-0 flex items-center justify-center text-center">
              <div className="max-w-2xl">
                <h2 className="text-4xl md:text-5xl font-bold mb-4">{CAROUSEL_IMAGES[carouselIndex].title}</h2>
                <p className="text-lg text-blue-100">{CAROUSEL_IMAGES[carouselIndex].description}</p>
              </div>
            </div>

            {/* Carousel Controls */}
            <button
              onClick={prevCarousel}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-30 hover:bg-opacity-50 p-2 rounded-full transition-all z-10"
            >
              <ChevronLeft size={24} className="text-white" />
            </button>
            <button
              onClick={nextCarousel}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-30 hover:bg-opacity-50 p-2 rounded-full transition-all z-10"
            >
              <ChevronRight size={24} className="text-white" />
            </button>

            {/* Dots */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
              {CAROUSEL_IMAGES.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCarouselIndex(idx)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    idx === carouselIndex ? 'bg-white w-8' : 'bg-white bg-opacity-50'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-primary mb-2">Services Catalog</h2>
          <p className="text-gray-600 mb-8">Choose the service you need</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {SERVICES.map(service => (
              <Link
                key={service.id}
                to={`/service/${service.id}`}
                className="card p-8 flex flex-col items-center text-center tile-hover"
              >
                <div className="text-6xl mb-4">{service.emoji}</div>
                <h3 className="font-semibold text-lg text-primary mb-4">{service.name}</h3>
                <span className="text-secondary hover:text-accent transition-colors">VIEW →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-neutral py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-primary mb-12 text-center">Why Choose Us?</h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
            <div className="card p-6 text-center">
              <div className="inline-block bg-secondary bg-opacity-10 p-3 rounded-lg mb-4">
                <Award size={32} className="text-secondary" />
              </div>
              <h3 className="font-bold text-lg text-primary mb-2">Professional Team</h3>
              <p className="text-gray-600 text-sm">Certified technicians with years of experience</p>
            </div>

            <div className="card p-6 text-center">
              <div className="inline-block bg-secondary bg-opacity-10 p-3 rounded-lg mb-4">
                <Zap size={32} className="text-secondary" />
              </div>
              <h3 className="font-bold text-lg text-primary mb-2">Quick Service</h3>
              <p className="text-gray-600 text-sm">Fast response and efficient service delivery</p>
            </div>

            <div className="card p-6 text-center">
              <div className="inline-block bg-secondary bg-opacity-10 p-3 rounded-lg mb-4">
                <Package size={32} className="text-secondary" />
              </div>
              <h3 className="font-bold text-lg text-primary mb-2">Original Parts</h3>
              <p className="text-gray-600 text-sm">Authentic spare parts with warranty</p>
            </div>

            <div className="card p-6 text-center">
              <div className="inline-block bg-secondary bg-opacity-10 p-3 rounded-lg mb-4">
                <Star size={32} className="text-secondary" />
              </div>
              <h3 className="font-bold text-lg text-primary mb-2">Top Rated</h3>
              <p className="text-gray-600 text-sm">4.8/5 stars from 2000+ customers</p>
            </div>
          </div>

          {/* Service Gallery */}
          <h3 className="text-3xl font-bold text-primary mb-8 text-center">Our Service Quality</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {CAROUSEL_IMAGES.map(carousel => (
              <div key={carousel.id} className="card overflow-hidden hover:shadow-2xl transition-all transform hover:scale-105 tile-hover">
                <div className="h-48 bg-cover bg-center relative group overflow-hidden">
                  <img 
                    src={carousel.image} 
                    alt={carousel.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all flex items-end">
                    <div className="p-4 w-full transform translate-y-full group-hover:translate-y-0 transition-transform">
                      <h4 className="font-bold text-white">{carousel.title}</h4>
                      <p className="text-sm text-blue-100 mt-1">{carousel.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Customer Reviews */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-primary mb-12">Customer Reviews</h2>

          <div className="overflow-x-auto pb-4">
            <div className="flex gap-6 min-w-min">
              {REVIEWS.map(review => (
                <div key={review.id} className="card p-6 min-w-72">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex gap-1">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <span className="text-sm font-bold">{review.rating}.0/5</span>
                  </div>
                  <p className="text-gray-700 mb-3">&ldquo;{review.text}&rdquo;</p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-semibold text-primary">{review.author}</span>
                    {review.verified && (
                      <span className="text-green-600 text-xs font-bold">✓ Verified</span>
                    )}
                  </div>
                  <p className="text-gray-500 text-xs mt-1">{review.days} days ago</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Promotional Banner */}
      <section className="bg-gradient-to-r from-indigo-900 to-indigo-800 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h3 className="text-3xl font-bold mb-4">🎉 Special Offer</h3>
          <p className="text-lg mb-6">Get 20% OFF on Annual Maintenance Plans</p>
          <Link to="/service/1" className="inline-block bg-white text-indigo-900 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors">
            Shop Now
          </Link>
        </div>
      </section>
    </div>
  )
}
