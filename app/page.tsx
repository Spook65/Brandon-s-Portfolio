"use client"

import React from "react"
import { TopNav } from "@/components/top-nav"

import type { ReactNode } from "react"

import { motion, useScroll, useTransform } from "framer-motion"
import { Github, Linkedin, Mail, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRef } from "react"
import { ScrollProgress } from "@/components/scroll-progress"

export default function Portfolio() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  // Axis rotation and transformation based on scroll
  const axisRotation = useTransform(scrollYProgress, [0, 1], [0, 360])
  const axisScale = useTransform(scrollYProgress, [0, 0.2, 0.4, 0.6, 0.8, 1], [1, 1.5, 1, 1.5, 1, 1.5])

  return (
    <div ref={containerRef} className="relative bg-black text-white min-h-[500vh]">
      <TopNav />

      <ScrollProgress />

      {/* CENTRAL AXIS - The visual metaphor that persists and transforms */}
      <motion.div
        className="fixed left-1/2 top-0 bottom-0 w-px origin-center z-0"
        style={{
          background:
            "linear-gradient(180deg, transparent 0%, rgba(59, 130, 246, 0.5) 20%, rgba(59, 130, 246, 0.5) 80%, transparent 100%)",
          scaleY: axisScale,
          rotate: axisRotation,
        }}
      />

      {/* Orbital nodes that react to scroll */}
      {/* <AxisNodes scrollProgress={scrollYProgress} /> */}

      {/* SECTION 00: SIGNAL */}
      <Section index={0} scrollProgress={scrollYProgress}>
        <div className="max-w-4xl mx-auto px-6 pointer-events-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center space-y-8"
          >
            <h1 className="text-7xl md:text-8xl font-bold tracking-tighter text-balance">Brandon Huang</h1>
            <p className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto text-pretty">
              Computer Science Student → Systems Architect → Builder of functional, intentional software
            </p>
            <div className="flex gap-4 justify-center pt-4">
              <a
                href="https://github.com/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                className="pointer-events-auto inline-flex items-center justify-center gap-2 h-11 px-8 rounded-md border border-gray-700 hover:border-blue-500 bg-transparent transition-colors duration-300 cursor-pointer text-sm font-medium"
              >
                <Github className="h-4 w-4" />
                GitHub
              </a>
            </div>
          </motion.div>
        </div>
      </Section>

      {/* SECTION 01: TRAJECTORY */}
      <Section index={1} scrollProgress={scrollYProgress}>
        <div className="max-w-3xl mx-auto px-6">
          <div className="space-y-16">
            <div className="font-mono text-xs text-blue-400/60 tracking-[0.3em]">01_RESUME</div>

            <div className="space-y-8">
              <h2 className="text-6xl md:text-8xl font-bold leading-tight">
                Code with
                <br />
                conviction
              </h2>

              <div className="space-y-6 text-xl text-gray-400 leading-relaxed border-l-2 border-blue-500/30 pl-8">
                <p>
                  I build software that solves real problems. Not prototypes that break under load. Not demos that work
                  once. Systems that scale, fail gracefully, and deliver value.
                </p>
                <p className="text-gray-500">
                  Currently pursuing CS while shipping production applications and contributing to open-source
                  infrastructure.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-12 pt-12 border-t border-gray-800">
              <div>
                <div className="text-5xl font-bold text-blue-500 mb-2">03+</div>
                <div className="text-gray-400">Years coding</div>
              </div>
              <div>
                <div className="text-5xl font-bold text-blue-500 mb-2">10+</div>
                <div className="text-gray-400">Projects shipped</div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* SECTION 02: SYSTEMS */}
      <Section index={2} scrollProgress={scrollYProgress}>
        <div className="max-w-5xl mx-auto px-6 pointer-events-auto">
          <h2 className="text-5xl font-bold mb-16 text-center">Systems</h2>
          <div className="space-y-20">
            <ProjectEntry
              title="Task Management API"
              description="RESTful API with role-based auth, rate limiting, and PostgreSQL. Handles 10K+ req/min."
              tech={["Node.js", "Express", "PostgreSQL", "Redis"]}
              features={[
                "JWT-based authentication with refresh tokens",
                "Redis caching layer for frequently accessed data",
                "Comprehensive API documentation with Swagger",
                "Docker containerization for consistent deployments",
              ]}
              codeUrl="https://github.com/yourusername/task-api"
              demoUrl="https://task-api-demo.vercel.app"
            />
            <ProjectEntry
              title="Real-time Chat System"
              description="WebSocket-based chat with typing indicators, read receipts, and message persistence."
              tech={["React", "Socket.io", "MongoDB", "Node.js"]}
              features={[
                "Real-time bidirectional communication",
                "Markdown support for rich text formatting",
                "File upload with drag-and-drop interface",
                "Message encryption for secure conversations",
              ]}
              codeUrl="https://github.com/yourusername/chat-system"
            />
            <ProjectEntry
              title="E-commerce Dashboard"
              description="Admin panel for inventory management, analytics, and order processing."
              tech={["Next.js", "TypeScript", "Prisma", "TailwindCSS"]}
              features={[
                "Interactive data visualizations with Recharts",
                "Real-time inventory tracking and alerts",
                "Bulk product import via CSV parsing",
                "Role-based access control for team members",
              ]}
              demoUrl="https://ecommerce-dashboard-demo.vercel.app"
            />
          </div>
        </div>
      </Section>

      {/* SECTION 03: ARTIFACTS */}
      <Section index={3} scrollProgress={scrollYProgress}>
        <div className="max-w-5xl mx-auto px-6">
          <div className="space-y-20">
            <div className="font-mono text-xs text-blue-400/60 tracking-[0.3em]">02_PROJECTS</div>

            <ProjectEntry
              number="01"
              title="Distributed Task Engine"
              description="Real-time task management system handling 500+ concurrent users with WebSocket sync, offline-first architecture, and collaborative workspaces. Zero-latency state updates across clients."
              tech={["Next.js", "PostgreSQL", "Redis", "WebSocket"]}
              githubUrl="https://github.com/yourusername/task-engine"
              demoUrl="https://task-engine.vercel.app"
            />

            <ProjectEntry
              number="02"
              title="API Performance Monitor"
              description="Analytics dashboard processing 10K+ API requests per minute with real-time performance metrics, anomaly detection, and intelligent alerting. Sub-100ms query latency."
              tech={["React", "Node.js", "TimescaleDB", "Chart.js"]}
              githubUrl="https://github.com/yourusername/api-monitor"
              demoUrl="https://api-monitor.vercel.app"
            />

            <ProjectEntry
              number="03"
              title="Cloud Storage Abstraction"
              description="Unified interface for multiple cloud storage providers with automatic failover, intelligent caching, and cost optimization. Handles 1TB+ monthly throughput."
              tech={["TypeScript", "AWS S3", "Cloudflare R2", "BullMQ"]}
              githubUrl="https://github.com/yourusername/cloud-storage"
            />
          </div>
        </div>
      </Section>

      {/* SECTION 04: FRAMEWORK */}
      <Section index={4} scrollProgress={scrollYProgress}>
        <div className="max-w-4xl mx-auto px-6 pointer-events-auto">
          <h2 className="text-5xl font-bold mb-16 text-center">Framework</h2>

          <TechStackIcons />

          <p className="text-lg text-gray-400 leading-relaxed pt-8">
            Specializing in distributed systems, real-time applications, and developer tooling. Focused on writing code
            that ships and systems that scale.
          </p>
        </div>
      </Section>

      {/* SECTION 05: NEXUS */}
      <Section index={5} scrollProgress={scrollYProgress}>
        <div className="max-w-3xl mx-auto px-6 pointer-events-auto">
          <div className="space-y-16">
            <div className="font-mono text-xs text-blue-400/60 tracking-[0.3em]">04_CONTACT</div>

            <div className="space-y-12">
              <h2 className="text-6xl md:text-8xl font-bold leading-tight">
                Let's ship
                <br />
                something
              </h2>

              <p className="text-xl text-gray-400 leading-relaxed">
                Open to Summer 2025 internships in full-stack engineering, cloud infrastructure, or developer tooling.
                Looking for teams building systems that matter.
              </p>

              <div className="flex flex-wrap gap-4 pt-8">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-500 transition-colors duration-300" asChild>
                  <a href="mailto:Brandon.hann65@gmail.com">
                    <Mail className="mr-2 h-4 w-4" />
                    Email
                  </a>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-gray-700 hover:border-blue-500 transition-colors duration-300 bg-transparent"
                  asChild
                >
                  <a href="https://www.linkedin.com/in/bhanncs/" target="_blank" rel="noopener noreferrer">
                    <Linkedin className="mr-2 h-4 w-4" />
                    LinkedIn
                  </a>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-gray-700 hover:border-blue-500 transition-colors duration-300 bg-transparent"
                  asChild
                >
                  <a href="https://github.com/Spook65" target="_blank" rel="noopener noreferrer">
                    <Github className="mr-2 h-4 w-4" />
                    GitHub
                  </a>
                </Button>
              </div>
            </div>

            <div className="pt-24 pb-12 text-center">
              <div className="font-mono text-xs text-gray-600 tracking-[0.3em]">END_TRANSMISSION</div>
            </div>
          </div>
        </div>
      </Section>
    </div>
  )
}

