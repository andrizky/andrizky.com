import { motion, useScroll, useSpring } from 'motion/react'

/** Thin gradient scroll-progress bar pinned to the top of the viewport. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 25,
    restDelta: 0.001,
  })

  return (
    <motion.div
      aria-hidden
      className="fixed top-0 right-0 left-0 z-[60] h-[3px] origin-left bg-gradient-to-r from-neon-blue-deep via-indigo-400 to-neon-purple"
      style={{ scaleX }}
    />
  )
}
