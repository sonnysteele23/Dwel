import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import theme from '../theme'
import {
  Car, Truck, UtensilsCrossed, Lock, Zap, Code2, Webhook,
  ChevronRight, ChevronDown, Copy, Check, ExternalLink,
  ArrowLeft, Menu, X, Search, BookOpen, Server, Key,
  AlertTriangle, Clock, Globe, Hash, FileText, Terminal
} from 'lucide-react'

// ── Syntax-highlighted code block ────────────────────────────
function CodeBlock({ code, language = 'json', title }) {
  const [copied, setCopied] = useState(false)
  const handleCopy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  return (
    <div className="rounded-xl overflow-hidden border border-gray-800 bg-[#0d1117] my-4 group">
      {title && (
        <div className="flex items-center justify-between px-4 py-2 bg-[#161b22] border-b border-gray-800 text-xs text-gray-400 font-mono">
          <span>{title}</span>
          <button onClick={handleCopy} className="flex items-center gap-1 hover:text-gray-200 transition-colors">
            {copied ? <Check size={12} /> : <Copy size={12} />}
            {copied ? 'Copied' : 'Copy'}
          </button>
        </div>
      )}
      <pre className="p-4 overflow-x-auto text-sm leading-relaxed">
        <code className="text-gray-300 font-mono whitespace-pre">{code}</code>
      </pre>
      {!title && (
        <button onClick={handleCopy} className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded bg-gray-700 text-gray-300 hover:text-white">
          {copied ? <Check size={12} /> : <Copy size={12} />}
        </button>
      )}
    </div>
  )
}

