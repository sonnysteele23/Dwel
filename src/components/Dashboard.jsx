import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  CalendarDays, Activity, Mic, Car, ShoppingBag,
  TrendingUp, TrendingDown, Clock, Star, MapPin,
  DollarSign, BarChart3, Zap, Package, AlertCircle, RefreshCw,
  CheckCircle2, Truck, Eye, ChevronRight, Bell, CreditCard,
  Repeat, Settings, Heart, Phone, Shield, Thermometer,
  Pill, Utensils, Home, Sun, Moon, Droplets, Footprints,
  MessageSquare, FileText, Users, ArrowUpRight, ArrowDownRight, Plus
} from 'lucide-react'
import VoiceAssistant from './VoiceAssistant'

// ─── Care Recipient Profile ────────────────────────────────────

const careRecipient = {
  name: 'Robert Chen',
  initials: 'RC',
  age: 78,
  relationship: 'Father',
  address: '123 Oak Street, Apt 4B, Boston, MA 02101',
  phone: '(555) 234-5678',
  primaryDoctor: 'Dr. Sarah Kim',
  conditions: ['Hypertension', 'Type 2 Diabetes', 'Mild Arthritis'],
  medications: [
    { name: 'Lisinopril 10mg', time: '8:00 AM', taken: true },
    { name: 'Metformin 500mg', time: '8:00 AM', taken: true },
    { name: 'Metformin 500mg', time: '6:00 PM', taken: false },
    { name: 'Aspirin 81mg', time: '8:00 AM', taken: true },
  ],
  dietaryProfile: ['Low Sodium', 'Diabetic-Friendly', 'No Shellfish'],
  emergencyContact: 'Michael Chen (Son) — (555) 345-6789',
}

// ─── Today's Schedule ──────────────────────────────────────────

const todaySchedule = [
  { time: '8:00 AM', event: 'Morning Medications', type: 'medication', status: 'completed', icon: Pill },
  { time: '10:30 AM', event: 'Uber Ride → Dr. Kim\'s Office', type: 'ride', status: 'completed', icon: Car, detail: 'RIDE-4421 • $18.50' },
  { time: '11:00 AM', event: 'Cardiology Checkup', type: 'appointment', status: 'completed', icon: Heart, detail: 'Dr. Sarah Kim, Brookline Medical' },
  { time: '12:30 PM', event: 'Grocery Delivery from Stop & Shop', type: 'delivery', status: 'in_progress', icon: Truck, detail: 'UE-8845 • 8 items • ETA 12 min' },
  { time: '2:00 PM', event: 'Physical Therapy Exercises', type: 'activity', status: 'upcoming', icon: Footprints },
  { time: '6:00 PM', event: 'Evening Medications', type: 'medication', status: 'upcoming', icon: Pill },
  { time: '7:00 PM', event: 'Panera Bread Dinner Delivery', type: 'delivery', status: 'upcoming', icon: Utensils, detail: 'Auto-order • Heart-Healthy Soup + Salad' },
]

// ─── Health Vitals (from connected devices / care log) ─────────

const healthVitals = {
  bloodPressure: { value: '128/82', status: 'normal', trend: 'stable', lastChecked: 'Today, 9:00 AM' },
  bloodSugar: { value: '142 mg/dL', status: 'slightly elevated', trend: 'improving', lastChecked: 'Today, 7:30 AM' },
  weight: { value: '168 lbs', status: 'normal', trend: 'stable', lastChecked: 'Yesterday' },
  medicationAdherence: { value: '92%', status: 'good', trend: 'stable', lastChecked: 'This week' },
}

// ─── Upcoming Appointments ─────────────────────────────────────

const upcomingAppointments = [
  { date: 'Mar 1', time: '2:00 PM', doctor: 'Dr. Sarah Kim', type: 'Cardiology Follow-up', location: 'Brookline Medical Center', rideScheduled: true, rideId: 'RIDE-4430' },
  { date: 'Mar 8', time: '10:00 AM', doctor: 'Dr. James Park', type: 'Endocrinology (Diabetes)', location: 'Mass General Hospital', rideScheduled: false },
  { date: 'Mar 15', time: '3:30 PM', doctor: 'Dr. Lisa Wong', type: 'Primary Care', location: 'Boston Health Partners', rideScheduled: false },
]

