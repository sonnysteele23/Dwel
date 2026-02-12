import { NavLink, useLocation } from 'react-router-dom'
import { Home, CalendarDays, Users, Grid3X3, Target, ChevronUp } from 'lucide-react'

const navItems = [
  { path: '/demo', label: 'Dashboard', icon: Home },
  { path: '/demo/calendar', label: 'Calendar', icon: CalendarDays },
  { path: '/demo/recipients', label: 'Care Recipients', icon: Users },
  { path: '/demo/services', label: 'Services', icon: Grid3X3 },
  { path: '/demo/onboarding', label: 'Onboarding', icon: Target },
]

export default function Sidebar({ collapsed, setCollapsed }) {
  const location = useLocation()

  return (
    <aside className={`${collapsed ? 'w-16' : 'w-60'} bg-sidebar-bg border-r border-gray-200 flex flex-col transition-all duration-300 shrink-0`}>
      {/* Logo */}
      <div className="px-4 py-5 flex items-center gap-3">
        <div className="w-8 h-8 bg-dwel-teal rounded-full flex items-center justify-center shrink-0">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
        </div>
        {!collapsed && (
          <div>
            <div className="font-semibold text-gray-900 text-sm">Dwel.Digital</div>
            <div className="text-xs text-gray-500">Voice-First Care</div>
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
                  ? 'bg-dwel-teal-light text-dwel-teal'
                  : 'text-gray-600 hover:bg-sidebar-hover'
              }`}
            >
              <Icon size={18} className={isActive ? 'text-dwel-teal' : 'text-gray-500'} />
              {!collapsed && <span>{item.label}</span>}
            </NavLink>
          )
        })}
      </nav>

      {/* User Profile */}
      <div className="p-3 border-t border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-xs font-semibold text-blue-700 shrink-0">
            DC
          </div>
          {!collapsed && (
            <>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-gray-900 truncate">Demo Caregiver</div>
                <div className="text-xs text-gray-500">Caregiver</div>
              </div>
              <ChevronUp size={16} className="text-gray-400" />
            </>
          )}
        </div>
      </div>
    </aside>
  )
}
