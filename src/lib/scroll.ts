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

  // Direction-aware offset: the navbar is always visible now, so reserve
  // its height (compact ~48px) plus a little breathing room.
  const rect = el.getBoundingClientRect()
  const scrollingUp = rect.top < 0
  const offset = scrollingUp ? -72 : -64

  if (lenisInstance) {
    lenisInstance.scrollTo(el as HTMLElement, { offset, duration: 1.2 })
  } else {
    el.scrollIntoView({ behavior: 'smooth' })
  }
}
