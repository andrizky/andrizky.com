export type Lang = 'en' | 'id'

export interface Project {
  title: string
  description: Record<Lang, string>
  tech: string[]
  link?: string
  repo?: string
  image?: string
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
  email: 'andrizkyy@gmail.com',
  github: 'https://github.com/andrizky/',
  linkedin: 'http://linkedin.com/in/andrizky',
  telegram: 'https://t.me/andrizky',
  whatsapp: 'https://wa.me/628113241666',
  instagram: 'https://instagram.com/andrizkyyy',
  twitter: 'https://x.com/andrizkyyy',
}

export const projects: Project[] = [
  {
    title: 'Dragonfire Hub',
    description: {
      en: 'Full-stack web platform deployed on Cloudflare Workers — server-side rendering, a D1 database and membership integration with Patreon for supporter access.',
      id: 'Platform web full-stack yang di-deploy di Cloudflare Workers — server-side rendering, database D1, dan integrasi keanggotaan dengan Patreon untuk akses pendukung.',
    },
    tech: ['Next.js', 'Cloudflare Workers', 'D1', 'Patreon API'],
    link: 'https://dragonfire-hub.com',
    image: '/projects/dragonfire-hub.webp',
    featured: true,
  },
  {
    title: 'Automated Reporting Bot',
    description: {
      en: 'Scheduled automation that pulls operational data from a web dashboard, parses and formats it, then delivers structured daily reports straight to Telegram — replacing a manual, error-prone routine.',
      id: 'Automasi terjadwal yang mengambil data operasional dari dashboard web, mengolah dan memformatnya, lalu mengirim laporan harian terstruktur langsung ke Telegram — menggantikan rutinitas manual yang rawan kesalahan.',
    },
    tech: ['n8n', 'Web Scraping', 'Telegram Bot API', 'Cron'],
    image: '/projects/reporting-bot.webp',
  },
  {
    title: 'Spreadsheet Automation Engine',
    description: {
      en: 'Formula-driven reporting system built on spreadsheets — nested lookups, dynamic aggregation and automated data pipelines that turn raw operational exports into ready-to-use reports.',
      id: 'Sistem pelaporan berbasis formula di spreadsheet — nested lookup, agregasi dinamis, dan pipeline data otomatis yang mengubah data operasional mentah menjadi laporan siap pakai.',
    },
    tech: ['Google Sheets', 'Excel', 'Apps Script', 'Data Modeling'],
    image: '/projects/spreadsheet.webp',
  },
]

export const experience: ExperienceItem[] = [
  {
    period: '2020 — Present',
    role: 'Software Engineer',
    company: 'Freelance',
    description: {
      en: "Independent full-stack development, automation and software projects — web apps, AI-powered workflows, bots and integrations — running in parallel with the formal career from day one.",
      id: 'Pengembangan full-stack, automasi, dan proyek software secara independen — web apps, workflow berbasis AI, bot, dan integrasi — berjalan paralel dengan karier formal sejak hari pertama.',
    },
    tech: ['React', 'AI Automation', 'n8n', 'Telegram Bots', 'Web Apps'],
  },
  {
    period: '2023 — Present',
    role: 'Site Manager — Project Construction',
    company: 'Telkom Akses',
    description: {
      en: 'Managing FTTH construction projects in the Construction unit — overseeing site execution, progress and quality of network builds across regions.',
      id: 'Mengelola proyek konstruksi FTTH di unit Construction — mengawasi eksekusi site, progres, dan kualitas pembangunan jaringan lintas wilayah.',
    },
    tech: ['Leadership', 'Site Management', 'Project Construction', 'FTTH'],
  },
  {
    period: '2019 — 2022',
    role: 'Site Manager — Provisioning & Migration',
    company: 'Telkom Akses',
    description: {
      en: 'Managing provisioning and migration operations in the Operations unit — coordinating field teams and ensuring service moves happen on time and to standard.',
      id: 'Mengelola operasional provisioning dan migrasi di unit Operations — mengoordinasikan tim lapangan dan memastikan migrasi layanan tepat waktu dan sesuai standar.',
    },
    tech: ['Leadership', 'Site Management', 'Provisioning', 'Migration', 'Operations'],
  },
  {
    period: '2015 — 2018',
    role: 'Team Leader — Provisioning, DSHR, Migration, CCAN, BGES',
    company: 'Telkom Akses',
    description: {
      en: 'Leading teams across provisioning, DSHR, migration, CCAN and BGES operations in the Operations unit.',
      id: 'Memimpin tim di operasional provisioning, DSHR, migrasi, CCAN, dan BGES pada unit Operations.',
    },
    tech: ['Leadership', 'Provisioning', 'DSHR', 'CCAN', 'BGES'],
  },
  {
    period: '2013 — 2014',
    role: 'Technician — Swakelola',
    company: 'Telkom Akses',
    description: {
      en: "Hands-on execution in Telkom Akses's in-house (swakelola) operations unit — where the network career started.",
      id: 'Eksekusi langsung di unit operasional swakelola Telkom Akses — di mana karier jaringan dimulai.',
    },
    tech: ['Field Operations', 'Telecom Infrastructure'],
  },
]

