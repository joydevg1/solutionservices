import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'
import { User, Lock, AlertCircle } from 'lucide-react'

export default function LoginPage() {
  const navigate = useNavigate()
  const { login } = useAppContext()
  const [loginType, setLoginType] = useState(null) // null, 'customer', 'admin'
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  })
  const [error, setError] = useState('')

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
    setError('')
  }

  const handleLogin = (e) => {
    e.preventDefault()
    
    // Validation
    if (!formData.email || !formData.password) {
      setError('Please enter email and password')
      return
    }

    if (formData.email.length < 3) {
      setError('Invalid email or ID format')
      return
    }

    // Mock login
    const userData = {
      type: loginType,
      email: formData.email,
      name: formData.email.split('@')[0],
      rememberMe: formData.rememberMe
    }

    login(userData)

    // Redirect based on login type
    setTimeout(() => {
      if (loginType === 'admin') {
        navigate('/admin-dashboard')
      } else {
        navigate('/customer-dashboard')
      }
    }, 500)
  }

  const handleSignUp = () => {
    navigate('/')
  }

  // Login Type Selection Screen
  if (loginType === null) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary to-secondary flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-12">
            <div className="inline-block w-16 h-16 bg-white rounded-lg flex items-center justify-center mb-6">
              <span className="text-3xl font-bold text-primary">AS</span>
            </div>
            <h1 className="text-4xl font-bold text-white mb-2">Appliance Services</h1>
            <p className="text-blue-100">Professional Home Services</p>
          </div>

          <div className="space-y-6 mb-8">
            {/* Customer Login */}
            <button
              onClick={() => setLoginType('customer')}
              className="w-full bg-white rounded-xl p-8 text-center hover:shadow-2xl transition-all transform hover:scale-105"
            >
              <div className="inline-block w-16 h-16 bg-secondary bg-opacity-10 rounded-lg flex items-center justify-center mb-4">
                <User size={32} className="text-secondary" />
              </div>
              <h2 className="text-2xl font-bold text-primary mb-2">Customer Login</h2>
              <p className="text-gray-600 text-sm mb-4">Access your bookings & cart</p>
              <span className="inline-block px-6 py-2 bg-secondary text-white rounded-lg font-semibold">
                Login as Customer
              </span>
            </button>

            {/* Admin Login */}
            <button
              onClick={() => setLoginType('admin')}
              className="w-full bg-white rounded-xl p-8 text-center hover:shadow-2xl transition-all transform hover:scale-105"
            >
              <div className="inline-block w-16 h-16 bg-accent bg-opacity-10 rounded-lg flex items-center justify-center mb-4">
                <Lock size={32} className="text-accent" />
              </div>
              <h2 className="text-2xl font-bold text-primary mb-2">Admin Login</h2>
              <p className="text-gray-600 text-sm mb-4">Manage services & analytics</p>
              <span className="inline-block px-6 py-2 bg-accent text-white rounded-lg font-semibold">
                Login as Admin
              </span>
            </button>
          </div>

          <div className="flex gap-4 justify-center text-white text-sm">
            <button onClick={handleSignUp} className="hover:underline">Sign Up</button>
            <span>•</span>
            <button onClick={() => navigate('/')} className="hover:underline">Guest</button>
          </div>
        </div>
      </div>
    )
  }

  // Login Form Screen
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary to-secondary flex items-center justify-center px-4 py-8 animate-fadeIn">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <button
            onClick={() => setLoginType(null)}
            className="text-white hover:text-blue-200 text-sm mb-4 transition-colors"
          >
            ← Back to Login Type
          </button>
          <h1 className="text-3xl font-bold text-white mb-2">
            {loginType === 'admin' ? 'Admin Login' : 'Customer Login'}
          </h1>
          <p className="text-blue-100">
            {loginType === 'admin' ? 'Manage your services' : 'Access your account'}
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-xl shadow-2xl p-8">
          <form onSubmit={handleLogin} className="space-y-6">
            {/* Email/ID Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {loginType === 'admin' ? 'Admin ID' : 'Email/Phone'}
              </label>
              <input
                type="text"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder={loginType === 'admin' ? 'Enter your admin ID' : 'Enter your email or phone'}
                className="w-full px-4 py-3 border border-neutral-light rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary text-sm"
              />
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Enter your password"
                className="w-full px-4 py-3 border border-neutral-light rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary text-sm"
              />
            </div>

            {/* Remember Me */}
            <label className="flex items-center">
              <input
                type="checkbox"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleInputChange}
                className="w-4 h-4 rounded"
              />
              <span className="ml-2 text-sm text-gray-600">Remember Me</span>
            </label>

            {/* Error Message */}
            {error && (
              <div className="flex gap-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                <AlertCircle size={16} className="text-red-500 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            {/* Sign In Button */}
            <button
              type="submit"
              className={`w-full py-3 rounded-lg font-semibold text-white transition-all ${
                loginType === 'admin'
                  ? 'bg-accent hover:bg-red-600 active:scale-95'
                  : 'bg-secondary hover:bg-blue-600 active:scale-95'
              }`}
            >
              Sign In
            </button>

            {/* Links */}
            <div className="flex items-center justify-between text-sm">
              <button type="button" onClick={() => {}} className="text-secondary hover:text-primary transition-colors">
                Forgot Credentials?
              </button>
            </div>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-neutral-light"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-600">OR</span>
              </div>
            </div>

            {/* Social Login (Customer Only) */}
            {loginType === 'customer' && (
              <div className="space-y-2">
                <button
                  type="button"
                  className="w-full py-2 px-4 border border-neutral-light rounded-lg hover:bg-neutral transition-colors text-sm font-medium"
                >
                  Sign in with Google
                </button>
                <button
                  type="button"
                  className="w-full py-2 px-4 border border-neutral-light rounded-lg hover:bg-neutral transition-colors text-sm font-medium"
                >
                  Sign in with Apple
                </button>
              </div>
            )}

            {/* Warning for Admin */}
            {loginType === 'admin' && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                <p className="text-xs text-yellow-800">
                  ⚠️ This area is restricted to authorized personnel only
                </p>
              </div>
            )}
          </form>

          {/* Sign Up Link (Customer Only) */}
          {loginType === 'customer' && (
            <div className="mt-6 pt-6 border-t border-neutral-light text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{' '}
                <button
                  onClick={handleSignUp}
                  className="text-secondary hover:text-primary font-semibold transition-colors"
                >
                  Sign Up
                </button>
              </p>
            </div>
          )}
        </div>

        {/* Footer Note */}
        <p className="text-center text-blue-100 text-xs mt-6">
          For demo: Use any email and password (min 3 chars)
        </p>
      </div>
    </div>
  )
}
