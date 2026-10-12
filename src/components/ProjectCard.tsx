import { motion } from 'motion/react'
import { ExternalLink } from 'lucide-react'
import { GithubIcon } from './icons'
import type { Project } from '../data/content'
import { pick, useLanguage } from '../context/LanguageContext'
import { ui } from '../data/content'

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  const { lang } = useLanguage()

  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, delay: (index % 3) * 0.1, ease: 'easeOut' }}
      className="card-glow group relative flex flex-col rounded-xl border border-line bg-surface/80 p-6 backdrop-blur-sm"
    >
      {/* top row */}
      <div className="mb-4 flex items-start justify-between">
        <span className="font-mono text-sm text-text-muted">{String(index + 1).padStart(2, '0')}</span>
        <div className="flex gap-1.5">
          {project.repo && (
            <a
              href={project.repo}
              target="_blank"
              rel="noreferrer"
              aria-label={`${project.title} — ${pick(lang, ui.projects.code)}`}
              className="rounded-md p-2 text-text-secondary transition-colors hover:bg-neon-purple/10 hover:text-neon-purple"
            >
              <GithubIcon size={18} />
            </a>
          )}
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noreferrer"
              aria-label={`${project.title} — ${pick(lang, ui.projects.demo)}`}
              className="rounded-md p-2 text-text-secondary transition-colors hover:bg-neon-blue/10 hover:text-neon-blue"
            >
              <ExternalLink size={18} />
            </a>
          )}
        </div>
      </div>

      <h3 className="font-display text-xl font-semibold text-text-primary transition-colors group-hover:text-neon-blue">
        {project.title}
      </h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-text-secondary">
        {pick(lang, project.description)}
      </p>

      <div className="mt-5 flex flex-wrap gap-2">
        {project.tech.map((t) => (
          <span
            key={t}
            className="rounded-full border border-line bg-surface-light/80 px-2.5 py-1 font-mono text-xs text-text-secondary transition-colors group-hover:border-neon-blue/30 group-hover:text-neon-blue/90"
          >
            {t}
          </span>
        ))}
      </div>

      {project.featured && (
        <span className="absolute -top-2.5 right-4 rounded-full bg-gradient-to-r from-neon-blue-deep to-neon-purple px-2.5 py-0.5 font-mono text-[10px] font-medium tracking-wider text-white uppercase">
          ★
        </span>
      )}
    </motion.article>
  )
}
