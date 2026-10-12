import { motion } from 'motion/react'
import { Send } from 'lucide-react'
import { GithubIcon, InstagramIcon, LinkedinIcon } from '../components/icons'
import { pick, useLanguage } from '../context/LanguageContext'
import { socials, ui } from '../data/content'
import { SectionHeading } from '../components/SectionHeading'

export function Contact() {
  const { lang } = useLanguage()
  const socialLinks = [
    { href: socials.github, icon: GithubIcon, label: 'GitHub' },
    { href: socials.linkedin, icon: LinkedinIcon, label: 'LinkedIn' },
    { href: socials.instagram, icon: InstagramIcon, label: 'Instagram' },
  ]

  return (
    <section id="contact" className="mx-auto max-w-6xl px-6 py-28">
      <SectionHeading id="contact" index="05" />

      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="mx-auto max-w-2xl text-center"
      >
        <p className="leading-relaxed text-text-secondary">{pick(lang, ui.contact.subtitle)}</p>

        <a
          href={`mailto:${socials.email}`}
          className="neon-button mt-10 rounded-lg bg-gradient-to-r from-neon-blue-deep to-neon-purple px-8 py-4 text-base text-white shadow-[0_0_28px_rgba(99,102,241,0.35)] hover:shadow-[0_0_44px_rgba(168,85,247,0.55)]"
        >
          <Send size={16} />
          {pick(lang, ui.contact.button)}
        </a>

        <p className="mt-8 font-mono text-sm text-text-muted">
          {'//'} {socials.email}
        </p>

        <div className="mt-6 flex justify-center gap-4">
          {socialLinks.map(({ href, icon: Icon, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              aria-label={label}
              className="rounded-lg border border-line bg-surface/60 p-3 text-text-secondary transition-all hover:-translate-y-1 hover:border-neon-blue/60 hover:text-neon-blue hover:shadow-[0_0_20px_rgba(56,189,248,0.25)]"
            >
              <Icon size={20} />
            </a>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
