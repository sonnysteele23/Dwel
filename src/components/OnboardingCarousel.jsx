import { useState, useEffect, useCallback } from 'react'
import { X, ChevronRight, ChevronLeft, Phone, ShoppingBag, Bell, Car, Mic } from 'lucide-react'

// ─── Slide Configuration ──────────────────────────────────────────────
// Each slide can have: title, subtitle, description, bullets, icon,
// illustration (React component), media (image/video URL), mediaType,
// accentColor override, and a custom CTA label.
// This array is the single source of truth — add/remove/reorder slides
// here to update the carousel everywhere.
// ──────────────────────────────────────────────────────────────────────

const defaultSlides = [
  {
    id: 'welcome',
    title: 'Welcome to Dwel',
    subtitle: 'Voice-First Caregiving',
    description: 'Dwel helps you coordinate daily care for your loved ones — transportation, meals, deliveries, and check-ins — all from one place.',
    icon: Mic,
    illustration: 'welcome',
  },
  {
    id: 'voice-checkin',
    title: 'Automated Voice Check-Ins',
    subtitle: 'Stay connected, hands-free',
    description: 'Dwel calls your loved ones on a schedule you set. Our voice AI has a friendly, natural conversation — asking how they\'re feeling, if they\'ve taken medications, and whether they need anything.',
    bullets: [
      'Scheduled daily or weekly check-in calls',
      'AI-powered conversation with voice summaries',
      'Instant alerts if anything seems off',
      'Full transcript available in your dashboard',
    ],
    icon: Phone,
    illustration: 'voiceCheckin',
  },
  {
    id: 'services',
    title: 'Rides & Deliveries',
    subtitle: 'Everything they need, delivered',
    description: 'Order Uber rides to doctor appointments, or shop for groceries and essentials through Uber Eats — all coordinated through Dwel on behalf of your care recipient.',
    bullets: [
      'Book Uber rides to appointments & errands',
      'Order meals & groceries via Uber Eats',
      'Real-time tracking for every trip and delivery',
      'One dashboard for all services',
    ],
    icon: Car,
    illustration: 'services',
  },
  {
    id: 'notifications',
    title: 'Smart Notifications',
    subtitle: 'Never miss a moment',
    description: 'Customize how and when you receive updates. Get notified about check-in results, ride status, delivery confirmations, and anything that needs your attention.',
    bullets: [
      'Push, SMS, and email notification channels',
      'Custom alert rules per care recipient',
      'Escalation alerts for missed check-ins',
      'Daily digest summaries',
    ],
    icon: Bell,
    illustration: 'notifications',
  },
]

// ─── Animated Illustrations ───────────────────────────────────────────
// Each illustration is an inline SVG with CSS keyframe animations.
// These render where an image/video would go, but with zero load time.
// ──────────────────────────────────────────────────────────────────────

function WelcomeIllustration() {
  return (
    <svg viewBox="0 0 320 240" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <style>{`
        @keyframes pulse-ring { 0% { r: 28; opacity: 0.6; } 100% { r: 55; opacity: 0; } }
        @keyframes float-up { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
        @keyframes fade-in-up { 0% { opacity: 0; transform: translateY(12px); } 100% { opacity: 1; transform: translateY(0); } }
      `}</style>
      {/* Background shape */}
      <rect x="60" y="30" width="200" height="180" rx="24" fill="#c8e8e2" />
      {/* Phone body */}
      <rect x="115" y="50" width="90" height="160" rx="16" fill="white" stroke="#2D9F8F" strokeWidth="2.5" style={{ animation: 'float-up 3s ease-in-out infinite' }} />
      <rect x="125" y="64" width="70" height="10" rx="5" fill="#d5efea" />
      {/* Heart icon */}
      <g transform="translate(140, 100)" style={{ animation: 'fade-in-up 1s ease-out' }}>
        <path d="M20 35.35l-2.9-2.64C7.6 24.36 2 19.28 2 13c0-5.08 3.84-9 8.5-9 2.98 0 5.82 1.42 7.5 3.65C19.68 5.42 22.52 4 25.5 4 30.16 4 34 7.92 34 13c0 6.28-5.6 11.36-15.1 19.72L20 35.35z" fill="#2D9F8F" />
      </g>
      {/* Pulse rings */}
      <circle cx="160" cy="120" r="28" stroke="#2D9F8F" strokeWidth="2" fill="none" opacity="0.6" style={{ animation: 'pulse-ring 2s ease-out infinite' }} />
      <circle cx="160" cy="120" r="28" stroke="#2D9F8F" strokeWidth="2" fill="none" opacity="0.6" style={{ animation: 'pulse-ring 2s ease-out infinite 0.6s' }} />
      <circle cx="160" cy="120" r="28" stroke="#2D9F8F" strokeWidth="2" fill="none" opacity="0.6" style={{ animation: 'pulse-ring 2s ease-out infinite 1.2s' }} />
      {/* Dwel text */}
      <text x="160" y="226" textAnchor="middle" fill="#2D9F8F" fontFamily="DM Sans, system-ui" fontWeight="700" fontSize="14">Dwel.Digital</text>
    </svg>
  )
}

