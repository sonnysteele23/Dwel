import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ShoppingCart, Package, Clock, RotateCcw, ChevronRight, Plus, Minus, Trash2,
  Search, Star, Truck, AlertCircle, CheckCircle2, Bell, MapPin, FileText, BarChart3,
  RefreshCw, Zap, ChevronDown, Mic, X, ShoppingBag, Car, Store, Heart,
  ArrowRight, Eye, Timer, ArrowLeft
} from 'lucide-react'
import theme from '../theme'
import VoiceAssistant from './VoiceAssistant'

// ─── Mock Data (Uber Eats Consumer Delivery + Guest Rides) ──────

const careRecipient = {
  name: 'Robert Chen',
  initials: 'RC',
  relationship: 'Father',
  address: '123 Oak Street, Apt 4B, Boston, MA 02101',
  dietaryProfile: ['Low Sodium', 'Diabetic-Friendly', 'No Shellfish'],
  uberLinked: true,
}

// Uber Eats Merchant Discovery results
const nearbyMerchants = [
  {
    id: 'stop-and-shop-456',
    name: 'Stop & Shop',
    category: 'Grocery',
    icon: '🛒',
    rating: 4.6,
    deliveryEta: '45–60 min',
    deliveryFee: 3.99,
    distance: '1.2 mi',
    featured: true,
  },
  {
    id: 'cvs-pharmacy-789',
    name: 'CVS Pharmacy',
    category: 'Pharmacy',
    icon: '💊',
    rating: 4.3,
    deliveryEta: '30–45 min',
    deliveryFee: 4.99,
    distance: '0.8 mi',
    featured: false,
  },
  {
    id: 'panera-bread-123',
    name: 'Panera Bread',
    category: 'Restaurant',
    icon: '🥖',
    rating: 4.5,
    deliveryEta: '25–35 min',
    deliveryFee: 2.49,
    distance: '1.5 mi',
    featured: false,
  },
  {
    id: 'trader-joes-321',
    name: "Trader Joe's",
    category: 'Grocery',
    icon: '🌻',
    rating: 4.8,
    deliveryEta: '50–70 min',
    deliveryFee: 5.99,
    distance: '2.3 mi',
    featured: false,
  },
  {
    id: 'walgreens-654',
    name: 'Walgreens',
    category: 'Pharmacy',
    icon: '🏥',
    rating: 4.1,
    deliveryEta: '35–50 min',
    deliveryFee: 3.49,
    distance: '0.5 mi',
    featured: false,
  },
  {
    id: 'boston-market-111',
    name: 'Boston Market',
    category: 'Restaurant',
    icon: '🍗',
    rating: 4.2,
    deliveryEta: '30–40 min',
    deliveryFee: 1.99,
    distance: '1.1 mi',
    featured: false,
  },
]

// Menu items from a merchant (Consumer Delivery Menu & Items endpoint)
const merchantMenuItems = {
  'stop-and-shop-456': [
    { id: 'ss-1', name: 'Whole Milk (1 gal)', price: 4.29, icon: '🥛', category: 'Dairy', dietaryFlags: [], runningLow: true, daysLeft: 2 },
    { id: 'ss-2', name: 'Whole Wheat Bread', price: 3.49, icon: '🍞', category: 'Bakery', dietaryFlags: ['Low Sodium'], runningLow: false },
    { id: 'ss-3', name: 'Bananas (bunch)', price: 1.29, icon: '🍌', category: 'Produce', dietaryFlags: ['Diabetic-Friendly'], runningLow: true, daysLeft: 3 },
    { id: 'ss-4', name: 'Ensure Original (12pk)', price: 24.99, icon: '🥤', category: 'Health', dietaryFlags: [], runningLow: true, daysLeft: 5 },
    { id: 'ss-5', name: 'Fresh Chicken Breast', price: 8.99, icon: '🍗', category: 'Meat', dietaryFlags: ['Low Sodium'], runningLow: false },
    { id: 'ss-6', name: 'Baby Spinach (10oz)', price: 3.99, icon: '🥬', category: 'Produce', dietaryFlags: ['Low Sodium', 'Diabetic-Friendly'], runningLow: false },
    { id: 'ss-7', name: 'Brown Rice (2lb)', price: 3.29, icon: '🍚', category: 'Grains', dietaryFlags: ['Low Sodium', 'Diabetic-Friendly'], runningLow: false },
    { id: 'ss-8', name: 'Low Sodium Chicken Broth', price: 2.99, icon: '🥣', category: 'Soup', dietaryFlags: ['Low Sodium'], runningLow: true, daysLeft: 4 },
    { id: 'ss-9', name: 'Fresh Salmon Fillet', price: 12.99, icon: '🐟', category: 'Seafood', dietaryFlags: ['Low Sodium'], runningLow: false },
    { id: 'ss-10', name: 'Greek Yogurt (plain)', price: 5.49, icon: '🥛', category: 'Dairy', dietaryFlags: ['Low Sodium'], runningLow: false },
  ],
}

// Saved shopping lists (Dwel layer wrapping Uber Eats cart/items)
const savedLists = [
  {
    id: 'weekly-essentials',
    name: "Dad's Weekly Essentials",
    items: 12,
    merchant: 'stop-and-shop-456',
    merchantName: 'Stop & Shop',
    merchantIcon: '🛒',
    lastOrdered: '3 days ago',
    estimatedTotal: 47.30,
    autoReorder: true,
    nextAuto: 'Tomorrow',
    frequency: 'Weekly',
  },
  {
    id: 'heart-healthy',
    name: 'Heart-Healthy Groceries',
    items: 8,
    merchant: 'stop-and-shop-456',
    merchantName: 'Stop & Shop',
    merchantIcon: '🛒',
    lastOrdered: '5 days ago',
    estimatedTotal: 38.90,
    autoReorder: true,
    nextAuto: 'Friday',
    frequency: 'Weekly',
  },
  {
    id: 'comfort-meals',
    name: 'Comfort Meal Rotation',
    items: 4,
    merchant: 'panera-bread-123',
    merchantName: 'Panera Bread',
    merchantIcon: '🥖',
    lastOrdered: '1 week ago',
    estimatedTotal: 32.50,
    autoReorder: false,
    frequency: null,
  },
]

