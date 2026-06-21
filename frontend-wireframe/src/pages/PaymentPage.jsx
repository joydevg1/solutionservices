import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Lock, CheckCircle } from 'lucide-react'
import { useAppContext } from '../context/AppContext'

export default function PaymentPage() {
  const navigate = useNavigate()
  const { cartItems, clearCart } = useAppContext()
  const [paymentStep, setPaymentStep] = useState('processing') // processing, success, failed
  const [cardData, setCardData] = useState({
    cardNumber: '',
    cardName: '',
    expiry: '',
    cvv: ''
  })

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price || 0), 0)
  const tax = subtotal * 0.18
  const total = subtotal + tax

  const handleCardChange = (e) => {
    const { name, value } = e.target
    setCardData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handlePayNow = () => {
    setPaymentStep('processing')
    // Simulate payment processing
    setTimeout(() => {
      const isSuccess = Math.random() > 0.2 // 80% success rate for demo
      setPaymentStep(isSuccess ? 'success' : 'failed')
    }, 3000)
  }

  const handleRetry = () => {
    setPaymentStep('processing')
    setTimeout(() => {
      setPaymentStep('success')
    }, 3000)
  }

  const handleContinueHome = () => {
    clearCart()
    navigate('/')
  }

  if (paymentStep === 'processing') {
    return (
      <div className="max-w-2xl mx-auto px-4 py-12">
        <div className="card p-12 text-center">
          <div className="inline-block mb-6 relative w-16 h-16">
            <div className="absolute inset-0 border-4 border-neutral-light rounded-full"></div>
            <div className="absolute inset-0 border-4 border-transparent border-t-secondary rounded-full animate-spin"></div>
          </div>
          <h2 className="text-3xl font-bold text-primary mb-2">Processing Payment</h2>
          <p className="text-gray-600 mb-6">Please wait while we process your payment securely...</p>
          <p className="text-2xl font-bold text-accent mb-2">₹{total.toFixed(2)}</p>
          <p className="text-sm text-gray-500">Do not close this window</p>
        </div>
      </div>
    )
  }

  if (paymentStep === 'success') {
    return (
      <div className="max-w-2xl mx-auto px-4 py-12 animate-fadeIn">
        <div className="card p-12 text-center">
          <div className="inline-block mb-6">
            <CheckCircle size={80} className="text-green-500" />
          </div>
          <h2 className="text-3xl font-bold text-primary mb-2">Payment Successful!</h2>
          <p className="text-gray-600 mb-8">Your order has been placed successfully</p>

          <div className="bg-neutral p-6 rounded-lg mb-8 text-left">
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">Order ID</p>
              <p className="text-xl font-bold text-primary">#ORD{Math.floor(Math.random() * 100000)}</p>
            </div>
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">Amount Paid</p>
              <p className="text-xl font-bold text-accent">₹{total.toFixed(2)}</p>
            </div>
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">Status</p>
              <span className="inline-block px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                ✓ Confirmed
              </span>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-2">Services Booked</p>
              <div className="space-y-1">
                {cartItems.map((item, idx) => (
                  <p key={idx} className="text-sm text-text">
                    • {item.serviceName} - {item.subServiceName}
                  </p>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border border-secondary rounded-lg p-4 mb-8">
            <p className="text-sm text-secondary mb-2 font-semibold">What's Next?</p>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>✓ You will receive a confirmation SMS</li>
              <li>✓ Technician will arrive at your scheduled time</li>
              <li>✓ Track your booking in "My Bookings"</li>
              <li>✓ Chat support available 24/7</li>
            </ul>
          </div>

          <button
            onClick={handleContinueHome}
            className="btn-primary w-full"
          >
            Back to Home
          </button>
        </div>
      </div>
    )
  }

  if (paymentStep === 'failed') {
    return (
      <div className="max-w-2xl mx-auto px-4 py-12 animate-fadeIn">
        <div className="card p-12 text-center">
          <div className="inline-block mb-6 text-5xl">❌</div>
          <h2 className="text-3xl font-bold text-red-600 mb-2">Payment Failed</h2>
          <p className="text-gray-600 mb-8">We couldn't process your payment. Please try again.</p>

          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8">
            <p className="text-sm text-red-700">
              Transaction declined. Please check your card details and try again, or use a different payment method.
            </p>
          </div>

          <div className="space-y-3">
            <button
              onClick={handleRetry}
              className="btn-primary w-full"
            >
              Retry Payment
            </button>
            <button
              onClick={() => navigate('/checkout')}
              className="btn-outline w-full"
            >
              Back to Checkout
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Default: Payment Form
  return (
    <div className="max-w-2xl mx-auto px-4 py-12 animate-fadeIn">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Payment Form */}
        <div className="md:col-span-2">
          <div className="card p-8">
            <h2 className="text-3xl font-bold text-primary mb-2 flex items-center gap-2">
              <Lock size={24} className="text-secondary" />
              Secure Payment
            </h2>
            <p className="text-gray-600 mb-8">Your payment information is encrypted and secure</p>

            <div className="space-y-6">
              {/* Amount */}
              <div className="bg-gradient-to-r from-primary to-secondary text-white p-6 rounded-lg">
                <p className="text-sm font-medium opacity-90">Amount to Pay</p>
                <p className="text-4xl font-bold">₹{total.toFixed(2)}</p>
              </div>

              {/* Card Details */}
              <div className="space-y-4">
                <h3 className="font-bold text-text">Card Details</h3>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Card Number</label>
                  <input
                    type="text"
                    name="cardNumber"
                    placeholder="1234 5678 9012 3456"
                    value={cardData.cardNumber}
                    onChange={handleCardChange}
                    maxLength="19"
                    className="w-full px-4 py-3 border border-neutral-light rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary font-mono text-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Cardholder Name</label>
                  <input
                    type="text"
                    name="cardName"
                    placeholder="John Doe"
                    value={cardData.cardName}
                    onChange={handleCardChange}
                    className="w-full px-4 py-3 border border-neutral-light rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Date</label>
                    <input
                      type="text"
                      name="expiry"
                      placeholder="MM/YY"
                      value={cardData.expiry}
                      onChange={handleCardChange}
                      maxLength="5"
                      className="w-full px-4 py-3 border border-neutral-light rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">CVV</label>
                    <input
                      type="text"
                      name="cvv"
                      placeholder="123"
                      value={cardData.cvv}
                      onChange={handleCardChange}
                      maxLength="4"
                      className="w-full px-4 py-3 border border-neutral-light rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary font-mono"
                    />
                  </div>
                </div>

                <label className="flex items-center">
                  <input type="checkbox" className="w-4 h-4" />
                  <span className="ml-2 text-sm text-gray-600">Save card for future transactions</span>
                </label>
              </div>

              {/* Buttons */}
              <div className="flex gap-4 pt-6 border-t border-neutral-light">
                <button
                  onClick={() => navigate('/checkout')}
                  className="btn-outline flex-1"
                >
                  Cancel
                </button>
                <button
                  onClick={handlePayNow}
                  className="btn-primary flex-1"
                >
                  Pay ₹{total.toFixed(2)}
                </button>
              </div>

              {/* Security Info */}
              <div className="text-center text-xs text-gray-500">
                🔒 Secured by Stripe • Your payment is safe and encrypted
              </div>
            </div>
          </div>
        </div>

        {/* Order Summary Sidebar */}
        <div className="h-fit card p-6 bg-neutral sticky top-20">
          <h3 className="font-bold text-primary mb-4">Order Summary</h3>

          <div className="space-y-3 mb-6 max-h-48 overflow-y-auto">
            {cartItems.map((item, idx) => (
              <div key={idx} className="text-sm">
                <p className="font-semibold text-text">{item.subServiceName}</p>
                <p className="text-gray-600">{item.serviceName}</p>
                <p className="text-accent font-bold">₹{item.price}</p>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-300 pt-4 space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-semibold">₹{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Tax (18%)</span>
              <span className="font-semibold">₹{tax.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Delivery</span>
              <span className="font-semibold text-green-600">Free</span>
            </div>
          </div>

          <div className="border-t border-gray-300 mt-4 pt-4">
            <div className="flex items-center justify-between">
              <span className="font-bold text-primary">Total</span>
              <span className="text-2xl font-bold text-accent">₹{total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
