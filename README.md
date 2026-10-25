# શ્રદ્ધાંજલિ (Shradhanjali) - Gujarati Memorial & Remembrance CMS

A custom-built, production-oriented Gujarati Shradhanjali publishing platform and WordPress-like Content Management System.

Built with **Next.js (App Router)**, **TypeScript**, **Tailwind CSS**, dynamic database persistence, Google Fonts (Noto Sans Gujarati), and a WordPress-inspired administrative dashboard.

---

## 🌟 Key Highlights

- **Faithful Design Recreation:** Crafted precisely from the provided visual references for the Homepage, Single Article, About Us, and Contact Us pages.
- **Deep Gujarati Language Support:** Natural, respectful Gujarati text, typography powered by Google Fonts `Noto Sans Gujarati`, and robust Unicode handling.
- **Dynamic 12-Card Homepage Grid:** 12 sample articles in a 4x3 desktop grid, without any placeholder "આજનું ખાસ" section.
- **Interactive Single Article Page:**
  - Dynamic breadcrumbs with schema.org `BreadcrumbList` JSON-LD
  - Collapsible Table of Contents
  - Individual numbered message cards with one-click **Copy**, **WhatsApp Share**, and **Facebook Share**
  - Author bio box (`હિના પટેલ`) with social profiles
  - Related articles sidebar and footer grid
- **WordPress-like CMS Dashboard (`/admin`):**
  - Secure bcrypt authentication & HTTP-only session cookies
  - Full CRUD for Posts, Pages, Categories, and Menus
  - Interactive Message Cards builder
  - 100-Point Real-time SEO Checklist and Score Calculator
  - File/Image Media Library manager
  - Contact submissions inbox
  - Google Analytics 4 integration & AdSense-ready placements
- **Day & Night Themes:** Dark cinematic aesthetic by default with instant toggle to light mode.
- **Hostinger Deployment Ready:** Complete standalone application ready for Hostinger Node.js Web Hosting or VPS.

---

## 🚀 Quick Start (Local Development)

### Prerequisites
- Node.js 18.x, 20.x, or 22.x+ (Node 24 tested & fully supported)
- npm or yarn

### Installation
1. Navigate to the project directory:
   ```bash
   cd shradhanjali
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open your browser:
   - Public Website: [http://localhost:3000](http://localhost:3000)
   - Admin Dashboard: [http://localhost:3000/admin](http://localhost:3000/admin)

### Default Admin Credentials
- **Email:** `admin@shradhanjali.in`
- **Password:** `Admin@12345`

---

## 📂 Project Structure

```
shradhanjali/
├── src/
│   ├── app/
│   │   ├── page.tsx               # Homepage (Hero, 6 Categories, 12 Blog cards, Info strip)
│   │   ├── about/page.tsx         # About Us page (Mission, values, journey, team)
│   │   ├── contact/page.tsx       # Contact Us page (Form, FAQs, contact info)
│   │   ├── post/[slug]/page.tsx   # Single Article page (TOC, message cards, author, sidebar)
│   │   ├── category/[slug]/page.tsx# Category archive
│   │   ├── categories/page.tsx    # All categories overview
│   │   ├── posts/page.tsx         # Full article collection
│   │   ├── search/page.tsx        # Search results page
│   │   ├── privacy-policy/page.tsx# Privacy policy
│   │   ├── disclaimer/page.tsx    # Disclaimer
│   │   ├── terms/page.tsx         # Terms and conditions
│   │   ├── sitemap.ts             # Dynamic XML sitemap
│   │   ├── robots.ts              # Search engine robots.txt
│   │   ├── api/                   # API routes (auth, posts, pages, categories, media, contact)
│   │   └── admin/                 # WordPress-style Admin Dashboard
│   ├── components/                # Reusable UI & Layout components
│   └── lib/
│       ├── types.ts               # Database and CMS schema definitions
│       ├── db.ts                  # Persistent data access layer
│       ├── seedData.ts            # Seed data with 12 authentic Gujarati articles
│       └── auth.ts                # Bcrypt authentication and session management
├── data/
│   └── db.json                    # Zero-config ACID persistent database file
├── public/
│   ├── images/                    # High-res photography & assets
│   └── uploads/                   # Media library user uploads
├── schema.sql                     # PostgreSQL / Supabase migration script
└── DEPLOYMENT.md                  # Step-by-step Hostinger deployment guide
```

---

## 🌐 Deployment to Hostinger

Refer to [`DEPLOYMENT.md`](./DEPLOYMENT.md) for step-by-step deployment instructions on Hostinger hPanel Node.js Application Manager or Hostinger VPS.
