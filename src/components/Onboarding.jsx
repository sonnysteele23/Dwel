import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { User, ClipboardList, Users, ShoppingCart, MessageSquare, CheckCircle, ArrowRight, ArrowLeft } from 'lucide-react'

const steps = [
  { id: 'profile', label: 'Your Profile', icon: User },
  { id: 'needs', label: 'Needs Assessment', icon: ClipboardList },
  { id: 'recipients', label: 'Invite Recipients', icon: Users },
  { id: 'services', label: 'Connect Services', icon: ShoppingCart },
  { id: 'messaging', label: 'Messaging', icon: MessageSquare },
  { id: 'summary', label: 'Summary', icon: CheckCircle },
]

const stepContent = {
  profile: {
    title: 'Your Profile',
    description: 'Tell us about yourself so we can personalize your caregiving experience.',
    fields: [
      { label: 'Full Name', placeholder: 'Enter your full name', type: 'text' },
      { label: 'Email', placeholder: 'Enter your email', type: 'email' },
      { label: 'Phone', placeholder: 'Enter your phone number', type: 'tel' },
      { label: 'Relationship to care recipient', placeholder: 'e.g., Son, Daughter, Spouse', type: 'text' },
    ]
  },
  needs: {
    title: 'Needs Assessment',
    description: 'Help us understand the care needs of your loved ones.',
    options: [
      'Medication management', 'Transportation to appointments', 'Grocery shopping',
      'Meal delivery', 'Health monitoring', 'Social engagement', 'Home safety',
    ]
  },
  recipients: {
    title: 'Invite Care Recipients',
    description: 'Add the people you provide care for.',
    fields: [
      { label: 'Recipient Name', placeholder: 'Enter their name', type: 'text' },
      { label: 'Relationship', placeholder: 'e.g., Father, Mother', type: 'text' },
      { label: 'Phone', placeholder: 'Enter their phone number', type: 'tel' },
    ]
  },
  services: {
    title: 'Connect Services',
    description: 'Connect to services your loved ones use regularly.',
    serviceList: ['Uber', 'DoorDash', 'Instacart', 'Amazon', 'CVS', 'Walgreens']
  },
  messaging: {
    title: 'Messaging Preferences',
    description: 'Set up how you\'d like to receive notifications and updates.',
    options: ['SMS notifications', 'Email updates', 'Push notifications', 'Voice call alerts']
  },
  summary: {
    title: 'Setup Summary',
    description: 'Review your setup and get started!',
  }
}

export default function Onboarding() {
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(null)
  const [selectedNeeds, setSelectedNeeds] = useState([])
  const [selectedServices, setSelectedServices] = useState([])
  const [selectedMessaging, setSelectedMessaging] = useState([])

  if (!currentStep) {
    return (
      <div className="p-6 max-w-3xl mx-auto">
        <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
          <button onClick={() => navigate('/demo')} className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors mb-6 mx-auto">
            <ArrowLeft size={16} /> Back to Dashboard
          </button>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Welcome to Caregiver Onboarding</h1>
          <p className="text-gray-500 mb-8">Let's set up your account to help you care for your loved ones.</p>

          <div className="grid grid-cols-3 gap-3 mb-8">
            {steps.map(step => {
              const Icon = step.icon
              return (
                <button
                  key={step.id}
                  onClick={() => setCurrentStep(step.id)}
                  className="flex items-center gap-2 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 text-sm font-medium text-gray-700 text-left"
                >
                  <Icon size={18} className="text-gray-400 shrink-0" />
                  {step.label}
                </button>
              )
            })}
          </div>

          <button
            onClick={() => setCurrentStep('profile')}
            className="w-full flex items-center justify-center gap-2 py-3 bg-dwel-teal text-white rounded-lg hover:bg-dwel-teal-dark transition-colors font-medium"
          >
            <ArrowRight size={18} />
            Get Started
          </button>
        </div>
      </div>
    )
  }

  const content = stepContent[currentStep]
  const currentIndex = steps.findIndex(s => s.id === currentStep)

  return (
    <div className="p-6 max-w-3xl mx-auto">
      {/* Progress */}
      <div className="flex gap-1 mb-6">
        {steps.map((step, i) => (
          <div
            key={step.id}
            className={`h-1.5 flex-1 rounded-full ${
              i <= currentIndex ? 'bg-dwel-teal' : 'bg-gray-200'
            }`}
          />
        ))}
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{content.title}</h2>
        <p className="text-gray-500 mb-6">{content.description}</p>

        {content.fields && (
          <div className="space-y-4">
            {content.fields.map(field => (
              <div key={field.label}>
                <label className="block text-sm font-medium text-gray-700 mb-1">{field.label}</label>
                <input
                  type={field.type}
                  placeholder={field.placeholder}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-dwel-teal focus:border-transparent"
                />
              </div>
            ))}
          </div>
        )}

        {content.options && (
          <div className="grid grid-cols-2 gap-3">
            {content.options.map(option => {
              const list = currentStep === 'needs' ? selectedNeeds : selectedMessaging
              const setList = currentStep === 'needs' ? setSelectedNeeds : setSelectedMessaging
              const isSelected = list.includes(option)
              return (
                <button
                  key={option}
                  onClick={() => setList(prev => isSelected ? prev.filter(i => i !== option) : [...prev, option])}
                  className={`p-3 border rounded-lg text-sm text-left transition-colors ${
                    isSelected ? 'border-dwel-teal bg-dwel-teal-light text-dwel-teal' : 'border-gray-200 hover:bg-gray-50 text-gray-700'
                  }`}
                >
                  {option}
                </button>
              )
            })}
          </div>
        )}

        {content.serviceList && (
          <div className="grid grid-cols-2 gap-3">
            {content.serviceList.map(service => {
              const isSelected = selectedServices.includes(service)
              return (
                <button
                  key={service}
                  onClick={() => setSelectedServices(prev => isSelected ? prev.filter(i => i !== service) : [...prev, service])}
                  className={`p-3 border rounded-lg text-sm text-left transition-colors ${
                    isSelected ? 'border-dwel-teal bg-dwel-teal-light text-dwel-teal' : 'border-gray-200 hover:bg-gray-50 text-gray-700'
                  }`}
                >
                  {service}
                </button>
              )
            })}
          </div>
        )}

        {currentStep === 'summary' && (
          <div className="space-y-3 text-sm text-gray-600">
            <p>✅ Profile information saved</p>
            <p>✅ {selectedNeeds.length} care needs identified</p>
            <p>✅ {selectedServices.length} services connected</p>
            <p>✅ {selectedMessaging.length} notification preferences set</p>
          </div>
        )}

        <div className="flex justify-between mt-8">
          <button
            onClick={() => {
              if (currentIndex === 0) setCurrentStep(null)
              else setCurrentStep(steps[currentIndex - 1].id)
            }}
            className="px-5 py-2.5 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 font-medium text-sm"
          >
            Back
          </button>
          <button
            onClick={() => {
              if (currentIndex < steps.length - 1) setCurrentStep(steps[currentIndex + 1].id)
              else setCurrentStep(null)
            }}
            className="px-5 py-2.5 bg-dwel-teal text-white rounded-lg hover:bg-dwel-teal-dark transition-colors font-medium text-sm"
          >
            {currentIndex === steps.length - 1 ? 'Finish Setup' : 'Continue'}
          </button>
        </div>
      </div>
    </div>
  )
}
