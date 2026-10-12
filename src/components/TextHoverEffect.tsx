import { useRef, useState, type MouseEvent } from 'react'
import { motion, useMotionValue, useSpring, useReducedMotion } from 'motion/react'

interface TextHoverEffectProps {
  text: string
}

/**
 * x.ai-style hover headline: SVG text with a blue→purple gradient outline
 * at rest; on hover, a spring-smoothed radial mask reveals the gradient
 * fill following the cursor. Screen readers get plain text; reduced-motion
 * users see the original gradient text with no chasing.
 */
export function TextHoverEffect({ text }: TextHoverEffectProps) {
  const svgRef = useRef<SVGSVGElement>(null)
  const reduced = useReducedMotion()
  const [hovered, setHovered] = useState(false)

  const mouseX = useMotionValue(-300)
  const mouseY = useMotionValue(-300)
  const springX = useSpring(mouseX, { stiffness: 150, damping: 20, mass: 0.5 })
  const springY = useSpring(mouseY, { stiffness: 150, damping: 20, mass: 0.5 })

  if (reduced) {
    return <span className="text-gradient text-glow-purple">{text}</span>
  }

  const onMove = (e: MouseEvent<SVGSVGElement>) => {
    if (!window.matchMedia('(pointer: fine)').matches) return
    const rect = svgRef.current?.getBoundingClientRect()
    if (!rect) return
    mouseX.set(e.clientX - rect.left)
    mouseY.set(e.clientY - rect.top)
  }

  const onLeave = () => {
    setHovered(false)
    mouseX.set(-300)
    mouseY.set(-300)
  }

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 640 140"
      role="img"
      aria-label={text}
      className="block w-full cursor-default select-none"
      onMouseEnter={() => setHovered(true)}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      <defs>
        <linearGradient id="name-hover-gradient" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="50%" stopColor="#818cf8" />
          <stop offset="100%" stopColor="#a855f7" />
        </linearGradient>
        <radialGradient id="name-hover-radial">
          <stop offset="0%" stopColor="white" stopOpacity="1" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </radialGradient>
        <mask id="name-hover-mask">
          <motion.circle
            fill="url(#name-hover-radial)"
            style={{ cx: springX, cy: springY }}
            initial={{ r: 0 }}
            animate={{ r: hovered ? 140 : 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          />
        </mask>
      </defs>

      {/* resting outline — blue/purple gradient stroke */}
      <motion.text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="central"
        textLength="600"
        lengthAdjust="spacingAndGlyphs"
        fill="none"
        stroke="url(#name-hover-gradient)"
        strokeWidth={1.4}
        className="font-display font-bold"
        animate={{ opacity: hovered ? 1 : 0.6 }}
        transition={{ duration: 0.3 }}
      >
        {text}
      </motion.text>

      {/* gradient fill revealed around the cursor by the mask */}
      <motion.text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="central"
        textLength="600"
        lengthAdjust="spacingAndGlyphs"
        fill="url(#name-hover-gradient)"
        mask="url(#name-hover-mask)"
        className="font-display font-bold"
        initial={{ opacity: 0 }}
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.25 }}
      >
        {text}
      </motion.text>
    </svg>
  )
}
