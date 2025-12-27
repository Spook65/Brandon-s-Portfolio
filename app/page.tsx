"use client"

import type React from "react"
import { Github, Linkedin, Mail, ExternalLink, Code2, X, Sparkles } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

const TerminalTyping = () => {
  const [displayText, setDisplayText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [cursorVisible, setCursorVisible] = useState(true)

  // Typing loop: cycles through phrases, types character-by-character, pauses, then deletes
  const phrases = ["Brandon Huynh", "Computer Science Major", "Cybersecurity Concentration"]

  useEffect(() => {
    const currentPhrase = phrases[currentIndex]

    // Cursor blink effect: toggles every 500ms for subtle blinking
    const cursorInterval = setInterval(() => {
      setCursorVisible((prev) => !prev)
    }, 500)

    // Typing/deleting logic: simulates terminal character-by-character input
    const typingSpeed = isDeleting ? 50 : 100 // Faster delete, slower type
    const pauseDuration = isDeleting ? 0 : 1500 // Pause after typing completes

    const timeout = setTimeout(
      () => {
        if (!isDeleting && displayText === currentPhrase) {
          // Finished typing, pause then start deleting
          setIsDeleting(true)
        } else if (isDeleting && displayText === "") {
          // Finished deleting, move to next phrase
          setIsDeleting(false)
          setCurrentIndex((prev) => (prev + 1) % phrases.length)
        } else if (isDeleting) {
          // Delete one character
          setDisplayText(currentPhrase.substring(0, displayText.length - 1))
        } else {
          // Type one character
          setDisplayText(currentPhrase.substring(0, displayText.length + 1))
        }
      },
      displayText === currentPhrase && !isDeleting ? pauseDuration : typingSpeed,
    )

    return () => {
      clearTimeout(timeout)
      clearInterval(cursorInterval)
    }
  }, [displayText, currentIndex, isDeleting])

  return (
    <div className="absolute bottom-12 right-12 max-w-sm">
      {/* Terminal window with monospace text and blinking cursor */}
      <div className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-sm p-4">
        <div className="flex gap-2 mb-3">
          <div className="w-3 h-3 rounded-full bg-red-500/50" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
          <div className="w-3 h-3 rounded-full bg-green-500/50" />
        </div>
        <div className="font-mono text-sm text-neutral-300">
          <span className="text-blue-400">$</span> {displayText}
          <span className={`inline-block w-2 h-4 bg-neutral-300 ml-1 ${cursorVisible ? "opacity-100" : "opacity-0"}`} />
        </div>
      </div>

      {/* Minimal keyboard illustration: flat, stylized, low opacity */}
      <div className="mt-3 flex justify-center gap-1 opacity-20">
        <div className="w-3 h-3 border border-white/50 rounded-[1px]" />
        <div className="w-3 h-3 border border-white/50 rounded-[1px]" />
        <div className="w-3 h-3 border border-white/50 rounded-[1px]" />
        <div className="w-8 h-3 border border-white/50 rounded-[1px]" />
        <div className="w-3 h-3 border border-white/50 rounded-[1px]" />
        <div className="w-3 h-3 border border-white/50 rounded-[1px]" />
      </div>
    </div>
  )
}

function SystemsModeToggle() {
  // Load Systems Mode preference from localStorage on mount
  const [systemsMode, setSystemsMode] = useState(false)

  useEffect(() => {
    // Check if user has Systems Mode enabled from previous session
    const savedMode = localStorage.getItem("systems-mode") === "true"
    setSystemsMode(savedMode)

    // Apply .systems-mode class to root HTML element for CSS-based styling
    if (savedMode) {
      document.documentElement.classList.add("systems-mode")
    }

    // Keyboard shortcut: Press 'S' to toggle Systems Mode
    const handleKeyPress = (e: KeyboardEvent) => {
      // Only trigger if not typing in an input field
      if (e.key === "s" && !["INPUT", "TEXTAREA"].includes((e.target as HTMLElement).tagName)) {
        e.preventDefault()
        toggleSystemsMode()
      }
    }

    window.addEventListener("keydown", handleKeyPress)
    return () => window.removeEventListener("keydown", handleKeyPress)
  }, [])

  // Toggle function that updates state, localStorage, and root CSS class
  const toggleSystemsMode = () => {
    setSystemsMode((prev) => {
      const newMode = !prev
      localStorage.setItem("systems-mode", String(newMode))

      // Apply or remove CSS class from root element
      if (newMode) {
        document.documentElement.classList.add("systems-mode")
      } else {
        document.documentElement.classList.remove("systems-mode")
      }

      return newMode
    })
  }

  return (
    <>
      {/* Optional UI toggle button (positioned in bottom-left corner) */}
      <button
        onClick={toggleSystemsMode}
        className="fixed bottom-8 left-8 z-40 px-4 py-2 bg-neutral-900/95 backdrop-blur-sm border border-white/10 rounded-sm text-xs font-mono text-neutral-400 hover:text-white hover:border-white/30 transition-all duration-300"
        aria-label="Toggle Systems Mode"
      >
        <span className="hidden md:inline">Press S / </span>
        {systemsMode ? "Exit Systems" : "Systems Mode"}
      </button>

      {/* Status indicator that appears when Systems Mode is active */}
      {systemsMode && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed top-20 left-1/2 -translate-x-1/2 z-50 px-4 py-2 bg-blue-500/10 backdrop-blur-sm border border-blue-500/30 rounded-sm pointer-events-none"
        >
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" />
            <span className="text-xs font-mono text-blue-400 tracking-wider">SYSTEMS MODE: ACTIVE</span>
          </div>
        </motion.div>
      )}
    </>
  )
}

