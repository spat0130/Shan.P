# Shanmuka Patchigolla — Portfolio

A scroll-driven portfolio following a seven-scene storyboard: a rider arriving in a Melbourne laneway at sunset, through to the projects and contact sections.

## Stack

- [Vite](https://vite.dev) + React
- [GSAP](https://gsap.com) ScrollTrigger for scroll animation
- [Lenis](https://lenis.darkroom.engineering) for smooth scrolling

## Run it

```bash
npm install
npm run dev     # local dev server
npm run build   # production build in dist/
```

## Where things live

- `src/data/site.js` — all copy, scenes, project slots and links (edit this to add content)
- `src/components/` — page sections
- `src/styles/theme.css` — colours, fonts and spacing tokens
- `src/components/Visuals.jsx` — the animated line-art symbol for each scene

## Roadmap

1. Setup and scene skeleton ✓
2. Layout and sections ✓
3. Scroll animation ✓
4. Real content ✓
5. Polish ✓ and deploy
