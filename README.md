# Reveal A Youthful You

Redesign of [revealayouthfulyou.com](https://revealayouthfulyou.com) for a nurse-practitioner-led med spa in Roslindale, Boston.
The goal is to get visitors to call, text or request a call back, with as little effort as possible.

**Stack:** Astro 5 (static), plain TypeScript, self-hosted fonts, Lenis smooth scroll (desktop only). About 6 KB of JS gzipped on first load.
**Hosting:** GitHub Pages via `.github/workflows/deploy.yml`.

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # outputs dist/
npm run check    # type check
```

## Where things live

| What | File |
| --- | --- |
| Phone, hours, address, links, form endpoint | `src/data/business.ts` |
| Treatments, prices, FAQs, team, reviews, visit steps | `src/data/site.ts` |
| Colours, type scale, spacing, motion | `src/styles/global.css` (`:root` tokens) |
| Home page sections | `src/components/*.astro`, assembled in `src/pages/index.astro` |
| Treatment pages (one per item in `treatments`) | `src/pages/[slug].astro` |

Adding a treatment to `treatments` in `site.ts` creates its page, list row, finder entry, footer link, sitemap entry and structured data.

## What the redesign changes

- **Treatment finder.** Visitors tap a concern and the downtime they can take, and the treatment list highlights matches in place. The choice is carried into the call-back form and the pre-written text message.
- **Booking by phone with less effort.** "Call" and "Text" are always visible on phones. A live "Open now / opens tomorrow 9:30am" status shows beside every number. When the clinic is closed, a two-field call-back form takes over.
- **Prices up front.** Each treatment shows a "from" price, time, downtime and how long results last.
- **The old URLs still work.** `/botox-and-dysport-injections/`, `/filler-biostimulator/`, `/rf-microneedling/`, `/vi-peel/`, `/facials/`, `/iv-fusion/` and `/peptide-therapy/` are rebuilt at the same paths. `/about-us/`, `/our-team/` and `/blog/` redirect.
- **Local SEO.** MedicalBusiness, MedicalProcedure, FAQPage and BreadcrumbList structured data, plus a sitemap, canonical URLs and a share image.

## Before launch: content to confirm with the clinic

Add `?review` to any URL (for example `/?review`) to outline every placeholder on the page in orange.

- [ ] **Prices.** Every "from $" in `site.ts` is a Boston-market placeholder (`pricePlaceholder: true`).
- [ ] **Reviews.** The three quotes are paraphrased placeholders. Replace them with verbatim Google reviews, with the reviewers' permission.
- [ ] **Review count.** "50+" is based on public listings (Birdeye shows 52–58 at 5.0). Confirm it against Google.
- [ ] **Credentials.** The old About page says "licensed aesthetician, 5+ years". The team page says nurse practitioner with about 20 years, SICU background, and Boston Medical Center. This site uses the NP wording; confirm it.
- [ ] **Team roles.** The roles and bios for Rose Karamousayan and Carolyn Hussey are placeholders.
- [ ] **Promises in the copy:** free 20-minute consult, same-day call-back, two-week injectable check-in. Confirm each one or edit it in `visitSteps` and `faqs`.
- [ ] **Texting.** Confirm (617) 991-6608 can receive texts. If it can't, set `smsEnabled: false` in `business.ts`.
- [ ] **Services.** Confirm PRP, NAD+/B12 and medical weight loss are current offerings. They come from public listings, not the old site.
- [ ] **Photos.** Pass `src` to `<Art>` (hero, about, treatment pages) to replace the CSS placeholders. The before/after slider in `Results.astro` takes two consented client photos in place of the illustrative SVG textures.

## Before launch: setup

1. **Turn on Pages:** repo **Settings → Pages → Source: GitHub Actions**. Each push to `main` or the working branch then deploys to `https://po1i.github.io/RAYY/`.
2. **Call-back form:** create a free form endpoint (Formspree, Basin or Web3Forms) and paste its URL into `formEndpoint` in `business.ts`. Until then, submitting the form opens a pre-written email to `info@revealayouthfulyou.com`.
3. **Custom domain:** in **Settings → Pages**, set `revealayouthfulyou.com`, then point DNS at GitHub Pages (A records `185.199.108–111.153`, or a `CNAME` for `www`). The workflow picks up the new origin automatically. Do this only when the clinic is ready to switch over from the current site.
4. **Google Business Profile:** set the website link to the new homepage, and the booking link to `https://revealayouthfulyou.com/#book`.

## Quality bar

Lighthouse, mobile, throttled: Performance 99–100, Accessibility 100, Best Practices 100, SEO 100, LCP about 1.8s, CLS 0.
Checked from 320px to 1440px with no horizontal scroll. Fully keyboard operable, with visible focus states. All motion uses transform or opacity and is switched off under `prefers-reduced-motion`.
