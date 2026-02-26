import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Car, MapPin, Clock, Star, Plus, ArrowLeft, Mic,
  CheckCircle2, CalendarDays, ChevronRight,
  Navigation, Wallet, BarChart3, TrendingUp, TrendingDown,
  Shield, Zap, X, Phone, ArrowRight,
  User, AlertCircle
} from 'lucide-react'
import theme from '../theme'
import VoiceAssistant from './VoiceAssistant'

// ─── Data ────────────────────────────────────────────────────────

const careRecipient = {
  name: 'Robert Chen',
  initials: 'RC',
  relationship: 'Father',
  address: '123 Oak Street, Apt 4B, Boston, MA 02101',
  phone: '(555) 234-5678',
}

const rideHistory = [
  { id: 'RIDE-4421', date: 'Today',     time: '10:30 AM', from: 'Home',                  to: "Dr. Kim's Office",      fare: 18.50, status: 'completed', driver: 'James K.', driverRating: 4.9, duration: '22 min', purpose: 'Medical',  voucherApplied: true  },
  { id: 'RIDE-4420', date: 'Today',     time: '12:15 PM', from: "Dr. Kim's Office",       to: 'Home',                  fare: 16.00, status: 'completed', driver: 'James K.', driverRating: 4.9, duration: '19 min', purpose: 'Medical',  voucherApplied: true  },
  { id: 'RIDE-4415', date: 'Feb 22',    time: '9:00 AM',  from: 'Home',                  to: 'Brookline Medical Ctr', fare: 21.50, status: 'completed', driver: 'Maria S.', driverRating: 4.8, duration: '28 min', purpose: 'Medical',  voucherApplied: true  },
  { id: 'RIDE-4410', date: 'Feb 19',    time: '2:30 PM',  from: 'Brookline Medical Ctr', to: 'Home',                  fare: 19.00, status: 'completed', driver: 'Tom R.',   driverRating: 4.7, duration: '25 min', purpose: 'Medical',  voucherApplied: true  },
  { id: 'RIDE-4401', date: 'Feb 14',    time: '11:00 AM', from: 'Home',                  to: 'CVS Pharmacy',          fare:  8.00, status: 'completed', driver: 'Priya N.', driverRating: 4.9, duration: '10 min', purpose: 'Errand',   voucherApplied: false },
  { id: 'RIDE-4398', date: 'Feb 12',    time: '3:00 PM',  from: 'CVS Pharmacy',          to: 'Home',                  fare:  7.50, status: 'completed', driver: 'Priya N.', driverRating: 4.9, duration: '9 min',  purpose: 'Errand',   voucherApplied: false },
  { id: 'RIDE-4389', date: 'Feb 8',     time: '10:00 AM', from: 'Home',                  to: 'Mass General Hospital', fare: 24.00, status: 'completed', driver: 'Carlos M.', driverRating: 4.8, duration: '31 min', purpose: 'Medical', voucherApplied: true  },
  { id: 'RIDE-4380', date: 'Feb 1',     time: '2:00 PM',  from: 'Mass General Hospital', to: 'Home',                  fare: 22.00, status: 'completed', driver: 'Aisha F.', driverRating: 4.7, duration: '30 min', purpose: 'Medical',  voucherApplied: true  },
]

const scheduledRides = [
  { id: 'RIDE-4430', date: 'Mar 1',  time: '1:30 PM', from: 'Home', to: 'Brookline Medical Center', purpose: 'Cardiology Follow-up — Dr. Sarah Kim', status: 'confirmed', fareEst: 20.00 },
  { id: 'RIDE-4431', date: 'Mar 8',  time: '9:30 AM', from: 'Home', to: 'Mass General Hospital',    purpose: 'Endocrinology — Dr. James Park',       status: 'pending',   fareEst: 23.00 },
  { id: 'RIDE-4432', date: 'Mar 15', time: '3:00 PM', from: 'Home', to: 'Boston Health Partners',   purpose: 'Primary Care — Dr. Lisa Wong',         status: 'confirmed', fareEst: 15.00 },
]

const spending = {
  thisMonth:  { medical: 54.50, errand: 15.50, total: 70.00, count: 4 },
  lastMonth:  { total: 48.50, count: 3 },
  voucherBalance: 130.00,
  voucherTotal:   200.00,
}

