# Systems Portfolio

A performance-focused personal portfolio emphasizing engineering principles, intentional design, and systems thinking.

## Overview

This portfolio was built to showcase real projects with working deployments, not mock demos or tutorials. Every feature serves a purpose—from scroll-driven animations to easter eggs—and the codebase reflects production-grade patterns I'd use in a real engineering environment.

## Tech Stack

### Core
- **Next.js 16** – React framework with App Router and Server Components
- **TypeScript** – Type safety and better developer experience
- **Tailwind CSS v4** – Utility-first styling with performance optimizations
- **Framer Motion** – GPU-accelerated animations and scroll effects

### Key Dependencies
- **Lucide React** – Consistent icon system
- **Radix UI** – Accessible component primitives
- **React Hook Form + Zod** – Type-safe form validation

### Deployment
- **Vercel** – Zero-config deployments with edge runtime support
- **Vercel Analytics** – Performance monitoring in production

## Features

### Core Functionality
- **Scroll Timeline Indicator** – Real-time section tracking using Framer Motion's scroll hooks
- **Systems Mode** – Toggle engineering aesthetic with keyboard shortcuts (S key)
- **Project Inspector** – Expandable engineering depth panels for each project
- **System Log** – Terminal-style activity tracker using IntersectionObserver
- **Easter Egg** – Konami-style sequence detection (↑ ↑ ↓ ↓ A or Ctrl+Shift+E)

### Performance Optimizations
- **Intersection Observer API** – No scroll listeners, viewport detection only
- **GPU-accelerated animations** – CSS transforms for 60fps scrolling
- **Lazy-loaded sections** – Fade-in animations trigger on viewport entry
- **Passive event listeners** – Non-blocking scroll and touch handlers

### Design Philosophy
- **Editorial typography** – Large display type with intentional hierarchy
- **Minimal color palette** – Neutral grays with blue accents for focus
- **Spatial layout** – Grid-based skills map with CSS hover interactions
- **Terminal aesthetic** – Monospace fonts and system-style status indicators

## Project Structure

```
app/
├── page.tsx          # Main portfolio component
├── layout.tsx        # Root layout with metadata
└── globals.css       # Design tokens and base styles

components/
└── ui/               # Radix UI components (accordion, button, etc.)
```

## Key Design Decisions

### Why IntersectionObserver over scroll events?
Scroll events fire dozens of times per second and require manual throttling. IntersectionObserver is callback-based, fires only when elements cross viewport boundaries, and doesn't block the main thread.

### Why CSS-only hover effects for skills?
JavaScript state management for hover would trigger re-renders across the component tree. Using `group-hover` in Tailwind keeps all logic in CSS, ensuring 60fps interactions without React reconciliation overhead.

### Why Systems Mode?
Provides an intentional way to add visual depth without cluttering the default view. Users who appreciate engineering details can opt-in via keyboard shortcut, while others experience a clean, distraction-free portfolio.

### Why Framer Motion?
Offers declarative scroll animations with automatic GPU acceleration. The `useScroll` and `useTransform` hooks provide smooth, performant parallax effects without manual requestAnimationFrame management.

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Design Principles

### Systems Thinking
Every UI decision considers trade-offs. Animations are intentional, not decorative. Features solve real problems (e.g., scroll timeline for long-form content navigation).

### Performance First
No client-side scroll listeners. No canvas-based particle effects. No heavy JavaScript for effects achievable in CSS. Every animation runs on the compositor thread.

### Intentional Aesthetics
Dark theme reduces eye strain during extended reading. Monospace fonts signal technical content. Generous whitespace creates visual breathing room. Editorial typography establishes hierarchy without relying on color.

### Accessibility
Semantic HTML throughout. Keyboard navigation for all interactive elements. Focus states for keyboard users. No reliance on hover-only interactions. Screen reader-friendly markup.

## Deployment

Live at: [Your Vercel URL]

Connected to GitHub via Vercel's Git integration. Pushes to `main` trigger automatic deployments with preview URLs for pull requests.

## License

© 2025 Brandon H. All rights reserved.

---

Built with intention. No AI templates, no starter kits—just engineering principles applied to personal branding.
