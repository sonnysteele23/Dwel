import { useState } from 'react'
import {
  Heart, Brain, Shield, Activity, Mic, MessageCircle,
  TrendingUp, TrendingDown, Minus, AlertTriangle, CheckCircle2,
  Phone, MapPin, Pill, Car, ShoppingBag, Sun, Moon,
  Users, Home, Star, ChevronRight, Zap, Clock, Bell,
  Smile, Meh, Frown, Thermometer, Droplets, Weight,
  BarChart3, CalendarDays, ArrowUpRight, ArrowDownRight
} from 'lucide-react'
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, RadarChart, Radar, PolarGrid, PolarAngleAxis } from 'recharts'

// ─── Recipient ─────────────────────────────────────────────────

const recipient = {
  name: 'Robert Chen',
  initials: 'RC',
  age: 78,
  relationship: 'Father',
  address: '123 Oak Street, Apt 4B, Boston, MA 02101',
  phone: '(555) 234-5678',
  conditions: ['Hypertension', 'Type 2 Diabetes', 'Mild Arthritis'],
  primaryDoctor: 'Dr. Sarah Kim',
  wellbeingScore: 74,
  wellbeingDelta: +3,
  riskLevel: 'low',
  lastVoiceInteraction: '2 hours ago',
  daysHomeSince: 847,
}

// ─── Sentiment Data (30 days) ──────────────────────────────────

const sentimentData = [
  { day: 'Feb 1', score: 72, mood: 'happy', label: 'Happy' },
  { day: 'Feb 3', score: 68, mood: 'neutral', label: 'Neutral' },
  { day: 'Feb 5', score: 61, mood: 'anxious', label: 'Anxious' },
  { day: 'Feb 7', score: 65, mood: 'neutral', label: 'Neutral' },
  { day: 'Feb 9', score: 70, mood: 'happy', label: 'Happy' },
  { day: 'Feb 11', score: 55, mood: 'lonely', label: 'Lonely' },
  { day: 'Feb 13', score: 60, mood: 'neutral', label: 'Neutral' },
  { day: 'Feb 15', score: 74, mood: 'happy', label: 'Happy' },
  { day: 'Feb 17', score: 71, mood: 'happy', label: 'Happy' },
  { day: 'Feb 19', score: 63, mood: 'neutral', label: 'Neutral' },
  { day: 'Feb 21', score: 58, mood: 'anxious', label: 'Anxious' },
  { day: 'Feb 23', score: 67, mood: 'neutral', label: 'Neutral' },
  { day: 'Feb 25', score: 76, mood: 'happy', label: 'Happy' },
  { day: 'Feb 26', score: 74, mood: 'happy', label: 'Happy' },
]

const moodColors = {
  happy: '#0D9488',
  neutral: '#6B7280',
  anxious: '#F59E0B',
  lonely: '#8B5CF6',
  confused: '#EF4444',
}

const moodBg = {
  happy: 'bg-teal-50 text-teal-700 border-teal-200',
  neutral: 'bg-gray-100 text-gray-600 border-gray-200',
  anxious: 'bg-amber-50 text-amber-700 border-amber-200',
  lonely: 'bg-purple-50 text-purple-700 border-purple-200',
  confused: 'bg-red-50 text-red-700 border-red-200',
}

const recentSentimentBreakdown = [
  { mood: 'Happy', pct: 43, color: '#0D9488' },
  { mood: 'Neutral', pct: 36, color: '#6B7280' },
  { mood: 'Anxious', pct: 14, color: '#F59E0B' },
  { mood: 'Lonely', pct: 7, color: '#8B5CF6' },
]

// ─── Vitals Trend ──────────────────────────────────────────────

const bpData = [
  { day: 'Feb 20', systolic: 132, diastolic: 84 },
  { day: 'Feb 21', systolic: 128, diastolic: 82 },
  { day: 'Feb 22', systolic: 135, diastolic: 86 },
  { day: 'Feb 23', systolic: 130, diastolic: 83 },
  { day: 'Feb 24', systolic: 127, diastolic: 81 },
  { day: 'Feb 25', systolic: 129, diastolic: 82 },
  { day: 'Feb 26', systolic: 128, diastolic: 82 },
]