// ─── Ride Activity Summary ─────────────────────────────────────

const ridesSummary = {
  thisMonth: 4,
  totalSpent: 62.00,
  avgFare: 15.50,
  mostVisited: "Dr. Kim's Office (3 rides)",
  nextScheduled: { date: 'Mar 1, 1:30 PM', to: 'Brookline Medical Center' },
}

// ─── Delivery Activity Summary ─────────────────────────────────

const deliverySummary = {
  thisMonth: 6,
  totalSpent: 231.37,
  topStore: 'Stop & Shop',
  activeDelivery: { merchant: 'Stop & Shop', icon: '🛒', items: 8, eta: '12 min', courier: 'Marcus T.' },
  recurringActive: 3,
  nextRecurring: { name: "Dad's Weekly Essentials", date: 'Tomorrow' },
}

// ─── Spending Overview ─────────────────────────────────────────

const spendingData = {
  thisMonth: { groceries: 142.07, meals: 54.80, pharmacy: 34.50, rides: 62.00, total: 293.37 },
  lastMonth: { total: 267.40 },
  voucherBalance: 106.63,
  voucherTotal: 400.00,
}

// ─── Recent Activity Feed ──────────────────────────────────────

const activityFeed = [
  { time: '35 min ago', text: 'Grocery delivery ordered from Stop & Shop (8 items)', type: 'delivery', icon: ShoppingBag },
  { time: '2 hours ago', text: 'Uber ride completed — Dr. Kim\'s Office → Home ($16.00)', type: 'ride', icon: Car },
  { time: '3 hours ago', text: 'Cardiology checkup completed with Dr. Kim', type: 'appointment', icon: Heart },
  { time: '4 hours ago', text: 'Uber ride completed — Home → Dr. Kim\'s Office ($18.50)', type: 'ride', icon: Car },
  { time: '6 hours ago', text: 'Morning medications taken (3 of 3)', type: 'medication', icon: Pill },
  { time: 'Yesterday', text: 'CVS Pharmacy delivery — 3 items ($34.50)', type: 'delivery', icon: Package },
  { time: 'Yesterday', text: 'Blood pressure reading: 125/80 — Normal', type: 'health', icon: Heart },
  { time: '2 days ago', text: 'Stop & Shop delivery — 12 items ($52.84)', type: 'delivery', icon: ShoppingBag },
  { time: '2 days ago', text: 'Physical therapy exercises completed', type: 'activity', icon: Footprints },
  { time: '3 days ago', text: 'Auto-reorder: Heart-Healthy Groceries placed', type: 'recurring', icon: Repeat },
]

const activityColors = {
  delivery: 'bg-green-100 text-green-600',
  ride: 'bg-gray-100 text-gray-700',
  appointment: 'bg-red-100 text-red-600',
  medication: 'bg-purple-100 text-purple-600',
  health: 'bg-pink-100 text-pink-600',
  activity: 'bg-blue-100 text-blue-600',
  recurring: 'bg-dwel-teal-light text-dwel-teal',
}

// ─── Inventory Alerts ──────────────────────────────────────────

const inventoryAlerts = [
  { item: 'Whole Milk', daysLeft: 2, severity: 'urgent' },
  { item: 'Bananas', daysLeft: 3, severity: 'urgent' },
  { item: 'Low Sodium Broth', daysLeft: 4, severity: 'warning' },
  { item: 'Ensure Shakes', daysLeft: 5, severity: 'warning' },
]

// ─── Sub-Components ─────────────────────────────────────────────

