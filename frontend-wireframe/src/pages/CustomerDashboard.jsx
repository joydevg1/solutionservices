import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'
import { LogOut, Settings, MapPin, Phone, Mail, Edit2, Trash2, Plus, Calendar, User, CreditCard, Bell } from 'lucide-react'
import { useState } from 'react'

const DEMO_BOOKINGS = [
  {
    id: 1,
    date: '2026-03-15',
    time: '03:00 PM - 06:00 PM',
    service: 'AC Filter Cleaning',
    status: 'Confirmed',
    technician: 'Suresh Kumar',
    color: 'green'
  },
  {
    id: 2,
    date: '2026-03-20',
    time: '10:00 AM - 12:00 PM',
    service: 'Washing Machine Service',
    status: 'Pending',
    technician: 'Assigned Soon',
    color: 'yellow'
  }
]

const DEMO_ADDRESSES = [
  {
    id: 1,
    label: 'Home',
    address: 'Flat 5B, Maple Tower, Delhi',
    isDefault: true
  },
  {
    id: 2,
    label: 'Office',
    address: 'Tech Park, Sector 5, Noida',
    isDefault: false
  }
]

const DEMO_PAYMENTS = [
  {
    id: 1,
    last4: '4242',
    type: 'card',
    expiry: '12/26',
    isDefault: true
  },
  {
    id: 2,
    label: 'UPI',
    value: 'rajesh@okhdfcbank',
    isDefault: false
  }
]

