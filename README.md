# andrizky.com

Personal portfolio of **Andri Rizky P** — Full-Stack Developer & AI Automation Engineer.

Cyberpunk-themed single-page portfolio with interactive background effects, bilingual content (EN/ID), and a contact form wired to an n8n automation workflow.

## Tech Stack

- **Vite** + **React 19** + **TypeScript**
- **Tailwind CSS v4**
- **Motion** (Framer Motion) — spring-based UI animations
- **Lenis** — smooth scrolling
- **Lucide** — icons
- **Cloudflare Pages** — hosting

## Features

- 🌗 Interactive cyberpunk background: particle constellation, parallax glow orbs, cursor spotlight, tilting grid
- 💊 Morphing floating-pill navbar (full-width bar → pill on scroll)
- 🌐 EN/ID language toggle (persisted)
- ✉️ Contact form → n8n webhook → Telegram bot
- ♿ Respects `prefers-reduced-motion`, responsive, Lighthouse 99 perf

## Development

```bash
npm install
npm run dev       # dev server at :5173
npm run build     # production build → dist/
npm run preview   # serve the production build at :4173
```

## Deployment

Deployed on **Cloudflare Pages**, connected to this repository:

- Build command: `npm run build`
- Output directory: `dist`
- Custom domain: [andrizky.com](https://andrizky.com)

---

© Andri Rizky P