function TimelineItem({ item }) {
  const statusColors = {
    completed: 'bg-green-500',
    in_progress: 'bg-blue-500 animate-pulse',
    upcoming: 'bg-gray-300',
  }
  const Icon = item.icon
  return (
    <div className="flex gap-3 relative">
      <div className="flex flex-col items-center">
        <div className={`w-3 h-3 rounded-full ${statusColors[item.status]} shrink-0 mt-1.5 z-10`} />
        <div className="w-px flex-1 bg-gray-200 -mb-3" />
      </div>
      <div className="pb-5 flex-1">
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-gray-400 w-16 shrink-0">{item.time}</span>
          <div className={`flex items-center gap-2 flex-1 ${item.status === 'completed' ? 'text-gray-500' : item.status === 'in_progress' ? 'text-blue-700 font-medium' : 'text-gray-700'}`}>
            <Icon size={14} className={item.status === 'in_progress' ? 'text-blue-500' : item.status === 'completed' ? 'text-green-500' : 'text-gray-400'} />
            <span className="text-sm">{item.event}</span>
          </div>
        </div>
        {item.detail && (
          <div className="ml-[76px] text-xs text-gray-400 mt-0.5">{item.detail}</div>
        )}
        {item.status === 'in_progress' && (
          <div className="ml-[76px] mt-1">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-blue-50 border border-blue-200 rounded-full text-[10px] font-medium text-blue-700">
              <Truck size={9} /> In progress
            </span>
          </div>
        )}
      </div>
    </div>
  )
}

