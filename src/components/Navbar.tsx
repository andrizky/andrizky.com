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
  const [hovered, setHovered] = useState<string | null>(null)
  const active = useActiveSection([...SECTIONS])

  // morph into a floating pill once the page is scrolled
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
      animate={{
        top: compact ? 12 : 0,
        maxWidth: compact ? 'fit-content' : '100%',
        borderRadius: compact ? 999 : 0,
      }}
      transition={{ type: 'spring', stiffness: 260, damping: 30 }}
      className={`fixed inset-x-0 z-50 mx-auto overflow-hidden border backdrop-blur-md ${
        compact
          ? 'border-line/80 bg-bg/90 shadow-[0_8px_32px_rgba(0,0,0,0.45),0_0_24px_rgba(99,102,241,0.12)]'
          : 'border-line/60 bg-bg/70'
      }`}
    >
      <nav
        className={`flex items-center transition-all duration-300 ${
          compact ? 'gap-5 px-5 py-2.5' : 'h-16 justify-between gap-4 px-6'
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
        <ul
          className={`hidden items-center transition-all duration-300 md:flex ${
            compact ? 'gap-0.5' : 'gap-1'
          }`}
        >
          {SECTIONS.slice(1).map((id) => {
            const isHovered = hovered === id
            return (
              <li key={id}>
                <button
                  type="button"
                  onClick={() => go(id)}
                  onMouseEnter={() => setHovered(id)}
                  onMouseLeave={() => setHovered((h) => (h === id ? null : h))}
                  className={`group relative px-3 font-mono transition-colors ${
                    compact ? 'py-1.5 text-xs' : 'py-2 text-sm'
                  } ${active === id || isHovered ? 'text-neon-blue' : 'text-text-secondary hover:text-neon-blue'}`}
                >
                  {/* spring pill — one element morphing between links */}
                  {isHovered && (
                    <motion.span
                      layoutId="nav-hover-pill"
                      aria-hidden
                      className="absolute inset-0 rounded-full border border-neon-blue/30 bg-gradient-to-r from-neon-blue/15 via-indigo-400/12 to-neon-purple/15 shadow-[0_0_18px_rgba(99,102,241,0.25)]"
                      transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                    />
                  )}
                  <span className="relative z-10">
                    <span className="mr-1 text-xs text-neon-purple">.</span>
                    {pick(lang, ui.nav[id])}
                  </span>
                  {/* underline — persistent on the active section */}
                  <span
                    className={`relative z-10 mt-0.5 block h-px origin-center bg-gradient-to-r from-neon-blue to-neon-purple transition-all duration-300 ${
                      active === id ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0'
                    }`}
                  />
                </button>
              </li>
            )
          })}
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
