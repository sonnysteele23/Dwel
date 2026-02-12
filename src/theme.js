// =============================================================
// THEME CONFIGURATION
// =============================================================
// Edit this file to rebrand the entire application.
// All brand colors, names, taglines, and content strings
// are centralized here for easy swapping.
// =============================================================

const theme = {
  // ── Brand Identity ──────────────────────────────────────────
  brand: {
    name: 'Dwel.Digital',
    tagline: 'Voice-First Care',
    logo: {
      // SVG path for the logo icon (rendered inside a circle)
      iconPath: 'M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z',
      viewBox: '0 0 24 24',
    },
    copyright: `© ${new Date().getFullYear()} Dwel.Digital. All rights reserved.`,
  },

  // ── Colors ──────────────────────────────────────────────────
  // These map to Tailwind classes. To change the brand color,
  // update both here AND in tailwind.config.js.
  colors: {
    primary: 'bg-dwel-teal',
    primaryHover: 'hover:bg-dwel-teal-dark',
    primaryText: 'text-dwel-teal',
    primaryLight: 'bg-dwel-teal-light',
    primaryBorder: 'border-dwel-teal',
    primaryRing: 'ring-dwel-teal',
    primaryFocus: 'focus:ring-dwel-teal',
    sidebarBg: 'bg-sidebar-bg',
    sidebarHover: 'hover:bg-sidebar-hover',
    pageBg: 'bg-[#FAF9F7]',
    avatarBg: 'bg-blue-100',
    avatarText: 'text-blue-700',
  },

  // ── Raw color values (for inline styles, SVGs, etc.) ───────
  rawColors: {
    primary: '#2D9F8F',
    primaryDark: '#247F73',
    primaryLight: '#E8F5F3',
    pageBg: '#FAF9F7',
  },

  // ── Landing Page Content ────────────────────────────────────
  landing: {
    badge: 'Voice-First AI Assistant',
    headline: 'Caring for your loved ones,',
    headlineAccent: 'together',
    subheadline: 'A dignified, voice-powered platform that helps caregivers support their elderly parents with appointments, transportation, deliveries, and daily needs.',
    ctaPrimary: 'Try Demo',
    ctaSecondary: 'Get Started',
    trustBadges: ['HIPAA Aware', '24/7 Available'],
    voiceAssistant: {
      title: 'Voice Assistant Active',
      subtitle: 'Ready to help',
      userMessage: '"I need a ride to my doctor\'s appointment tomorrow at 2pm"',
      aiResponse: '"I\'ve scheduled an Uber pickup for tomorrow at 1:30pm to Dr. Smith\'s office. I\'ll send a reminder in the morning."',
    },
    features: [
      {
        title: 'Voice-First Design',
        description: 'Natural conversation with AI that understands context and speaks clearly. No apps to navigate, just talk.',
      },
      {
        title: 'Smart Scheduling',
        description: "Appointments, reminders, and transportation coordinated seamlessly. Never miss a doctor's visit again.",
      },
      {
        title: 'Family Dashboard',
        description: 'Caregivers stay informed with activity logs, appointment tracking, and real-time notifications.',
      },
    ],
    featuresHeadline: 'Built for dignity and independence',
    featuresSubheadline: 'Our platform respects autonomy while providing the support your loved ones need.',
    servicesHeadline: 'Connected to the services you trust',
    servicesSubheadline: 'Request rides, order groceries, manage prescriptions, and control smart home devices—all through natural voice commands.',
    services: [
      { name: 'Uber', category: 'Transport', letter: 'U' },
      { name: 'DoorDash', category: 'Food', letter: 'D' },
      { name: 'Instacart', category: 'Grocery', letter: 'I' },
      { name: 'Amazon', category: 'Shopping', letter: 'A' },
      { name: 'Walmart', category: 'Shopping', letter: 'W' },
      { name: 'CVS', category: 'Pharmacy', letter: 'C' },
      { name: 'Walgreens', category: 'Pharmacy', letter: 'W' },
    ],
    howItWorksHeadline: 'How it works',
    howItWorksSubheadline: 'Get started in minutes. Add your loved ones and let Dwel.Digital help.',
    steps: [
      { number: 1, title: 'Create your account', description: 'Sign up as a caregiver and set up your family profile in just a few clicks.' },
      { number: 2, title: 'Add your loved ones', description: 'Onboard your parents or family members with their preferences and needs.' },
      { number: 3, title: 'Start using voice', description: 'Your loved ones can now request services naturally through voice or chat.' },
    ],
    ctaHeadline: 'Ready to support your loved ones?',
    ctaSubheadline: 'Join thousands of caregivers who are providing better care with Dwel.Digital.',
    ctaButton: 'Get Started Free',
  },

  // ── Auth Page Content ───────────────────────────────────────
  auth: {
    loginTitle: 'Welcome back',
    loginSubtitle: 'Sign in to manage care for your loved ones',
    registerTitle: 'Create your account',
    registerSubtitle: 'Get started with Dwel.Digital in minutes',
    loginButton: 'Sign In',
    registerButton: 'Create Account',
    tosText: "By continuing, you agree to Dwel.Digital's Terms of Service and Privacy Policy.",
  },

  // ── Demo / App Content ──────────────────────────────────────
  demo: {
    welcomeMessage: 'Welcome back, Demo',
    welcomeSubtitle: 'Manage care for your loved ones',
    userName: 'Demo Caregiver',
    userRole: 'Caregiver',
    userInitials: 'DC',
  },

  // ── Navigation ──────────────────────────────────────────────
  nav: {
    topLinks: [
      { label: 'Features', href: '#features' },
      { label: 'How It Works', href: '#how-it-works' },
      { label: 'Services', href: '#services' },
    ],
  },
}

export default theme
