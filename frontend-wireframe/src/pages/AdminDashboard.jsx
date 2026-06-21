import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'
import { LogOut, Settings, TrendingUp, Users, Package, DollarSign, Star, MapPin } from 'lucide-react'
import { BarChart, Bar, PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const STATS = [
  { label: 'Total Orders', value: '2,847', icon: Package, color: 'bg-blue-100', iconColor: 'text-blue-600' },
  { label: 'This Month', value: '342', icon: TrendingUp, color: 'bg-green-100', iconColor: 'text-green-600' },
  { label: 'Pending', value: '23', icon: Package, color: 'bg-yellow-100', iconColor: 'text-yellow-600' },
  { label: 'Revenue', value: '₹8,94,500', icon: DollarSign, color: 'bg-purple-100', iconColor: 'text-purple-600' },
  { label: 'Avg Rating', value: '4.7/5', icon: Star, color: 'bg-orange-100', iconColor: 'text-orange-600' },
  { label: 'Technicians', value: '145', icon: Users, color: 'bg-pink-100', iconColor: 'text-pink-600' },
]

const ORDERS_BY_TYPE = [
  { name: 'AC', value: 35 },
  { name: 'WM', value: 25 },
  { name: 'TV', value: 15 },
  { name: 'Other', value: 25 }
]

const MONTHLY_REVENUE = [
  { month: 'Jan', revenue: 45000 },
  { month: 'Feb', revenue: 52000 },
  { month: 'Mar', revenue: 68000 },
  { month: 'Apr', revenue: 75000 }
]

const TECHNICIANS = [
  { rank: 1, name: 'Suresh', rating: 4.9, orders: 287 },
  { rank: 2, name: 'Priya', rating: 4.8, orders: 264 },
  { rank: 3, name: 'Amit', rating: 4.6, orders: 218 },
  { rank: 4, name: 'Neha', rating: 4.5, orders: 195 }
]

const RECENT_ORDERS = [
  { id: 'ORD2847', customer: 'R. Kumar', service: 'AC Filter', amount: '₹299', status: 'Completed' },
  { id: 'ORD2846', customer: 'P. Gupta', service: 'WM Service', amount: '₹1,899', status: 'In Progress' },
  { id: 'ORD2845', customer: 'M. Singh', service: 'TV Repair', amount: '₹2,499', status: 'Pending' },
  { id: 'ORD2844', customer: 'S. Verma', service: 'Geyser Fix', amount: '₹799', status: 'Cancelled' }
]

const COLORS = ['#4A90E2', '#FF6B6B', '#1E3A5F', '#F5B041']

export default function AdminDashboard() {
  const navigate = useNavigate()
  const { user, logout } = useAppContext()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  if (!user || user.type !== 'admin') {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 text-center">
        <p className="text-lg text-gray-600 mb-4">Admin access required</p>
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
        {/* Header */}
        <div className="card p-6 mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-primary">Admin Dashboard</h1>
            <p className="text-gray-600">Welcome back, {user.name}</p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2 border border-neutral-light rounded-lg hover:bg-neutral-light transition-colors">
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

        {/* Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {STATS.map((stat, idx) => {
            const Icon = stat.icon
            return (
              <div key={idx} className="card p-6 flex items-start gap-4 hover:shadow-lg transition-shadow">
                <div className={`${stat.color} p-4 rounded-lg`}>
                  <Icon size={24} className={stat.iconColor} />
                </div>
                <div className="flex-1">
                  <p className="text-gray-600 text-sm">{stat.label}</p>
                  <p className="text-2xl font-bold text-primary">{stat.value}</p>
                </div>
              </div>
            )
          })}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Orders by Type (Pie) */}
          <div className="card p-6">
            <h3 className="font-bold text-lg text-primary mb-4">Orders by Type</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={ORDERS_BY_TYPE} cx="50%" cy="50%" labelLine={false} label={({ name, value }) => `${name} ${value}%`} outerRadius={80} fill="#8884d8" dataKey="value">
                  {ORDERS_BY_TYPE.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Monthly Revenue (Line) */}
          <div className="card p-6">
            <h3 className="font-bold text-lg text-primary mb-4">Monthly Revenue</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={MONTHLY_REVENUE}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="revenue" stroke="#4A90E2" strokeWidth={3} dot={{ fill: '#FF6B6B', r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Technician Performance */}
          <div className="card p-6">
            <h3 className="font-bold text-lg text-primary mb-4">Top Technicians</h3>
            <div className="space-y-3">
              {TECHNICIANS.map(tech => (
                <div key={tech.rank} className="flex items-center justify-between p-3 hover:bg-neutral rounded-lg transition-colors">
                  <div className="flex items-center gap-3 flex-1">
                    <div className="w-8 h-8 bg-secondary text-white rounded-full flex items-center justify-center font-bold text-sm">
                      {tech.rank}
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-text">{tech.name}</p>
                      <p className="text-xs text-gray-600">{tech.orders} orders completed</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-accent">{tech.rating}/5</p>
                    <p className="text-xs text-gray-600">⭐ Rating</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Location Analytics */}
          <div className="card p-6">
            <h3 className="font-bold text-lg text-primary mb-4 flex items-center gap-2">
              <MapPin size={20} className="text-secondary" />
              Orders by Location
            </h3>
            <div className="space-y-4">
              {[
                { city: 'Delhi', percentage: 45 },
                { city: 'Bangalore', percentage: 30 },
                { city: 'Mumbai', percentage: 25 }
              ].map(loc => (
                <div key={loc.city}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-semibold text-text">{loc.city}</span>
                    <span className="text-sm font-bold text-secondary">{loc.percentage}%</span>
                  </div>
                  <div className="w-full bg-neutral-light rounded-full h-2">
                    <div
                      className="bg-secondary rounded-full h-2 transition-all"
                      style={{ width: `${loc.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="card p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-lg text-primary">Recent Orders</h3>
            <button className="text-secondary hover:text-primary text-sm font-semibold transition-colors">
              View All Orders →
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-neutral border-b border-neutral-light">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-bold text-gray-600">Order ID</th>
                  <th className="px-4 py-3 text-left text-sm font-bold text-gray-600">Customer</th>
                  <th className="px-4 py-3 text-left text-sm font-bold text-gray-600">Service</th>
                  <th className="px-4 py-3 text-left text-sm font-bold text-gray-600">Amount</th>
                  <th className="px-4 py-3 text-left text-sm font-bold text-gray-600">Status</th>
                </tr>
              </thead>
              <tbody>
                {RECENT_ORDERS.map(order => (
                  <tr key={order.id} className="border-b border-neutral-light hover:bg-neutral transition-colors">
                    <td className="px-4 py-3 text-sm font-semibold text-secondary">{order.id}</td>
                    <td className="px-4 py-3 text-sm text-text">{order.customer}</td>
                    <td className="px-4 py-3 text-sm text-text">{order.service}</td>
                    <td className="px-4 py-3 text-sm font-bold text-accent">{order.amount}</td>
                    <td className="px-4 py-3 text-sm">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        order.status === 'Completed'
                          ? 'bg-green-100 text-green-700'
                          : order.status === 'In Progress'
                          ? 'bg-blue-100 text-blue-700'
                          : order.status === 'Pending'
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-red-100 text-red-700'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Management Sections */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {['Services', 'Technicians', 'Bookings', 'Customers', 'Reports'].map(section => (
            <button
              key={section}
              className="card p-6 text-center hover:shadow-lg transition-all hover:scale-105"
            >
              <h3 className="font-bold text-primary">{section}</h3>
              <p className="text-sm text-gray-600 mt-2">Manage {section.toLowerCase()}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
