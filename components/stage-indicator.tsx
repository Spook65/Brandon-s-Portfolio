"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useEffect, useState } from "react"

const STAGES = [
  { id: "signal", label: "SIGNAL" },
  { id: "origin", label: "ORIGIN" },
  { id: "systems", label: "SYSTEMS" },
  { id: "infrastructure", label: "INFRASTRUCTURE" },
  { id: "connect", label: "CONNECT" },
]

export function StageIndicator() {
  const [activeStage, setActiveStage] = useState(0)
  const { scrollYProgress } = useScroll()

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (progress) => {
      const stageIndex = Math.floor(progress * STAGES.length)
      setActiveStage(Math.min(stageIndex, STAGES.length - 1))
    })

    return () => unsubscribe()
  }, [scrollYProgress])

  return (
    <motion.div
      className="fixed right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-6"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1, duration: 0.6 }}
    >
      {STAGES.map((stage, index) => (
        <button
          key={stage.id}
          onClick={() => {
            document.getElementById(stage.id)?.scrollIntoView({ behavior: "smooth" })
          }}
          className="group relative flex items-center gap-3"
        >
          <motion.div
            className="w-1 h-8 bg-muted-foreground/20 rounded-full overflow-hidden"
            animate={{
              backgroundColor: index === activeStage ? "rgba(59, 130, 246, 0.5)" : "rgba(100, 116, 139, 0.2)",
            }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="w-full bg-blue-500"
              initial={{ height: 0 }}
              animate={{ height: index === activeStage ? "100%" : "0%" }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>

          <motion.span
            className="text-xs font-mono tracking-wider opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap"
            animate={{
              opacity: index === activeStage ? 1 : 0,
              x: index === activeStage ? 0 : -10,
            }}
            transition={{ duration: 0.3 }}
          >
            {stage.label}
          </motion.span>
        </button>
      ))}

      <div className="absolute -left-3 top-0 h-full flex items-center">
        <motion.div
          className="w-px h-full bg-gradient-to-b from-transparent via-blue-500/30 to-transparent"
          style={{
            scaleY: useTransform(scrollYProgress, [0, 1], [0, 1]),
          }}
        />
      </div>
    </motion.div>
  )
}
