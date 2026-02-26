# Dwel.Digital — Project Context & Vision

> Last updated: 2026-02-26 | Keep this file current as the product evolves.

---

## 🎯 Vision (CEO Quote)

> "DWEL is a voice-first agentic AI platform that enables employee-caregivers to orchestrate the routine tasks that impact their work-life balance and, as a result, impacts their productivity."

### How DWEL Works (6-Step Loop)
1. **Understand** — Voice + Context: Who is speaking? What are they asking? How do they sound? Are they lonely or ill? What's allowed (consent/permissions)?
2. **Plan** — Next-best actions: Breaks requests into steps, chooses the right workflow.
3. **Act** — Tools & integrations: Sends messages/calls, updates calendar/tasks, triggers workflows across connected systems. Doesn't just respond — completes workflows.
4. **Verify** — Close the loop: Confirms outcomes (task done, meds confirmed, ride arrived) and updates the shared plan.
5. **Escalate & Learn** — Circle of Care: If something isn't confirmed or risk increases, or doesn't sound right — escalates calmly (caregiver → family → professional → emergency, as configured). Learns preferences.
6. **Trust** — Builds trust with consent, role-based access controls, auditable actions, human in the loop.

---

## 🏢 Business Model

- **Go-to-Market**: B2B — selling to employers (avg customer = 1,000s of employees)
- **Key Stat**: 73% of employees have caregiving responsibilities
- **Revenue Projections**: $5M (2027) → $200M (2029)
- **Integration Decision**: Uber API (architected + designed) vs. GoGo (alternative that brings 10K+ customers)

---

## 👤 Demo Care Recipient

**Robert Chen** — Father, Age 78
- Address: 123 Oak Street, Apt 4B, Boston, MA 02101
- Phone: (555) 234-5678
- Conditions: Hypertension, Type 2 Diabetes, Mild Arthritis
- Dietary: Low Sodium, Diabetic-Friendly, No Shellfish
- Emergency Contact: Michael Chen (Son) — (555) 345-6789
- Primary Doctor: Dr. Sarah Kim
- Uber: Linked ✅

---

## 🗂️ App Structure

```
src/
  App.jsx                  # Router — /demo/* layout
  theme.js                 # Colors, brand tokens
  index.css                # Tailwind + custom CSS
  components/
    Sidebar.jsx            # Collapsible nav (icons + labels)
    Dashboard.jsx          # Main care dashboard (Robert Chen)
    Calendar.jsx           # Schedule & appointments
    CareRecipients.jsx     # Manage recipients list
    Services.jsx           # Connected services (Uber, etc.)
    Shopping.jsx           # Delivery & auto-orders
    Rides.jsx              # Ride history & booking
    Onboarding.jsx         # 6-step onboarding flow
    VoiceAssistant.jsx     # Voice modal
    LandingPage.jsx        # Marketing landing page
    AuthPage.jsx           # Login/signup
  data/
    chartData.js           # Chart data
    navItems.js            # Landing page nav
```

### Routes
| Path | Component |
|------|-----------|
| `/` | LandingPage |
| `/auth` | AuthPage |
| `/demo` | Dashboard |
| `/demo/calendar` | Calendar |
| `/demo/recipients` | CareRecipients |
| `/demo/services` | Services |
| `/demo/shopping` | Shopping |
| `/demo/rides` | Rides |
| `/demo/onboarding` | Onboarding |
| `/demo/recipient` | **RecipientHealth** (NEW) |

---

## 🎨 Design System

### Colors (Tailwind + Custom)
- Primary: `bg-dwel-teal` / `text-dwel-teal`
- Primary Light: `bg-dwel-teal-light`
- Sidebar: `bg-white` border-r `border-gray-200`
- Cards: `bg-white rounded-xl border border-gray-200`
- Danger: `bg-red-50 border-red-200`
- Warning: `bg-amber-50 border-amber-200`

### Icon Style
- Library: `lucide-react`
- Size: 14–20px for UI icons, 18px for nav
- Style: Line icons, `text-gray-400` default, `text-dwel-teal` active

### Typography
- Headings: `font-bold text-gray-900`
- Body: `text-gray-600 text-sm`
- Labels: `text-xs text-gray-500`
- Emphasis: `font-medium`

