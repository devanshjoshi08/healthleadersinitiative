# Health Leaders Initiative (HLI) - Cypress Woods High School

Official website for the Health Leaders Initiative, a student-led pre-med
organization at Cypress Woods High School.

Built with **Next.js 16**, **Tailwind CSS v4**, and **Framer Motion**.
Deployed on **Vercel**.

---

## ✏️ How to edit the site (no coding needed)

### ⭐ Recommended: the visual dashboard (Sanity)

Once set up, edit **everything** - officers, events, forms, contact info, stats,
and your **logo** - from a friendly dashboard at **`/studio`** (e.g.
`your-site.com/studio`). No code, no files. Changes go live in ~1 minute.

👉 **One-time setup:** follow **[SANITY_SETUP.md](SANITY_SETUP.md)** (~5 min).

---

### Fallback: the content file (`src/lib/site.ts`)

Until the dashboard is connected - or if you prefer editing code - all the
placeholder content lives in one file:

Open it and edit the values - the whole site updates automatically. It controls:

| What | Where in the file |
|------|-------------------|
| Contact email, sponsor name | `site.contact` |
| Instagram handle / link | `site.socials.instagram` |
| Remind code, text-to-join number, meeting time & room | `site.join` |
| Homepage stat numbers | `stats` |
| Officer names, roles, grades, bios, photos | `officers` |
| Upcoming projects & events | `events` |
| Form links (Google Forms) | `forms` |
| Mission values / "why HLI" cards | `missionValues`, `pillars` |

### Adding real Google Form links
In `src/lib/site.ts`, find the `forms` array and replace each `href: "#"`
with your real Google Form URL, e.g.
`href: "https://forms.gle/abc123"`. Until then, the card shows a tidy
"Link coming soon" state.

### Adding officer photos
1. Drop the image files into the `public/officers/` folder (create it if needed).
2. In `officers`, set `image: "/officers/filename.jpg"` for that person.
   Leave `image: ""` to show an automatic initials avatar instead.

---

## 🚀 Local development

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## 📂 Structure

- `src/app/` - pages (Home, About, Mission, Officers, Events, Forms, Contact)
- `src/components/` - Navbar, Footer, Hero, shared UI
- `src/lib/site.ts` - **all editable content**

---

Made for HLI · Empowering future healthcare leaders.
