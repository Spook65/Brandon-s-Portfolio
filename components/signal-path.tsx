"use client"

import { useEffect, useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

export function SignalPath() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { scrollYProgress } = useScroll()

  const pathOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.3, 0.6, 0.6, 0.3])
  const pathColor = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5, 0.75, 1],
    [
      "rgba(59, 130, 246, 0.5)",
      "rgba(99, 102, 241, 0.5)",
      "rgba(139, 92, 246, 0.5)",
      "rgba(59, 130, 246, 0.5)",
      "rgba(34, 211, 238, 0.5)",
    ],
  )

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    const nodes: { x: number; y: number; vx: number; vy: number; connections: number[] }[] = []
    const nodeCount = 25

    // Create nodes
    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        connections: [],
      })
    }

    // Create connections
    nodes.forEach((node, i) => {
      const connectionCount = Math.floor(Math.random() * 2) + 1
      for (let j = 0; j < connectionCount; j++) {
        const targetIndex = Math.floor(Math.random() * nodeCount)
        if (targetIndex !== i && !node.connections.includes(targetIndex)) {
          node.connections.push(targetIndex)
        }
      }
    })

    let animationFrame: number

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update and draw nodes
      nodes.forEach((node, i) => {
        // Update position
        node.x += node.vx
        node.y += node.vy

        // Bounce off edges
        if (node.x < 0 || node.x > canvas.width) node.vx *= -1
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1

        // Draw connections
        node.connections.forEach((targetIndex) => {
          const target = nodes[targetIndex]
          const gradient = ctx.createLinearGradient(node.x, node.y, target.x, target.y)
          gradient.addColorStop(0, "rgba(59, 130, 246, 0.15)")
          gradient.addColorStop(1, "rgba(99, 102, 241, 0.15)")

          ctx.strokeStyle = gradient
          ctx.lineWidth = 1
          ctx.beginPath()
          ctx.moveTo(node.x, node.y)
          ctx.lineTo(target.x, target.y)
          ctx.stroke()
        })

        // Draw node
        const nodeGradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, 4)
        nodeGradient.addColorStop(0, "rgba(59, 130, 246, 0.8)")
        nodeGradient.addColorStop(1, "rgba(59, 130, 246, 0)")

        ctx.fillStyle = nodeGradient
        ctx.beginPath()
        ctx.arc(node.x, node.y, 4, 0, Math.PI * 2)
        ctx.fill()
      })

      animationFrame = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationFrame)
    }
  }, [])

  return (
    <motion.div className="fixed inset-0 pointer-events-none z-0" style={{ opacity: pathOpacity }}>
      <canvas ref={canvasRef} className="w-full h-full" />
    </motion.div>
  )
}
