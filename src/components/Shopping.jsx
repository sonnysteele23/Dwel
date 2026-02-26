import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ShoppingCart, Package, Clock, RotateCcw, ChevronRight, Plus, Minus, Trash2,
  Search, Filter, Star, Truck, AlertCircle, CheckCircle2, Bell, Heart,
  ArrowLeft, X, ShoppingBag, MapPin, CreditCard, FileText, BarChart3,
  RefreshCw, Zap, Users, ChevronDown, ExternalLink, Mic
} from 'lucide-react'
import theme from '../theme'

// ─── Mock Data ─────────────────────────────────────────────────
const careRecipient = {
  name: 'Robert Chen',
  initials: 'RC',
  relationship: 'Father',
  address: '123 Oak Street, Apt 4B, Boston, MA 02101',
}

const connectedServices = [
  {
    id: 'instacart',
    name: 'Instacart',
    category: 'Grocery',
    icon: '🥕',
    tagColor: 'bg-green-100 text-green-700',
    connected: true,
    deliveryEta: '2 hours',
    fee: 3.99,
  },
  {
    id: 'uber',
    name: 'Uber',
    category: 'Transport',
    icon: 'U',
    tagColor: 'bg-gray-900 text-white',
    connected: true,
    deliveryEta: '15 min',
    fee: 0,
  },
  {
    id: 'amazon',
    name: 'Amazon',
    category: 'Shopping',
    icon: 'a',
    tagColor: 'bg-orange-100 text-orange-700',
    connected: true,
    deliveryEta: 'Next day',
    fee: 0,
  },
  {
    id: 'cvs',
    name: 'CVS',
    category: 'Pharmacy',
    icon: 'C',
    tagColor: 'bg-purple-100 text-purple-700',
    connected: true,
    deliveryEta: 'Same day',
    fee: 4.99,
  },
]

const savedLists = [
  {
    id: 'weekly-essentials',
    name: "Dad's Weekly Essentials",
    items: 15,
    lastOrdered: '3 days ago',
    service: 'instacart',
    autoReorder: true,
    nextAuto: 'Tomorrow',
  },
  {
    id: 'medical-supplies',
    name: 'Medical Supplies',
    items: 8,
    lastOrdered: '2 weeks ago',
    service: 'amazon',
    autoReorder: false,
  },
  {
    id: 'heart-healthy',
    name: 'Heart-Healthy Groceries',
    items: 12,
    lastOrdered: '5 days ago',
    service: 'instacart',
    autoReorder: true,
    nextAuto: 'Friday',
  },
]

const suggestedItems = [
  { id: 1, name: 'Weekly Pill Organizer', category: 'Medical', price: 12.99, service: 'amazon', icon: '💊', runningLow: true },
  { id: 2, name: 'Blood Pressure Monitor', category: 'Medical', price: 34.99, service: 'amazon', icon: '🩺', runningLow: false },
  { id: 3, name: 'Heart-Healthy Meal Kit', category: 'Grocery', price: 42.99, service: 'instacart', icon: '❤️', runningLow: false },
  { id: 4, name: 'Fresh Produce Selection', category: 'Grocery', price: 28.50, service: 'instacart', icon: '🥬', runningLow: true },
  { id: 5, name: 'Mobility Grip Socks (3-pack)', category: 'Medical', price: 15.99, service: 'amazon', icon: '🧦', runningLow: false },
  { id: 6, name: 'Ensure Nutrition Shake (12pk)', category: 'Grocery', price: 24.99, service: 'instacart', icon: '🥤', runningLow: true },
  { id: 7, name: 'Emergency Alert Device', category: 'Medical', price: 89.99, service: 'amazon', icon: '🚨', runningLow: false },
  { id: 8, name: 'Prescription Refill - Lisinopril', category: 'Pharmacy', price: 15.00, service: 'cvs', icon: '💊', runningLow: true },
]

