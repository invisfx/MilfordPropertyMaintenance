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
| **Platform** | Netlify (free tier) |
| **URL** | https://app.netlify.com |
| **Account Owner** | Client should create account |
| **Repo Connected** | github.com/invisfx/MilfordPropertyMaintenance |
| **Build Command** | `node build-site.js` |
| **Publish Directory** | `/` |
| **Forms** | Netlify Forms (built-in, submissions visible in Netlify dashboard) |
| **SSL** | Automatic via Netlify (free) |

### Netlify Setup Steps
1. Sign up at netlify.com (use GitHub login for easiest setup)
2. Click "Add new site" > "Import an existing project"
3. Connect the GitHub repo: `invisfx/MilfordPropertyMaintenance`
4. Build settings are auto-detected from `netlify.toml`
5. Click "Deploy site"
6. After deploy, go to Site settings > Domain management > Add custom domain
7. Follow Netlify's instructions to update GoDaddy DNS

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
| **Status** | Placeholder code installed — needs real Measurement ID |

### Setup Steps
1. Go to https://analytics.google.com and sign in with a Google account
2. Create a new property for "milfordpropertymaintenance.com"
3. Copy the Measurement ID (looks like `G-XXXXXXXXXX`)
4. In `build-site.js`, replace `G-XXXXXXXXXX` in the `ga4Id` field with the real ID
5. Run `node build-site.js` to regenerate all pages
6. Deploy to Netlify (push to GitHub)

---

## Google Search Console

| Item | Details |
|------|---------|
| **URL** | https://search.google.com/search-console |
| **Account Owner** | Client should create account |
| **Status** | Placeholder verification tag installed — needs real code |

### Setup Steps
1. Go to Google Search Console and add property: `milfordpropertymaintenance.com`
2. Choose "HTML tag" verification method
3. Copy the `content` value from the meta tag they provide
4. In `build-site.js`, replace `XXXXXXXXXX` in the `gscVerification` field
5. Run `node build-site.js` to regenerate all pages
6. Deploy, then click "Verify" in Search Console
7. Submit the sitemap: `https://milfordpropertymaintenance.com/sitemap.xml`

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

*To change any of these, update the `SITE` object at the top of `build-site.js` and run `node build-site.js`.*
