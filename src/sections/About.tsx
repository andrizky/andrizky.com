import { motion } from 'motion/react'
import { Code2, Layout, Sparkles, Zap } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import { ui } from '../data/content'
import { SectionHeading } from '../components/SectionHeading'

const icons = [Sparkles, Code2, Zap, Layout]

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

          {/* highlights */}
          <ul className="grid grid-cols-2 gap-3 pt-4">
            {highlights.map((h, i) => {
              const Icon = icons[i % icons.length]
              return (
                <li key={h} className="flex items-center gap-3 font-mono text-sm text-text-secondary">
                  <Icon size={15} className="shrink-0 text-neon-blue" />
                  {h}
                </li>
              )
            })}
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
            <p><span className="text-neon-purple">const</span> <span className="text-neon-blue">dev</span> <span className="text-text-muted">=</span> {'{'}</p>
            <p className="pl-4">name: <span className="text-green-400">'Andri'</span>,</p>
            <p className="pl-4">stack: [<span className="text-green-400">'React'</span>, <span className="text-green-400">'TS'</span>],</p>
            <p className="pl-4">focus: <span className="text-green-400">'UI/UX'</span>,</p>
            <p className="pl-4">coffee: <span className="text-neon-pink">Infinity</span>,</p>
            <p>{'}'};</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
