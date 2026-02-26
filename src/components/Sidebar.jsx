import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { Home, CalendarDays, Users, Grid3X3, Target, ShoppingCart, Car, LogOut, ChevronDown, HeartPulse } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'
import theme from '../theme'

const navItems = [
  { path: '/demo',            label: 'Dashboard',       icon: Home },
  { path: '/demo/calendar',   label: 'Calendar',        icon: CalendarDays },
  { path: '/demo/recipients', label: 'Care Recipients', icon: Users },
  { path: '/demo/services',   label: 'Services',        icon: Grid3X3 },
  { path: '/demo/shopping',   label: 'Shopping',        icon: ShoppingCart },
  { path: '/demo/rides',      label: 'Rides',           icon: Car },
  { path: '/demo/recipient',  label: 'Recipient',       icon: HeartPulse },
  { path: '/demo/onboarding', label: 'Onboarding',      icon: Target },
]

function HamburgerIcon({ open }) {
  return (
    <div className="w-4 h-3.5 flex flex-col justify-between">
      <span className={`block h-0.5 bg-gray-500 rounded-full transition-all duration-300 origin-center ${open ? 'rotate-45 translate-y-[6px]' : ''}`} />
      <span className={`block h-0.5 bg-gray-500 rounded-full transition-all duration-300 ${open ? 'opacity-0 scale-x-0' : ''}`} />
      <span className={`block h-0.5 bg-gray-500 rounded-full transition-all duration-300 origin-center ${open ? '-rotate-45 -translate-y-[8px]' : ''}`} />
    </div>
  )
}

export default function Sidebar({ open, setOpen }) {
  const location = useLocation()
  const navigate = useNavigate()
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const menuRef = useRef(null)

  useEffect(() => {
    function handleClick(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setUserMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  return (
    <aside
      className={`${open ? 'w-60' : 'w-16'} ${theme.colors.sidebarBg} border-r border-gray-200 flex flex-col shrink-0
        transition-all duration-300 ease-in-out overflow-hidden`}
    >
      {/* Logo — top of sidebar, centered when collapsed */}
      <button
        onClick={() => navigate('/')}
        className={`pt-4 pb-3 flex items-center w-full hover:bg-gray-50 transition-colors ${open ? 'px-4 gap-3' : 'justify-center px-0'}`}
        title="Go to homepage"
      >
        <div className={`w-8 h-8 ${theme.colors.primary} rounded-full flex items-center justify-center shrink-0`}>
          <svg width="16" height="16" viewBox={theme.brand.logo.viewBox} fill="white">
            <path d={theme.brand.logo.iconPath} />
          </svg>
        </div>
        <div
          className={`text-left overflow-hidden transition-all duration-300 ${open ? 'opacity-100 w-auto' : 'opacity-0 w-0'}`}
        >
          <div className="font-semibold text-gray-900 text-sm whitespace-nowrap">{theme.brand.name}</div>
          <div className="text-xs text-gray-500 whitespace-nowrap">{theme.brand.tagline}</div>
        </div>
      </button>

      {/* Hamburger — below logo */}
      <div className={`pb-2 flex ${open ? 'px-4 justify-start' : 'justify-center px-0'}`}>
        <button
          onClick={() => setOpen(!open)}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          aria-label="Toggle navigation"
        >
          <HamburgerIcon open={open} />
        </button>
      </div>

      <div className="mx-3 border-t border-gray-100 mb-2" />

      {/* Nav items */}
      <nav className="flex-1 px-2 space-y-1">
        {navItems.map(item => {
          const Icon = item.icon
          const isActive = location.pathname === item.path
          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/demo'}
              title={!open ? item.label : undefined}
              className={`flex items-center rounded-lg text-sm font-medium transition-colors ${
                open ? 'gap-3 px-3 py-2.5' : 'justify-center py-2.5'
              } ${
                isActive
                  ? `${theme.colors.primaryLight} ${theme.colors.primaryText}`
                  : `text-gray-600 ${theme.colors.sidebarHover}`
              }`}
            >
              <Icon size={18} className={`shrink-0 ${isActive ? theme.colors.primaryText : 'text-gray-500'}`} />
              <span
                className={`overflow-hidden whitespace-nowrap transition-all duration-300 ${open ? 'opacity-100 w-auto' : 'opacity-0 w-0'}`}
              >
                {item.label}
              </span>
            </NavLink>
          )
        })}
      </nav>

      {/* User profile */}
      <div className="relative p-3 border-t border-gray-200" ref={menuRef}>
        {/* Logout popover */}
        <div
          className={`absolute bottom-full left-2 right-2 mb-1 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden
            transition-all duration-200 ease-out origin-bottom
            ${userMenuOpen ? 'opacity-100 scale-y-100 translate-y-0' : 'opacity-0 scale-y-95 translate-y-1 pointer-events-none'}
          `}
        >
          <button
            onClick={() => { setUserMenuOpen(false); navigate('/') }}
            className="flex items-center gap-3 w-full px-4 py-3 text-sm text-gray-600 hover:text-red-600 hover:bg-red-50 transition-colors"
          >
            <LogOut size={16} />
            Log Out
          </button>
        </div>

        <button
          onClick={() => setUserMenuOpen(!userMenuOpen)}
          className={`flex items-center gap-3 w-full rounded-lg p-2 transition-colors ${theme.colors.sidebarHover} ${!open ? 'justify-center' : ''}`}
          title={!open ? theme.demo.userName : undefined}
        >
          <div className={`w-8 h-8 ${theme.colors.avatarBg} rounded-full flex items-center justify-center text-xs font-semibold ${theme.colors.avatarText} shrink-0`}>
            {theme.demo.userInitials}
          </div>
          <div className={`flex-1 min-w-0 flex items-center gap-2 overflow-hidden transition-all duration-300 ${open ? 'opacity-100' : 'opacity-0 w-0'}`}>
            <div className="flex-1 min-w-0 text-left">
              <div className="text-sm font-medium text-gray-900 truncate whitespace-nowrap">{theme.demo.userName}</div>
              <div className="text-xs text-gray-500 whitespace-nowrap">{theme.demo.userRole}</div>
            </div>
            <ChevronDown
              size={16}
              className={`shrink-0 ${theme.colors.primaryText} transition-transform duration-200 ${userMenuOpen ? 'rotate-180' : ''}`}
            />
          </div>
        </button>
      </div>
    </aside>
  )
}