function VoiceCheckinIllustration() {
  return (
    <svg viewBox="0 0 320 240" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <style>{`
        @keyframes wave1 { 0%, 100% { height: 12; y: 114; } 50% { height: 32; y: 104; } }
        @keyframes wave2 { 0%, 100% { height: 20; y: 110; } 50% { height: 40; y: 100; } }
        @keyframes wave3 { 0%, 100% { height: 16; y: 112; } 50% { height: 36; y: 102; } }
        @keyframes msg-in { 0% { opacity: 0; transform: translateX(-20px); } 100% { opacity: 1; transform: translateX(0); } }
      `}</style>
      {/* Background */}
      <rect x="40" y="20" width="240" height="200" rx="20" fill="#c8e8e2" />
      {/* Phone */}
      <rect x="55" y="40" width="80" height="140" rx="12" fill="white" stroke="#2D9F8F" strokeWidth="2" />
      {/* Mic icon on phone */}
      <circle cx="95" cy="95" r="18" fill="#2D9F8F" opacity="0.25" />
      <rect x="91" y="82" width="8" height="16" rx="4" fill="#2D9F8F" />
      <path d="M86 94 a9 9 0 0 0 18 0" stroke="#2D9F8F" strokeWidth="1.5" fill="none" />
      <line x1="95" y1="103" x2="95" y2="108" stroke="#2D9F8F" strokeWidth="1.5" />
      {/* Sound waves */}
      <rect x="148" y="114" width="6" rx="3" fill="#2D9F8F" opacity="0.7" style={{ animation: 'wave1 0.8s ease-in-out infinite' }} />
      <rect x="160" y="110" width="6" rx="3" fill="#2D9F8F" opacity="0.8" style={{ animation: 'wave2 0.8s ease-in-out infinite 0.1s' }} />
      <rect x="172" y="112" width="6" rx="3" fill="#2D9F8F" opacity="0.6" style={{ animation: 'wave3 0.8s ease-in-out infinite 0.2s' }} />
      <rect x="184" y="114" width="6" rx="3" fill="#2D9F8F" opacity="0.7" style={{ animation: 'wave1 0.8s ease-in-out infinite 0.3s' }} />
      <rect x="196" y="110" width="6" rx="3" fill="#2D9F8F" opacity="0.8" style={{ animation: 'wave2 0.8s ease-in-out infinite 0.15s' }} />
      {/* Chat bubbles */}
      <g style={{ animation: 'msg-in 0.6s ease-out 0.3s both' }}>
        <rect x="148" y="55" width="120" height="32" rx="8" fill="white" stroke="#d1d5db" strokeWidth="1" />
        <text x="158" y="75" fontFamily="DM Sans, system-ui" fontSize="9" fill="#6b7280">"Hi! How are you today?"</text>
      </g>
      <g style={{ animation: 'msg-in 0.6s ease-out 0.8s both' }}>
        <rect x="158" y="95" width="110" height="32" rx="8" fill="#2D9F8F" />
        <text x="168" y="115" fontFamily="DM Sans, system-ui" fontSize="9" fill="white">"I'm doing great!"</text>
      </g>
      {/* Status indicator */}
      <circle cx="95" cy="170" r="4" fill="#22c55e" />
      <text x="105" y="173" fontFamily="DM Sans, system-ui" fontSize="8" fill="#6b7280">Call Active</text>
    </svg>
  )
}

