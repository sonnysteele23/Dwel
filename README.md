# DWEL Digital - Voice-First Caregiving Platform

A modern, responsive landing page for DWEL Digital — an AI-powered platform that helps employers support employee caregivers while enabling older adults to age safely at home.

## Tech Stack

- **React 19** — UI framework
- **Vite** — Build tool & dev server
- **Tailwind CSS 4** — Utility-first styling
- **Recharts** — Data visualization (area charts)
- **Lucide React** — Icon library

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
git clone https://github.com/your-username/Dwel.git
cd Dwel
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
Dwel/
├── public/
├── src/
│   ├── components/
│   │   └── DWELWebsite.jsx   # Main website component
│   ├── data/
│   │   ├── chartData.js      # Chart data for projections
│   │   └── navItems.js       # Navigation configuration
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css             # Global styles + Tailwind
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## Features

- Responsive design with mobile hamburger navigation
- Smooth scrolling with active section tracking
- Interactive area charts (Recharts)
- Gradient hero, impact, and CTA sections
- Animated hover cards
- SVG progress ring animation
- Scroll-to-top button

## Sections

1. **Hero** — Value proposition with feature cards
2. **The Challenge** — Statistics and projected growth chart
3. **Executive Summary** — Color-coded problem cards + solution callout
4. **AI Platform** — 6 feature cards
5. **Our Impact** — Visual metrics with progress ring
6. **How It Works** — 4-step onboarding
7. **Get In Touch** — Contact info
8. **Footer** — Links and social media

## License

© 2026 DWEL Digital. All rights reserved.
