# Milford Property Maintenance — Client Handoff

This document lists every account and service connected to the website.
The client (Bryan) should own all of these accounts. Use a password manager — never store passwords in plain text.

---

## Domain

| Item | Details |
|------|---------|
| **Registrar** | GoDaddy |
| **Domain** | milfordpropertymaintenance.com |
| **Owner** | Bryan (client) |
| **DNS Setup Needed** | Point domain to Netlify (see DNS section below) |

## Website Hosting

| Item | Details |
|------|---------|
| **Current Host** | GitHub Pages (temporary) |
| **Current URL** | https://invisfx.github.io/MilfordPropertyMaintenance |
| **Target Host** | Netlify (free tier) |
| **Account Owner** | Developer sets up initially, then transfers to client |
| **Repo Connected** | github.com/invisfx/MilfordPropertyMaintenance |
| **Publish Directory** | `/` (static HTML, no build step needed) |
| **Forms** | Netlify Forms (built-in, submissions visible in Netlify dashboard) |
| **SSL** | Automatic via Netlify (free) |

### Netlify Setup Steps
1. Developer signs up at netlify.com and creates the site
2. Click "Add new site" > "Import an existing project"
3. Connect the GitHub repo: `invisfx/MilfordPropertyMaintenance`
4. Build settings: leave build command blank (site is static HTML), publish directory `/`
5. Click "Deploy site"
6. After deploy, go to Site settings > Domain management > Add custom domain
7. Follow Netlify's instructions to update GoDaddy DNS
8. Transfer site ownership to client's Netlify account

### DNS Records (GoDaddy)
Once Netlify assigns a site, update GoDaddy DNS to:

| Type | Name | Value |
|------|------|-------|
| CNAME | www | [your-site-name].netlify.app |
| A | @ | 75.2.60.5 |

*Netlify will provide exact values during custom domain setup.*

---

## Google Analytics (GA4)

| Item | Details |
|------|---------|
| **URL** | https://analytics.google.com |
| **Account Owner** | Client should create account |
| **Status** | NOT installed — GA4 tracking code is not in the live HTML files. `build-site.js` has placeholders but the live site does not use `build-site.js` output. |

### Setup Steps
1. Go to https://analytics.google.com and sign in with a Google account
2. Create a new property for "milfordpropertymaintenance.com"
3. Copy the Measurement ID (looks like `G-XXXXXXXXXX`)
4. Add the GA4 tracking snippet to all HTML files — either manually in each `<head>` section, or by adding it to a shared JS snippet included on every page
5. Deploy to Netlify (push to GitHub)

---

## Google Search Console

| Item | Details |
|------|---------|
| **URL** | https://search.google.com/search-console |
| **Account Owner** | Client should create account |
| **Status** | NOT verified — verification meta tag needs to be added directly to HTML files, not through `build-site.js` |

### Setup Steps
1. Go to Google Search Console and add property: `milfordpropertymaintenance.com`
2. Choose "HTML tag" verification method
3. Copy the `content` value from the meta tag they provide
4. Add the verification meta tag directly to the `<head>` section of all HTML files (or at minimum `index.html`)
5. Deploy, then click "Verify" in Search Console
6. Submit the sitemap: `https://milfordpropertymaintenance.com/sitemap.xml`

---

## Google Business Profile

| Item | Details |
|------|---------|
| **URL** | https://business.google.com |
| **Account Owner** | Client should create/claim |
| **Status** | Not yet set up |

### Why It Matters
- Shows business on Google Maps
- Displays business info in local search results (hours, phone, reviews)
- Critical for local SEO — "property maintenance near me" searches

### Setup Steps
1. Go to https://business.google.com
2. Search for "Milford Property Maintenance" or add a new business
3. Enter business details (address, phone, hours, categories)
4. Verify ownership (usually by postcard or phone)
5. Add photos, services, and business description
6. Link to website: `https://milfordpropertymaintenance.com`

---

## Email

| Item | Details |
|------|---------|
| **Current** | mp_maintenance@yahoo.com |
| **Recommended** | Set up info@milfordpropertymaintenance.com |

### Options for Professional Email
- **Google Workspace** ($6/month) — Gmail with custom domain
- **Zoho Mail** (free for 1 user) — basic custom domain email
- **GoDaddy Email** — bundled with domain, easy setup

*Requires MX records in GoDaddy DNS.*

---

## Code Repository

| Item | Details |
|------|---------|
| **Platform** | GitHub |
| **Repo** | github.com/invisfx/MilfordPropertyMaintenance |
| **Owner** | Developer (invisfx) |
| **Transfer** | Repo should be transferred to client's GitHub account when project is complete |

---

## SEO Optimizations Completed

| Optimization | Details |
|------|---------|
| **Title Tags & Meta Descriptions** | Location-optimized on all 18 pages |
| **FAQ Schema** | FAQPage structured data on 9 service pages |
| **Review Schema** | AggregateRating/Review schema on homepage testimonials |
| **Local Content** | Local town names added to service page content |
| **Image Compression** | 15 MB saved (~60% reduction) |
| **CSS & JS Minification** | `styles.min.css`, `inner.min.css`, `main.min.js` |
| **Email Obfuscation** | Email address obfuscated from web scrapers |
| **404 Page** | Custom `404.html` error page created |
| **Lazy Loading** | `loading="lazy"` on below-fold images |
| **Sitemap** | `sitemap.xml` updated |

---

## Pending Setup

| Task | Notes |
|------|-------|
| **Deploy to Netlify** | Set up under developer account, then transfer to client |
| **Custom Domain DNS** | Point GoDaddy DNS to Netlify once deployed |
| **Google Search Console** | Verify ownership and submit sitemap |
| **Google Analytics GA4** | Create property and add tracking code to all HTML files |
| **Google Business Profile** | Create/claim listing (see section above) |
| **Professional Email** | Optional — set up info@milfordpropertymaintenance.com |

---

## Optional / Future

| Service | Purpose | URL |
|---------|---------|-----|
| Bing Webmaster Tools | SEO for Bing/Yahoo search | https://www.bing.com/webmasters |
| Facebook Business Page | Social media presence | https://business.facebook.com |
| Instagram Business | Visual portfolio of work | https://business.instagram.com |
| Google Ads | Paid local advertising | https://ads.google.com |
| Yelp Business | Review platform | https://biz.yelp.com |

---

## Contact Info on Site

| Field | Current Value |
|-------|---------------|
| Phone | (845) 313-8028 |
| Email | mp_maintenance@yahoo.com |
| Location | Milford, PA |
| Service Area | Tri-State Area (NY, PA, NJ) |

*The live site uses hand-edited HTML files, not `build-site.js` output. To change contact info, update it directly in each HTML file. `build-site.js` can be used for future page generation, but the current 18 live pages were edited directly.*
