import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  CalendarDays, Activity, Mic, Plus, Car, ShoppingBag,
  TrendingUp, TrendingDown, Clock, Star, MapPin,
  DollarSign, BarChart3, Zap, Package, AlertCircle, RefreshCw,
  CheckCircle2, Truck, Eye, ChevronRight, Bell, CreditCard,
  Repeat, Settings, FileText
} from 'lucide-react'
import VoiceAssistant from './VoiceAssistant'

// ─── Combined Uber Data (Rides + Eats) ─────────────────────────

const careRecipient = {
  name: 'Robert Chen',
  initials: 'RC',
  relationship: 'Father',
  address: '123 Oak Street, Apt 4B, Boston, MA 02101',
}

// Spending Summary (Uber Eats receipts + Guest Rides receipts)
const spendingData = {
  thisMonth: {
    groceries: 142.07,
    meals: 54.80,
    pharmacy: 34.50,
    rides: 62.00,
    dwelFees: 11.94,
    deliveryFees: 22.45,
    total: 327.76,
  },
  lastMonth: {
    groceries: 128.40,
    meals: 48.20,
    pharmacy: 42.00,
    rides: 47.50,
    total: 266.10,
  },
  voucherBalance: 106.63,
  voucherTotal: 400.00,
  ordersThisMonth: 6,
  ridesThisMonth: 4,
}

// Uber Guest Rides History
const rideHistory = [
  {
    id: 'RIDE-4421',
    date: 'Today, 10:30 AM',
    dateShort: 'Today',
    pickup: '123 Oak Street, Boston',
    dropoff: "Dr. Chen's Office, 450 Brookline Ave",
    distance: '4.2 mi',
    duration: '18 min',
    fare: 18.50,
    surge: false,
    product: 'UberX',
    driver: 'James R.',
    driverRating: 4.9,
    status: 'completed',
    rating: 5,
    scheduled: true,
  },
  {
    id: 'RIDE-4418',
    date: 'Yesterday, 2:15 PM',
    dateShort: 'Yesterday',
    pickup: "Dr. Chen's Office, 450 Brookline Ave",
    dropoff: '123 Oak Street, Boston',
    distance: '4.2 mi',
    duration: '22 min',
    fare: 16.00,
    surge: false,
    product: 'UberX',
    driver: 'Maria L.',
    driverRating: 4.8,
    status: 'completed',
    rating: 5,
    scheduled: false,
  },
  {
    id: 'RIDE-4410',
    date: 'Feb 22, 9:00 AM',
    dateShort: 'Feb 22',
    pickup: '123 Oak Street, Boston',
    dropoff: 'Mass General Hospital',
    distance: '3.8 mi',
    duration: '25 min',
    fare: 15.50,
    surge: false,
    product: 'Uber Comfort',
    driver: 'David K.',
    driverRating: 4.9,
    status: 'completed',
    rating: 4,
    scheduled: true,
  },
  {
    id: 'RIDE-4402',
    date: 'Feb 19, 11:00 AM',
    dateShort: 'Feb 19',
    pickup: '123 Oak Street, Boston',
    dropoff: 'Boston Public Library, Copley',
    distance: '2.1 mi',
    duration: '12 min',
    fare: 12.00,
    surge: false,
    product: 'UberX',
    driver: 'Sarah M.',
    driverRating: 4.7,
    status: 'completed',
    rating: 5,
    scheduled: false,
  },
]

// Recent Uber Eats Orders
const recentOrders = [
  { id: 'UE-8845', merchant: 'Stop & Shop', icon: '🛒', category: 'Grocery', items: 8, total: 41.20, status: 'out_for_delivery', date: '35 min ago', eta: '12 min' },
  { id: 'UE-8841', merchant: 'Stop & Shop', icon: '🛒', category: 'Grocery', items: 12, total: 52.84, status: 'delivered', date: '2 days ago', rating: 5 },
  { id: 'UE-8837', merchant: 'CVS Pharmacy', icon: '💊', category: 'Pharmacy', items: 3, total: 34.50, status: 'delivered', date: '4 days ago', rating: 4 },
  { id: 'UE-8830', merchant: 'Panera Bread', icon: '🥖', category: 'Restaurant', items: 2, total: 22.30, status: 'delivered', date: '1 week ago', rating: 5 },
]

