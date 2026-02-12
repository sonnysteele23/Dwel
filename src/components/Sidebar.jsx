import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { Home, CalendarDays, Users, Grid3X3, Target, LogOut } from 'lucide-react'
import theme from '../theme'

const navItems = [
  { path: '/demo', label: 'Dashboard', icon: Home },
  { path: '/demo/calendar', label: 'Calendar', icon: CalendarDays },
  { path: '/demo/recipients', label: 'Care Recipients', icon: Users },
  { path: '/demo/services', label: 'Services', icon: Grid3X3 },
  { path: '/demo/onboarding', label: 'Onboarding', icon: Target },
]

export default function Sidebar({ collapsed, setCollapsed }) {
  const location = useLocation()
  const navigate = useNavigate()

  return (
    <aside className={`${collapsed ? 'w-16' : 'w-60'} ${theme.colors.sidebarBg} border-r border-gray-200 flex flex-col transition-all duration-300 shrink-0`}>
      {/* Logo */}
      <div className="px-4 py-5 flex items-center gap-3">
        <div className={`w-8 h-8 ${theme.colors.primary} rounded-full flex items-center justify-center shrink-0`}>
          <svg width="16" height="16" viewBox={theme.brand.logo.viewBox} fill="white">
            <path d={theme.brand.logo.iconPath}/>
          </svg>
        </div>
        {!collapsed && (
          <div>
            <div className="font-semibold text-gray-900 text-sm">{theme.brand.name}</div>
            <div className="text-xs text-gray-500">{theme.brand.tagline}</div>
          </div>
        )}
      </div>

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

      {/* User Profile & Logout */}
      <div className="p-3 border-t border-gray-200 space-y-2">
        <div className="flex items-center gap-3">
          <div className={`w-8 h-8 ${theme.colors.avatarBg} rounded-full flex items-center justify-center text-xs font-semibold ${theme.colors.avatarText} shrink-0`}>
            {theme.demo.userInitials}
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-gray-900 truncate">{theme.demo.userName}</div>
              <div className="text-xs text-gray-500">{theme.demo.userRole}</div>
            </div>
          )}
        </div>
        <button
          onClick={() => navigate('/')}
          className={`flex items-center gap-3 w-full px-3 py-2 rounded-lg text-sm font-medium text-gray-500 hover:text-red-600 hover:bg-red-50 transition-colors ${collapsed ? 'justify-center' : ''}`}
          title="Log out"
        >
          <LogOut size={18} />
          {!collapsed && <span>Log Out</span>}
        </button>
      </div>
    </aside>
  )
}
