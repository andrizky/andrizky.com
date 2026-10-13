import { Mail } from 'lucide-react'
import {
  GithubIcon,
  InstagramIcon,
  LinkedinIcon,
  TelegramIcon,
  WhatsappIcon,
  XIcon,
} from './icons'
import { socials } from '../data/content'

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
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-line/60 py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-5 px-6 sm:flex-row">
        <p className="text-sm text-text-muted">© {year} · Andri Rizky P</p>

        <div className="flex gap-3">
          {links.map(({ href, icon: Icon, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              aria-label={label}
              className="rounded-md p-2 text-text-secondary transition-all hover:-translate-y-0.5 hover:text-neon-purple"
            >
              <Icon size={18} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
