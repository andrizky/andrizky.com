import { motion } from 'motion/react'
import { useLanguage } from '../context/LanguageContext'
import { ui } from '../data/content'
import { SectionHeading } from '../components/SectionHeading'

export function About() {
  const { lang } = useLanguage()
  const paragraphs = ui.about.paragraphs[lang]
  const highlights = ui.about.highlights[lang]

  return (
    <section id="about" className="mx-auto max-w-6xl px-6 py-28">
      <SectionHeading id="about" index="01" />

      <div className="grid gap-10 md:grid-cols-3">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="space-y-4 leading-relaxed text-text-secondary md:col-span-2"
        >
          {paragraphs.map((p, i) => (
            <p key={i} className={i === 0 ? 'text-lg text-text-primary/90' : ''}>
              {p}
            </p>
          ))}

          {/* highlights — neon chips */}
          <ul className="flex flex-wrap gap-2.5 pt-4">
            {highlights.map((h) => (
              <li
                key={h}
                className="cursor-default rounded-full border border-line bg-surface-light/80 px-3.5 py-1.5 font-mono text-xs text-text-secondary transition-all hover:-translate-y-0.5 hover:border-neon-blue/60 hover:text-neon-blue hover:shadow-[0_0_16px_rgba(56,189,248,0.25)]"
              >
                {h}
              </li>
            ))}
          </ul>
        </motion.div>

        {/* decorative terminal card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
          className="gradient-border card-glow h-fit rounded-xl p-1"
        >
          <div className="rounded-lg bg-surface p-4 font-mono text-xs leading-relaxed">
            <div className="mb-3 flex gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-green-500/70" />
              <span className="ml-2 text-text-muted">~/portfolio</span>
            </div>
            <p>
              <span className="text-neon-purple">const</span>{' '}
              <span className="text-neon-blue">andrizky</span>{' '}
              <span className="text-text-muted">=</span> {'{'}
            </p>
            <p className="pl-4">
              role:{' '}
              <span className="text-green-400">'Full-Stack + AI Automation'</span>,
            </p>
            <p className="pl-4">also: [</p>
            <p className="pl-8">
              <span className="text-green-400">'Leader'</span>,
            </p>
            <p className="pl-8">
              <span className="text-green-400">'Designer'</span>,
            </p>
            <p className="pl-8">
              <span className="text-green-400">'Network Engineer'</span>,
            </p>
            <p className="pl-4">],</p>
            <p className="pl-4">
              mode: <span className="text-green-400">'all-at-once'</span>,
            </p>
            <p className="pl-4">
              coffee: <span className="text-neon-pink">Infinity</span>,
            </p>
            <p>{'}'};</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