// ── Method badge ─────────────────────────────────────────────
function MethodBadge({ method }) {
  const colors = {
    GET: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
    POST: 'bg-blue-500/15 text-blue-400 border-blue-500/30',
    PUT: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
    DELETE: 'bg-red-500/15 text-red-400 border-red-500/30',
    WH: 'bg-purple-500/15 text-purple-400 border-purple-500/30',
  }
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-bold font-mono border ${colors[method] || colors.GET}`}>
      {method}
    </span>
  )
}

// ── Params table ─────────────────────────────────────────────
function ParamsTable({ params }) {
  return (
    <div className="overflow-x-auto my-4 rounded-lg border border-gray-200">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-gray-50 border-b border-gray-200">
            <th className="text-left px-4 py-2.5 font-semibold text-gray-700">Parameter</th>
            <th className="text-left px-4 py-2.5 font-semibold text-gray-700">Type</th>
            <th className="text-left px-4 py-2.5 font-semibold text-gray-700">Req</th>
            <th className="text-left px-4 py-2.5 font-semibold text-gray-700">Description</th>
          </tr>
        </thead>
        <tbody>
          {params.map((p, i) => (
            <tr key={i} className="border-b border-gray-100 last:border-0">
              <td className="px-4 py-2.5 font-mono text-xs text-dwel-teal font-medium">{p.name}</td>
              <td className="px-4 py-2.5 text-gray-500 font-mono text-xs">{p.type}</td>
              <td className="px-4 py-2.5">
                {p.required ? (
                  <span className="inline-block w-2 h-2 rounded-full bg-red-400" title="Required" />
                ) : (
                  <span className="inline-block w-2 h-2 rounded-full bg-gray-300" title="Optional" />
                )}
              </td>
              <td className="px-4 py-2.5 text-gray-600 text-xs">{p.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

// ── Endpoint section ─────────────────────────────────────────
function Endpoint({ method, path, title, description, params, requestBody, responseBody, responseTitle, children, id }) {
  const [open, setOpen] = useState(false)
  return (
    <div id={id} className="border border-gray-200 rounded-xl mb-4 overflow-hidden bg-white hover:border-gray-300 transition-colors scroll-mt-24">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-3 px-5 py-4 text-left hover:bg-gray-50 transition-colors"
      >
        <MethodBadge method={method} />
        <code className="text-sm font-mono text-gray-700 flex-1 truncate">{path}</code>
        <span className="text-xs text-gray-400 hidden sm:block mr-2">{title}</span>
        {open ? <ChevronDown size={16} className="text-gray-400" /> : <ChevronRight size={16} className="text-gray-400" />}
      </button>
      {open && (
        <div className="px-5 pb-5 border-t border-gray-100">
          <p className="text-sm text-gray-600 mt-4 mb-3">{description}</p>
          {params && <ParamsTable params={params} />}
          {requestBody && <CodeBlock code={requestBody} title="Request Body" />}
          {responseBody && <CodeBlock code={responseBody} title={responseTitle || "Response"} />}
          {children}
        </div>
      )}
    </div>
  )
}

// ── Section wrapper ──────────────────────────────────────────
function Section({ id, icon: Icon, title, badge, children }) {
  return (
    <section id={id} className="mb-16 scroll-mt-24">
      <div className="flex items-center gap-3 mb-6">
        {Icon && <div className="w-9 h-9 rounded-lg bg-dwel-teal-light flex items-center justify-center"><Icon size={18} className="text-dwel-teal" /></div>}
        <div>
          <h2 className="text-xl font-bold text-gray-900">{title}</h2>
          {badge && <span className="text-xs font-mono text-gray-400 mt-0.5 block">{badge}</span>}
        </div>
      </div>
      {children}
    </section>
  )
}

// ── Sidebar nav data ─────────────────────────────────────────
const navSections = [
  { id: 'overview', label: 'Overview', icon: BookOpen },
  { id: 'auth', label: 'Authentication', icon: Key },
  { id: 'rides', label: 'Rides API', icon: Car },
  { id: 'direct', label: 'Uber Direct (DaaS)', icon: Truck },
  { id: 'eats', label: 'Eats Marketplace', icon: UtensilsCrossed },
  { id: 'architecture', label: 'Architecture', icon: Server },
  { id: 'errors', label: 'Error Handling', icon: AlertTriangle },
  { id: 'cheatsheet', label: 'Quick Reference', icon: Terminal },
]

// ── Main Component ───────────────────────────────────────────
export default function ApiReference() {
  const navigate = useNavigate()
  const [activeSection, setActiveSection] = useState('overview')
  const [mobileNav, setMobileNav] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  // Intersection observer for active section tracking
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { rootMargin: '-80px 0px -70% 0px' }
    )
    navSections.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMobileNav(false)
  }

  return (
    <div className="min-h-screen bg-[#FAF9F7]">
      {/* ── Top Bar ──────────────────────────────────────── */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate('/')} className="flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors">
              <ArrowLeft size={16} />
              <span className="text-sm hidden sm:inline">dwel.digital</span>
            </button>
            <span className="text-gray-300">|</span>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-dwel-teal rounded-md flex items-center justify-center">
                <Code2 size={13} className="text-white" />
              </div>
              <span className="font-semibold text-gray-900 text-sm">API Reference</span>
              <span className="text-[10px] font-mono bg-dwel-teal-light text-dwel-teal px-1.5 py-0.5 rounded-full font-medium">v2025</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <a href="https://developer.uber.com" target="_blank" rel="noopener noreferrer" className="hidden sm:flex items-center gap-1 text-xs text-gray-500 hover:text-gray-700 transition-colors">
              Uber Dev Portal <ExternalLink size={11} />
            </a>
            <button onClick={() => setMobileNav(!mobileNav)} className="lg:hidden p-2 rounded-lg hover:bg-gray-100">
              {mobileNav ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-[1440px] mx-auto flex">
        {/* ── Sidebar ──────────────────────────────────── */}
        <aside className={`${mobileNav ? 'block' : 'hidden'} lg:block w-64 shrink-0 border-r border-gray-200 bg-white sticky top-14 h-[calc(100vh-3.5rem)] overflow-y-auto`}>
          <nav className="p-4">
            <div className="mb-4">
              <div className="relative">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search endpoints..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-8 pr-3 py-2 text-xs border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-dwel-teal/20 focus:border-dwel-teal transition-all"
                />
              </div>
            </div>
            <ul className="space-y-0.5">
              {navSections.map(({ id, label, icon: Icon }) => (
                <li key={id}>
                  <button
                    onClick={() => scrollTo(id)}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-all ${
                      activeSection === id
                        ? 'bg-dwel-teal-light text-dwel-teal font-medium'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <Icon size={15} />
                    {label}
                  </button>
                </li>
              ))}
            </ul>
            <div className="mt-6 pt-4 border-t border-gray-100">
              <p className="text-[10px] font-medium text-gray-400 uppercase tracking-wider px-3 mb-2">Resources</p>
              <ul className="space-y-0.5">
                {[
                  { label: 'Rides Docs', href: 'https://developer.uber.com/docs/riders' },
                  { label: 'Direct Docs', href: 'https://developer.uber.com/docs/deliveries/overview' },
                  { label: 'Eats Docs', href: 'https://developer.uber.com/docs/eats/introduction' },
                  { label: 'Postman (Direct)', href: 'https://www.postman.com/uber/workspace/uber-direct' },
                ].map((link) => (
                  <li key={link.label}>
                    <a href={link.href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-3 py-1.5 text-xs text-gray-500 hover:text-dwel-teal transition-colors">
                      <ExternalLink size={11} />{link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        </aside>

        {/* ── Main Content ─────────────────────────────── */}
        <main className="flex-1 min-w-0 px-6 sm:px-10 py-10 lg:py-12">
          <div className="max-w-3xl">

            {/* ═══ OVERVIEW ═══════════════════════════════ */}
            <Section id="overview" icon={BookOpen} title="API Overview" badge="Uber & Uber Eats — Complete Integration Reference">
              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                This reference covers all Uber APIs relevant to the Dwel caregiving platform — Rides for transportation,
                Uber Direct for courier deliveries, and Eats Marketplace for food ordering. Each API family uses separate
                credentials and serves distinct workflows.
              </p>
              <div className="grid sm:grid-cols-3 gap-3 mb-6">
                {[
                  { icon: Car, title: 'Rides API', base: 'api.uber.com/v1.2', desc: 'Doctor appointments, errands, social outings', color: 'emerald' },
                  { icon: Truck, title: 'Uber Direct', base: 'api.uber.com/v1/customers/{id}/deliveries', desc: 'Medications, groceries, care packages', color: 'blue' },
                  { icon: UtensilsCrossed, title: 'Eats Marketplace', base: 'api.uber.com/v1/eats', desc: 'Meal delivery management & tracking', color: 'amber' },
                ].map((api) => (
                  <div key={api.title} className="border border-gray-200 rounded-xl p-4 bg-white hover:shadow-sm transition-shadow">
                    <div className={`w-8 h-8 rounded-lg bg-${api.color}-50 flex items-center justify-center mb-3`}>
                      <api.icon size={16} className={`text-${api.color}-600`} />
                    </div>
                    <h3 className="font-semibold text-sm text-gray-900 mb-1">{api.title}</h3>
                    <code className="text-[10px] text-gray-400 font-mono block mb-2 break-all">{api.base}</code>
                    <p className="text-xs text-gray-500">{api.desc}</p>
                  </div>
                ))}
              </div>
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800 flex gap-3">
                <AlertTriangle size={18} className="text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <strong className="block mb-1">Keep these APIs architecturally separate</strong>
                  Rides and Direct/Eats serve different purposes, use different credentials, and model different workflows.
                  The Dwel backend must maintain distinct service boundaries.
                </div>
              </div>
            </Section>

            {/* ═══ AUTHENTICATION ═════════════════════════ */}
            <Section id="auth" icon={Key} title="Authentication" badge="OAuth 2.0 — All Products">
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                All Uber APIs authenticate via OAuth 2.0 at a shared endpoint. For Dwel's server-to-server integration,
                use the <code className="text-xs bg-gray-100 px-1.5 py-0.5 rounded font-mono">client_credentials</code> grant type.
              </p>
              <CodeBlock title="Token Request" code={`POST https://login.uber.com/oauth/v2/token
Content-Type: application/x-www-form-urlencoded

client_id=YOUR_CLIENT_ID
&client_secret=YOUR_CLIENT_SECRET
&grant_type=client_credentials
&scope=eats.store eats.order delivery`} />
              <CodeBlock title="Token Response" code={`{
  "access_token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "Bearer",
  "expires_in": 2592000
}`} />
              <p className="text-gray-600 text-sm mb-3">Include the token in all subsequent requests:</p>
              <CodeBlock code={`Authorization: Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9...`} title="Authorization Header" />
              <h3 className="font-semibold text-sm text-gray-900 mt-6 mb-3">OAuth Scopes</h3>
              <div className="overflow-x-auto rounded-lg border border-gray-200">
                <table className="w-full text-sm">
                  <thead><tr className="bg-gray-50 border-b border-gray-200">
                    <th className="text-left px-4 py-2.5 font-semibold text-gray-700">Scope</th>
                    <th className="text-left px-4 py-2.5 font-semibold text-gray-700">Access</th>
                  </tr></thead>
                  <tbody>
                    {[
                      ['eats.store', 'Read/write store configs and menus on Uber Eats'],
                      ['eats.order', 'Accept, deny, and manage incoming Uber Eats orders'],
                      ['eats.deliveries', 'Create and manage Uber Direct deliveries (Eats-native)'],
                      ['delivery', 'Full Uber Direct DaaS API — standalone courier dispatch'],
                      ['request', 'Request Uber rides on behalf of users (Rides API)'],
                      ['history', 'Read trip history for a user (requires user OAuth flow)'],
                    ].map(([scope, access]) => (
                      <tr key={scope} className="border-b border-gray-100 last:border-0">
                        <td className="px-4 py-2.5 font-mono text-xs text-dwel-teal font-medium">{scope}</td>
                        <td className="px-4 py-2.5 text-gray-600 text-xs">{access}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Section>

            {/* ═══ RIDES API ══════════════════════════════ */}
            <Section id="rides" icon={Car} title="Rides API" badge="Base URL: api.uber.com/v1.2">
              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                Powers Dwel's transportation dashboard — scheduling rides to medical appointments, errands, and social engagements.
              </p>

              <Endpoint id="rides-products" method="GET" path="/products" title="List Available Ride Types"
                description="Returns all available Uber products (UberX, UberXL, Comfort, etc.) at a given location. Use this to populate ride type selection in the Dwel UI."
                params={[
                  { name: 'latitude', type: 'float', required: true, description: 'Latitude of the pickup location (decimal degrees)' },
                  { name: 'longitude', type: 'float', required: true, description: 'Longitude of the pickup location (decimal degrees)' },
                ]}
                responseBody={`{
  "products": [
    {
      "product_id": "1b64bf82-a0ba-4b0f-be32-df8d05481d7e",
      "display_name": "UberX",
      "description": "Affordable rides, just for you",
      "capacity": 4,
      "price_details": {
        "base": 1.05,
        "cost_per_minute": 0.15,
        "cost_per_distance": 0.93,
        "distance_unit": "mile",
        "minimum": 7.00,
        "cancellation_fee": 5.00,
        "currency_code": "USD"
      }
    }
  ]
}`} responseTitle="200 OK" />

              <Endpoint id="rides-price" method="GET" path="/estimates/price" title="Price Estimate"
                description="Returns fare estimates for all available products between two coordinates. Always call this before requesting a ride so caregivers can review costs."
                params={[
                  { name: 'start_latitude', type: 'float', required: true, description: 'Pickup latitude' },
                  { name: 'start_longitude', type: 'float', required: true, description: 'Pickup longitude' },
                  { name: 'end_latitude', type: 'float', required: true, description: 'Dropoff latitude' },
                  { name: 'end_longitude', type: 'float', required: true, description: 'Dropoff longitude' },
                  { name: 'seat_count', type: 'int', required: false, description: 'Number of seats required (default: 1)' },
                ]} />

              <Endpoint id="rides-time" method="GET" path="/estimates/time" title="Time Estimate"
                description="Returns estimated time (in seconds) until pickup for each product at a given location. Use this to set caregiver expectations in the Dwel dashboard."
                params={[
                  { name: 'start_latitude', type: 'float', required: true, description: 'Pickup latitude' },
                  { name: 'start_longitude', type: 'float', required: true, description: 'Pickup longitude' },
                  { name: 'product_id', type: 'string', required: false, description: 'Limit results to a specific product type' },
                ]} />

              <Endpoint id="rides-request" method="POST" path="/requests" title="Create a Ride Request"
                description="Dispatches an Uber driver to the specified pickup location. This is the core action for Dwel's ride scheduling feature. Requires user-context OAuth token."
                params={[
                  { name: 'product_id', type: 'string', required: true, description: 'Product ID from /products endpoint' },
                  { name: 'start_latitude', type: 'float', required: true, description: 'Pickup latitude' },
                  { name: 'start_longitude', type: 'float', required: true, description: 'Pickup longitude' },
                  { name: 'end_latitude', type: 'float', required: true, description: 'Dropoff latitude' },
                  { name: 'end_longitude', type: 'float', required: true, description: 'Dropoff longitude' },
                  { name: 'start_place_id', type: 'string', required: false, description: "Named place ID (e.g., 'home') instead of coordinates" },
                  { name: 'end_place_id', type: 'string', required: false, description: 'Named dropoff place ID' },
                  { name: 'fare_id', type: 'string', required: false, description: 'Upfront fare ID from /requests/estimate to lock the price' },
                  { name: 'surge_confirmation_id', type: 'string', required: false, description: 'Required if surge pricing is active' },
                ]}
                requestBody={`{
  "product_id": "1b64bf82-a0ba-4b0f-be32-df8d05481d7e",
  "start_latitude": 47.6062,
  "start_longitude": -122.3321,
  "end_latitude": 47.6205,
  "end_longitude": -122.3493,
  "fare_id": "fare_123abc"
}`}
                responseBody={`{
  "request_id": "852b8fdd-4369-4659-9628-e122e63d5fb5",
  "status": "processing",
  "vehicle": null,
  "driver": null,
  "eta": 4
}`} responseTitle="202 Accepted" />

              <Endpoint id="rides-status" method="GET" path="/requests/{request_id}" title="Get Ride Status"
                description="Polls the current status of an active ride request. Returns driver info, vehicle details, and real-time ETA once a driver is matched." />

              <Endpoint id="rides-cancel" method="DELETE" path="/requests/{request_id}" title="Cancel a Ride"
                description="Cancels an active ride request. If a driver has already been dispatched, a cancellation fee may apply. The Dwel UI should surface this warning." />

              <Endpoint id="rides-receipt" method="GET" path="/requests/{request_id}/receipt" title="Trip Receipt"
                description="Returns full receipt data for a completed trip including fare breakdown, distance, duration, and surge multiplier. Requires history_lite or history scope." />

              {/* Ride Status Lifecycle */}
              <div className="bg-white border border-gray-200 rounded-xl p-5 mt-6">
                <h3 className="font-semibold text-sm text-gray-900 mb-3 flex items-center gap-2">
                  <Zap size={14} className="text-dwel-teal" /> Ride Status Lifecycle
                </h3>
                <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
                  {['processing', 'accepted', 'arriving', 'in_progress', 'completed'].map((s, i) => (
                    <span key={s} className="flex items-center gap-2">
                      <span className="px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200">{s}</span>
                      {i < 4 && <ChevronRight size={12} className="text-gray-300" />}
                    </span>
                  ))}
                </div>
                <div className="flex gap-4 mt-3 text-xs font-mono text-gray-400">
                  <span>↳ <span className="text-red-400">driver_canceled</span></span>
                  <span>↳ <span className="text-red-400">rider_canceled</span></span>
                </div>
              </div>
            </Section>

            {/* ═══ UBER DIRECT (DaaS) ════════════════════ */}
            <Section id="direct" icon={Truck} title="Uber Direct API (DaaS)" badge="Base URL: api.uber.com/v1/customers/{customer_id}">
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                On-demand courier dispatch for delivering medications, groceries, medical supplies, and care packages to elderly recipients.
                Workflow: <strong>Get Quote → Create Delivery → Monitor via Webhooks</strong>.
              </p>
              <div className="flex gap-2 mb-6 text-xs">
                <a href="https://direct.uber.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-gray-600 hover:border-dwel-teal hover:text-dwel-teal transition-colors">
                  <Globe size={12} /> Developer Portal
                </a>
                <a href="https://www.postman.com/uber/workspace/uber-direct" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-gray-600 hover:border-dwel-teal hover:text-dwel-teal transition-colors">
                  <ExternalLink size={12} /> Postman Collection
                </a>
              </div>

              <Endpoint id="direct-quote" method="POST" path="/delivery_quotes" title="Get Delivery Quote"
                description="Creates a delivery quote with fee estimate and validity window. The returned quote_id must be used within the validity period to create a delivery."
                params={[
                  { name: 'pickup_address', type: 'string/object', required: true, description: 'Pickup address (string or structured JSON)' },
                  { name: 'dropoff_address', type: 'string/object', required: true, description: 'Dropoff address. Structured format recommended' },
                  { name: 'pickup_phone_number', type: 'string', required: false, description: 'Pickup contact phone (E.164 format)' },
                  { name: 'dropoff_phone_number', type: 'string', required: false, description: 'Dropoff contact phone' },
                  { name: 'manifest_total_value', type: 'int', required: false, description: 'Declared value of items in cents (insurance)' },
                ]}
                responseBody={`{
  "kind": "delivery",
  "id": "dqt_abc123def456",
  "created": 1700000000,
  "expires": 1700003600,
  "fee": 895,
  "currency": "USD",
  "currency_type": "cent",
  "dropoff_eta": 1700003000
}`} responseTitle="200 OK" />

              <Endpoint id="direct-create" method="POST" path="/deliveries" title="Create Delivery"
                description="Dispatches a courier using a valid quote ID. An Uber courier will be assigned and en route to the pickup location."
                params={[
                  { name: 'quote_id', type: 'string', required: true, description: 'Quote ID from /delivery_quotes' },
                  { name: 'pickup_name', type: 'string', required: true, description: 'Business or person name at pickup' },
                  { name: 'pickup_address', type: 'string', required: true, description: 'Must match quote address' },
                  { name: 'pickup_phone_number', type: 'string', required: true, description: 'Contact phone (E.164)' },
                  { name: 'dropoff_name', type: 'string', required: true, description: 'Recipient full name' },
                  { name: 'dropoff_address', type: 'string', required: true, description: 'Must match quote address' },
                  { name: 'dropoff_phone_number', type: 'string', required: true, description: 'Recipient phone (E.164)' },
                  { name: 'manifest_items', type: 'array', required: true, description: 'Items being delivered (name, qty, price, weight)' },
                  { name: 'external_id', type: 'string', required: false, description: 'Your internal order/reference ID' },
                  { name: 'courier_tip', type: 'int', required: false, description: 'Tip in cents (can only increase after creation)' },
                  { name: 'pickup_notes', type: 'string', required: false, description: 'Special instructions at pickup' },
                  { name: 'dropoff_notes', type: 'string', required: false, description: "Delivery instructions (e.g., 'Leave with concierge')" },
                  { name: 'requires_dropoff_signature', type: 'bool', required: false, description: 'Collect recipient signature on delivery' },
                  { name: 'dropoff_verification', type: 'object', required: false, description: 'Verification: pin_code, signature, or photo' },
                ]}
                requestBody={`{
  "quote_id": "dqt_abc123def456",
  "pickup_name": "Dwel Care Pharmacy",
  "pickup_address": "123 Main St, Seattle, WA 98101",
  "pickup_phone_number": "+12065550100",
  "dropoff_name": "Margaret Johnson",
  "dropoff_address": "456 Oak Ave, Bellevue, WA 98004",
  "dropoff_phone_number": "+14255550199",
  "dropoff_notes": "Ring doorbell twice. Resident may have hearing difficulty.",
  "manifest_items": [
    { "name": "Lisinopril 10mg", "quantity": 1, "size": "small", "price": 1500 },
    { "name": "Blood Pressure Monitor", "quantity": 1, "size": "small", "price": 4500 }
  ],
  "external_id": "dwel-delivery-MJ-2026-03-001",
  "courier_tip": 400
}`}
                responseBody={`{
  "id": "del_xyz789",
  "quote_id": "dqt_abc123def456",
  "status": "pending",
  "tracking_url": "https://www.uber.com/orders/del_xyz789",
  "courier": null,
  "fee": 895,
  "currency": "USD"
}`} responseTitle="200 OK" />

              <Endpoint id="direct-get" method="GET" path="/deliveries/{delivery_id}" title="Get Delivery"
                description="Returns full delivery details including current status, courier location, and ETA. Poll to display live status in the caregiver dashboard." />

              <Endpoint id="direct-cancel" method="POST" path="/deliveries/{delivery_id}/cancel" title="Cancel Delivery"
                description="Cancels an active delivery. A fee may still apply if a courier has been dispatched. Always check status before cancelling." />

              {/* Delivery Status Values */}
              <div className="bg-white border border-gray-200 rounded-xl p-5 mt-6">
                <h3 className="font-semibold text-sm text-gray-900 mb-3 flex items-center gap-2">
                  <Zap size={14} className="text-dwel-teal" /> Delivery Status Values
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                  {[
                    ['pending', 'Finding a courier', 'bg-gray-50 text-gray-600'],
                    ['pickup', 'Courier heading to pickup', 'bg-blue-50 text-blue-700'],
                    ['pickup_complete', 'Collected, en route', 'bg-blue-50 text-blue-700'],
                    ['dropoff', 'Courier at dropoff', 'bg-amber-50 text-amber-700'],
                    ['delivered', 'Completed', 'bg-emerald-50 text-emerald-700'],
                    ['canceled', 'Cancelled', 'bg-red-50 text-red-600'],
                    ['returned', 'Returning to pickup', 'bg-purple-50 text-purple-600'],
                  ].map(([status, desc, cls]) => (
                    <div key={status} className={`rounded-lg px-3 py-2 ${cls}`}>
                      <span className="font-mono font-medium block">{status}</span>
                      <span className="opacity-75">{desc}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Webhooks */}
              <div className="mt-6">
                <h3 className="font-semibold text-sm text-gray-900 mb-3 flex items-center gap-2">
                  <Webhook size={14} className="text-dwel-teal" /> Webhooks
                </h3>
                <Endpoint id="direct-wh-status" method="WH" path="event.delivery_status" title="Delivery Milestone"
                  description="Posted to your webhook URL at delivery milestones. Configure the URL in the Uber Direct Dashboard."
                  responseBody={`{
  "kind": "event",
  "type": "event.delivery_status",
  "id": "evt_delivery_abc",
  "created": 1700001000,
  "live_mode": true,
  "data": {
    "id": "del_xyz789",
    "status": "pickup_complete",
    "courier": {
      "name": "Carlos M.",
      "rating": 4.98,
      "vehicle_type": "bicycle",
      "phone_number": "+1-XXX-XXX-XXXX"
    }
  }
}`} responseTitle="Webhook Payload" />

                <Endpoint id="direct-wh-gps" method="WH" path="event.courier_update" title="Real-Time GPS"
                  description="Fires every 20 seconds with courier GPS coordinates. courier_imminent = true indicates within ~80 meters of pickup/dropoff."
                  responseBody={`{
  "type": "event.courier_update",
  "data": {
    "id": "del_xyz789",
    "courier": {
      "location": { "lat": 47.6105, "lng": -122.3371 }
    },
    "courier_imminent": true
  }
}`} responseTitle="Webhook Payload" />
              </div>
            </Section>

            {/* ═══ EATS MARKETPLACE ══════════════════════ */}
            <Section id="eats" icon={UtensilsCrossed} title="Eats Marketplace API" badge="Base URL: api.uber.com/v1/eats">
              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                Programmatic management of stores, menus, and orders on Uber Eats. Relevant for integrating with partner
                restaurants or meal delivery services for care recipients.
              </p>

              <h3 className="font-semibold text-sm text-gray-900 mb-3">Store Management</h3>
              <Endpoint id="eats-store" method="GET" path="/eats/stores/{store_id}" title="Get Store Details"
                description="Retrieves metadata about a specific Uber Eats store including location, contact, operating status, and POS integration details."
                responseBody={`{
  "store_id": "7e973b58-40b7-4bd8-b01c-c7d1cbd194f6",
  "name": "Green Garden Meals",
  "status": "active",
  "location": {
    "address": "123 Nutrition Blvd",
    "city": "Seattle",
    "state": "WA",
    "postal_code": "98101",
    "latitude": 47.6062,
    "longitude": -122.3321
  },
  "avg_prep_time": 15,
  "timezone": "America/Los_Angeles"
}`} responseTitle="200 OK" />

              <Endpoint id="eats-stores-list" method="GET" path="/eats/stores" title="List Stores"
                description="Returns all stores associated with your account. Supports filtering by brand_id, location, and status." />

              <h3 className="font-semibold text-sm text-gray-900 mt-8 mb-3">Menu Management</h3>
              <Endpoint id="eats-menu-get" method="GET" path="/eats/stores/{store_id}/menus" title="Get Menu"
                description="Returns the full menu for a store including all categories, items, modifiers, and pricing. Requires eats.store scope." />

              <Endpoint id="eats-menu-put" method="PUT" path="/eats/stores/{store_id}/menus" title="Upload/Replace Menu"
                description="Creates or fully replaces a store's menu. Updates take effect immediately; images may take a few hours to process." />

              <Endpoint id="eats-menu-item" method="POST" path="/eats/stores/{store_id}/menus/items" title="Update Menu Item"
                description="Updates a specific menu item — primarily to mark items out-of-stock or update pricing in real time."
                params={[
                  { name: 'external_id', type: 'string', required: true, description: 'Your internal item ID' },
                  { name: 'suspension_info', type: 'object', required: false, description: 'Set to mark item as suspended (out of stock)' },
                  { name: 'price_info', type: 'object', required: false, description: 'Updated price in cents' },
                ]} />

              <h3 className="font-semibold text-sm text-gray-900 mt-8 mb-3">Order Management</h3>
              <Endpoint id="eats-order-get" method="GET" path="/eats/orders/{order_id}" title="Get Full Order"
                description="Retrieves complete order details including items, modifiers, dropoff address, and fee breakdown. Call after receiving an order webhook." />

              <Endpoint id="eats-order-accept" method="POST" path="/eats/orders/{order_id}/accept_pos_order" title="Accept Order"
                description="Accepts an incoming order on behalf of the merchant. Must be called within 11.5 minutes of receiving the order webhook."
                requestBody={`{
  "reason": "Order accepted",
  "external_reference_id": "dwel-order-001",
  "order_pickup_instructions": "Ring front doorbell"
}`} />

              <Endpoint id="eats-order-deny" method="POST" path="/eats/orders/{order_id}/deny_pos_order" title="Deny Order"
                description="Rejects an incoming order. Requires a deny reason code. The customer will be notified."
                params={[
                  { name: 'reason', type: 'string', required: true, description: 'Deny reason: OUT_OF_ITEMS, KITCHEN_CLOSED, CUSTOMER_CALLED_TO_CANCEL, RESTAURANT_TOO_BUSY, CANNOT_COMPLETE_CUSTOMER_NOTE, ORDER_AUTHENTICITY_NOT_GUARANTEED' },
                ]} />

              <Endpoint id="eats-order-cancel" method="GET" path="/eats/orders/{order_id}/cancel" title="Cancel Active Order"
                description="Cancels an already-accepted order. Use sparingly — excessive cancellations affect partner performance ratings." />

              {/* Order Webhooks */}
              <div className="bg-white border border-gray-200 rounded-xl p-5 mt-6">
                <h3 className="font-semibold text-sm text-gray-900 mb-3 flex items-center gap-2">
                  <Webhook size={14} className="text-dwel-teal" /> Order Webhooks
                </h3>
                <div className="space-y-2 text-xs">
                  {[
                    ['orders.notification', 'New order placed on Uber Eats'],
                    ['orders.cancel', 'Order cancelled by customer or Uber'],
                    ['orders.scheduled_notification', 'Scheduled order approaching prep time'],
                    ['store.status', 'Store status changed (activated/deactivated)'],
                    ['orders.fulfillment_issues.resolved', 'Fulfillment issue resolved'],
                  ].map(([event, desc]) => (
                    <div key={event} className="flex items-start gap-3 py-1.5">
                      <code className="font-mono text-purple-600 bg-purple-50 px-2 py-0.5 rounded shrink-0">{event}</code>
                      <span className="text-gray-600">{desc}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Section>

            {/* ═══ ARCHITECTURE ═══════════════════════════ */}
            <Section id="architecture" icon={Server} title="Dwel Integration Architecture" badge="Service Boundary Design">
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                Recommended backend structure maintaining clean separation between transportation (Rides)
                and food/goods delivery (Direct/Eats).
              </p>
              <CodeBlock title="Service Boundary Design" code={`Dwel Backend
├── /services/uber-rides/     → Uber Rides API v1.2
│   ├── getProductTypes()        GET /products
│   ├── getPriceEstimate()       GET /estimates/price
│   ├── getTimeEstimate()        GET /estimates/time
│   ├── requestRide()            POST /requests
│   ├── getRideStatus()          GET /requests/{id}
│   └── cancelRide()             DELETE /requests/{id}
│
├── /services/uber-direct/    → Uber Direct DaaS API
│   ├── getDeliveryQuote()       POST /delivery_quotes
│   ├── createDelivery()         POST /deliveries
│   ├── getDelivery()            GET /deliveries/{id}
│   └── cancelDelivery()         POST /deliveries/{id}/cancel
│
└── /services/uber-eats/      → Eats Marketplace API (optional)
    ├── getStore()               GET /eats/stores/{id}
    ├── getMenu()                GET /eats/stores/{id}/menus
    ├── acceptOrder()            POST /eats/orders/{id}/accept_pos_order
    └── denyOrder()              POST /eats/orders/{id}/deny_pos_order`} />

              {/* Getting Access */}
              <h3 className="font-semibold text-sm text-gray-900 mt-8 mb-3">Getting Access</h3>
              <div className="space-y-3">
                {[
                  { api: 'Rides API', how: 'Register at developer.uber.com, create an app, request "request" scope', portal: 'developer.uber.com/dashboard' },
                  { api: 'Uber Direct', how: 'Self-serve signup at direct.uber.com — get Client ID/Secret/Customer ID. Contact Uber account manager if self-serve is unavailable.', portal: 'direct.uber.com' },
                  { api: 'Eats Marketplace', how: 'Formal partner onboarding via Uber Eats. 99% order injection success rate required for production.', portal: 'developer.uber.com/docs/eats' },
                ].map((item) => (
                  <div key={item.api} className="flex items-start gap-3 bg-white border border-gray-200 rounded-lg p-4">
                    <Hash size={14} className="text-dwel-teal mt-0.5 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-sm text-gray-900">{item.api}</span>
                        <a href={`https://${item.portal}`} target="_blank" rel="noopener noreferrer" className="text-[10px] text-dwel-teal font-mono flex items-center gap-0.5 hover:underline">
                          {item.portal} <ExternalLink size={9} />
                        </a>
                      </div>
                      <p className="text-xs text-gray-500">{item.how}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Rate Limits */}
              <h3 className="font-semibold text-sm text-gray-900 mt-8 mb-3">Rate Limits</h3>
              <div className="overflow-x-auto rounded-lg border border-gray-200">
                <table className="w-full text-sm">
                  <thead><tr className="bg-gray-50 border-b border-gray-200">
                    <th className="text-left px-4 py-2.5 font-semibold text-gray-700">API</th>
                    <th className="text-left px-4 py-2.5 font-semibold text-gray-700">Sandbox</th>
                    <th className="text-left px-4 py-2.5 font-semibold text-gray-700">Production</th>
                  </tr></thead>
                  <tbody>
                    {[
                      ['Uber Direct', '200 req / 10 min per app', 'Varies — 429 on exceeded'],
                      ['Guest Rides API', 'Standard', '200 req / hour per endpoint'],
                      ['Eats Marketplace', 'Test environment', 'Contact partner manager'],
                    ].map(([api, sandbox, prod]) => (
                      <tr key={api} className="border-b border-gray-100 last:border-0">
                        <td className="px-4 py-2.5 font-medium text-gray-900 text-xs">{api}</td>
                        <td className="px-4 py-2.5 text-gray-500 text-xs font-mono">{sandbox}</td>
                        <td className="px-4 py-2.5 text-gray-500 text-xs font-mono">{prod}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Section>

            {/* ═══ ERROR HANDLING ═════════════════════════ */}
            <Section id="errors" icon={AlertTriangle} title="Error Handling" badge="HTTP Status Codes & Recovery">
              <div className="overflow-x-auto rounded-lg border border-gray-200">
                <table className="w-full text-sm">
                  <thead><tr className="bg-gray-50 border-b border-gray-200">
                    <th className="text-left px-4 py-2.5 font-semibold text-gray-700 w-16">Code</th>
                    <th className="text-left px-4 py-2.5 font-semibold text-gray-700">Error</th>
                    <th className="text-left px-4 py-2.5 font-semibold text-gray-700">Handling</th>
                  </tr></thead>
                  <tbody>
                    {[
                      ['400', 'validation_failed', 'Fix request parameters; review required fields', 'bg-amber-50'],
                      ['401', 'unauthorized', 'Refresh OAuth token; check scopes', 'bg-red-50'],
                      ['404', 'not_found', 'Verify resource IDs (customer_id / store_id)', ''],
                      ['409', 'surge_pricing', 'Surge active — prompt user to confirm; include surge_confirmation_id', 'bg-amber-50'],
                      ['422', 'quote_expired', 'Re-fetch a new delivery quote and retry', ''],
                      ['429', 'customer_limited', 'Rate limit — implement exponential backoff retry', 'bg-red-50'],
                      ['503', 'service_unavailable', 'Uber service disruption — retry with backoff; surface status to user', 'bg-red-50'],
                    ].map(([code, error, handling, bg]) => (
                      <tr key={code} className={`border-b border-gray-100 last:border-0 ${bg}`}>
                        <td className="px-4 py-2.5 font-mono text-xs font-bold text-gray-700">{code}</td>
                        <td className="px-4 py-2.5 font-mono text-xs text-red-600">{error}</td>
                        <td className="px-4 py-2.5 text-gray-600 text-xs">{handling}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Section>

            {/* ═══ QUICK REFERENCE ════════════════════════ */}
            <Section id="cheatsheet" icon={Terminal} title="Quick Reference Cheatsheet">
              {[
                {
                  group: 'Rides API',
                  base: 'api.uber.com/v1.2',
                  endpoints: [
                    ['GET', '/products', 'List available ride types'],
                    ['GET', '/estimates/price', 'Price estimate between two points'],
                    ['GET', '/estimates/time', 'Driver arrival time estimate'],
                    ['POST', '/requests', 'Request a ride (dispatch driver)'],
                    ['GET', '/requests/{id}', 'Get live ride status & driver info'],
                    ['DELETE', '/requests/{id}', 'Cancel an active ride request'],
                    ['GET', '/requests/{id}/receipt', 'Get completed trip receipt'],
                  ]
                },
                {
                  group: 'Uber Direct',
                  base: 'api.uber.com/v1/customers/{customer_id}',
                  endpoints: [
                    ['POST', '/delivery_quotes', 'Get delivery fee quote'],
                    ['POST', '/deliveries', 'Dispatch a courier'],
                    ['GET', '/deliveries/{id}', 'Get delivery status & courier location'],
                    ['POST', '/deliveries/{id}/cancel', 'Cancel delivery'],
                    ['WH', 'event.delivery_status', 'Delivery milestone notification'],
                    ['WH', 'event.courier_update', 'Courier GPS every 20 seconds'],
                  ]
                },
                {
                  group: 'Uber Eats',
                  base: 'api.uber.com/v1/eats',
                  endpoints: [
                    ['GET', '/eats/stores/{id}', 'Get store details'],
                    ['GET', '/eats/stores/{id}/menus', 'Get full store menu'],
                    ['PUT', '/eats/stores/{id}/menus', 'Upload or replace menu'],
                    ['POST', '/eats/stores/{id}/menus/items', 'Update item stock or pricing'],
                    ['GET', '/eats/orders/{id}', 'Get full order details'],
                    ['POST', '/eats/orders/{id}/accept_pos_order', 'Accept incoming order'],
                    ['POST', '/eats/orders/{id}/deny_pos_order', 'Deny order with reason'],
                    ['WH', 'orders.notification', 'New order placed'],
                    ['WH', 'orders.cancel', 'Order cancelled'],
                  ]
                },
              ].map(({ group, base, endpoints }) => (
                <div key={group} className="mb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold text-sm text-gray-900">{group}</h3>
                    <code className="text-[10px] text-gray-400 font-mono">{base}</code>
                  </div>
                  <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white">
                    <table className="w-full text-xs">
                      <tbody>
                        {endpoints.map(([method, path, purpose], i) => (
                          <tr key={i} className="border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors">
                            <td className="px-3 py-2 w-14"><MethodBadge method={method} /></td>
                            <td className="px-3 py-2 font-mono text-gray-700">{path}</td>
                            <td className="px-3 py-2 text-gray-500">{purpose}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
            </Section>

            {/* ── Footer ────────────────────────────────── */}
            <footer className="mt-16 pt-8 border-t border-gray-200">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <p className="text-xs text-gray-400">{theme.brand.copyright}</p>
                  <p className="text-xs text-gray-400 mt-1">API Reference — 2025 Edition | March 2026</p>
                </div>
                <div className="flex gap-3">
                  {[
                    { label: 'Rides', href: 'https://developer.uber.com/docs/riders' },
                    { label: 'Direct', href: 'https://developer.uber.com/docs/deliveries/overview' },
                    { label: 'Eats', href: 'https://developer.uber.com/docs/eats/introduction' },
                  ].map((link) => (
                    <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer"
                      className="text-xs text-gray-400 hover:text-dwel-teal transition-colors flex items-center gap-1">
                      {link.label} <ExternalLink size={10} />
                    </a>
                  ))}
                </div>
              </div>
            </footer>

          </div>{/* max-w-3xl */}
        </main>
      </div>{/* flex */}
    </div>
  )
}
