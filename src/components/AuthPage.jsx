import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Mail, Lock, User, Phone } from 'lucide-react'
import theme from '../theme'

export default function AuthPage() {
  const navigate = useNavigate()
  const [mode, setMode] = useState('login')
  const t = theme.auth

  return (
    <div className={`min-h-screen ${theme.colors.pageBg} flex flex-col`}>
      {/* Navbar */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <button onClick={() => navigate('/')} className="flex items-center gap-2">
            <div className={`w-8 h-8 ${theme.colors.primary} rounded-full flex items-center justify-center`}>
              <svg width="16" height="16" viewBox={theme.brand.logo.viewBox} fill="white">
                <path d={theme.brand.logo.iconPath}/>
              </svg>
            </div>
            <span className="font-bold text-lg text-gray-900">{theme.brand.name}</span>
          </button>
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 transition-colors"
          >
            <ArrowLeft size={16} />
            Back to home
          </button>
        </div>
      </nav>

      {/* Auth Form */}
      <div className="flex-1 flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                {mode === 'login' ? t.loginTitle : t.registerTitle}
              </h1>
              <p className="text-gray-500 text-sm">
                {mode === 'login' ? t.loginSubtitle : t.registerSubtitle}
              </p>
            </div>

            <div className="space-y-4">
              {mode === 'register' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <div className="relative">
                      <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Enter your full name"
                        className={`w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 ${theme.colors.primaryFocus} focus:border-transparent text-sm`}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <div className="relative">
                      <Phone size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type="tel"
                        placeholder="Enter your phone number"
                        className={`w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 ${theme.colors.primaryFocus} focus:border-transparent text-sm`}
                      />
                    </div>
                  </div>
                </>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <div className="relative">
                  <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className={`w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 ${theme.colors.primaryFocus} focus:border-transparent text-sm`}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <div className="relative">
                  <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="password"
                    placeholder={mode === 'login' ? 'Enter your password' : 'Create a password'}
                    className={`w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 ${theme.colors.primaryFocus} focus:border-transparent text-sm`}
                  />
                </div>
              </div>

              {mode === 'login' && (
                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center gap-2 text-gray-600">
                    <input type="checkbox" className="rounded border-gray-300" />
                    Remember me
                  </label>
                  <button className={`${theme.colors.primaryText} hover:underline`}>Forgot password?</button>
                </div>
              )}

              <button
                onClick={() => navigate('/demo')}
                className={`w-full py-3 ${theme.colors.primary} text-white rounded-lg ${theme.colors.primaryHover} transition-colors font-medium text-sm`}
              >
                {mode === 'login' ? t.loginButton : t.registerButton}
              </button>
            </div>

            <div className="mt-6 text-center text-sm text-gray-500">
              {mode === 'login' ? (
                <p>
                  Don't have an account?{' '}
                  <button onClick={() => setMode('register')} className={`${theme.colors.primaryText} font-medium hover:underline`}>
                    Sign up
                  </button>
                </p>
              ) : (
                <p>
                  Already have an account?{' '}
                  <button onClick={() => setMode('login')} className={`${theme.colors.primaryText} font-medium hover:underline`}>
                    Sign in
                  </button>
                </p>
              )}
            </div>
          </div>

          <p className="text-center text-xs text-gray-400 mt-6">{t.tosText}</p>
        </div>
      </div>
    </div>
  )
}
