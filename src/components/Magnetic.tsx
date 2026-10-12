import { useRef, type MouseEvent, type ReactNode } from 'react'
import { motion, useMotionValue, useSpring, useReducedMotion } from 'motion/react'

interface MagneticProps {
  children: ReactNode
  /** pull strength — 0.3 means the element follows the cursor at 30% of the offset */
  strength?: number
  className?: string
}

/**
 * Magnetic wrapper: element is gently pulled toward the cursor while
 * hovered and springs back on leave. Skipped for touch devices and
 * reduced-motion users.
 */
export function Magnetic({ children, strength = 0.3, className = 'inline-block' }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 180, damping: 14, mass: 0.4 })
  const sy = useSpring(y, { stiffness: 180, damping: 14, mass: 0.4 })

  const onMove = (e: MouseEvent) => {
    if (reduced || !window.matchMedia('(pointer: fine)').matches) return
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    x.set((e.clientX - (rect.left + rect.width / 2)) * strength)
    y.set((e.clientY - (rect.top + rect.height / 2)) * strength)
  }

  const onLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ x: sx, y: sy }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
