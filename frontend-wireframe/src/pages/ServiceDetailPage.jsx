import { useParams, useNavigate } from 'react-router-dom'
import { ChevronLeft, Plus, Star, Clock } from 'lucide-react'
import { useAppContext } from '../context/AppContext'
import { useState } from 'react'

const SERVICE_DETAILS = {
  1: {
    name: 'Water Purifier',
    image: '💧',
    rating: 4.8,
    reviews: 847,
    description: 'Comprehensive water purifier maintenance and service ensuring clean water supply.',
    features: ['Professional technicians', 'Original spare parts', 'Warranty on service'],
    subServices: [
      { id: 1, name: 'Filter Cleaning', price: 299, duration: 45, desc: 'Remove impurities and dirt' },
      { id: 2, name: 'Cartridge Replacement', price: 899, duration: 60, desc: 'Replace with new cartridge' },
      { id: 3, name: 'Deep Servicing', price: 1299, duration: 120, desc: 'Complete internal cleaning' },
      { id: 4, name: 'Installation', price: 2499, duration: 120, desc: 'Professional installation' },
    ]
  },
  2: {
    name: 'Air Conditioner',
    image: '❄️',
    rating: 4.7,
    reviews: 1203,
    description: 'Professional air conditioner maintenance for optimal cooling performance.',
    features: ['Gas refilling available', 'Filter cleaning', 'Warranty coverage'],
    subServices: [
      { id: 1, name: 'Filter Cleaning', price: 299, duration: 45, desc: 'AC filter cleaning and maintenance' },
      { id: 2, name: 'Gas Refilling', price: 899, duration: 60, desc: 'AC gas refilling with CFC-free gas' },
      { id: 3, name: 'Deep Servicing', price: 1299, duration: 120, desc: 'Complete AC servicing' },
      { id: 4, name: 'Installation', price: 2499, duration: 120, desc: 'New AC installation' },
      { id: 5, name: 'Uninstallation', price: 599, duration: 90, desc: 'Safe AC uninstallation' },
    ]
  },
  3: {
    name: 'Fridge',
    image: '🧊',
    rating: 4.6,
    reviews: 642,
    description: 'Expert refrigerator repair and maintenance services.',
    features: ['Quick repair', 'Original parts', 'Expert technicians'],
    subServices: [
      { id: 1, name: 'General Service', price: 499, duration: 60, desc: 'Regular maintenance' },
      { id: 2, name: 'Temperature Repair', price: 999, duration: 90, desc: 'Fix cooling issues' },
      { id: 3, name: 'Compressor Repair', price: 2999, duration: 180, desc: 'Compressor replacement' },
      { id: 4, name: 'Installation', price: 1999, duration: 120, desc: 'Professional installation' },
    ]
  },
  4: {
    name: 'Washing Machine',
    image: '🌊',
    rating: 4.9,
    reviews: 1547,
    description: 'Complete washing machine repair and maintenance services.',
    features: ['Drain cleaning', 'Motor repair', 'Drum replacement'],
    subServices: [
      { id: 1, name: 'General Service', price: 499, duration: 60, desc: 'Regular maintenance' },
      { id: 2, name: 'Drum Cleaning', price: 799, duration: 90, desc: 'Deep drum cleaning' },
      { id: 3, name: 'Motor Repair', price: 1999, duration: 120, desc: 'Motor repair/replacement' },
      { id: 4, name: 'Installation', price: 2499, duration: 120, desc: 'New machine installation' },
    ]
  },
  5: {
    name: 'Microwave',
    image: '🍕',
    rating: 4.5,
    reviews: 389,
    description: 'Professional microwave oven repair and maintenance.',
    features: ['Safety certified', 'Quick service', 'Warranty included'],
    subServices: [
      { id: 1, name: 'General Service', price: 399, duration: 45, desc: 'Regular maintenance' },
      { id: 2, name: 'Heating Element Repair', price: 799, duration: 60, desc: 'Fix heating issues' },
      { id: 3, name: 'Installation', price: 599, duration: 45, desc: 'Professional installation' },
    ]
  },
}