function ServicesIllustration() {
  return (
    <svg viewBox="0 0 320 240" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <style>{`
        @keyframes drive { 0% { transform: translateX(-40px); opacity: 0; } 30% { opacity: 1; } 100% { transform: translateX(0); opacity: 1; } }
        @keyframes bag-drop { 0% { transform: translateY(-20px); opacity: 0; } 100% { transform: translateY(0); opacity: 1; } }
        @keyframes route-draw { 0% { stroke-dashoffset: 200; } 100% { stroke-dashoffset: 0; } }
      `}</style>
      {/* Background */}
      <rect x="30" y="20" width="260" height="200" rx="20" fill="#c8e8e2" />
      {/* Road */}
      <path d="M50 160 Q100 140 160 155 Q220 170 280 145" stroke="#9ca3af" strokeWidth="3" strokeDasharray="8 4" fill="none" />
      {/* Route line */}
      <path d="M50 160 Q100 140 160 155 Q220 170 280 145" stroke="#2D9F8F" strokeWidth="3" fill="none" strokeDasharray="200" style={{ animation: 'route-draw 2s ease-out forwards' }} />
      {/* Car — side-profile sedan */}
      <g style={{ animation: 'drive 1.2s ease-out forwards' }}>
        {/* Car body */}
        <path d="M68 148 L72 148 L76 134 L92 126 L112 126 L120 134 L130 134 L130 148 L132 148 L132 152 L128 152 L128 148 L74 148 L74 152 L68 152 Z" fill="#2D9F8F" />
        {/* Roof / cabin */}
        <path d="M80 134 L88 126 L110 126 L118 134 Z" fill="#247F73" />
        {/* Windows */}
        <path d="M82 133 L88 128 L98 128 L98 133 Z" fill="#b5e8e0" />
        <path d="M100 133 L100 128 L110 128 L116 133 Z" fill="#b5e8e0" />
        {/* Headlight */}
        <rect x="126" y="138" width="5" height="4" rx="1" fill="#fbbf24" />
        {/* Taillight */}
        <rect x="69" y="138" width="4" height="4" rx="1" fill="#ef4444" />
        {/* Front wheel */}
        <circle cx="88" cy="152" r="7" fill="#374151" />
        <circle cx="88" cy="152" r="4" fill="#6b7280" />
        <circle cx="88" cy="152" r="1.5" fill="#9ca3af" />
        {/* Rear wheel */}
        <circle cx="120" cy="152" r="7" fill="#374151" />
        <circle cx="120" cy="152" r="4" fill="#6b7280" />
        <circle cx="120" cy="152" r="1.5" fill="#9ca3af" />
        {/* Door handle */}
        <rect x="96" y="137" width="6" height="1.5" rx="0.75" fill="#247F73" />
        {/* Side mirror */}
        <ellipse cx="76" cy="133" rx="3" ry="2" fill="#247F73" />
      </g>
      {/* Shopping bag */}
      <g style={{ animation: 'bag-drop 0.8s ease-out 0.6s both' }}>
        <rect x="210" y="60" width="44" height="50" rx="4" fill="white" stroke="#2D9F8F" strokeWidth="2" />
        <path d="M222 60 V52 a10 10 0 0 1 20 0 V60" stroke="#2D9F8F" strokeWidth="2" fill="none" />
        <circle cx="232" cy="80" r="3" fill="#2D9F8F" />
      </g>
      {/* Destination pin */}
      <g style={{ animation: 'bag-drop 0.8s ease-out 1s both' }}>
        <path d="M270 130 a12 12 0 1 0 0 0.01" fill="#2D9F8F" />
        <circle cx="270" cy="124" r="4" fill="white" />
        <path d="M270 136 l0 10" stroke="#2D9F8F" strokeWidth="2" />
      </g>
      {/* Labels */}
      <text x="100" y="176" textAnchor="middle" fontFamily="DM Sans, system-ui" fontSize="9" fill="#6b7280" fontWeight="500">Rides</text>
      <text x="232" y="124" textAnchor="middle" fontFamily="DM Sans, system-ui" fontSize="9" fill="#6b7280" fontWeight="500">Deliveries</text>
    </svg>
  )
}

