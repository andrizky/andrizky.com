export type Lang = 'en' | 'id'

export interface Project {
  title: string
  description: Record<Lang, string>
  tech: string[]
  link?: string
  repo?: string
  featured?: boolean
}

export interface ExperienceItem {
  period: string
  role: string
  company: string
  description: Record<Lang, string>
  tech: string[]
}

export const socials = {
  email: 'andri@example.com',
  github: 'https://github.com/andrizky',
  linkedin: 'https://linkedin.com/in/andrizky',
  instagram: 'https://instagram.com/andrizky',
}

export const projects: Project[] = [
  {
    title: 'Neon Commerce',
    description: {
      en: 'Full-stack e-commerce platform with real-time inventory, payment integration and an admin dashboard.',
      id: 'Platform e-commerce full-stack dengan inventaris real-time, integrasi pembayaran, dan dashboard admin.',
    },
    tech: ['React', 'Node.js', 'PostgreSQL', 'Stripe'],
    link: 'https://example.com',
    repo: 'https://github.com/andrizky',
    featured: true,
  },
  {
    title: 'TaskFlow',
    description: {
      en: 'Kanban-style project management app with drag & drop, team collaboration and offline support.',
      id: 'Aplikasi manajemen proyek bergaya Kanban dengan drag & drop, kolaborasi tim, dan dukungan offline.',
    },
    tech: ['React', 'TypeScript', 'Tailwind', 'Supabase'],
    link: 'https://example.com',
    repo: 'https://github.com/andrizky',
    featured: true,
  },
  {
    title: 'DevMonitor',
    description: {
      en: 'Server monitoring dashboard with live metrics, alerting and beautiful data visualizations.',
      id: 'Dashboard monitoring server dengan metrik langsung, peringatan, dan visualisasi data yang menarik.',
    },
    tech: ['Vite', 'React', 'WebSocket', 'Chart.js'],
    link: 'https://example.com',
  },
  {
    title: 'Pixel Portfolio Engine',
    description: {
      en: 'Config-driven portfolio generator for developers — deploy a personal site in minutes.',
      id: 'Generator portofolio berbasis konfigurasi untuk developer — deploy situs pribadi dalam hitungan menit.',
    },
    tech: ['React', 'Vite', 'Motion', 'Cloudflare'],
    repo: 'https://github.com/andrizky',
  },
]

export const experience: ExperienceItem[] = [
  {
    period: '2024 — Present',
    role: 'Frontend Developer',
    company: 'TechCorp Inc.',
    description: {
      en: 'Building and maintaining customer-facing web apps with React & TypeScript. Led the migration to a modern Vite toolchain, cutting build times by 60%.',
      id: 'Membangun dan merawat aplikasi web customer-facing dengan React & TypeScript. Memimpin migrasi ke toolchain Vite modern, memangkas waktu build hingga 60%.',
    },
    tech: ['React', 'TypeScript', 'Tailwind'],
  },
  {
    period: '2022 — 2024',
    role: 'Web Developer',
    company: 'Digital Studio',
    description: {
      en: 'Delivered 15+ client websites and internal tools. Collaborated with designers to build accessible, responsive interfaces.',
      id: 'Menyelesaikan 15+ website klien dan tools internal. Berkolaborasi dengan desainer untuk membangun antarmuka yang responsif dan aksesibel.',
    },
    tech: ['JavaScript', 'Vue', 'Node.js'],
  },
  {
    period: '2021 — 2022',
    role: 'Junior Developer',
    company: 'Startup Labs',
    description: {
      en: 'Started my professional journey — built landing pages, fixed bugs, and learned the ropes of shipping real products.',
      id: 'Memulai perjalanan profesional — membangun landing page, memperbaiki bug, dan belajar mengirim produk nyata.',
    },
    tech: ['HTML/CSS', 'JavaScript', 'PHP'],
  },
]

export const skillGroups: { label: Record<Lang, string>; skills: string[] }[] = [
  {
    label: { en: 'Frontend', id: 'Frontend' },
    skills: ['React', 'TypeScript', 'Tailwind CSS', 'Motion', 'Vite', 'HTML/CSS'],
  },
  {
    label: { en: 'Backend', id: 'Backend' },
    skills: ['Node.js', 'PostgreSQL', 'Supabase', 'REST API', 'GraphQL'],
  },
  {
    label: { en: 'Tools & Others', id: 'Tools & Lainnya' },
    skills: ['Git', 'Docker', 'Cloudflare', 'Figma', 'Linux'],
  },
]

