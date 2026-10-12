import { Heart, Mail } from 'lucide-react'
import {
  GithubIcon,
  InstagramIcon,
  LinkedinIcon,
  TelegramIcon,
  WhatsappIcon,
  XIcon,
} from './icons'
import { pick, useLanguage } from '../context/LanguageContext'
import { socials, ui } from '../data/content'
import { scrollToSection } from '../lib/scroll'

const links = [
  { href: socials.github, icon: GithubIcon, label: 'GitHub' },
  { href: socials.linkedin, icon: LinkedinIcon, label: 'LinkedIn' },
  { href: socials.telegram, icon: TelegramIcon, label: 'Telegram' },
  { href: socials.whatsapp, icon: WhatsappIcon, label: 'WhatsApp' },
  { href: socials.instagram, icon: InstagramIcon, label: 'Instagram' },
  { href: socials.twitter, icon: XIcon, label: 'X (Twitter)' },
  { href: `mailto:${socials.email}`, icon: Mail, label: 'Email' },
]

export function Footer() {
  const { lang } = useLanguage()
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-line/60 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-5 px-6">
        <div className="flex gap-4">
          {links.map(({ href, icon: Icon, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              aria-label={label}
              className="rounded-md p-2 text-text-secondary transition-all hover:-translate-y-0.5 hover:bg-neon-purple/10 hover:text-neon-purple"
            >
              <Icon size={18} />
            </a>
          ))}
        </div>

        <button
          type="button"
          onClick={() => scrollToSection('#home')}
          className="font-mono text-lg font-bold"
        >
          <span className="text-neon-blue">&lt;</span>AR<span className="text-gradient">/</span>
          <span className="text-neon-purple">&gt;</span>
        </button>

        <p className="flex items-center gap-1.5 text-sm text-text-muted">
          © {year} · {pick(lang, ui.contact.copyright)} · with
          <Heart size={13} className="fill-neon-pink text-neon-pink" />and
          <span className="text-gradient font-medium">React</span>
        </p>
      </div>
    </footer>
  )
}
