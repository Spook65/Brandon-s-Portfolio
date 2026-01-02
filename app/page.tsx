"use client"

import React from "react"
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Code2,
  X,
  Sparkles,
  Terminal,
  Layers,
  Zap,
  Rocket,
  Users,
  FileText,
  Code,
  Shield,
  CheckCircle2,
} from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

const TerminalTyping = () => {
  const [displayText, setDisplayText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [cursorVisible, setCursorVisible] = useState(true)

  // Typing loop: cycles through phrases, types character-by-character, pauses, then deletes
  const phrases = [
    "Hello World!",
    "My name is Brandon Hann",
    "I'm Majoring In Computer Science",
    "And Concentrated In Cybersecurity",
  ]

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

// SystemInspectionPanel component - opt-in side panel with development philosophy content
function SystemInspectionPanel() {
  // Local state for panel visibility - isolated from global state to prevent re-renders
  const [isOpen, setIsOpen] = useState(false)

  // Toggle function - purely local, doesn't affect any other components
  const togglePanel = () => setIsOpen((prev) => !prev)

  // Close panel when clicking outside - better UX
  useEffect(() => {
    if (!isOpen) return

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false)
    }

    window.addEventListener("keydown", handleEscape)
    return () => window.removeEventListener("keydown", handleEscape)
  }, [isOpen])

  return (
    <>
      {/* Trigger button - positioned near Systems Mode for visual grouping
          Only appears when not scrolled to prevent navbar clutter */}
      <button
        onClick={togglePanel}
        className="fixed bottom-8 right-8 z-40 px-4 py-2 bg-neutral-900/95 backdrop-blur-sm border border-white/10 rounded-sm text-xs font-mono text-neutral-400 hover:text-white hover:border-white/30 transition-all duration-300 flex items-center gap-2"
        title="Open System Inspection Panel"
      >
        <FileText className="w-3.5 h-3.5" />
        <span>INSPECT SYSTEM</span>
      </button>

      {/* Overlay backdrop - dims background when panel is open */}
      {isOpen && <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]" onClick={() => setIsOpen(false)} />}

      {/* Side panel - slides in from right
          Terminal-inspired design matching Systems Mode aesthetic
          Uses transform for GPU-accelerated animation (better performance than left/right) */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-2xl bg-neutral-950 border-l border-white/10 z-[70] transform transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Panel header */}
        <div className="border-b border-white/10 p-6 flex justify-between items-center">
          <div>
            <h2 className="text-sm font-mono text-neutral-500 tracking-wider mb-1">SYSTEM_INSPECTION</h2>
            <p className="text-xs text-neutral-600">Development philosophy and approach</p>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 hover:bg-white/5 rounded-sm transition-colors"
            title="Close (Esc)"
          >
            <X className="w-4 h-4 text-neutral-500" />
          </button>
        </div>

        {/* Panel content - scrollable */}
        <div className="h-[calc(100%-80px)] overflow-y-auto p-6 space-y-10">
          {/* Section: Mindset */}
          <div className="space-y-3">
            <h3 className="text-xs font-mono text-blue-400 tracking-wider flex items-center gap-2">
              <Terminal className="w-3 h-3" />
              MINDSET
            </h3>
            <div className="pl-5 border-l-2 border-white/5 space-y-3">
              <p className="text-sm text-neutral-400 leading-relaxed">
                Systems thinking over quick fixes. I approach problems from first principles, understanding trade-offs
                before committing to solutions.
              </p>
              <p className="text-sm text-neutral-400 leading-relaxed">
                Ship early, iterate fast. Perfect is the enemy of done. Real users provide better feedback than
                hypothetical planning.
              </p>
              <p className="text-sm text-neutral-400 leading-relaxed">
                Documentation is code. If it's not written down, it doesn't exist. Good docs save more time than clever
                abstractions.
              </p>
            </div>
          </div>

          {/* Section: Build Philosophy */}
          <div className="space-y-3">
            <h3 className="text-xs font-mono text-blue-400 tracking-wider flex items-center gap-2">
              <Code className="w-3 h-3" />
              BUILD_PHILOSOPHY
            </h3>
            <div className="pl-5 border-l-2 border-white/5 space-y-3">
              <p className="text-sm text-neutral-400 leading-relaxed">
                Start with the data model. Get the schema right, and the application logic follows naturally. Bad data
                structures create complexity at every layer.
              </p>
              <p className="text-sm text-neutral-400 leading-relaxed">
                Optimize for change, not perfection. Code that's easy to modify beats code that's "done right" but
                fragile. Flexibility compounds over time.
              </p>
              <p className="text-sm text-neutral-400 leading-relaxed">
                Boring tech is good tech. Proven tools with active communities beat shiny new frameworks. Stability
                matters more than novelty.
              </p>
              <p className="text-sm text-neutral-400 leading-relaxed">
                Test what matters. Focus on integration tests that verify real workflows, not unit tests that couple to
                implementation details.
              </p>
            </div>
          </div>

          {/* Section: Security Awareness */}
          <div className="space-y-3">
            <h3 className="text-xs font-mono text-blue-400 tracking-wider flex items-center gap-2">
              <Shield className="w-3 h-3" />
              SECURITY_AWARENESS
            </h3>
            <div className="pl-5 border-l-2 border-white/5 space-y-3">
              <p className="text-sm text-neutral-400 leading-relaxed">
                Never trust user input. Validate at boundaries, sanitize before storage, escape on output. Defense in
                depth prevents entire classes of vulnerabilities.
              </p>
              <p className="text-sm text-neutral-400 leading-relaxed">
                Secrets belong in env vars, never in code. Rotate credentials regularly. Assume your repo will
                eventually leak—plan accordingly.
              </p>
              <p className="text-sm text-neutral-400 leading-relaxed">
                Least privilege by default. Every service, user, and API should have minimal permissions required.
                Expand access only when necessary.
              </p>
              <p className="text-sm text-neutral-400 leading-relaxed">
                Security is a process, not a feature. Regular audits, dependency updates, and threat modeling catch
                issues before they become incidents.
              </p>
            </div>
          </div>

          {/* Footer hint */}
          <div className="pt-6 border-t border-white/5">
            <p className="text-xs font-mono text-neutral-600 text-center">
              Press <kbd className="px-1.5 py-0.5 bg-white/5 rounded text-neutral-500">ESC</kbd> to close
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

// SystemOverlayLayer: Dedicated container for system state indicators
// Purpose: Sits between content (z-40) and navbar (z-50) at z-45
// This ensures system indicators are always visible without conflicting with nav
function SystemOverlayLayer({ children }: { children: React.ReactNode }) {
  return <div className="fixed inset-0 z-45 pointer-events-none">{children}</div>
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
      {/* Systems Mode button integrated into navbar - see navbar component below */}
      <button
        onClick={toggleSystemsMode}
        className="px-3 py-1.5 bg-neutral-900/80 backdrop-blur-sm border border-white/10 rounded-sm text-xs font-mono text-neutral-400 hover:text-white hover:border-white/30 transition-all duration-300 flex items-center gap-2"
        title="Toggle Systems Mode (Keyboard: S)"
      >
        <Terminal className="w-3 h-3" />
        <span>SYS</span>
      </button>

      {/* Indicator now appears directly in navbar next to toggle button for visual cohesion */}
      {systemsMode && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.2 }}
          className="px-3 py-1.5 bg-blue-500/10 backdrop-blur-sm border border-blue-500/30 rounded-sm flex items-center gap-2"
        >
          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" />
          <span className="text-xs font-mono text-blue-400 tracking-wider">ACTIVE</span>
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

// Interactive System Log Component
// Tracks section visibility using IntersectionObserver
// Each section triggers a new log line when it enters viewport
function SystemLog() {
  const [logs, setLogs] = useState<string[]>([])
  const [showLog, setShowLog] = useState(false)
  const observersRef = useRef<IntersectionObserver[]>([])

  useEffect(() => {
    // Section-to-log mapping: when a section becomes visible, append its corresponding message
    const sectionMessages: Record<string, string> = {
      hero: "[sys] boot sequence complete",
      about: "[sys] profile loaded",
      timeline: "[sys] build log initialized", // Updated log message for timeline
      principles: "[sys] core tenets verified", // Added log message for principles
      stack: "[sys] modules initialized",
      work: "[sys] processes running",
      contact: "[sys] awaiting handshake",
    }

    // Track which sections have already been logged to prevent duplicates
    const loggedSections = new Set<string>()

    // Create an IntersectionObserver for each section
    // When a section becomes visible (50% threshold), append its log message
    Object.keys(sectionMessages).forEach((sectionId) => {
      const element = document.getElementById(sectionId)
      if (!element) return

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            // Only log when section enters viewport and hasn't been logged yet
            if (entry.isIntersecting && !loggedSections.has(sectionId)) {
              loggedSections.add(sectionId)

              // Show log panel after hero section is visible
              if (sectionId === "hero") {
                setShowLog(true)
              }

              // Append new log line with smooth animation
              setLogs((prev) => [...prev, sectionMessages[sectionId]])
            }
          })
        },
        {
          threshold: 0.5, // Trigger when section is 50% visible
        },
      )

      observer.observe(element)
      observersRef.current.push(observer)
    })

    // Cleanup: disconnect all observers on unmount
    return () => {
      observersRef.current.forEach((observer) => observer.disconnect())
    }
  }, [])

  // Don't render until hero section triggers visibility
  if (!showLog) return null

  return (
    <div className="fixed bottom-6 left-6 z-40 pointer-events-none hidden md:block">
      {/* Terminal-style log container with very low opacity */}
      <div className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-sm p-4 font-mono text-[10px] text-neutral-500 space-y-1 max-w-[280px]">
        <div className="text-neutral-600 mb-2 tracking-wider">SYSTEM_LOG</div>
        {/* Each log line fades in smoothly using CSS animation */}
        {logs.map((log, i) => (
          <div
            key={i}
            className="animate-fadeIn opacity-0"
            style={{
              animation: "fadeIn 500ms ease-out forwards",
              animationDelay: `${i * 100}ms`,
            }}
          >
            {log}
          </div>
        ))}
      </div>
    </div>
  )
}