// Section component with scroll-triggered exit/enter animations
function Section({
  children,
  index,
  scrollProgress,
}: {
  children: ReactNode
  index: number
  scrollProgress: any
}) {
  const sectionStart = index / 6
  const sectionEnd = (index + 1) / 6

  const opacity = useTransform(
    scrollProgress,
    [sectionStart - 0.05, sectionStart, sectionEnd, sectionEnd + 0.05],
    [0, 1, 1, 0],
  )

  const y = useTransform(
    scrollProgress,
    [sectionStart - 0.1, sectionStart, sectionEnd, sectionEnd + 0.1],
    [100, 0, 0, -100],
  )

  return (
    <motion.section
      style={{ opacity, y }}
      className="fixed inset-0 flex items-center justify-center z-10 pointer-events-none"
    >
      {children}
    </motion.section>
  )
}

// Orbital nodes that rotate around the central axis
// function AxisNodes({ scrollProgress }: { scrollProgress: any }) {
//   const rotation = useTransform(scrollProgress, [0, 1], [0, 720])

//   return (
//     <motion.div className="fixed inset-0 z-0 pointer-events-none" style={{ rotate: rotation }}>
//       {[...Array(8)].map((_, i) => {
//         const angle = (i / 8) * 360
//         const radius = 200
//         const x = Math.cos((angle * Math.PI) / 180) * radius
//         const y = Math.sin((angle * Math.PI) / 180) * radius

