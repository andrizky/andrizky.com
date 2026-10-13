import { motion } from 'motion/react'
import { pick, useLanguage } from '../context/LanguageContext'
import { experience, ui } from '../data/content'
import { SectionHeading } from '../components/SectionHeading'

export function Experience() {
  const { lang } = useLanguage()

  return (
    <section id="experience" className="mx-auto max-w-6xl px-6 py-28">
      <SectionHeading id="experience" index="03" subtitle={ui.experience.subtitle} />

      <div className="relative ml-3 max-w-3xl md:ml-8">
        {/* animated line */}
        <motion.div
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="absolute top-0 left-0 h-full w-px origin-top bg-gradient-to-b from-neon-blue via-neon-purple to-transparent"
        />

        <div className="space-y-12">
          {experience.map((item, i) => (
            <motion.article
              key={`${item.role}-${item.period}`}
              initial={{ opacity: 0, x: 32 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.55, delay: i * 0.1, ease: 'easeOut' }}
              className="relative pl-10"
            >
              {/* node */}
              <span className="absolute top-1 -left-[9px] flex h-[19px] w-[19px] items-center justify-center rounded-full border border-neon-purple/60 bg-bg">
                <span className="h-2 w-2 rounded-full bg-gradient-to-br from-neon-blue to-neon-purple shadow-[0_0_10px_rgba(168,85,247,0.8)]" />
              </span>

              <span className="font-mono text-xs tracking-wider text-neon-blue">{item.period}</span>
              <h3 className="mt-1 font-display text-xl font-semibold">
                {item.role} <span className="text-text-muted">@</span>{' '}
                <span className="text-gradient">{item.company}</span>
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                {pick(lang, item.description)}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {item.tech.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-line bg-surface-light/60 px-2.5 py-0.5 font-mono text-xs text-text-secondary"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
