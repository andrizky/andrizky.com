import { ui } from '../data/content'
import { SectionHeading } from '../components/SectionHeading'
import { TechMarquee } from '../components/TechMarquee'

export function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-6xl px-6 py-28">
      <SectionHeading id="skills" index="04" subtitle={ui.skills.subtitle} />

      {/* scrolling skill bands — one row per category */}
      <div className="mt-4">
        <TechMarquee />
      </div>
    </section>
  )
}
