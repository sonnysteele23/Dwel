import { useState, useRef, useEffect } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { Home, CalendarDays, Users, Grid3X3, Target, ShoppingCart, LogOut, ChevronDown } from 'lucide-react'
import theme from '../theme'

const navItems = [
  { path: '/demo', label: 'Dashboard', icon: Home },
  { path: '/demo/calendar', label: 'Calendar', icon: CalendarDays },
  { path: '/demo/recipients', label: 'Care Recipients', icon: Users },
  { path: '/demo/services', label: 'Services', icon: Grid3X3 },
  { path: '/demo/shopping', label: 'Shopping', icon: ShoppingCart },
  { path: '/demo/onboarding', label: 'Onboarding', icon: Target },
]

export default function Sidebar({ collapsed, setCollapsed }) {
  const location = useLocation()
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef(null)

  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <aside className={`${collapsed ? 'w-16' : 'w-60'} ${theme.colors.sidebarBg} border-r border-gray-200 flex flex-col transition-all duration-300 shrink-0`}>
      {/* Logo — clickable to Dashboard */}
      <button
        onClick={() => navigate('/demo')}
        className="px-4 py-5 flex items-center gap-3 w-full hover:bg-gray-50 transition-colors rounded-lg"
      >
        <div className={`w-8 h-8 ${theme.colors.primary} rounded-full flex items-center justify-center shrink-0`}>
          <svg width="16" height="16" viewBox={theme.brand.logo.viewBox} fill="white">
            <path d={theme.brand.logo.iconPath}/>
          </svg>
        </div>
        {!collapsed && (
          <div className="text-left">
            <div className="font-semibold text-gray-900 text-sm">{theme.brand.name}</div>
            <div className="text-xs text-gray-500">{theme.brand.tagline}</div>
          </div>
        )}
      </button>

      {/* Navigation */}
      {!collapsed && (
        <div className="px-4 py-2 text-xs font-medium text-gray-400 uppercase tracking-wider">
          Navigation
        </div>
      )}
      <nav className="flex-1 px-2 space-y-1">
        {navItems.map(item => {
          const Icon = item.icon
          const isActive = location.pathname === item.path
          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/demo'}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? `${theme.colors.primaryLight} ${theme.colors.primaryText}`
                  : `text-gray-600 ${theme.colors.sidebarHover}`
              }`}
            >
              <Icon size={18} className={isActive ? theme.colors.primaryText : 'text-gray-500'} />
              {!collapsed && <span>{item.label}</span>}
            </NavLink>
          )
        })}
      </nav>

      {/* User Profile & Popover Logout */}
      <div className="relative p-3 border-t border-gray-200" ref={menuRef}>
        <div
          className={`absolute bottom-full left-2 right-2 mb-1 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden transition-all duration-200 ease-out origin-bottom ${
            menuOpen ? 'opacity-100 scale-y-100 translate-y-0' : 'opacity-0 scale-y-95 translate-y-1 pointer-events-none'
          }`}
        >
          <button
            onClick={() => { setMenuOpen(false); navigate('/'); }}
            className="flex items-center gap-3 w-full px-4 py-3 text-sm text-gray-600 hover:text-red-600 hover:bg-red-50 transition-colors"
          >
            <LogOut size={16} />
            Log Out
          </button>
        </div>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className={`flex items-center gap-3 w-full rounded-lg p-2 transition-colors ${theme.colors.sidebarHover} ${collapsed ? 'justify-center' : ''}`}
        >
          <div className={`w-8 h-8 ${theme.colors.avatarBg} rounded-full flex items-center justify-center text-xs font-semibold ${theme.colors.avatarText} shrink-0`}>
            {theme.demo.userInitials}
          </div>
          {!collapsed && (
            <>
              <div className="flex-1 min-w-0 text-left">
                <div className="text-sm font-medium text-gray-900 truncate">{theme.demo.userName}</div>
                <div className="text-xs text-gray-500">{theme.demo.userRole}</div>
              </div>
              <ChevronDown
                size={16}
                className={`${theme.colors.primaryText} transition-transform duration-200 ${menuOpen ? 'rotate-180' : ''}`}
              />
            </>
          )}
        </button>
      </div>
    </aside>
  )
}
