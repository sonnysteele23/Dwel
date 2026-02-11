import { useState } from 'react'
import { ChevronLeft, ChevronRight, ArrowLeft, CalendarDays } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate()
}

function getFirstDayOfMonth(year, month) {
  return new Date(year, month, 1).getDay()
}

export default function Calendar() {
  const navigate = useNavigate()
  const today = new Date()
  const [currentMonth, setCurrentMonth] = useState(today.getMonth())
  const [currentYear, setCurrentYear] = useState(today.getFullYear())
  const [selectedDate, setSelectedDate] = useState(null)

  const daysInMonth = getDaysInMonth(currentYear, currentMonth)
  const firstDay = getFirstDayOfMonth(currentYear, currentMonth)

  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11)
      setCurrentYear(currentYear - 1)
    } else {
      setCurrentMonth(currentMonth - 1)
    }
  }

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0)
      setCurrentYear(currentYear + 1)
    } else {
      setCurrentMonth(currentMonth + 1)
    }
  }

  const isToday = (day) => {
    return day === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear()
  }

  const days = []
  for (let i = 0; i < firstDay; i++) {
    days.push(null)
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i)
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <button onClick={() => navigate('/')} className="p-2 hover:bg-gray-100 rounded-lg">
          <ArrowLeft size={20} className="text-gray-500" />
        </button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Calendar</h1>
          <p className="text-gray-500 mt-1">Manage appointments and scheduled services</p>
        </div>
      </div>

      {/* Google Calendar Notice */}
      <div className="bg-white rounded-xl border border-gray-200 p-5 mb-6">
        <div className="flex items-center gap-3 mb-1">
          <span className="text-lg font-bold text-blue-500">G</span>
          <h3 className="font-semibold text-gray-900">Google Calendar</h3>
        </div>
        <p className="text-sm text-gray-500 ml-8">Calendar sync requires configuration</p>
        <p className="text-sm text-gray-400 mt-2">
          Google Calendar integration is not configured. Please contact support to enable this feature.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Calendar Grid */}
        <div className="lg:col-span-3 bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">
              {MONTHS[currentMonth]} {currentYear}
            </h2>
            <div className="flex gap-1">
              <button onClick={prevMonth} className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50">
                <ChevronLeft size={18} className="text-gray-500" />
              </button>
              <button onClick={nextMonth} className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50">
                <ChevronRight size={18} className="text-gray-500" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-px">
            {DAYS.map(day => (
              <div key={day} className="text-center text-sm font-medium text-gray-500 py-3">
                {day}
              </div>
            ))}
            {days.map((day, i) => (
              <div
                key={i}
                onClick={() => day && setSelectedDate(day)}
                className={`text-center py-4 min-h-[80px] cursor-pointer rounded-lg transition-colors ${
                  !day ? '' :
                  isToday(day) ? 'bg-dwel-teal-light text-dwel-teal font-semibold' :
                  selectedDate === day ? 'bg-blue-50 text-blue-600' :
                  'hover:bg-gray-50 text-gray-700'
                }`}
              >
                {day}
              </div>
            ))}
          </div>
        </div>

        {/* Date Details */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Select a Date</h3>
          {selectedDate ? (
            <div>
              <p className="text-gray-500 text-sm mb-4">
                {MONTHS[currentMonth]} {selectedDate}, {currentYear}
              </p>
              <div className="text-center py-8 text-gray-400 text-sm">
                No appointments for this date
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <CalendarDays size={48} className="text-gray-200 mx-auto mb-3" />
              <p className="text-gray-400 text-sm">Click on a date to view appointments</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
