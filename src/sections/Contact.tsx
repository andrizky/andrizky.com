import { useState, type FormEvent } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { AlertCircle, CheckCircle2, Loader2, Mail, Phone, Send, User } from 'lucide-react'
import { NovaGlowButton } from '../components/NovaGlowButton'
import { pick, useLanguage } from '../context/LanguageContext'
import { CONTACT_WEBHOOK_URL, ui } from '../data/content'
import { SectionHeading } from '../components/SectionHeading'

type Status = 'idle' | 'sending' | 'success' | 'error'

interface FormErrors {
  name?: string
  email?: string
  message?: string
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function Contact() {
  const { lang } = useLanguage()
  const t = ui.contact.form

  const [status, setStatus] = useState<Status>('idle')
  const [errors, setErrors] = useState<FormErrors>({})
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '', website: '' }) // website = honeypot

  const validate = (): FormErrors => {
    const next: FormErrors = {}
    if (!form.name.trim()) next.name = pick(lang, t.required)
    if (!form.email.trim()) next.email = pick(lang, t.required)
    else if (!EMAIL_RE.test(form.email)) next.email = pick(lang, t.invalidEmail)
    if (!form.message.trim()) next.message = pick(lang, t.required)
    return next
  }

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (status === 'sending') return

    const validation = validate()
    setErrors(validation)
    if (Object.keys(validation).length > 0) return

    // honeypot filled → almost certainly a bot; pretend success, send nothing
    if (form.website) {
      setStatus('success')
      return
    }

    setStatus('sending')
    try {
      const controller = new AbortController()
      const timeout = setTimeout(() => controller.abort(), 10_000)

      const res = await fetch(CONTACT_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          message: form.message.trim(),
          meta: {
            source: 'portfolio',
            locale: lang,
            submittedAt: new Intl.DateTimeFormat('en-CA', {
              timeZone: 'Asia/Jakarta',
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit',
              hour12: false,
            })
              .format(new Date())
              .replace(', ', ' '),
          },
        }),
        signal: controller.signal,
      })
      clearTimeout(timeout)

      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      setStatus('success')
      setForm({ name: '', email: '', phone: '', message: '', website: '' })
    } catch {
      setStatus('error')
    }
  }

  const fieldClass = (hasError: boolean) =>
    `contact-field ${hasError ? 'contact-field-error' : ''}`

  const inputProps = {
    name: { label: t.name, placeholder: t.namePlaceholder },
    email: { label: t.email, placeholder: t.emailPlaceholder },
    phone: { label: t.phone, placeholder: t.phonePlaceholder },
    message: { label: t.message, placeholder: t.messagePlaceholder },
  }

  return (
    <section id="contact" className="mx-auto max-w-6xl px-6 py-28">
      <SectionHeading id="contact" index="05" />

      <div className="grid gap-12 md:grid-cols-2 md:gap-10">
        {/* left — pitch */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <p className="max-w-md leading-relaxed text-text-secondary">
            {pick(lang, ui.contact.subtitle)}
          </p>

          {/* decorative terminal card */}
          <div className="gradient-border card-glow mt-10 max-w-sm rounded-xl p-1">
            <div className="rounded-lg bg-surface p-4 font-mono text-xs leading-relaxed">
              <div className="mb-3 flex gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-green-500/70" />
                <span className="ml-2 text-text-muted">~/contact</span>
              </div>
              <p>
                <span className="text-neon-purple">$</span>{' '}
                <span className="text-text-secondary">ping</span>{' '}
                <span className="text-neon-blue">andrizky</span>
              </p>
              <p className="text-green-400">→ reply_time: fast ⚡</p>
              <p className="text-green-400">→ status: open_to_work</p>
            </div>
          </div>
        </motion.div>

        {/* right — form */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.12, ease: 'easeOut' }}
        >
          <form onSubmit={onSubmit} noValidate className="space-y-5">
            {/* honeypot — hidden from humans */}
            <input
              type="text"
              name="website"
              value={form.website}
              onChange={(e) => setForm({ ...form, website: e.target.value })}
              className="hidden"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
            />

            <div>
              <label htmlFor="contact-name" className="contact-label">
                {'//'} {pick(lang, inputProps.name.label)}
              </label>
              <div className="relative">
                <User
                  size={15}
                  className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-text-muted"
                />
                <input
                  id="contact-name"
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder={pick(lang, inputProps.name.placeholder)}
                  className={`${fieldClass(!!errors.name)} contact-field-icon`}
                  maxLength={100}
                />
              </div>
              {errors.name && <p className="contact-error">{errors.name}</p>}
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="contact-email" className="contact-label">
                  {'//'} {pick(lang, inputProps.email.label)}
                </label>
                <div className="relative">
                  <Mail
                    size={15}
                    className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-text-muted"
                  />
                  <input
                    id="contact-email"
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder={pick(lang, inputProps.email.placeholder)}
                    className={`${fieldClass(!!errors.email)} contact-field-icon`}
                    maxLength={150}
                  />
                </div>
                {errors.email && <p className="contact-error">{errors.email}</p>}
              </div>

              <div>
              <label htmlFor="contact-phone" className="contact-label">
                {'//'} {pick(lang, inputProps.phone.label)}
              </label>
              <div className="relative">
                <Phone
                  size={15}
                  className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-text-muted"
                />
                <input
                  id="contact-phone"
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder={pick(lang, inputProps.phone.placeholder)}
                  className={fieldClass(false) + ' contact-field-icon'}
                  maxLength={30}
                />
              </div>
              </div>
            </div>

            <div>
              <label htmlFor="contact-message" className="contact-label">
                {'//'} {pick(lang, inputProps.message.label)}
              </label>
              <textarea
                id="contact-message"
                rows={5}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder={pick(lang, inputProps.message.placeholder)}
                className={`${fieldClass(!!errors.message)} resize-y`}
                maxLength={2000}
              />
              {errors.message && <p className="contact-error">{errors.message}</p>}
            </div>

            <NovaGlowButton type="submit" className="w-full sm:w-auto">
              {status === 'sending' ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  {pick(lang, t.sending)}
                </>
              ) : (
                <>
                  <Send size={16} />
                  {pick(lang, t.submit)}
                </>
              )}
            </NovaGlowButton>

            {/* status messages */}
            <AnimatePresence>
              {status === 'success' && (
                <motion.p
                  key="success"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-2 font-mono text-sm text-green-400"
                  role="status"
                >
                  <CheckCircle2 size={16} />
                  {pick(lang, t.success)}
                </motion.p>
              )}
              {status === 'error' && (
                <motion.p
                  key="error"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-2 font-mono text-sm text-red-400"
                  role="alert"
                >
                  <AlertCircle size={16} />
                  {pick(lang, t.error)}
                </motion.p>
              )}
            </AnimatePresence>
          </form>
        </motion.div>
      </div>
    </section>
  )
}
