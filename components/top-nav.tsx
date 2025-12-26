"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

export function TopNav() {
  const [activeSection, setActiveSection] = useState("home")

  const sections = [
    { id: "home", label: "Home" },
    { id: "resume", label: "Resume" },
    { id: "projects", label: "Projects" },
    { id: "tech-stack", label: "Stack" },
    { id: "contact", label: "Contact" },
  ]

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollProgress = window.scrollY / totalHeight

      // Each section is active when scroll progress is within its range
      if (scrollProgress < 0.2)
        setActiveSection("home") // 0 - 0.2
      else if (scrollProgress < 0.4)
        setActiveSection("resume") // 0.2 - 0.4
      else if (scrollProgress < 0.6)
        setActiveSection("projects") // 0.4 - 0.6
      else if (scrollProgress < 0.8)
        setActiveSection("tech-stack") // 0.6 - 0.8
      else setActiveSection("contact") // 0.8 - 1.0
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll() // Call once on mount to set initial state
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight
    let scrollTarget = 0

    // Each section spans 0.2 of progress, scroll to middle (0.1, 0.3, 0.5, 0.7, 0.9)
    switch (sectionId) {
      case "home":
        scrollTarget = totalHeight * 0.5
        break
      case "resume":
        scrollTarget = totalHeight * 0.384
        break
      case "projects":
        scrollTarget = totalHeight * 0.595
        break
      case "tech-stack":
        scrollTarget = totalHeight * 0.725
        break
      case "contact":
        scrollTarget = totalHeight * 0.95
        break
    }

    window.scrollTo({ top: scrollTarget, behavior: "smooth" })
  }

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="fixed top-8 left-1/2 -translate-x-1/2 z-50 px-8 py-4 bg-black/40 backdrop-blur-md border border-gray-800/50 rounded-full"
    >
      <ul className="flex items-center gap-8">
        {sections.map((section) => (
          <li key={section.id}>
            <button
              onClick={() => scrollToSection(section.id)}
              className={`relative text-sm font-mono tracking-wide transition-colors duration-300 ${
                activeSection === section.id ? "text-white" : "text-gray-500 hover:text-gray-300"
              }`}
            >
              {section.label}
              {activeSection === section.id && (
                <motion.div
                  layoutId="activeIndicator"
                  className="absolute -bottom-1 left-0 right-0 h-px bg-blue-500"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          </li>
        ))}
      </ul>
    </motion.nav>
  )
}
