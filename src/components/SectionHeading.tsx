import { motion } from 'motion/react'
import { useLanguage, pick } from '../context/LanguageContext'
import { ui } from '../data/content'

interface SectionHeadingProps {
  id: 'about' | 'projects' | 'experience' | 'skills' | 'contact'
  index: string
  subtitle?: { en: string; id: string }
}

export function SectionHeading({ id, index, subtitle }: SectionHeadingProps) {
  const { lang } = useLanguage()

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="mb-12"
    >
      <div className="flex items-center gap-4">
        <span className="font-mono text-sm text-neon-blue">{'//'}</span>
        <h2 className="font-display text-3xl font-bold sm:text-4xl">
          <span className="text-gradient">{pick(lang, ui[id].title)}</span>
        </h2>
        <span className="font-mono text-sm text-text-muted">{index}</span>
        <div className="h-px flex-1 bg-gradient-to-r from-neon-blue/40 via-neon-purple/40 to-transparent" />
      </div>
      {subtitle && (
        <p className="mt-4 max-w-xl text-text-secondary">{pick(lang, subtitle)}</p>
      )}
    </motion.div>
  )
}
