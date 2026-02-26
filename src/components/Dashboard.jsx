import { useState } from 'react'
import { Users, CalendarDays, Activity, Phone, Mail, Mic, MoreVertical, Plus, Calendar } from 'lucide-react'
import VoiceAssistant from './VoiceAssistant'

const statsCards = [
  { label: 'Care Recipients', value: 1, icon: Users, color: 'text-dwel-teal', bg: 'bg-dwel-teal-light' },
  { label: 'Upcoming Appointments', value: 0, icon: CalendarDays, color: 'text-blue-600', bg: 'bg-blue-50' },
  { label: 'Activities Today', value: 116, icon: Activity, color: 'text-green-600', bg: 'bg-green-50' },
]

const recipients = [
  {
    id: 1,
    name: 'Robert Chen',
    initials: 'RC',
    relationship: 'Father',
    phone: '(555) 234-5678',
    email: 'robert.chen@email.com',
  },
]

const activities = [
  { type: 'calendar', text: 'Appointment scheduled: Doctor visit', time: 'about 2 months ago' },
  { type: 'voice', text: 'Voice command: Requested ride to appointment', time: 'about 2 months ago' },
  { type: 'voice', text: 'Voice command: Ordered lunch delivery', time: 'about 2 months ago' },
  { type: 'service', text: 'Service request: CVS prescription refill', time: 'about 2 months ago' },
  { type: 'notification', text: 'Notification sent to caregiver: Medication taken', time: 'about 2 months ago' },
  { type: 'voice', text: 'Voice command: Asked for medication reminder', time: 'about 2 months ago' },
  { type: 'service', text: 'Service request: CVS prescription refill', time: '2 months ago' },
  { type: 'calendar', text: 'Appointment scheduled: Doctor visit', time: '2 months ago' },
  { type: 'calendar', text: 'Appointment scheduled: Doctor visit', time: '2 months ago' },
  { type: 'service', text: 'Service request: CVS prescription refill', time: '2 months ago' },
]

const activityIcons = {
  calendar: CalendarDays,
  voice: Mic,
  service: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>
    </svg>
  ),
  notification: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>
    </svg>
  ),
}

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('recipients')
  const [voiceOpen, setVoiceOpen] = useState(false)

  const tabs = [
    { id: 'recipients', label: 'Care Recipients', icon: Users },
    { id: 'appointments', label: 'Appointments', icon: CalendarDays },
    { id: 'services', label: 'Services', icon: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg> },
  ]

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Welcome back, Demo</h1>
          <p className="text-gray-500 mt-1">Manage care for your loved ones</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-dwel-teal text-white rounded-lg hover:bg-dwel-teal-dark transition-colors font-medium text-sm">
          <Plus size={18} />
          Add Care Recipient
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {statsCards.map((stat, i) => {
          const Icon = stat.icon
          return (
            <div key={i} className="bg-white rounded-xl border border-gray-200 p-5 flex items-center gap-4">
              <div className={`w-12 h-12 ${stat.bg} rounded-xl flex items-center justify-center`}>
                <Icon size={22} className={stat.color} />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-sm text-gray-500">{stat.label}</div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-4 bg-gray-100 rounded-lg p-1 w-fit">
        {tabs.map(tab => {
          const Icon = tab.icon
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === tab.id
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Care Recipients */}
          {activeTab === 'recipients' && (
            <div className="space-y-4">
              {recipients.map(r => (
                <div key={r.id} className="bg-white rounded-xl border border-gray-200 p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-dwel-teal-light rounded-full flex items-center justify-center text-sm font-semibold text-dwel-teal">
                        {r.initials}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 text-lg">{r.name}</h3>
                        <span className="inline-block px-2.5 py-0.5 bg-gray-100 rounded text-xs font-medium text-gray-600 mt-0.5">
                          {r.relationship}
                        </span>
                      </div>
                    </div>
                    <button className="p-1 hover:bg-gray-100 rounded">
                      <MoreVertical size={18} className="text-gray-400" />
                    </button>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                    <span className="flex items-center gap-1.5">
                      <Phone size={14} />
                      {r.phone}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Mail size={14} />
                      {r.email}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setVoiceOpen(true)}
                      className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-dwel-teal text-white rounded-lg hover:bg-dwel-teal-dark transition-colors font-medium text-sm"
                    >
                      <Mic size={16} />
                      Voice Assistant
                    </button>
                    <button className="p-2.5 border border-gray-200 rounded-lg hover:bg-gray-50">
                      <CalendarDays size={18} className="text-gray-500" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'appointments' && (
            <div className="bg-white rounded-xl border border-gray-200 p-8 text-center text-gray-500">
              No upcoming appointments
            </div>
          )}

          {activeTab === 'services' && (
            <div className="bg-white rounded-xl border border-gray-200 p-8 text-center text-gray-500">
              Connected services will appear here
            </div>
          )}

          {/* Upcoming Appointments */}
          <div>
            <h2 className="flex items-center gap-2 text-lg font-semibold text-gray-900 mb-3">
              <CalendarDays size={20} />
              Upcoming Appointments
            </h2>
            <div className="bg-white rounded-xl border border-gray-200 p-8 text-center text-gray-400">
              No upcoming appointments
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h2 className="flex items-center gap-2 text-lg font-semibold text-gray-900 mb-4">
            <Activity size={20} />
            Recent Activity
          </h2>
          <div className="space-y-0 max-h-[500px] overflow-y-auto">
            {activities.map((activity, i) => {
              const Icon = activityIcons[activity.type] || Activity
              return (
                <div key={i} className="flex gap-3 py-3 relative">
                  {i < activities.length - 1 && (
                    <div className="absolute left-[15px] top-[40px] bottom-0 w-px bg-gray-200" />
                  )}
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center shrink-0 relative z-10">
                    <Icon size={14} className="text-gray-500" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm text-gray-700">{activity.text}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{activity.time}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Voice Assistant Modal */}
      <VoiceAssistant isOpen={voiceOpen} onClose={() => setVoiceOpen(false)} />
    </div>
  )
}
