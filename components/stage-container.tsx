"use client"

import { useRef, type ReactNode } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

interface StageContainerProps {
  children: ReactNode
  id: string
  index: number
}

export function StageContainer({ children, id, index }: StageContainerProps) {
  const ref = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [100, 0, 0, -100])

  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.95, 1, 1, 0.95])

  return (
    <motion.section
      ref={ref}
      id={id}
      className="min-h-screen flex items-center justify-center relative"
      style={{ opacity, y, scale }}
    >
      {children}
    </motion.section>
  )
}
