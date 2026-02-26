import { Mic, Link as LinkIcon, CheckCircle2, Car, ShoppingBag, Shield, ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const serviceCategories = [
  {
    name: 'Transportation',
    services: [
      {
        name: 'Uber Rides',
        tag: 'transport',
        tagColor: 'bg-gray-900 text-white',
        icon: 'U',
        iconBg: 'bg-gray-900 text-white',
        description: 'Book rides for your care recipient to appointments, pharmacies, or anywhere they need to go. No Uber account needed — powered by Guest Rides API.',
        connected: true,
        features: ['Scheduled & on-demand rides', 'Real-time tracking & ETA', 'Caregiver notifications', 'Spend caps & geofencing'],
      },
    ]
  },
  {
    name: 'Delivery — Groceries, Meals & Pharmacy',
    services: [
      {
        name: 'Uber Eats',
        tag: 'delivery',
        tagColor: 'bg-green-100 text-green-700',
        icon: 'UE',
        iconBg: 'bg-green-600 text-white',
        description: 'Order groceries, restaurant meals, and pharmacy items from nearby stores — all delivered to your care recipient via a single platform.',
        connected: true,
        features: ['Grocery stores (Stop & Shop, Trader Joe\'s)', 'Restaurants (Panera, Boston Market)', 'Pharmacies (CVS, Walgreens)', 'Dietary profile filtering'],
      },
    ]
  },
]

export default function Services() {
  const navigate = useNavigate()
  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <button onClick={() => navigate('/demo')} className="p-2 hover:bg-gray-100 rounded-lg">
          <ArrowLeft size={20} className="text-gray-500" />
        </button>
        <div>
        <h1 className="text-3xl font-bold text-gray-900">Connected Services</h1>
        <p className="text-gray-500 mt-1">All care services powered by Uber's platform — rides, groceries, meals, and pharmacy delivery</p>
        </div>
      </div>

      {/* Voice-Activated Services Banner */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8 flex items-center justify-between">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 bg-dwel-teal-light rounded-2xl flex items-center justify-center">
            <Mic size={28} className="text-dwel-teal" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-1">Voice-Activated Services</h2>
            <p className="text-gray-500 text-sm max-w-lg">
              Speak naturally to order. Say things like "Book a ride to Dad's doctor at 2pm tomorrow" or "Order Dad's weekly groceries from Stop & Shop."
            </p>
          </div>
        </div>
        <button className="flex items-center gap-2 px-5 py-3 bg-dwel-teal text-white rounded-lg hover:bg-dwel-teal-dark transition-colors font-medium text-sm whitespace-nowrap">
          <Mic size={18} />
          Start Voice Request
        </button>
      </div>

      {/* Uber Platform Banner */}
      <div className="bg-gray-900 rounded-xl p-6 mb-8 text-white">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-lg font-bold text-gray-900">U</div>
          <div>
            <h2 className="text-lg font-semibold">Powered by Uber</h2>
            <p className="text-sm text-gray-400">One platform for all care services — rides, groceries, meals, and pharmacy delivery</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { icon: Car, label: 'Guest Rides', desc: 'No Uber account needed for care recipients' },
            { icon: ShoppingBag, label: 'Consumer Delivery', desc: 'Groceries, meals & pharmacy in one API' },
            { icon: Shield, label: 'Voucher System', desc: 'Employer-funded benefits auto-applied' },
            { icon: Mic, label: 'Voice Ordering', desc: 'Natural language commands via Dwel' },
          ].map((item, i) => {
            const Icon = item.icon
            return (
              <div key={i} className="bg-white/10 rounded-lg p-4">
                <Icon size={20} className="text-dwel-teal mb-2" />
                <div className="text-sm font-semibold">{item.label}</div>
                <div className="text-xs text-gray-400 mt-0.5">{item.desc}</div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Service Categories */}
      {serviceCategories.map(category => (
        <div key={category.name} className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">{category.name}</h3>
          <div className="grid grid-cols-1 gap-4">
            {category.services.map(service => (
              <div key={service.name} className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-sm font-bold ${service.iconBg}`}>
                      {service.icon}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold text-gray-900 text-lg">{service.name}</h4>
                        {service.connected && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-50 text-green-700 border border-green-200">
                            <CheckCircle2 size={12} />
                            Connected
                          </span>
                        )}
                      </div>
                      <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium mt-1 ${service.tagColor}`}>
                        {service.tag}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-400 hover:text-gray-600 transition-colors">
                      <LinkIcon size={16} />
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-400 hover:text-gray-600 transition-colors">
                      <Mic size={16} />
                    </button>
                  </div>
                </div>
                <p className="text-sm text-gray-500 mb-4">{service.description}</p>
                {service.features && (
                  <div className="flex flex-wrap gap-2">
                    {service.features.map((feat, i) => (
                      <span key={i} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 border border-gray-100 rounded-lg text-xs font-medium text-gray-700">
                        <CheckCircle2 size={10} className="text-dwel-teal" />
                        {feat}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
