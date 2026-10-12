import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { ChevronDown, FolderGit2, Mail } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from '../components/icons'
import { NovaGlowButton } from '../components/NovaGlowButton'
import avatarImg from '../assets/avatar.jpeg'
import { pick, useLanguage } from '../context/LanguageContext'
import { socials, ui } from '../data/content'
import { scrollToSection } from '../lib/scroll'

function useTypewriter(words: string[], speed = 75, pause = 1800) {
  const [text, setText] = useState('')
  const [wordIndex, setWordIndex] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    setText('')
    setWordIndex(0)
    setDeleting(false)
  }, [words])

  useEffect(() => {
    const word = words[wordIndex % words.length]
    let timeout: ReturnType<typeof setTimeout>

    if (!deleting && text === word) {
      timeout = setTimeout(() => setDeleting(true), pause)
    } else if (deleting && text === '') {
      setDeleting(false)
      setWordIndex((i) => (i + 1) % words.length)
    } else {
      timeout = setTimeout(
        () => setText(word.slice(0, text.length + (deleting ? -1 : 1))),
        deleting ? speed / 2 : speed,
      )
    }
    return () => clearTimeout(timeout)
  }, [text, deleting, wordIndex, words, speed, pause])

  return text
}

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.2 } },
}
const item = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
}

export function Hero() {
  const { lang } = useLanguage()
  const reduced = useReducedMotion()
  const roles = ui.hero.roles[lang]
  const typed = useTypewriter(roles)

  return (
    <section id="home" className="relative flex min-h-screen flex-col items-center justify-center px-6 pt-20 pb-28">
      <motion.div variants={container} initial="hidden" animate="show" className="max-w-4xl text-center">
        {/* avatar + name row */}
        <div className="flex flex-col items-center gap-6 md:flex-row md:gap-10">
          <motion.div variants={item} className="flex justify-center">
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              className="relative"
            >
              {/* glow underneath */}
              <div
                aria-hidden
                className="absolute inset-0 rounded-full bg-gradient-to-br from-neon-blue/40 to-neon-purple/40 blur-2xl"
              />
              {/* rotating gradient ring */}
              <div
                aria-hidden
                className="animate-spin-slow absolute -inset-1.5 rounded-full"
                style={{ background: 'conic-gradient(from 0deg, #38bdf8, #a855f7, #ec4899, #38bdf8)' }}
              />
              {/* dashed orbit */}
              <div aria-hidden className="absolute -inset-4 rounded-full border border-dashed border-neon-purple/30" />
              {/* orbiting dot */}
              <div
                aria-hidden
                className="animate-spin-slow absolute -inset-4"
                style={{ animationDuration: '14s', animationDirection: 'reverse' }}
              >
                <span className="absolute top-0 left-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-neon-blue shadow-[0_0_8px_rgba(56,189,248,0.9)]" />
              </div>
              <img
                src={avatarImg}
                alt={ui.hero.name}
                width={160}
                height={160}
                className="relative h-24 w-24 rounded-full border-4 border-bg object-cover md:h-36 md:w-36"
              />
            </motion.div>
          </motion.div>

          <motion.div variants={item} className="text-center md:text-left">
            <p className="font-mono text-lg text-neon-blue">
              {pick(lang, ui.hero.greeting)}
            </p>

            <motion.h1
              initial={reduced ? false : { opacity: 0, y: 44, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.8, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-5xl font-bold tracking-tight sm:text-7xl md:text-7xl lg:text-8xl"
            >
              <span className="text-gradient text-glow-purple">Andri Rizky P</span>
            </motion.h1>

            {/* typewriter role */}
            <div className="mt-4 flex items-center justify-center gap-2 font-mono text-lg sm:text-2xl md:justify-start">
              <span className="text-text-secondary">&gt;</span>
              <span className="text-neon-blue text-glow-blue">{typed}</span>
              <span className="inline-block h-6 w-[2px] animate-pulse bg-neon-purple sm:h-7" />
            </div>
          </motion.div>
        </div>

        <motion.p variants={item} className="mx-auto mt-8 max-w-2xl leading-relaxed text-text-secondary">
          {pick(lang, ui.hero.tagline)}
        </motion.p>

        {/* CTAs */}
        <motion.div variants={item} className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <NovaGlowButton onClick={() => scrollToSection('#projects')}>
            <FolderGit2 size={16} />
            {pick(lang, ui.hero.viewWork)}
          </NovaGlowButton>
          <NovaGlowButton onClick={() => scrollToSection('#contact')}>
            <Mail size={16} />
            {pick(lang, ui.hero.contactMe)}
          </NovaGlowButton>
        </motion.div>

        {/* status badge */}
        <motion.div variants={item} className="mt-8 flex justify-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/70 px-4 py-1.5">
            <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse-dot" />
            <span className="font-mono text-xs text-text-secondary">
              {pick(lang, ui.hero.available)}
            </span>
          </span>
        </motion.div>

        {/* socials */}
        <motion.div variants={item} className="mt-6 flex justify-center gap-3">
          {[
            { href: socials.github, icon: GithubIcon, label: 'GitHub' },
            { href: socials.linkedin, icon: LinkedinIcon, label: 'LinkedIn' },
            { href: `mailto:${socials.email}`, icon: Mail, label: 'Email' },
          ].map(({ href, icon: Icon, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              aria-label={label}
              className="rounded-lg border border-line bg-surface/60 p-2.5 text-text-secondary transition-all hover:-translate-y-1 hover:border-neon-purple/60 hover:text-neon-purple hover:shadow-[0_0_20px_rgba(168,85,247,0.25)]"
            >
              <Icon size={20} />
            </a>
          ))}
        </motion.div>
      </motion.div>

      {/* scroll hint */}
      <motion.button
        type="button"
        onClick={() => scrollToSection('#about')}
        aria-label={pick(lang, ui.hero.scroll)}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="absolute bottom-8 hidden min-[700px]:flex flex-col items-center gap-1 text-text-muted transition-colors hover:text-neon-blue"
      >
        <span className="font-mono text-[10px] tracking-[0.25em] uppercase">
          {pick(lang, ui.hero.scroll)}
        </span>
        <motion.span animate={{ y: [0, 6, 0] }} transition={{ duration: 1.6, repeat: Infinity }}>
          <ChevronDown size={18} />
        </motion.span>
      </motion.button>
    </section>
  )
}
