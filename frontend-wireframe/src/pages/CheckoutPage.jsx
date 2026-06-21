import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MapPin, Calendar, CreditCard, AlertCircle } from 'lucide-react'
import { useAppContext } from '../context/AppContext'

export default function CheckoutPage() {
  const navigate = useNavigate()
  const { cartItems } = useAppContext()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    pincode: '',
    date: '',
    timeSlot: '15:00',
    paymentMethod: 'card'
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleNextStep = () => {
    if (step < 4) setStep(step + 1)
  }

  const handlePrevStep = () => {
    if (step > 1) setStep(step - 1)
  }

  const handleProceedToPayment = () => {
    navigate('/payment')
  }

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price || 0), 0)
  const tax = subtotal * 0.18
  const total = subtotal + tax

  if (cartItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-bold text-primary mb-4">Your cart is empty</h2>
        <button
          onClick={() => navigate('/')}
          className="btn-primary"
        >
          Continue Shopping
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 animate-fadeIn">
      <h1 className="text-4xl font-bold text-primary mb-8">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Step 1: Delivery Address */}
          <div className={`card p-6 ${step !== 1 && 'opacity-60'}`}>
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-white ${step >= 1 ? 'bg-secondary' : 'bg-gray-400'}`}>
                1
              </div>
              <h2 className="text-xl font-bold text-primary">Delivery Address</h2>
            </div>

            {step >= 1 && (
              <div className="space-y-4">
                <div className="flex gap-4">
                  <button className="flex-1 py-2 px-4 border-2 border-secondary text-secondary rounded-lg font-medium hover:bg-secondary hover:text-white transition-colors">
                    📍 Use Current Location
                  </button>
                  <button className="flex-1 py-2 px-4 border-2 border-neutral-light text-text rounded-lg font-medium hover:border-secondary transition-colors">
                    Manual Entry
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="col-span-2 px-4 py-2 border border-neutral-light rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                  />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="px-4 py-2 border border-neutral-light rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="px-4 py-2 border border-neutral-light rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                  />
                </div>

                <input
                  type="text"
                  name="address"
                  placeholder="Full Address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-neutral-light rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                />

                <div className="grid grid-cols-3 gap-4">
                  <input
                    type="text"
                    name="city"
                    placeholder="City"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="px-4 py-2 border border-neutral-light rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                  />
                  <input
                    type="text"
                    name="pincode"
                    placeholder="Pincode"
                    value={formData.pincode}
                    onChange={handleInputChange}
                    className="px-4 py-2 border border-neutral-light rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                  />
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="saveAddress"
                      className="w-4 h-4"
                    />
                    <label htmlFor="saveAddress" className="ml-2 text-sm text-gray-600">Save as default</label>
                  </div>
                </div>

                {step === 1 && (
                  <button
                    onClick={handleNextStep}
                    className="btn-primary w-full"
                  >
                    Continue to Date & Time
                  </button>
                )}
              </div>
            )}

            {step > 1 && (
              <p className="text-sm text-gray-600 flex items-center gap-2">
                <MapPin size={16} />
                {formData.address ? formData.address.substring(0, 40) + '...' : 'Address pending'}
              </p>
            )}
          </div>

          {/* Step 2: Date & Time */}
          <div className={`card p-6 ${step !== 2 && 'opacity-60'}`}>
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-white ${step >= 2 ? 'bg-secondary' : 'bg-gray-400'}`}>
                2
              </div>
              <h2 className="text-xl font-bold text-primary">Service Date & Time</h2>
            </div>

            {step >= 2 && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Date</label>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-neutral-light rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Select Time Slot</label>
                  <div className="space-y-2">
                    {['09:00', '12:00', '15:00', '18:00'].map(time => (
                      <label key={time} className="flex items-center">
                        <input
                          type="radio"
                          name="timeSlot"
                          value={time}
                          checked={formData.timeSlot === time}
                          onChange={handleInputChange}
                          className="w-4 h-4"
                        />
                        <span className="ml-3 text-sm text-gray-700">
                          {time === '09:00' && '09:00 AM - 12:00 PM'}
                          {time === '12:00' && '12:00 PM - 03:00 PM'}
                          {time === '15:00' && '03:00 PM - 06:00 PM'}
                          {time === '18:00' && '06:00 PM - 09:00 PM'}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {step === 2 && (
                  <div className="flex gap-4">
                    <button
                      onClick={handlePrevStep}
                      className="btn-outline flex-1"
                    >
                      Back
                    </button>
                    <button
                      onClick={handleNextStep}
                      className="btn-primary flex-1"
                    >
                      Continue to Payment
                    </button>
                  </div>
                )}
              </div>
            )}

            {step > 2 && (
              <p className="text-sm text-gray-600 flex items-center gap-2">
                <Calendar size={16} />
                {formData.date} at {formData.timeSlot}
              </p>
            )}
          </div>

          {/* Step 3: Payment Method */}
          <div className={`card p-6 ${step !== 3 && 'opacity-60'}`}>
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-white ${step >= 3 ? 'bg-secondary' : 'bg-gray-400'}`}>
                3
              </div>
              <h2 className="text-xl font-bold text-primary">Payment Method</h2>
            </div>

            {step >= 3 && (
              <div className="space-y-3">
                {[
                  { id: 'card', label: 'Credit/Debit Card' },
                  { id: 'upi', label: 'UPI (Google Pay, PhonePe, PayTM)' },
                  { id: 'wallet', label: 'Wallet' },
                  { id: 'netbanking', label: 'Net Banking' },
                  { id: 'cash', label: 'Cash on Service' }
                ].map(method => (
                  <label key={method.id} className="flex items-center p-3 border border-neutral-light rounded-lg hover:border-secondary cursor-pointer transition-colors">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={method.id}
                      checked={formData.paymentMethod === method.id}
                      onChange={handleInputChange}
                      className="w-4 h-4"
                    />
                    <span className="ml-3 text-gray-700">{method.label}</span>
                  </label>
                ))}

                {step === 3 && (
                  <div className="flex gap-4 pt-4">
                    <button
                      onClick={handlePrevStep}
                      className="btn-outline flex-1"
                    >
                      Back
                    </button>
                    <button
                      onClick={handleNextStep}
                      className="btn-primary flex-1"
                    >
                      Review Order
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Step 4: Order Summary */}
          <div className={`card p-6 ${step !== 4 && 'opacity-60'}`}>
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-white ${step >= 4 ? 'bg-secondary' : 'bg-gray-400'}`}>
                4
              </div>
              <h2 className="text-xl font-bold text-primary">Order Summary</h2>
            </div>

            {step >= 4 && (
              <div className="space-y-4">
                <div className="bg-neutral p-4 rounded-lg">
                  {cartItems.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between py-2 border-b border-neutral-light last:border-0">
                      <div>
                        <p className="font-semibold text-sm text-primary">{item.serviceName}</p>
                        <p className="text-xs text-gray-600">{item.subServiceName}</p>
                      </div>
                      <p className="font-bold text-accent">₹{item.price}</p>
                    </div>
                  ))}
                </div>

                {step === 4 && (
                  <div className="flex gap-4">
                    <button
                      onClick={handlePrevStep}
                      className="btn-outline flex-1"
                    >
                      Back
                    </button>
                    <button
                      onClick={handleProceedToPayment}
                      className="btn-primary flex-1"
                    >
                      Confirm & Proceed to Payment
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Sidebar - Order Summary */}
        <div className="h-fit card p-6 bg-neutral sticky top-20">
          <h3 className="text-xl font-bold text-primary mb-4">Order Total</h3>

          <div className="space-y-3 mb-6">
            {cartItems.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between text-sm">
                <span className="text-gray-600">{item.subServiceName}</span>
                <span className="font-semibold">₹{item.price}</span>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-300 pt-4 space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-semibold">₹{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Tax (18%)</span>
              <span className="font-semibold">₹{tax.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Delivery</span>
              <span className="font-semibold text-green-600">Free</span>
            </div>
          </div>

          <div className="border-t border-gray-300 mt-4 pt-4">
            <div className="flex items-center justify-between">
              <span className="font-bold text-primary">Total</span>
              <span className="text-3xl font-bold text-accent">₹{total.toFixed(2)}</span>
            </div>
          </div>

          <div className="mt-4 p-3 bg-blue-100 border border-secondary rounded-lg flex gap-2">
            <AlertCircle size={16} className="text-secondary flex-shrink-0 mt-0.5" />
            <p className="text-xs text-secondary">Complete all steps before proceeding to payment</p>
          </div>
        </div>
      </div>
    </div>
  )
}
