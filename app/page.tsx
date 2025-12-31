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
    { id: "stack", label: "Stack", range: [0.48, 0.64] },
    { id: "work", label: "Work", range: [0.64, 0.82] },
    { id: "contact", label: "Contact", range: [0.82, 1.0] },
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
              {["About", "Timeline", "Stack", "Work", "Contact"].map((item) => (
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
              Building systems
              <br />
              that{" "}
              <span className="group/ship relative text-neutral-500 italic font-light inline-block cursor-default">
                ship
                {/* Subtle underline appears on hover for intentional emphasis */}
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-neutral-400 scale-x-0 group-hover/ship:scale-x-100 transition-transform duration-300 origin-left" />
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-neutral-400 max-w-3xl leading-[1.7] mb-12">
              Full-stack engineer building real-time systems, cloud infrastructure, and developer tooling. Seeking
              Summer 2025 internships with teams building systems that matter.
            </p>
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
                  System
                  <br />
                  Overview
                </h2>
              </div>
              <div className="md:col-span-7 space-y-8">
                {/* Purpose statement */}
                <div>
                  <h3 className="font-mono text-xs tracking-wider text-neutral-500 mb-3">PURPOSE</h3>
                  <p className="text-lg text-neutral-300 leading-relaxed">
                    Build full-stack systems that solve real problems. Focus on correctness, clarity, and
                    maintainability.
                  </p>
                </div>

                {/* Design principles */}
                <div>
                  <h3 className="font-mono text-xs tracking-wider text-neutral-500 mb-3">DESIGN PRINCIPLES</h3>
                  <ul className="space-y-2 text-neutral-400">
                    <li className="flex items-start gap-3">
                      <span className="text-neutral-600 mt-1">—</span>
                      <span>Start with the data model. Everything else follows.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-neutral-600 mt-1">—</span>
                      <span>Optimize for readability. Code is read more than written.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-neutral-600 mt-1">—</span>
                      <span>Ship early. Iterate based on real usage.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-neutral-600 mt-1">—</span>
                      <span>Test what matters. Not everything needs 100% coverage.</span>
                    </li>
                  </ul>
                </div>

                {/* Current focus */}
                <div>
                  <h3 className="font-mono text-xs tracking-wider text-neutral-500 mb-3">CURRENT FOCUS</h3>
                  <p className="text-neutral-400 leading-relaxed">
                    Real-time systems. WebSocket architecture. State synchronization across distributed clients.
                    Exploring consistency models and conflict resolution patterns.
                  </p>
                </div>

                {/* System constraints / Status */}
                <div>
                  <h3 className="font-mono text-xs tracking-wider text-neutral-500 mb-3">STATUS</h3>
                  <p className="text-neutral-400 leading-relaxed">
                    Seeking Summer 2025 internships. Open to full-stack engineering, cloud infrastructure, or developer
                    tooling roles. Interested in teams that value craft and impact over growth metrics.
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
                  {/* Entry 1 */}
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
                          <h3 className="text-xl font-semibold text-neutral-200">First Production Deploy</h3>
                          <p className="text-sm text-neutral-500 leading-relaxed">
                            Shipped my first full-stack application with Next.js, learning CI/CD and monitoring in
                            production.
                          </p>
                          <span className="inline-block font-mono text-xs text-neutral-600 mt-2">Q1 2024</span>
                        </div>
                      </div>
                    </div>
                  </FadeInSection>

                  {/* Entry 2 */}
                  <FadeInSection delay={200}>
                    <div className="relative group">
                      <div className="absolute -left-12 top-2 w-3 h-3 rounded-full bg-white/20 border-2 border-neutral-900 group-hover:bg-white/40 transition-colors duration-300 hidden md:block" />

                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-10 h-10 rounded-sm bg-white/5 border border-white/10 flex items-center justify-center">
                          <Layers className="w-5 h-5 text-neutral-500" />
                        </div>

                        <div className="flex-1 space-y-2">
                          <h3 className="text-xl font-semibold text-neutral-200">Database Architecture Deep Dive</h3>
                          <p className="text-sm text-neutral-500 leading-relaxed">
                            Designed schema for real-time collaborative features, implemented optimistic updates and
                            conflict resolution.
                          </p>
                          <span className="inline-block font-mono text-xs text-neutral-600 mt-2">Q2 2024</span>
                        </div>
                      </div>
                    </div>
                  </FadeInSection>

                  {/* Entry 3 */}
                  <FadeInSection delay={300}>
                    <div className="relative group">
                      <div className="absolute -left-12 top-2 w-3 h-3 rounded-full bg-white/20 border-2 border-neutral-900 group-hover:bg-white/40 transition-colors duration-300 hidden md:block" />

                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-10 h-10 rounded-sm bg-white/5 border border-white/10 flex items-center justify-center">
                          <Zap className="w-5 h-5 text-neutral-500" />
                        </div>

                        <div className="flex-1 space-y-2">
                          <h3 className="text-xl font-semibold text-neutral-200">Performance Optimization Sprint</h3>
                          <p className="text-sm text-neutral-500 leading-relaxed">
                            Reduced load times by 60% through code splitting, lazy loading, and implementing streaming
                            SSR patterns.
                          </p>
                          <span className="inline-block font-mono text-xs text-neutral-600 mt-2">Q3 2024</span>
                        </div>
                      </div>
                    </div>
                  </FadeInSection>

                  {/* Entry 4 */}
                  <FadeInSection delay={400}>
                    <div className="relative group">
                      <div className="absolute -left-12 top-2 w-3 h-3 rounded-full bg-white/20 border-2 border-neutral-900 group-hover:bg-white/40 transition-colors duration-300 hidden md:block" />

                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-10 h-10 rounded-sm bg-white/5 border border-white/10 flex items-center justify-center">
                          <Users className="w-5 h-5 text-neutral-500" />
                        </div>

                        <div className="flex-1 space-y-2">
                          <h3 className="text-xl font-semibold text-neutral-200">Open Source Contributions</h3>
                          <p className="text-sm text-neutral-500 leading-relaxed">
                            Contributing to developer tools and frameworks, focusing on DX improvements and
                            documentation.
                          </p>
                          <span className="inline-block font-mono text-xs text-neutral-600 mt-2">Q4 2024</span>
                        </div>
                      </div>
                    </div>
                  </FadeInSection>

                  {/* Entry 5 */}
                  <FadeInSection delay={500}>
                    <div className="relative group">
                      <div className="absolute -left-12 top-2 w-3 h-3 rounded-full bg-white/20 border-2 border-neutral-900 group-hover:bg-white/40 transition-colors duration-300 hidden md:block" />

                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-10 h-10 rounded-sm bg-white/5 border border-white/10 flex items-center justify-center">
                          <Rocket className="w-5 h-5 text-neutral-500" />
                        </div>

                        <div className="flex-1 space-y-2">
                          <h3 className="text-xl font-semibold text-neutral-200">Building for Scale</h3>
                          <p className="text-sm text-neutral-500 leading-relaxed">
                            Currently working on distributed systems handling 500+ concurrent users with WebSocket sync
                            and Redis caching.
                          </p>
                          <span className="inline-block font-mono text-xs text-neutral-600 mt-2">Q1 2025</span>
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

      {/* Tech Stack Section */}
      <section id="stack" className="relative py-32 px-6 border-t border-white/5">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-white/10 via-transparent to-transparent" />
        <div className="max-w-5xl mx-auto">
          <FadeInSection delay={400}>
            <div className="font-mono text-xs tracking-wider text-neutral-600 mb-6 -mr-16 text-right hidden md:block">
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
              moduleData={{
                status: "production",
                problem:
                  "E-commerce teams need real-time visibility into inventory and orders across multiple warehouses, but traditional dashboards create bottlenecks with sequential data loading.",
                approach:
                  "Implemented React Server Components with parallel data fetching and Suspense boundaries. Each dashboard widget streams independently, preventing any single slow query from blocking the entire UI.",
                result:
                  "Dashboard loads 3x faster with streaming architecture. Teams can start interacting with cached data immediately while fresh data progressively enhances the view.",
              }}
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
              moduleData={{
                status: "stable",
                problem:
                  "Standard HTTP polling creates unacceptable latency for real-time collaboration. Users expect instant message delivery and live typing feedback without manual refresh.",
                approach:
                  "Built bidirectional WebSocket connection with Socket.io for sub-100ms message delivery. Implemented optimistic UI updates with rollback logic for offline resilience.",
                result:
                  "Achieved <50ms average message latency with 99.9% delivery reliability. System gracefully handles network interruptions with automatic reconnection and message queue persistence.",
              }}
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
              moduleData={{
                status: "experimental",
                problem:
                  "Collaborative task management breaks down under network instability. Users lose work during disconnections, and concurrent edits create data conflicts requiring manual resolution.",
                approach:
                  "Designed offline-first architecture using operational transformation for conflict-free replicated data. Local-first mutations sync via WebSocket with PostgreSQL as source of truth and Redis for real-time pub/sub.",
                result:
                  "Users experience zero-latency interactions regardless of connection quality. Conflict resolution happens automatically in 99% of cases using last-write-wins with vector clocks for causal ordering.",
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
    "01": 95,
    "02": 80,
    "03": 90,
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
