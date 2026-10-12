import { motion } from 'motion/react'
import { pick, useLanguage } from '../context/LanguageContext'
import { skillGroups, ui } from '../data/content'
import { SectionHeading } from '../components/SectionHeading'
import { SkillIcon } from '../components/TechMarquee'

export function Skills() {
  const { lang } = useLanguage()

  return (
    <section id="skills" className="mx-auto max-w-6xl px-6 py-28">
      <SectionHeading id="skills" index="04" subtitle={ui.skills.subtitle} />

      <div className="grid gap-6 md:grid-cols-3">
        {skillGroups.map((group, gi) => (
          <motion.div
            key={group.label.en}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.55, delay: gi * 0.12, ease: 'easeOut' }}
            className="card-glow rounded-xl border border-line bg-surface/80 p-6 backdrop-blur-sm"
          >
            <h3 className="mb-5 flex items-center gap-3 font-display text-lg font-semibold">
              <span className="font-mono text-sm text-neon-purple">{'//'}</span>
              {pick(lang, group.label)}
            </h3>
            <div className="flex flex-wrap gap-2.5">
              {group.skills.map((skill) => (
                <span
                  key={skill}
                  className="flex cursor-default items-center gap-2 rounded-lg border border-line bg-surface-light/80 px-3 py-1.5 font-mono text-xs text-text-secondary transition-all hover:-translate-y-0.5 hover:border-neon-blue/60 hover:text-neon-blue hover:shadow-[0_0_16px_rgba(56,189,248,0.25)]"
                >
                  <SkillIcon name={skill} />
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
