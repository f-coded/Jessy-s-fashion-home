# Fashionista

Fashion-house landing page built with **Next.js 16 (App Router) + GSAP** (ScrollSmoother, ScrollTrigger),
Swiper and Bootstrap 5. Layout, typography, spacing and every interaction are a 1:1 port of the
"Digital Agency" home of the Orisa template, re-themed for the Fashionista brand.

## Run

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Interactions

- Page loader (bar wipe), smooth scrolling with fixed footer reveal
- Hover: dual-text buttons, circle-button groups, nav megamenu, title letter wave, portfolio overlays, blog thumb zoom
- Scroll: split-text reveals, fade-ins, pinned/stacked services & testimonials, showreel clip-path zoom, image slider drift, odometer counters
- Dark / light theme toggle (persisted), search panel, mobile offcanvas nav with accordion, YouTube showreel lightbox

## Structure

- `app/` – layout (theme init, smooth-scroll wrapper) and home page
- `components/home/` – the page sections
- `components/layout/` – header, offcanvas, search, footer, loader
- `components/animations/` – GSAP behaviours (`smoother`, `text`, `scroll`, `pins`, `hoverEffects`)
- `styles/` – template CSS (theme + spacing utilities); `app/globals.css` – additions
- `public/assets/` – imagery (Unsplash), logo, brand marks, noise texture, banner video
