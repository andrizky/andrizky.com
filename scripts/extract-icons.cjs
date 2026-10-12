const fs = require('fs')
const path = require('path')
const src = fs.readFileSync('node_modules/tech-stack-icons/dist/index.js', 'utf8')

// ids we need (tech-stack-icons unquoted keys)
const NEED = {
  react: 'React',
  nextjs2: 'Next.js',
  typescript: 'TypeScript',
  tailwindcss: 'Tailwind CSS',
  framer: 'Motion',
  vitejs: 'Vite',
  astro: 'Astro',
  html5: 'HTML/CSS',
  nodejs: 'Node.js',
  postgresql: 'PostgreSQL',
  sqlite: 'SQLite',
  supabase: 'Supabase',
  graphql: 'GraphQL',
  git: 'Git',
  docker: 'Docker',
  cloudflare: 'Cloudflare',
  vercel: 'Vercel',
  netlify2: 'Netlify',
  n8n: 'n8n',
  canva: 'Canva',
  linux: 'Linux',
}

// find each icon's svg strings: id:{svg:{light:'...',dark:'...',grayscale:'...'}}
const out = {}
for (const id of Object.keys(NEED)) {
  const marker = `${id}:{svg:{light:`
  const start = src.indexOf(marker)
  if (start === -1) {
    console.error('MISSING:', id)
    continue
  }
  // parse three single-quoted strings in order: light, dark, grayscale
  let pos = start + marker.length // at the opening quote of light
  const parts = []
  for (let i = 0; i < 3; i++) {
    while (src[pos] !== "'") pos++
    pos++ // past opening quote
    let str = ''
    while (src[pos] !== "'") {
      if (src[pos] === '\\') {
        str += src[pos] + src[pos + 1]
        pos += 2
      } else {
        str += src[pos]
        pos++
      }
    }
    pos++ // past closing quote
    parts.push(str)
  }
  out[id] = { light: parts[0], dark: parts[1], grayscale: parts[2] }
  if (!out[id].light.startsWith('<svg')) console.error('BAD SVG for', id)
}

const outPath = path.join('src', 'components', 'skill-icons.json')
fs.writeFileSync(outPath, JSON.stringify(out, null, 2))
console.log('extracted:', Object.keys(out).length, 'icons →', outPath)
