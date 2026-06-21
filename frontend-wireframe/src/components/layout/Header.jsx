import { Link } from 'react-router-dom'
import { ShoppingCart, MessageCircle, User, Menu, X } from 'lucide-react'
import { useState } from 'react'
import { useAppContext } from '../../context/AppContext'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { user, cartItems, setShowChat, setCartOpen } = useAppContext()

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-neutral-light shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">AS</span>
            </div>
            <span className="hidden sm:inline text-xl font-bold text-primary">Appliance Services</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-text hover:text-secondary transition-colors">Services</Link>
            <Link to="/" className="text-text hover:text-secondary transition-colors">About</Link>
            <Link to="/" className="text-text hover:text-secondary transition-colors">Contact</Link>
          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            {/* Search - Hidden on mobile */}
            <input
              type="text"
              placeholder="Search services..."
              className="hidden sm:block px-4 py-2 rounded-lg bg-neutral border border-neutral-light text-sm focus:outline-none focus:ring-2 focus:ring-secondary"
            />

            {/* Chat Icon */}
            <button
              onClick={() => setShowChat(true)}
              className="p-2 hover:bg-neutral rounded-lg transition-colors relative"
              title="Chat with support"
            >
              <MessageCircle size={20} className="text-secondary" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-green-500 rounded-full"></span>
            </button>

            {/* Cart Icon */}
            <button
              onClick={() => setCartOpen(true)}
              className="p-2 hover:bg-neutral rounded-lg transition-colors relative"
              title="View cart"
            >
              <ShoppingCart size={20} className="text-secondary" />
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-accent text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </button>

            {/* Profile/Login */}
            <Link
              to={user ? '/customer-dashboard' : '/login'}
              className="p-2 hover:bg-neutral rounded-lg transition-colors"
              title="Profile"
            >
              <User size={20} className="text-secondary" />
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 hover:bg-neutral rounded-lg transition-colors"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t border-neutral-light pt-4 animate-slideInLeft">
            <Link to="/" className="block py-2 text-text hover:text-secondary transition-colors">Services</Link>
            <Link to="/" className="block py-2 text-text hover:text-secondary transition-colors">About</Link>
            <Link to="/" className="block py-2 text-text hover:text-secondary transition-colors">Contact</Link>
          </nav>
        )}
      </div>
    </header>
  )
}
