import { Mic, Link as LinkIcon } from 'lucide-react'

const serviceCategories = [
  {
    name: 'Transportation',
    services: [
      { name: 'Uber', tag: 'transport', tagColor: 'bg-green-100 text-green-700', icon: 'Uber', description: 'Request rides to appointments, pharmacies, or anywhere you need to go.', hasLink: true },
    ]
  },
  {
    name: 'Food Delivery',
    services: [
      { name: 'DoorDash', tag: 'food', tagColor: 'bg-red-100 text-red-700', icon: '—', description: 'Order meals from local restaurants delivered to your door.', hasLink: true },
    ]
  },
  {
    name: 'Grocery',
    services: [
      { name: 'Instacart', tag: 'grocery', tagColor: 'bg-green-100 text-green-700', icon: '🥕', description: 'Shop for groceries from your favorite stores with same-day delivery.', hasLink: true },
    ]
  },
  {
    name: 'Retail Shopping',
    services: [
      { name: 'Amazon', tag: 'shopping', tagColor: 'bg-orange-100 text-orange-700', icon: 'a', description: 'Order household items, supplies, and essentials.', connected: true },
      { name: 'Walmart', tag: 'shopping', tagColor: 'bg-orange-100 text-orange-700', icon: 'W', description: 'Shop for everyday items with pickup or delivery options.' },
    ]
  },
  {
    name: 'Pharmacy Services',
    services: [
      { name: 'CVS', tag: 'pharmacy', tagColor: 'bg-purple-100 text-purple-700', icon: 'C', description: 'Manage prescriptions and order medications for delivery.', hasLink: true },
      { name: 'Walgreens', tag: 'pharmacy', tagColor: 'bg-purple-100 text-purple-700', icon: 'W', description: 'Refill prescriptions and get health supplies delivered.', hasLink: true },
    ]
  },
  {
    name: 'Smart Home & Health',
    services: [
      { name: 'Nest', tag: 'iot', tagColor: 'bg-blue-100 text-blue-700', icon: 'N', description: 'Control thermostat, cameras, and smart home devices.' },
      { name: 'Apple Health', tag: 'iot', tagColor: 'bg-blue-100 text-blue-700', icon: 'A', description: 'Monitor health metrics and activity data.' },
    ]
  },
]

export default function Services() {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Services</h1>
        <p className="text-gray-500 mt-1">Connect with popular services through voice or chat</p>
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
              Simply tap a service and speak naturally. Say things like "I need a ride to my doctor's appointment tomorrow" or "Order my usual groceries from Instacart."
            </p>
          </div>
        </div>
        <button className="flex items-center gap-2 px-5 py-3 bg-dwel-teal text-white rounded-lg hover:bg-dwel-teal-dark transition-colors font-medium text-sm whitespace-nowrap">
          <Mic size={18} />
          Start Voice Request
        </button>
      </div>

      {/* Service Categories */}
      {serviceCategories.map(category => (
        <div key={category.name} className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">{category.name}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {category.services.map(service => (
              <div key={service.name} className="bg-white rounded-xl border border-gray-200 p-5">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-sm font-bold text-gray-600">
                      {service.icon}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold text-gray-900">{service.name}</h4>
                        {service.connected && (
                          <span className="text-xs text-green-600 flex items-center gap-1">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/></svg>
                            Connected
                          </span>
                        )}
                      </div>
                      <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium mt-0.5 ${service.tagColor}`}>
                        {service.tag}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {service.hasLink && (
                      <button className="p-1.5 hover:bg-gray-100 rounded text-gray-400">
                        <LinkIcon size={16} />
                      </button>
                    )}
                    <button className="p-1.5 hover:bg-gray-100 rounded text-gray-400">
                      <Mic size={16} />
                    </button>
                  </div>
                </div>
                <p className="text-sm text-gray-500 mt-2">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
