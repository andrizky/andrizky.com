import { useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react'
import { Menu, X } from 'lucide-react'
import { pick, useLanguage } from '../context/LanguageContext'
import { ui } from '../data/content'
import { useActiveSection } from '../hooks/useActiveSection'
import { LanguageToggle } from './LanguageToggle'
import { scrollToSection } from '../lib/scroll'

const SECTIONS = ['home', 'about', 'projects', 'experience', 'skills', 'contact'] as const

export function Navbar() {
  const { lang } = useLanguage()
  const [open, setOpen] = useState(false)
  const [compact, setCompact] = useState(false)
  const active = useActiveSection([...SECTIONS])

  // shrink the bar once the page is scrolled
  const { scrollY } = useScroll()
  useMotionValueEvent(scrollY, 'change', (y) => {
    setCompact(y > 40)
  })

  const go = (id: string) => {
    setOpen(false)
    scrollToSection(`#${id}`)
  }

  return (
    <motion.header
      animate={{ height: compact ? 48 : 64 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className={`fixed inset-x-0 top-0 z-50 overflow-hidden border-b backdrop-blur-md transition-colors duration-300 ${
        compact ? 'border-line/80 bg-bg/90 shadow-[0_4px_24px_rgba(0,0,0,0.35)]' : 'border-line/60 bg-bg/70'
      }`}
    >
      <nav
        className={`mx-auto flex max-w-6xl items-center justify-between px-6 transition-all duration-300 ${
          compact ? 'h-12' : 'h-16'
        }`}
      >
        {/* logo */}
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

        {/* desktop links */}
        <ul className="hidden items-center gap-1 md:flex">
          {SECTIONS.slice(1).map((id) => (
            <li key={id}>
              <button
                type="button"
                onClick={() => go(id)}
                className={`nav-bloom group px-3 font-mono transition-colors ${
                  compact ? 'py-1.5 text-xs' : 'py-2 text-sm'
                } ${active === id ? 'text-neon-blue' : 'text-text-secondary hover:text-neon-blue'}`}
              >
                {/* bloom layer — grows from center behind the text */}
                <span aria-hidden className="nav-bloom-glow" />
                <span className="relative z-10">
                  <span className="mr-1 text-xs text-neon-purple">.</span>
                  {pick(lang, ui.nav[id])}
                </span>
                {/* underline — persistent on the active section, faint on hover */}
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
        </ul>

        <div className="flex items-center gap-3">
          <LanguageToggle />
          {/* mobile hamburger */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            className="rounded-md border border-line p-2 text-text-secondary transition-colors hover:text-text-primary md:hidden"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {/* mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="overflow-hidden border-t border-line/60 bg-bg/95 backdrop-blur-md md:hidden"
          >
            {SECTIONS.slice(1).map((id, i) => (
              <motion.li
                key={id}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 * i }}
              >
                <button
                  type="button"
                  onClick={() => go(id)}
                  className={`block w-full px-6 py-3 text-left font-mono text-sm ${
                    active === id ? 'text-neon-blue' : 'text-text-secondary'
                  }`}
                >
                  <span className="mr-2 text-neon-purple">0{i + 1}.</span>
                  {pick(lang, ui.nav[id])}
                </button>
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
