import { pick, useLanguage } from '../context/LanguageContext'
import { projects, ui } from '../data/content'
import { SectionHeading } from '../components/SectionHeading'
import { ProjectCard } from '../components/ProjectCard'

export function Projects() {
  const { lang } = useLanguage()

  return (
    <section id="projects" className="mx-auto max-w-6xl px-6 py-28">
      <SectionHeading id="projects" index="02" subtitle={ui.projects.subtitle} />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, i) => (
          <ProjectCard key={project.title} project={project} index={i} />
        ))}
      </div>
      <p className="mt-10 text-center font-mono text-xs text-text-muted">
        {'//'} {pick(lang, ui.projects.subtitle)}
      </p>
    </section>
  )
}
