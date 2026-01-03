# Portfolio — Brandon H

Personal portfolio showcasing systems-focused projects and engineering approach. Built to demonstrate clean architecture, performance-conscious UI design, and full-stack capabilities.

## What This Is

A Next.js portfolio application highlighting three complete projects (web app, 2D game, C++ GUI game) with emphasis on technical depth, realistic constraints, and maintainable code. Designed to be recruiter-skimmable while providing engineering detail for technical reviewers.

## Tech Stack

**Framework**: Next.js 16 (App Router, React 19, TypeScript)  
**Styling**: Tailwind CSS v4 with custom design tokens  
**Animations**: Framer Motion for scroll-driven UI  
**UI Components**: Radix UI primitives + shadcn/ui patterns  
**Deployment**: Vercel (automatic deployments from main branch)

## System Architecture

### Frontend
- Server Components for static content sections
- Client Components for interactive features (scroll timeline, systems mode toggle)
- IntersectionObserver API for viewport-triggered animations (no scroll listeners)
- CSS-based hover effects using Tailwind's group-hover pattern

### State Management
- Local React state for UI toggles (systems mode, project inspectors, sidebar panels)
- localStorage for persistent preferences (dismissed tooltips, systems mode state)
- Framer Motion's useScroll/useTransform for scroll-linked animations

### Performance
- Passive event listeners for scroll/touch handlers
- GPU-accelerated CSS transforms (translateY, scale, opacity)
- Lazy fade-in animations triggered by IntersectionObserver
- No canvas rendering or heavy JavaScript effects

## Key Features

**Scroll Timeline Indicator** — Vertical timeline showing current section position, built with Framer Motion's scroll progress hooks

**Systems Mode** — Toggle engineering aesthetic (keyboard shortcut: S key) that applies visual changes via CSS class

**Project Inspector** — Expandable panels showing Problem/Approach/Result for each project without layout shift

**System Log** — Terminal-style activity tracker using IntersectionObserver to log section visibility

**Easter Egg** — Konami-style sequence detector (↑ ↑ ↓ ↓ A or Ctrl+Shift+E) with toast notification

## Local Setup

```bash
# Install dependencies
npm install

# Run development server (localhost:3000)
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

**Note**: This portfolio is deployed publicly. No API keys or environment variables required for local development.

## Technical Decisions

### Why IntersectionObserver instead of scroll events?
Scroll events fire 30-60 times per second and require manual throttling. IntersectionObserver is callback-based, fires only at viewport boundaries, and doesn't block the main thread. Better for performance and battery life.

### Why CSS-only hover effects for the skills map?
JavaScript state for hover interactions triggers React re-renders. Using Tailwind's `group-hover` keeps all logic in CSS, ensuring 60fps interactions without reconciliation overhead.

### Why Framer Motion over custom scroll listeners?
Provides declarative scroll animations with automatic GPU acceleration. The useScroll and useTransform hooks handle scroll progress calculations and transform interpolation without manual requestAnimationFrame management.

### Why no production metrics or user counts?
This is a student portfolio, not a SaaS product. The focus is on engineering decisions, architecture, and code quality—skills that translate to professional environments without fabricating scale.

## What This Demonstrates

**System-level thinking** — Every UI decision considers trade-offs (animation cost, bundle size, accessibility)

**Performance-first approach** — No client-side scroll listeners, no canvas effects, all animations run on compositor thread

**Clean architecture** — Separation of concerns (components, state, styles), reusable patterns, maintainable structure

**Honest positioning** — Clear about student status, realistic constraints, and local-first projects where applicable

## Limitations & Future Improvements

**Current constraints:**
- Projects showcased are academic/personal (not production systems with real users)
- Some project demos require local setup (API keys, environment config)
- Systems Mode requires JavaScript enabled (degrades gracefully)

**Potential enhancements:**
- Add blog section with technical writing samples
- Integrate real-time activity monitoring (GitHub commits, learning progress)
- Build custom CMS for dynamic project updates
- Add automated accessibility testing in CI/CD pipeline

## Projects Featured

**Mapetite** — Restaurant discovery web app (React/TypeScript)  
**Hide Yo Stuff** — 2D stealth looting game (Java/LibGDX)  
**Ritual Chamber** — C++ Windows Forms survival game

See live portfolio for full project details, technical breakdowns, and code repositories.

## License

© 2025 Brandon H. All rights reserved.

---

**Fourth-Year Computer Science student** with interests in cybersecurity, systems programming, and full-stack development. Open to Summer 2025 internships in software engineering, security, or systems roles.
