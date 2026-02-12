import { useNavigate } from 'react-router-dom'
import { Mic, CalendarDays, Users, Play, Heart, Clock, Shield } from 'lucide-react'

const features = [
  {
    icon: Mic,
    title: 'Voice-First Design',
    description: 'Natural conversation with AI that understands context and speaks clearly. No apps to navigate, just talk.',
  },
  {
    icon: CalendarDays,
    title: 'Smart Scheduling',
    description: "Appointments, reminders, and transportation coordinated seamlessly. Never miss a doctor's visit again.",
  },
  {
    icon: Users,
    title: 'Family Dashboard',
    description: 'Caregivers stay informed with activity logs, appointment tracking, and real-time notifications.',
  },
]

const services = [
  { name: 'Uber', category: 'Transport', letter: 'U' },
  { name: 'DoorDash', category: 'Food', letter: 'D' },
  { name: 'Instacart', category: 'Grocery', letter: 'I' },
  { name: 'Amazon', category: 'Shopping', letter: 'A' },
  { name: 'Walmart', category: 'Shopping', letter: 'W' },
  { name: 'CVS', category: 'Pharmacy', letter: 'C' },
  { name: 'Walgreens', category: 'Pharmacy', letter: 'W' },
]

const steps = [
  { number: 1, title: 'Create your account', description: 'Sign up as a caregiver and set up your family profile in just a few clicks.' },
  { number: 2, title: 'Add your loved ones', description: 'Onboard your parents or family members with their preferences and needs.' },
  { number: 3, title: 'Start using voice', description: 'Your loved ones can now request services naturally through voice or chat.' },
]

export default function LandingPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-[#FAF9F7]">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-dwel-teal rounded-full flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
            </div>
            <span className="font-bold text-lg text-gray-900">Dwel.Digital</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">Features</a>
            <a href="#how-it-works" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">How It Works</a>
            <a href="#services" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">Services</a>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/demo')}
              className="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Try Demo
            </button>
            <button
              onClick={() => navigate('/auth')}
              className="px-4 py-2 text-sm font-medium text-white bg-dwel-teal rounded-lg hover:bg-dwel-teal-dark transition-colors"
            >
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 pt-20 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-dwel-teal-light rounded-full text-dwel-teal text-sm font-medium mb-6">
              <Mic size={14} />
              Voice-First AI Assistant
            </div>
            <h1 className="text-5xl font-bold text-gray-900 leading-tight mb-6">
              Caring for your loved ones, <span className="text-dwel-teal italic">together</span>
            </h1>
            <p className="text-lg text-gray-500 mb-8 max-w-lg">
              A dignified, voice-powered platform that helps caregivers support their elderly parents with appointments, transportation, deliveries, and daily needs.
            </p>
            <div className="flex items-center gap-3 mb-8">
              <button
                onClick={() => navigate('/demo')}
                className="flex items-center gap-2 px-6 py-3 bg-dwel-teal text-white rounded-lg hover:bg-dwel-teal-dark transition-colors font-medium"
              >
                <Play size={18} />
                Try Demo
              </button>
              <button
                onClick={() => navigate('/auth')}
                className="flex items-center gap-2 px-6 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors font-medium text-gray-700"
              >
                <Heart size={18} />
                Get Started
              </button>
            </div>
            <div className="flex items-center gap-6 text-sm text-gray-500">
              <span className="flex items-center gap-1.5">
                <Shield size={14} className="text-dwel-teal" />
                HIPAA Aware
              </span>
              <span className="flex items-center gap-1.5">
                <Clock size={14} className="text-dwel-teal" />
                24/7 Available
              </span>
            </div>
          </div>

          {/* Voice Assistant Card */}
          <div className="relative">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 max-w-md ml-auto">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-dwel-teal-light rounded-full flex items-center justify-center">
                  <Mic size={22} className="text-dwel-teal" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Voice Assistant Active</div>
                  <div className="text-sm text-gray-500">Ready to help</div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="bg-gray-100 rounded-xl rounded-tl-sm p-4 text-sm text-gray-700">
                  "I need a ride to my doctor's appointment tomorrow at 2pm"
                </div>
                <div className="bg-dwel-teal-light rounded-xl rounded-tr-sm p-4 text-sm text-gray-700">
                  "I've scheduled an Uber pickup for tomorrow at 1:30pm to Dr. Smith's office. I'll send a reminder in the morning."
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Built for dignity and independence</h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Our platform respects autonomy while providing the support your loved ones need.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, i) => {
              const Icon = feature.icon
              return (
                <div key={i} className="bg-[#FAF9F7] rounded-xl border border-gray-100 p-6">
                  <div className="w-12 h-12 bg-dwel-teal-light rounded-xl flex items-center justify-center mb-4">
                    <Icon size={22} className="text-dwel-teal" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{feature.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-24 bg-[#FAF9F7]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Connected to the services you trust</h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Request rides, order groceries, manage prescriptions, and control smart home devices—all through natural voice commands.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            {services.map((service, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-100 p-5 w-40 text-center">
                <div className="w-14 h-14 bg-gray-100 rounded-xl flex items-center justify-center mx-auto mb-3 text-lg font-bold text-gray-500">
                  {service.letter}
                </div>
                <div className="font-semibold text-gray-900 text-sm">{service.name}</div>
                <div className="text-xs text-gray-400 mt-0.5">{service.category}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How it works</h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Get started in minutes. Add your loved ones and let Dwel.Digital help.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {steps.map((step, i) => (
              <div key={i} className="text-center">
                <div className="w-16 h-16 bg-dwel-teal rounded-full flex items-center justify-center mx-auto mb-5 text-white text-xl font-bold">
                  {step.number}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-sm text-gray-500">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-dwel-teal py-20">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to support your loved ones?</h2>
          <p className="text-white/80 mb-8">
            Join thousands of caregivers who are providing better care with Dwel.Digital.
          </p>
          <button
            onClick={() => navigate('/auth')}
            className="px-8 py-3 bg-white text-dwel-teal rounded-lg hover:bg-gray-100 transition-colors font-semibold"
          >
            Get Started Free
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#FAF9F7] py-8 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-dwel-teal rounded-full flex items-center justify-center">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="white">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
            </div>
            <span className="font-semibold text-gray-700 text-sm">Dwel.Digital</span>
          </div>
          <p className="text-sm text-gray-400">© 2026 Dwel.Digital. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
