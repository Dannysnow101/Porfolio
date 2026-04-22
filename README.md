# 🚀 Danny Snow — Portfolio v2 (Next.js / TypeScript)

![Next.js](https://img.shields.io/badge/Next.js-16.1-000000?style=flat&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?style=flat&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=flat&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=flat&logo=tailwind-css&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green?style=flat)
![Status](https://img.shields.io/badge/Status-Active-brightgreen?style=flat)

> Second version of **Sowale Daniel's** personal portfolio — rebuilt from scratch in **Next.js 16 + TypeScript** with scroll-driven animations, a light theme, and a polished emerald green design system.

---

## 📸 Preview

![Portfolio v2 Preview](./screenshot-v2.png)

---

## ✨ Features

- 🎨 **Clean light theme** — White background with emerald green accents, Tailwind CSS v4
- 🌀 **Scroll-driven animations** — Every section animates in based on its distance from the viewport center using raw `IntersectionObserver` / scroll events — no animation library
- 💫 **Hero scroll-fade** — The hero section smoothly fades to 50% opacity as you scroll down
- 📊 **Stats bar** — 4 counters (10+ Projects, 2+ Years, 3+ Full-stack Apps, 4+ APIs) slide in from opposite sides as the section centers
- 🛠️ **Skills section** — Tech stack cards animate in from left/right as they approach the viewport
- 🎠 **Project carousel** — 3 project cards in a fan layout; left/center/right positions with hover overlay (title, description, Live Demo + Details links)
- 📬 **Contact form** — Name, email, message form with emerald focus states (UI only — needs backend)
- 🔗 **Social sidebar** — GitHub and LinkedIn icon buttons with "Follow me on" rotated label
- 📎 **CV download** — Button links to `/cv/sowale-daniel-cv.pdf`
- 📱 **Responsive** — Mobile-first layout; stats show 2×2 grid on mobile, 4-column on desktop
- ⚡ **React 19 Compiler** — `reactCompiler: true` in `next.config.ts` for automatic optimisation

---

## 🛠️ Tech Stack

| Layer      | Technology              | Purpose                                               |
|------------|-------------------------|-------------------------------------------------------|
| Framework  | Next.js 16.1 (App Router) | Server-side rendering, file-based routing           |
| Language   | TypeScript 5            | Type safety across all components                     |
| Styling    | Tailwind CSS v4         | Utility-first styling with custom emerald tokens      |
| Icons      | Lucide React            | GitHub, LinkedIn, Chevrons, Code2, Palette, etc.      |
| Animation  | Vanilla scroll events   | `IntersectionObserver` + `window.scroll` — no library |
| Themes     | next-themes             | ThemeProvider installed (dark mode ready to enable)   |

---

## 📁 Project Structure

```
Porfolio-main/
│
├── src/
│   ├── app/
│   │   ├── layout.tsx              → Root layout: metadata, global CSS, html/body wrapper
│   │   ├── page.tsx                → Homepage: assembles all sections in order
│   │   ├── globals.css             → Tailwind v4 import + CSS custom properties
│   │   └── favicon.ico             → Browser tab icon
│   │
│   └── components/
│       ├── layout/
│       │   ├── Navbar.tsx          → Top nav: logo, 4 anchor links, "Download CV" button
│       │   └── Footer.tsx          → Bottom bar: copyright, "Designed by", LinkedIn + GitHub icons
│       │
│       ├── sections/
│       │   ├── HeroSection.tsx     → Name, title, scroll-fade, portrait photo, social sidebar
│       │   ├── StatsSection.tsx    → 4 counters that slide in from sides as section centers
│       │   ├── SkillsSection.tsx   → 3 skill cards (Frontend, UI/Styling, Workflow & APIs)
│       │   ├── PortfolioSection.tsx → Fan carousel of 3 projects with hover overlay
│       │   ├── ContactSection.tsx  → Email/phone/address info boxes + contact form
│       │   └── TestimonialsSection.tsx → 3 review cards (built but NOT rendered in page.tsx)
│       │
│       └── theme-provider.tsx      → next-themes wrapper (light default, dark mode ready)
│
├── public/
│   ├── images/
│   │   ├── Logo.png                → Navbar logo
│   │   ├── My_Passport-removebg.png → Hero portrait photo (transparent background)
│   │   ├── EasyWears.png           → Project screenshot
│   │   ├── Flutterwave.png         → Project screenshot
│   │   └── PortfolioV1.png         → Project screenshot (v1 portfolio)
│   └── favicon.png / next.svg / vercel.svg
│
├── next.config.ts                  → Next.js config (React Compiler enabled)
├── tailwind.config.js              → Tailwind config (darkMode: 'class', extends empty)
├── tsconfig.json                   → TypeScript config with `@/*` path alias
├── postcss.config.mjs              → PostCSS config for Tailwind
└── package.json                    → Scripts and dependencies
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- npm or yarn

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/Dannysnow101/Portfolio-v2.git
cd Portfolio-v2

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

Open **http://localhost:3000** in your browser.

> **No environment variables required.** This is a fully static frontend.

---

## 📜 Available Scripts

| Command          | Description                                  |
|------------------|----------------------------------------------|
| `npm run dev`    | Start dev server with hot reload at port 3000 |
| `npm run build`  | Build for production (outputs to `.next/`)   |
| `npm run start`  | Serve the production build locally           |
| `npm run lint`   | Run ESLint across all source files           |

---

## 🧩 Section Reference

| Component              | Anchor ID    | Key Behaviour                                                              |
|------------------------|--------------|----------------------------------------------------------------------------|
| `Navbar`               | —            | Static white top bar; no scroll effect; "Download CV" button (no link yet) |
| `HeroSection`          | `#about`     | Portrait + badge + title + CTAs; fades to 50% opacity as you scroll down  |
| `StatsSection`         | —            | 4 stats slide in from sides; intensity based on section-center proximity   |
| `SkillsSection`        | `#skills`    | Left text + right 3-card grid; both slide in from opposite sides           |
| `PortfolioSection`     | `#projects`  | Fan carousel; center card has hover overlay with Live Demo + Details links |
| `ContactSection`       | `#contact`   | 3 contact info boxes + form; form submits nothing yet (UI only)           |
| `TestimonialsSection`  | `#testimonial` | Built but **not mounted** — add `<TestimonialsSection />` to page.tsx to activate |
| `Footer`               | —            | Copyright + LinkedIn + GitHub icon links                                   |

---

## 🎨 Design System

Colors are driven by Tailwind's default emerald palette — no custom CSS variables needed.

| Usage                        | Tailwind Token      |
|------------------------------|---------------------|
| Primary accent               | `emerald-500`       |
| Accent hover                 | `emerald-600`       |
| Light accent background      | `emerald-50`        |
| Badge/border accent          | `emerald-200`       |
| Heading text                 | `gray-900`          |
| Body text                    | `gray-600`          |
| Subtle borders               | `gray-100 / gray-200` |
| Page background              | `white`             |

**Fonts:** System font stack (`Arial, Helvetica, sans-serif`) — no custom fonts loaded.

---

## 🌐 Live Projects Showcased

| Project                   | Live URL                                                           | Category           |
|---------------------------|--------------------------------------------------------------------|--------------------|
| EasyWears – E-commerce UI | [easywearsweb.netlify.app](https://easywearsweb.netlify.app/)      | E-commerce · Website |
| Flutterwave Homepage Clone | [flutterwaveclone101.netlify.app](https://flutterwaveclone101.netlify.app/) | Fintech · Landing Page |
| Portfolio v1 – Dark Theme | [snowportfolio.netlify.app](https://snowportfolio.netlify.app/)    | Personal · Portfolio |

---

## 📞 Contact

| Channel  | Detail                                                           |
|----------|------------------------------------------------------------------|
| Email    | sowaledaniel5@gmail.com                                          |
| Phone    | +234 903 148 3166                                                |
| Location | Lagos, Nigeria                                                   |
| GitHub   | [Dannysnow101](https://github.com/Dannysnow101)                  |
| LinkedIn | [sowale-daniel](https://www.linkedin.com/in/sowale-daniel/)      |

---

## ☁️ Deployment

### Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

Connect your GitHub repo — Vercel auto-detects Next.js:
- **Build Command:** `npm run build`
- **Output Directory:** `.next`
- **Framework Preset:** Next.js

### Netlify

Set build command to `npm run build` and publish directory to `.next` (requires the Netlify Next.js plugin).

---

## 🔧 Things to Finish Before Going Live

These items were found incomplete in the code:

- [ ] **CV download** — The "Download CV" button in `Navbar.tsx` has no `href`. Add a link to `/cv/sowale-daniel-cv.pdf` and place your CV file in `public/cv/`
- [ ] **Contact form backend** — The form in `ContactSection.tsx` doesn't send data anywhere. Wire it up with [EmailJS](https://www.emailjs.com/) or a server action
- [ ] **Page metadata** — `layout.tsx` still has the placeholder title `"M Design – Creative Product Designer Portfolio"`. Update it to `"Sowale Daniel – Frontend Developer Portfolio"`
- [ ] **TestimonialsSection** — The component is built but not added to `page.tsx`. Add `<TestimonialsSection />` after `<ContactSection />` if you want it visible
- [ ] **Dark mode** — `darkMode: 'class'` is configured in Tailwind and `ThemeProvider` is set up, but the toggle UI has not been built yet
- [ ] **Screenshot** — Add `screenshot-v2.png` to the repo root for this README to render correctly

---

## 🗺️ Roadmap

- [ ] Add dark/light mode toggle to Navbar
- [ ] Wire contact form to EmailJS or a Next.js server action
- [ ] Add more projects to the carousel
- [ ] Enable `TestimonialsSection` with real client reviews
- [ ] Add Open Graph image for social sharing previews

---

## 📄 License

MIT — free to use as a learning reference or starting template.

---

*Built with 💚 by **Sowale Daniel (Danny Snow)** · Lagos, Nigeria*
