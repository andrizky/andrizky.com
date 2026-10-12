import { useLanguage } from '../context/LanguageContext'

/** Small EN | ID toggle for the navbar. */
export function LanguageToggle() {
  const { lang, toggle } = useLanguage()

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle language / Ganti bahasa"
      className="group flex items-center gap-1 rounded-md border border-line bg-surface/60 px-2 py-1.5 font-mono text-xs text-text-secondary transition-colors hover:border-neon-purple/50 hover:text-text-primary"
    >
      <span className={lang === 'en' ? 'text-neon-blue' : 'text-text-muted'}>EN</span>
      <span className="text-text-muted">/</span>
      <span className={lang === 'id' ? 'text-neon-purple' : 'text-text-muted'}>ID</span>
    </button>
  )
}
