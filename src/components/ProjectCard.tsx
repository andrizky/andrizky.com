import { motion, useMotionValue, useSpring, useReducedMotion } from 'motion/react'
import { ExternalLink } from 'lucide-react'
import { GithubIcon } from './icons'
import type { MouseEvent } from 'react'
import type { Project } from '../data/content'
import { pick, useLanguage } from '../context/LanguageContext'
import { ui } from '../data/content'

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  const { lang } = useLanguage()
  const reduced = useReducedMotion()

  // 3D tilt toward the cursor
  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)
  const sRotateX = useSpring(rotateX, { stiffness: 200, damping: 20 })
  const sRotateY = useSpring(rotateY, { stiffness: 200, damping: 20 })

  const onTilt = (e: MouseEvent<HTMLElement>) => {
    if (reduced) return
    const rect = e.currentTarget.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width - 0.5
    const py = (e.clientY - rect.top) / rect.height - 0.5
    rotateY.set(px * 8)
    rotateX.set(-py * 8)
  }

  const resetTilt = () => {
    rotateX.set(0)
    rotateY.set(0)
  }

  const links = (
    <div className="flex gap-1.5">
      {project.repo && (
        <a
          href={project.repo}
          target="_blank"
          rel="noreferrer"
          aria-label={`${project.title} — ${pick(lang, ui.projects.code)}`}
          className="rounded-md bg-bg/60 p-2 text-text-secondary backdrop-blur-sm transition-colors hover:bg-neon-purple/15 hover:text-neon-purple"
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
          className="rounded-md bg-bg/60 p-2 text-text-secondary backdrop-blur-sm transition-colors hover:bg-neon-blue/15 hover:text-neon-blue"
        >
          <ExternalLink size={18} />
        </a>
      )}
    </div>
  )

  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, delay: (index % 3) * 0.1, ease: 'easeOut' }}
      whileHover={reduced ? undefined : { y: -6 }}
      onMouseMove={onTilt}
      onMouseLeave={resetTilt}
      style={{ rotateX: sRotateX, rotateY: sRotateY, transformPerspective: 900 }}
      className="card-hover-glow group relative flex flex-col overflow-hidden rounded-xl border border-line bg-surface/80 backdrop-blur-sm"
    >
      {project.image ? (
        <div className="relative aspect-[16/10] overflow-hidden border-b border-line">
          <img
            src={project.image}
            alt={project.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {/* scrim for legibility of the overlaid controls */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-bg/80 via-bg/10 to-bg/70" />
          <div className="absolute inset-x-0 top-0 flex items-start justify-between p-4">
            <span className="font-mono text-sm text-text-secondary">
              {String(index + 1).padStart(2, '0')}
            </span>
            {links}
          </div>
        </div>
      ) : (
        <div className="flex items-start justify-between p-6 pb-0">
          <span className="font-mono text-sm text-text-muted">
            {String(index + 1).padStart(2, '0')}
          </span>
          {links}
        </div>
      )}

      <div className="flex flex-1 flex-col p-6">
        <h3 className="flex items-center gap-2 font-display text-xl font-semibold text-text-primary transition-colors group-hover:text-neon-blue">
          {project.title}
          {project.featured && (
            <span className="rounded-full bg-gradient-to-r from-neon-blue-deep to-neon-purple px-2 py-0.5 font-mono text-[10px] font-medium tracking-wider text-white">
              ★
            </span>
          )}
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
      </div>
    </motion.article>
  )
}
