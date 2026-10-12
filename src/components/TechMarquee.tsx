import iconsData from './skill-icons.json'
import { skillGroups } from '../data/content'
import { pick, useLanguage } from '../context/LanguageContext'

/**
 * Maps each skill name (from content.ts) to its extracted brand SVG id.
 * Names not in the map (REST API, AI Agent, Google Apps Script,
 * Google Sheets, Linux) fall back to a neon dot.
 */
const ICON_MAP: Record<string, keyof typeof iconsData> = {
  React: 'react',
  'Next.js': 'nextjs2',
  TypeScript: 'typescript',
  'Tailwind CSS': 'tailwindcss',
  Motion: 'framer',
  Vite: 'vitejs',
  Astro: 'astro',
  'HTML/CSS': 'html5',
  'Node.js': 'nodejs',
  PostgreSQL: 'postgresql',
  SQLite: 'sqlite',
  Supabase: 'supabase',
  GraphQL: 'graphql',
  Git: 'git',
  Docker: 'docker',
  Cloudflare: 'cloudflare',
  Vercel: 'vercel',
  Netlify: 'netlify2',
  n8n: 'n8n',
  Canva: 'canva',
}

/** Brand icon for a skill name — original SVG, falls back to a neon dot. */
export function SkillIcon({ name }: { name: string }) {
  const id = ICON_MAP[name]
  if (!id) {
    return <span className="inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-neon-purple/70" />
  }
  const svg = iconsData[id].light
  return (
    <span
      className="inline-flex h-4 w-4 shrink-0 items-center justify-center [&>svg]:h-4 [&>svg]:w-4"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  )
}

function MarqueeRow({
  skills,
  label,
  reverse,
}: {
  skills: string[]
  label: string
  reverse?: boolean
}) {
  return (
    <div className="py-3">
      <p className="mb-1.5 font-mono text-xs text-neon-purple">
        {'//'} {label}
      </p>
      <div className="relative overflow-hidden">
        <div
          className={`animate-marquee flex w-max ${reverse ? '[animation-direction:reverse]' : ''}`}
        >
          {[0, 1].map((copy) => (
            <div
              key={copy}
              aria-hidden={copy === 1}
              className="flex shrink-0 items-center gap-3 pr-3"
            >
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="flex items-center gap-2 rounded-lg border border-line bg-surface/80 px-3 py-1.5 font-mono text-sm whitespace-nowrap text-text-secondary"
                >
                  <SkillIcon name={skill} />
                  {skill}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/**
 * Tech marquee — one scrolling row per skill group (frontend / backend /
 * tools), each with a small mono label. The middle row scrolls the
 * opposite direction for depth. Pure CSS, duplicated list per row for a
 * seamless loop.
 */
export function TechMarquee() {
  const { lang } = useLanguage()

  return (
    <div className="relative">
      {skillGroups.map((group, i) => (
        <MarqueeRow
          key={group.label.en}
          skills={group.skills}
          label={pick(lang, group.label)}
          reverse={i % 2 === 1}
        />
      ))}
      {/* edge fades spanning all rows */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-28 bg-gradient-to-r from-bg to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-28 bg-gradient-to-l from-bg to-transparent" />
    </div>
  )
}