// Active delivery
const activeDelivery = {
  id: 'UE-8845',
  merchant: 'Stop & Shop',
  merchantIcon: '🛒',
  items: 8,
  total: 41.20,
  courierName: 'Marcus T.',
  courierRating: 4.9,
  eta: '12 min',
  progress: 3, // 0-3 for 4 steps
}

// Scheduled rides
const upcomingRides = [
  { id: 'RIDE-4425', date: 'Tomorrow, 9:30 AM', pickup: '123 Oak Street', dropoff: "Dr. Smith's Office", product: 'UberX', estimatedFare: '$16–19' },
  { id: 'RIDE-4430', date: 'Mar 1, 2:00 PM', pickup: '123 Oak Street', dropoff: 'Mass General Hospital', product: 'Uber Comfort', estimatedFare: '$18–22' },
]

// Recurring orders
const recurringOrders = [
  {
    id: 'rec-1',
    name: "Dad's Weekly Essentials",
    merchant: 'Stop & Shop',
    merchantIcon: '🛒',
    items: 12,
    estimatedTotal: 47.30,
    frequency: 'Every Monday',
    nextDelivery: 'Tomorrow',
    status: 'active',
    lastDelivered: '2 days ago',
  },
  {
    id: 'rec-2',
    name: 'Heart-Healthy Groceries',
    merchant: 'Stop & Shop',
    merchantIcon: '🛒',
    items: 8,
    estimatedTotal: 38.90,
    frequency: 'Every Friday',
    nextDelivery: 'Friday',
    status: 'active',
    lastDelivered: '5 days ago',
  },
  {
    id: 'rec-3',
    name: 'Monthly Prescriptions',
    merchant: 'CVS Pharmacy',
    merchantIcon: '💊',
    items: 3,
    estimatedTotal: 34.50,
    frequency: '1st of month',
    nextDelivery: 'Mar 1',
    status: 'active',
    lastDelivered: 'Feb 1',
  },
]

// Inventory alerts
const inventoryAlerts = [
  { item: 'Whole Milk', daysLeft: 2, severity: 'urgent', price: 4.29 },
  { item: 'Bananas', daysLeft: 3, severity: 'urgent', price: 1.29 },
  { item: 'Low Sodium Broth', daysLeft: 4, severity: 'warning', price: 2.99 },
]

// ─── Sub-Components ─────────────────────────────────────────────

