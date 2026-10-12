import { skillGroups } from '../data/content'

const items = [...new Set(skillGroups.flatMap((g) => g.skills))]

function Row({ hidden }: { hidden?: boolean }) {
  return (
    <div aria-hidden={hidden} className="flex shrink-0 items-center gap-3 pr-3">
      {items.map((skill) => (
        <span
          key={skill}
          className="rounded-lg border border-line bg-surface/80 px-4 py-1.5 font-mono text-sm whitespace-nowrap text-text-secondary"
        >
          {skill}
        </span>
      ))}
    </div>
  )
}

/** Infinite tech-stack marquee (pure CSS animation, duplicated list for a seamless loop). */
export function TechMarquee() {
  return (
    <div className="relative overflow-hidden py-6">
      <div className="animate-marquee flex w-max">
        <Row />
        <Row hidden />
      </div>
      {/* edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-28 bg-gradient-to-r from-bg to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-28 bg-gradient-to-l from-bg to-transparent" />
    </div>
  )
}