const frequentDestinations = [
  { name: "Dr. Kim's Office",       address: 'Brookline Medical Center',  rides: 6, avgFare: 17.25, purpose: 'Medical' },
  { name: 'Mass General Hospital',  address: '55 Fruit St, Boston',       rides: 4, avgFare: 23.00, purpose: 'Medical' },
  { name: 'CVS Pharmacy',           address: 'Corner of Oak & Main',      rides: 3, avgFare:  7.75, purpose: 'Errand'  },
  { name: 'Boston Health Partners', address: 'Primary Care Clinic',       rides: 2, avgFare: 14.50, purpose: 'Medical' },
]

// ─── Small components ────────────────────────────────────────────

function RideStatusBadge({ status }) {
  const map = {
    completed: { bg: 'bg-green-50',  text: 'text-green-700',  border: 'border-green-200',  label: 'Completed', Icon: CheckCircle2 },
    confirmed: { bg: 'bg-blue-50',   text: 'text-blue-700',   border: 'border-blue-200',   label: 'Confirmed', Icon: CheckCircle2 },
    pending:   { bg: 'bg-amber-50',  text: 'text-amber-700',  border: 'border-amber-200',  label: 'Pending',   Icon: Clock },
    active:    { bg: 'bg-dwel-teal-light', text: 'text-dwel-teal', border: 'border-dwel-teal', label: 'En Route',  Icon: Navigation },
    cancelled: { bg: 'bg-red-50',    text: 'text-red-700',    border: 'border-red-200',    label: 'Cancelled', Icon: X },
  }
  const c = map[status] || map.pending
  const Icon = c.Icon
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${c.bg} ${c.text} border ${c.border}`}>
      <Icon size={11} /> {c.label}
    </span>
  )
}

function PurposePill({ purpose }) {
  const colors = {
    Medical: 'bg-red-50 text-red-700 border-red-200',
    Errand:  'bg-blue-50 text-blue-700 border-blue-200',
    Social:  'bg-purple-50 text-purple-700 border-purple-200',
  }
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium border ${colors[purpose] || 'bg-gray-50 text-gray-600 border-gray-200'}`}>
      {purpose}
    </span>
  )
}

// ─── Book Ride Modal ─────────────────────────────────────────────

