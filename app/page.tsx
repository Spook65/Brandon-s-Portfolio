"use client"

import type React from "react"

import { Github, Linkedin, Mail, ExternalLink, Code2 } from "lucide-react"
import { useEffect, useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

export default function Portfolio() {
  // Uses Framer Motion's useScroll which is optimized and doesn't cause reflows
  const { scrollYProgress } = useScroll()
  const sections = [
    { id: "hero", label: "Home", range: [0, 0.2] },
    { id: "about", label: "About", range: [0.2, 0.4] },
    { id: "stack", label: "Stack", range: [0.4, 0.6] },
    { id: "work", label: "Work", range: [0.6, 0.8] },
    { id: "contact", label: "Contact", range: [0.8, 1.0] },
  ]

  return (
    <main className="bg-neutral-950 text-white min-h-screen">
      <ScrollTimeline scrollProgress={scrollYProgress} sections={sections} />

      <div className="fixed inset-0 pointer-events-none">
        {/* Base gradient for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-950 via-neutral-950 to-neutral-900" />
        {/* Subtle radial accent for visual interest */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-950/10 via-transparent to-transparent" />
        {/* CSS-only noise texture for film grain effect */}
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat",
          }}
        />
      </div>

      <div className="fixed left-[10%] top-0 bottom-0 w-px bg-white/[0.02] pointer-events-none" />
      <div className="fixed left-[30%] top-0 bottom-0 w-px bg-white/[0.02] pointer-events-none" />
      <div className="fixed right-[30%] top-0 bottom-0 w-px bg-white/[0.02] pointer-events-none" />
      <div className="fixed right-[10%] top-0 bottom-0 w-px bg-white/[0.02] pointer-events-none" />

      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm border-b border-white/5">
        <div className="max-w-5xl mx-auto px-6 py-5 flex justify-between items-center">
          <div className="font-mono text-xs tracking-wider text-neutral-500">BRANDON H.</div>
          <div className="flex gap-8 text-sm">
            {["About", "Stack", "Work", "Contact"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-neutral-400 hover:text-white transition-colors duration-300 relative group"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-white group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </div>
        </div>
      </nav>

      <section className="relative min-h-screen flex items-center justify-center px-6" id="hero">
        <FadeInSection>
          <div className="max-w-5xl w-full pt-20">
            <h1 className="text-[clamp(3rem,8vw,7rem)] font-bold leading-[0.95] tracking-tight mb-8">
              Building systems
              <br />
              that <span className="text-neutral-500 italic font-light">ship</span>
            </h1>
            {/* Design rationale: Secondary text uses generous line-height (1.7) for comfortable reading.
                Max-width constraint creates optimal line length for readability (60-70 chars). */}
            <p className="text-xl md:text-2xl text-neutral-400 max-w-3xl leading-[1.7] mb-12">
              CS student focused on full-stack engineering, real-time systems, and developer tooling. Currently seeking
              Summer 2025 internships.
            </p>
            <div className="flex gap-4">
              <a
                href="#contact"
                className="px-8 py-4 bg-white text-black font-medium rounded-sm hover:bg-neutral-200 transition-colors duration-300"
              >
                Get in touch
              </a>
              <a
                href="#work"
                className="px-8 py-4 border border-white/10 text-white font-medium rounded-sm hover:border-white/30 transition-colors duration-300"
              >
                View work
              </a>
            </div>
          </div>
        </FadeInSection>
      </section>

      <section id="about" className="relative py-32 px-6">
        <div className="max-w-5xl mx-auto">
          <FadeInSection>
            <div className="font-mono text-xs tracking-wider text-neutral-600 mb-6 -ml-16 hidden md:block">
              01 / ABOUT
            </div>
            <div className="font-mono text-xs tracking-wider text-neutral-600 mb-6 md:hidden">01 / ABOUT</div>
            <div className="grid md:grid-cols-12 gap-16">
              <div className="md:col-span-5">
                <h2 className="text-5xl md:text-6xl font-bold leading-tight mb-8">
                  Who I am &<br />
                  what I do
                </h2>
              </div>
              <div className="md:col-span-7 space-y-6 text-lg text-neutral-400 leading-relaxed">
                <p>
                  I'm a computer science student building full-stack applications with a focus on clean architecture and
                  developer experience. My work centers on scalable systems that solve real problems.
                </p>
                <p>
                  Currently seeking Summer 2025 internships in full-stack engineering, cloud infrastructure, or
                  developer tooling. I'm drawn to teams that prioritize craft and impact.
                </p>
              </div>
            </div>
          </FadeInSection>
        </div>
      </section>

      <section id="stack" className="relative py-32 px-6 border-t border-white/5">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="max-w-5xl mx-auto">
          <FadeInSection>
            <div className="font-mono text-xs tracking-wider text-neutral-600 mb-6 -mr-16 text-right hidden md:block">
              02 / STACK
            </div>
            <div className="font-mono text-xs tracking-wider text-neutral-600 mb-6 md:hidden">02 / STACK</div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { name: "React", icon: "⚛️" },
                { name: "TypeScript", icon: "📘" },
                { name: "Next.js", icon: "▲" },
                { name: "Node.js", icon: "🟢" },
                { name: "Tailwind", icon: "🎨" },
                { name: "PostgreSQL", icon: "🐘" },
                { name: "Git", icon: "🔱" },
                { name: "Framer", icon: "🎬" },
              ].map((tech) => (
                <div
                  key={tech.name}
                  className="p-6 border border-white/5 rounded-sm hover:border-white/20 transition-all duration-300 group"
                >
                  <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {tech.icon}
                  </div>
                  <div className="font-medium text-sm text-neutral-400 group-hover:text-white transition-colors duration-300">
                    {tech.name}
                  </div>
                </div>
              ))}
            </div>
          </FadeInSection>
        </div>
      </section>

      <section id="work" className="relative py-32 px-6 border-t border-white/5">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-white/10 via-transparent to-transparent" />
        <div className="max-w-5xl mx-auto">
          <FadeInSection>
            <div className="font-mono text-xs tracking-wider text-neutral-600 mb-6 -ml-16 hidden md:block">
              03 / SELECTED WORK
            </div>
            <div className="font-mono text-xs tracking-wider text-neutral-600 mb-6 md:hidden">03 / SELECTED WORK</div>
            <div className="space-y-24">
              <ProjectCard
                number="01"
                title="E-commerce Dashboard"
                description="Admin panel for inventory management, analytics, and order processing. Built with React Server Components and streaming patterns for optimal performance."
                tech={["Next.js 15", "TypeScript", "Prisma", "Recharts"]}
                features={[
                  "Interactive data visualizations with real-time updates",
                  "CSV import with validation and error handling",
                  "Role-based access control for team collaboration",
                  "Optimistic UI updates for instant feedback",
                ]}
                codeUrl="https://github.com/yourusername/ecommerce-dashboard"
                demoUrl="https://ecommerce-dashboard.vercel.app"
              />

              <ProjectCard
                number="02"
                title="Real-time Chat System"
                description="WebSocket-based chat application with typing indicators, read receipts, and message persistence. Handles 100+ concurrent connections with minimal latency."
                tech={["React", "Socket.io", "MongoDB", "Express"]}
                features={[
                  "Real-time bidirectional communication",
                  "Markdown support for rich text formatting",
                  "Drag-and-drop file uploads with preview",
                  "End-to-end encryption for secure messaging",
                ]}
                codeUrl="https://github.com/yourusername/chat-system"
                demoUrl="https://chat-system.vercel.app"
              />

              <ProjectCard
                number="03"
                title="Distributed Task Engine"
                description="Task management system supporting 500+ concurrent users. Features offline-first architecture with intelligent conflict resolution for collaborative editing."
                tech={["Next.js", "PostgreSQL", "Redis", "WebSocket"]}
                features={[
                  "Offline-first with local state sync",
                  "Zero-latency updates across clients",
                  "Intelligent conflict resolution",
                  "Real-time collaborative workspaces",
                ]}
                codeUrl="https://github.com/yourusername/task-engine"
                demoUrl="https://task-engine.vercel.app"
              />
            </div>
          </FadeInSection>
        </div>
      </section>

      <section id="contact" className="relative py-32 px-6 border-t border-white/5">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="max-w-5xl mx-auto">
          <FadeInSection>
            <div className="font-mono text-xs tracking-wider text-neutral-600 mb-6 -mr-16 text-right hidden md:block">
              04 / CONTACT
            </div>
            <div className="font-mono text-xs tracking-wider text-neutral-600 mb-6 md:hidden">04 / CONTACT</div>
            <h2 className="text-5xl md:text-6xl font-bold mb-12">
              Let's build
              <br />
              something great
            </h2>

            <p className="text-xl text-neutral-400 mb-16 max-w-2xl leading-relaxed">
              Open to Summer 2025 internships in full-stack engineering, cloud infrastructure, or developer tooling.
            </p>

            {/* Design rationale: Primary action uses high contrast (white bg) while secondary actions
                use subtle borders. Consistent 16px gap creates visual rhythm. */}
            <div className="flex flex-wrap gap-4">
              <a
                href="mailto:your.email@example.com"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black font-medium rounded-sm hover:bg-neutral-200 transition-colors duration-300"
              >
                <Mail className="h-5 w-5" />
                Email me
              </a>
              <a
                href="https://linkedin.com/in/yourprofile"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 border border-white/10 text-white font-medium rounded-sm hover:border-white/30 transition-colors duration-300"
              >
                <Linkedin className="h-5 w-5" />
                LinkedIn
              </a>
              <a
                href="https://github.com/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 border border-white/10 text-white font-medium rounded-sm hover:border-white/30 transition-colors duration-300"
              >
                <Github className="h-5 w-5" />
                GitHub
              </a>
            </div>
          </FadeInSection>
        </div>
      </section>

      <footer className="relative border-t border-white/5 px-6 py-12">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-neutral-600">
          <div className="font-mono text-xs">© 2025 Brandon H. All rights reserved.</div>
          <div className="font-mono text-xs">Designed & built with intention</div>
        </div>
      </footer>
    </main>
  )
}

