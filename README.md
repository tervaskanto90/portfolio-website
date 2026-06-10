# oboggiano.vercel.app — AI Solutions Architect portfolio

Cinematic storytelling portfolio for Octavio Boggiano. Each scroll section is a
"chapter" with fluid color transitions painted by a Three.js shader background
that reacts to the cursor.

## Stack

- **Next.js 15** (App Router, static export-friendly)
- **Three.js** — full-screen painted-texture shader (domain-warped fbm noise,
  cursor brush, per-chapter palette lerping)
- **GSAP ScrollTrigger** — cinematic scene reveals per section
- **Lenis** — buttery smooth scrolling

## Development

```bash
npm install
npm run dev
```

## Content

All copy, experience, projects and chapter palettes live in `lib/content.ts` —
edit that file to change anything on the page.

## Deploy

Push to Vercel; no special configuration needed.