// Order history (Consumer Delivery past orders endpoint)
const orderHistory = [
  { id: 'UE-8841', merchant: 'Stop & Shop', merchantIcon: '🛒', category: 'Grocery', items: 12, total: 52.84, deliveryFee: 3.99, dwelFee: 1.99, status: 'delivered', date: '2 days ago', rating: 5, trackingUrl: '#' },
  { id: 'UE-8837', merchant: 'CVS Pharmacy', merchantIcon: '💊', category: 'Pharmacy', items: 3, total: 34.50, deliveryFee: 4.99, dwelFee: 1.99, status: 'delivered', date: '4 days ago', rating: 4, trackingUrl: '#' },
  { id: 'UE-8830', merchant: 'Panera Bread', merchantIcon: '🥖', category: 'Restaurant', items: 2, total: 22.30, deliveryFee: 2.49, dwelFee: 1.99, status: 'delivered', date: '1 week ago', rating: 5, trackingUrl: '#' },
  { id: 'UE-8824', merchant: 'Stop & Shop', merchantIcon: '🛒', category: 'Grocery', items: 15, total: 89.23, deliveryFee: 3.99, dwelFee: 1.99, status: 'delivered', date: '1 week ago', rating: 5, trackingUrl: '#' },
  { id: 'UE-8819', merchant: "Trader Joe's", merchantIcon: '🌻', category: 'Grocery', items: 8, total: 45.60, deliveryFee: 5.99, dwelFee: 1.99, status: 'delivered', date: '2 weeks ago', rating: 4, trackingUrl: '#' },
]

// Active deliveries (Consumer Delivery status tracking)
const activeDeliveries = [
  {
    id: 'UE-8845',
    merchant: 'Stop & Shop',
    merchantIcon: '🛒',
    items: 8,
    total: 41.20,
    status: 'out_for_delivery',
    statusLabel: 'Out for Delivery',
    courierName: 'Marcus T.',
    courierRating: 4.9,
    eta: '12 min',
    trackingUrl: '#',
    orderedAt: '35 min ago',
  },
]

// Inventory alerts (Dwel estimation engine using order history)
const inventoryAlerts = [
  { item: 'Whole Milk', daysLeft: 2, severity: 'urgent', merchantItem: 'ss-1', lastOrderedQty: 1, price: 4.29 },
  { item: 'Bananas', daysLeft: 3, severity: 'urgent', merchantItem: 'ss-3', lastOrderedQty: 1, price: 1.29 },
  { item: 'Low Sodium Broth', daysLeft: 4, severity: 'warning', merchantItem: 'ss-8', lastOrderedQty: 2, price: 2.99 },
  { item: 'Ensure Shakes (12pk)', daysLeft: 5, severity: 'warning', merchantItem: 'ss-4', lastOrderedQty: 1, price: 24.99 },
]

// Spending analytics (receipts from both APIs)
const spendingData = {
  thisMonth: { groceries: 142.07, meals: 54.80, pharmacy: 34.50, rides: 62.00, total: 293.37 },
  lastMonth: { total: 267.40 },
  voucherBalance: 106.63,
  voucherTotal: 400.00,
  ordersThisMonth: 6,
  ridesThisMonth: 4,
}

// ─── Sub-Components ─────────────────────────────────────────────