export const ui = {
  nav: {
    home: { en: 'Home', id: 'Beranda' },
    about: { en: 'About', id: 'Tentang' },
    projects: { en: 'Projects', id: 'Proyek' },
    experience: { en: 'Experience', id: 'Pengalaman' },
    skills: { en: 'Skills', id: 'Keahlian' },
    contact: { en: 'Contact', id: 'Kontak' },
  },
  hero: {
    available: { en: 'Available for work', id: 'Terbuka untuk kerja' },
    greeting: { en: "Hi, I'm", id: 'Halo, saya' },
    name: 'Andri Rizky Prayogo',
    roles: {
      en: ['Full-Stack Developer', 'Frontend Developer', 'UI Enthusiast'],
      id: ['Full-Stack Developer', 'Frontend Developer', 'Pecinta UI'],
    },
    tagline: {
      en: 'I build fast, beautiful web experiences with modern technologies — turning ideas into pixel-perfect reality.',
      id: 'Saya membangun pengalaman web yang cepat dan indah dengan teknologi modern — mengubah ide menjadi kenyataan.',
    },
    viewWork: { en: 'View my work', id: 'Lihat karya saya' },
    contactMe: { en: 'Contact me', id: 'Hubungi saya' },
    scroll: { en: 'scroll down', id: 'gulir ke bawah' },
  },
  about: {
    title: { en: 'About Me', id: 'Tentang Saya' },
    paragraphs: {
      en: [
        "I'm a developer based in Indonesia who loves crafting things for the web. My journey started with curiosity about how websites work — and it turned into a passion for building clean, performant and delightful products.",
        'These days I focus on React, TypeScript and the modern web ecosystem. I care deeply about user experience, code quality and the small details that make a product feel alive.',
      ],
      id: [
        'Saya seorang developer dari Indonesia yang senang membuat sesuatu untuk web. Perjalanan saya dimulai dari rasa penasaran bagaimana website bekerja — dan berubah menjadi hasrat untuk membangun produk yang bersih, cepat, dan menyenangkan.',
        'Saat ini saya fokus pada React, TypeScript dan ekosistem web modern. Saya peduli pada pengalaman pengguna, kualitas kode, dan detail kecil yang membuat produk terasa hidup.',
      ],
    },
    highlights: {
      en: ['Clean code', 'Pixel-perfect UI', 'Performance', 'Continuous learning'],
      id: ['Kode bersih', 'UI presisi', 'Performa', 'Terus belajar'],
    },
  },
  projects: {
    title: { en: 'Projects', id: 'Proyek' },
    subtitle: {
      en: 'Things I have built — placeholders you can replace with your real work.',
      id: 'Hal-hal yang telah saya bangun — placeholder yang bisa diganti dengan karya aslimu.',
    },
    demo: { en: 'Live demo', id: 'Demo langsung' },
    code: { en: 'Code', id: 'Kode' },
  },
  experience: {
    title: { en: 'Experience', id: 'Pengalaman' },
    subtitle: {
      en: 'My professional journey so far.',
      id: 'Perjalanan profesional saya sejauh ini.',
    },
    present: { en: 'Present', id: 'Sekarang' },
  },
  skills: {
    title: { en: 'Skills & Tools', id: 'Keahlian & Tools' },
    subtitle: {
      en: 'Technologies I work with every day.',
      id: 'Teknologi yang saya gunakan setiap hari.',
    },
  },
  contact: {
    title: { en: 'Get In Touch', id: 'Hubungi Saya' },
    subtitle: {
      en: "My inbox is always open — whether you have a project in mind or just want to say hi, I'll do my best to reply!",
      id: 'Email saya selalu terbuka — entah kamu punya proyek atau sekadar menyapa, saya akan berusaha membalas!',
    },
    button: { en: 'Say hello', id: 'Sapa saya' },
    copyright: {
      en: 'Designed & built by Andri Rizky Prayogo',
      id: 'Dirancang & dibangun oleh Andri Rizky Prayogo',
    },
  },
}