const orderHistory = [
  { id: 'ORD-1041', service: 'instacart', items: 12, total: 67.84, status: 'delivered', date: '2 days ago', rating: 5 },
  { id: 'ORD-1038', service: 'amazon', items: 3, total: 52.97, status: 'in-transit', date: '3 days ago', eta: 'Tomorrow by 5pm' },
  { id: 'ORD-1035', service: 'cvs', items: 2, total: 34.50, status: 'delivered', date: '1 week ago', rating: 4 },
  { id: 'ORD-1029', service: 'instacart', items: 15, total: 89.23, status: 'delivered', date: '1 week ago', rating: 5 },
  { id: 'ORD-1024', service: 'uber', items: 1, total: 18.50, status: 'delivered', date: '2 weeks ago', rating: 4 },
]

const inventoryAlerts = [
  { item: 'Pill Organizer', daysLeft: 2, severity: 'urgent' },
  { item: 'Ensure Nutrition Shakes', daysLeft: 5, severity: 'warning' },
  { item: 'Fresh Produce', daysLeft: 3, severity: 'urgent' },
  { item: 'Lisinopril (Prescription)', daysLeft: 7, severity: 'warning' },
]

// ─── Sub-Components ────────────────────────────────────────────

function StatusBadge({ status }) {
  const config = {
    delivered: { bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-200', label: 'Delivered', icon: CheckCircle2 },
    'in-transit': { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200', label: 'In Transit', icon: Truck },
    processing: { bg: 'bg-yellow-50', text: 'text-yellow-700', border: 'border-yellow-200', label: 'Processing', icon: Clock },
    failed: { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200', label: 'Failed', icon: AlertCircle },
  }
  const c = config[status] || config.processing
  const Icon = c.icon
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${c.bg} ${c.text} border ${c.border}`}>
      <Icon size={12} />
      {c.label}
    </span>
  )
}

function ServiceIcon({ service, size = 'md' }) {
  const s = connectedServices.find(cs => cs.id === service)
  if (!s) return null
  const sizeClass = size === 'sm' ? 'w-7 h-7 text-xs' : 'w-10 h-10 text-sm'
  return (
    <div className={`${sizeClass} rounded-lg flex items-center justify-center font-bold ${s.tagColor}`}>
      {s.icon}
    </div>
  )
}

// ─── Main Component ────────────────────────────────────────────

export default function Shopping() {
  const navigate = useNavigate()
  const [activeView, setActiveView] = useState('overview') // overview | browse | cart | history | lists | inventory
  const [cart, setCart] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedService, setSelectedService] = useState('all')
  const [showCheckout, setShowCheckout] = useState(false)
  const [approvalRequired, setApprovalRequired] = useState(true)
  const [notifyCaregiver, setNotifyCaregiver] = useState(true)

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0)
  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0)

  function addToCart(item) {
    setCart(prev => {
      const existing = prev.find(c => c.id === item.id)
      if (existing) return prev.map(c => c.id === item.id ? { ...c, qty: c.qty + 1 } : c)
      return [...prev, { ...item, qty: 1 }]
    })
  }

  function updateQty(id, delta) {
    setCart(prev =>
      prev.map(c => c.id === id ? { ...c, qty: Math.max(0, c.qty + delta) } : c).filter(c => c.qty > 0)
    )
  }

  function removeFromCart(id) {
    setCart(prev => prev.filter(c => c.id !== id))
  }

  const filteredItems = suggestedItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesService = selectedService === 'all' || item.service === selectedService
    return matchesSearch && matchesService
  })

  // ─── Navigation Tabs ──────────────────────────────────────
  const tabs = [
    { id: 'overview', label: 'Overview', icon: ShoppingBag },
    { id: 'browse', label: 'Browse & Order', icon: Search },
    { id: 'lists', label: 'Saved Lists', icon: FileText },
    { id: 'history', label: 'Order History', icon: Clock },
    { id: 'inventory', label: 'Inventory', icon: BarChart3 },
  ]

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <ShoppingCart size={28} className="text-dwel-teal" />
            Shopping & Orders
          </h1>
          <p className="text-gray-500 mt-1">
            Order groceries, supplies, and medications for {careRecipient.name}
          </p>
        </div>
        <div className="flex items-center gap-3">
          {/* Voice Order Button */}
          <button className="flex items-center gap-2 px-4 py-2.5 bg-dwel-teal-light text-dwel-teal rounded-lg hover:bg-dwel-teal hover:text-white transition-colors font-medium text-sm">
            <Mic size={16} />
            Voice Order
          </button>
          {/* Cart Button */}
          <button
            onClick={() => setActiveView('cart')}
            className="relative flex items-center gap-2 px-4 py-2.5 bg-dwel-teal text-white rounded-lg hover:bg-dwel-teal-dark transition-colors font-medium text-sm"
          >
            <ShoppingCart size={16} />
            Cart
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Delivery To Banner */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-dwel-teal-light rounded-full flex items-center justify-center text-sm font-semibold text-dwel-teal">
            {careRecipient.initials}
          </div>
          <div>
            <div className="text-sm font-medium text-gray-900">Delivering to {careRecipient.name} <span className="text-gray-400">({careRecipient.relationship})</span></div>
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <MapPin size={12} />
              {careRecipient.address}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
            <input
              type="checkbox"
              checked={notifyCaregiver}
              onChange={() => setNotifyCaregiver(!notifyCaregiver)}
              className="rounded border-gray-300 text-dwel-teal focus:ring-dwel-teal"
            />
            <Bell size={14} />
            Notify me on delivery
          </label>
          <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
            <input
              type="checkbox"
              checked={approvalRequired}
              onChange={() => setApprovalRequired(!approvalRequired)}
              className="rounded border-gray-300 text-dwel-teal focus:ring-dwel-teal"
            />
            <CheckCircle2 size={14} />
            Require my approval
          </label>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 bg-gray-100 rounded-lg p-1 w-fit">
        {tabs.map(tab => {
          const Icon = tab.icon
          return (
            <button
              key={tab.id}
              onClick={() => setActiveView(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeView === tab.id
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Icon size={16} />
              {tab.label}
            </button>
          )
        })}
      </div>

      {/* ─── OVERVIEW VIEW ─────────────────────────────────── */}
      {activeView === 'overview' && (
        <div className="space-y-6">
          {/* Inventory Alerts */}
          {inventoryAlerts.length > 0 && (
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
              <h3 className="flex items-center gap-2 text-sm font-semibold text-amber-800 mb-3">
                <AlertCircle size={16} />
                Inventory Alerts — Running Low
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {inventoryAlerts.map((alert, i) => (
                  <div key={i} className="flex items-center justify-between bg-white rounded-lg p-3 border border-amber-100">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{alert.item}</div>
                      <div className={`text-xs ${alert.severity === 'urgent' ? 'text-red-600' : 'text-amber-600'}`}>
                        ~{alert.daysLeft} days remaining
                      </div>
                    </div>
                    <button
                      onClick={() => { addToCart(suggestedItems.find(s => s.name.includes(alert.item.split(' ')[0])) || suggestedItems[0]); }}
                      className="px-3 py-1.5 text-xs font-medium text-dwel-teal bg-dwel-teal-light rounded-lg hover:bg-dwel-teal hover:text-white transition-colors"
                    >
                      Reorder
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Connected Services */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Connected Services</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {connectedServices.map(service => (
                <button
                  key={service.id}
                  onClick={() => { setSelectedService(service.id); setActiveView('browse'); }}
                  className="bg-white rounded-xl border border-gray-200 p-4 text-left hover:border-dwel-teal hover:shadow-md transition-all group"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold ${service.tagColor}`}>
                      {service.icon}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 text-sm">{service.name}</div>
                      <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${service.tagColor}`}>
                        {service.category}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <Truck size={12} />
                      {service.deliveryEta}
                    </span>
                    {service.fee > 0 && <span>${service.fee.toFixed(2)} fee</span>}
                    {service.fee === 0 && <span className="text-green-600">Free delivery</span>}
                  </div>
                  <div className="mt-3 flex items-center gap-1 text-xs text-dwel-teal font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    Browse items <ChevronRight size={12} />
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Quick Actions & Saved Lists side by side */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Quick Reorder */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <RotateCcw size={18} />
                Quick Reorder
              </h3>
              <div className="space-y-3">
                {orderHistory.slice(0, 3).map(order => {
                  const service = connectedServices.find(s => s.id === order.service)
                  return (
                    <div key={order.id} className="bg-white rounded-xl border border-gray-200 p-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <ServiceIcon service={order.service} />
                        <div>
                          <div className="text-sm font-medium text-gray-900">{service?.name} — {order.items} items</div>
                          <div className="text-xs text-gray-500">${order.total.toFixed(2)} • {order.date}</div>
                        </div>
                      </div>
                      <button className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-dwel-teal bg-dwel-teal-light rounded-lg hover:bg-dwel-teal hover:text-white transition-colors">
                        <RefreshCw size={14} />
                        Reorder
                      </button>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Saved Lists */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <FileText size={18} />
                Saved Lists
              </h3>
              <div className="space-y-3">
                {savedLists.map(list => (
                  <div key={list.id} className="bg-white rounded-xl border border-gray-200 p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <ServiceIcon service={list.service} size="sm" />
                      <div>
                        <div className="text-sm font-medium text-gray-900">{list.name}</div>
                        <div className="text-xs text-gray-500">
                          {list.items} items • Last: {list.lastOrdered}
                          {list.autoReorder && (
                            <span className="ml-2 inline-flex items-center gap-1 text-dwel-teal">
                              <Zap size={10} />
                              Auto: {list.nextAuto}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <button className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-white bg-dwel-teal rounded-lg hover:bg-dwel-teal-dark transition-colors">
                      <Package size={14} />
                      Order
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Orders */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <Clock size={18} />
                Recent Orders
              </h3>
              <button
                onClick={() => setActiveView('history')}
                className="text-sm text-dwel-teal font-medium hover:underline flex items-center gap-1"
              >
                View all <ChevronRight size={14} />
              </button>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50/50">
                    <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Order</th>
                    <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
                    <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Items</th>
                    <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                    <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {orderHistory.map(order => {
                    const service = connectedServices.find(s => s.id === order.service)
                    return (
                      <tr key={order.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                        <td className="px-5 py-3 font-medium text-gray-900">{order.id}</td>
                        <td className="px-5 py-3">
                          <div className="flex items-center gap-2">
                            <ServiceIcon service={order.service} size="sm" />
                            <span className="text-gray-700">{service?.name}</span>
                          </div>
                        </td>
                        <td className="px-5 py-3 text-gray-600">{order.items}</td>
                        <td className="px-5 py-3 font-medium text-gray-900">${order.total.toFixed(2)}</td>
                        <td className="px-5 py-3"><StatusBadge status={order.status} /></td>
                        <td className="px-5 py-3 text-gray-500">{order.date}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ─── BROWSE VIEW ───────────────────────────────────── */}
      {activeView === 'browse' && (
        <div className="space-y-6">
          {/* Search & Filter Bar */}
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search groceries, medical supplies, medications..."
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-dwel-teal focus:border-transparent"
              />
            </div>
            <div className="relative">
              <select
                value={selectedService}
                onChange={e => setSelectedService(e.target.value)}
                className="appearance-none pl-4 pr-10 py-2.5 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-dwel-teal cursor-pointer"
              >
                <option value="all">All Services</option>
                {connectedServices.map(s => (
                  <option key={s.id} value={s.id}>{s.name}</option>
                ))}
              </select>
              <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Running Low Banner */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-center gap-3">
            <AlertCircle size={18} className="text-amber-600 shrink-0" />
            <span className="text-sm text-amber-800">
              <strong>{careRecipient.name}</strong> may be running low on {inventoryAlerts.length} items based on order history.
            </span>
            <button
              onClick={() => setActiveView('inventory')}
              className="ml-auto text-sm font-medium text-amber-700 hover:underline whitespace-nowrap"
            >
              View Inventory →
            </button>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredItems.map(item => {
              const inCart = cart.find(c => c.id === item.id)
              const service = connectedServices.find(s => s.id === item.service)
              return (
                <div key={item.id} className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md hover:border-dwel-teal/30 transition-all">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-2xl">
                        {item.icon}
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 text-sm">{item.name}</h4>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${service?.tagColor}`}>
                            {service?.name}
                          </span>
                          {item.runningLow && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium bg-red-50 text-red-600 border border-red-100">
                              <AlertCircle size={10} />
                              Low
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <div className="text-lg font-bold text-gray-900">${item.price.toFixed(2)}</div>
                    {inCart ? (
                      <div className="flex items-center gap-2">
                        <button onClick={() => updateQty(item.id, -1)} className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
                          <Minus size={14} />
                        </button>
                        <span className="w-8 text-center font-semibold text-sm">{inCart.qty}</span>
                        <button onClick={() => updateQty(item.id, 1)} className="w-8 h-8 rounded-lg bg-dwel-teal-light flex items-center justify-center hover:bg-dwel-teal hover:text-white transition-colors text-dwel-teal">
                          <Plus size={14} />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => addToCart(item)}
                        className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-dwel-teal bg-dwel-teal-light rounded-lg hover:bg-dwel-teal hover:text-white transition-colors"
                      >
                        <Plus size={14} />
                        Add
                      </button>
                    )}
                  </div>
                </div>
              )
            })}
          </div>

          {filteredItems.length === 0 && (
            <div className="bg-white rounded-xl border border-gray-200 p-12 text-center text-gray-400">
              <Search size={32} className="mx-auto mb-3 opacity-40" />
              <p>No items found matching your search</p>
            </div>
          )}
        </div>
      )}

      {/* ─── CART VIEW ─────────────────────────────────────── */}
      {activeView === 'cart' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            {cart.length === 0 ? (
              <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
                <ShoppingCart size={40} className="mx-auto mb-3 text-gray-300" />
                <p className="text-gray-500 mb-4">Your cart is empty</p>
                <button
                  onClick={() => setActiveView('browse')}
                  className="px-5 py-2.5 bg-dwel-teal text-white rounded-lg hover:bg-dwel-teal-dark transition-colors font-medium text-sm"
                >
                  Browse Items
                </button>
              </div>
            ) : (
              cart.map(item => {
                const service = connectedServices.find(s => s.id === item.service)
                return (
                  <div key={item.id} className="bg-white rounded-xl border border-gray-200 p-4 flex items-center gap-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-2xl shrink-0">
                      {item.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-gray-900 text-sm">{item.name}</h4>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${service?.tagColor}`}>
                          {service?.name}
                        </span>
                        <span className="text-xs text-gray-500">
                          <Truck size={10} className="inline mr-1" />
                          {service?.deliveryEta}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2">
                        <button onClick={() => updateQty(item.id, -1)} className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center hover:bg-gray-200">
                          <Minus size={14} />
                        </button>
                        <span className="w-8 text-center font-semibold text-sm">{item.qty}</span>
                        <button onClick={() => updateQty(item.id, 1)} className="w-8 h-8 rounded-lg bg-dwel-teal-light flex items-center justify-center hover:bg-dwel-teal hover:text-white text-dwel-teal">
                          <Plus size={14} />
                        </button>
                      </div>
                      <div className="w-20 text-right font-bold text-gray-900 text-sm">${(item.price * item.qty).toFixed(2)}</div>
                      <button onClick={() => removeFromCart(item.id)} className="p-2 hover:bg-red-50 rounded-lg text-gray-400 hover:text-red-500 transition-colors">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                )
              })
            )}
          </div>

          {/* Order Summary */}
          {cart.length > 0 && (
            <div className="bg-white rounded-xl border border-gray-200 p-5 h-fit sticky top-6">
              <h3 className="font-semibold text-gray-900 mb-4">Order Summary</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal ({cartCount} items)</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Delivery fees</span>
                  <span>$3.99</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Dwel service fee</span>
                  <span>$1.99</span>
                </div>
                <div className="border-t border-gray-200 pt-3 flex justify-between font-bold text-gray-900">
                  <span>Total</span>
                  <span>${(cartTotal + 3.99 + 1.99).toFixed(2)}</span>
                </div>
              </div>

              <div className="mt-4 p-3 bg-dwel-teal-light rounded-lg">
                <div className="flex items-center gap-2 text-xs text-dwel-teal font-medium">
                  <MapPin size={12} />
                  Delivering to {careRecipient.name}
                </div>
                <div className="text-xs text-gray-500 mt-1">{careRecipient.address}</div>
              </div>

              {approvalRequired && (
                <div className="mt-3 p-3 bg-amber-50 border border-amber-100 rounded-lg flex items-start gap-2">
                  <CheckCircle2 size={14} className="text-amber-600 mt-0.5 shrink-0" />
                  <span className="text-xs text-amber-700">Approval required — you'll review before the order is placed</span>
                </div>
              )}

              <button
                onClick={() => setShowCheckout(true)}
                className="w-full mt-4 py-3 bg-dwel-teal text-white rounded-lg hover:bg-dwel-teal-dark transition-colors font-semibold text-sm"
              >
                {approvalRequired ? 'Review & Approve Order' : 'Place Order'}
              </button>
              <button
                onClick={() => setActiveView('browse')}
                className="w-full mt-2 py-2.5 text-sm font-medium text-gray-600 hover:text-gray-800 transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          )}
        </div>
      )}

      {/* ─── SAVED LISTS VIEW ──────────────────────────────── */}
      {activeView === 'lists' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-500">Manage recurring orders and templates for {careRecipient.name}</p>
            <button className="flex items-center gap-2 px-4 py-2 bg-dwel-teal text-white rounded-lg hover:bg-dwel-teal-dark transition-colors text-sm font-medium">
              <Plus size={16} />
              Create List
            </button>
          </div>
          {savedLists.map(list => {
            const service = connectedServices.find(s => s.id === list.service)
            return (
              <div key={list.id} className="bg-white rounded-xl border border-gray-200 p-5">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <ServiceIcon service={list.service} />
                    <div>
                      <h4 className="font-semibold text-gray-900">{list.name}</h4>
                      <div className="text-xs text-gray-500 mt-0.5">
                        {list.items} items • via {service?.name} • Last ordered: {list.lastOrdered}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {list.autoReorder && (
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-dwel-teal-light text-dwel-teal">
                        <Zap size={10} />
                        Auto-reorder: {list.nextAuto}
                      </span>
                    )}
                    <button className="px-4 py-2 text-sm font-medium text-white bg-dwel-teal rounded-lg hover:bg-dwel-teal-dark transition-colors">
                      Order Now
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* ─── ORDER HISTORY VIEW ────────────────────────────── */}
      {activeView === 'history' && (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/50">
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Order</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Items</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
                <th className="text-right px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orderHistory.map(order => {
                const service = connectedServices.find(s => s.id === order.service)
                return (
                  <tr key={order.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                    <td className="px-5 py-4 font-medium text-gray-900">{order.id}</td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <ServiceIcon service={order.service} size="sm" />
                        <span className="text-gray-700">{service?.name}</span>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-gray-600">{order.items}</td>
                    <td className="px-5 py-4 font-medium text-gray-900">${order.total.toFixed(2)}</td>
                    <td className="px-5 py-4"><StatusBadge status={order.status} /></td>
                    <td className="px-5 py-4 text-gray-500">{order.date}</td>
                    <td className="px-5 py-4">
                      {order.rating && (
                        <div className="flex items-center gap-1">
                          {[...Array(order.rating)].map((_, i) => (
                            <Star key={i} size={12} className="text-amber-400 fill-amber-400" />
                          ))}
                        </div>
                      )}
                      {order.eta && <span className="text-xs text-blue-600">{order.eta}</span>}
                    </td>
                    <td className="px-5 py-4 text-right">
                      <button className="text-sm text-dwel-teal font-medium hover:underline">Reorder</button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* ─── INVENTORY VIEW ────────────────────────────────── */}
      {activeView === 'inventory' && (
        <div className="space-y-6">
          <p className="text-sm text-gray-500">
            Estimated supply levels based on order frequency and delivery patterns for {careRecipient.name}.
          </p>

          {/* Inventory Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {inventoryAlerts.map((alert, i) => {
              const pct = Math.round((alert.daysLeft / 14) * 100)
              return (
                <div key={i} className="bg-white rounded-xl border border-gray-200 p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-semibold text-gray-900">{alert.item}</h4>
                      <div className={`text-sm ${alert.severity === 'urgent' ? 'text-red-600' : 'text-amber-600'}`}>
                        ~{alert.daysLeft} days remaining
                      </div>
                    </div>
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                      alert.severity === 'urgent' ? 'bg-red-50 text-red-700 border border-red-200' : 'bg-amber-50 text-amber-700 border border-amber-200'
                    }`}>
                      {alert.severity === 'urgent' ? 'Urgent' : 'Warning'}
                    </span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2 mb-3">
                    <div
                      className={`h-2 rounded-full transition-all ${alert.severity === 'urgent' ? 'bg-red-500' : 'bg-amber-500'}`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <div className="flex gap-2">
                    <button className="flex-1 py-2 text-sm font-medium text-white bg-dwel-teal rounded-lg hover:bg-dwel-teal-dark transition-colors">
                      Reorder Now
                    </button>
                    <button className="flex-1 py-2 text-sm font-medium text-dwel-teal bg-dwel-teal-light rounded-lg hover:bg-dwel-teal hover:text-white transition-colors">
                      Set Auto-Reorder
                    </button>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Analytics Preview */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <BarChart3 size={18} />
              Spending Analytics
            </h3>
            <div className="grid grid-cols-4 gap-4">
              {[
                { label: 'This Month', value: '$284.54', change: '+12%', color: 'text-dwel-teal' },
                { label: 'Avg Monthly', value: '$253.20', change: '', color: 'text-gray-900' },
                { label: 'Orders', value: '8', change: '', color: 'text-gray-900' },
                { label: 'Savings', value: '$42.00', change: 'Auto-reorder', color: 'text-green-600' },
              ].map((stat, i) => (
                <div key={i} className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className={`text-xl font-bold ${stat.color}`}>{stat.value}</div>
                  <div className="text-xs text-gray-500 mt-1">{stat.label}</div>
                  {stat.change && <div className="text-xs text-green-600 mt-0.5">{stat.change}</div>}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ─── CHECKOUT MODAL ────────────────────────────────── */}
      {showCheckout && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-2xl">
              <h2 className="text-lg font-semibold text-gray-900">Review & Approve Order</h2>
              <button onClick={() => setShowCheckout(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                <X size={18} className="text-gray-500" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              {/* Recipient Info */}
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-10 h-10 bg-dwel-teal-light rounded-full flex items-center justify-center text-sm font-semibold text-dwel-teal">
                  {careRecipient.initials}
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-900">Delivering to {careRecipient.name}</div>
                  <div className="text-xs text-gray-500">{careRecipient.address}</div>
                </div>
              </div>

              {/* Items */}
              <div className="space-y-2">
                {cart.map(item => (
                  <div key={item.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{item.icon}</span>
                      <span className="text-sm text-gray-700">{item.name} × {item.qty}</span>
                    </div>
                    <span className="text-sm font-medium text-gray-900">${(item.price * item.qty).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="bg-gray-50 rounded-lg p-4 space-y-2 text-sm">
                <div className="flex justify-between text-gray-600"><span>Subtotal</span><span>${cartTotal.toFixed(2)}</span></div>
                <div className="flex justify-between text-gray-600"><span>Delivery</span><span>$3.99</span></div>
                <div className="flex justify-between text-gray-600"><span>Dwel fee</span><span>$1.99</span></div>
                <div className="border-t border-gray-200 pt-2 flex justify-between font-bold text-gray-900">
                  <span>Total</span><span>${(cartTotal + 3.99 + 1.99).toFixed(2)}</span>
                </div>
              </div>

              {/* Notifications */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                  <input type="checkbox" defaultChecked className="rounded border-gray-300 text-dwel-teal focus:ring-dwel-teal" />
                  Send delivery updates to my phone
                </label>
                <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                  <input type="checkbox" defaultChecked className="rounded border-gray-300 text-dwel-teal focus:ring-dwel-teal" />
                  Add to {careRecipient.name}'s care log
                </label>
              </div>

              <button
                onClick={() => {
                  setShowCheckout(false)
                  setCart([])
                  setActiveView('overview')
                }}
                className="w-full py-3 bg-dwel-teal text-white rounded-lg hover:bg-dwel-teal-dark transition-colors font-semibold"
              >
                Approve & Place Order
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
