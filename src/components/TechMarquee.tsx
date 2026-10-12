import { skillGroups } from '../data/content'

function MarqueeRow({ skills, reverse }: { skills: string[]; reverse?: boolean }) {
  return (
    <div className="relative overflow-hidden py-1.5">
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
                className="rounded-lg border border-line bg-surface/80 px-4 py-1.5 font-mono text-sm whitespace-nowrap text-text-secondary"
              >
                {skill}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

/**
 * Tech marquee — one scrolling row per skill group (frontend / backend /
 * tools). The middle row scrolls the opposite direction for depth.
 * Pure CSS, duplicated list per row for a seamless loop.
 */
export function TechMarquee() {
  return (
    <div className="mx-auto max-w-6xl px-6">
      <div className="relative py-6">
        {skillGroups.map((group, i) => (
          <MarqueeRow key={group.label.en} skills={group.skills} reverse={i % 2 === 1} />
        ))}
        {/* edge fades spanning all rows */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-28 bg-gradient-to-r from-bg to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-28 bg-gradient-to-l from-bg to-transparent" />
      </div>
    </div>
  )
}
