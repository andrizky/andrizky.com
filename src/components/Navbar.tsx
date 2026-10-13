import * as React from 'react'
import { motion, useMotionValueEvent, useScroll, type Variants } from 'motion/react'
import { pick, useLanguage } from '../context/LanguageContext'
import { ui } from '../data/content'
import { useActiveSection } from '../hooks/useActiveSection'
import { LanguageToggle } from './LanguageToggle'
import { scrollToSection } from '../lib/scroll'

const SECTIONS = ['home', 'about', 'projects', 'experience', 'skills', 'contact'] as const

/**
 * Full-width bar at top; on scroll it plays the stagger choreography
 * (children exit one-by-one) and then springs into a floating pill.
 * Reverse cascade on the way back up.
 */

const containerVariants: Variants = {
  expanded: {
    top: 0,
    width: '100%',
    borderRadius: 0,
    y: 0,
    opacity: 1,
    transition: {
      top: { type: 'spring', damping: 20, stiffness: 300 },
      width: { type: 'spring', damping: 20, stiffness: 300 },
      borderRadius: { type: 'spring', damping: 20, stiffness: 300 },
      y: { type: 'spring', damping: 18, stiffness: 250 },
      opacity: { duration: 0.3 },
      staggerChildren: 0.07,
      delayChildren: 0.15,
    },
  },
  collapsed: {
    top: 12,
    width: 'auto',
    borderRadius: 999,
    y: 0,
    opacity: 1,
    transition: {
      top: { type: 'spring', damping: 20, stiffness: 300 },
      width: { type: 'spring', damping: 20, stiffness: 300 },
      borderRadius: { type: 'spring', damping: 20, stiffness: 300 },
      when: 'afterChildren',
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
  },
}

const logoVariants: Variants = {
  expanded: { opacity: 1, x: 0, rotate: 0, transition: { type: 'spring', damping: 15 } },
  collapsed: {
    opacity: [1, 0.2, 1],
    x: [0, -14, 0],
    rotate: [0, -180, 0],
    transition: { duration: 0.45, times: [0, 0.5, 1] },
  },
}

const itemVariants: Variants = {
  expanded: { opacity: 1, x: 0, scale: 1, transition: { type: 'spring', damping: 15 } },
  collapsed: {
    opacity: [1, 0.3, 1],
    x: [0, -12, 0],
    scale: [1, 0.95, 1],
    transition: { duration: 0.45, times: [0, 0.5, 1] },
  },
}

const toggleVariants: Variants = {
  expanded: { opacity: 1, x: 0, transition: { type: 'spring', damping: 15 } },
  collapsed: {
    opacity: [1, 0.2, 1],
    x: [0, 14, 0],
    transition: { duration: 0.45, times: [0, 0.5, 1] },
  },
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
      className="fixed left-1/2 z-50 backdrop-blur-md"
    >
      <nav
        className={`flex items-center transition-all duration-300 ${
          compact ? 'gap-5 px-5 py-2.5' : 'h-16 w-screen justify-between gap-4 px-6'
        }`}
      >
        {/* logo */}
        <motion.div variants={logoVariants} className="flex-shrink-0">
          <button
            type="button"
            onClick={() => go('home')}
            className={`font-mono font-bold tracking-tight text-text-primary transition-all duration-300 ${
              compact ? 'text-base' : 'text-lg'
            }`}
          >
            <span className="text-neon-blue">&lt;</span>AR
            <span className="text-gradient">/</span>
            <span className="text-neon-purple">&gt;</span>
          </button>
        </motion.div>

        {/* desktop links */}
        <motion.ul
          variants={itemVariants}
          className={`hidden items-center md:flex ${compact ? 'gap-0.5' : 'gap-1'}`}
        >
          {SECTIONS.slice(1).map((id) => (
            <li key={id}>
              <button
                type="button"
                onClick={() => go(id)}
                className={`nav-bloom group px-3 font-mono transition-colors ${
                  compact ? 'py-1.5 text-xs' : 'py-2 text-sm'
                } ${active === id ? 'text-neon-blue' : 'text-text-secondary hover:text-neon-blue'}`}
              >
                <span aria-hidden className="nav-bloom-glow" />
                <span className="relative z-10">
                  <span className="mr-1 text-xs text-neon-purple">.</span>
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

        {/* toggle */}
        <motion.div variants={toggleVariants} className="flex items-center">
          <LanguageToggle />
        </motion.div>
      </nav>
    </motion.header>
  )
}