function NotificationsIllustration() {
  return (
    <svg viewBox="0 0 320 240" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <style>{`
        @keyframes bell-ring { 0%, 100% { transform: rotate(0deg); } 15% { transform: rotate(14deg); } 30% { transform: rotate(-12deg); } 45% { transform: rotate(8deg); } 60% { transform: rotate(-4deg); } }
        @keyframes notif-slide { 0% { transform: translateX(40px); opacity: 0; } 100% { transform: translateX(0); opacity: 1; } }
        @keyframes badge-pop { 0% { r: 0; } 50% { r: 9; } 100% { r: 7; } }
      `}</style>
      {/* Background */}
      <rect x="30" y="20" width="260" height="200" rx="20" fill="#c8e8e2" />
      {/* Bell */}
      <g transform="translate(80, 70)" style={{ transformOrigin: '30px 10px', animation: 'bell-ring 1.5s ease-in-out infinite 0.5s' }}>
        <path d="M30 0 a20 20 0 0 0 -20 20 v16 h-6 a4 4 0 0 0 0 8 h52 a4 4 0 0 0 0 -8 h-6 v-16 a20 20 0 0 0 -20 -20z" fill="#2D9F8F" />
        <circle cx="30" cy="50" r="6" fill="#2D9F8F" />
      </g>
      {/* Badge */}
      <circle cx="130" cy="72" fill="#ef4444" style={{ animation: 'badge-pop 0.4s ease-out 1s both' }} />
      <text x="130" y="76" textAnchor="middle" fontFamily="DM Sans, system-ui" fontSize="9" fill="white" fontWeight="700">3</text>
      {/* Notification cards */}
      <g style={{ animation: 'notif-slide 0.5s ease-out 0.3s both' }}>
        <rect x="168" y="45" width="112" height="36" rx="8" fill="white" filter="drop-shadow(0 2px 6px rgba(0,0,0,0.12))" />
        <circle cx="182" cy="63" r="6" fill="#22c55e" />
        <text x="194" y="59" fontFamily="DM Sans, system-ui" fontSize="8" fill="#374151" fontWeight="600">Check-in complete</text>
        <text x="194" y="71" fontFamily="DM Sans, system-ui" fontSize="7" fill="#9ca3af">Mom is doing well today</text>
      </g>
      <g style={{ animation: 'notif-slide 0.5s ease-out 0.6s both' }}>
        <rect x="168" y="90" width="112" height="36" rx="8" fill="white" filter="drop-shadow(0 2px 6px rgba(0,0,0,0.12))" />
        <circle cx="182" cy="108" r="6" fill="#2D9F8F" />
        <text x="194" y="104" fontFamily="DM Sans, system-ui" fontSize="8" fill="#374151" fontWeight="600">Ride confirmed</text>
        <text x="194" y="116" fontFamily="DM Sans, system-ui" fontSize="7" fill="#9ca3af">Pickup at 1:30pm tomorrow</text>
      </g>
      <g style={{ animation: 'notif-slide 0.5s ease-out 0.9s both' }}>
        <rect x="168" y="135" width="112" height="36" rx="8" fill="white" filter="drop-shadow(0 2px 6px rgba(0,0,0,0.12))" />
        <circle cx="182" cy="153" r="6" fill="#f59e0b" />
        <text x="194" y="149" fontFamily="DM Sans, system-ui" fontSize="8" fill="#374151" fontWeight="600">Delivery arriving</text>
        <text x="194" y="161" fontFamily="DM Sans, system-ui" fontSize="7" fill="#9ca3af">Groceries in 15 minutes</text>
      </g>
    </svg>
  )
}

const illustrations = {
  welcome: WelcomeIllustration,
  voiceCheckin: VoiceCheckinIllustration,
  services: ServicesIllustration,
  notifications: NotificationsIllustration,
}

// ─── Main Carousel Component ─────────────────────────────────────────
// Props:
//   slides      — array of slide objects (defaults to defaultSlides)
//   onComplete  — called when user finishes or skips
//   onSkip      — called when user clicks Skip (defaults to onComplete)
//   startOpen   — whether to show on mount (default: true)
// ──────────────────────────────────────────────────────────────────────