// Design rationale: Using IO API is more performant than scroll events. Subtle 0.6s transition creates
// gentle reveals without drawing attention away from content. Only animates once per element.
function FadeInSection({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("opacity-100", "translate-y-0")
            entry.target.classList.remove("opacity-0", "translate-y-6")
          }
        })
      },
      { threshold: 0.1 },
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className="opacity-0 translate-y-6 transition-all duration-700 ease-out"
      style={{ transitionProperty: "opacity, transform" }}
    >
      {children}
    </div>
  )
}

function ProjectCard({
  number,
  title,
  description,
  tech,
  features,
  codeUrl,
  demoUrl,
}: {
  number: string
  title: string
  description: string
  tech: string[]
  features: string[]
  codeUrl: string
  demoUrl: string
}) {
  return (
    <article className="group border-b border-white/5 pb-24 last:border-0">
      {/* Design rationale: Project number provides visual anchor. Large title creates hierarchy.
          Two-column layout on desktop creates scannable sections with optimal line length. */}
      <div className="font-mono text-xs tracking-wider text-neutral-600 mb-8">PROJECT {number}</div>

      <div className="grid md:grid-cols-12 gap-12">
        {/* Left column: Title, tech, and actions */}
        <div className="md:col-span-5 space-y-8">
          <h3 className="text-4xl md:text-5xl font-bold leading-tight group-hover:text-neutral-400 transition-colors duration-300">
            {title}
          </h3>

          <div className="flex flex-wrap gap-2">
            {tech.map((item) => (
              <span
                key={item}
                className="px-3 py-1.5 bg-white/5 border border-white/5 rounded-sm text-xs font-mono text-neutral-400"
              >
                {item}
              </span>
            ))}
          </div>

          <div className="flex gap-3 pt-4">
            <a
              href={codeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 border border-white/10 text-sm font-medium rounded-sm hover:border-white/30 hover:bg-white/5 transition-all duration-300"
            >
              <Code2 className="h-4 w-4" />
              Code
            </a>
            <a
              href={demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 border border-white/10 text-sm font-medium rounded-sm hover:border-white/30 hover:bg-white/5 transition-all duration-300"
            >
              <ExternalLink className="h-4 w-4" />
              Demo
            </a>
          </div>
        </div>

        {/* Right column: Description and features */}
        <div className="md:col-span-7 space-y-8">
          <p className="text-lg text-neutral-400 leading-relaxed">{description}</p>

          <div className="space-y-3">
            {features.map((feature, i) => (
              <div key={i} className="flex gap-3 text-neutral-500">
                <span className="text-neutral-700 mt-1.5">•</span>
                <span className="text-sm leading-relaxed">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </article>
  )
}

// Design: Minimal vertical line with labeled dots for each section
// Performance: Uses Framer Motion's scroll hooks (GPU-accelerated, no heavy listeners)
// Non-interfering: pointer-events-none, fixed positioning, doesn't block content
function ScrollTimeline({ scrollProgress, sections }: { scrollProgress: any; sections: any }) {
  return (
    <div className="fixed right-8 top-1/2 -translate-y-1/2 z-40 pointer-events-none hidden md:block">
      {/* Vertical line connecting all dots */}
      <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-white/10" />

      <div className="relative flex flex-col gap-12">
        {sections.map((section, index) => (
          <TimelineItem key={section.id} section={section} scrollProgress={scrollProgress} />
        ))}
      </div>
    </div>
  )
}

function TimelineItem({ section, scrollProgress }: { section: any; scrollProgress: any }) {
  // Calculate opacity based on scroll position - active section has full opacity
  const isActive = useTransform(
    scrollProgress,
    [section.range[0] - 0.05, section.range[0], section.range[1], section.range[1] + 0.05],
    [0.3, 1, 1, 0.3],
  )

  // Calculate scale - active section dot is larger
  const scale = useTransform(
    scrollProgress,
    [section.range[0] - 0.05, section.range[0], section.range[1], section.range[1] + 0.05],
    [0.8, 1.2, 1.2, 0.8],
  )

  return (
    <motion.div className="relative flex items-center gap-4" style={{ opacity: isActive }}>
      {/* Dot indicator */}
      <motion.div
        className="w-2 h-2 rounded-full bg-white relative z-10"
        style={{ scale }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      />

      {/* Label - only visible when hovering or active */}
      <motion.div
        className="font-mono text-xs tracking-wider text-white whitespace-nowrap pointer-events-auto"
        style={{ opacity: isActive }}
      >
        {section.label}
      </motion.div>
    </motion.div>
  )
}