export default function ServiceDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToCart, setCartOpen } = useAppContext()
  const [addedItems, setAddedItems] = useState({})

  const service = SERVICE_DETAILS[id] || SERVICE_DETAILS[1]

  // Determine which image to use based on service
  const getImagePath = () => {
    if (id === '2') return '/images/ac1.jpg'
    const imageIndex = (parseInt(id) % 4) + 1
    const extensions = ['jpg', 'png', 'png', 'jpg']
    return `/images/ac${imageIndex}.${extensions[imageIndex - 1]}`
  }

  const handleAddToCart = (subService) => {
    addToCart({
      serviceName: service.name,
      subServiceName: subService.name,
      price: subService.price,
      duration: subService.duration,
    })
    setAddedItems(prev => ({
      ...prev,
      [subService.id]: true
    }))
    setTimeout(() => {
      setAddedItems(prev => ({
        ...prev,
        [subService.id]: false
      }))
    }, 2000)
  }

  return (
    <div className="animate-fadeIn">
      {/* Header */}
      <div className="bg-white border-b border-neutral-light">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-secondary hover:text-primary transition-colors mb-4"
          >
            <ChevronLeft size={20} />
            Back to Services
          </button>
        </div>
      </div>

      {/* Hero Section */}
      <section className="text-white py-0 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="relative h-96 rounded-lg overflow-hidden mb-8">
            <img 
              src={getImagePath()} 
              alt={service.name}
              className="w-full h-full object-cover"
              loading="lazy"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent"></div>
            
            {/* Content */}
            <div className="absolute inset-0 flex items-end p-8">
              <div>
                <div className="text-6xl mb-4">{service.image}</div>
                <h1 className="text-4xl font-bold mb-2">{service.name}</h1>
                <div className="flex items-center gap-4 flex-wrap">
                  <div className="flex items-center gap-1">
                    <Star size={20} className="fill-yellow-300 text-yellow-300" />
                    <span className="font-bold">{service.rating}</span>
                    <span className="text-blue-200">({service.reviews} reviews)</span>
                  </div>
                  <div className="text-sm">Starting at ₹{Math.min(...service.subServices.map(s => s.price))}</div>
                </div>
              </div>
            </div>
          </div>

          <p className="text-gray-700 text-lg mb-8">{service.description}</p>
        </div>
      </section>

      {/* Sub-Services Grid */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-primary mb-8">Available Services</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {service.subServices.map(subService => (
              <div key={subService.id} className="card p-6 flex flex-col tile-hover">
                <h3 className="text-lg font-bold text-primary mb-2">{subService.name}</h3>
                <p className="text-gray-600 text-sm mb-4 flex-1">{subService.desc}</p>

                <div className="space-y-3 pt-4 border-t border-neutral-light">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Price</span>
                    <span className="text-2xl font-bold text-accent">₹{subService.price}</span>
                  </div>

                  <div className="flex items-center gap-2 text-gray-600">
                    <Clock size={16} />
                    <span className="text-sm">~{subService.duration} minutes</span>
                  </div>

                  <button
                    onClick={() => handleAddToCart(subService)}
                    className={`w-full py-2 rounded-lg font-medium transition-all ${
                      addedItems[subService.id]
                        ? 'bg-green-500 text-white'
                        : 'bg-accent text-white hover:bg-red-600'
                    }`}
                  >
                    {addedItems[subService.id] ? '✓ Added to Cart' : '+ Add to Cart'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Description */}
      <section className="bg-neutral py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-primary mb-8">Why Choose Our Service?</h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {service.features.map((feature, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <span className="text-accent text-2xl">✓</span>
                <span className="text-gray-700">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-white py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Book?</h2>
          <p className="text-blue-100 mb-6">Select services and proceed to checkout</p>
          <button
            onClick={() => setCartOpen(true)}
            className="bg-accent text-white px-8 py-3 rounded-lg font-bold hover:bg-red-600 transition-colors"
          >
            View Cart & Checkout
          </button>
        </div>
      </section>
    </div>
  )
}