const glucoseData = [
  { day: 'Feb 20', mg: 156 },
  { day: 'Feb 21', mg: 148 },
  { day: 'Feb 22', mg: 162 },
  { day: 'Feb 23', mg: 144 },
  { day: 'Feb 24', mg: 138 },
  { day: 'Feb 25', mg: 142 },
  { day: 'Feb 26', mg: 142 },
]

const weightData = [
  { week: 'Jan W3', lbs: 171 },
  { week: 'Jan W4', lbs: 170 },
  { week: 'Feb W1', lbs: 169 },
  { week: 'Feb W2', lbs: 168 },
  { week: 'Feb W3', lbs: 168 },
  { week: 'Feb W4', lbs: 168 },
]

// ─── Medication Adherence (weekly %) ──────────────────────────

const medAdherenceData = [
  { week: 'Jan W4', pct: 85 },
  { week: 'Feb W1', pct: 88 },
  { week: 'Feb W2', pct: 79 },
  { week: 'Feb W3', pct: 93 },
  { week: 'Feb W4', pct: 92 },
]

// ─── Social & Engagement ──────────────────────────────────────

const engagementData = [
  { day: 'Mon', conversations: 6, avgMinutes: 4 },
  { day: 'Tue', conversations: 4, avgMinutes: 3 },
  { day: 'Wed', conversations: 8, avgMinutes: 5 },
  { day: 'Thu', conversations: 3, avgMinutes: 2 },
  { day: 'Fri', conversations: 7, avgMinutes: 4 },
  { day: 'Sat', conversations: 5, avgMinutes: 6 },
  { day: 'Sun', conversations: 9, avgMinutes: 7 },
]

// ─── Independence Indicators ──────────────────────────────────

const independenceData = [
  { label: 'Voice Tasks / Week', value: 23, unit: 'tasks', trend: 'up', delta: '+4', color: 'text-dwel-teal' },
  { label: 'Rides Taken', value: 4, unit: 'this month', trend: 'stable', delta: '0', color: 'text-gray-600' },
  { label: 'Meals Ordered', value: 7, unit: 'this month', trend: 'up', delta: '+2', color: 'text-orange-500' },
  { label: 'Groceries Reordered', value: 3, unit: 'this month', trend: 'stable', delta: '0', color: 'text-green-600' },
]

const radarData = [
  { subject: 'Physical', A: 72 },
  { subject: 'Social', A: 58 },
  { subject: 'Emotional', A: 74 },
  { subject: 'Independence', A: 81 },
  { subject: 'Nutrition', A: 68 },
  { subject: 'Safety', A: 88 },
]

// ─── Alerts & Escalations ─────────────────────────────────────

const circleOfCareAlerts = [
  {
    date: 'Feb 21, 2:14 PM',
    severity: 'medium',
    type: 'Emotional',
    message: 'Voice tone detected as anxious during ride request. Robert mentioned feeling "overwhelmed."',
    action: 'Notification sent to Michael Chen (Son)',
    resolved: true,
  },
  {
    date: 'Feb 11, 9:30 AM',
    severity: 'medium',
    type: 'Social',
    message: 'No voice interactions for 26 hours. Isolation risk flag triggered.',
    action: 'Check-in call placed via Dwel AI. Robert reported he was fine.',
    resolved: true,
  },
  {
    date: 'Feb 5, 4:00 PM',
    severity: 'low',
    type: 'Health',
    message: 'Blood glucose reading of 162 mg/dL — above target range.',
    action: 'Alert sent to Dr. Sarah Kim. Evening snack reminder adjusted.',
    resolved: true,
  },
]

const severityStyle = {
  low: 'bg-blue-50 border-blue-200 text-blue-700',
  medium: 'bg-amber-50 border-amber-200 text-amber-800',
  high: 'bg-red-50 border-red-200 text-red-800',
}

const severityDot = {
  low: 'bg-blue-400',
  medium: 'bg-amber-400',
  high: 'bg-red-500',
}

// ─── Sub-Components ───────────────────────────────────────────

function StatCard({ icon: Icon, label, value, sub, color, bg }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4">
      <div className={`w-9 h-9 rounded-lg flex items-center justify-center mb-3 ${bg}`}>
        <Icon size={18} className={color} />
      </div>
      <div className="text-2xl font-bold text-gray-900">{value}</div>
      <div className="text-xs text-gray-500 mt-0.5">{label}</div>
      {sub && <div className="text-[11px] text-gray-400 mt-1">{sub}</div>}
    </div>
  )
}