// System Status Component - displays minimal status indicator that reacts to user interaction
function SystemStatus() {
  const [status, setStatus] = React.useState<"ready" | "active">("ready")
  const [showDetail, setShowDetail] = React.useState(false)

  React.useEffect(() => {
    // Update status to 'active' when user scrolls or interacts with the page
    const handleInteraction = () => {
      setStatus("active")
    }

    // Listen for scroll and click events (passive for performance)
    window.addEventListener("scroll", handleInteraction, { passive: true, once: true })
    window.addEventListener("click", handleInteraction, { once: true })

    return () => {
      window.removeEventListener("scroll", handleInteraction)
      window.removeEventListener("click", handleInteraction)
    }
  }, [])

  return (
    <div
      className="font-mono text-xs text-neutral-600 flex items-center gap-2 cursor-default"
      onMouseEnter={() => setShowDetail(true)}
      onMouseLeave={() => setShowDetail(false)}
    >
      <span className="text-neutral-700">[sys]</span>
      {status === "ready" ? (
        <span className="flex items-center gap-2">
          ready <span className="inline-block w-1 h-1 rounded-full bg-neutral-600 animate-pulse" /> awaiting interaction
        </span>
      ) : (
        <span className="flex items-center gap-2">
          active <span className="inline-block w-1 h-1 rounded-full bg-green-600" /> session established
          {showDetail && (
            <span className="ml-2 text-neutral-700 animate-fadeIn">
              · uptime {Math.floor((Date.now() - performance.timeOrigin) / 1000)}s
            </span>
          )}
        </span>
      )}
    </div>
  )
}

