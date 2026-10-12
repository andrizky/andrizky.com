import { useEffect, type ReactNode } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react'
import { ParticleField } from './ParticleField'

interface ParallaxLayerProps {
  px: ReturnType<typeof useSpring>
  py: ReturnType<typeof useSpring>
  /** max shift in px; negative = moves opposite the cursor (feels farther away) */
  depth: number
  className?: string
  children: ReactNode
}

/** Wraps content and shifts it with the cursor for a depth effect. */
function ParallaxLayer({ px, py, depth, className, children }: ParallaxLayerProps) {
  const x = useTransform(px, (v) => v * depth)
  const y = useTransform(py, (v) => v * depth)
  return (
    <motion.div className={className} style={{ x, y }}>
      {children}
    </motion.div>
  )
}

/** Animated cyberpunk background: grid, parallax glow orbs, cursor spotlight. */
export function CyberBackground() {
  // raw cursor position (updated on every pointermove, no re-render)
  const cursorX = useMotionValue(-1000)
  const cursorY = useMotionValue(-1000)

  // normalized cursor position (-1 .. 1) driving the orb parallax
  const parallaxX = useMotionValue(0)
  const parallaxY = useMotionValue(0)

  // springy followers for smooth, organic motion
  const spotlightX = useSpring(cursorX, { stiffness: 160, damping: 28, mass: 0.7 })
  const spotlightY = useSpring(cursorY, { stiffness: 160, damping: 28, mass: 0.7 })
  const orbPX = useSpring(parallaxX, { stiffness: 40, damping: 20 })
  const orbPY = useSpring(parallaxY, { stiffness: 40, damping: 20 })

  // grid tilt: subtle 3D rotation toward the cursor
  const gridRotateX = useTransform(orbPY, (v) => -v * 2.5)
  const gridRotateY = useTransform(orbPX, (v) => v * 2.5)

  useEffect(() => {
    // Listen for real pointer events instead of trusting `(pointer: fine)` —
    // some touchscreen laptops report touch as the primary pointer even with
    // a mouse connected. No pointer events = no movement, which is the
    // natural degradation on actual touch-only devices.
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const onMove = (e: PointerEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
      parallaxX.set((e.clientX / window.innerWidth) * 2 - 1)
      parallaxY.set((e.clientY / window.innerHeight) * 2 - 1)
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [cursorX, cursorY, parallaxX, parallaxY])

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* grid — tilts subtly toward the cursor (oversized so edges never show) */}
      <motion.div
        className="absolute -inset-16"
        style={{ rotateX: gridRotateX, rotateY: gridRotateY, transformPerspective: 1200 }}
      >
        <div className="cyber-grid absolute inset-0" />
      </motion.div>

      {/* particle field — neon dots that flee the cursor */}
      <ParticleField />

      {/* glow orbs — each at a different parallax depth */}
      <ParallaxLayer px={orbPX} py={orbPY} depth={24} className="absolute inset-0">
        <motion.div
          className="absolute -top-40 left-1/2 h-[34rem] w-[54rem] -translate-x-1/2 rounded-full blur-[140px]"
          style={{
            background:
              'radial-gradient(closest-side, rgba(59,130,246,0.28), rgba(168,85,247,0.14), transparent)',
          }}
          animate={{ opacity: [0.7, 1, 0.7], scale: [1, 1.08, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
      </ParallaxLayer>

      <ParallaxLayer px={orbPX} py={orbPY} depth={-40} className="absolute inset-0">
        <motion.div
          className="absolute top-[45%] -left-40 h-[26rem] w-[26rem] rounded-full blur-[120px]"
          style={{ background: 'radial-gradient(closest-side, rgba(168,85,247,0.18), transparent)' }}
          animate={{ opacity: [0.5, 0.9, 0.5], x: [0, 40, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />
      </ParallaxLayer>

      <ParallaxLayer px={orbPX} py={orbPY} depth={56} className="absolute inset-0">
        <motion.div
          className="absolute top-[70%] -right-40 h-[28rem] w-[28rem] rounded-full blur-[120px]"
          style={{ background: 'radial-gradient(closest-side, rgba(56,189,248,0.14), transparent)' }}
          animate={{ opacity: [0.4, 0.8, 0.4], x: [0, -30, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
      </ParallaxLayer>

      {/* extra orbs — fill out the field */}
      <ParallaxLayer px={orbPX} py={orbPY} depth={-64} className="absolute inset-0">
        <motion.div
          className="absolute top-[15%] -right-32 h-[22rem] w-[22rem] rounded-full blur-[110px]"
          style={{ background: 'radial-gradient(closest-side, rgba(236,72,153,0.13), transparent)' }}
          animate={{ opacity: [0.4, 0.7, 0.4], y: [0, 30, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        />
      </ParallaxLayer>

      <ParallaxLayer px={orbPX} py={orbPY} depth={72} className="absolute inset-0">
        <motion.div
          className="absolute top-[85%] left-[15%] h-[20rem] w-[20rem] rounded-full blur-[100px]"
          style={{ background: 'radial-gradient(closest-side, rgba(129,140,248,0.16), transparent)' }}
          animate={{ opacity: [0.4, 0.75, 0.4], x: [0, -25, 0] }}
          transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
        />
      </ParallaxLayer>

      <ParallaxLayer px={orbPX} py={orbPY} depth={-20} className="absolute inset-0">
        <motion.div
          className="absolute top-[55%] left-[38%] h-[24rem] w-[24rem] rounded-full blur-[130px]"
          style={{ background: 'radial-gradient(closest-side, rgba(59,130,246,0.12), transparent)' }}
          animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.12, 1] }}
          transition={{ duration: 13, repeat: Infinity, ease: 'easeInOut' }}
        />
      </ParallaxLayer>

      <ParallaxLayer px={orbPX} py={orbPY} depth={90} className="absolute inset-0">
        <motion.div
          className="absolute top-[5%] left-[20%] h-[15rem] w-[15rem] rounded-full blur-[80px]"
          style={{ background: 'radial-gradient(closest-side, rgba(129,140,248,0.15), transparent)' }}
          animate={{ opacity: [0.35, 0.65, 0.35], y: [0, 22, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        />
      </ParallaxLayer>

      <ParallaxLayer px={orbPX} py={orbPY} depth={-80} className="absolute inset-0">
        <motion.div
          className="absolute top-[35%] right-[25%] h-[16rem] w-[16rem] rounded-full blur-[90px]"
          style={{ background: 'radial-gradient(closest-side, rgba(56,189,248,0.13), transparent)' }}
          animate={{ opacity: [0.3, 0.6, 0.3], y: [0, -25, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />
      </ParallaxLayer>

      <ParallaxLayer px={orbPX} py={orbPY} depth={30} className="absolute inset-0">
        <motion.div
          className="absolute top-[75%] right-[45%] h-[14rem] w-[14rem] rounded-full blur-[80px]"
          style={{ background: 'radial-gradient(closest-side, rgba(236,72,153,0.11), transparent)' }}
          animate={{ opacity: [0.3, 0.55, 0.3], x: [0, 20, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
      </ParallaxLayer>

      {/* cursor spotlight — soft glow trailing the pointer */}
      <motion.div
        className="absolute top-0 left-0 h-[52rem] w-[52rem] rounded-full"
        style={{
          x: spotlightX,
          y: spotlightY,
          marginLeft: '-26rem',
          marginTop: '-26rem',
          background:
            'radial-gradient(closest-side, rgba(99,102,241,0.14), rgba(168,85,247,0.06) 45%, transparent 100%)',
        }}
      />

      {/* vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(5,6,15,0.9)_100%)]" />
    </div>
  )
}