function StatusBadge({ status }) {
  const config = {
    delivered: { bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-200', label: 'Delivered', icon: CheckCircle2 },
    out_for_delivery: { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200', label: 'On the Way', icon: Truck },
    preparing: { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200', label: 'Preparing', icon: Clock },
    confirmed: { bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200', label: 'Confirmed', icon: CheckCircle2 },
    failed: { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200', label: 'Failed', icon: AlertCircle },
    pending_approval: { bg: 'bg-orange-50', text: 'text-orange-700', border: 'border-orange-200', label: 'Pending Approval', icon: Clock },
  }
  const c = config[status] || config.confirmed
  const Icon = c.icon
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${c.bg} ${c.text} border ${c.border}`}>
      <Icon size={12} />
      {c.label}
    </span>
  )
}

function CategoryBadge({ category }) {
  const colors = {
    Grocery: 'bg-green-50 text-green-700 border-green-200',
    Pharmacy: 'bg-purple-50 text-purple-700 border-purple-200',
    Restaurant: 'bg-orange-50 text-orange-700 border-orange-200',
  }
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border ${colors[category] || 'bg-gray-50 text-gray-700 border-gray-200'}`}>
      {category}
    </span>
  )
}

function DietaryTag({ label }) {
  return (
    <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
      ✓ {label}
    </span>
  )
}

// ─── Main Component ─────────────────────────────────────────────

export default function Shopping() {
  const navigate = useNavigate()
  const [activeView, setActiveView] = useState('overview')
  const [cart, setCart] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [selectedMerchant, setSelectedMerchant] = useState(null)
  const [showCheckout, setShowCheckout] = useState(false)
  const [approvalRequired, setApprovalRequired] = useState(true)
  const [notifyOnDelivery, setNotifyOnDelivery] = useState(true)
  const [voiceOpen, setVoiceOpen] = useState(false)
  const [dietaryFilterOn, setDietaryFilterOn] = useState(false)

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0)
  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0)
  const cartMerchant = cart.length > 0 ? nearbyMerchants.find(m => m.id === cart[0].merchantId) : null
  const deliveryFee = cartMerchant?.deliveryFee || 0
  const dwelFee = 1.99

  function addToCart(item, merchantId) {
    // If cart has items from different merchant, warn
    if (cart.length > 0 && cart[0].merchantId !== merchantId) {
      if (!confirm('Adding items from a different store will clear your current cart. Continue?')) return
      setCart([])
    }
    setCart(prev => {
      const existing = prev.find(c => c.id === item.id)
      if (existing) return prev.map(c => c.id === item.id ? { ...c, qty: c.qty + 1 } : c)
      return [...prev, { ...item, merchantId, qty: 1 }]
    })
  }

  function updateQty(id, delta) {
    setCart(prev => prev.map(c => c.id === id ? { ...c, qty: Math.max(0, c.qty + delta) } : c).filter(c => c.qty > 0))
  }

  function removeFromCart(id) {
    setCart(prev => prev.filter(c => c.id !== id))
  }

  function openMerchant(merchant) {
    setSelectedMerchant(merchant)
    setActiveView('merchant-menu')
  }

  const filteredMerchants = nearbyMerchants.filter(m => {
    const matchesSearch = m.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCat = categoryFilter === 'all' || m.category === categoryFilter
    return matchesSearch && matchesCat
  })

  const currentMenu = selectedMerchant ? (merchantMenuItems[selectedMerchant.id] || []) : []
  const filteredMenu = currentMenu.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesDietary = !dietaryFilterOn || item.dietaryFlags.some(f => careRecipient.dietaryProfile.includes(f))
    return matchesSearch && matchesDietary
  })

  // ─── Tabs ─────────────────────────────────────────────────
  const tabs = [
    { id: 'overview', label: 'Overview', icon: ShoppingBag },
    { id: 'browse', label: 'Order', icon: Store },
    { id: 'lists', label: 'Saved Lists', icon: FileText },
    { id: 'history', label: 'History', icon: Clock },
    { id: 'inventory', label: 'Inventory', icon: BarChart3 },
  ]

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* ═══ Header ═══════════════════════════════════════════ */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate('/demo')} className="p-2 hover:bg-gray-100 rounded-lg">
            <ArrowLeft size={20} className="text-gray-500" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <ShoppingCart size={28} className="text-dwel-teal" />
              Shopping & Orders
            </h1>
            <p className="text-gray-500 mt-1">
              Order groceries, meals, and supplies for {careRecipient.name} via Uber Eats
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setVoiceOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-dwel-teal-light text-dwel-teal rounded-lg hover:bg-dwel-teal hover:text-white transition-colors font-medium text-sm"
          >
            <Mic size={16} />
            Voice Order
          </button>
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

      {/* ═══ Delivery Banner ══════════════════════════════════ */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-dwel-teal-light rounded-full flex items-center justify-center text-sm font-semibold text-dwel-teal">
            {careRecipient.initials}
          </div>
          <div>
            <div className="text-sm font-medium text-gray-900">
              Delivering to {careRecipient.name}
              <span className="text-gray-400 ml-1">({careRecipient.relationship})</span>
              {careRecipient.uberLinked && (
                <span className="ml-2 inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-medium bg-gray-900 text-white">
                  Uber Linked
                </span>
              )}
            </div>
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <MapPin size={12} />
              {careRecipient.address}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
            <input type="checkbox" checked={notifyOnDelivery} onChange={() => setNotifyOnDelivery(!notifyOnDelivery)}
              className="rounded border-gray-300 text-dwel-teal focus:ring-dwel-teal" />
            <Bell size={14} /> Notify me
          </label>
          <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
            <input type="checkbox" checked={approvalRequired} onChange={() => setApprovalRequired(!approvalRequired)}
              className="rounded border-gray-300 text-dwel-teal focus:ring-dwel-teal" />
            <CheckCircle2 size={14} /> Require approval
          </label>
        </div>
      </div>

      {/* ═══ Active Delivery Tracker ══════════════════════════ */}
      {activeDeliveries.length > 0 && activeView === 'overview' && (
        <div className="mb-6">
          {activeDeliveries.map(d => (
            <div key={d.id} className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center text-xl">{d.merchantIcon}</div>
                  <div>
                    <div className="text-sm font-semibold text-blue-900 flex items-center gap-2">
                      {d.merchant} — {d.items} items
                      <StatusBadge status={d.status} />
                    </div>
                    <div className="text-xs text-blue-700 mt-0.5">
                      Courier: {d.courierName} ({d.courierRating}★) • ETA: <strong>{d.eta}</strong>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-blue-700 bg-blue-100 rounded-lg hover:bg-blue-200 transition-colors">
                    <Eye size={12} /> Track
                  </button>
                </div>
              </div>
              {/* Progress bar */}
              <div className="mt-3 flex items-center gap-2">
                {['Confirmed', 'Preparing', 'Courier Dispatched', 'Arriving'].map((step, i) => (
                  <div key={step} className="flex-1">
                    <div className={`h-1.5 rounded-full ${i <= 2 ? 'bg-blue-500' : 'bg-blue-200'}`} />
                    <div className={`text-[10px] mt-1 ${i <= 2 ? 'text-blue-700 font-medium' : 'text-blue-400'}`}>{step}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ═══ Tabs ═════════════════════════════════════════════ */}
      <div className="flex gap-1 mb-6 bg-gray-100 rounded-lg p-1 w-fit">
        {tabs.map(tab => {
          const Icon = tab.icon
          const isActive = activeView === tab.id || (activeView === 'merchant-menu' && tab.id === 'browse')
          return (
            <button key={tab.id}
              onClick={() => { setActiveView(tab.id); if (tab.id !== 'browse') setSelectedMerchant(null) }}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Icon size={16} /> {tab.label}
            </button>
          )
        })}
      </div>

      {/* ═══════════════════════════════════════════════════════
           OVERVIEW
         ═══════════════════════════════════════════════════════ */}
      {activeView === 'overview' && (
        <div className="space-y-6">
          {/* Inventory Alerts */}
          {inventoryAlerts.length > 0 && (
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
              <h3 className="flex items-center gap-2 text-sm font-semibold text-amber-800 mb-3">
                <AlertCircle size={16} /> Running Low — Estimated from Order History
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {inventoryAlerts.map((alert, i) => (
                  <div key={i} className="flex items-center justify-between bg-white rounded-lg p-3 border border-amber-100">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{alert.item}</div>
                      <div className={`text-xs flex items-center gap-1 ${alert.severity === 'urgent' ? 'text-red-600' : 'text-amber-600'}`}>
                        <Timer size={10} /> ~{alert.daysLeft} days remaining • ${alert.price.toFixed(2)}
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        const menuItem = merchantMenuItems['stop-and-shop-456']?.find(m => m.id === alert.merchantItem)
                        if (menuItem) addToCart(menuItem, 'stop-and-shop-456')
                      }}
                      className="px-3 py-1.5 text-xs font-medium text-dwel-teal bg-dwel-teal-light rounded-lg hover:bg-dwel-teal hover:text-white transition-colors"
                    >
                      Add to Cart
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Quick Actions Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button onClick={() => setActiveView('browse')}
              className="bg-white rounded-xl border border-gray-200 p-5 text-left hover:border-dwel-teal hover:shadow-md transition-all group">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center text-xl">🛒</div>
                <div className="font-semibold text-gray-900 text-sm">Order Groceries</div>
              </div>
              <p className="text-xs text-gray-500">Browse Stop & Shop, Trader Joe's, and more via Uber Eats</p>
              <div className="mt-2 flex items-center gap-1 text-xs text-dwel-teal font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                Browse stores <ChevronRight size={12} />
              </div>
            </button>
            <button onClick={() => { setActiveView('browse'); setCategoryFilter('Restaurant') }}
              className="bg-white rounded-xl border border-gray-200 p-5 text-left hover:border-dwel-teal hover:shadow-md transition-all group">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center text-xl">🍽️</div>
                <div className="font-semibold text-gray-900 text-sm">Order a Meal</div>
              </div>
              <p className="text-xs text-gray-500">Restaurants near Robert with heart-healthy options</p>
              <div className="mt-2 flex items-center gap-1 text-xs text-dwel-teal font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                Browse restaurants <ChevronRight size={12} />
              </div>
            </button>
            <button onClick={() => { setActiveView('browse'); setCategoryFilter('Pharmacy') }}
              className="bg-white rounded-xl border border-gray-200 p-5 text-left hover:border-dwel-teal hover:shadow-md transition-all group">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center text-xl">💊</div>
                <div className="font-semibold text-gray-900 text-sm">Pharmacy & Supplies</div>
              </div>
              <p className="text-xs text-gray-500">CVS, Walgreens — OTC items and refills via Uber Eats</p>
              <div className="mt-2 flex items-center gap-1 text-xs text-dwel-teal font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                Browse pharmacy <ChevronRight size={12} />
              </div>
            </button>
          </div>

          {/* Saved Lists + Quick Reorder */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <FileText size={18} /> Saved Lists
              </h3>
              <div className="space-y-3">
                {savedLists.map(list => (
                  <div key={list.id} className="bg-white rounded-xl border border-gray-200 p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-gray-100 rounded-lg flex items-center justify-center text-lg">{list.merchantIcon}</div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">{list.name}</div>
                        <div className="text-xs text-gray-500">
                          {list.items} items • {list.merchantName} • ~${list.estimatedTotal.toFixed(2)}
                          {list.autoReorder && (
                            <span className="ml-2 inline-flex items-center gap-1 text-dwel-teal">
                              <Zap size={10} /> Auto: {list.nextAuto}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <button className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-white bg-dwel-teal rounded-lg hover:bg-dwel-teal-dark transition-colors">
                      <Package size={14} /> Order
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <RotateCcw size={18} /> Quick Reorder
              </h3>
              <div className="space-y-3">
                {orderHistory.slice(0, 3).map(order => (
                  <div key={order.id} className="bg-white rounded-xl border border-gray-200 p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-gray-100 rounded-lg flex items-center justify-center text-lg">{order.merchantIcon}</div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">{order.merchant} — {order.items} items</div>
                        <div className="text-xs text-gray-500">${order.total.toFixed(2)} • {order.date}</div>
                      </div>
                    </div>
                    <button className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-dwel-teal bg-dwel-teal-light rounded-lg hover:bg-dwel-teal hover:text-white transition-colors">
                      <RefreshCw size={14} /> Reorder
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Spending Summary */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <BarChart3 size={18} /> Monthly Spending — Powered by Uber
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {[
                { label: 'Groceries', value: `$${spendingData.thisMonth.groceries.toFixed(0)}`, color: 'text-green-600', icon: '🛒' },
                { label: 'Meals', value: `$${spendingData.thisMonth.meals.toFixed(0)}`, color: 'text-orange-600', icon: '🍽️' },
                { label: 'Pharmacy', value: `$${spendingData.thisMonth.pharmacy.toFixed(0)}`, color: 'text-purple-600', icon: '💊' },
                { label: 'Rides', value: `$${spendingData.thisMonth.rides.toFixed(0)}`, color: 'text-gray-900', icon: '🚗' },
                { label: 'Voucher Left', value: `$${spendingData.voucherBalance.toFixed(0)}`, color: 'text-dwel-teal', icon: '🎟️' },
              ].map((stat, i) => (
                <div key={i} className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-xl mb-1">{stat.icon}</div>
                  <div className={`text-lg font-bold ${stat.color}`}>{stat.value}</div>
                  <div className="text-xs text-gray-500 mt-0.5">{stat.label}</div>
                </div>
              ))}
            </div>
            <div className="mt-4 p-3 bg-dwel-teal-light rounded-lg flex items-center justify-between">
              <div className="text-sm text-dwel-teal">
                <strong>Employer Benefit:</strong> ${spendingData.voucherBalance.toFixed(2)} remaining of ${spendingData.voucherTotal.toFixed(2)}/mo
              </div>
              <div className="w-32 bg-white rounded-full h-2">
                <div className="h-2 rounded-full bg-dwel-teal" style={{ width: `${(spendingData.voucherBalance / spendingData.voucherTotal) * 100}%` }} />
              </div>
            </div>
          </div>

          {/* Recent Orders */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <Clock size={18} /> Recent Orders
              </h3>
              <button onClick={() => setActiveView('history')} className="text-sm text-dwel-teal font-medium hover:underline flex items-center gap-1">
                View all <ChevronRight size={14} />
              </button>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50/50">
                    <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase">Order</th>
                    <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase">Store</th>
                    <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase">Items</th>
                    <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase">Total</th>
                    <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase">Status</th>
                    <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase">When</th>
                  </tr>
                </thead>
                <tbody>
                  {orderHistory.slice(0, 4).map(order => (
                    <tr key={order.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                      <td className="px-5 py-3 font-medium text-gray-900">{order.id}</td>
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{order.merchantIcon}</span>
                          <div>
                            <div className="text-gray-700 text-sm">{order.merchant}</div>
                            <CategoryBadge category={order.category} />
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-3 text-gray-600">{order.items}</td>
                      <td className="px-5 py-3 font-medium text-gray-900">${order.total.toFixed(2)}</td>
                      <td className="px-5 py-3"><StatusBadge status={order.status} /></td>
                      <td className="px-5 py-3 text-gray-500">{order.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════
           BROWSE — Merchant Discovery
         ═══════════════════════════════════════════════════════ */}
      {activeView === 'browse' && (
        <div className="space-y-6">
          {/* Search & Filter */}
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search stores, restaurants, pharmacies near Robert..."
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-dwel-teal focus:border-transparent" />
            </div>
            <div className="flex gap-1 bg-white border border-gray-200 rounded-lg p-1">
              {['all', 'Grocery', 'Restaurant', 'Pharmacy'].map(cat => (
                <button key={cat} onClick={() => setCategoryFilter(cat)}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                    categoryFilter === cat ? 'bg-dwel-teal text-white' : 'text-gray-600 hover:bg-gray-100'
                  }`}>
                  {cat === 'all' ? 'All' : cat}
                </button>
              ))}
            </div>
          </div>

          <p className="text-sm text-gray-500">Stores and restaurants delivering to {careRecipient.address} via Uber Eats</p>

          {/* Merchant Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredMerchants.map(m => (
              <button key={m.id} onClick={() => openMerchant(m)}
                className="bg-white rounded-xl border border-gray-200 p-5 text-left hover:border-dwel-teal hover:shadow-md transition-all group">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-2xl">{m.icon}</div>
                  <div>
                    <div className="font-semibold text-gray-900">{m.name}</div>
                    <CategoryBadge category={m.category} />
                  </div>
                </div>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span className="flex items-center gap-1"><Star size={11} className="text-amber-400 fill-amber-400" /> {m.rating}</span>
                  <span className="flex items-center gap-1"><Truck size={11} /> {m.deliveryEta}</span>
                  <span className="flex items-center gap-1"><MapPin size={11} /> {m.distance}</span>
                </div>
                <div className="mt-2 flex items-center justify-between text-xs">
                  <span className="text-gray-500">Delivery: ${m.deliveryFee.toFixed(2)}</span>
                  <span className="text-dwel-teal font-medium opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                    View menu <ArrowRight size={12} />
                  </span>
                </div>
              </button>
            ))}
          </div>

          {filteredMerchants.length === 0 && (
            <div className="bg-white rounded-xl border border-gray-200 p-12 text-center text-gray-400">
              <Search size={32} className="mx-auto mb-3 opacity-40" />
              <p>No stores found matching your search</p>
            </div>
          )}
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════
           MERCHANT MENU — Item Browsing (Consumer Delivery API)
         ═══════════════════════════════════════════════════════ */}
      {activeView === 'merchant-menu' && selectedMerchant && (
        <div className="space-y-6">
          {/* Back to stores */}
          <button
            onClick={() => { setActiveView('browse'); setSelectedMerchant(null); setSearchQuery('') }}
            className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft size={16} />
            Back to stores
          </button>

          {/* Merchant Header */}
          <div className="bg-white rounded-xl border border-gray-200 p-5 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-2xl">{selectedMerchant.icon}</div>
              <div>
                <h2 className="font-semibold text-gray-900 text-lg">{selectedMerchant.name}</h2>
                <div className="flex items-center gap-3 text-xs text-gray-500">
                  <CategoryBadge category={selectedMerchant.category} />
                  <span className="flex items-center gap-1"><Star size={11} className="text-amber-400 fill-amber-400" /> {selectedMerchant.rating}</span>
                  <span className="flex items-center gap-1"><Truck size={11} /> {selectedMerchant.deliveryEta}</span>
                  <span>Delivery: ${selectedMerchant.deliveryFee.toFixed(2)}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <label className="flex items-center gap-2 text-xs text-gray-600 cursor-pointer bg-gray-50 px-3 py-2 rounded-lg">
                <input type="checkbox" checked={dietaryFilterOn} onChange={() => setDietaryFilterOn(!dietaryFilterOn)}
                  className="rounded border-gray-300 text-dwel-teal focus:ring-dwel-teal" />
                <Heart size={12} className="text-red-400" />
                {careRecipient.name}'s dietary profile
              </label>
            </div>
          </div>

          {/* Dietary Profile Info */}
          {dietaryFilterOn && (
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 flex items-center gap-3">
              <Heart size={14} className="text-emerald-600 shrink-0" />
              <span className="text-xs text-emerald-800">
                Showing items matching: <strong>{careRecipient.dietaryProfile.join(', ')}</strong>
              </span>
            </div>
          )}

          {/* Search */}
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
              placeholder={`Search ${selectedMerchant.name} items...`}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-dwel-teal focus:border-transparent" />
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredMenu.map(item => {
              const inCart = cart.find(c => c.id === item.id)
              return (
                <div key={item.id}
                  className={`bg-white rounded-xl border p-5 hover:shadow-md transition-all ${
                    item.runningLow ? 'border-amber-200 bg-amber-50/30' : 'border-gray-200 hover:border-dwel-teal/30'
                  }`}>
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-2xl">{item.icon}</div>
                      <div>
                        <h4 className="font-semibold text-gray-900 text-sm">{item.name}</h4>
                        <div className="flex items-center gap-1 mt-0.5 flex-wrap">
                          <span className="text-xs text-gray-400">{item.category}</span>
                          {item.runningLow && (
                            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-medium bg-red-50 text-red-600 border border-red-100">
                              <AlertCircle size={8} /> ~{item.daysLeft}d left
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  {item.dietaryFlags.length > 0 && (
                    <div className="flex gap-1 flex-wrap mb-3">
                      {item.dietaryFlags.map(f => <DietaryTag key={f} label={f} />)}
                    </div>
                  )}
                  <div className="flex items-center justify-between mt-2">
                    <div className="text-lg font-bold text-gray-900">${item.price.toFixed(2)}</div>
                    {inCart ? (
                      <div className="flex items-center gap-2">
                        <button onClick={() => updateQty(item.id, -1)} className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center hover:bg-gray-200">
                          <Minus size={14} />
                        </button>
                        <span className="w-8 text-center font-semibold text-sm">{inCart.qty}</span>
                        <button onClick={() => updateQty(item.id, 1)} className="w-8 h-8 rounded-lg bg-dwel-teal-light flex items-center justify-center hover:bg-dwel-teal hover:text-white text-dwel-teal">
                          <Plus size={14} />
                        </button>
                      </div>
                    ) : (
                      <button onClick={() => addToCart(item, selectedMerchant.id)}
                        className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-dwel-teal bg-dwel-teal-light rounded-lg hover:bg-dwel-teal hover:text-white transition-colors">
                        <Plus size={14} /> Add
                      </button>
                    )}
                  </div>
                </div>
              )
            })}
          </div>

          {filteredMenu.length === 0 && (
            <div className="bg-white rounded-xl border border-gray-200 p-12 text-center text-gray-400">
              <Search size={32} className="mx-auto mb-3 opacity-40" />
              <p>{dietaryFilterOn ? `No items match ${careRecipient.name}'s dietary profile` : 'No items found'}</p>
            </div>
          )}
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════
           CART
         ═══════════════════════════════════════════════════════ */}
      {activeView === 'cart' && (
        <div>
          {/* Cart Back Button */}
          <button
            onClick={() => setActiveView(selectedMerchant ? 'merchant-menu' : 'overview')}
            className="flex items-center gap-2 mb-4 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft size={16} />
            {selectedMerchant ? `Back to ${selectedMerchant.name}` : 'Back to Shopping'}
          </button>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            {cart.length === 0 ? (
              <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
                <ShoppingCart size={40} className="mx-auto mb-3 text-gray-300" />
                <p className="text-gray-500 mb-4">Your cart is empty</p>
                <button onClick={() => setActiveView('browse')}
                  className="px-5 py-2.5 bg-dwel-teal text-white rounded-lg hover:bg-dwel-teal-dark transition-colors font-medium text-sm">
                  Browse Stores
                </button>
              </div>
            ) : (
              <>
                {cartMerchant && (
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                    <div className="w-8 h-8 bg-gray-200 rounded-lg flex items-center justify-center text-lg">{cartMerchant.icon}</div>
                    <div className="text-sm">
                      <span className="font-medium text-gray-900">{cartMerchant.name}</span>
                      <span className="text-gray-500 ml-2">{cartMerchant.deliveryEta} delivery</span>
                    </div>
                  </div>
                )}
                {cart.map(item => (
                  <div key={item.id} className="bg-white rounded-xl border border-gray-200 p-4 flex items-center gap-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-2xl shrink-0">{item.icon}</div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-gray-900 text-sm">{item.name}</h4>
                      <div className="text-xs text-gray-500">{item.category}</div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2">
                        <button onClick={() => updateQty(item.id, -1)} className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center hover:bg-gray-200"><Minus size={14} /></button>
                        <span className="w-8 text-center font-semibold text-sm">{item.qty}</span>
                        <button onClick={() => updateQty(item.id, 1)} className="w-8 h-8 rounded-lg bg-dwel-teal-light flex items-center justify-center hover:bg-dwel-teal hover:text-white text-dwel-teal"><Plus size={14} /></button>
                      </div>
                      <div className="w-20 text-right font-bold text-gray-900 text-sm">${(item.price * item.qty).toFixed(2)}</div>
                      <button onClick={() => removeFromCart(item.id)} className="p-2 hover:bg-red-50 rounded-lg text-gray-400 hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>

          {cart.length > 0 && (
            <div className="bg-white rounded-xl border border-gray-200 p-5 h-fit sticky top-6">
              <h3 className="font-semibold text-gray-900 mb-4">Order Summary</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-gray-600"><span>Subtotal ({cartCount} items)</span><span>${cartTotal.toFixed(2)}</span></div>
                <div className="flex justify-between text-gray-600"><span>Uber Eats delivery</span><span>${deliveryFee.toFixed(2)}</span></div>
                <div className="flex justify-between text-gray-600"><span>Dwel care fee</span><span>${dwelFee.toFixed(2)}</span></div>
                {spendingData.voucherBalance > 0 && (
                  <div className="flex justify-between text-dwel-teal">
                    <span className="flex items-center gap-1">🎟️ Voucher credit</span>
                    <span>-${Math.min(spendingData.voucherBalance, cartTotal + deliveryFee + dwelFee).toFixed(2)}</span>
                  </div>
                )}
                <div className="border-t border-gray-200 pt-3 flex justify-between font-bold text-gray-900">
                  <span>Total</span>
                  <span>${Math.max(0, cartTotal + deliveryFee + dwelFee - spendingData.voucherBalance).toFixed(2)}</span>
                </div>
              </div>

              <div className="mt-4 p-3 bg-dwel-teal-light rounded-lg">
                <div className="flex items-center gap-2 text-xs text-dwel-teal font-medium"><MapPin size={12} /> Delivering to {careRecipient.name}</div>
                <div className="text-xs text-gray-500 mt-1">{careRecipient.address}</div>
              </div>

              <div className="mt-3 p-3 bg-gray-50 rounded-lg text-xs text-gray-500">
                <div className="font-medium text-gray-700 mb-1">Payment via linked Uber account</div>
                Voucher applied automatically • Remainder charged to card on file
              </div>

              {approvalRequired && (
                <div className="mt-3 p-3 bg-amber-50 border border-amber-100 rounded-lg flex items-start gap-2">
                  <CheckCircle2 size={14} className="text-amber-600 mt-0.5 shrink-0" />
                  <span className="text-xs text-amber-700">Approval required — you'll review before order is placed</span>
                </div>
              )}

              <button onClick={() => setShowCheckout(true)}
                className="w-full mt-4 py-3 bg-dwel-teal text-white rounded-lg hover:bg-dwel-teal-dark transition-colors font-semibold text-sm">
                {approvalRequired ? 'Review & Approve' : 'Place Order via Uber Eats'}
              </button>
              <button onClick={() => { setActiveView(selectedMerchant ? 'merchant-menu' : 'browse') }}
                className="w-full mt-2 py-2.5 text-sm font-medium text-gray-600 hover:text-gray-800 transition-colors">
                Continue Shopping
              </button>
            </div>
          )}
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════
           SAVED LISTS
         ═══════════════════════════════════════════════════════ */}
      {activeView === 'lists' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-500">Shopping list templates linked to Uber Eats stores for {careRecipient.name}</p>
            <button className="flex items-center gap-2 px-4 py-2 bg-dwel-teal text-white rounded-lg hover:bg-dwel-teal-dark transition-colors text-sm font-medium">
              <Plus size={16} /> Create List
            </button>
          </div>
          {savedLists.map(list => (
            <div key={list.id} className="bg-white rounded-xl border border-gray-200 p-5">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-xl">{list.merchantIcon}</div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{list.name}</h4>
                    <div className="text-xs text-gray-500 mt-0.5">
                      {list.items} items • {list.merchantName} • ~${list.estimatedTotal.toFixed(2)} • Last: {list.lastOrdered}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {list.autoReorder && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-dwel-teal-light text-dwel-teal">
                      <Zap size={10} /> Auto: {list.frequency} — Next: {list.nextAuto}
                    </span>
                  )}
                  <button className="px-4 py-2 text-sm font-medium text-white bg-dwel-teal rounded-lg hover:bg-dwel-teal-dark transition-colors">
                    Order Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════
           ORDER HISTORY
         ═══════════════════════════════════════════════════════ */}
      {activeView === 'history' && (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/50">
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase">Order</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase">Store</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase">Items</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase">Total</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase">Rating</th>
                <th className="text-right px-5 py-3 text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orderHistory.map(order => (
                <tr key={order.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                  <td className="px-5 py-4 font-medium text-gray-900">{order.id}</td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{order.merchantIcon}</span>
                      <div>
                        <div className="text-gray-700 text-sm">{order.merchant}</div>
                        <CategoryBadge category={order.category} />
                      </div>
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
                  </td>
                  <td className="px-5 py-4 text-right">
                    <button className="text-sm text-dwel-teal font-medium hover:underline">Reorder</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════
           INVENTORY
         ═══════════════════════════════════════════════════════ */}
      {activeView === 'inventory' && (
        <div className="space-y-6">
          <p className="text-sm text-gray-500">
            Supply estimates based on Uber Eats order frequency for {careRecipient.name}. Dwel tracks ordering patterns to predict when items will run out.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {inventoryAlerts.map((alert, i) => {
              const pct = Math.round((alert.daysLeft / 14) * 100)
              return (
                <div key={i} className="bg-white rounded-xl border border-gray-200 p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-semibold text-gray-900">{alert.item}</h4>
                      <div className={`text-sm ${alert.severity === 'urgent' ? 'text-red-600' : 'text-amber-600'}`}>
                        ~{alert.daysLeft} days remaining • ${alert.price.toFixed(2)}
                      </div>
                    </div>
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                      alert.severity === 'urgent' ? 'bg-red-50 text-red-700 border border-red-200' : 'bg-amber-50 text-amber-700 border border-amber-200'
                    }`}>{alert.severity === 'urgent' ? 'Urgent' : 'Warning'}</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2 mb-3">
                    <div className={`h-2 rounded-full transition-all ${alert.severity === 'urgent' ? 'bg-red-500' : 'bg-amber-500'}`} style={{ width: `${pct}%` }} />
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => {
                      const menuItem = merchantMenuItems['stop-and-shop-456']?.find(m => m.id === alert.merchantItem)
                      if (menuItem) addToCart(menuItem, 'stop-and-shop-456')
                    }} className="flex-1 py-2 text-sm font-medium text-white bg-dwel-teal rounded-lg hover:bg-dwel-teal-dark transition-colors">
                      Add to Cart
                    </button>
                    <button className="flex-1 py-2 text-sm font-medium text-dwel-teal bg-dwel-teal-light rounded-lg hover:bg-dwel-teal hover:text-white transition-colors">
                      Set Auto-Reorder
                    </button>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Spending Analytics */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <BarChart3 size={18} /> Spending Analytics — All via Uber
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'This Month', value: `$${spendingData.thisMonth.total.toFixed(0)}`, sub: `${spendingData.ordersThisMonth} orders + ${spendingData.ridesThisMonth} rides`, color: 'text-dwel-teal' },
                { label: 'Last Month', value: `$${spendingData.lastMonth.total.toFixed(0)}`, sub: '', color: 'text-gray-900' },
                { label: 'Voucher Used', value: `$${(spendingData.voucherTotal - spendingData.voucherBalance).toFixed(0)}`, sub: `of $${spendingData.voucherTotal.toFixed(0)}`, color: 'text-gray-900' },
                { label: 'Voucher Left', value: `$${spendingData.voucherBalance.toFixed(0)}`, sub: 'Employer benefit', color: 'text-green-600' },
              ].map((stat, i) => (
                <div key={i} className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className={`text-xl font-bold ${stat.color}`}>{stat.value}</div>
                  <div className="text-xs text-gray-500 mt-1">{stat.label}</div>
                  {stat.sub && <div className="text-[10px] text-gray-400 mt-0.5">{stat.sub}</div>}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════
           CHECKOUT MODAL
         ═══════════════════════════════════════════════════════ */}
      {showCheckout && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-2xl">
              <h2 className="text-lg font-semibold text-gray-900">Review & Approve Order</h2>
              <button onClick={() => setShowCheckout(false)} className="p-2 hover:bg-gray-100 rounded-lg"><X size={18} className="text-gray-500" /></button>
            </div>
            <div className="p-6 space-y-4">
              {/* Recipient + Merchant */}
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-10 h-10 bg-dwel-teal-light rounded-full flex items-center justify-center text-sm font-semibold text-dwel-teal">{careRecipient.initials}</div>
                <div>
                  <div className="text-sm font-medium text-gray-900">Delivering to {careRecipient.name}</div>
                  <div className="text-xs text-gray-500">{careRecipient.address}</div>
                </div>
              </div>
              {cartMerchant && (
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 bg-gray-200 rounded-lg flex items-center justify-center text-lg">{cartMerchant.icon}</div>
                  <div className="text-sm">
                    <span className="font-medium text-gray-900">{cartMerchant.name}</span>
                    <span className="text-gray-500 ml-2">via Uber Eats • {cartMerchant.deliveryEta}</span>
                  </div>
                </div>
              )}

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
                <div className="flex justify-between text-gray-600"><span>Uber Eats delivery</span><span>${deliveryFee.toFixed(2)}</span></div>
                <div className="flex justify-between text-gray-600"><span>Dwel care fee</span><span>${dwelFee.toFixed(2)}</span></div>
                {spendingData.voucherBalance > 0 && (
                  <div className="flex justify-between text-dwel-teal"><span>Voucher credit</span><span>-${Math.min(spendingData.voucherBalance, cartTotal + deliveryFee + dwelFee).toFixed(2)}</span></div>
                )}
                <div className="border-t border-gray-200 pt-2 flex justify-between font-bold text-gray-900">
                  <span>You pay</span><span>${Math.max(0, cartTotal + deliveryFee + dwelFee - spendingData.voucherBalance).toFixed(2)}</span>
                </div>
              </div>

              {/* Options */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                  <input type="checkbox" defaultChecked className="rounded border-gray-300 text-dwel-teal focus:ring-dwel-teal" />
                  Send delivery updates to my phone
                </label>
                <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                  <input type="checkbox" defaultChecked className="rounded border-gray-300 text-dwel-teal focus:ring-dwel-teal" />
                  Notify {careRecipient.name} via SMS when delivering
                </label>
                <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                  <input type="checkbox" defaultChecked className="rounded border-gray-300 text-dwel-teal focus:ring-dwel-teal" />
                  Log in {careRecipient.name}'s care timeline
                </label>
              </div>

              <button
                onClick={() => { setShowCheckout(false); setCart([]); setActiveView('overview') }}
                className="w-full py-3 bg-dwel-teal text-white rounded-lg hover:bg-dwel-teal-dark transition-colors font-semibold">
                Approve & Place Order via Uber Eats
              </button>
              <p className="text-[10px] text-gray-400 text-center">
                Payment processed through linked Uber account. Voucher applied automatically.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Voice Assistant Modal */}
      <VoiceAssistant isOpen={voiceOpen} onClose={() => setVoiceOpen(false)} />
    </div>
  )
}