/* CHANGE: RotatingTaglines component updated for more specific focus areas */
function RotatingTaglines() {
  const [currentIndex, setCurrentIndex] = useState(0)

  // Rotating taglines showcasing focus areas without overclaiming
  const taglines = [
    "Currently exploring: threat modeling & secure architecture",
    "Building: local-first applications with realistic constraints",
    "Interested in: AI-assisted development tooling",
    "Focused on: clean component boundaries & explicit state flow",
    "Learning: cloud infrastructure & deployment patterns",
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % taglines.length)
    }, 4000) // Rotate every 4 seconds
    return () => clearInterval(interval)
  }, [taglines.length])

  return (
    <div className="h-8 mb-8 overflow-hidden">
      <p
        className="font-mono text-sm text-neutral-500 transition-all duration-500"
        style={{
          transform: `translateY(-${currentIndex * 32}px)`,
        }}
      >
        {taglines.map((tagline, index) => (
          <span key={index} className="block h-8 leading-8">
            {tagline}
          </span>
        ))}
      </p>
    </div>
  )
}

export default function Portfolio() {
  // Added state for systemsMode, inspectionCount, and lastInspectionTime
  const [systemsMode, setSystemsMode] = useState(false)
  // const [inspectionCount, setInspectionCount] = useState(0)
  // const [lastInspectionTime, setLastInspectionTime] = useState(0)

  // Uses Framer Motion's useScroll which is optimized and doesn't cause reflows
  const { scrollYProgress } = useScroll()
  const sections = [
    { id: "hero", label: "Home", range: [0, 0.16] },
    { id: "about", label: "About", range: [0.16, 0.32] },
    { id: "timeline", label: "Timeline", range: [0.32, 0.48] }, // Updated range for timeline
    { id: "principles", label: "Principles", range: [0.48, 0.64] }, // New section added here
    { id: "stack", label: "Stack", range: [0.64, 0.82] },
    { id: "work", label: "Work", range: [0.82, 1.0] }, // Adjusted range for work section
    { id: "contact", label: "Contact", range: [1.0, 1.0] }, // Adjusted range for contact section
  ]

  return (
    <main className="bg-neutral-950 text-white min-h-screen">
      <ScrollTimeline scrollProgress={scrollYProgress} sections={sections} />

      <AssistantHint />

      {/* SystemInspectionPanel is now placed here, alongside other fixed elements */}
      <SystemInspectionPanel />

      <SystemsModeToggle />

      <EasterEgg />

      <SystemLog />

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
          <div className="flex gap-8 items-center">
            {/* Systems Mode controls now grouped together in navbar
                Toggle button + Active indicator appear side-by-side for clear visual relationship
                Benefits:
                - Intuitive placement - users expect controls in navigation
                - Status indicator directly adjacent to its control
                - Always visible during scroll
                - Eliminates z-index conflicts from overlay layer */}
            <div className="flex items-center gap-3">
              <SystemsModeToggle />
            </div>

            <div className="flex gap-8 text-sm">
              {/* Navigation links updated to include "Timeline" */}
              {["About", "Timeline", "Principles", "Stack", "Work", "Contact"].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-neutral-400 hover:text-white transition-colors duration-300 tracking-wide"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      </nav>

      <section className="relative min-h-screen flex items-center justify-center px-6" id="hero">
        <FadeInSection delay={0}>
          <div className="max-w-5xl w-full pt-20">
            <h1 className="text-[clamp(3rem,8vw,7rem)] font-bold leading-[0.95] tracking-tight mb-8">
              Designing secure,
              <br />
              intelligent{" "}
              <span className="group/ship relative text-neutral-500 italic font-light inline-block cursor-default">
                systems
                {/* Subtle underline appears on hover for intentional emphasis */}
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-neutral-400 scale-x-0 group-hover/ship:scale-x-100 transition-transform duration-300 origin-left" />
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-neutral-400 max-w-3xl leading-[1.7] mb-6">
              Computer Science student focused on cybersecurity, AI-assisted tooling, and system-level software.
              Building complete systems that balance security, performance, and usability.
            </p>
            {/* RotatingTaglines component is now here */}
            <RotatingTaglines />
            <div className="flex gap-4 mb-8">
              <a
                href="#work"
                className="group px-8 py-4 bg-white text-black font-medium rounded-sm hover:bg-neutral-200 transition-all duration-300 hover:translate-y-[-2px]"
              >
                View work
                {/* Arrow slides right on hover for clear affordance */}
                <span className="inline-block ml-2 translate-x-0 group-hover:translate-x-1 transition-transform duration-300">
                  →
                </span>
              </a>
              <a
                href="#contact"
                className="group px-8 py-4 border border-white/10 text-white font-medium rounded-sm hover:border-white/30 transition-all duration-300 hover:translate-y-[-2px]"
              >
                Get in touch
                <span className="inline-block ml-2 translate-x-0 group-hover:translate-x-1 transition-transform duration-300">
                  →
                </span>
              </a>
            </div>
            <SystemStatus />
          </div>
        </FadeInSection>

        <TerminalTyping />
      </section>

      {/* ==================== ABOUT SECTION ==================== */}
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
                  About
                  <br />
                  My Work
                </h2>
              </div>
              <div className="md:col-span-7 space-y-8">
                {/* Background statement */}
                <div>
                  <h3 className="font-mono text-xs tracking-wider text-neutral-500 mb-3">BACKGROUND</h3>
                  <p className="text-lg text-neutral-300 leading-relaxed">
                    Third-year Computer Science student concentrating in cybersecurity. I build complete
                    systems—frontend, backend, and logic—not isolated features.
                  </p>
                </div>

                {/* Approach */}
                <div>
                  <h3 className="font-mono text-xs tracking-wider text-neutral-500 mb-3">APPROACH</h3>
                  <p className="text-neutral-400 leading-relaxed mb-4">
                    My projects span web applications, graphical games, and AI-assisted tools. Many run locally by
                    design—reflecting real constraints like API dependencies, security requirements, and development
                    realism.
                  </p>
                  <p className="text-neutral-400 leading-relaxed">
                    I prioritize maintainable, testable systems built with clarity and modularity, whether deployed
                    publicly or designed for controlled environments.
                  </p>
                </div>

                {/* System philosophy */}
                <div>
                  <h3 className="font-mono text-xs tracking-wider text-neutral-500 mb-3">SYSTEM PHILOSOPHY</h3>
                  <ul className="space-y-2 text-neutral-400">
                    <li className="flex items-start gap-3">
                      <span className="text-neutral-600 mt-1">—</span>
                      <span>Clean component boundaries and explicit state flow</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-neutral-600 mt-1">—</span>
                      <span>Security-aware design decisions from the start</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-neutral-600 mt-1">—</span>
                      <span>Performance-conscious UI interactions</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-neutral-600 mt-1">—</span>
                      <span>Developer-friendly setup and documentation</span>
                    </li>
                  </ul>
                </div>

                {/* Leadership & collaboration */}
                <div>
                  <h3 className="font-mono text-xs tracking-wider text-neutral-500 mb-3">BEYOND CODE</h3>
                  <p className="text-neutral-400 leading-relaxed">
                    Leadership in Alpha Phi Omega taught me to plan, coordinate, and execute complex initiatives—skills
                    I apply directly to technical projects and team collaboration.
                  </p>
                </div>

                {/* Status */}
                <div>
                  <h3 className="font-mono text-xs tracking-wider text-neutral-500 mb-3">STATUS</h3>
                  <p className="text-neutral-400 leading-relaxed">
                    Actively seeking Summer 2025 internships in cybersecurity, software engineering, or systems
                    development. Open to roles involving security tooling, backend systems, or full-stack applications.
                  </p>
                </div>
              </div>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* Build Timeline Section - Visual storytelling of key development milestones */}
      <section id="timeline" className="relative py-32 px-6 border-t border-white/5">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="max-w-5xl mx-auto">
          <FadeInSection delay={300}>
            <div className="font-mono text-xs tracking-wider text-neutral-600 mb-12 -ml-16 hidden md:block">
              02 / BUILD TIMELINE
            </div>
            <div className="font-mono text-xs tracking-wider text-neutral-600 mb-12 md:hidden">02 / BUILD TIMELINE</div>

            <div className="md:ml-16">
              <h2 className="text-5xl md:text-6xl font-bold leading-tight mb-16">Development Journey</h2>

              {/* Timeline container with connecting line */}
              <div className="relative">
                {/* Vertical connecting line - runs down the left side */}
                <div className="absolute left-0 top-8 bottom-8 w-px bg-gradient-to-b from-white/20 via-white/10 to-white/5 hidden md:block" />

                {/* Timeline entries - Each animates in when entering viewport */}
                <div className="space-y-16 md:pl-12">
                  <FadeInSection delay={100}>
                    <div className="relative group">
                      {/* Timeline dot indicator */}
                      <div className="absolute -left-12 top-2 w-3 h-3 rounded-full bg-white/20 border-2 border-neutral-900 group-hover:bg-white/40 transition-colors duration-300 hidden md:block" />

                      <div className="flex items-start gap-4">
                        {/* Icon - minimal and calm */}
                        <div className="flex-shrink-0 w-10 h-10 rounded-sm bg-white/5 border border-white/10 flex items-center justify-center">
                          <Sparkles className="w-5 h-5 text-neutral-500" />
                        </div>

                        <div className="flex-1 space-y-2">
                          <h3 className="text-xl font-semibold text-neutral-200">First Full-Stack System</h3>
                          <p className="text-sm text-neutral-500 leading-relaxed">
                            Built Mapetite—a React/TypeScript restaurant discovery platform integrating external APIs
                            with client-side state management.
                          </p>
                          <span className="inline-block font-mono text-xs text-neutral-600 mt-2">Fall 2025</span>
                        </div>
                      </div>
                    </div>
                  </FadeInSection>

                  <FadeInSection delay={200}>
                    <div className="relative group">
                      <div className="absolute -left-12 top-2 w-3 h-3 rounded-full bg-white/20 border-2 border-neutral-900 group-hover:bg-white/40 transition-colors duration-300 hidden md:block" />

                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-10 h-10 rounded-sm bg-white/5 border border-white/10 flex items-center justify-center">
                          <Layers className="w-5 h-5 text-neutral-500" />
                        </div>

                        <div className="flex-1 space-y-2">
                          <h3 className="text-xl font-semibold text-neutral-200">
                            Game Architecture & State Management
                          </h3>
                          <p className="text-sm text-neutral-500 leading-relaxed">
                            Developed Hide Yo Stuff in Java/LibGDX—implementing inventory systems, collision detection,
                            and game loop architecture for 2D exploration.
                          </p>
                          <span className="inline-block font-mono text-xs text-neutral-600 mt-2">Fall 2025</span>
                        </div>
                      </div>
                    </div>
                  </FadeInSection>

                  <FadeInSection delay={300}>
                    <div className="relative group">
                      <div className="absolute -left-12 top-2 w-3 h-3 rounded-full bg-white/20 border-2 border-neutral-900 group-hover:bg-white/40 transition-colors duration-300 hidden md:block" />

                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-10 h-10 rounded-sm bg-white/5 border border-white/10 flex items-center justify-center">
                          <Zap className="w-5 h-5 text-neutral-500" />
                        </div>

                        <div className="flex-1 space-y-2">
                          <h3 className="text-xl font-semibold text-neutral-200">Cybersecurity Foundations</h3>
                          <p className="text-sm text-neutral-500 leading-relaxed">
                            Deepened understanding of secure coding, access control, and network security through
                            coursework and independent study.
                          </p>
                          <span className="inline-block font-mono text-xs text-neutral-600 mt-2">Fall 2025</span>
                        </div>
                      </div>
                    </div>
                  </FadeInSection>

                  <FadeInSection delay={400}>
                    <div className="relative group">
                      <div className="absolute -left-12 top-2 w-3 h-3 rounded-full bg-white/20 border-2 border-neutral-900 group-hover:bg-white/40 transition-colors duration-300 hidden md:block" />

                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-10 h-10 rounded-sm bg-white/5 border border-white/10 flex items-center justify-center">
                          <Users className="w-5 h-5 text-neutral-500" />
                        </div>

                        <div className="flex-1 space-y-2">
                          <h3 className="text-xl font-semibold text-neutral-200">Leadership & Project Coordination</h3>
                          <p className="text-sm text-neutral-500 leading-relaxed">
                            Led initiatives in Alpha Phi Omega—managing logistics, team communication, and event
                            execution. These skills translate directly to technical project management.
                          </p>
                          <span className="inline-block font-mono text-xs text-neutral-600 mt-2">2025</span>
                        </div>
                      </div>
                    </div>
                  </FadeInSection>

                  <FadeInSection delay={500}>
                    <div className="relative group">
                      <div className="absolute -left-12 top-2 w-3 h-3 rounded-full bg-white/20 border-2 border-neutral-900 group-hover:bg-white/40 transition-colors duration-300 hidden md:block" />

                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-10 h-10 rounded-sm bg-white/5 border border-white/10 flex items-center justify-center">
                          <Rocket className="w-5 h-5 text-neutral-500" />
                        </div>

                        <div className="flex-1 space-y-2">
                          <h3 className="text-xl font-semibold text-neutral-200">Systems Thinking & AI Tooling</h3>
                          <p className="text-sm text-neutral-500 leading-relaxed">
                            Exploring AI-assisted development, local-first architectures, and scalable system design
                            patterns for maintainable software.
                          </p>
                          <span className="inline-block font-mono text-xs text-neutral-600 mt-2">Fall 2025</span>
                        </div>
                      </div>
                    </div>
                  </FadeInSection>
                </div>
              </div>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* ==================== ENGINEERING PRINCIPLES SECTION ==================== */}
      <section id="principles" className="relative py-32 px-6 border-t border-white/5">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-white/10 via-transparent to-transparent" />
        <div className="max-w-5xl mx-auto">
          <FadeInSection delay={200}>
            <div className="font-mono text-xs tracking-wider text-neutral-600 mb-12 text-right -mr-16 hidden md:block">
              02.5 / ENGINEERING PRINCIPLES
            </div>
            <div className="font-mono text-xs tracking-wider text-neutral-600 mb-12 md:hidden">
              02.5 / ENGINEERING PRINCIPLES
            </div>

            <div className="grid md:grid-cols-12 gap-16">
              <div className="md:col-span-5">
                <h2 className="text-5xl md:text-6xl font-bold leading-tight mb-8">
                  System
                  <br />
                  Philosophy
                </h2>
                <p className="text-neutral-500 text-sm leading-relaxed">
                  Principles I apply across all projects, from local tools to deployed applications.
                </p>
              </div>

              <div className="md:col-span-7 space-y-12">
                {/* Architecture & Modularity */}
                <div>
                  <h3 className="font-mono text-xs tracking-wider text-neutral-400 mb-4 flex items-center gap-2">
                    <Code2 className="w-4 h-4" />
                    ARCHITECTURE & MODULARITY
                  </h3>
                  <p className="text-neutral-300 leading-relaxed mb-3">
                    I structure projects with clean component boundaries and explicit data flow. Each module has a
                    single responsibility, making systems easier to test, debug, and extend.
                  </p>
                  <p className="text-neutral-500 text-sm leading-relaxed">
                    This approach means features can evolve independently without cascading breaks across the codebase.
                  </p>
                </div>

                {/* Security-Aware Design */}
                <div>
                  <h3 className="font-mono text-xs tracking-wider text-neutral-400 mb-4 flex items-center gap-2">
                    <Shield className="w-4 h-4" />
                    SECURITY-AWARE DESIGN
                  </h3>
                  <p className="text-neutral-300 leading-relaxed mb-3">
                    Security isn't an afterthought. I design with input validation, safe state management, and proper
                    error handling from the start. Local-first projects allow me to experiment with authentication,
                    authorization, and secure API patterns without premature deployment risk.
                  </p>
                  <p className="text-neutral-500 text-sm leading-relaxed">
                    Real security comes from understanding threat models and building defensively at every layer.
                  </p>
                </div>

                {/* Performance-Conscious UI */}
                <div>
                  <h3 className="font-mono text-xs tracking-wider text-neutral-400 mb-4 flex items-center gap-2">
                    <Zap className="w-4 h-4" />
                    PERFORMANCE-CONSCIOUS UI
                  </h3>
                  <p className="text-neutral-300 leading-relaxed mb-3">
                    Interfaces should feel immediate. I prioritize minimal re-renders, efficient state updates, and
                    deliberate use of animation. CSS-based transitions and GPU-accelerated transforms ensure smooth
                    interactions without JavaScript overhead.
                  </p>
                  <p className="text-neutral-500 text-sm leading-relaxed">
                    Performance budget matters — every component choice affects the user experience.
                  </p>
                </div>

                {/* Developer Experience */}
                <div>
                  <h3 className="font-mono text-xs tracking-wider text-neutral-400 mb-4 flex items-center gap-2">
                    <Terminal className="w-4 h-4" />
                    DEVELOPER-FRIENDLY WORKFLOWS
                  </h3>
                  <p className="text-neutral-300 leading-relaxed mb-3">
                    Code should be approachable for the next person — or future me. I write clear READMEs, use
                    consistent naming conventions, and document non-obvious decisions inline. Setup instructions are
                    explicit, and environment dependencies are tracked.
                  </p>
                  <p className="text-neutral-500 text-sm leading-relaxed">
                    Good documentation isn't extra work — it's part of shipping maintainable software.
                  </p>
                </div>

                {/* Realistic Constraints */}
                <div>
                  <h3 className="font-mono text-xs tracking-wider text-neutral-400 mb-4 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" />
                    REALISTIC CONSTRAINTS
                  </h3>
                  <p className="text-neutral-300 leading-relaxed mb-3">
                    Not every project needs to be deployed. Many of my systems run locally by design — they simulate
                    real-world API dependencies, handle sensitive data securely, or require specific hardware. This
                    reflects how software is actually built: incrementally, with realistic tradeoffs.
                  </p>
                  <p className="text-neutral-500 text-sm leading-relaxed">
                    Understanding constraints is as important as writing code.
                  </p>
                </div>
              </div>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section id="stack" className="relative py-32 px-6 border-t border-white/5">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-white/10 via-transparent to-transparent" />
        <div className="max-w-5xl mx-auto">
          <FadeInSection delay={400}>
            <div className="font-mono text-xs tracking-wider text-neutral-600 mb-6 -mr-16 hidden md:block">
              03 / STACK
            </div>
            <div className="font-mono text-xs tracking-wider text-neutral-600 mb-6 md:hidden">03 / STACK</div>
            <SkillsMap />
          </FadeInSection>
        </div>
      </section>

      <section id="work" className="relative py-32 px-6 border-t border-white/5">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-white/10 via-transparent to-transparent" />
        <div className="max-w-5xl mx-auto">
          <FadeInSection delay={600}>
            <ProjectCard
              number="01"
              title="Mapetite"
              description="Premium restaurant discovery platform with global search, detailed filtering, and location-based recommendations. Built to handle complex search queries while maintaining a high-end user experience."
              tech={["React", "TypeScript", "Vite", "Shadcn UI"]}
              features={[
                "Global restaurant search with multi-criteria filtering",
                "Location-based discovery with map integration",
                "Sophisticated, high-contrast UI for premium brand aesthetic",
                "Type-safe architecture with comprehensive validation",
              ]}
              codeUrl="https://github.com/Spook65/Mapetite"
              // demoUrl="https://github.com/Spook65/Mapetite"
              moduleData={{
                status: "production",
                problem:
                  "Finding high-quality restaurants requires sifting through inconsistent reviews and generic listings. Users need a curated discovery experience that respects their time and preferences.",
                approach:
                  "Designed a filtering system that balances query complexity with performance. The UI prioritizes clarity and trust through deliberate typography and spacing choices rather than flashy animations.",
                result:
                  "Created a search interface that feels intentional and premium. The type system catches errors before they reach users, and the component architecture keeps the codebase maintainable as features expand.",
              }}
            />

            <ProjectCard
              number="02"
              title="Hide Yo Stuff"
              description="2D stealth-based looting game where players explore procedurally generated homes under time pressure. Features inventory management, NPC interactions, and a weight-based capacity system."
              tech={["Java", "LibGDX", "Gradle"]}
              features={[
                "8 unique explorable maps with lootable containers",
                "Weight-based inventory system with real-time management",
                "NPC trader system for item exchange and stat upgrades",
                "Save/load functionality with customizable controls",
              ]}
              codeUrl="https://github.com/Spook65/The-4-Musketeers-Final-Project"
              // demoUrl="https://github.com/Spook65/The-4-Musketeers-Final-Project"
              moduleData={{
                status: "stable",
                problem:
                  "Building a game loop that keeps tension high while allowing strategic decision-making. Players need immediate feedback on inventory constraints without breaking immersion.",
                approach:
                  "Implemented a weight-based inventory that forces meaningful choices about what to carry. The trader system creates risk/reward decisions—do you leave now with safe gains or push for better loot?",
                result:
                  "The countdown timer combined with capacity limits creates natural tension. Multi-module Gradle structure keeps game logic, assets, and platform code cleanly separated for easier debugging.",
              }}
            />

            <ProjectCard
              number="03"
              title="Ritual Chamber"
              description="C++ Windows Forms survival game with real-time threat management and resource allocation. Built custom game loop and event system using native Windows GUI components."
              tech={["C++", "Windows Forms", "Visual Studio"]}
              features={[
                "Custom game state machine for location transitions",
                "Real-time threat AI with configurable behavior patterns",
                "Resource management tied to player survival mechanics",
                "Windows Forms integration for GUI-driven gameplay",
              ]}
              codeUrl="https://github.com/Spook65/Final-Project-Graphical-User-Interface"
              // demoUrl="https://github.com/Spook65/Final-Project-Graphical-User-Interface"
              moduleData={{
                status: "experimental",
                problem:
                  "Windows Forms isn't designed for game development—no built-in game loop, event timing, or sprite rendering. Building game mechanics on top of enterprise UI framework requires creative workarounds.",
                approach:
                  "Hijacked the Forms timer system to create a custom game loop. Separated game logic (Player, Rune, Location classes) from UI layer to keep state management predictable despite Forms' event-driven model.",
                result:
                  "Proved that game mechanics can work in unconventional frameworks when you understand the platform constraints. The architecture kept OOP principles intact while working around Forms' limitations.",
              }}
            />
          </FadeInSection>
        </div>
      </section>

      <section id="contact" className="relative py-32 px-6 border-t border-white/5">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="max-w-5xl mx-auto">
          <FadeInSection delay={800}>
            <div className="font-mono text-xs tracking-wider text-neutral-600 mb-6 -mr-16 hidden md:block">
              05 / CONTACT
            </div>
            <div className="font-mono text-xs tracking-wider text-neutral-600 mb-6 md:hidden">05 / CONTACT</div>
            <h2 className="text-5xl md:text-6xl font-bold mb-12">
              Let's build
              <br />
              something great
            </h2>

            <p className="text-xl text-neutral-400 mb-16 max-w-2xl leading-relaxed">
              Open to Summer 2025 internships in full-stack engineering, cloud infrastructure, or systems development.
            </p>

            {/* Design rationale: Primary action uses high contrast (white bg) while secondary actions
                use subtle borders. Consistent 16px gap creates visual rhythm. */}
            <div className="flex flex-wrap gap-4">
              <a
                href="mailto:brandon.hann65@gmail.com"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black font-medium rounded-sm hover:bg-neutral-200 transition-colors duration-300"
              >
                <Mail className="h-5 w-5" />
                Email me
              </a>
              <a
                href="https://www.linkedin.com/in/bhanncs/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 border border-white/10 text-white font-medium rounded-sm hover:border-white/30 transition-colors duration-300"
              >
                <Linkedin className="h-5 w-5" />
                LinkedIn
              </a>
              <a
                href="https://github.com/Spook65"
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

// Design: Spatial grid layout with hover-based highlighting
// Interaction: Hovering one skill highlights it and dims others (CSS-based, no state)
// Performance: Pure CSS transitions, no JavaScript hover handlers
function SkillsMap() {
  const techStack = [
    // Core Languages - Foundational programming knowledge
    {
      group: "Core Languages",
      skills: [
        { name: "C++", icon: "⚙️" },
        { name: "Java", icon: "☕" },
        { name: "Python", icon: "🐍" },
        { name: "TypeScript", icon: "📘" },
        { name: "JavaScript", icon: "📜" },
      ],
    },
    // Frontend & UI - Interface development and user experience
    {
      group: "Frontend & UI",
      skills: [
        { name: "React", icon: "⚛️" },
        { name: "Next.js", icon: "▲" },
        { name: "Tailwind CSS", icon: "🎨" },
        { name: "Recharts", icon: "📊" },
      ],
    },
    // Backend & Systems - Server-side logic and data management
    {
      group: "Backend & Systems",
      skills: [
        { name: "FastAPI", icon: "⚡" },
        { name: "REST APIs", icon: "🔌" },
        { name: "MongoDB", icon: "🍃" },
        { name: "Prisma", icon: "🔷" },
      ],
    },
    // Tooling & Practices - Development workflow and project structure
    {
      group: "Tooling & Practices",
      skills: [
        { name: "Git", icon: "🔱" },
        { name: "GitHub", icon: "🐙" },
        { name: "Environment Config", icon: "⚙️" },
        { name: "Local Testing", icon: "🧪" },
      ],
    },
    // Security & Systems - Security-aware development and system fundamentals
    {
      group: "Security & Systems",
      skills: [
        { name: "System Admin", icon: "🔒" },
        { name: "Network Concepts", icon: "🌐" },
        { name: "Secure Coding", icon: "🛡️" },
        { name: "Access Control", icon: "🔑" },
      ],
    },
  ]

  return (
    <div className="skill-map-container space-y-12">
      {techStack.map((category, idx) => (
        <FadeInSection key={category.group} delay={100 * idx}>
          {/* Category header with monospace styling */}
          <div className="mb-6">
            <h3 className="font-mono text-sm text-neutral-400 mb-2">{category.group}</h3>
            <div className="h-px bg-white/5" />
          </div>

          {/* Grid of skills within this category
              Hover logic: dim all cards when any is hovered, then un-dim the hovered card */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 group/category">
            {category.skills.map((skill) => (
              <div
                key={skill.name}
                className="relative p-4 md:p-6 border border-white/5 rounded-sm
                         transition-all duration-300 cursor-default
                         hover:border-white/30 hover:bg-white/[0.02] hover:scale-105
                         group-hover/category:opacity-40 hover:!opacity-100"
              >
                {/* Icon with subtle hover animation */}
                <div
                  className="text-3xl md:text-4xl mb-3 transition-transform duration-300
                            group-hover:scale-110"
                >
                  {skill.icon}
                </div>

                {/* Skill name */}
                <div
                  className="font-medium text-sm text-neutral-300
                            group-hover:text-white transition-colors duration-300"
                >
                  {skill.name}
                </div>

                {/* Subtle corner accent on hover */}
                <div
                  className="absolute top-0 right-0 w-0 h-0
                            group-hover:w-2 group-hover:h-2
                            border-t-2 border-r-2 border-white/30
                            transition-all duration-300"
                />
              </div>
            ))}
          </div>
        </FadeInSection>
      ))}
    </div>
  )
}

// Design: Using IO API is more performant than scroll events. Subtle 0.6s transition creates
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
  moduleData,
}: {
  number: string
  title: string
  description: string
  tech: string[]
  features: string[]
  codeUrl: string
  demoUrl: string
  moduleData: {
    status: "stable" | "experimental" | "production"
    problem: string
    approach: string
    result: string
  }
}) {
  const [isInspecting, setIsInspecting] = useState(false)
  const [inspectionCount, setInspectionCount] = useState(0)
  const [lastInspectionTime, setLastInspectionTime] = useState(0)
  const inspectionPanelRef = useRef<HTMLDivElement>(null)

  // Track rapid inspections for system log
  const handleInspectClick = () => {
    setIsInspecting(!isInspecting)

    const now = Date.now()
    if (now - lastInspectionTime < 2000) {
      setInspectionCount((prev) => {
        const newCount = prev + 1
        if (newCount >= 3) {
          console.log("[sys] deep inspection detected")
        }
        return newCount
      })
    } else {
      setInspectionCount(1)
    }
    setLastInspectionTime(now)
  }

  // Maturity indicator logic
  const maturityMap: { [key: string]: number } = {
    "01": 80,
    "02": 100,
    "03": 100,
  }
  const maturity = maturityMap[number] || 85

  // Status indicator styling
  const statusStyles = {
    stable: "text-green-500/70 border-green-500/20",
    experimental: "text-yellow-500/70 border-yellow-500/20",
    production: "text-blue-500/70 border-blue-500/20",
  }

  return (
    <FadeInSection>
      <article className="group border-b border-white/5 pb-24 last:border-0">
        {/* Module header with number and status */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="font-mono text-xs tracking-wider text-neutral-600">MODULE {number}</div>
            <div
              className={`px-2 py-1 border rounded-sm text-[10px] font-mono uppercase tracking-wider ${statusStyles[moduleData.status]}`}
            >
              {moduleData.status}
            </div>
          </div>

          {/* Existing progress ring */}
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
                strokeDasharray={`${maturity} 100`}
                strokeLinecap="round"
                className="text-neutral-700 transition-all duration-1000 ease-out"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-[10px] font-mono text-neutral-700">{maturity}%</span>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-12 gap-12">
          {/* Left column */}
          <div className="md:col-span-5 space-y-8">
            <h3 className="text-4xl md:text-5xl font-bold leading-tight group-hover:text-neutral-400 transition-colors duration-300">
              {title}
            </h3>

            <div>
              <div className="text-xs font-mono text-neutral-600 mb-3">DEPENDENCIES</div>
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
              {demoUrl ? (
                <a
                  href={demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 border border-white/10 text-sm font-medium rounded-sm hover:border-white/30 hover:bg-white/5 transition-all duration-300"
                >
                  <ExternalLink className="h-4 w-4" />
                  Demo
                </a>
              ) : (
                <div className="relative group/tooltip">
                  <button
                    disabled
                    className="inline-flex items-center gap-2 px-5 py-2.5 border border-white/5 text-sm font-medium rounded-sm text-neutral-600 cursor-not-allowed"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Demo
                  </button>
                  {/* Tooltip explaining local environment requirement */}
                  <div className="absolute bottom-full left-0 mb-2 px-3 py-2 bg-neutral-900 border border-white/10 rounded-sm text-xs font-mono text-neutral-400 whitespace-nowrap opacity-0 group-hover/tooltip:opacity-100 transition-opacity duration-200 pointer-events-none">
                    Local environment required
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={handleInspectClick}
              className="text-xs font-mono text-neutral-600 hover:text-neutral-400 transition-colors duration-200 mt-4"
            >
              [ {isInspecting ? "close" : "inspect module"} ]
            </button>
          </div>

          {/* Right column */}
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

            {/* Inspection reveal panel showing Problem/Approach/Result
                Smooth height transition, no layout shift via overflow-hidden
                Mobile-friendly with proper touch interaction */}
            <div
              ref={inspectionPanelRef}
              className={`overflow-hidden transition-all duration-500 ease-out ${
                isInspecting ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <div className="mt-8 pt-8 border-t border-white/5 space-y-6">
                <div className="text-xs font-mono text-neutral-600 mb-4">ENGINEERING DEPTH</div>

                {/* Problem section */}
                <div>
                  <div className="text-xs font-mono text-neutral-500 mb-2">Problem</div>
                  <p className="text-sm text-neutral-400 leading-relaxed">{moduleData.problem}</p>
                </div>

                {/* Approach section */}
                <div>
                  <div className="text-xs font-mono text-neutral-500 mb-2">Approach</div>
                  <p className="text-sm text-neutral-400 leading-relaxed">{moduleData.approach}</p>
                </div>

                {/* Result section */}
                <div>
                  <div className="text-xs font-mono text-neutral-500 mb-2">Result</div>
                  <p className="text-sm text-neutral-400 leading-relaxed">{moduleData.result}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
    </FadeInSection>
  )
}
