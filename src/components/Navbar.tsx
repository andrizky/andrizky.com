import * as React from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll, type Variants } from 'motion/react'
import { Menu, X } from 'lucide-react'
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
    height: 64,
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
    height: 48,
    borderRadius: 999,
    paddingTop: 0,
    paddingBottom: 0,
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
  const [open, setOpen] = React.useState(false)
  const active = useActiveSection([...SECTIONS])

  // morph full-width bar → floating pill once the page is scrolled
  const { scrollY } = useScroll()
  useMotionValueEvent(scrollY, 'change', (y) => {
    setCompact(y > 40)
  })

  // close the mobile menu with Escape
  React.useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const go = (id: string) => {
    setOpen(false)
    scrollToSection(`#${id}`)
  }

  return (
    <>
      <motion.header
        initial={false}
        animate={compact ? 'collapsed' : 'expanded'}
        variants={containerVariants}
        style={{ x: '-50%' }}
        className={`fixed left-1/2 z-50 border backdrop-blur-md transition-colors duration-300 ${
          compact ? 'border-line/80' : 'border-line/60'
        }`}
      >
      <nav className="flex h-full items-center justify-between">
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

        {/* toggle + mobile menu button */}
        <motion.div variants={toggleVariants} className="flex items-center gap-2 pr-4">
          <span className="hidden md:inline-flex">
            <LanguageToggle />
          </span>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            className="rounded-full border border-line/80 p-1.5 text-text-secondary transition-colors hover:border-neon-purple/50 hover:text-neon-purple md:hidden"
          >
            {open ? <X size={16} /> : <Menu size={16} />}
          </button>
        </motion.div>
      </nav>
      </motion.header>

      {/* mobile overlay menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed inset-0 z-40 flex flex-col justify-center bg-bg/95 px-8 backdrop-blur-xl md:hidden"
          >
            <nav>
              <ul className="space-y-2">
                {SECTIONS.slice(1).map((id, i) => (
                  <motion.li
                    key={id}
                    initial={{ opacity: 0, x: -24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.06 * i + 0.1, duration: 0.35, ease: 'easeOut' }}
                  >
                    <button
                      type="button"
                      onClick={() => go(id)}
                      className={`block w-full text-left font-mono text-2xl transition-colors ${
                        active === id ? 'text-neon-blue' : 'text-text-secondary hover:text-text-primary'
                      }`}
                    >
                      <span className="mr-3 font-mono text-sm text-neon-purple">
                        0{i + 1}.
                      </span>
                      {pick(lang, ui.nav[id])}
                    </button>
                  </motion.li>
                ))}
              </ul>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.06 * (SECTIONS.length - 1) + 0.2, duration: 0.35 }}
                className="mt-10 border-t border-line/60 pt-6"
              >
                <LanguageToggle />
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
