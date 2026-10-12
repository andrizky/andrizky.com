import type Lenis from 'lenis'

/**
 * Shared Lenis instance so nav links (and anything else)
 * can smooth-scroll to anchors.
 */
let lenisInstance: Lenis | null = null

export function setLenis(lenis: Lenis | null) {
  lenisInstance = lenis
}

export function scrollToSection(hash: string) {
  const el = document.querySelector(hash)
  if (!el) return
  if (lenisInstance) {
    lenisInstance.scrollTo(el as HTMLElement, { offset: -80, duration: 1.2 })
  } else {
    el.scrollIntoView({ behavior: 'smooth' })
  }
}