function VitalCard({ label, data, icon: Icon, color }) {
  const trendIcons = { improving: ArrowDownRight, stable: null, declining: ArrowUpRight }
  const trendColors = { improving: 'text-green-500', stable: 'text-gray-400', declining: 'text-red-500' }
  const statusColors = {
    normal: 'text-green-600 bg-green-50',
    good: 'text-green-600 bg-green-50',
    'slightly elevated': 'text-amber-600 bg-amber-50',
    elevated: 'text-red-600 bg-red-50',
  }
  const TrendIcon = trendIcons[data.trend]
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4">
      <div className="flex items-center justify-between mb-2">
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${color}`}>
          <Icon size={16} />
        </div>
        {TrendIcon && <TrendIcon size={14} className={trendColors[data.trend]} />}
      </div>
      <div className="text-lg font-bold text-gray-900">{data.value}</div>
      <div className="text-xs text-gray-500 mt-0.5">{label}</div>
      <div className="flex items-center justify-between mt-2">
        <span className={`inline-block px-1.5 py-0.5 rounded text-[10px] font-medium ${statusColors[data.status] || 'text-gray-600 bg-gray-50'}`}>
          {data.status}
        </span>
        <span className="text-[10px] text-gray-400">{data.lastChecked}</span>
      </div>
    </div>
  )
}

// ─── Main Dashboard ─────────────────────────────────────────────

export default function Dashboard() {
  const navigate = useNavigate()
  const [voiceOpen, setVoiceOpen] = useState(false)

  const monthChange = spendingData.thisMonth.total - spendingData.lastMonth.total
  const monthChangePct = ((monthChange / spendingData.lastMonth.total) * 100).toFixed(0)
  const medsTaken = careRecipient.medications.filter(m => m.taken).length
  const medsTotal = careRecipient.medications.length

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* ═══ Header ═══════════════════════════════════════════ */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Care Dashboard</h1>
          <p className="text-gray-500 mt-1">Everything about {careRecipient.name}'s care — at a glance</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setVoiceOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-dwel-teal-light text-dwel-teal rounded-lg hover:bg-dwel-teal hover:text-white transition-colors font-medium text-sm">
            <Mic size={16} /> Voice Assistant
          </button>
        </div>
      </div>

      {/* ═══ Care Recipient Banner ════════════════════════════ */}
      <div className="bg-white rounded-xl border border-gray-200 p-5 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-dwel-teal-light rounded-full flex items-center justify-center text-lg font-semibold text-dwel-teal">
              {careRecipient.initials}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-gray-900">{careRecipient.name}</h2>
                <span className="px-2 py-0.5 bg-gray-100 rounded text-xs font-medium text-gray-600">{careRecipient.relationship}</span>
                <span className="px-2 py-0.5 bg-gray-100 rounded text-xs font-medium text-gray-600">Age {careRecipient.age}</span>
              </div>
              <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
                <span className="flex items-center gap-1"><MapPin size={12} /> {careRecipient.address}</span>
                <span className="flex items-center gap-1"><Phone size={12} /> {careRecipient.phone}</span>
              </div>
              <div className="flex gap-1.5 mt-2">
                {careRecipient.conditions.map((c, i) => (
                  <span key={i} className="px-2 py-0.5 bg-red-50 border border-red-100 rounded text-[10px] font-medium text-red-700">{c}</span>
                ))}
                {careRecipient.dietaryProfile.map((d, i) => (
                  <span key={i} className="px-2 py-0.5 bg-emerald-50 border border-emerald-100 rounded text-[10px] font-medium text-emerald-700">{d}</span>
                ))}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-green-50 border border-green-200 rounded-full">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              <span className="text-xs font-medium text-green-700">Uber Linked</span>
            </div>
            <button onClick={() => navigate('/demo/recipients')} className="px-3 py-1.5 text-xs font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
              View Profile
            </button>
          </div>
        </div>
      </div>

      {/* ═══ Quick Stats Row ══════════════════════════════════ */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center gap-2 mb-1">
            <Pill size={14} className="text-purple-500" />
            <span className="text-xs text-gray-500">Meds Today</span>
          </div>
          <div className="text-xl font-bold text-gray-900">{medsTaken}/{medsTotal}</div>
          <div className="w-full bg-gray-100 rounded-full h-1.5 mt-1.5">
            <div className="h-1.5 rounded-full bg-purple-500" style={{ width: `${(medsTaken / medsTotal) * 100}%` }} />
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center gap-2 mb-1">
            <Car size={14} className="text-gray-700" />
            <span className="text-xs text-gray-500">Rides (Month)</span>
          </div>
          <div className="text-xl font-bold text-gray-900">{ridesSummary.thisMonth}</div>
          <div className="text-[11px] text-gray-400 mt-0.5">${ridesSummary.totalSpent.toFixed(0)} spent</div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center gap-2 mb-1">
            <ShoppingBag size={14} className="text-green-600" />
            <span className="text-xs text-gray-500">Deliveries</span>
          </div>
          <div className="text-xl font-bold text-gray-900">{deliverySummary.thisMonth}</div>
          <div className="text-[11px] text-gray-400 mt-0.5">${deliverySummary.totalSpent.toFixed(0)} spent</div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center gap-2 mb-1">
            <DollarSign size={14} className="text-dwel-teal" />
            <span className="text-xs text-gray-500">Total Spend</span>
          </div>
          <div className="text-xl font-bold text-gray-900">${spendingData.thisMonth.total.toFixed(0)}</div>
          <div className="text-[11px] text-gray-400 mt-0.5 flex items-center gap-0.5">
            {monthChange > 0
              ? <><TrendingUp size={10} className="text-red-500" /> +{monthChangePct}% vs last mo</>
              : <><TrendingDown size={10} className="text-green-500" /> {monthChangePct}% vs last mo</>
            }
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center gap-2 mb-1">
            <CreditCard size={14} className="text-dwel-teal" />
            <span className="text-xs text-gray-500">Voucher Left</span>
          </div>
          <div className="text-xl font-bold text-dwel-teal">${spendingData.voucherBalance.toFixed(0)}</div>
          <div className="w-full bg-gray-100 rounded-full h-1.5 mt-1.5">
            <div className="h-1.5 rounded-full bg-dwel-teal" style={{ width: `${(spendingData.voucherBalance / spendingData.voucherTotal) * 100}%` }} />
          </div>
        </div>
      </div>

      {/* ═══ Active Delivery Banner ═══════════════════════════ */}
      {deliverySummary.activeDelivery && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center text-xl">{deliverySummary.activeDelivery.icon}</div>
              <div>
                <div className="text-sm font-semibold text-blue-900 flex items-center gap-2">
                  {deliverySummary.activeDelivery.merchant} — {deliverySummary.activeDelivery.items} items
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-blue-100 text-blue-700 border border-blue-200">
                    <Truck size={9} /> On the way
                  </span>
                </div>
                <div className="text-xs text-blue-700 mt-0.5">
                  Courier: {deliverySummary.activeDelivery.courier} • ETA: <strong>{deliverySummary.activeDelivery.eta}</strong>
                </div>
              </div>
            </div>
            <button onClick={() => navigate('/demo/shopping')}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-blue-700 bg-blue-100 rounded-lg hover:bg-blue-200 transition-colors">
              <Eye size={12} /> Track
            </button>
          </div>
        </div>
      )}

      {/* ═══ Main Content Grid ════════════════════════════════ */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* ─── Left Column: Today's Schedule + Health ─────── */}
        <div className="lg:col-span-2 space-y-6">

          {/* Today's Timeline */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                <Sun size={18} className="text-amber-500" /> Today's Schedule
              </h3>
              <button onClick={() => navigate('/demo/calendar')} className="text-xs text-dwel-teal font-medium hover:underline flex items-center gap-1">
                Full calendar <ChevronRight size={12} />
              </button>
            </div>
            <div>
              {todaySchedule.map((item, i) => (
                <TimelineItem key={i} item={item} />
              ))}
            </div>
          </div>

          {/* Health Vitals */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <Heart size={18} className="text-red-500" /> Health Overview
              </h3>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <VitalCard label="Blood Pressure" data={healthVitals.bloodPressure} icon={Heart} color="bg-red-100 text-red-600" />
              <VitalCard label="Blood Sugar" data={healthVitals.bloodSugar} icon={Droplets} color="bg-blue-100 text-blue-600" />
              <VitalCard label="Weight" data={healthVitals.weight} icon={Activity} color="bg-amber-100 text-amber-600" />
              <VitalCard label="Med Adherence" data={healthVitals.medicationAdherence} icon={Pill} color="bg-purple-100 text-purple-600" />
            </div>
          </div>

          {/* Medications */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h3 className="font-semibold text-gray-900 flex items-center gap-2 mb-4">
              <Pill size={18} className="text-purple-500" /> Today's Medications
            </h3>
            <div className="space-y-2">
              {careRecipient.medications.map((med, i) => (
                <div key={i} className={`flex items-center justify-between p-3 rounded-lg ${med.taken ? 'bg-green-50 border border-green-100' : 'bg-gray-50 border border-gray-100'}`}>
                  <div className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center ${med.taken ? 'bg-green-500' : 'bg-gray-300'}`}>
                      {med.taken && <CheckCircle2 size={14} className="text-white" />}
                    </div>
                    <div>
                      <div className={`text-sm font-medium ${med.taken ? 'text-green-800' : 'text-gray-700'}`}>{med.name}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-gray-500">{med.time}</span>
                    <span className={`text-xs font-medium ${med.taken ? 'text-green-600' : 'text-gray-400'}`}>
                      {med.taken ? 'Taken' : 'Pending'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Appointments */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <CalendarDays size={18} className="text-blue-600" /> Upcoming Appointments
              </h3>
              <button onClick={() => navigate('/demo/calendar')} className="text-sm text-dwel-teal font-medium hover:underline flex items-center gap-1">
                View all <ChevronRight size={14} />
              </button>
            </div>
            <div className="space-y-3">
              {upcomingAppointments.map((appt, i) => (
                <div key={i} className="bg-white rounded-xl border border-gray-200 p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="text-center min-w-[50px]">
                        <div className="text-xs text-gray-400 uppercase">{appt.date.split(' ')[0]}</div>
                        <div className="text-lg font-bold text-gray-900">{appt.date.split(' ')[1]}</div>
                      </div>
                      <div className="w-px h-10 bg-gray-200" />
                      <div>
                        <div className="text-sm font-semibold text-gray-900">{appt.type}</div>
                        <div className="text-xs text-gray-500">{appt.doctor} • {appt.time}</div>
                        <div className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
                          <MapPin size={10} /> {appt.location}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {appt.rideScheduled ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-green-50 border border-green-200 rounded-lg text-[11px] font-medium text-green-700">
                          <Car size={11} /> Ride booked
                        </span>
                      ) : (
                        <button className="inline-flex items-center gap-1 px-2.5 py-1 bg-amber-50 border border-amber-200 rounded-lg text-[11px] font-medium text-amber-700 hover:bg-amber-100 transition-colors">
                          <Car size={11} /> Book ride
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Inventory Alerts */}
          {inventoryAlerts.length > 0 && (
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="flex items-center gap-2 text-sm font-semibold text-amber-800">
                  <AlertCircle size={14} /> Supply Alerts — Running Low
                </h3>
                <button onClick={() => navigate('/demo/shopping')} className="text-xs text-amber-700 font-medium hover:underline flex items-center gap-1">
                  Order now <ChevronRight size={12} />
                </button>
              </div>
              <div className="flex gap-3 flex-wrap">
                {inventoryAlerts.map((a, i) => (
                  <div key={i} className={`px-3 py-2 bg-white rounded-lg border ${a.severity === 'urgent' ? 'border-red-200' : 'border-amber-100'}`}>
                    <div className="text-sm font-medium text-gray-900">{a.item}</div>
                    <div className={`text-xs ${a.severity === 'urgent' ? 'text-red-600' : 'text-amber-600'}`}>~{a.daysLeft} days left</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Quick Actions Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <button onClick={() => navigate('/demo/shopping')}
              className="bg-white rounded-xl border border-gray-200 p-4 text-left hover:border-dwel-teal hover:shadow-md transition-all group">
              <ShoppingBag size={20} className="text-green-600 mb-2" />
              <div className="text-sm font-semibold text-gray-900">Order Groceries</div>
              <div className="text-xs text-gray-500 mt-0.5">Via Uber Eats</div>
            </button>
            <button onClick={() => setVoiceOpen(true)}
              className="bg-white rounded-xl border border-gray-200 p-4 text-left hover:border-dwel-teal hover:shadow-md transition-all group">
              <Car size={20} className="text-gray-700 mb-2" />
              <div className="text-sm font-semibold text-gray-900">Book a Ride</div>
              <div className="text-xs text-gray-500 mt-0.5">Uber Guest Rides</div>
            </button>
            <button onClick={() => navigate('/demo/calendar')}
              className="bg-white rounded-xl border border-gray-200 p-4 text-left hover:border-dwel-teal hover:shadow-md transition-all group">
              <CalendarDays size={20} className="text-blue-600 mb-2" />
              <div className="text-sm font-semibold text-gray-900">Schedule Appt.</div>
              <div className="text-xs text-gray-500 mt-0.5">With ride booking</div>
            </button>
            <button onClick={() => setVoiceOpen(true)}
              className="bg-white rounded-xl border border-gray-200 p-4 text-left hover:border-dwel-teal hover:shadow-md transition-all group">
              <Mic size={20} className="text-dwel-teal mb-2" />
              <div className="text-sm font-semibold text-gray-900">Voice Command</div>
              <div className="text-xs text-gray-500 mt-0.5">"Order Dad's lunch"</div>
            </button>
          </div>
        </div>

        {/* ─── Right Column: Activity Feed + Spending ────── */}
        <div className="space-y-6">

          {/* Spending Summary Card */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                <BarChart3 size={16} /> Spending
              </h3>
              <span className="text-xs text-gray-400">This month</span>
            </div>
            <div className="space-y-3">
              {[
                { label: 'Groceries', value: spendingData.thisMonth.groceries, pct: (spendingData.thisMonth.groceries / spendingData.thisMonth.total) * 100, color: 'bg-green-500', icon: '🛒' },
                { label: 'Rides', value: spendingData.thisMonth.rides, pct: (spendingData.thisMonth.rides / spendingData.thisMonth.total) * 100, color: 'bg-gray-700', icon: '🚗' },
                { label: 'Meals', value: spendingData.thisMonth.meals, pct: (spendingData.thisMonth.meals / spendingData.thisMonth.total) * 100, color: 'bg-orange-500', icon: '🍽️' },
                { label: 'Pharmacy', value: spendingData.thisMonth.pharmacy, pct: (spendingData.thisMonth.pharmacy / spendingData.thisMonth.total) * 100, color: 'bg-purple-500', icon: '💊' },
              ].map((item, i) => (
                <div key={i}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-gray-600 flex items-center gap-1.5">{item.icon} {item.label}</span>
                    <span className="text-xs font-semibold text-gray-900">${item.value.toFixed(0)}</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-1.5">
                    <div className={`h-1.5 rounded-full ${item.color}`} style={{ width: `${item.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
              <span className="text-sm text-gray-600">Total</span>
              <span className="text-lg font-bold text-gray-900">${spendingData.thisMonth.total.toFixed(2)}</span>
            </div>
            <div className="mt-3 p-3 bg-dwel-teal-light rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-xs text-dwel-teal font-medium">Employer Voucher</span>
                <span className="text-xs font-bold text-dwel-teal">${spendingData.voucherBalance.toFixed(0)} left</span>
              </div>
              <div className="w-full bg-white rounded-full h-1.5 mt-1.5">
                <div className="h-1.5 rounded-full bg-dwel-teal" style={{ width: `${(spendingData.voucherBalance / spendingData.voucherTotal) * 100}%` }} />
              </div>
            </div>
          </div>

          {/* Recurring Orders */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                <Repeat size={16} /> Auto-Orders
              </h3>
              <span className="text-xs text-dwel-teal font-medium">{deliverySummary.recurringActive} active</span>
            </div>
            {deliverySummary.nextRecurring && (
              <div className="p-3 bg-dwel-teal-light rounded-lg mb-3">
                <div className="text-xs text-dwel-teal font-medium flex items-center gap-1">
                  <Zap size={10} /> Next auto-order
                </div>
                <div className="text-sm font-semibold text-gray-900 mt-0.5">{deliverySummary.nextRecurring.name}</div>
                <div className="text-xs text-gray-500">{deliverySummary.nextRecurring.date}</div>
              </div>
            )}
            <button onClick={() => navigate('/demo/shopping')}
              className="w-full text-xs text-dwel-teal font-medium hover:underline flex items-center justify-center gap-1 py-1">
              Manage recurring orders <ChevronRight size={12} />
            </button>
          </div>

          {/* Activity Feed */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h3 className="font-semibold text-gray-900 flex items-center gap-2 mb-4">
              <Activity size={16} /> Activity Feed
            </h3>
            <div className="space-y-0 max-h-[480px] overflow-y-auto pr-1">
              {activityFeed.map((item, i) => {
                const Icon = item.icon
                const colorClass = activityColors[item.type] || 'bg-gray-100 text-gray-600'
                return (
                  <div key={i} className="flex gap-3 py-2.5 relative">
                    {i < activityFeed.length - 1 && (
                      <div className="absolute left-[13px] top-[34px] bottom-0 w-px bg-gray-100" />
                    )}
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 relative z-10 ${colorClass}`}>
                      <Icon size={12} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm text-gray-700 leading-snug">{item.text}</p>
                      <p className="text-[11px] text-gray-400 mt-0.5">{item.time}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Emergency Contact */}
          <div className="bg-red-50 border border-red-200 rounded-xl p-4">
            <h3 className="text-xs font-semibold text-red-800 uppercase tracking-wide mb-2 flex items-center gap-1.5">
              <Shield size={12} /> Emergency Contact
            </h3>
            <div className="text-sm font-medium text-red-900">{careRecipient.emergencyContact}</div>
            <div className="text-xs text-red-700 mt-1">Primary Doctor: {careRecipient.primaryDoctor}</div>
          </div>
        </div>
      </div>

      {/* Voice Assistant Modal */}
      <VoiceAssistant isOpen={voiceOpen} onClose={() => setVoiceOpen(false)} />
    </div>
  )
}
