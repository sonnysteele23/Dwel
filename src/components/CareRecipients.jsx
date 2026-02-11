import { Users, Phone, Mail, Mic, CalendarDays, MoreVertical, Plus } from 'lucide-react'

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

export default function CareRecipients() {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Care Recipients</h1>
          <p className="text-gray-500 mt-1">Manage the people you care for</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-dwel-teal text-white rounded-lg hover:bg-dwel-teal-dark transition-colors font-medium text-sm">
          <Plus size={18} />
          Add Care Recipient
        </button>
      </div>

      {/* Recipients Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
            <div className="border-t border-gray-100 pt-3 mb-4">
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <span className="flex items-center gap-1.5">
                  <Phone size={14} />
                  {r.phone}
                </span>
                <span className="flex items-center gap-1.5">
                  <Mail size={14} />
                  {r.email}
                </span>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-dwel-teal text-white rounded-lg hover:bg-dwel-teal-dark transition-colors font-medium text-sm">
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
    </div>
  )
}