function StatusBadge({ status }) {
  const config = {
    completed: { bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-200', label: 'Completed', icon: CheckCircle2 },
    delivered: { bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-200', label: 'Delivered', icon: CheckCircle2 },
    out_for_delivery: { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200', label: 'On the way', icon: Truck },
    in_progress: { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200', label: 'In Progress', icon: Clock },
    scheduled: { bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200', label: 'Scheduled', icon: CalendarDays },
    active: { bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-200', label: 'Active', icon: Zap },
    paused: { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200', label: 'Paused', icon: Clock },
  }
  const c = config[status] || config.completed
  const Icon = c.icon
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium ${c.bg} ${c.text} border ${c.border}`}>
      <Icon size={10} />
      {c.label}
    </span>
  )
}

function SpendingBar({ label, amount, total, color, icon }) {
  const pct = Math.min((amount / total) * 100, 100)
  return (
    <div className="flex items-center gap-3">
      <span className="text-lg w-7 text-center">{icon}</span>
      <div className="flex-1">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs font-medium text-gray-700">{label}</span>
          <span className="text-xs font-bold text-gray-900">${amount.toFixed(2)}</span>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-1.5">
          <div className={`h-1.5 rounded-full ${color}`} style={{ width: `${pct}%` }} />
        </div>
      </div>
    </div>
  )
}

// ─── Main Dashboard ─────────────────────────────────────────────

export default function Dashboard() {
  const navigate = useNavigate()
  const [voiceOpen, setVoiceOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('overview') // overview | rides | spending | recurring

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Activity },
    { id: 'rides', label: 'Rides', icon: Car },
    { id: 'spending', label: 'Spending', icon: DollarSign },
    { id: 'recurring', label: 'Recurring', icon: Repeat },
  ]

  const monthChange = spendingData.thisMonth.total - spendingData.lastMonth.total
  const monthChangePct = ((monthChange / spendingData.lastMonth.total) * 100).toFixed(0)

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Welcome back, Demo</h1>
          <p className="text-gray-500 mt-1">Caring for {careRecipient.name} • All services powered by Uber</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setVoiceOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-dwel-teal-light text-dwel-teal rounded-lg hover:bg-dwel-teal hover:text-white transition-colors font-medium text-sm"
          >
            <Mic size={16} />
            Voice Assistant
          </button>
          <button
            onClick={() => navigate('/demo/shopping')}
            className="flex items-center gap-2 px-4 py-2.5 bg-dwel-teal text-white rounded-lg hover:bg-dwel-teal-dark transition-colors font-medium text-sm"
          >
            <ShoppingBag size={16} />
            Order Now
          </button>
        </div>
      </div>

      {/* ═══ Stats Cards ════════════════════════════════════════ */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">This Month</span>
            {monthChange > 0 ? (
              <span className="flex items-center gap-0.5 text-xs text-red-500 font-medium"><TrendingUp size={12} /> +{monthChangePct}%</span>
            ) : (
              <span className="flex items-center gap-0.5 text-xs text-green-500 font-medium"><TrendingDown size={12} /> {monthChangePct}%</span>
            )}
          </div>
          <div className="text-2xl font-bold text-gray-900">${spendingData.thisMonth.total.toFixed(2)}</div>
          <div className="text-xs text-gray-400 mt-0.5">{spendingData.ordersThisMonth} orders + {spendingData.ridesThisMonth} rides</div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Voucher Balance</span>
            <span className="text-lg">🎟️</span>
          </div>
          <div className="text-2xl font-bold text-dwel-teal">${spendingData.voucherBalance.toFixed(2)}</div>
          <div className="w-full bg-gray-100 rounded-full h-1.5 mt-2">
            <div className="h-1.5 rounded-full bg-dwel-teal" style={{ width: `${(spendingData.voucherBalance / spendingData.voucherTotal) * 100}%` }} />
          </div>
          <div className="text-xs text-gray-400 mt-1">of ${spendingData.voucherTotal.toFixed(0)}/mo employer benefit</div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Uber Rides</span>
            <Car size={16} className="text-gray-400" />
          </div>
          <div className="text-2xl font-bold text-gray-900">{spendingData.ridesThisMonth}</div>
          <div className="text-xs text-gray-400 mt-0.5">${spendingData.thisMonth.rides.toFixed(0)} spent this month</div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Recurring Active</span>
            <Repeat size={16} className="text-gray-400" />
          </div>
          <div className="text-2xl font-bold text-gray-900">{recurringOrders.filter(r => r.status === 'active').length}</div>
          <div className="text-xs text-gray-400 mt-0.5">auto-orders scheduled</div>
        </div>
      </div>

      {/* ═══ Active Delivery Banner ═══════════════════════════ */}
      {activeDelivery && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center text-xl">{activeDelivery.merchantIcon}</div>
              <div>
                <div className="text-sm font-semibold text-blue-900 flex items-center gap-2">
                  {activeDelivery.merchant} — {activeDelivery.items} items
                  <StatusBadge status="out_for_delivery" />
                </div>
                <div className="text-xs text-blue-700 mt-0.5">
                  Courier: {activeDelivery.courierName} ({activeDelivery.courierRating}★) • ETA: <strong>{activeDelivery.eta}</strong>
                </div>
              </div>
            </div>
            <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-blue-700 bg-blue-100 rounded-lg hover:bg-blue-200 transition-colors">
              <Eye size={12} /> Track
            </button>
          </div>
          <div className="mt-3 flex items-center gap-2">
            {['Confirmed', 'Preparing', 'Dispatched', 'Arriving'].map((step, i) => (
              <div key={step} className="flex-1">
                <div className={`h-1.5 rounded-full ${i <= activeDelivery.progress ? 'bg-blue-500' : 'bg-blue-200'}`} />
                <div className={`text-[10px] mt-1 ${i <= activeDelivery.progress ? 'text-blue-700 font-medium' : 'text-blue-400'}`}>{step}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ═══ Tabs ═════════════════════════════════════════════ */}
      <div className="flex gap-1 mb-6 bg-gray-100 rounded-lg p-1 w-fit">
        {tabs.map(tab => {
          const Icon = tab.icon
          return (
            <button key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === tab.id ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Icon size={16} /> {tab.label}
            </button>
          )
        })}
      </div>

      {/* ═══════════════════════════════════════════════════════
           OVERVIEW TAB
         ═══════════════════════════════════════════════════════ */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Inventory Alerts */}
          {inventoryAlerts.length > 0 && (
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="flex items-center gap-2 text-sm font-semibold text-amber-800">
                  <AlertCircle size={14} /> Running Low — {inventoryAlerts.length} items
                </h3>
                <button onClick={() => navigate('/demo/shopping')} className="text-xs text-amber-700 font-medium hover:underline flex items-center gap-1">
                  View all <ChevronRight size={12} />
                </button>
              </div>
              <div className="flex gap-3">
                {inventoryAlerts.map((a, i) => (
                  <div key={i} className="flex-1 bg-white rounded-lg p-3 border border-amber-100">
                    <div className="text-sm font-medium text-gray-900">{a.item}</div>
                    <div className={`text-xs ${a.severity === 'urgent' ? 'text-red-600' : 'text-amber-600'}`}>
                      ~{a.daysLeft} days • ${a.price.toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column: Care Recipient + Activity */}
            <div className="lg:col-span-2 space-y-6">
              {/* Care Recipient Card */}
              <div className="bg-white rounded-xl border border-gray-200 p-5">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-dwel-teal-light rounded-full flex items-center justify-center text-sm font-semibold text-dwel-teal">
                      {careRecipient.initials}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 text-lg">{careRecipient.name}</h3>
                      <span className="inline-block px-2.5 py-0.5 bg-gray-100 rounded text-xs font-medium text-gray-600">
                        {careRecipient.relationship}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1.5 bg-green-50 border border-green-200 rounded-full">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    <span className="text-xs font-medium text-green-700">Uber Linked</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                  <MapPin size={14} />
                  {careRecipient.address}
                </div>
                <div className="flex gap-2">
                  <button onClick={() => setVoiceOpen(true)}
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-dwel-teal text-white rounded-lg hover:bg-dwel-teal-dark transition-colors font-medium text-sm">
                    <Mic size={16} /> Voice Assistant
                  </button>
                  <button onClick={() => navigate('/demo/shopping')}
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-dwel-teal-light text-dwel-teal rounded-lg hover:bg-dwel-teal hover:text-white transition-colors font-medium text-sm">
                    <ShoppingBag size={16} /> Order Delivery
                  </button>
                  <button onClick={() => setActiveTab('rides')}
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium text-sm">
                    <Car size={16} /> Book Ride
                  </button>
                </div>
              </div>

              {/* Upcoming Rides */}
              {upcomingRides.length > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                      <CalendarDays size={18} /> Upcoming Rides
                    </h3>
                    <button onClick={() => setActiveTab('rides')} className="text-sm text-dwel-teal font-medium hover:underline flex items-center gap-1">
                      View all <ChevronRight size={14} />
                    </button>
                  </div>
                  <div className="space-y-3">
                    {upcomingRides.map(ride => (
                      <div key={ride.id} className="bg-white rounded-xl border border-gray-200 p-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gray-900 rounded-xl flex items-center justify-center">
                            <Car size={18} className="text-white" />
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-900">{ride.dropoff}</div>
                            <div className="text-xs text-gray-500">{ride.date} • {ride.product} • {ride.estimatedFare}</div>
                          </div>
                        </div>
                        <StatusBadge status="scheduled" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Recent Orders */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <Clock size={18} /> Recent Uber Eats Orders
                  </h3>
                  <button onClick={() => navigate('/demo/shopping')} className="text-sm text-dwel-teal font-medium hover:underline flex items-center gap-1">
                    View all <ChevronRight size={14} />
                  </button>
                </div>
                <div className="space-y-3">
                  {recentOrders.slice(0, 3).map(order => (
                    <div key={order.id} className="bg-white rounded-xl border border-gray-200 p-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center text-xl">{order.icon}</div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">{order.merchant} — {order.items} items</div>
                          <div className="text-xs text-gray-500">{order.date} • ${order.total.toFixed(2)}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <StatusBadge status={order.status} />
                        {order.status === 'delivered' && (
                          <button className="flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-dwel-teal bg-dwel-teal-light rounded-lg hover:bg-dwel-teal hover:text-white transition-colors">
                            <RefreshCw size={10} /> Reorder
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Spending Summary + Recurring */}
            <div className="space-y-6">
              {/* Spending Breakdown */}
              <div className="bg-white rounded-xl border border-gray-200 p-5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                    <BarChart3 size={16} /> Spending
                  </h3>
                  <button onClick={() => setActiveTab('spending')} className="text-xs text-dwel-teal font-medium hover:underline">
                    Details →
                  </button>
                </div>
                <div className="space-y-3">
                  <SpendingBar label="Groceries" amount={spendingData.thisMonth.groceries} total={spendingData.thisMonth.total} color="bg-green-500" icon="🛒" />
                  <SpendingBar label="Rides" amount={spendingData.thisMonth.rides} total={spendingData.thisMonth.total} color="bg-gray-800" icon="🚗" />
                  <SpendingBar label="Meals" amount={spendingData.thisMonth.meals} total={spendingData.thisMonth.total} color="bg-orange-500" icon="🍽️" />
                  <SpendingBar label="Pharmacy" amount={spendingData.thisMonth.pharmacy} total={spendingData.thisMonth.total} color="bg-purple-500" icon="💊" />
                </div>
                <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-sm text-gray-600">Total this month</span>
                  <span className="text-lg font-bold text-gray-900">${spendingData.thisMonth.total.toFixed(2)}</span>
                </div>
              </div>

              {/* Recurring Orders Summary */}
              <div className="bg-white rounded-xl border border-gray-200 p-5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                    <Repeat size={16} /> Recurring
                  </h3>
                  <button onClick={() => setActiveTab('recurring')} className="text-xs text-dwel-teal font-medium hover:underline">
                    Manage →
                  </button>
                </div>
                <div className="space-y-3">
                  {recurringOrders.map(order => (
                    <div key={order.id} className="flex items-center gap-3 py-2 border-b border-gray-50 last:border-0">
                      <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center text-lg">{order.merchantIcon}</div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-gray-900 truncate">{order.name}</div>
                        <div className="text-xs text-gray-500">{order.frequency} • ~${order.estimatedTotal.toFixed(0)}</div>
                      </div>
                      <div className="text-xs font-medium text-dwel-teal whitespace-nowrap">
                        Next: {order.nextDelivery}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════
           RIDES TAB — Full Ride History
         ═══════════════════════════════════════════════════════ */}
      {activeTab === 'rides' && (
        <div className="space-y-6">
          {/* Ride Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-xl border border-gray-200 p-4 text-center">
              <div className="text-2xl font-bold text-gray-900">{rideHistory.length}</div>
              <div className="text-xs text-gray-500 mt-1">Total Rides</div>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-4 text-center">
              <div className="text-2xl font-bold text-gray-900">${rideHistory.reduce((s, r) => s + r.fare, 0).toFixed(2)}</div>
              <div className="text-xs text-gray-500 mt-1">Total Spent</div>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-4 text-center">
              <div className="text-2xl font-bold text-gray-900">${(rideHistory.reduce((s, r) => s + r.fare, 0) / rideHistory.length).toFixed(2)}</div>
              <div className="text-xs text-gray-500 mt-1">Avg Fare</div>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-4 text-center">
              <div className="text-2xl font-bold text-gray-900">{rideHistory.filter(r => r.scheduled).length}</div>
              <div className="text-xs text-gray-500 mt-1">Scheduled</div>
            </div>
          </div>

          {/* Upcoming Scheduled Rides */}
          {upcomingRides.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <CalendarDays size={18} /> Scheduled Rides
              </h3>
              <div className="space-y-3">
                {upcomingRides.map(ride => (
                  <div key={ride.id} className="bg-white rounded-xl border border-gray-200 p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                          <CalendarDays size={18} className="text-purple-600" />
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-gray-900">{ride.date}</div>
                          <div className="text-xs text-gray-500 mt-0.5">
                            <span className="text-gray-600">{ride.pickup}</span>
                            <span className="mx-1.5 text-gray-300">→</span>
                            <span className="text-gray-600">{ride.dropoff}</span>
                          </div>
                          <div className="text-xs text-gray-400 mt-0.5">{ride.product} • Est. {ride.estimatedFare}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <StatusBadge status="scheduled" />
                        <button className="px-3 py-1.5 text-xs font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors">
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Ride History Table */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <Clock size={18} /> Ride History
            </h3>
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50/50">
                    <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase">Ride</th>
                    <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase">Route</th>
                    <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase">Type</th>
                    <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase">Driver</th>
                    <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase">Distance</th>
                    <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase">Fare</th>
                    <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase">Date</th>
                    <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase">Rating</th>
                  </tr>
                </thead>
                <tbody>
                  {rideHistory.map(ride => (
                    <tr key={ride.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                      <td className="px-5 py-4">
                        <div className="font-medium text-gray-900">{ride.id}</div>
                        {ride.scheduled && <span className="text-[10px] text-purple-600 font-medium">PRE-SCHEDULED</span>}
                      </td>
                      <td className="px-5 py-4">
                        <div className="text-xs text-gray-700 max-w-[200px]">
                          <div className="flex items-center gap-1.5 mb-0.5">
                            <div className="w-2 h-2 rounded-full bg-green-500 shrink-0" />
                            <span className="truncate">{ride.pickup}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <div className="w-2 h-2 rounded-full bg-red-500 shrink-0" />
                            <span className="truncate">{ride.dropoff}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <span className="inline-block px-2 py-0.5 bg-gray-100 rounded text-xs font-medium text-gray-700">{ride.product}</span>
                      </td>
                      <td className="px-5 py-4">
                        <div className="text-sm text-gray-700">{ride.driver}</div>
                        <div className="text-xs text-gray-400">{ride.driverRating}★</div>
                      </td>
                      <td className="px-5 py-4 text-gray-600">
                        <div className="text-sm">{ride.distance}</div>
                        <div className="text-xs text-gray-400">{ride.duration}</div>
                      </td>
                      <td className="px-5 py-4 font-semibold text-gray-900">${ride.fare.toFixed(2)}</td>
                      <td className="px-5 py-4 text-gray-500 text-xs">{ride.dateShort}</td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-0.5">
                          {[...Array(ride.rating)].map((_, i) => (
                            <Star key={i} size={11} className="text-amber-400 fill-amber-400" />
                          ))}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Book a Ride */}
          <div className="bg-gray-900 rounded-xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Car size={20} /> Book a Ride for {careRecipient.name}
                </h3>
                <p className="text-sm text-gray-400 mt-1">Schedule an Uber pickup via Guest Rides API — no Uber account needed for {careRecipient.name}</p>
              </div>
              <button onClick={() => setVoiceOpen(true)}
                className="flex items-center gap-2 px-5 py-3 bg-white text-gray-900 rounded-lg hover:bg-gray-100 transition-colors font-semibold text-sm">
                <Mic size={16} /> "Book a ride for Dad"
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════
           SPENDING TAB — Full Breakdown
         ═══════════════════════════════════════════════════════ */}
      {activeTab === 'spending' && (
        <div className="space-y-6">
          {/* Monthly Comparison */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-4">This Month</h3>
              <div className="space-y-4">
                <SpendingBar label="Groceries" amount={spendingData.thisMonth.groceries} total={200} color="bg-green-500" icon="🛒" />
                <SpendingBar label="Rides" amount={spendingData.thisMonth.rides} total={200} color="bg-gray-800" icon="🚗" />
                <SpendingBar label="Meals" amount={spendingData.thisMonth.meals} total={200} color="bg-orange-500" icon="🍽️" />
                <SpendingBar label="Pharmacy" amount={spendingData.thisMonth.pharmacy} total={200} color="bg-purple-500" icon="💊" />
                <SpendingBar label="Delivery Fees" amount={spendingData.thisMonth.deliveryFees} total={200} color="bg-gray-400" icon="🚚" />
                <SpendingBar label="Dwel Fees" amount={spendingData.thisMonth.dwelFees} total={200} color="bg-dwel-teal" icon="💚" />
              </div>
              <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between">
                <span className="font-medium text-gray-700">Total</span>
                <span className="text-xl font-bold text-gray-900">${spendingData.thisMonth.total.toFixed(2)}</span>
              </div>
            </div>

            <div className="space-y-6">
              {/* Last Month Comparison */}
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-4">Month-over-Month</h3>
                <div className="flex items-end gap-6">
                  <div className="text-center">
                    <div className="text-xs text-gray-500 mb-2">Last Month</div>
                    <div className="w-20 bg-gray-200 rounded-t-lg mx-auto" style={{ height: `${(spendingData.lastMonth.total / 400) * 200}px` }} />
                    <div className="text-sm font-bold text-gray-700 mt-2">${spendingData.lastMonth.total.toFixed(0)}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xs text-gray-500 mb-2">This Month</div>
                    <div className="w-20 bg-dwel-teal rounded-t-lg mx-auto" style={{ height: `${(spendingData.thisMonth.total / 400) * 200}px` }} />
                    <div className="text-sm font-bold text-dwel-teal mt-2">${spendingData.thisMonth.total.toFixed(0)}</div>
                  </div>
                </div>
                <div className="mt-4 text-center">
                  {monthChange > 0 ? (
                    <span className="text-sm text-red-500 font-medium flex items-center justify-center gap-1"><TrendingUp size={14} /> +${monthChange.toFixed(0)} ({monthChangePct}%) vs last month</span>
                  ) : (
                    <span className="text-sm text-green-500 font-medium flex items-center justify-center gap-1"><TrendingDown size={14} /> -${Math.abs(monthChange).toFixed(0)} ({monthChangePct}%) vs last month</span>
                  )}
                </div>
              </div>

              {/* Voucher Card */}
              <div className="bg-dwel-teal rounded-xl p-6 text-white">
                <div className="flex items-center gap-2 mb-3">
                  <CreditCard size={18} />
                  <h3 className="font-semibold">Employer Benefit Voucher</h3>
                </div>
                <div className="text-3xl font-bold mb-1">${spendingData.voucherBalance.toFixed(2)}</div>
                <div className="text-sm text-white/70 mb-3">remaining of ${spendingData.voucherTotal.toFixed(0)}/month</div>
                <div className="w-full bg-white/20 rounded-full h-2.5">
                  <div className="h-2.5 rounded-full bg-white" style={{ width: `${(spendingData.voucherBalance / spendingData.voucherTotal) * 100}%` }} />
                </div>
                <div className="flex items-center justify-between mt-2 text-xs text-white/60">
                  <span>${(spendingData.voucherTotal - spendingData.voucherBalance).toFixed(0)} used</span>
                  <span>${spendingData.voucherBalance.toFixed(0)} left</span>
                </div>
                <p className="text-xs text-white/50 mt-3">Covers Uber Rides + Uber Eats orders. Auto-applied at checkout. Resets monthly.</p>
              </div>
            </div>
          </div>

          {/* Fee Transparency */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <DollarSign size={18} /> Fee Transparency
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">Uber Delivery Fees</div>
                <div className="text-xl font-bold text-gray-900">${spendingData.thisMonth.deliveryFees.toFixed(2)}</div>
                <div className="text-xs text-gray-400 mt-1">Avg ${(spendingData.thisMonth.deliveryFees / spendingData.ordersThisMonth).toFixed(2)}/order</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">Dwel Care Fees</div>
                <div className="text-xl font-bold text-gray-900">${spendingData.thisMonth.dwelFees.toFixed(2)}</div>
                <div className="text-xs text-gray-400 mt-1">$1.99/order × {spendingData.ordersThisMonth} orders</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">Voucher Savings</div>
                <div className="text-xl font-bold text-green-600">${(spendingData.voucherTotal - spendingData.voucherBalance).toFixed(2)}</div>
                <div className="text-xs text-gray-400 mt-1">Covered by employer this month</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════
           RECURRING TAB — Auto-Order Management
         ═══════════════════════════════════════════════════════ */}
      {activeTab === 'recurring' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">
              Manage auto-recurring orders for {careRecipient.name}. Orders are placed via Uber Eats and auto-applied with voucher credit.
            </p>
            <button className="flex items-center gap-2 px-4 py-2 bg-dwel-teal text-white rounded-lg hover:bg-dwel-teal-dark transition-colors text-sm font-medium">
              <Plus size={16} /> New Recurring Order
            </button>
          </div>

          {/* Recurring Order Cards */}
          {recurringOrders.map(order => (
            <div key={order.id} className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-2xl">{order.merchantIcon}</div>
                  <div>
                    <h4 className="font-semibold text-gray-900 text-lg">{order.name}</h4>
                    <div className="text-sm text-gray-500 mt-0.5">{order.merchant} • {order.items} items • ~${order.estimatedTotal.toFixed(2)}/order</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <StatusBadge status={order.status} />
                  <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-400 hover:text-gray-600">
                    <Settings size={16} />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="text-xs text-gray-500 mb-0.5">Frequency</div>
                  <div className="text-sm font-semibold text-gray-900 flex items-center gap-1">
                    <Repeat size={12} className="text-dwel-teal" /> {order.frequency}
                  </div>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="text-xs text-gray-500 mb-0.5">Next Delivery</div>
                  <div className="text-sm font-semibold text-gray-900 flex items-center gap-1">
                    <CalendarDays size={12} className="text-purple-600" /> {order.nextDelivery}
                  </div>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="text-xs text-gray-500 mb-0.5">Last Delivered</div>
                  <div className="text-sm font-semibold text-gray-900 flex items-center gap-1">
                    <CheckCircle2 size={12} className="text-green-600" /> {order.lastDelivered}
                  </div>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="text-xs text-gray-500 mb-0.5">Est. Monthly Cost</div>
                  <div className="text-sm font-semibold text-gray-900 flex items-center gap-1">
                    <DollarSign size={12} className="text-gray-600" />
                    {order.frequency.includes('Monday') || order.frequency.includes('Friday')
                      ? `$${(order.estimatedTotal * 4).toFixed(0)}/mo`
                      : `$${order.estimatedTotal.toFixed(0)}/mo`
                    }
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-3 border-t border-gray-100">
                <button className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-white bg-dwel-teal rounded-lg hover:bg-dwel-teal-dark transition-colors">
                  <Package size={14} /> Order Now
                </button>
                <button className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                  <Settings size={14} /> Edit Schedule
                </button>
                <button className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                  <Eye size={14} /> View Items
                </button>
                {order.status === 'active' && (
                  <button className="ml-auto flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-amber-700 bg-amber-50 rounded-lg hover:bg-amber-100 transition-colors">
                    <Clock size={14} /> Pause
                  </button>
                )}
              </div>
            </div>
          ))}

          {/* How It Works */}
          <div className="bg-gray-50 rounded-xl border border-gray-200 p-6">
            <h3 className="font-semibold text-gray-900 mb-4">How Recurring Orders Work</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[
                { step: 1, title: 'Create a List', desc: 'Save items from any Uber Eats merchant as a recurring template', icon: FileText },
                { step: 2, title: 'Set Frequency', desc: 'Choose daily, weekly, biweekly, or monthly delivery schedule', icon: CalendarDays },
                { step: 3, title: 'Auto-Order', desc: 'Dwel places the order automatically via Uber Eats with voucher applied', icon: Zap },
                { step: 4, title: 'Get Notified', desc: 'Receive alerts for each delivery — approve, skip, or modify before it ships', icon: Bell },
              ].map(s => {
                const Icon = s.icon
                return (
                  <div key={s.step} className="text-center">
                    <div className="w-10 h-10 bg-dwel-teal-light rounded-full flex items-center justify-center mx-auto mb-2">
                      <Icon size={18} className="text-dwel-teal" />
                    </div>
                    <div className="text-sm font-semibold text-gray-900">{s.title}</div>
                    <div className="text-xs text-gray-500 mt-1">{s.desc}</div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      )}

      {/* Voice Assistant Modal */}
      <VoiceAssistant isOpen={voiceOpen} onClose={() => setVoiceOpen(false)} />
    </div>
  )
}