//         return (
//           <div
//             key={i}
//             className="absolute top-1/2 left-1/2 w-2 h-2 bg-blue-500/30 rounded-full"
//             style={{
//               transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
//             }}
//           />
//         )
//       })}
//     </motion.div>
//   )
// }

// Project entry component
function ProjectEntry({
  number,
  title,
  description,
  tech,
  githubUrl,
  demoUrl,
  features,
  codeUrl,
}: {
  number?: string
  title: string
  description: string
  tech: string[]
  githubUrl: string
  demoUrl?: string
  features?: string[]
  codeUrl?: string
}) {
  return (
    <div className="border-l-2 border-blue-500/30 pl-8 space-y-6 group hover:border-blue-500/60 transition-colors duration-500">
      <div className="flex items-baseline gap-4">
        {number && <div className="font-mono text-sm text-blue-400/60">/{number}</div>}
        <h3 className="text-3xl md:text-4xl font-bold">{title}</h3>
      </div>

      <p className="text-lg text-gray-400 leading-relaxed">{description}</p>

      {features && (
        <div className="space-y-2">
          {features.map((feature, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-sm font-mono text-gray-400">{feature}</span>
            </div>
          ))}
        </div>
      )}

      <div className="flex gap-3 pt-2">
        <Button
          variant="outline"
          size="sm"
          className="border-gray-700 hover:border-blue-500 transition-colors bg-transparent"
          asChild
        >
          <a href={githubUrl || codeUrl} target="_blank" rel="noopener noreferrer">
            <Github className="mr-2 h-3 w-3" />
            Code
          </a>
        </Button>
        {demoUrl && (
          <Button
            variant="outline"
            size="sm"
            className="border-gray-700 hover:border-blue-500 transition-colors bg-transparent"
            asChild
          >
            <a href={demoUrl} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="mr-2 h-3 w-3" />
              Demo
            </a>
          </Button>
        )}
      </div>
    </div>
  )
}