export default function CustomerDashboard() {
  const navigate = useNavigate()
  const { user, logout } = useAppContext()
  const [activeTab, setActiveTab] = useState('bookings')
  const [editMode, setEditMode] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  if (!user) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 text-center">
        <p className="text-lg text-gray-600 mb-4">Please log in first</p>
        <button
          onClick={() => navigate('/login')}
          className="btn-primary"
        >
          Go to Login
        </button>
      </div>
    )
  }

  return (
    <div className="bg-neutral min-h-screen py-8 animate-fadeIn">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header Section */}
        <div className="card p-6 mb-8 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 bg-gradient-to-br from-secondary to-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
              {user.name?.charAt(0).toUpperCase()}
            </div>
            <div>
              <h1 className="text-3xl font-bold text-primary">{user.name}</h1>
              <p className="text-gray-600">{user.email}</p>
              <p className="text-sm text-gray-500">Customer Account • Member since 2024</p>
            </div>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setEditMode(!editMode)}
              className="flex items-center gap-2 px-4 py-2 border border-neutral-light rounded-lg hover:bg-neutral-light transition-colors"
            >
              <Settings size={18} />
              <span className="hidden sm:inline">Settings</span>
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-accent text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              <LogOut size={18} />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="card mb-8">
          <div className="flex border-b border-neutral-light overflow-x-auto">
            {['bookings', 'addresses', 'payments', 'preferences'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-4 font-semibold transition-colors whitespace-nowrap ${
                  activeTab === tab
                    ? 'border-b-2 border-secondary text-secondary'
                    : 'text-gray-600 hover:text-primary'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div>
          {/* My Bookings Tab */}
          {activeTab === 'bookings' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-primary">My Bookings</h2>
                <button
                  onClick={() => navigate('/')}
                  className="btn-primary"
                >
                  + New Booking
                </button>
              </div>

              <div className="space-y-4">
                {/* Upcoming Bookings */}
                <div className="card p-6">
                  <h3 className="font-bold text-lg text-primary mb-4 flex items-center gap-2">
                    <Calendar size={20} className="text-secondary" />
                    Upcoming Bookings (2)
                  </h3>

                  <div className="space-y-4">
                    {DEMO_BOOKINGS.map(booking => (
                      <div key={booking.id} className="border border-neutral-light rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <p className="text-sm text-gray-600">
                              📅 {new Date(booking.date).toLocaleDateString()} | {booking.time}
                            </p>
                            <h4 className="text-lg font-bold text-primary mt-1">{booking.service}</h4>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                            booking.color === 'green'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-yellow-100 text-yellow-700'
                          }`}>
                            {booking.status}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">Technician: {booking.technician}</p>
                        <div className="flex gap-2">
                          <button className="px-4 py-2 text-sm border border-secondary text-secondary rounded-lg hover:bg-secondary hover:text-white transition-colors">
                            Track
                          </button>
                          <button className="px-4 py-2 text-sm border border-neutral-light text-gray-600 rounded-lg hover:bg-neutral transition-colors">
                            Reschedule
                          </button>
                          <button className="px-4 py-2 text-sm border border-red-200 text-red-600 rounded-lg hover:bg-red-50 transition-colors">
                            Cancel
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <button className="w-full mt-4 py-2 border border-secondary text-secondary rounded-lg hover:bg-secondary hover:text-white transition-colors font-semibold">
                    View Past Bookings
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Saved Addresses Tab */}
          {activeTab === 'addresses' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-primary">Saved Addresses</h2>
                <button className="btn-primary flex items-center gap-2">
                  <Plus size={18} />
                  Add New Address
                </button>
              </div>

              <div className="space-y-4">
                {DEMO_ADDRESSES.map(addr => (
                  <div key={addr.id} className="card p-6 border-l-4 border-l-secondary">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <MapPin size={18} className="text-secondary" />
                          <h3 className="font-bold text-lg text-primary">{addr.label}</h3>
                          {addr.isDefault && (
                            <span className="px-2 py-1 bg-secondary text-white text-xs rounded font-semibold">Default</span>
                          )}
                        </div>
                        <p className="text-gray-600 ml-6">{addr.address}</p>
                      </div>
                      <div className="flex gap-2">
                        <button className="p-2 hover:bg-neutral rounded-lg transition-colors">
                          <Edit2 size={18} className="text-secondary" />
                        </button>
                        <button className="p-2 hover:bg-red-100 rounded-lg transition-colors">
                          <Trash2 size={18} className="text-red-500" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Payment Methods Tab */}
          {activeTab === 'payments' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-primary">Payment Methods</h2>
                <button className="btn-primary flex items-center gap-2">
                  <Plus size={18} />
                  Add Payment Method
                </button>
              </div>

              <div className="space-y-4">
                {DEMO_PAYMENTS.map((payment, idx) => (
                  <div key={idx} className="card p-6 border-l-4 border-l-secondary">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-8 bg-gradient-to-r from-blue-600 to-blue-800 rounded flex items-center justify-center text-white text-sm font-bold">
                          {payment.type === 'card' ? 'CARD' : 'UPI'}
                        </div>
                        <div>
                          {payment.type === 'card' ? (
                            <>
                              <p className="font-bold text-primary">**** **** **** {payment.last4}</p>
                              <p className="text-sm text-gray-600">Exp: {payment.expiry}</p>
                            </>
                          ) : (
                            <>
                              <p className="font-bold text-primary">{payment.label}</p>
                              <p className="text-sm text-gray-600">{payment.value}</p>
                            </>
                          )}
                        </div>
                        {payment.isDefault && (
                          <span className="ml-auto px-2 py-1 bg-green-100 text-green-700 text-xs rounded font-semibold">Default</span>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <button className="p-2 hover:bg-neutral rounded-lg transition-colors">
                          <Edit2 size={18} className="text-secondary" />
                        </button>
                        <button className="p-2 hover:bg-red-100 rounded-lg transition-colors">
                          <Trash2 size={18} className="text-red-500" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Preferences Tab */}
          {activeTab === 'preferences' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-primary mb-6">Preferences</h2>

              <div className="card p-6">
                <h3 className="font-bold text-lg text-primary mb-4 flex items-center gap-2">
                  <Bell size={20} className="text-secondary" />
                  Notification Settings
                </h3>

                <div className="space-y-4">
                  {[
                    { id: 'email', label: 'Email Notifications', enabled: true },
                    { id: 'sms', label: 'SMS Notifications', enabled: true },
                    { id: 'marketing', label: 'Marketing Emails', enabled: true },
                    { id: 'newsletter', label: 'Weekly Newsletter', enabled: false }
                  ].map(pref => (
                    <label key={pref.id} className="flex items-center p-3 border border-neutral-light rounded-lg hover:bg-neutral transition-colors cursor-pointer">
                      <input
                        type="checkbox"
                        defaultChecked={pref.enabled}
                        className="w-4 h-4"
                      />
                      <span className="ml-3 font-medium text-text">{pref.label}</span>
                    </label>
                  ))}
                </div>

                <button className="mt-6 btn-primary">
                  Save Preferences
                </button>
              </div>

              <div className="card p-6">
                <h3 className="font-bold text-lg text-primary mb-4">Account</h3>
                <button className="w-full py-2 px-4 border-2 border-accent text-accent rounded-lg font-semibold hover:bg-accent hover:text-white transition-colors">
                  Change Password
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
