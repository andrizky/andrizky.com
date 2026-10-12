import { useEffect } from 'react'
import { motion, useMotionValue, useSpring } from 'motion/react'

/** Animated cyberpunk background: grid, glowing orbs, cursor spotlight, scanline. */
export function CyberBackground() {
  // raw cursor position (updated on every pointermove, no re-render)
  const cursorX = useMotionValue(-1000)
  const cursorY = useMotionValue(-1000)

  // springy followers — the spotlight trails the cursor with a soft lag
  const spotlightX = useSpring(cursorX, { stiffness: 55, damping: 18, mass: 0.9 })
  const spotlightY = useSpring(cursorY, { stiffness: 55, damping: 18, mass: 0.9 })

  useEffect(() => {
    // only track the cursor on devices that actually have one
    const hasPointer = window.matchMedia('(pointer: fine)').matches
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!hasPointer || prefersReduced) return

    const onMove = (e: PointerEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [cursorX, cursorY])

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* grid */}
      <div className="cyber-grid absolute inset-0" />

      {/* glow orbs */}
      <motion.div
        className="absolute -top-40 left-1/2 h-[34rem] w-[54rem] -translate-x-1/2 rounded-full blur-[140px]"
        style={{
          background:
            'radial-gradient(closest-side, rgba(59,130,246,0.28), rgba(168,85,247,0.14), transparent)',
        }}
        animate={{ opacity: [0.7, 1, 0.7], scale: [1, 1.08, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute top-[45%] -left-40 h-[26rem] w-[26rem] rounded-full blur-[120px]"
        style={{ background: 'radial-gradient(closest-side, rgba(168,85,247,0.18), transparent)' }}
        animate={{ opacity: [0.5, 0.9, 0.5], x: [0, 40, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute top-[70%] -right-40 h-[28rem] w-[28rem] rounded-full blur-[120px]"
        style={{ background: 'radial-gradient(closest-side, rgba(56,189,248,0.14), transparent)' }}
        animate={{ opacity: [0.4, 0.8, 0.4], x: [0, -30, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* cursor spotlight — soft glow trailing the pointer */}
      <motion.div
        className="absolute top-0 left-0 h-[32rem] w-[32rem] rounded-full"
        style={{
          x: spotlightX,
          y: spotlightY,
          marginLeft: '-16rem',
          marginTop: '-16rem',
          background:
            'radial-gradient(closest-side, rgba(99,102,241,0.20), rgba(168,85,247,0.10) 45%, transparent 72%)',
        }}
      />

      {/* vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(5,6,15,0.9)_100%)]" />
    </div>
  )
}