export default function OnboardingCarousel({
  slides = defaultSlides,
  onComplete,
  onSkip,
  startOpen = true,
}) {
  const [isOpen, setIsOpen] = useState(startOpen)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0) // -1 = left, 1 = right, 0 = initial
  const [isAnimating, setIsAnimating] = useState(false)

  const totalSlides = slides.length
  const slide = slides[currentIndex]
  const isFirst = currentIndex === 0
  const isLast = currentIndex === totalSlides - 1

  const goTo = useCallback((newIndex, dir) => {
    if (isAnimating || newIndex < 0 || newIndex >= totalSlides) return
    setIsAnimating(true)
    setDirection(dir)
    setTimeout(() => {
      setCurrentIndex(newIndex)
      setIsAnimating(false)
    }, 280)
  }, [isAnimating, totalSlides])

  const handleNext = () => {
    if (isLast) {
      handleClose()
    } else {
      goTo(currentIndex + 1, 1)
    }
  }
  const handlePrev = () => goTo(currentIndex - 1, -1)

  const handleClose = () => {
    setIsOpen(false)
    onComplete?.()
  }
  const handleSkip = () => {
    setIsOpen(false)
    ;(onSkip || onComplete)?.()
  }

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e) => {
      if (!isOpen) return
      if (e.key === 'ArrowRight' || e.key === 'Enter') handleNext()
      else if (e.key === 'ArrowLeft') handlePrev()
      else if (e.key === 'Escape') handleSkip()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [isOpen, currentIndex, isAnimating])

  if (!isOpen) return null

  const IllustrationComponent = slide.illustration ? illustrations[slide.illustration] : null
  const SlideIcon = slide.icon

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" role="dialog" aria-modal="true" aria-label="Welcome carousel">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={handleSkip} />

      {/* Modal */}
      <div className="relative w-full max-w-[520px] mx-4 bg-white rounded-2xl shadow-2xl overflow-hidden" style={{ maxHeight: '90vh' }}>

        {/* Skip / Close */}
        <button
          onClick={handleSkip}
          className="absolute top-4 right-4 z-10 p-2 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Skip introduction"
        >
          <X size={20} />
        </button>

        {/* Illustration / Media area */}
        <div className="relative w-full bg-gradient-to-br from-[#E8F5F3] to-[#d5efea] overflow-hidden" style={{ height: 260 }}>
          {/* Media slot: image, video, or animated SVG illustration */}
          {slide.media ? (
            slide.mediaType === 'video' ? (
              <video src={slide.media} autoPlay loop muted playsInline className="w-full h-full object-cover" />
            ) : (
              <img src={slide.media} alt={slide.title} className="w-full h-full object-cover" />
            )
          ) : IllustrationComponent ? (
            <div key={`illust-${currentIndex}`} className="w-full h-full flex items-center justify-center p-6"
              style={{
                animation: isAnimating
                  ? `slide-out-${direction === 1 ? 'left' : 'right'} 0.28s ease-in forwards`
                  : 'slide-in 0.35s ease-out',
              }}
            >
              <IllustrationComponent />
            </div>
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <SlideIcon size={64} className="text-[#2D9F8F] opacity-30" />
            </div>
          )}

          {/* Slide counter badge */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-white/80 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-medium text-gray-500">
            {currentIndex + 1} / {totalSlides}
          </div>
        </div>

        {/* Content area */}
        <div className="px-8 pt-6 pb-8">
          {/* Icon + Subtitle */}
          <div className="flex items-center gap-2 mb-2">
            <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-[#E8F5F3]">
              <SlideIcon size={15} className="text-[#2D9F8F]" />
            </span>
            <span className="text-xs font-semibold tracking-wide uppercase text-[#2D9F8F]">{slide.subtitle}</span>
          </div>

          {/* Title */}
          <h2 className="text-xl font-bold text-gray-900 mb-2 font-sans">{slide.title}</h2>

          {/* Description */}
          <p className="text-sm text-gray-500 leading-relaxed mb-4">{slide.description}</p>

          {/* Bullets */}
          {slide.bullets && (
            <ul className="space-y-2 mb-4">
              {slide.bullets.map((bullet, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-gray-600">
                  <span className="mt-1 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[#2D9F8F]" />
                  {bullet}
                </li>
              ))}
            </ul>
          )}

          {/* Progress dots */}
          <div className="flex items-center justify-center gap-2 mb-5">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i, i > currentIndex ? 1 : -1)}
                className={`rounded-full transition-all duration-300 ${
                  i === currentIndex
                    ? 'w-6 h-2 bg-[#2D9F8F]'
                    : 'w-2 h-2 bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>

          {/* Navigation buttons */}
          <div className="flex items-center gap-3">
            {!isFirst && (
              <button
                onClick={handlePrev}
                className="flex items-center justify-center w-10 h-10 rounded-full border border-gray-200 text-gray-500 hover:bg-gray-50 hover:text-gray-700 transition-colors"
                aria-label="Previous slide"
              >
                <ChevronLeft size={18} />
              </button>
            )}

            <button
              onClick={handleNext}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-[#2D9F8F] hover:bg-[#247F73] text-white rounded-lg font-medium text-sm transition-colors"
            >
              {isLast ? 'Get Started' : 'Next'}
              {!isLast && <ChevronRight size={16} />}
            </button>
          </div>

          {/* Skip link */}
          {!isLast && (
            <button
              onClick={handleSkip}
              className="w-full mt-3 text-xs text-gray-400 hover:text-gray-600 transition-colors text-center"
            >
              Skip introduction
            </button>
          )}
        </div>
      </div>

      {/* Global animation keyframes */}
      <style>{`
        @keyframes slide-in {
          0% { opacity: 0; transform: translateX(30px); }
          100% { opacity: 1; transform: translateX(0); }
        }
        @keyframes slide-out-left {
          0% { opacity: 1; transform: translateX(0); }
          100% { opacity: 0; transform: translateX(-30px); }
        }
        @keyframes slide-out-right {
          0% { opacity: 1; transform: translateX(0); }
          100% { opacity: 0; transform: translateX(30px); }
        }
      `}</style>
    </div>
  )
}
