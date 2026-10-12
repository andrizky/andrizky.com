import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  r: number
  color: string
  alpha: number
}

const COLORS = ['56,189,248', '168,85,247', '129,140,248'] // blue, purple, indigo
const REPEL_RADIUS = 130 // px — cursor pushes particles away within this range
const LINK_DISTANCE = 100 // px — faint lines between nearby particles

/**
 * Canvas particle field: slow-drifting neon dots that flee from the
 * cursor and link to nearby neighbors (constellation style).
 * Pure canvas — zero React re-renders. Drift + links always run;
 * cursor repulsion activates whenever pointer events fire.
 */
export function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    // Respect the user's motion preference, but never skip based on
    // `(pointer: fine)` — touchscreen laptops report touch as the primary
    // pointer even with a mouse connected.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    let raf = 0
    let w = 0
    let h = 0
    let particles: Particle[] = []
    const mouse = { x: -9999, y: -9999 }

    const spawn = () => {
      const count = Math.min(280, Math.floor((w * h) / 5500))
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 1.6 + 0.6,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        alpha: Math.random() * 0.4 + 0.25,
      }))
    }

    const resize = () => {
      w = window.innerWidth
      h = window.innerHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      spawn()
    }

    const onMove = (e: PointerEvent) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
    }
    const onLeave = () => {
      mouse.x = -9999
      mouse.y = -9999
    }

    const tick = () => {
      ctx.clearRect(0, 0, w, h)

      // move + cursor repulsion
      for (const p of particles) {
        p.x += p.vx
        p.y += p.vy
        // wrap around edges
        if (p.x < -10) p.x = w + 10
        else if (p.x > w + 10) p.x = -10
        if (p.y < -10) p.y = h + 10
        else if (p.y > h + 10) p.y = -10

        const dx = p.x - mouse.x
        const dy = p.y - mouse.y
        const d2 = dx * dx + dy * dy
        if (d2 < REPEL_RADIUS * REPEL_RADIUS && d2 > 0.01) {
          const d = Math.sqrt(d2)
          const force = (REPEL_RADIUS - d) / REPEL_RADIUS
          p.x += (dx / d) * force * 2.2
          p.y += (dy / d) * force * 2.2
        }
      }

      // faint links between neighbors
      ctx.lineWidth = 1
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i]
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const d2 = dx * dx + dy * dy
          if (d2 < LINK_DISTANCE * LINK_DISTANCE) {
            const t = 1 - Math.sqrt(d2) / LINK_DISTANCE
            ctx.strokeStyle = `rgba(99,102,241,${(t * 0.3).toFixed(3)})`
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }
      }

      // dots
      for (const p of particles) {
        ctx.fillStyle = `rgba(${p.color},${p.alpha.toFixed(3)})`
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fill()
      }

      raf = requestAnimationFrame(tick)
    }

    resize()
    tick()

    window.addEventListener('resize', resize)
    window.addEventListener('pointermove', onMove, { passive: true })
    document.documentElement.addEventListener('mouseleave', onLeave)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onMove)
      document.documentElement.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return <canvas ref={canvasRef} aria-hidden className="pointer-events-none absolute inset-0" />
}
