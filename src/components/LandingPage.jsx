import { useNavigate } from 'react-router-dom'
import { Mic, CalendarDays, Users, Play, Heart, Clock, Shield } from 'lucide-react'
import theme from '../theme'

const featureIcons = [Mic, CalendarDays, Users]

export default function LandingPage() {
  const navigate = useNavigate()
  const t = theme.landing

  return (
    <div className={`min-h-screen ${theme.colors.pageBg}`}>
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className={`w-8 h-8 ${theme.colors.primary} rounded-full flex items-center justify-center`}>
              <svg width="16" height="16" viewBox={theme.brand.logo.viewBox} fill="white">
                <path d={theme.brand.logo.iconPath}/>
              </svg>
            </div>
            <span className="font-bold text-lg text-gray-900">{theme.brand.name}</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            {theme.nav.topLinks.map((link, i) => (
              <a key={i} href={link.href} className="text-sm text-gray-600 hover:text-gray-900 transition-colors">{link.label}</a>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/demo')}
              className="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              {t.ctaPrimary}
            </button>
            <button
              onClick={() => navigate('/auth')}
              className={`px-4 py-2 text-sm font-medium text-white ${theme.colors.primary} rounded-lg ${theme.colors.primaryHover} transition-colors`}
            >
              {t.ctaSecondary}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 pt-20 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className={`inline-flex items-center gap-2 px-3 py-1.5 ${theme.colors.primaryLight} rounded-full ${theme.colors.primaryText} text-sm font-medium mb-6`}>
              <Mic size={14} />
              {t.badge}
            </div>
            <h1 className="text-5xl font-bold text-gray-900 leading-tight mb-6">
              {t.headline} <span className={`${theme.colors.primaryText} italic`}>{t.headlineAccent}</span>
            </h1>
            <p className="text-lg text-gray-500 mb-8 max-w-lg">{t.subheadline}</p>
            <div className="flex items-center gap-3 mb-8">
              <button
                onClick={() => navigate('/demo')}
                className={`flex items-center gap-2 px-6 py-3 ${theme.colors.primary} text-white rounded-lg ${theme.colors.primaryHover} transition-colors font-medium`}
              >
                <Play size={18} />
                {t.ctaPrimary}
              </button>
              <button
                onClick={() => navigate('/auth')}
                className="flex items-center gap-2 px-6 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors font-medium text-gray-700"
              >
                <Heart size={18} />
                {t.ctaSecondary}
              </button>
            </div>
            <div className="flex items-center gap-6 text-sm text-gray-500">
              <span className="flex items-center gap-1.5">
                <Shield size={14} className={theme.colors.primaryText} />
                {t.trustBadges[0]}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock size={14} className={theme.colors.primaryText} />
                {t.trustBadges[1]}
              </span>
            </div>
          </div>

          {/* Voice Assistant Card */}
          <div className="relative">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 max-w-md ml-auto">
              <div className="flex items-center gap-3 mb-6">
                <div className={`w-12 h-12 ${theme.colors.primaryLight} rounded-full flex items-center justify-center`}>
                  <Mic size={22} className={theme.colors.primaryText} />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">{t.voiceAssistant.title}</div>
                  <div className="text-sm text-gray-500">{t.voiceAssistant.subtitle}</div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="bg-gray-100 rounded-xl rounded-tl-sm p-4 text-sm text-gray-700">
                  {t.voiceAssistant.userMessage}
                </div>
                <div className={`${theme.colors.primaryLight} rounded-xl rounded-tr-sm p-4 text-sm text-gray-700`}>
                  {t.voiceAssistant.aiResponse}
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
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{t.featuresHeadline}</h2>
            <p className="text-gray-500 max-w-xl mx-auto">{t.featuresSubheadline}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {t.features.map((feature, i) => {
              const Icon = featureIcons[i]
              return (
                <div key={i} className={`${theme.colors.pageBg} rounded-xl border border-gray-100 p-6`}>
                  <div className={`w-12 h-12 ${theme.colors.primaryLight} rounded-xl flex items-center justify-center mb-4`}>
                    <Icon size={22} className={theme.colors.primaryText} />
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
      <section id="services" className={`py-24 ${theme.colors.pageBg}`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{t.servicesHeadline}</h2>
            <p className="text-gray-500 max-w-xl mx-auto">{t.servicesSubheadline}</p>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            {t.services.map((service, i) => (
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
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{t.howItWorksHeadline}</h2>
            <p className="text-gray-500 max-w-xl mx-auto">{t.howItWorksSubheadline}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {t.steps.map((step, i) => (
              <div key={i} className="text-center">
                <div className={`w-16 h-16 ${theme.colors.primary} rounded-full flex items-center justify-center mx-auto mb-5 text-white text-xl font-bold`}>
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
      <section className={`${theme.colors.primary} py-20`}>
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">{t.ctaHeadline}</h2>
          <p className="text-white/80 mb-8">{t.ctaSubheadline}</p>
          <button
            onClick={() => navigate('/auth')}
            className={`px-8 py-3 bg-white ${theme.colors.primaryText} rounded-lg hover:bg-gray-100 transition-colors font-semibold`}
          >
            {t.ctaButton}
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className={`${theme.colors.pageBg} py-8 border-t border-gray-100`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className={`w-6 h-6 ${theme.colors.primary} rounded-full flex items-center justify-center`}>
              <svg width="12" height="12" viewBox={theme.brand.logo.viewBox} fill="white">
                <path d={theme.brand.logo.iconPath}/>
              </svg>
            </div>
            <span className="font-semibold text-gray-700 text-sm">{theme.brand.name}</span>
          </div>
          <p className="text-sm text-gray-400">{theme.brand.copyright}</p>
        </div>
      </footer>
    </div>
  )
}