function AssistantHint() {
  const [visible, setVisible] = useState(false)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    // Check if user has permanently dismissed the assistant
    const isDismissed = localStorage.getItem("assistant-dismissed") === "true"
    if (isDismissed) {
      setDismissed(true)
      return
    }

    // Performance-safe scroll detection using passive listener
    const handleScroll = () => {
      const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100

      // Show assistant after 30% scroll
      if (scrollPercent > 30 && !visible) {
        setVisible(true)
        // Remove listener after showing to avoid unnecessary checks
        window.removeEventListener("scroll", handleScroll)
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [visible])

  const handleDismiss = () => {
    setVisible(false)
    setDismissed(true)
    // Remember dismissal permanently
    localStorage.setItem("assistant-dismissed", "true")
  }

  if (dismissed || !visible) return null

  // Friendly suggestions that guide user through portfolio
  const suggestions = ["View React projects →", "Check out my tech stack", "See real-time chat demo"]
  const randomSuggestion = suggestions[Math.floor(Math.random() * suggestions.length)]

  return (
    // Positioned bottom-right, won't block content due to z-40 and careful placement
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="fixed bottom-8 right-8 z-40 max-w-xs pointer-events-auto"
    >
      <div className="bg-neutral-900/95 backdrop-blur-sm border border-white/10 rounded-lg p-4 shadow-2xl">
        {/* Dismissible button in top-right corner */}
        <button
          onClick={handleDismiss}
          className="absolute -top-2 -right-2 w-6 h-6 bg-neutral-800 border border-white/10 rounded-full flex items-center justify-center hover:bg-neutral-700 transition-colors duration-200"
          aria-label="Dismiss assistant"
        >
          <X className="w-3 h-3 text-neutral-400" />
        </button>

        {/* Minimal, friendly icon */}
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 bg-blue-500/10 rounded-full flex items-center justify-center flex-shrink-0">
            <Sparkles className="w-4 h-4 text-blue-400" />
          </div>
          <div className="flex-1">
            <p className="text-sm text-neutral-300 leading-relaxed">{randomSuggestion}</p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function EasterEgg() {
  const [visible, setVisible] = useState(false)
  const keySequence = useRef<string[]>([])

  useEffect(() => {
    // Easter egg: Konami-style sequence (↑ ↑ ↓ ↓ A) or Ctrl+Shift+E
    // Tracks key presses to detect secret sequence without interfering with normal navigation
    const handleKeyDown = (e: KeyboardEvent) => {
      // Alternative shortcut: Ctrl + Shift + E
      if (e.ctrlKey && e.shiftKey && e.key === "E") {
        e.preventDefault()
        showEasterEgg()
        return
      }

      // Don't track keys when typing in inputs/textareas
      if (["INPUT", "TEXTAREA"].includes((e.target as HTMLElement).tagName)) {
        return
      }

      // Track arrow keys and 'A' for Konami-style sequence
      const key = e.key
      if (["ArrowUp", "ArrowDown", "a", "A"].includes(key)) {
        keySequence.current.push(key)

        // Keep only last 5 keys to match sequence length
        if (keySequence.current.length > 5) {
          keySequence.current.shift()
        }

        // Check if sequence matches: ↑ ↑ ↓ ↓ A (case-insensitive for A)
        const sequence = keySequence.current
        if (
          sequence.length === 5 &&
          sequence[0] === "ArrowUp" &&
          sequence[1] === "ArrowUp" &&
          sequence[2] === "ArrowDown" &&
          sequence[3] === "ArrowDown" &&
          (sequence[4] === "a" || sequence[4] === "A")
        ) {
          showEasterEgg()
          keySequence.current = [] // Reset sequence after successful trigger
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown)

    // Cleanup: remove event listener on unmount to prevent memory leaks
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [])

  const showEasterEgg = () => {
    setVisible(true)

    // Auto-dismiss after 3 seconds
    setTimeout(() => {
      setVisible(false)
    }, 3000)
  }

  if (!visible) return null

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center pointer-events-none"
      style={{ animation: "fadeIn 0.3s ease-out" }}
    >
      {/* Terminal-inspired overlay toast */}
      <div
        className="pointer-events-auto bg-neutral-900/95 border border-neutral-700 rounded-lg px-6 py-4 max-w-md shadow-2xl cursor-pointer"
        onClick={() => setVisible(false)}
      >
        <div className="flex items-start gap-3">
          <Sparkles className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
          <div>
            <div className="font-mono text-xs text-neutral-500 mb-1">EASTER_EGG_FOUND</div>
            <p className="text-sm text-neutral-200 leading-relaxed">
              You found this. I build systems — and I care about details.
            </p>
            <div className="mt-2 font-mono text-xs text-neutral-600">Click to dismiss</div>
          </div>
        </div>
      </div>
    </div>
  )
}

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

      <AssistantHint />

      <SystemsModeToggle />

      <EasterEgg />

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
        <FadeInSection delay={0}>
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

        <TerminalTyping />
      </section>

      <section id="about" className="relative py-32 px-6">
        <div className="max-w-5xl mx-auto">
          <FadeInSection delay={200}>
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
          <FadeInSection delay={400}>
            <div className="font-mono text-xs tracking-wider text-neutral-600 mb-6 -mr-16 text-right hidden md:block">
              02 / STACK
            </div>
            <div className="font-mono text-xs tracking-wider text-neutral-600 mb-6 md:hidden">02 / STACK</div>
            <SkillsMap />
          </FadeInSection>
        </div>
      </section>

      <section id="work" className="relative py-32 px-6 border-t border-white/5">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-white/10 via-transparent to-transparent" />
        <div className="max-w-5xl mx-auto">
          <FadeInSection delay={600}>
            <div className="flex items-center justify-between mb-8">
              <div className="font-mono text-xs tracking-wider text-neutral-600">PROJECT 01</div>
              <div className="relative w-10 h-10" aria-hidden="true">
                <svg className="w-10 h-10 transform -rotate-90" viewBox="0 0 36 36">
                  <circle
                    cx="18"
                    cy="18"
                    r="16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="text-neutral-800"
                  />
                  <circle
                    cx="18"
                    cy="18"
                    r="16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeDasharray="95 100"
                    strokeLinecap="round"
                    className="text-neutral-700 transition-all duration-1000 ease-out"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-[10px] font-mono text-neutral-700">95%</span>
                </div>
              </div>
            </div>
            <div className="grid md:grid-cols-12 gap-12">
              <div className="md:col-span-5 space-y-8">
                <h3 className="text-4xl md:text-5xl font-bold leading-tight group-hover:text-neutral-400 transition-colors duration-300">
                  E-commerce Dashboard
                </h3>
                <div className="flex flex-wrap gap-2">
                  {["Next.js 15", "TypeScript", "Prisma", "Recharts"].map((item) => (
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
                    href="https://github.com/yourusername/ecommerce-dashboard"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 border border-white/10 text-sm font-medium rounded-sm hover:border-white/30 hover:bg-white/5 transition-all duration-300"
                  >
                    <Code2 className="h-4 w-4" />
                    Code
                  </a>
                  <a
                    href="https://ecommerce-dashboard.vercel.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 border border-white/10 text-sm font-medium rounded-sm hover:border-white/30 hover:bg-white/5 transition-all duration-300"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Demo
                  </a>
                </div>
              </div>
              <div className="md:col-span-7 space-y-8">
                <p className="text-lg text-neutral-400 leading-relaxed">
                  Admin panel for inventory management, analytics, and order processing. Built with React Server
                  Components and streaming patterns for optimal performance.
                </p>
                <div className="space-y-3">
                  {[
                    "Interactive data visualizations with real-time updates",
                    "CSV import with validation and error handling",
                    "Role-based access control for team collaboration",
                    "Optimistic UI updates for instant feedback",
                  ].map((feature, i) => (
                    <div key={i} className="flex gap-3 text-neutral-500">
                      <span className="text-neutral-700 mt-1.5">•</span>
                      <span className="text-sm leading-relaxed">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between mb-8 mt-24">
              <div className="font-mono text-xs tracking-wider text-neutral-600">PROJECT 02</div>
              <div className="relative w-10 h-10" aria-hidden="true">
                <svg className="w-10 h-10 transform -rotate-90" viewBox="0 0 36 36">
                  <circle
                    cx="18"
                    cy="18"
                    r="16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="text-neutral-800"
                  />
                  <circle
                    cx="18"
                    cy="18"
                    r="16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeDasharray="80 100"
                    strokeLinecap="round"
                    className="text-neutral-700 transition-all duration-1000 ease-out"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-[10px] font-mono text-neutral-700">80%</span>
                </div>
              </div>
            </div>
            <div className="grid md:grid-cols-12 gap-12">
              <div className="md:col-span-5 space-y-8">
                <h3 className="text-4xl md:text-5xl font-bold leading-tight group-hover:text-neutral-400 transition-colors duration-300">
                  Real-time Chat System
                </h3>
                <div className="flex flex-wrap gap-2">
                  {["React", "Socket.io", "MongoDB", "Express"].map((item) => (
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
                    href="https://github.com/yourusername/chat-system"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 border border-white/10 text-sm font-medium rounded-sm hover:border-white/30 hover:bg-white/5 transition-all duration-300"
                  >
                    <Code2 className="h-4 w-4" />
                    Code
                  </a>
                  <a
                    href="https://chat-system.vercel.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 border border-white/10 text-sm font-medium rounded-sm hover:border-white/30 hover:bg-white/5 transition-all duration-300"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Demo
                  </a>
                </div>
              </div>
              <div className="md:col-span-7 space-y-8">
                <p className="text-lg text-neutral-400 leading-relaxed">
                  WebSocket-based chat application with typing indicators, read receipts, and message persistence.
                  Handles 100+ concurrent connections with minimal latency.
                </p>
                <div className="space-y-3">
                  {[
                    "Real-time bidirectional communication",
                    "Markdown support for rich text formatting",
                    "Drag-and-drop file uploads with preview",
                    "End-to-end encryption for secure messaging",
                  ].map((feature, i) => (
                    <div key={i} className="flex gap-3 text-neutral-500">
                      <span className="text-neutral-700 mt-1.5">•</span>
                      <span className="text-sm leading-relaxed">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between mb-8 mt-24">
              <div className="font-mono text-xs tracking-wider text-neutral-600">PROJECT 03</div>
              <div className="relative w-10 h-10" aria-hidden="true">
                <svg className="w-10 h-10 transform -rotate-90" viewBox="0 0 36 36">
                  <circle
                    cx="18"
                    cy="18"
                    r="16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="text-neutral-800"
                  />
                  <circle
                    cx="18"
                    cy="18"
                    r="16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeDasharray="90 100"
                    strokeLinecap="round"
                    className="text-neutral-700 transition-all duration-1000 ease-out"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-[10px] font-mono text-neutral-700">90%</span>
                </div>
              </div>
            </div>
            <div className="grid md:grid-cols-12 gap-12">
              <div className="md:col-span-5 space-y-8">
                <h3 className="text-4xl md:text-5xl font-bold leading-tight group-hover:text-neutral-400 transition-colors duration-300">
                  Distributed Task Engine
                </h3>
                <div className="flex flex-wrap gap-2">
                  {["Next.js", "PostgreSQL", "Redis", "WebSocket"].map((item) => (
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
                    href="https://github.com/yourusername/task-engine"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 border border-white/10 text-sm font-medium rounded-sm hover:border-white/30 hover:bg-white/5 transition-all duration-300"
                  >
                    <Code2 className="h-4 w-4" />
                    Code
                  </a>
                  <a
                    href="https://task-engine.vercel.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 border border-white/10 text-sm font-medium rounded-sm hover:border-white/30 hover:bg-white/5 transition-all duration-300"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Demo
                  </a>
                </div>
              </div>
              <div className="md:col-span-7 space-y-8">
                <p className="text-lg text-neutral-400 leading-relaxed">
                  Task management system supporting 500+ concurrent users. Features offline-first architecture with
                  intelligent conflict resolution for collaborative editing.
                </p>
                <div className="space-y-3">
                  {[
                    "Offline-first with local state sync",
                    "Zero-latency updates across clients",
                    "Intelligent conflict resolution",
                    "Real-time collaborative workspaces",
                  ].map((feature, i) => (
                    <div key={i} className="flex gap-3 text-neutral-500">
                      <span className="text-neutral-700 mt-1.5">•</span>
                      <span className="text-sm leading-relaxed">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </FadeInSection>
        </div>
      </section>

      <section id="contact" className="relative py-32 px-6 border-t border-white/5">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="max-w-5xl mx-auto">
          <FadeInSection delay={800}>
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
function FadeInSection({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add("opacity-100", "translate-y-0")
              entry.target.classList.remove("opacity-0", "translate-y-6")
            }, delay)
          }
        })
      },
      { threshold: 0.1 },
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [delay])

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
  // This is purely decorative - higher number = more mature/complete (01=95%, 02=80%, 03=90%)
  const maturityMap: { [key: string]: number } = {
    "01": 95,
    "02": 80,
    "03": 90,
  }
  const maturity = maturityMap[number] || 85

  return (
    <FadeInSection>
      <article className="group border-b border-white/5 pb-24 last:border-0">
        {/* Design rationale: Project number provides visual anchor. Large title creates hierarchy.
            Two-column layout on desktop creates scannable sections with optimal line length. */}
        <div className="flex items-center justify-between mb-8">
          <div className="font-mono text-xs tracking-wider text-neutral-600">PROJECT {number}</div>

          {/* Progress ring: decorative maturity indicator
              Uses SVG circle with stroke-dasharray technique for clean, scalable visual
              Low contrast (neutral-800/neutral-700) ensures non-distracting appearance
              No interaction - purely informative visual accent */}
          <div className="relative w-10 h-10" aria-hidden="true">
            <svg className="w-10 h-10 transform -rotate-90" viewBox="0 0 36 36">
              {/* Background ring - subtle baseline */}
              <circle
                cx="18"
                cy="18"
                r="16"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="text-neutral-800"
              />
              {/* Progress ring - animated fill based on maturity percentage
                  stroke-dasharray creates the partial ring effect
                  transition provides smooth animation on mount */}
              <circle
                cx="18"
                cy="18"
                r="16"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeDasharray={`${maturity} 100`}
                strokeLinecap="round"
                className="text-neutral-700 transition-all duration-1000 ease-out"
              />
            </svg>
            {/* Center percentage label for clarity */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-[10px] font-mono text-neutral-700">{maturity}%</span>
            </div>
          </div>
        </div>

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
    </FadeInSection>
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

// Interactive Skills Map Component
// Design: Spatial grid layout with hover-based highlighting
// Interaction: Hovering one skill highlights it and dims others (CSS-based, no state)
// Performance: Pure CSS transitions, no JavaScript hover handlers
function SkillsMap() {
  const skills = [
    { name: "React", icon: "⚛️", category: "Frontend" },
    { name: "TypeScript", icon: "📘", category: "Language" },
    { name: "Next.js", icon: "▲", category: "Framework" },
    { name: "Node.js", icon: "🟢", category: "Backend" },
    { name: "Tailwind", icon: "🎨", category: "Styling" },
    { name: "PostgreSQL", icon: "🐘", category: "Database" },
    { name: "Git", icon: "🔱", category: "Tools" },
    { name: "Framer", icon: "🎬", category: "Animation" },
  ]

  return (
    <div className="skill-map-container group/map">
      {/* Grid layout creates spatial relationships between skills
          Gap provides breathing room, auto-fit ensures responsiveness */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
        {skills.map((skill) => (
          <div
            key={skill.name}
            className="skill-card relative p-6 md:p-8 border border-white/5 rounded-sm 
                     transition-all duration-300 cursor-default
                     hover:border-white/30 hover:bg-white/[0.02] hover:scale-105
                     group-hover/map:opacity-40 hover:!opacity-100"
          >
            {/* Hover logic:
                - All cards start at full opacity
                - When ANY card is hovered (group-hover/map), all cards dim to 40% opacity
                - The hovered card itself uses !opacity-100 to override the dim
                - This creates the "highlight one, dim others" effect without JavaScript */}

            {/* Icon grows on hover with slight rotation for playful effect */}
            <div
              className="text-4xl md:text-5xl mb-4 transition-transform duration-300 
                          group-hover:scale-110 group-hover:rotate-3"
            >
              {skill.icon}
            </div>

            {/* Skill name and category with staggered color transitions */}
            <div className="space-y-1">
              <div
                className="font-medium text-sm md:text-base text-neutral-300 
                            group-hover:text-white transition-colors duration-300"
              >
                {skill.name}
              </div>
              <div
                className="font-mono text-xs text-neutral-600 
                            group-hover:text-neutral-500 transition-colors duration-300"
              >
                {skill.category}
              </div>
            </div>

            {/* Subtle corner accent that appears on hover */}
            <div
              className="absolute top-0 right-0 w-0 h-0 
                          group-hover:w-3 group-hover:h-3 
                          border-t-2 border-r-2 border-white/30
                          transition-all duration-300"
            />
          </div>
        ))}
      </div>
    </div>
  )
}
