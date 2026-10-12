import { useEffect, type ReactNode } from 'react'

interface NovaGlowButtonProps {
  children: ReactNode
  /** seconds per full rotation of the glow border */
  speed?: number
  /** scale applied on hover */
  hoverScale?: number
  /** show the diagonal shine sweep on hover */
  shine?: boolean
  className?: string
  onClick?: () => void
  type?: 'button' | 'submit'
}

/**
 * "Nova Glow Button" — recreation of the Framer Marketplace component
 * (https://www.framer.com/marketplace/components/nova-glow-button/).
 *
 * Structure (matching the original's 4 layers):
 *  1. outer <button>: dark surface, subtle border, ambient box-shadow,
 *     hover scale via transform
 *  2. glow-edge span: conic gradient ring masked to a 2px border,
 *     rotated via the --nova-glow-rotation CSS variable
 *  3. glow-blur span: same conic gradient outside the button, blurred —
 *     the neon aura
 *  4. shine span: diagonal white streak that sweeps across on hover
 *
 * The rotation is driven by requestAnimationFrame updating the CSS
 * variable once per frame (compositor-friendly). Honors
 * prefers-reduced-motion: the glow stays visible but stops rotating.
 */
export function NovaGlowButton({
  children,
  speed = 4,
  hoverScale = 1.04,
  shine = true,
  className = '',
  onClick,
  type = 'button',
}: NovaGlowButtonProps) {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const root = document.documentElement
    let raf = 0
    const start = performance.now()
    const tick = (now: number) => {
      const deg = ((now - start) / 1000 / speed) * 360
      root.style.setProperty('--nova-glow-rotation', `${(deg % 360).toFixed(2)}deg`)
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(raf)
      root.style.removeProperty('--nova-glow-rotation')
    }
  }, [speed])

  return (
    <button
      type={type}
      onClick={onClick}
      className={`nova-glow-btn ${className}`}
      style={{ '--nova-hover-scale': hoverScale } as unknown as Record<string, string>}
    >
      <span aria-hidden className="nova-glow-edge" />
      <span aria-hidden className="nova-glow-aura" />
      {shine && <span aria-hidden className="nova-glow-shine" />}
      <span className="nova-glow-content">{children}</span>
    </button>
  )
}