---

## 🔑 Key Features Built

### Care Dashboard (`/demo`)
- Recipient profile banner (conditions, dietary, Uber status)
- Quick stats: Meds today, Rides, Deliveries, Total Spend, Voucher
- Active delivery tracker
- Today's timeline (schedule)
- Health vitals (BP, Blood Sugar, Weight, Med Adherence)
- Medications list (taken/pending)
- Upcoming appointments + ride booking
- Inventory/supply alerts
- Spending breakdown + Employer Voucher
- Auto-orders (recurring)
- Activity feed

### Onboarding (`/demo/onboarding`)
- 6 steps: Your Profile → Needs Assessment → Invite Recipients → Connect Services → Messaging → Summary
- Connect Services: Uber + Uber Eats only
- Summary uses teal line-style icons (User, ClipboardList, Link2, Bell)

---

## 🆕 Planned: Recipient Health Dashboard (`/demo/recipient`)

See `RecipientHealth.jsx` — focused on keeping the recipient living independently at home.

### Key Sections:
1. **Voice Sentiment Trend** — AI analysis of emotional tone over 30 days (happy, neutral, anxious, lonely, confused)
2. **Wellbeing Score** — Composite 0-100 score: physical + social + emotional + independence
3. **Vitals Trend Charts** — Blood pressure, blood sugar, weight over time
4. **Social Engagement** — Conversations per day, longest gaps, isolation risk
5. **Independence Indicators** — Tasks completed via voice, rides taken, meals ordered autonomously
6. **Medication Adherence** — Weekly trend
7. **Fall & Safety Risk** — AI-assessed flags
8. **Circle of Care Alerts** — Escalation log with severity

---

## 📋 User Stories (v2 — Built 2026-02-26)

### Voice & AI
- As a recipient, I can speak naturally to request rides, food, and medication reminders
- As a caregiver, I receive alerts when the AI detects anxiety, confusion, or loneliness in voice tone
- As a caregiver, I see a sentiment trend dashboard showing emotional health over time

### Health Monitoring
- As a caregiver, I see real-time vitals (BP, blood sugar, weight, med adherence)
- As a caregiver, I receive alerts when vitals fall outside normal ranges
- As a caregiver, I see medication taken/pending with timestamps

### Transportation (Uber)
- As a recipient, I say "I need a ride to the doctor" and Uber is booked automatically
- As a caregiver, I see all upcoming rides and can pre-book for appointments
- Uber Eats integration for meal delivery

### Shopping & Deliveries
- As a recipient, I say "order my groceries" and recurring list is sent to Instacart/Stop&Shop
- Auto-reorder based on inventory levels
- Caregiver sees active delivery tracker in real-time

### Employer Voucher System
- B2B employers fund voucher balances for employees
- Voucher covers rides, meals, groceries, pharmacy
- Dashboard shows balance + spend by category

### Onboarding
- 6-step flow to set up caregiver profile, needs, recipients, services (Uber/Uber Eats), messaging, summary

---

## 🔗 Key Integrations (Designed/Architected)

| Service | Status | Purpose |
|---------|--------|---------|
| Uber API | Architected ✅ | Guest rides for recipients |
| Uber Eats | Integrated | Meal delivery |
| GoGo | Evaluating | Alternative transport (+10K customers) |
| Stop & Shop | Demo | Grocery delivery |
| CVS Pharmacy | Demo | Medication delivery |

---

## 🚀 Quick Iteration Guide

### To add a new page:
1. Create `src/components/NewPage.jsx`
2. Add route in `App.jsx`: `<Route path="/new" element={<NewPage />} />`
3. Add nav item in `Sidebar.jsx` navItems array

### To update demo data:
- All data is hardcoded in each component (no API calls in demo)
- Follow existing patterns: const objects at top of file

### To update colors/brand:
- Edit `src/theme.js`

### Design patterns to follow:
- Cards: `bg-white rounded-xl border border-gray-200 p-5`
- Section headers: `font-semibold text-gray-900 flex items-center gap-2`
- Stat numbers: `text-xl font-bold text-gray-900`
- Status badges: inline-flex, rounded-full, text-[10px] or text-xs
