import * as React from 'react'
import { motion, useMotionValueEvent, useScroll, type Variants } from 'motion/react'
import { Menu } from 'lucide-react'
import { pick, useLanguage } from '../context/LanguageContext'
import { ui } from '../data/content'
import { useActiveSection } from '../hooks/useActiveSection'
import { LanguageToggle } from './LanguageToggle'
import { scrollToSection } from '../lib/scroll'

const SECTIONS = ['home', 'about', 'projects', 'experience', 'skills', 'contact'] as const

const EXPAND_SCROLL_THRESHOLD = 80

/**
 * Theatrical collapse morph — adapted from the 21st.dev
 * `animated-nav-framer` component pattern: the navbar collapses into a
 * tiny circle with links staggering out one by one, and expands back
 * with a spring cascade.
 */
const containerVariants: Variants = {
  expanded: {
    width: 'auto',
    transition: {
      type: 'spring',
      damping: 20,
      stiffness: 300,
      staggerChildren: 0.07,
      delayChildren: 0.2,
    },
  },
  collapsed: {
    width: '3rem',
    transition: {
      type: 'spring',
      damping: 20,
      stiffness: 300,
      when: 'afterChildren',
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
  },
}

const logoVariants: Variants = {
  expanded: { opacity: 1, x: 0, rotate: 0, transition: { type: 'spring', damping: 15 } },
  collapsed: { opacity: 0, x: -25, rotate: -180, transition: { duration: 0.3 } },
}

const itemVariants: Variants = {
  expanded: { opacity: 1, x: 0, scale: 1, transition: { type: 'spring', damping: 15 } },
  collapsed: { opacity: 0, x: -20, scale: 0.95, transition: { duration: 0.2 } },
}

const toggleVariants: Variants = {
  expanded: { opacity: 1, x: 0, transition: { type: 'spring', damping: 15 } },
  collapsed: { opacity: 0, x: 20, transition: { duration: 0.2 } },
}

const collapsedIconVariants: Variants = {
  expanded: { opacity: 0, scale: 0.8, transition: { duration: 0.2 } },
  collapsed: {
    opacity: 1,
    scale: 1,
    transition: { type: 'spring', damping: 15, stiffness: 300, delay: 0.15 },
  },
}

export function Navbar() {
  const { lang } = useLanguage()
  const [expanded, setExpanded] = React.useState(true)
  const active = useActiveSection([...SECTIONS])

  const { scrollY } = useScroll()
  const lastScrollY = React.useRef(0)
  const scrollPositionOnCollapse = React.useRef(0)

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const previous = lastScrollY.current

    if (expanded && latest > previous && latest > 150) {
      setExpanded(false)
      scrollPositionOnCollapse.current = latest
    } else if (
      !expanded &&
      latest < previous &&
      scrollPositionOnCollapse.current - latest > EXPAND_SCROLL_THRESHOLD
    ) {
      setExpanded(true)
    }

    lastScrollY.current = latest
  })

  const go = (id: string) => {
    if (!expanded) {
      setExpanded(true)
      return
    }
    scrollToSection(`#${id}`)
  }

  return (
    <div className="fixed top-6 left-1/2 z-50 -translate-x-1/2">
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={expanded ? 'expanded' : 'collapsed'}
        variants={containerVariants}
        whileHover={!expanded ? { scale: 1.1 } : {}}
        whileTap={!expanded ? { scale: 0.95 } : {}}
        onClick={!expanded ? () => setExpanded(true) : undefined}
        className={`flex h-12 items-center overflow-hidden rounded-full border bg-bg/85 shadow-lg backdrop-blur-md ${
          expanded ? 'border-line/80' : 'cursor-pointer border-neon-purple/40 shadow-[0_0_20px_rgba(139,92,246,0.35)]'
        }`}
      >
        {/* logo */}
        <motion.div
          variants={logoVariants}
          className="flex flex-shrink-0 items-center pl-4 pr-2"
        >
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              go('home')
            }}
            className="font-mono text-base font-bold tracking-tight text-text-primary"
          >
            <span className="text-neon-blue">&lt;</span>AR
            <span className="text-gradient">/</span>
            <span className="text-neon-purple">&gt;</span>
          </button>
        </motion.div>

        {/* links + toggle */}
        <motion.div
          className={`flex items-center gap-0.5 pr-3 ${!expanded ? 'pointer-events-none' : ''}`}
        >
          {SECTIONS.slice(1).map((id) => {
            return (
              <motion.button
                key={id}
                variants={itemVariants}
                onClick={(e) => {
                  e.stopPropagation()
                  go(id)
                }}
                className={`nav-bloom group relative px-3 py-1.5 font-mono text-xs transition-colors ${
                  active === id ? 'text-neon-blue' : 'text-text-secondary hover:text-neon-blue'
                }`}
              >
                <span aria-hidden className="nav-bloom-glow" />
                <span className="relative z-10">
                  <span className="mr-1 text-xs text-neon-purple">.</span>
                  {pick(lang, ui.nav[id])}
                </span>
                <span
                  className={`relative z-10 mt-0.5 block h-px origin-center bg-gradient-to-r from-neon-blue to-neon-purple transition-all duration-300 ${
                    active === id ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0'
                  }`}
                />
              </motion.button>
            )
          })}

          <motion.span variants={toggleVariants} className="pl-1">
            <LanguageToggle />
          </motion.span>
        </motion.div>

        {/* collapsed orb icon */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <motion.div
            variants={collapsedIconVariants}
            animate={expanded ? 'expanded' : 'collapsed'}
          >
            <Menu className="h-5 w-5 text-neon-purple" />
          </motion.div>
        </div>
      </motion.nav>
    </div>
  )
}