function SectionHeader({ icon: Icon, title, sub, iconColor = 'text-dwel-teal' }) {
  return (
    <div className="flex items-center justify-between mb-4">
      <h3 className="font-semibold text-gray-900 flex items-center gap-2 text-base">
        <Icon size={18} className={iconColor} /> {title}
      </h3>
      {sub && <span className="text-xs text-gray-400">{sub}</span>}
    </div>
  )
}

function TrendBadge({ trend, delta }) {
  if (trend === 'up') return (
    <span className="inline-flex items-center gap-0.5 text-[10px] font-medium text-green-600 bg-green-50 px-1.5 py-0.5 rounded">
      <ArrowUpRight size={10} /> {delta}
    </span>
  )
  if (trend === 'down') return (
    <span className="inline-flex items-center gap-0.5 text-[10px] font-medium text-red-600 bg-red-50 px-1.5 py-0.5 rounded">
      <ArrowDownRight size={10} /> {delta}
    </span>
  )
  return (
    <span className="inline-flex items-center gap-0.5 text-[10px] font-medium text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded">
      <Minus size={10} /> stable
    </span>
  )
}

function WellbeingGauge({ score }) {
  const color = score >= 75 ? '#0D9488' : score >= 50 ? '#F59E0B' : '#EF4444'
  const label = score >= 75 ? 'Good' : score >= 50 ? 'Fair' : 'At Risk'
  const circumference = 2 * Math.PI * 54
  const dashoffset = circumference * (1 - score / 100)
  return (
    <div className="flex flex-col items-center">
      <div className="relative w-36 h-36">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
          <circle cx="60" cy="60" r="54" fill="none" stroke="#E5E7EB" strokeWidth="10" />
          <circle
            cx="60" cy="60" r="54" fill="none"
            stroke={color} strokeWidth="10"
            strokeDasharray={circumference}
            strokeDashoffset={dashoffset}
            strokeLinecap="round"
            style={{ transition: 'stroke-dashoffset 0.8s ease' }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-bold text-gray-900">{score}</span>
          <span className="text-xs font-medium" style={{ color }}>{label}</span>
        </div>
      </div>
      <div className="text-xs text-gray-400 mt-1">Wellbeing Score</div>
    </div>
  )
}

// ─── Custom Tooltip ───────────────────────────────────────────

function SentimentTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null
  const d = payload[0]?.payload
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-md px-3 py-2 text-xs">
      <div className="font-semibold text-gray-800 mb-0.5">{label}</div>
      <div className="flex items-center gap-1.5">
        <span className="font-medium text-gray-700">Score: {d?.score}</span>
        <span className={`px-1.5 py-0.5 rounded border text-[10px] font-medium ${moodBg[d?.mood]}`}>{d?.label}</span>
      </div>
    </div>
  )
}

// ─── Main Component ───────────────────────────────────────────