function BookRideModal({ onClose }) {
  const [dropoff, setDropoff] = useState('')
  const [date, setDate]       = useState('')
  const [time, setTime]       = useState('')
  const [purpose, setPurpose] = useState('Medical')

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-md">
        <div className="border-b border-gray-100 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center">
              <Car size={16} className="text-white" />
            </div>
            <h2 className="text-lg font-semibold text-gray-900">Book an Uber Ride</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg"><X size={18} className="text-gray-500" /></button>
        </div>
        <div className="p-6 space-y-4">

          {/* Rider */}
          <div className={`flex items-center gap-3 p-3 ${theme.colors.primaryLight} rounded-lg`}>
            <div className={`w-9 h-9 ${theme.colors.primaryLight} border-2 border-dwel-teal rounded-full flex items-center justify-center text-xs font-semibold ${theme.colors.primaryText}`}>
              {careRecipient.initials}
            </div>
            <div>
              <div className={`text-sm font-medium ${theme.colors.primaryText}`}>Ride for {careRecipient.name}</div>
              <div className="text-xs text-gray-500">Uber Guest Ride — no Uber account needed</div>
            </div>
          </div>

          {/* Pickup — pre-filled */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1.5">Pickup</label>
            <div className="flex items-center gap-2 px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg">
              <div className="w-2 h-2 bg-gray-900 rounded-full shrink-0" />
              <span className="text-sm text-gray-600">{careRecipient.address}</span>
            </div>
          </div>

          {/* Dropoff */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1.5">Destination</label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 w-2 h-2 bg-dwel-teal rounded-full" />
              <input value={dropoff} onChange={e => setDropoff(e.target.value)}
                className="w-full pl-8 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-dwel-teal"
                placeholder="Where does Robert need to go?" />
            </div>
            {/* Quick destinations */}
            <div className="flex flex-wrap gap-1.5 mt-2">
              {frequentDestinations.map((d, i) => (
                <button key={i} onClick={() => setDropoff(d.name)}
                  className={`px-2.5 py-1 rounded-lg text-xs border transition-colors ${
                    dropoff === d.name
                      ? `${theme.colors.primaryLight} ${theme.colors.primaryText} border-dwel-teal`
                      : 'bg-gray-50 text-gray-600 border-gray-200 hover:border-dwel-teal'
                  }`}>
                  {d.name}
                </button>
              ))}
            </div>
          </div>

          {/* Date / Time */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1.5">Date</label>
              <input type="date" value={date} onChange={e => setDate(e.target.value)}
                className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-dwel-teal" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1.5">Pickup time</label>
              <input type="time" value={time} onChange={e => setTime(e.target.value)}
                className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-dwel-teal" />
            </div>
          </div>

          {/* Purpose */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1.5">Trip purpose</label>
            <div className="flex gap-2">
              {['Medical', 'Errand', 'Social'].map(p => (
                <button key={p} onClick={() => setPurpose(p)}
                  className={`flex-1 py-2 rounded-lg text-xs font-medium border transition-colors ${
                    purpose === p ? `${theme.colors.primary} text-white border-transparent` : 'bg-gray-50 text-gray-600 border-gray-200 hover:border-dwel-teal'
                  }`}>{p}</button>
              ))}
            </div>
          </div>

          <div className="p-3 bg-amber-50 border border-amber-100 rounded-lg flex items-start gap-2">
            <Shield size={14} className="text-amber-600 mt-0.5 shrink-0" />
            <span className="text-xs text-amber-700">You'll get real-time notifications when Robert's ride starts and when he arrives safely.</span>
          </div>

          <button onClick={onClose}
            className={`w-full py-3 ${theme.colors.primary} text-white rounded-lg ${theme.colors.primaryHover} transition-colors font-semibold text-sm`}>
            Schedule Ride via Uber
          </button>
          <p className="text-[10px] text-gray-400 text-center">Powered by Uber Guest Rides • Ride voucher applied automatically</p>
        </div>
      </div>
    </div>
  )
}

// ─── Main ────────────────────────────────────────────────────────

export default function Rides() {
  const navigate = useNavigate()
  const [tab, setTab]           = useState('overview')
  const [voiceOpen, setVoiceOpen] = useState(false)
  const [bookOpen, setBookOpen]   = useState(false)

  const deltaAmt = spending.thisMonth.total - spending.lastMonth.total
  const deltaPct = ((Math.abs(deltaAmt) / spending.lastMonth.total) * 100).toFixed(0)
  const voucherUsed = spending.voucherTotal - spending.voucherBalance
  const voucherPct  = (spending.voucherBalance / spending.voucherTotal) * 100

  const tabs = [
    { id: 'overview',  label: 'Overview',   icon: Car },
    { id: 'scheduled', label: 'Scheduled',  icon: CalendarDays },
    { id: 'history',   label: 'History',    icon: Clock },
    { id: 'places',    label: 'Places',     icon: MapPin },
  ]

  return (
    <div className={`p-6 max-w-7xl mx-auto ${theme.colors.pageBg} min-h-screen`}>

      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate('/demo')} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <ArrowLeft size={20} className="text-gray-500" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              {/* Uber-style car icon — black badge */}
              <div className="w-9 h-9 bg-gray-900 rounded-xl flex items-center justify-center shrink-0">
                <Car size={20} className="text-white" />
              </div>
              Rides
            </h1>
            <p className="text-gray-500 mt-1 text-sm">
              Uber Guest Rides for {careRecipient.name} — book, track, and manage trips
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => setVoiceOpen(true)}
            className={`flex items-center gap-2 px-4 py-2.5 ${theme.colors.primaryLight} ${theme.colors.primaryText} rounded-lg hover:bg-dwel-teal hover:text-white transition-colors font-medium text-sm`}>
            <Mic size={16} /> Voice Book
          </button>
          <button onClick={() => setBookOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium text-sm">
            <Plus size={16} /> Book Ride
          </button>
        </div>
      </div>

      {/* Recipient strip */}
      <div className="bg-white rounded-xl border border-gray-100 px-5 py-3 mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`w-9 h-9 ${theme.colors.primaryLight} rounded-full flex items-center justify-center text-sm font-semibold ${theme.colors.primaryText}`}>
            {careRecipient.initials}
          </div>
          <div>
            <span className="text-sm font-medium text-gray-900">{careRecipient.name}</span>
            <span className="text-gray-400 text-sm ml-2">({careRecipient.relationship})</span>
            <span className="ml-2 inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-gray-900 text-white tracking-tight">Uber Linked</span>
          </div>
        </div>
        <div className="flex items-center gap-4 text-xs text-gray-500">
          <span className="flex items-center gap-1"><Shield size={12} className="text-green-500" /> Caregiver alerts on</span>
          <span className="flex items-center gap-1"><Phone size={12} /> {careRecipient.phone}</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 bg-gray-100 rounded-lg p-1 w-fit">
        {tabs.map(t => {
          const Icon = t.icon
          return (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                tab === t.id ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
              }`}>
              <Icon size={15} /> {t.label}
            </button>
          )
        })}
      </div>

      {/* ══════════════════════════════════════════════
           OVERVIEW
         ══════════════════════════════════════════════ */}
      {tab === 'overview' && (
        <div className="space-y-6">

          {/* Data point cards — Uber-specific metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

            <div className="bg-white rounded-xl border border-gray-100 p-5">
              <div className="w-10 h-10 bg-gray-900 rounded-xl flex items-center justify-center mb-3">
                <Car size={18} className="text-white" />
              </div>
              <div className="text-2xl font-bold text-gray-900">{spending.thisMonth.count}</div>
              <div className="text-xs text-gray-500 mt-0.5">Rides this month</div>
              <div className="text-[11px] text-gray-400 mt-0.5">{spending.lastMonth.count} last month</div>
            </div>

            <div className="bg-white rounded-xl border border-gray-100 p-5">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${deltaAmt > 0 ? 'bg-red-50' : 'bg-green-50'}`}>
                {deltaAmt > 0
                  ? <TrendingUp size={18} className="text-red-500" />
                  : <TrendingDown size={18} className="text-green-500" />}
              </div>
              <div className="text-2xl font-bold text-gray-900">${spending.thisMonth.total.toFixed(0)}</div>
              <div className="text-xs text-gray-500 mt-0.5">Fare spend this month</div>
              <div className={`text-[11px] mt-0.5 ${deltaAmt > 0 ? 'text-red-500' : 'text-green-500'}`}>
                {deltaAmt > 0 ? '+' : '-'}{deltaPct}% vs last month
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-100 p-5">
              <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center mb-3">
                <BarChart3 size={18} className="text-gray-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">
                ${(spending.thisMonth.total / spending.thisMonth.count).toFixed(2)}
              </div>
              <div className="text-xs text-gray-500 mt-0.5">Avg fare per ride</div>
              <div className="text-[11px] text-gray-400 mt-0.5">Based on this month</div>
            </div>

            <div className="bg-white rounded-xl border border-gray-100 p-5">
              <div className={`w-10 h-10 ${theme.colors.primaryLight} rounded-xl flex items-center justify-center mb-3`}>
                <Wallet size={18} className={theme.colors.primaryText} />
              </div>
              <div className={`text-2xl font-bold ${theme.colors.primaryText}`}>${spending.voucherBalance.toFixed(0)}</div>
              <div className="text-xs text-gray-500 mt-0.5">Ride voucher remaining</div>
              <div className="w-full bg-gray-100 rounded-full h-1.5 mt-2">
                <div className={`h-1.5 rounded-full ${theme.colors.primary}`} style={{ width: `${voucherPct}%` }} />
              </div>
            </div>
          </div>

          {/* Spend breakdown + next scheduled */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            {/* Breakdown */}
            <div className="bg-white rounded-xl border border-gray-100 p-5">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <BarChart3 size={16} className="text-gray-500" /> Fare Breakdown
              </h3>
              <div className="space-y-4">
                {[
                  { label: 'Medical trips', value: spending.thisMonth.medical, color: 'bg-red-400', textColor: 'text-red-600' },
                  { label: 'Errands & other', value: spending.thisMonth.errand, color: 'bg-blue-400', textColor: 'text-blue-600' },
                ].map(row => (
                  <div key={row.label}>
                    <div className="flex justify-between mb-1.5">
                      <span className="text-sm text-gray-600">{row.label}</span>
                      <span className={`text-sm font-semibold ${row.textColor}`}>${row.value.toFixed(2)}</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                      <div className={`h-2 rounded-full ${row.color}`}
                        style={{ width: `${(row.value / spending.thisMonth.total) * 100}%` }} />
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-3 border-t border-gray-100 flex justify-between">
                <span className="text-sm text-gray-500">Total</span>
                <span className="text-lg font-bold text-gray-900">${spending.thisMonth.total.toFixed(2)}</span>
              </div>
              {/* Voucher bar */}
              <div className={`mt-3 p-3 ${theme.colors.primaryLight} rounded-lg flex items-center justify-between gap-4`}>
                <span className={`text-xs font-medium ${theme.colors.primaryText}`}>
                  <strong>Ride Voucher:</strong> ${spending.voucherBalance.toFixed(0)} of ${spending.voucherTotal}/mo remaining
                </span>
                <div className="w-24 bg-white rounded-full h-1.5 shrink-0">
                  <div className={`h-1.5 rounded-full ${theme.colors.primary}`} style={{ width: `${voucherPct}%` }} />
                </div>
              </div>
            </div>

            {/* Next scheduled */}
            <div>
              <h3 className="text-base font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <CalendarDays size={16} className="text-gray-500" /> Upcoming Rides
              </h3>
              <div className="space-y-3">
                {scheduledRides.map(ride => (
                  <div key={ride.id} className="bg-white rounded-xl border border-gray-100 p-4">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-start gap-3">
                        <div className="w-9 h-9 bg-gray-100 rounded-xl flex items-center justify-center shrink-0">
                          <Car size={16} className="text-gray-500" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">{ride.to}</div>
                          <div className="text-xs text-gray-500 mt-0.5">{ride.purpose}</div>
                          <div className="flex items-center gap-2 mt-1.5 text-[11px] text-gray-400">
                            <CalendarDays size={10} /> {ride.date} at {ride.time}
                            <span>· ~${ride.fareEst.toFixed(0)}</span>
                            <span className={`${theme.colors.primaryText} flex items-center gap-0.5`}><Zap size={9} /> Voucher</span>
                          </div>
                        </div>
                      </div>
                      <RideStatusBadge status={ride.status} />
                    </div>
                  </div>
                ))}
                <button onClick={() => setBookOpen(true)}
                  className="w-full py-2.5 border-2 border-dashed border-gray-200 rounded-xl text-sm font-medium text-gray-400 hover:border-gray-900 hover:text-gray-600 transition-colors flex items-center justify-center gap-2">
                  <Plus size={15} /> Schedule another ride
                </button>
              </div>
            </div>
          </div>

          {/* Recent rides — table */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base font-semibold text-gray-900 flex items-center gap-2">
                <Clock size={15} className="text-gray-500" /> Recent Trips
              </h3>
              <button onClick={() => setTab('history')} className={`text-sm ${theme.colors.primaryText} font-medium hover:underline flex items-center gap-1`}>
                All history <ChevronRight size={14} />
              </button>
            </div>
            <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50/50">
                    {['Trip ID', 'Route', 'Date', 'Driver', 'Purpose', 'Fare', 'Voucher', 'Status'].map(h => (
                      <th key={h} className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rideHistory.slice(0, 4).map(ride => (
                    <tr key={ride.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                      <td className="px-5 py-3.5 text-xs font-medium text-gray-500">{ride.id}</td>
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-1.5">
                          <div className="w-1.5 h-1.5 bg-gray-900 rounded-full shrink-0" />
                          <span className="text-xs text-gray-600">{ride.from}</span>
                        </div>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${theme.colors.primary}`} />
                          <span className="text-xs text-gray-600">{ride.to}</span>
                        </div>
                      </td>
                      <td className="px-5 py-3.5 text-xs text-gray-500">{ride.date}<br />{ride.time}</td>
                      <td className="px-5 py-3.5">
                        <div className="text-xs font-medium text-gray-700">{ride.driver}</div>
                        <div className="flex items-center gap-0.5 mt-0.5">
                          <Star size={10} className="text-amber-400 fill-amber-400" />
                          <span className="text-[10px] text-gray-400">{ride.driverRating}</span>
                        </div>
                      </td>
                      <td className="px-5 py-3.5"><PurposePill purpose={ride.purpose} /></td>
                      <td className="px-5 py-3.5 font-semibold text-gray-900">${ride.fare.toFixed(2)}</td>
                      <td className="px-5 py-3.5">
                        {ride.voucherApplied
                          ? <span className={`text-[10px] font-medium ${theme.colors.primaryText} flex items-center gap-0.5`}><Zap size={9} /> Applied</span>
                          : <span className="text-[10px] text-gray-400">—</span>}
                      </td>
                      <td className="px-5 py-3.5"><RideStatusBadge status={ride.status} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════
           SCHEDULED
         ══════════════════════════════════════════════ */}
      {tab === 'scheduled' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center mb-2">
            <p className="text-sm text-gray-500">Upcoming Uber rides booked for {careRecipient.name}</p>
            <button onClick={() => setBookOpen(true)}
              className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium">
              <Plus size={16} /> Book Ride
            </button>
          </div>
          {scheduledRides.map(ride => (
            <div key={ride.id} className="bg-white rounded-xl border border-gray-100 p-5">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="text-center min-w-[48px]">
                    <div className="text-[10px] text-gray-400 uppercase font-medium">{ride.date.split(' ')[0]}</div>
                    <div className="text-2xl font-bold text-gray-900">{ride.date.split(' ')[1]}</div>
                    <div className="text-xs text-gray-500">{ride.time}</div>
                  </div>
                  <div className="w-px h-14 bg-gray-100" />
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <RideStatusBadge status={ride.status} />
                      <PurposePill purpose="Medical" />
                    </div>
                    <div className="text-sm font-semibold text-gray-900">{ride.purpose}</div>
                    <div className="flex items-center gap-1.5 mt-1.5 text-xs text-gray-400">
                      <Navigation size={11} />
                      {ride.from} → {ride.to}
                      <span>· ~${ride.fareEst.toFixed(0)}</span>
                      <span className={`${theme.colors.primaryText} flex items-center gap-0.5`}><Zap size={9} /> Voucher</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="px-3 py-1.5 text-xs font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200">Edit</button>
                  <button className="px-3 py-1.5 text-xs font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100">Cancel</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ══════════════════════════════════════════════
           HISTORY
         ══════════════════════════════════════════════ */}
      {tab === 'history' && (
        <div className="bg-white rounded-xl border border-gray-100 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/50">
                {['Trip ID', 'Route', 'Date & Time', 'Duration', 'Driver', 'Purpose', 'Fare', 'Voucher', 'Status'].map(h => (
                  <th key={h} className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rideHistory.map(ride => (
                <tr key={ride.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                  <td className="px-5 py-4 text-xs font-medium text-gray-500">{ride.id}</td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 bg-gray-900 rounded-full" />
                      <span className="text-xs text-gray-700">{ride.from}</span>
                    </div>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <div className={`w-1.5 h-1.5 rounded-full ${theme.colors.primary}`} />
                      <span className="text-xs text-gray-700">{ride.to}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-xs text-gray-500">{ride.date}<br />{ride.time}</td>
                  <td className="px-5 py-4 text-xs text-gray-500">{ride.duration}</td>
                  <td className="px-5 py-4">
                    <div className="text-xs font-medium text-gray-700">{ride.driver}</div>
                    <div className="flex items-center gap-0.5 mt-0.5">
                      <Star size={10} className="text-amber-400 fill-amber-400" />
                      <span className="text-[10px] text-gray-400">{ride.driverRating}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4"><PurposePill purpose={ride.purpose} /></td>
                  <td className="px-5 py-4 font-semibold text-gray-900">${ride.fare.toFixed(2)}</td>
                  <td className="px-5 py-4">
                    {ride.voucherApplied
                      ? <span className={`text-[10px] font-medium ${theme.colors.primaryText} flex items-center gap-0.5`}><Zap size={9} /> Applied</span>
                      : <span className="text-[10px] text-gray-400">—</span>}
                  </td>
                  <td className="px-5 py-4"><RideStatusBadge status={ride.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ══════════════════════════════════════════════
           PLACES
         ══════════════════════════════════════════════ */}
      {tab === 'places' && (
        <div className="space-y-4">
          <p className="text-sm text-gray-500">Destinations {careRecipient.name} visits most — tap to quickly book</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {frequentDestinations.map((dest, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-100 p-5 hover:border-gray-900 hover:shadow-md transition-all group">
                <div className="flex items-start gap-3 mb-4">
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${dest.purpose === 'Medical' ? 'bg-red-50' : 'bg-blue-50'}`}>
                    <MapPin size={18} className={dest.purpose === 'Medical' ? 'text-red-500' : 'text-blue-500'} />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{dest.name}</div>
                    <div className="text-xs text-gray-500 mt-0.5">{dest.address}</div>
                    <PurposePill purpose={dest.purpose} />
                  </div>
                </div>
                <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                  <span className="flex items-center gap-1"><Car size={11} /> {dest.rides} past rides</span>
                  <span className="flex items-center gap-1"><Wallet size={11} /> Avg ${dest.avgFare.toFixed(2)}</span>
                </div>
                <button onClick={() => setBookOpen(true)}
                  className="w-full py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-900 hover:text-white transition-colors flex items-center justify-center gap-2 group-hover:bg-gray-900 group-hover:text-white">
                  <Car size={14} /> Book Ride Here
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {bookOpen  && <BookRideModal onClose={() => setBookOpen(false)} />}
      <VoiceAssistant isOpen={voiceOpen} onClose={() => setVoiceOpen(false)} />
    </div>
  )
}