export const skillGroups: { label: Record<Lang, string>; skills: string[] }[] = [
  {
    label: { en: 'Frontend', id: 'Frontend' },
    skills: [
      'React',
      'Next.js',
      'TypeScript',
      'Tailwind CSS',
      'Motion',
      'Vite',
      'Astro',
      'HTML/CSS',
    ],
  },
  {
    label: { en: 'Backend', id: 'Backend' },
    skills: [
      'Node.js',
      'PostgreSQL',
      'SQLite',
      'Supabase',
      'REST API',
      'GraphQL',
      'Google Apps Script',
    ],
  },
  {
    label: { en: 'Tools & Others', id: 'Tools & Lainnya' },
    skills: [
      'Git',
      'Docker',
      'Cloudflare',
      'Vercel',
      'Netlify',
      'n8n',
      'Google Sheets',
      'Canva',
      'AI Agent',
      'Linux',
    ],
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
    available: { en: 'Available for Freelance Work', id: 'Terbuka untuk Kerja Freelance' },
    greeting: { en: "Hi, I'm", id: 'Halo, saya' },
    name: 'Andri Rizky P',
    roles: {
      en: ['Software Engineer', 'Full Stack Developer', 'AI Automation Engineer'],
      id: ['Software Engineer', 'Full Stack Developer', 'AI Automation Engineer'],
    },
    tagline: {
      en: 'I am a Full-Stack Developer and AI Automation Engineer specializing in building scalable web applications and intelligent workflows that drive efficiency.',
      id: 'Saya Full-Stack Developer dan AI Automation Engineer yang berfokus membangun aplikasi web scalable dan workflow cerdas yang meningkatkan efisiensi.',
    },
    viewWork: { en: 'Projects', id: 'Proyek' },
    contactMe: { en: 'Contact Me', id: 'Hubungi Saya' },
    scroll: { en: 'scroll down', id: 'gulir ke bawah' },
  },
  about: {
    title: { en: 'About Me', id: 'Tentang Saya' },
    paragraphs: {
      en: [
        'I build things that work — and then make them work smarter.',
        'As a Full-Stack Developer and AI Automation Engineer, I specialize in scalable web apps and intelligent workflows. But my toolkit goes deeper: UI/UX design, spreadsheet formula engineering, team leadership, and even FTTH network construction. Different domains, same approach — understand the system, then improve it.',
        "Right now I'm running all of it in parallel — shipping web platforms, designing interfaces, building AI-powered automations, and leading projects side by side. For me it's never one or the other; it's all of it, at once.",
      ],
      id: [
        'Saya membangun sesuatu yang berfungsi — lalu membuatnya bekerja lebih cerdas.',
        'Sebagai Full-Stack Developer dan AI Automation Engineer, saya berfokus pada aplikasi web yang scalable dan workflow cerdas. Tapi toolkit saya lebih dalam: desain UI/UX, rekayasa formula spreadsheet, kepemimpinan tim, bahkan konstruksi jaringan FTTH. Domain yang berbeda, pendekatan yang sama — pahami sistemnya, lalu tingkatkan.',
        'Saat ini saya menjalankan semuanya secara paralel — membangun platform web, mendesain antarmuka, membuat automasi berbasis AI, dan memimpin proyek, berjalan berdampingan. Bagi saya bukan memilih salah satu; semuanya, sekaligus.',
      ],
    },
    highlights: {
      en: ['Full-Stack', 'AI Automation', 'UI/UX Design', 'Leadership', 'Formula Expert', 'FTTH Network'],
      id: ['Full-Stack', 'AI Automation', 'Desain UI/UX', 'Kepemimpinan', 'Ahli Formula', 'Jaringan FTTH'],
    },
  },
  projects: {
    title: { en: 'Projects', id: 'Proyek' },
    subtitle: {
      en: "A few things I've built end to end — from first commit to production.",
      id: 'Beberapa hal yang saya bangun dari awal sampai akhir — dari commit pertama hingga produksi.',
    },
    demo: { en: 'Live demo', id: 'Demo langsung' },
    code: { en: 'Code', id: 'Kode' },
  },
  experience: {
    title: { en: 'Experience', id: 'Pengalaman' },
    subtitle: {
      en: 'From pulling fiber in the field to leading deployments — every chapter taught me something the next one needed.',
      id: 'Dari menarik fiber di lapangan hingga memimpin deployment — setiap bab mengajarkan sesuatu yang dibutuhkan di bab berikutnya.',
    },
  },
  skills: {
    title: { en: 'Skills & Tools', id: 'Keahlian & Tools' },
    subtitle: {
      en: 'The toolbox changes per project — the mindset never does.',
      id: 'Kotak perkakasnya berubah tiap proyek — pola pikirnya tidak pernah.',
    },
  },
  contact: {
    title: { en: 'Get In Touch', id: 'Hubungi Saya' },
    subtitle: {
      en: "My inbox is always open — whether you have a project in mind or just want to say hi, I'll do my best to reply!",
      id: 'Email saya selalu terbuka — entah kamu punya proyek atau sekadar menyapa, saya akan berusaha membalas!',
    },
    form: {
      name: { en: 'your name', id: 'namamu' },
      namePlaceholder: { en: 'John Doe', id: 'Si Namamu' },
      email: { en: 'your email', id: 'emailmu' },
      emailPlaceholder: { en: 'john@example.com', id: 'si@example.com' },
      phone: { en: 'phone / whatsapp', id: 'telepon / whatsapp' },
      phonePlaceholder: { en: '+62 812 3456 789', id: '+62 812 3456 789' },
      message: { en: 'your message', id: 'pesanmu' },
      messagePlaceholder: {
        en: "Tell me about your project or just say hi...",
        id: 'Ceritakan proyekmu atau sekadar sapa...',
      },
      submit: { en: 'Send message', id: 'Kirim pesan' },
      sending: { en: 'Sending...', id: 'Mengirim...' },
      success: {
        en: "Message sent — I'll get back to you soon!",
        id: 'Pesan terkirim — aku akan segera membalas!',
      },
      error: {
        en: 'Something went wrong. Please try again or email me directly.',
        id: 'Terjadi kesalahan. Coba lagi atau email aku langsung.',
      },
      invalidEmail: { en: 'Please enter a valid email.', id: 'Masukkan email yang valid.' },
      required: { en: 'This field is required.', id: 'Kolom ini wajib diisi.' },
    },
    copyright: {
      en: 'Designed & built by Andri Rizky P',
      id: 'Dirancang & dibangun oleh Andri Rizky P',
    },
  },
}

/** n8n webhook receiving portfolio contact submissions (Telegram bot workflow). */
export const CONTACT_WEBHOOK_URL = 'https://n8n-andri.devscale.tech/webhook/contactMe'
