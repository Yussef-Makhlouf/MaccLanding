# MACC FM - Facility Management Platform

Official repository for **MACC FM**.
A modern, multilingual Next.js landing page and corporate platform for facility management services in Saudi Arabia.

---

## Project Overview

* Showcase services: maintenance, office, ground, accommodation.
* Engage clients: contact forms, vendor registration.
* Careers section: job listings and applications.
* Multilingual: English (LTR) & Arabic (RTL).
* Mobile-first, responsive, smooth animations with **Framer Motion**.

---

## Technology Stack

| Tool / Library                 | Purpose                                      |
| ------------------------------ | -------------------------------------------- |
| **Next.js 15 (App Router)**    | Server-side rendering, routing, optimization |
| **React 19**                   | UI components                                |
| **Tailwind CSS 4**             | Styling                                      |
| **Framer Motion**              | Animations                                   |
| **Redux Toolkit**              | Global state management                      |
| **Next-Intl**                  | Multi-language support                       |
| **Lucide React & React Icons** | Icons                                        |
| **React Hook Form & Zod**      | Forms & validation                           |
| **MUI**                        | Complex UI components                        |

---

## Installation

### Prerequisites

* Node.js 18+
* Package manager: `npm`, `yarn`, `pnpm`, or `bun`

### Clone & Install

```bash
git clone https://github.com/mahmoud140106/MaccLanding.git
cd macc

npm install      # or yarn install / pnpm install / bun install
```

### Environment

Create `.env.local`:

```env
NEXT_PUBLIC_API_URL=******************
```

---

## Project Structure

```
src/
├── app/                  # Pages & layouts
│   ├── [locale]/         # /en or /ar routing
│   ├── page.tsx
│   └── layout.tsx
├── components/           # Reusable UI components
│   ├── layout/           # Header, Footer, Navbar
│   ├── home/             # Home page
│   ├── about/            # About page
│   ├── services/         # Service sections
│   ├── contact/          # Forms
│   └── ui/               # Buttons, inputs, modals
├── locales/              # Translation files: en.json, ar.json
├── lib/                  # API calls, helpers
├── store/                # Redux slices
└── public/               # Images, icons
```

---

## Run Development

```bash
npm run dev
```

* Open [http://localhost:3000](http://localhost:3000)
* Hot reload on file changes.
* Animations enabled via **Framer Motion**.

---

## Build & Deploy

```bash
npm run build
```

* Optimized production build in `.next/`

**Deploy on Vercel:**

1. Push to GitHub
2. Connect repo in Vercel
3. Add `.env.local` variables in Vercel Dashboard

---

## Usage

### Edit Text

* `src/locales/en.json` / `ar.json`

### Add Components

* Create `.tsx` in `src/components/[feature]/`
* Style with Tailwind CSS
* Import in page

### Language Switch

* Navbar switcher updates LTR/RTL automatically

---

## Notes

* **Typography:** Lama Sans
* **Images:** Hosted on ImageKit.io
* **Animations:** Framer Motion
* **SEO:** `sitemap.ts`, `robots.ts`

---

Built with ❤️

