import * as React from 'react'
import { motion, useMotionValueEvent, useScroll, type Variants } from 'motion/react'
import { pick, useLanguage } from '../context/LanguageContext'
import { ui } from '../data/content'
import { useActiveSection } from '../hooks/useActiveSection'
import { LanguageToggle } from './LanguageToggle'
import { scrollToSection } from '../lib/scroll'

const SECTIONS = ['home', 'about', 'projects', 'experience', 'skills', 'contact'] as const

/**
 * Full-width bar at top; on scroll it springs into a floating pill.
 * Everything — top, width, radius, vertical padding and text scale —
 * rides the same critically-damped spring so the whole morph is
 * perfectly synchronized.
 */

const SPRING = { type: 'spring', damping: 35, stiffness: 300 } as const

const containerVariants: Variants = {
  expanded: {
    top: 0,
    width: '100%',
    borderRadius: 0,
    paddingTop: 8,
    paddingBottom: 8,
    y: 0,
    opacity: 1,
    transition: {
      ...SPRING,
      y: { type: 'spring', damping: 35, stiffness: 250 },
      opacity: { duration: 0.3 },
    },
  },
  collapsed: {
    top: 12,
    width: 'auto',
    borderRadius: 999,
    paddingTop: 10,
    paddingBottom: 10,
    y: 0,
    opacity: 1,
    transition: {
      ...SPRING,
    },
  },
}

const logoVariants: Variants = {
  expanded: { scale: 1.125, opacity: 1, x: 0, transition: SPRING },
  collapsed: { scale: 1, opacity: 1, x: 0, transition: SPRING },
}

const itemVariants: Variants = {
  expanded: { scale: 1.167, opacity: 1, x: 0, transition: SPRING },
  collapsed: { scale: 1, opacity: 1, x: 0, transition: SPRING },
}

const toggleVariants: Variants = {
  expanded: { scale: 1.09, opacity: 1, x: 0, transition: SPRING },
  collapsed: { scale: 1, opacity: 1, x: 0, transition: SPRING },
}

export function Navbar() {
  const { lang } = useLanguage()
  const [compact, setCompact] = React.useState(false)
  const active = useActiveSection([...SECTIONS])

  // morph full-width bar → floating pill once the page is scrolled
  const { scrollY } = useScroll()
  useMotionValueEvent(scrollY, 'change', (y) => {
    setCompact(y > 40)
  })

  const go = (id: string) => {
    scrollToSection(`#${id}`)
  }

  return (
    <motion.header
      initial={false}
      animate={compact ? 'collapsed' : 'expanded'}
      variants={containerVariants}
      style={{ x: '-50%' }}
      className={`fixed left-1/2 z-50 border backdrop-blur-md transition-colors duration-300 ${
        compact ? 'border-line/80' : 'border-line/60'
      }`}
    >
      <nav className="flex h-12 items-center justify-between">
        {/* logo — rendered at pill size, scaled up when expanded */}
        <motion.div variants={logoVariants} style={{ originX: 0, originY: 0.5 }} className="flex-shrink-0">
          <button
            type="button"
            onClick={() => go('home')}
            className="px-5 font-mono text-base font-bold tracking-tight text-text-primary"
          >
            <span className="text-neon-blue">&lt;</span>AR
            <span className="text-gradient">/</span>
            <span className="text-neon-purple">&gt;</span>
          </button>
        </motion.div>

        {/* desktop links — rendered at pill size, scaled up when expanded */}
        <motion.ul
          variants={itemVariants}
          className="hidden items-center gap-0.5 md:flex"
        >
          {SECTIONS.slice(1).map((id) => (
            <li key={id}>
              <button
                type="button"
                onClick={() => go(id)}
                className={`nav-bloom group px-3 py-1.5 font-mono text-xs transition-colors ${
                  active === id ? 'text-neon-blue' : 'text-text-secondary hover:text-neon-blue'
                }`}
              >
                <span aria-hidden className="nav-bloom-glow" />
                <span className="relative z-10">
                  <span className="mr-1 text-[10px] text-neon-purple">.</span>
                  {pick(lang, ui.nav[id])}
                </span>
                <span
                  className={`relative z-10 mt-0.5 block h-px origin-center bg-gradient-to-r from-neon-blue to-neon-purple transition-all duration-300 ${
                    active === id
                      ? 'scale-x-100 opacity-100'
                      : 'scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-50'
                  }`}
                />
              </button>
            </li>
          ))}
        </motion.ul>

        {/* toggle — rendered at pill size, scaled up when expanded */}
        <motion.div variants={toggleVariants} className="flex items-center pr-5">
          <LanguageToggle />
        </motion.div>
      </nav>
    </motion.header>
  )
}
