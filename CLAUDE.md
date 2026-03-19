# CLAUDE.md — Milford Property Maintenance

## Project Overview

Client website for Bryan's property maintenance business in Milford, PA.

- **Domain:** milfordpropertymaintenance.com (GoDaddy, Doug has delegate DNS access)
- **Repo:** github.com/invisfx/MilfordPropertyMaintenance
- **Current hosting:** GitHub Pages (invisfx.github.io/MilfordPropertyMaintenance)
- **Target hosting:** Netlify (free tier) — deploy under Doug's account first, transfer to Bryan
- **Tech:** Vanilla HTML/CSS/JS, no framework, no build step for production
- **Contact:** (845) 313-8028, mp_maintenance@yahoo.com
- **Client:** Bryan (property maintenance business owner)
- **Developer:** Doug (douglas@makenation.com)

## Important Notes

- **Edit HTML files directly** — do NOT re-run `build-site.js`. The live pages were hand-edited for SEO and roofing removal. Running build-site.js would overwrite those changes.
- **Never deploy to Netlify without asking** — Netlify has usage costs.
- `build-site.js` is available for generating new pages from templates, but existing pages should be edited directly.
- Email is obfuscated via JS in `main.js` — don't add plaintext email back to HTML.

## Completed Work (2026-03-18)

- Removed all roofing references (page, nav, footer, forms, sitemap, build-site.js)
- SEO optimization:
  - Location keywords in title tags and meta descriptions (all 18 pages)
  - FAQ sections with FAQPage schema (9 service pages)
  - AggregateRating/Review schema on homepage testimonials
  - Local town names added to service page content
  - Images compressed (~15MB saved, ~60% reduction)
  - CSS/JS minified (styles.min.css, inner.min.css, main.min.js)
  - Email obfuscated from web scrapers
  - 404.html error page created
  - loading="lazy" on below-fold images
  - sitemap.xml updated
- GoDaddy DNS configured with A records and CNAME for GitHub Pages

## Pending Setup

- [ ] Deploy to Netlify and connect custom domain
- [ ] Google Search Console verification + sitemap submission
- [ ] Google Analytics GA4 setup
- [ ] Google Business Profile creation
- [ ] Professional email setup (optional — info@milfordpropertymaintenance.com)
- [ ] Transfer Netlify site and GitHub repo to Bryan when done

## File Structure

```
*.html              — 20 pages (hand-edited, DO NOT regenerate)
css/styles.css      — Main stylesheet (source)
css/styles.min.css  — Minified (what pages reference)
css/inner.css       — Inner page styles (source)
css/inner.min.css   — Minified (what pages reference)
js/main.js          — Client JS (source, includes email obfuscation)
js/main.min.js      — Minified (what pages reference)
images/             — Compressed local photos
build-site.js       — Page generator (for NEW pages only)
sitemap.xml         — All pages listed
robots.txt          — Allows all crawlers
netlify.toml        — Netlify hosting config
CLIENT_HANDOFF.md   — All accounts/services for client transfer
```

## Handoff Document

See `CLIENT_HANDOFF.md` for complete list of accounts, services, and setup steps to transfer to the client.