// Tech stack icons component with scroll-triggered animations
function TechStackIcons() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [hasAnimated, setHasAnimated] = React.useState(false)

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true)
        }
      },
      { threshold: 0.3 },
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => observer.disconnect()
  }, [hasAnimated])

  const technologies = [
    {
      name: "React",
      delay: 0.1,
      dominant: true,
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="w-20 h-20">
          <path
            d="M12 10.11c1.03 0 1.87.84 1.87 1.89 0 1-.84 1.85-1.87 1.85S10.13 13 10.13 12c0-1.05.84-1.89 1.87-1.89M7.37 20c.63.38 2.01-.2 3.6-1.7-.52-.59-1.03-1.23-1.51-1.9a22.7 22.7 0 0 1-2.4-.36c-.51 2.14-.32 3.61.31 3.96m.71-5.74-.29-.51c-.11.29-.22.58-.29.86.27.06.57.11.88.16l-.3-.51m6.54-.76.81-1.5-.81-1.5c-.3-.53-.62-1-.91-1.47C13.17 9 12.6 9 12 9c-.6 0-1.17 0-1.71.03-.29.47-.61.94-.91 1.47L8.57 12l.81 1.5c.3.53.62 1 .91 1.47M12 6.78c-.19.22-.39.45-.59.72h1.18c-.2-.27-.4-.5-.59-.72m0 10.44c.19-.22.39-.45.59-.72h-1.18c.2.27.4.5.59.72M16.62 4c-.62-.38-2 .2-3.59 1.7.52.59 1.03 1.23 1.51 1.9.82.08 1.63.2 2.4.36.51-2.14.32-3.61-.32-3.96m-.7 5.74.29.51c.11-.29.22-.58.29-.86-.27-.06-.57-.11-.88-.16l-.3.51m-2.89 4.04c1.47.84 1.63 3.05 1.01 5.63 2.54.75 4.37 1.99 4.37 3.68s-1.83 2.93-4.37 3.68c-.62 2.58-.46 4.79 1.01 5.63 1.46.84 3.45-.12 5.37-1.95 1.92 1.83 3.91 2.79 5.38 1.95 3.94-1.83 5.37-2.79 5.37-1.95M17.08 12c.34.75.64 1.5.89 2.26 2.1-.63 3.28-1.53 3.28-2.26s-1.18-1.63-3.28-2.26c-.25.76-.55 1.51-.89 2.26M6.92 12c-.34-.75-.64-1.5-.89-2.26-2.1.63-3.28 1.53-3.28 2.26s1.18 1.63 3.28 2.26c.25-.76.55-1.51.89-2.26m9 2.26-.3.51c.31-.05.61-.1.88-.16-.07-.28-.18-.57-.29-.86l-.29.51m-2.89 4.04c1.59 1.5 2.97 2.08 3.59 1.7.64-.35.83-1.82.32-3.96a22.7 22.7 0 0 1 2.4-.36c.48-.67.99-1.31 1.51-1.9M8.08 9.74l.3-.51c-.31.05-.61.1-.88.16.07.28.18.57.29.86l.29-.51m2.89-4.04C9.38 4.2 8 3.62 7.37 4c-.63.35-.82 1.82-.31 3.96a22.7 22.7 0 0 1 2.4-.36c.48-.67.99-1.31 1.51-1.9z"
            fill="currentColor"
          />
        </svg>
      ),
    },
    {
      name: "TypeScript",
      delay: 0.2,
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="w-12 h-12">
          <rect x="2" y="2" width="20" height="20" rx="2" fill="currentColor" fillOpacity="0.1" />
          <path
            d="M12 8v8M8 12h8M2 4a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M13 17v-1.5c0-.8.7-1.5 1.5-1.5s1.5.7 1.5 1.5V17M8 9h3m-1.5 0v8"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      name: "Tailwind CSS",
      delay: 0.25,
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="w-13 h-13">
          <path
            d="M12 6c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5.76.19 1.31.74 1.91 1.35.98 1 2.09 2.15 4.59 2.15 2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.3-.74-1.91-1.35C15.61 7.15 14.5 6 12 6zM7 12c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5.76.19 1.3.74 1.91 1.35C8.39 16.85 9.5 18 12 18c2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.3-.74-1.91-1.35C10.61 13.15 9.5 12 7 12z"
            fill="currentColor"
          />
        </svg>
      ),
    },
    {
      name: "Node.js",
      delay: 0.3,
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="w-12 h-12">
          <path
            d="M12 2L4 8v8l8 6 8-6V8l-8-6z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12 2v8M12 10l8-2M12 10l-8-2M12 22v-8M12 14l8 2M12 14l-8 2"
            stroke="currentColor"
            strokeWidth="1.5"
          />
        </svg>
      ),
    },
    {
      name: "Framer Motion",
      delay: 0.35,
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="w-11 h-11">
          <path d="M12 2L4 8v8l8 6 8-6V8l-8-6z" stroke="currentColor" strokeWidth="1.5" fill="none" />
          <path
            d="M12 2v8M12 10l8-2M12 10l-8-2M12 22v-8M12 14l8 2M12 14l-8 2"
            stroke="currentColor"
            strokeWidth="1.5"
          />
        </svg>
      ),
    },
    {
      name: "Git",
      delay: 0.4,
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="w-12 h-12">
          <path
            d="M16 22.027v-2.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7a5.44 5.44 0 0 0-1.5-3.75 5.07 5.07 0 0 0-.09-3.77s-1.18-.35-3.91 1.48a13.38 13.38 0 0 0-7 0c-2.73-1.83-3.91-1.48-3.91-1.48A5.07 5.07 0 0 0 5 5.797a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7a3.37 3.37 0 0 0-.94 2.58v2.87"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M9 20c-4.5 1.5-4.5-2.5-6-3"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
  ]

  return (
    <div ref={containerRef} className="py-8" id="tech-stack">
      {/* Left-aligned deliberate layout - React dominant in top-left, others in intentional rows */}
      <div className="space-y-16">
        {/* Row 1: React dominant */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={hasAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
          transition={{
            duration: 0.8,
            delay: 0.1,
            ease: [0.19, 1, 0.22, 1],
          }}
          className="group flex items-center gap-3"
        >
          <motion.div
            whileHover={{ scale: 1.05, y: -2 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="text-blue-400 group-hover:text-blue-300 transition-colors duration-300"
          >
            {technologies[0].icon}
          </motion.div>
          <span className="text-base font-mono text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
            {technologies[0].name}
          </span>
        </motion.div>

        {/* Row 2: TypeScript + Tailwind in a staggered pair */}
        <div className="flex items-start gap-20 pl-12">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={hasAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
            transition={{
              duration: 0.7,
              delay: 0.2,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            className="group flex items-center gap-3"
          >
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="text-gray-500 group-hover:text-gray-300 transition-colors duration-300"
            >
              {technologies[1].icon}
            </motion.div>
            <span className="text-sm font-mono text-gray-600 group-hover:text-gray-400 transition-colors duration-300">
              {technologies[1].name}
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={hasAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
            transition={{
              duration: 0.7,
              delay: 0.25,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            className="group flex items-center gap-3 -mt-4"
          >
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="text-gray-500 group-hover:text-gray-300 transition-colors duration-300"
            >
              {technologies[2].icon}
            </motion.div>
            <span className="text-sm font-mono text-gray-600 group-hover:text-gray-400 transition-colors duration-300">
              {technologies[2].name}
            </span>
          </motion.div>
        </div>

        {/* Row 3: Node + Framer with deliberate spacing */}
        <div className="flex items-start gap-16 pl-6">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={hasAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
            transition={{
              duration: 0.7,
              delay: 0.3,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            className="group flex items-center gap-3"
          >
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="text-gray-500 group-hover:text-gray-300 transition-colors duration-300"
            >
              {technologies[3].icon}
            </motion.div>
            <span className="text-sm font-mono text-gray-600 group-hover:text-gray-400 transition-colors duration-300">
              {technologies[3].name}
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={hasAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
            transition={{
              duration: 0.7,
              delay: 0.35,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            className="group flex items-center gap-3 mt-3"
          >
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="text-gray-500 group-hover:text-gray-300 transition-colors duration-300"
            >
              {technologies[4].icon}
            </motion.div>
            <span className="text-sm font-mono text-gray-600 group-hover:text-gray-400 transition-colors duration-300">
              {technologies[4].name}
            </span>
          </motion.div>
        </div>

        {/* Row 4: Git anchored far left as outlier */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={hasAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
          transition={{
            duration: 0.7,
            delay: 0.4,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          className="group flex items-center gap-3 pl-24"
        >
          <motion.div
            whileHover={{ scale: 1.05, y: -2 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="text-gray-500 group-hover:text-gray-300 transition-colors duration-300"
          >
            {technologies[5].icon}
          </motion.div>
          <span className="text-sm font-mono text-gray-600 group-hover:text-gray-400 transition-colors duration-300">
            {technologies[5].name}
          </span>
        </motion.div>
      </div>
    </div>
  )
}
