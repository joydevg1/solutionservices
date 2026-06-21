import { X, Trash2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useAppContext } from '../../context/AppContext'

export default function CartPanel() {
  const { cartOpen, setCartOpen, cartItems, removeFromCart } = useAppContext()

  if (!cartOpen) return null

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price || 0), 0)
  const tax = subtotal * 0.18
  const total = subtotal + tax

  return (
    <div className="fixed inset-0 z-30 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setCartOpen(false)}
        className="absolute inset-0 bg-black bg-opacity-50"
      ></div>

      {/* Panel */}
      <div className="absolute right-0 top-0 h-full w-full max-w-sm bg-white shadow-lg flex flex-col animate-slideInRight">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-neutral-light">
          <h2 className="text-xl font-bold text-primary">Your Cart</h2>
          <button
            onClick={() => setCartOpen(false)}
            className="p-2 hover:bg-neutral rounded-lg transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {cartItems.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-400 mb-4">Your cart is empty</p>
              <Link
                to="/"
                onClick={() => setCartOpen(false)}
                className="btn-primary inline-block"
              >
                Continue Shopping
              </Link>
            </div>
          ) : (
            cartItems.map(item => (
              <div key={item.id} className="card p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h3 className="font-semibold text-text">{item.serviceName}</h3>
                    <p className="text-sm text-gray-500">{item.subServiceName}</p>
                    <p className="text-sm text-gray-500">Qty: {item.quantity || 1}</p>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="p-2 hover:bg-red-100 rounded-lg transition-colors text-red-500"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-neutral-light">
                  <span className="text-sm text-gray-600">Price</span>
                  <span className="font-bold text-primary">₹{item.price}</span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Summary */}
        {cartItems.length > 0 && (
          <>
            <div className="border-t border-neutral-light p-6 space-y-3">
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
              <div className="border-t border-neutral-light pt-3 flex items-center justify-between">
                <span className="font-bold text-primary">Total</span>
                <span className="text-2xl font-bold text-accent">₹{total.toFixed(2)}</span>
              </div>
            </div>

            {/* Buttons */}
            <div className="p-6 border-t border-neutral-light space-y-3">
              <Link
                to="/checkout"
                onClick={() => setCartOpen(false)}
                className="btn-primary w-full text-center block"
              >
                Proceed to Checkout
              </Link>
              <button
                onClick={() => setCartOpen(false)}
                className="btn-outline w-full"
              >
                Continue Shopping
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