export default function RecipientHealth() {
  const [activeTab, setActiveTab] = useState('overview')
  const lastMood = sentimentData[sentimentData.length - 1]

  return (
    <div className="p-6 max-w-7xl mx-auto">

      {/* ═══ Header ══════════════════════════════════════════ */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Recipient Health</h1>
          <p className="text-gray-500 mt-1">AI-monitored wellbeing for {recipient.name} — keeping him home, safe & independent</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-green-50 border border-green-200 rounded-full">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-xs font-medium text-green-700">Voice Active</span>
          </div>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-dwel-teal-light text-dwel-teal rounded-lg hover:bg-dwel-teal hover:text-white transition-colors font-medium text-sm">
            <Mic size={16} /> Voice Assistant
          </button>
        </div>
      </div>

      {/* ═══ Recipient Banner ════════════════════════════════ */}
      <div className="bg-white rounded-xl border border-gray-200 p-5 mb-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-dwel-teal-light rounded-full flex items-center justify-center text-lg font-semibold text-dwel-teal shrink-0">
              {recipient.initials}
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-xl font-bold text-gray-900">{recipient.name}</h2>
                <span className="px-2 py-0.5 bg-gray-100 rounded text-xs font-medium text-gray-600">{recipient.relationship}</span>
                <span className="px-2 py-0.5 bg-gray-100 rounded text-xs font-medium text-gray-600">Age {recipient.age}</span>
                <span className={`px-2 py-0.5 rounded text-xs font-medium border ${moodBg[lastMood.mood]}`}>
                  Feeling {lastMood.label}
                </span>
              </div>
              <div className="flex items-center gap-4 mt-1 text-sm text-gray-500 flex-wrap">
                <span className="flex items-center gap-1"><MapPin size={12} /> {recipient.address}</span>
                <span className="flex items-center gap-1"><Phone size={12} /> {recipient.phone}</span>
                <span className="flex items-center gap-1"><Mic size={12} /> Last voice: {recipient.lastVoiceInteraction}</span>
              </div>
              <div className="flex gap-1.5 mt-2 flex-wrap">
                {recipient.conditions.map((c, i) => (
                  <span key={i} className="px-2 py-0.5 bg-red-50 border border-red-100 rounded text-[10px] font-medium text-red-700">{c}</span>
                ))}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <WellbeingGauge score={recipient.wellbeingScore} />
            <div className="text-center">
              <div className="text-3xl font-bold text-dwel-teal">{recipient.daysHomeSince}</div>
              <div className="text-xs text-gray-500 mt-0.5">Days Living</div>
              <div className="text-xs text-gray-400">Independently at Home</div>
              <div className="flex items-center justify-center gap-1 mt-1">
                <Home size={12} className="text-dwel-teal" />
                <span className="text-[10px] font-medium text-dwel-teal">Staying Home ✓</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ═══ Quick Stats ═════════════════════════════════════ */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <StatCard icon={Brain} label="Voice Sentiment Today" value="Happy" sub="Score: 74/100" color="text-dwel-teal" bg="bg-dwel-teal-light" />
        <StatCard icon={Pill} label="Med Adherence (Week)" value="92%" sub="+3% vs last week" color="text-purple-600" bg="bg-purple-50" />
        <StatCard icon={MessageCircle} label="Voice Interactions Today" value="6" sub="Avg 4 min each" color="text-blue-600" bg="bg-blue-50" />
        <StatCard icon={Shield} label="Safety Risk Level" value="Low" sub="No flags in 5 days" color="text-green-600" bg="bg-green-50" />
      </div>

      {/* ═══ Main Grid ═══════════════════════════════════════ */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* ─── Left + Center (2 cols) ─────────────────────── */}
        <div className="lg:col-span-2 space-y-6">

          {/* Sentiment Trend Chart */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <SectionHeader icon={Brain} title="Voice Sentiment Analysis" sub="Last 30 days" />
            <div className="flex gap-4 mb-4 flex-wrap">
              {recentSentimentBreakdown.map((s, i) => (
                <div key={i} className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: s.color }} />
                  <span className="text-xs text-gray-600">{s.mood}</span>
                  <span className="text-xs font-semibold text-gray-900">{s.pct}%</span>
                </div>
              ))}
            </div>
            <ResponsiveContainer width="100%" height={180}>
              <AreaChart data={sentimentData} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
                <defs>
                  <linearGradient id="sentGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0D9488" stopOpacity={0.18} />
                    <stop offset="95%" stopColor="#0D9488" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="day" tick={{ fontSize: 10, fill: '#9CA3AF' }} tickLine={false} axisLine={false} interval={2} />
                <YAxis domain={[40, 100]} tick={{ fontSize: 10, fill: '#9CA3AF' }} tickLine={false} axisLine={false} />
                <Tooltip content={<SentimentTooltip />} />
                <Area type="monotone" dataKey="score" stroke="#0D9488" strokeWidth={2.5} fill="url(#sentGrad)" dot={(p) => {
                  const c = moodColors[p.payload.mood] || '#6B7280'
                  return <circle key={p.index} cx={p.cx} cy={p.cy} r={4} fill={c} stroke="white" strokeWidth={1.5} />
                }} />
              </AreaChart>
            </ResponsiveContainer>
            <div className="mt-3 p-3 bg-amber-50 border border-amber-200 rounded-lg flex items-start gap-2">
              <AlertTriangle size={14} className="text-amber-600 mt-0.5 shrink-0" />
              <div className="text-xs text-amber-800">
                <span className="font-semibold">AI Insight:</span> Robert showed anxiety on Feb 21 after a medical appointment. Sentiment recovered within 24h. Recommend routine check-in calls on appointment days.
              </div>
            </div>
          </div>

          {/* Vitals Charts */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <SectionHeader icon={Heart} title="Health Vitals Trends" sub="7-day" iconColor="text-red-500" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Blood Pressure */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700 flex items-center gap-1.5"><Heart size={13} className="text-red-400" /> Blood Pressure</span>
                  <span className="text-xs font-semibold text-green-600 bg-green-50 px-1.5 py-0.5 rounded">Normal</span>
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-3">128/82 <span className="text-sm font-normal text-gray-400">mmHg</span></div>
                <ResponsiveContainer width="100%" height={90}>
                  <LineChart data={bpData} margin={{ top: 2, right: 2, bottom: 0, left: -30 }}>
                    <XAxis dataKey="day" tick={{ fontSize: 9, fill: '#9CA3AF' }} tickLine={false} axisLine={false} />
                    <YAxis domain={[70, 150]} tick={{ fontSize: 9, fill: '#9CA3AF' }} tickLine={false} axisLine={false} />
                    <Tooltip formatter={(v, n) => [v, n === 'systolic' ? 'Systolic' : 'Diastolic']} contentStyle={{ fontSize: 11, borderRadius: 8 }} />
                    <Line type="monotone" dataKey="systolic" stroke="#EF4444" strokeWidth={2} dot={false} />
                    <Line type="monotone" dataKey="diastolic" stroke="#F9A8D4" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              {/* Blood Glucose */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700 flex items-center gap-1.5"><Droplets size={13} className="text-blue-400" /> Blood Glucose</span>
                  <span className="text-xs font-semibold text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded">Slightly High</span>
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-3">142 <span className="text-sm font-normal text-gray-400">mg/dL</span></div>
                <ResponsiveContainer width="100%" height={90}>
                  <AreaChart data={glucoseData} margin={{ top: 2, right: 2, bottom: 0, left: -30 }}>
                    <defs>
                      <linearGradient id="glucGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.15} />
                        <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="day" tick={{ fontSize: 9, fill: '#9CA3AF' }} tickLine={false} axisLine={false} />
                    <YAxis domain={[120, 180]} tick={{ fontSize: 9, fill: '#9CA3AF' }} tickLine={false} axisLine={false} />
                    <Tooltip formatter={(v) => [v + ' mg/dL', 'Glucose']} contentStyle={{ fontSize: 11, borderRadius: 8 }} />
                    <Area type="monotone" dataKey="mg" stroke="#3B82F6" strokeWidth={2} fill="url(#glucGrad)" dot={false} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Medication Adherence */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <SectionHeader icon={Pill} title="Medication Adherence" sub="Weekly %" iconColor="text-purple-500" />
            <div className="flex items-end gap-4 mb-3">
              <div className="text-3xl font-bold text-gray-900">92%</div>
              <TrendBadge trend="up" delta="+3%" />
              <span className="text-xs text-gray-400 mb-1">vs last week</span>
            </div>
            <ResponsiveContainer width="100%" height={100}>
              <BarChart data={medAdherenceData} margin={{ top: 2, right: 2, bottom: 0, left: -30 }}>
                <XAxis dataKey="week" tick={{ fontSize: 10, fill: '#9CA3AF' }} tickLine={false} axisLine={false} />
                <YAxis domain={[60, 100]} tick={{ fontSize: 10, fill: '#9CA3AF' }} tickLine={false} axisLine={false} />
                <Tooltip formatter={(v) => [v + '%', 'Adherence']} contentStyle={{ fontSize: 11, borderRadius: 8 }} />
                <Bar dataKey="pct" fill="#A78BFA" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Independence Indicators */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <SectionHeader icon={Home} title="Independence Indicators" sub="This month" iconColor="text-dwel-teal" />
            <div className="grid grid-cols-2 gap-3">
              {independenceData.map((item, i) => (
                <div key={i} className="p-3 bg-gray-50 rounded-lg border border-gray-100">
                  <div className="flex items-center justify-between mb-1">
                    <span className={`text-xl font-bold ${item.color}`}>{item.value}</span>
                    <TrendBadge trend={item.trend} delta={item.delta} />
                  </div>
                  <div className="text-xs font-medium text-gray-700">{item.label}</div>
                  <div className="text-[11px] text-gray-400">{item.unit}</div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* ─── Right Column ────────────────────────────────── */}
        <div className="space-y-6">

          {/* Wellbeing Radar */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <SectionHeader icon={Star} title="Wellbeing Dimensions" sub="Today" iconColor="text-amber-500" />
            <ResponsiveContainer width="100%" height={220}>
              <RadarChart data={radarData}>
                <PolarGrid stroke="#E5E7EB" />
                <PolarAngleAxis dataKey="subject" tick={{ fontSize: 11, fill: '#6B7280' }} />
                <Radar name="Robert" dataKey="A" stroke="#0D9488" fill="#0D9488" fillOpacity={0.18} strokeWidth={2} />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          {/* Social Engagement */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <SectionHeader icon={MessageCircle} title="Daily Voice Conversations" sub="This week" iconColor="text-blue-500" />
            <ResponsiveContainer width="100%" height={120}>
              <BarChart data={engagementData} margin={{ top: 2, right: 2, bottom: 0, left: -25 }}>
                <XAxis dataKey="day" tick={{ fontSize: 10, fill: '#9CA3AF' }} tickLine={false} axisLine={false} />
                <YAxis tick={{ fontSize: 10, fill: '#9CA3AF' }} tickLine={false} axisLine={false} />
                <Tooltip formatter={(v, n) => [v, n === 'conversations' ? 'Conversations' : 'Avg Min']} contentStyle={{ fontSize: 11, borderRadius: 8 }} />
                <Bar dataKey="conversations" fill="#93C5FD" radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
            <div className="mt-3 flex items-center justify-between text-xs text-gray-500 border-t border-gray-100 pt-3">
              <span>Avg conversations/day: <strong className="text-gray-900">6</strong></span>
              <span>Longest gap: <strong className="text-amber-600">26h (Feb 11)</strong></span>
            </div>
          </div>

          {/* Circle of Care Alerts */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <SectionHeader icon={Bell} title="Circle of Care Alerts" sub="Last 30 days" iconColor="text-amber-500" />
            <div className="space-y-3">
              {circleOfCareAlerts.map((alert, i) => (
                <div key={i} className={`p-3 border rounded-lg ${severityStyle[alert.severity]}`}>
                  <div className="flex items-center gap-2 mb-1">
                    <div className={`w-2 h-2 rounded-full shrink-0 ${severityDot[alert.severity]}`} />
                    <span className="text-[10px] font-semibold uppercase tracking-wide">{alert.type}</span>
                    <span className="text-[10px] text-gray-400 ml-auto">{alert.date}</span>
                  </div>
                  <p className="text-xs text-gray-700 leading-relaxed">{alert.message}</p>
                  <div className="mt-1.5 flex items-start gap-1.5">
                    <CheckCircle2 size={11} className="text-green-500 mt-0.5 shrink-0" />
                    <p className="text-[11px] text-gray-500">{alert.action}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Weight Trend */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <SectionHeader icon={Activity} title="Weight Trend" sub="6 weeks" iconColor="text-amber-500" />
            <div className="text-2xl font-bold text-gray-900 mb-1">168 lbs <TrendBadge trend="stable" delta="0" /></div>
            <div className="text-xs text-gray-400 mb-3">Target: 165–172 lbs ✓</div>
            <ResponsiveContainer width="100%" height={80}>
              <LineChart data={weightData} margin={{ top: 2, right: 2, bottom: 0, left: -30 }}>
                <XAxis dataKey="week" tick={{ fontSize: 9, fill: '#9CA3AF' }} tickLine={false} axisLine={false} />
                <YAxis domain={[160, 175]} tick={{ fontSize: 9, fill: '#9CA3AF' }} tickLine={false} axisLine={false} />
                <Tooltip formatter={(v) => [v + ' lbs', 'Weight']} contentStyle={{ fontSize: 11, borderRadius: 8 }} />
                <Line type="monotone" dataKey="lbs" stroke="#F59E0B" strokeWidth={2.5} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* AI Recommendations */}
          <div className="bg-dwel-teal-light border border-dwel-teal/20 rounded-xl p-4">
            <h3 className="text-sm font-semibold text-dwel-teal flex items-center gap-2 mb-3">
              <Zap size={15} /> AI Recommendations
            </h3>
            <div className="space-y-2">
              {[
                { text: 'Schedule a check-in call on appointment days to reduce post-visit anxiety.' },
                { text: 'Blood glucose slightly elevated. Review evening snack timing with Dr. Kim.' },
                { text: 'Social engagement dips on Thursdays. Consider a scheduled family voice call.' },
              ].map((r, i) => (
                <div key={i} className="flex items-start gap-2">
                  <ChevronRight size={13} className="text-dwel-teal mt-0.5 shrink-0" />
                  <p className="text-xs text-gray-700 leading-relaxed">{r.text}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
