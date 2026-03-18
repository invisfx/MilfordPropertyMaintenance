const fs = require('fs');
const path = require('path');

const DIR = __dirname;

// ===================== SITE CONFIG =====================
const SITE = {
  name: 'Milford Property Maintenance',
  shortName: 'MPM',
  owner: 'Bryan',
  phone: '(845) 313-8028',
  phoneTel: '18453138028',
  email: 'mp_maintenance@yahoo.com',
  domain: 'milfordpropertymaintenance.com',
  location: 'Milford, PA',
  region: 'Tri-State Area (NY, PA, NJ)',
  lat: 41.3229,
  lon: -74.8024,
  makenationUid: '4jiyVbRo1yabf3kCuBoiyZ7R3ob2',
  description: 'Property maintenance, landscaping, snow plowing, and home repair services in Milford PA and the Tri-State Area.',
  ogImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=1200&q=80',
};

// ===================== SHARED COMPONENTS =====================
const HEAD_COMMON = `  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="dns-prefetch" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
  <link rel="stylesheet" href="css/styles.css?v=1">`;

function seoMeta(title, desc, url, extra = '') {
  return `  <title>${title}</title>
  <meta name="description" content="${desc}">
  <link rel="canonical" href="https://${SITE.domain}/${url}">
  <meta property="og:title" content="${title}">
  <meta property="og:description" content="${desc}">
  <meta property="og:url" content="https://${SITE.domain}/${url}">
  <meta property="og:type" content="website">
  <meta property="og:image" content="${SITE.ogImage}">
  <meta property="og:site_name" content="${SITE.name}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${title}">
  <meta name="twitter:description" content="${desc}">
  <meta name="twitter:image" content="${SITE.ogImage}">
${extra}`;
}

function localBusinessSchema() {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": SITE.name,
    "description": SITE.description,
    "telephone": SITE.phone,
    "email": SITE.email,
    "url": `https://${SITE.domain}`,
    "image": SITE.ogImage,
    "address": { "@type": "PostalAddress", "addressLocality": "Milford", "addressRegion": "PA", "addressCountry": "US", "postalCode": "18337" },
    "areaServed": { "@type": "GeoCircle", "geoMidpoint": { "@type": "GeoCoordinates", "latitude": SITE.lat, "longitude": SITE.lon }, "geoRadius": "50000" },
    "openingHoursSpecification": [
      { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"], "opens": "07:00", "closes": "18:00" },
      { "@type": "OpeningHoursSpecification", "dayOfWeek": "Saturday", "opens": "08:00", "closes": "16:00" }
    ],
    "priceRange": "$$"
  }, null, 2);
}

function breadcrumbSchema(name, url) {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": `https://${SITE.domain}/` },
      { "@type": "ListItem", "position": 2, "name": name, "item": `https://${SITE.domain}/${url}` }
    ]
  }, null, 2);
}

function serviceSchema(name, desc) {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Service",
    "name": name,
    "description": desc,
    "provider": { "@type": "LocalBusiness", "name": SITE.name, "telephone": SITE.phone },
    "areaServed": { "@type": "State", "name": "Pennsylvania" },
    "serviceType": name
  }, null, 2);
}

function header(activePage) {
  const nav = (href, label) => `        <a href="${href}" class="nav-link${activePage === href ? ' active' : ''}">${label}</a>`;
  return `  <!-- Header -->
  <header class="header" id="header">
    <div class="header-container">
      <a href="index.html" class="logo">
        <img src="images/logo.jpg" alt="Milford Property Maintenance" class="logo-img">
      </a>

      <nav class="nav" id="nav">
${nav('index.html', 'Home')}
${nav('about.html', 'About')}
        <div class="nav-dropdown">
          <a href="#" class="nav-link${['carpentry.html','flooring.html','painting.html','doors-windows.html','home-repair.html'].includes(activePage) ? ' active' : ''}">Home Services <i class="fas fa-chevron-down"></i></a>
          <div class="dropdown-menu">
            <a href="carpentry.html">Carpentry</a>
            <a href="flooring.html">Flooring</a>
            <a href="painting.html">Painting &amp; Finishing</a>
            <a href="doors-windows.html">Doors &amp; Windows</a>
            <a href="home-repair.html">Home Repair</a>
          </div>
        </div>
        <div class="nav-dropdown">
          <a href="#" class="nav-link${['landscape-design.html','lawn-care.html','patios-walkways.html','fencing-decks.html'].includes(activePage) ? ' active' : ''}">Outdoor <i class="fas fa-chevron-down"></i></a>
          <div class="dropdown-menu">
            <a href="landscape-design.html">Landscape Design</a>
            <a href="lawn-care.html">Lawn Care</a>
            <a href="patios-walkways.html">Patios &amp; Walkways</a>
            <a href="fencing-decks.html">Fencing &amp; Decks</a>
          </div>
        </div>
        <div class="nav-dropdown">
          <a href="#" class="nav-link${['snow-plowing.html','ice-management.html','fall-cleanup.html','spring-prep.html'].includes(activePage) ? ' active' : ''}">Seasonal <i class="fas fa-chevron-down"></i></a>
          <div class="dropdown-menu">
            <a href="snow-plowing.html">Snow Plowing</a>
            <a href="ice-management.html">Ice Management</a>
            <a href="fall-cleanup.html">Fall Cleanup</a>
            <a href="spring-prep.html">Spring Prep</a>
          </div>
        </div>
${nav('gallery.html', 'Gallery')}
${nav('service-areas.html', 'Areas')}
${nav('contact.html', 'Contact')}
      </nav>

      <div class="header-phone">
        <a href="tel:${SITE.phoneTel}"><i class="fas fa-phone"></i> ${SITE.phone}</a>
      </div>

      <button class="burger" id="burger" aria-label="Toggle navigation">
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>
  </header>`;
}

function footer() {
  return `  <!-- Footer -->
  <footer class="footer">
    <div class="container">
      <div class="footer-top">
        <div class="footer-brand">
          <a href="index.html" class="logo">
            <img src="images/logo.jpg" alt="Milford Property Maintenance" class="logo-img">
          </a>
        </div>
        <div class="footer-contact">
          <div><i class="fas fa-location-dot"></i> Milford, PA &mdash; ${SITE.region}</div>
          <div><i class="fas fa-phone"></i> <a href="tel:${SITE.phoneTel}">${SITE.phone}</a></div>
        </div>
        <div class="footer-social">
          <a href="mailto:${SITE.email}" aria-label="Email"><i class="fas fa-envelope"></i></a>
        </div>
      </div>
      <div class="footer-links">
        <div class="footer-col">
          <a href="index.html">Home</a>
          <a href="about.html">About</a>
          <a href="gallery.html">Gallery</a>
          <a href="service-areas.html">Service Areas</a>
          <a href="contact.html">Contact</a>
        </div>
        <div class="footer-col">
          <a href="carpentry.html">Carpentry</a>
          <a href="flooring.html">Flooring</a>
          <a href="painting.html">Painting &amp; Finishing</a>
          <a href="doors-windows.html">Doors &amp; Windows</a>
          <a href="home-repair.html">Home Repair</a>
        </div>
        <div class="footer-col">
          <a href="landscape-design.html">Landscape Design</a>
          <a href="lawn-care.html">Lawn Care</a>
          <a href="patios-walkways.html">Patios &amp; Walkways</a>
          <a href="fencing-decks.html">Fencing &amp; Decks</a>
        </div>
        <div class="footer-col">
          <a href="snow-plowing.html">Snow Plowing</a>
          <a href="ice-management.html">Ice Management</a>
          <a href="fall-cleanup.html">Fall Cleanup</a>
          <a href="spring-prep.html">Spring Prep</a>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; 2026 ${SITE.name}. All Rights Reserved.</p>
        <p style="margin-top: 8px; font-size: 0.85rem;"><i class="fas fa-star" style="color: var(--accent); margin-right: 4px;"></i> Also find us on <a href="https://makenation.com/public-profile.html?uid=${SITE.makenationUid}" target="_blank" rel="noopener" style="color: var(--accent); text-decoration: none;">MakeNation.com</a></p>
      </div>
    </div>
  </footer>

  <!-- Back to Top -->
  <button class="back-to-top" id="backToTop" aria-label="Back to top">
    <i class="fas fa-chevron-up"></i>
  </button>

  <script src="js/main.js" defer></script>`;
}

function pageHero(title, breadcrumb) {
  return `  <!-- Page Hero -->
  <section class="page-hero">
    <div class="container">
      <h1>${title}</h1>
      <div class="breadcrumb">
        <a href="index.html">Home</a> <span>&gt;</span> <span>${breadcrumb}</span>
      </div>
    </div>
  </section>`;
}

function writePage(filename, content) {
  fs.writeFileSync(path.join(DIR, filename), content);
  console.log(`  Created: ${filename}`);
}

// ===================== SERVICE PAGE BUILDER =====================
function buildServicePage(config) {
  const { file, title, metaDesc, heroTitle, breadcrumbParent, content, features, faqItems, otherServices } = config;

  let faqSchema = '';
  if (faqItems && faqItems.length > 0) {
    faqSchema = `\n  <script type="application/ld+json">\n  ${JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqItems.map(q => ({
        "@type": "Question", "name": q.q,
        "acceptedAnswer": { "@type": "Answer", "text": q.a }
      }))
    }, null, 2)}\n  </script>`;
  }

  const crumb = breadcrumbParent
    ? `<a href="index.html">Home</a> &gt; <a href="#">${breadcrumbParent}</a> &gt; <span>${heroTitle}</span>`
    : `<a href="index.html">Home</a> &gt; <span>${heroTitle}</span>`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
${HEAD_COMMON}
  <link rel="stylesheet" href="css/inner.css?v=1">
${seoMeta(`${heroTitle} | ${SITE.name}`, metaDesc, file)}
  <script type="application/ld+json">
  ${localBusinessSchema()}
  </script>
  <script type="application/ld+json">
  ${breadcrumbSchema(heroTitle, file)}
  </script>
  <script type="application/ld+json">
  ${serviceSchema(heroTitle, metaDesc)}
  </script>${faqSchema}
</head>
<body>

${header(file)}

  <main>
  <section class="page-hero">
    <div class="container">
      <h1>${heroTitle}</h1>
      <div class="breadcrumb">${crumb}</div>
    </div>
  </section>

  <!-- Service Detail -->
  <section class="service-detail">
    <div class="container">
      <div class="service-detail-grid">
        <div class="service-detail-image">
          <img src="${content.image}" alt="${content.imageAlt}" loading="lazy">
        </div>
        <div class="service-detail-content">
          <h2>${content.heading}</h2>
          ${content.paragraphs.map(p => `          <p>${p}</p>`).join('\n')}
          <a href="contact.html" class="btn btn-primary">Get a Free Estimate</a>
        </div>
      </div>
    </div>
  </section>

  <!-- Service Features -->
  <section class="service-features">
    <div class="container">
      <h2>What We Offer</h2>
      <div class="features-grid">
        ${features.map(f => `<div class="feature-card">
          <div class="feature-icon"><i class="${f.icon}"></i></div>
          <h3>${f.title}</h3>
          <p>${f.desc}</p>
        </div>`).join('\n        ')}
      </div>
    </div>
  </section>

  <!-- CTA Banner -->
  <section class="cta-banner">
    <div class="container">
      <h2>Ready to Get Started?</h2>
      <p>Contact us today for a free, no-obligation estimate on your next project.</p>
      <a href="contact.html" class="btn btn-primary">Contact Us Today</a>
    </div>
  </section>

  ${faqItems && faqItems.length ? `<!-- FAQ Section -->
  <section class="service-features" id="faq">
    <div class="container">
      <h2>Frequently Asked Questions</h2>
      <div class="faq-list">
        ${faqItems.map(q => `<details class="faq-item">
          <summary>${q.q}</summary>
          <p>${q.a}</p>
        </details>`).join('\n        ')}
      </div>
    </div>
  </section>` : ''}

  <!-- Other Services -->
  <section class="other-services">
    <div class="container">
      <h2>Explore Our Other Services</h2>
      <div class="services-grid">
        ${otherServices.map(s => `<a href="${s.href}" class="service-card">
          <div class="service-card-icon"><i class="${s.icon}"></i></div>
          <h3>${s.title}</h3>
          <p>${s.desc}</p>
        </a>`).join('\n        ')}
      </div>
    </div>
  </section>
  </main>

${footer()}

</body>
</html>`;
}

// ===================== BUILD ALL PAGES =====================
console.log('Building Milford Property Maintenance website...\n');

// ---- index.html ----
writePage('index.html', `<!DOCTYPE html>
<html lang="en">
<head>
${HEAD_COMMON}
${seoMeta(`${SITE.name} | Property Maintenance, Landscaping & Snow Plowing`, SITE.description, '')}
  <script type="application/ld+json">
  ${localBusinessSchema()}
  </script>
  <script type="application/ld+json">
  ${JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": SITE.name,
    "url": `https://${SITE.domain}`,
    "logo": SITE.ogImage,
    "contactPoint": { "@type": "ContactPoint", "telephone": SITE.phone, "contactType": "customer service", "areaServed": "US" }
  }, null, 2)}
  </script>
</head>
<body>

${header('index.html')}

  <main>
  <!-- Hero Section -->
  <section class="hero" id="home">
    <div class="hero-content">
      <h1>Your Property,<br>Our Priority</h1>
      <p>From lush lawns and custom walkways to dependable snow plowing and home repairs. One crew for every season.</p>
      <a href="#contact" class="btn btn-white">Get a Free Estimate</a>
    </div>
    <div class="hero-image">
      <img src="https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&q=80" alt="Beautiful maintained property with green lawn">
    </div>
  </section>

  <!-- About Section -->
  <section class="about" id="about">
    <div class="container about-grid">
      <div class="about-image">
        <img src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&q=80" alt="Property maintenance work in progress" loading="lazy">
      </div>
      <div class="about-content">
        <h2 class="section-subtitle">Local Experts You Can Count On</h2>
        <div class="about-feature">
          <div class="about-icon"><i class="fas fa-award"></i></div>
          <div>
            <h3>Reliable Craftsmanship</h3>
            <p>Quality work on every job, from small repairs to full outdoor transformations.</p>
          </div>
        </div>
        <div class="about-feature">
          <div class="about-icon"><i class="fas fa-shield-halved"></i></div>
          <div>
            <h3>Fully Insured</h3>
            <p>Complete protection and peace of mind for every property owner we serve.</p>
          </div>
        </div>
        <div class="about-feature">
          <div class="about-icon"><i class="fas fa-handshake"></i></div>
          <div>
            <h3>No Job Too Small</h3>
            <p>We show up ready to deliver, whether it's a quick fix or a major project.</p>
          </div>
        </div>
        <a href="about.html" class="btn btn-primary">More About Us</a>
      </div>
    </div>
  </section>

  <!-- Home Services -->
  <section class="services" id="services">
    <div class="container">
      <div class="services-header">
        <div class="services-intro" id="home-services">
          <h2>Home Services</h2>
          <p>Expert repairs, installations, and improvements for every room in your home.</p>
        </div>
        <div class="services-grid">
          <div class="service-card">
            <div class="service-icon"><i class="fas fa-hammer"></i></div>
            <h3>Carpentry</h3>
            <p>Custom woodwork, trim, cabinetry, framing, and structural repairs done right.</p>
          </div>
          <div class="service-card">
            <div class="service-icon"><i class="fas fa-border-all"></i></div>
            <h3>Flooring</h3>
            <p>Hardwood, tile, laminate, and vinyl installation and refinishing.</p>
          </div>
          <div class="service-card">
            <div class="service-icon"><i class="fas fa-paint-roller"></i></div>
            <h3>Painting &amp; Finishing</h3>
            <p>Interior and exterior painting with clean lines and lasting finishes.</p>
          </div>
          <div class="service-card">
            <div class="service-icon"><i class="fas fa-door-open"></i></div>
            <h3>Doors &amp; Windows</h3>
            <p>Installation, replacement, and repair of doors and windows for efficiency and style.</p>
          </div>
          <div class="service-card">
            <div class="service-icon"><i class="fas fa-wrench"></i></div>
            <h3>Home Repair</h3>
            <p>General handyman services, fixes, and maintenance to keep your home in top shape.</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Outdoor / Landscaping Services -->
  <section class="services services-alt" id="outdoor-services">
    <div class="container">
      <div class="services-header">
        <div class="services-intro">
          <h2>Landscaping &amp; Outdoor Services</h2>
          <p>Complete outdoor solutions to boost your curb appeal and property value.</p>
        </div>
        <div class="services-grid">
          <div class="service-card">
            <div class="service-icon"><i class="fas fa-leaf"></i></div>
            <h3>Landscape Design</h3>
            <p>Custom landscape plans with plantings, hardscaping, and garden beds.</p>
          </div>
          <div class="service-card">
            <div class="service-icon"><i class="fas fa-tree"></i></div>
            <h3>Lawn Care &amp; Maintenance</h3>
            <p>Regular mowing, edging, fertilization, and seasonal cleanup to keep your yard pristine.</p>
          </div>
          <div class="service-card">
            <div class="service-icon"><i class="fas fa-road"></i></div>
            <h3>Patios &amp; Walkways</h3>
            <p>Pavers, stone, and concrete work for beautiful outdoor living spaces.</p>
          </div>
          <div class="service-card">
            <div class="service-icon"><i class="fas fa-th-large"></i></div>
            <h3>Fencing &amp; Decks</h3>
            <p>Quality fence installation and custom deck building for your backyard.</p>
          </div>
          <div class="service-card">
            <div class="service-icon"><i class="fas fa-water"></i></div>
            <h3>Drainage Solutions</h3>
            <p>Proper grading and drainage systems to protect your property from water damage.</p>
          </div>
          <div class="service-card service-card-image">
            <img src="https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=400&q=80" alt="Landscaping work" loading="lazy">
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Seasonal Services -->
  <section class="seasonal" id="seasonal-services">
    <div class="container seasonal-grid">
      <div class="seasonal-image">
        <img src="https://images.unsplash.com/photo-1516715094483-75da7dee9758?w=600&q=80" alt="Snow plowing service" loading="lazy">
      </div>
      <div class="seasonal-content">
        <h2>Seasonal Services</h2>
        <p>Reliable, year-round solutions to keep your property safe and looking great no matter the season.</p>

        <div class="seasonal-item">
          <h3><i class="fas fa-snowflake"></i> Snow Plowing</h3>
          <p>Dependable and timely snow removal for driveways, parking lots, and commercial properties.</p>
        </div>
        <div class="seasonal-item">
          <h3><i class="fas fa-temperature-low"></i> Ice Management</h3>
          <p>Salt and sand application to keep walkways and driveways safe during winter storms.</p>
        </div>
        <div class="seasonal-item">
          <h3><i class="fas fa-broom"></i> Fall Cleanup</h3>
          <p>Leaf removal, gutter cleaning, and winterization to prepare your property for the cold months.</p>
        </div>
        <div class="seasonal-item">
          <h3><i class="fas fa-sun"></i> Spring Prep</h3>
          <p>Mulching, bed preparation, and spring cleanup to get your yard ready for the season.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Gallery Section -->
  <section class="gallery" id="gallery">
    <div class="container">
      <h2 class="section-title">See Our Work</h2>
      <p class="section-desc">Browse our portfolio of completed property maintenance, landscaping, and outdoor projects.</p>
      <div class="gallery-grid">
        <div class="gallery-item">
          <img src="https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=400&q=80" alt="Landscaping project" loading="lazy">
          <div class="gallery-overlay"><span>Landscaping</span></div>
        </div>
        <div class="gallery-item">
          <img src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=400&q=80" alt="Lawn care" loading="lazy">
          <div class="gallery-overlay"><span>Lawn Care</span></div>
        </div>
        <div class="gallery-item">
          <img src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=400&q=80" alt="Deck and patio" loading="lazy">
          <div class="gallery-overlay"><span>Deck &amp; Patio</span></div>
        </div>
        <div class="gallery-item">
          <img src="https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&q=80" alt="Property maintenance" loading="lazy">
          <div class="gallery-overlay"><span>Property Maintenance</span></div>
        </div>
        <div class="gallery-item">
          <img src="https://images.unsplash.com/photo-1560749003-f4b1e17e2dff?w=400&q=80" alt="Fencing project" loading="lazy">
          <div class="gallery-overlay"><span>Fencing</span></div>
        </div>
        <div class="gallery-item">
          <img src="https://images.unsplash.com/photo-1516715094483-75da7dee9758?w=400&q=80" alt="Snow plowing" loading="lazy">
          <div class="gallery-overlay"><span>Snow Plowing</span></div>
        </div>
      </div>
      <div class="text-center" style="margin-top: 2rem;">
        <a href="gallery.html" class="btn btn-outline">View All Projects</a>
      </div>
    </div>
  </section>

  <!-- Testimonials -->
  <section class="testimonials" id="testimonials">
    <div class="container">
      <h2 class="section-title">What Our Clients Say</h2>
      <div class="testimonial-slider">
        <div class="testimonial-track" id="testimonialTrack">
          <div class="testimonial-card">
            <div class="testimonial-stars">
              <i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i>
            </div>
            <p>"Bryan and his crew did an amazing job with our landscaping. The yard looks like a completely different property. Reliable, on time, and great quality."</p>
            <div class="testimonial-author">
              <strong>Karen T.</strong>
              <span>Landscaping</span>
            </div>
          </div>
          <div class="testimonial-card">
            <div class="testimonial-stars">
              <i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i>
            </div>
            <p>"We use them for snow plowing every winter. They're always there early before we even wake up. Best service in the Milford area."</p>
            <div class="testimonial-author">
              <strong>Tom &amp; Lisa R.</strong>
              <span>Snow Plowing</span>
            </div>
          </div>
          <div class="testimonial-card">
            <div class="testimonial-stars">
              <i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i>
            </div>
            <p>"Had them install a paver walkway and repair our deck. Both projects came out beautiful. Fair pricing and no surprises."</p>
            <div class="testimonial-author">
              <strong>Mike D.</strong>
              <span>Patios &amp; Decks</span>
            </div>
          </div>
        </div>
        <div class="testimonial-nav">
          <button class="testimonial-btn" id="prevBtn" aria-label="Previous testimonial"><i class="fas fa-chevron-left"></i></button>
          <div class="testimonial-dots" id="testimonialDots"></div>
          <button class="testimonial-btn" id="nextBtn" aria-label="Next testimonial"><i class="fas fa-chevron-right"></i></button>
        </div>
      </div>
    </div>
  </section>

  <!-- CTA Section -->
  <section class="cta">
    <div class="cta-content">
      <h2>Ready to Start Your Project?</h2>
      <p>One crew for everything — home repairs, landscaping, snow plowing, and more. Get your free estimate today.</p>
      <a href="#contact" class="btn btn-white">Get a Free Estimate</a>
    </div>
    <div class="cta-image">
      <img src="https://images.unsplash.com/photo-1600607687939-ce8a6c42498f?w=800&q=80" alt="Beautiful maintained home" loading="lazy">
    </div>
  </section>

  <!-- Contact Section -->
  <section class="contact" id="contact">
    <div class="container contact-grid">
      <div class="contact-info">
        <h2>Get In Touch</h2>
        <p>Ready to discuss your project? Give us a call or fill out the form and we'll get back to you within 24 hours.</p>
        <div class="contact-detail">
          <i class="fas fa-phone"></i>
          <div>
            <strong>Phone</strong>
            <a href="tel:${SITE.phoneTel}">${SITE.phone}</a>
          </div>
        </div>
        <div class="contact-detail">
          <i class="fas fa-envelope"></i>
          <div>
            <strong>Email</strong>
            <a href="mailto:${SITE.email}">${SITE.email}</a>
          </div>
        </div>
        <div class="contact-detail">
          <i class="fas fa-location-dot"></i>
          <div>
            <strong>Service Area</strong>
            <span>Milford, PA &mdash; ${SITE.region}</span>
          </div>
        </div>
      </div>
      <form class="contact-form" id="contactForm" name="contact" method="POST" data-netlify="true" netlify-honeypot="bot-field">
        <input type="hidden" name="form-name" value="contact">
        <p class="hidden" style="display:none"><label>Don't fill this out: <input name="bot-field"></label></p>
        <div class="form-row">
          <input type="text" name="first-name" placeholder="First Name" required>
          <input type="text" name="last-name" placeholder="Last Name" required>
        </div>
        <input type="email" name="email" placeholder="Email Address" required>
        <input type="tel" name="phone" placeholder="Phone Number">
        <select name="service">
          <option value="" disabled selected>Select a Service</option>
          <option>Carpentry</option>
          <option>Flooring</option>
          <option>Painting &amp; Finishing</option>
          <option>Doors &amp; Windows</option>
          <option>Home Repair</option>
          <option>Landscape Design</option>
          <option>Lawn Care</option>
          <option>Patios &amp; Walkways</option>
          <option>Fencing &amp; Decks</option>
          <option>Snow Plowing</option>
          <option>Ice Management</option>
          <option>Other</option>
        </select>
        <textarea name="message" rows="4" placeholder="Tell us about your project..."></textarea>
        <button type="submit" class="btn btn-primary btn-full">Send Message</button>
      </form>
    </div>
  </section>
  </main>

${footer()}

</body>
</html>`);

// ---- about.html ----
writePage('about.html', `<!DOCTYPE html>
<html lang="en">
<head>
${HEAD_COMMON}
  <link rel="stylesheet" href="css/inner.css?v=1">
${seoMeta(`About Us | ${SITE.name}`, `Learn about ${SITE.name} — Milford PA's trusted property maintenance, landscaping, and seasonal services crew.`, 'about.html')}
  <script type="application/ld+json">
  ${localBusinessSchema()}
  </script>
  <script type="application/ld+json">
  ${breadcrumbSchema('About Us', 'about.html')}
  </script>
</head>
<body>

${header('about.html')}

  <main>
  ${pageHero('About Us', 'About')}

  <section class="about-page section">
    <div class="container">
      <div class="about-grid">
        <div class="about-image">
          <img src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80" alt="Milford Property Maintenance crew at work" loading="lazy">
        </div>
        <div class="about-content">
          <h2>Your Local Property Maintenance Crew</h2>
          <p>Founded by Bryan, Milford Property Maintenance was built on a simple idea: your property deserves to look its best year-round, and you deserve a crew that shows up, does quality work, and doesn't cut corners.</p>
          <p>From lush lawns and manicured gardens to custom paver walkways, fresh tree plantings, and dependable snow plowing — we handle every corner of your outdoor space. We're a local crew built on reliability and quality craftsmanship that your neighbors will notice.</p>
          <p>No season too tough, no job too small. Whatever it takes, we show up ready to deliver.</p>
          <div class="about-values">
            <div class="about-value">
              <div class="about-value-icon"><i class="fas fa-map-marker-alt"></i></div>
              <h3>Local Roots</h3>
              <p>Based in Milford, PA with deep knowledge of the local climate, soil, and property needs.</p>
            </div>
            <div class="about-value">
              <div class="about-value-icon"><i class="fas fa-tools"></i></div>
              <h3>Quality Work</h3>
              <p>Every project is completed to the highest standards with premium materials and proven techniques.</p>
            </div>
            <div class="about-value">
              <div class="about-value-icon"><i class="fas fa-home"></i></div>
              <h3>Complete Property Care</h3>
              <p>From home repairs to landscaping to seasonal services — one crew you can count on year-round.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="mission-section section">
    <div class="container">
      <h2>Our Mission</h2>
      <p>At ${SITE.name}, our mission is to deliver exceptional property maintenance with honest communication, fair pricing, and work we stand behind. Your property is your pride — we treat it like our own. From the first phone call to the finished job, we're committed to your complete satisfaction.</p>
    </div>
  </section>

  <section class="cta-banner section">
    <div class="container">
      <h2>Ready to Transform Your Property?</h2>
      <p>Contact us today for a free, no-obligation estimate on your next project.</p>
      <a href="contact.html" class="btn btn-primary">Get a Free Estimate</a>
    </div>
  </section>
  </main>

${footer()}

</body>
</html>`);

// ---- contact.html ----
writePage('contact.html', `<!DOCTYPE html>
<html lang="en">
<head>
${HEAD_COMMON}
  <link rel="stylesheet" href="css/inner.css?v=1">
${seoMeta(`Contact Us | ${SITE.name}`, `Contact ${SITE.name} for a free estimate on property maintenance, landscaping, and seasonal services in Milford PA and the Tri-State Area.`, 'contact.html')}
  <script type="application/ld+json">
  ${localBusinessSchema()}
  </script>
  <script type="application/ld+json">
  ${breadcrumbSchema('Contact Us', 'contact.html')}
  </script>
</head>
<body>

${header('contact.html')}

  <main>
  ${pageHero('Contact Us', 'Contact')}

  <section class="contact-page section">
    <div class="container">
      <div class="contact-grid">
        <div class="contact-info">
          <h2>Get In Touch</h2>
          <p>Ready to start your project? Reach out today for a free consultation and estimate. We serve Milford and the entire Tri-State region.</p>
          <div class="contact-details">
            <div class="contact-detail">
              <div class="contact-detail-icon"><i class="fas fa-phone"></i></div>
              <div>
                <h3>Phone</h3>
                <a href="tel:${SITE.phoneTel}">${SITE.phone}</a>
              </div>
            </div>
            <div class="contact-detail">
              <div class="contact-detail-icon"><i class="fas fa-envelope"></i></div>
              <div>
                <h3>Email</h3>
                <a href="mailto:${SITE.email}">${SITE.email}</a>
              </div>
            </div>
            <div class="contact-detail">
              <div class="contact-detail-icon"><i class="fas fa-location-dot"></i></div>
              <div>
                <h3>Location</h3>
                <p>Milford, PA &mdash; ${SITE.region}</p>
              </div>
            </div>
            <div class="contact-detail">
              <div class="contact-detail-icon"><i class="fas fa-clock"></i></div>
              <div>
                <h3>Hours</h3>
                <p>Mon - Fri: 7:00 AM - 6:00 PM<br>Sat: 8:00 AM - 4:00 PM<br>Sun: Emergency Only</p>
              </div>
            </div>
          </div>
        </div>
        <div class="contact-form-wrap">
          <h2>Request a Free Estimate</h2>
          <form name="contact" method="POST" action="/thank-you.html" data-netlify="true" netlify-honeypot="bot-field" class="contact-form">
            <input type="hidden" name="form-name" value="contact">
            <p class="hidden" style="display:none;"><label>Don't fill this out: <input name="bot-field"></label></p>
            <div class="form-row">
              <div class="form-group">
                <label for="first-name">First Name *</label>
                <input type="text" id="first-name" name="first-name" required>
              </div>
              <div class="form-group">
                <label for="last-name">Last Name *</label>
                <input type="text" id="last-name" name="last-name" required>
              </div>
            </div>
            <div class="form-row">
              <div class="form-group">
                <label for="email">Email *</label>
                <input type="email" id="email" name="email" required>
              </div>
              <div class="form-group">
                <label for="phone">Phone</label>
                <input type="tel" id="phone" name="phone">
              </div>
            </div>
            <div class="form-group">
              <label for="service">Service Needed</label>
              <select id="service" name="service">
                <option value="">Select a service...</option>
                <option>Carpentry</option>
                <option>Flooring</option>
                <option>Painting &amp; Finishing</option>
                <option>Doors &amp; Windows</option>
                <option>Home Repair</option>
                <option>Landscape Design</option>
                <option>Lawn Care</option>
                <option>Patios &amp; Walkways</option>
                <option>Fencing &amp; Decks</option>
                <option>Snow Plowing</option>
                <option>Ice Management</option>
              </select>
            </div>
            <div class="form-group">
              <label for="message">Message *</label>
              <textarea id="message" name="message" rows="5" required placeholder="Tell us about your project..."></textarea>
            </div>
            <button type="submit" class="btn btn-primary btn-full">Send Message</button>
          </form>
        </div>
      </div>
    </div>
  </section>

  <section class="cta-banner section">
    <div class="container">
      <h2>Ready to Transform Your Property?</h2>
      <p>Call us today or fill out the form above for a free, no-obligation estimate.</p>
      <a href="tel:${SITE.phoneTel}" class="btn btn-primary">Call ${SITE.phone}</a>
    </div>
  </section>
  </main>

${footer()}

</body>
</html>`);

// ---- gallery.html ----
writePage('gallery.html', `<!DOCTYPE html>
<html lang="en">
<head>
${HEAD_COMMON}
  <link rel="stylesheet" href="css/inner.css?v=1">
${seoMeta(`Our Work | ${SITE.name}`, `Browse our gallery of completed property maintenance, landscaping, carpentry, and outdoor projects throughout Milford PA and the Tri-State Area.`, 'gallery.html')}
  <script type="application/ld+json">
  ${localBusinessSchema()}
  </script>
  <script type="application/ld+json">
  ${breadcrumbSchema('Our Work', 'gallery.html')}
  </script>
</head>
<body>

${header('gallery.html')}

  <main>
  ${pageHero('Our Work', 'Gallery')}

  <section class="gallery-page section">
    <div class="container">
      <div class="gallery-filters">
        <button class="filter-btn active" data-filter="all">All</button>
        <button class="filter-btn" data-filter="home">Home Services</button>
        <button class="filter-btn" data-filter="landscaping">Landscaping</button>
        <button class="filter-btn" data-filter="seasonal">Seasonal</button>
      </div>
      <div class="gallery-grid">
        <div class="gallery-item" data-category="landscaping">
          <img src="https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=600&q=80" alt="Landscape design project" loading="lazy">
          <div class="gallery-overlay"><h3>Landscape Design</h3><span>Landscaping</span></div>
        </div>
        <div class="gallery-item" data-category="landscaping">
          <img src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=600&q=80" alt="Lawn care" loading="lazy">
          <div class="gallery-overlay"><h3>Lawn Care</h3><span>Landscaping</span></div>
        </div>
        <div class="gallery-item" data-category="home">
          <img src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80" alt="Carpentry project" loading="lazy">
          <div class="gallery-overlay"><h3>Carpentry</h3><span>Home Services</span></div>
        </div>
        <div class="gallery-item" data-category="landscaping">
          <img src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=600&q=80" alt="Patio and walkway installation" loading="lazy">
          <div class="gallery-overlay"><h3>Patio &amp; Walkway</h3><span>Landscaping</span></div>
        </div>
        <div class="gallery-item" data-category="landscaping">
          <img src="https://images.unsplash.com/photo-1560749003-f4b1e17e2dff?w=600&q=80" alt="Fencing and deck project" loading="lazy">
          <div class="gallery-overlay"><h3>Fencing &amp; Deck</h3><span>Landscaping</span></div>
        </div>
        <div class="gallery-item" data-category="seasonal">
          <img src="https://images.unsplash.com/photo-1516715094483-75da7dee9758?w=600&q=80" alt="Snow plowing service" loading="lazy">
          <div class="gallery-overlay"><h3>Snow Plowing</h3><span>Seasonal</span></div>
        </div>
        <div class="gallery-item" data-category="home">
          <img src="https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&q=80" alt="Property maintenance" loading="lazy">
          <div class="gallery-overlay"><h3>Property Maintenance</h3><span>Home Services</span></div>
        </div>
        <div class="gallery-item" data-category="home">
          <img src="https://images.unsplash.com/photo-1562259929-b4e1fd3aef09?w=600&q=80" alt="Painting project" loading="lazy">
          <div class="gallery-overlay"><h3>Painting</h3><span>Home Services</span></div>
        </div>
        <div class="gallery-item" data-category="seasonal">
          <img src="https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&q=80" alt="Fall cleanup" loading="lazy">
          <div class="gallery-overlay"><h3>Fall Cleanup</h3><span>Seasonal</span></div>
        </div>
      </div>
    </div>
  </section>
  </main>

${footer()}

</body>
</html>`);

// ---- thank-you.html ----
writePage('thank-you.html', `<!DOCTYPE html>
<html lang="en">
<head>
${HEAD_COMMON}
  <link rel="stylesheet" href="css/inner.css?v=1">
${seoMeta(`Thank You | ${SITE.name}`, `Thank you for contacting ${SITE.name}. We'll get back to you within 24 hours.`, 'thank-you.html', '  <meta name="robots" content="noindex, nofollow">\n')}
  <script type="application/ld+json">
  ${localBusinessSchema()}
  </script>
</head>
<body>

${header('thank-you.html')}

  <main>
  ${pageHero('Thank You!', 'Thank You')}

  <section class="service-detail">
    <div class="container" style="text-align: center; max-width: 700px; padding: 60px 20px;">
      <div style="font-size: 4rem; color: var(--accent); margin-bottom: 24px;">
        <i class="fas fa-circle-check"></i>
      </div>
      <h2 style="margin-bottom: 16px;">Your Message Has Been Sent</h2>
      <p style="font-size: 1.125rem; color: var(--gray-600); margin-bottom: 12px;">Thank you for reaching out to ${SITE.name}. We've received your request and will get back to you within 24 hours.</p>
      <p style="font-size: 1.125rem; color: var(--gray-600); margin-bottom: 32px;">Need an immediate response? Give us a call:</p>
      <a href="tel:${SITE.phoneTel}" class="btn btn-primary" style="margin-right: 12px;"><i class="fas fa-phone"></i> ${SITE.phone}</a>
      <a href="index.html" class="btn btn-primary" style="background: var(--navy); border-color: var(--navy);">Back to Home</a>
    </div>
  </section>
  </main>

${footer()}

</body>
</html>`);

// ---- service-areas.html ----
writePage('service-areas.html', `<!DOCTYPE html>
<html lang="en">
<head>
${HEAD_COMMON}
  <link rel="stylesheet" href="css/inner.css?v=1">
${seoMeta(`Service Areas | ${SITE.name}`, `${SITE.name} serves Milford, Matamoras, Port Jervis, Dingmans Ferry, and surrounding areas in the Tri-State Area.`, 'service-areas.html')}
  <script type="application/ld+json">
  ${JSON.stringify({
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": SITE.name,
    "description": SITE.description,
    "telephone": SITE.phone,
    "email": SITE.email,
    "url": `https://${SITE.domain}`,
    "image": SITE.ogImage,
    "address": { "@type": "PostalAddress", "addressLocality": "Milford", "addressRegion": "PA", "addressCountry": "US", "postalCode": "18337" },
    "areaServed": [
      { "@type": "City", "name": "Milford", "containedInPlace": { "@type": "State", "name": "Pennsylvania" } },
      { "@type": "City", "name": "Matamoras", "containedInPlace": { "@type": "State", "name": "Pennsylvania" } },
      { "@type": "City", "name": "Dingmans Ferry", "containedInPlace": { "@type": "State", "name": "Pennsylvania" } },
      { "@type": "City", "name": "Port Jervis", "containedInPlace": { "@type": "State", "name": "New York" } },
      { "@type": "City", "name": "Sparrowbush", "containedInPlace": { "@type": "State", "name": "New York" } },
      { "@type": "City", "name": "Montague", "containedInPlace": { "@type": "State", "name": "New Jersey" } }
    ]
  }, null, 2)}
  </script>
  <script type="application/ld+json">
  ${breadcrumbSchema('Service Areas', 'service-areas.html')}
  </script>
  <style>
    .areas-intro { padding: 80px 0 40px; }
    .areas-intro .container { max-width: 900px; margin: 0 auto; padding: 0 24px; text-align: center; }
    .areas-intro h2 { font-family: 'Playfair Display', serif; font-size: 2.2rem; color: var(--heading); margin-bottom: 16px; }
    .areas-intro p { color: var(--gray-600); font-size: 1.1rem; line-height: 1.8; }
    .areas-section { padding: 40px 0 80px; }
    .areas-section .container { max-width: 1200px; margin: 0 auto; padding: 0 24px; }
    .areas-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 32px; }
    .area-group { background: var(--white); border-radius: var(--radius-lg); box-shadow: var(--shadow); padding: 32px; transition: transform var(--transition), box-shadow var(--transition); }
    .area-group:hover { transform: translateY(-4px); box-shadow: var(--shadow-lg); }
    .area-group-header { display: flex; align-items: center; gap: 12px; margin-bottom: 20px; padding-bottom: 16px; border-bottom: 2px solid var(--gray-100); }
    .area-group-icon { width: 48px; height: 48px; min-width: 48px; background: var(--navy); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: var(--accent); font-size: 1.1rem; }
    .area-group h3 { font-family: 'Playfair Display', serif; font-size: 1.3rem; color: var(--heading); }
    .area-group h3 span { display: block; font-family: 'Inter', sans-serif; font-size: 0.8rem; font-weight: 500; color: var(--gray-400); margin-top: 2px; }
    .area-list { list-style: none; padding: 0; margin: 0; }
    .area-list li { padding: 10px 0; border-bottom: 1px solid var(--gray-100); color: var(--gray-600); font-size: 0.95rem; display: flex; align-items: center; gap: 10px; }
    .area-list li:last-child { border-bottom: none; }
    .area-list li i { color: var(--accent); font-size: 0.7rem; }
    .services-callout { background: var(--off-white); padding: 60px 0; }
    .services-callout .container { max-width: 1200px; margin: 0 auto; padding: 0 24px; text-align: center; }
    .services-callout h2 { font-family: 'Playfair Display', serif; font-size: 2rem; color: var(--heading); margin-bottom: 16px; }
    .services-callout p { color: var(--gray-600); font-size: 1.05rem; line-height: 1.7; max-width: 700px; margin: 0 auto 32px; }
    .services-tag-grid { display: flex; flex-wrap: wrap; justify-content: center; gap: 12px; max-width: 900px; margin: 0 auto; }
    .service-tag { display: inline-block; padding: 8px 20px; background: var(--white); border: 1px solid var(--gray-200); border-radius: 30px; color: var(--navy); font-size: 0.9rem; font-weight: 500; text-decoration: none; transition: all var(--transition); }
    .service-tag:hover { background: var(--navy); color: var(--white); border-color: var(--navy); }
    @media (max-width: 768px) { .areas-grid { grid-template-columns: 1fr; } .areas-intro h2 { font-size: 1.8rem; } }
  </style>
</head>
<body>

${header('service-areas.html')}

  <main>
  ${pageHero('Service Areas', 'Service Areas')}

  <section class="areas-intro">
    <div class="container">
      <h2>Proudly Serving the Tri-State Area</h2>
      <p>${SITE.name} provides property maintenance, landscaping, and seasonal services to homeowners across the Tri-State Area, Upper Delaware River region, and the Pike County and Orange County communities. From Milford to Middletown, we bring quality work to your doorstep.</p>
    </div>
  </section>

  <section class="areas-section">
    <div class="container">
      <div class="areas-grid">
        <div class="area-group">
          <div class="area-group-header">
            <div class="area-group-icon"><i class="fas fa-map-marker-alt"></i></div>
            <h3>Pennsylvania <span>Pike &amp; Wayne Counties</span></h3>
          </div>
          <ul class="area-list">
            <li><i class="fas fa-circle"></i> Milford</li>
            <li><i class="fas fa-circle"></i> Matamoras</li>
            <li><i class="fas fa-circle"></i> Dingmans Ferry</li>
            <li><i class="fas fa-circle"></i> Bushkill</li>
            <li><i class="fas fa-circle"></i> Shohola</li>
            <li><i class="fas fa-circle"></i> Westfall</li>
            <li><i class="fas fa-circle"></i> Greeley</li>
            <li><i class="fas fa-circle"></i> Lackawaxen</li>
            <li><i class="fas fa-circle"></i> Hawley</li>
            <li><i class="fas fa-circle"></i> Honesdale</li>
            <li><i class="fas fa-circle"></i> East Stroudsburg</li>
            <li><i class="fas fa-circle"></i> Marshalls Creek</li>
          </ul>
        </div>
        <div class="area-group">
          <div class="area-group-header">
            <div class="area-group-icon"><i class="fas fa-map-marker-alt"></i></div>
            <h3>New York <span>Orange &amp; Sullivan Counties</span></h3>
          </div>
          <ul class="area-list">
            <li><i class="fas fa-circle"></i> Port Jervis</li>
            <li><i class="fas fa-circle"></i> Sparrowbush</li>
            <li><i class="fas fa-circle"></i> Cuddebackville</li>
            <li><i class="fas fa-circle"></i> Huguenot</li>
            <li><i class="fas fa-circle"></i> Godeffroy</li>
            <li><i class="fas fa-circle"></i> Otisville</li>
            <li><i class="fas fa-circle"></i> Middletown</li>
            <li><i class="fas fa-circle"></i> Goshen</li>
            <li><i class="fas fa-circle"></i> Warwick</li>
            <li><i class="fas fa-circle"></i> Monroe</li>
            <li><i class="fas fa-circle"></i> Newburgh</li>
            <li><i class="fas fa-circle"></i> New Windsor</li>
          </ul>
        </div>
        <div class="area-group">
          <div class="area-group-header">
            <div class="area-group-icon"><i class="fas fa-map-marker-alt"></i></div>
            <h3>New Jersey <span>Sussex County</span></h3>
          </div>
          <ul class="area-list">
            <li><i class="fas fa-circle"></i> Montague</li>
            <li><i class="fas fa-circle"></i> High Point</li>
            <li><i class="fas fa-circle"></i> Sussex</li>
            <li><i class="fas fa-circle"></i> Branchville</li>
            <li><i class="fas fa-circle"></i> Sandyston</li>
            <li><i class="fas fa-circle"></i> Wantage</li>
          </ul>
        </div>
      </div>
    </div>
  </section>

  <section class="services-callout">
    <div class="container">
      <h2>Services Available in Your Area</h2>
      <p>No matter where you are in the tri-state region, our full range of property maintenance, landscaping, and seasonal services is available to you.</p>
      <div class="services-tag-grid">
        <a href="carpentry.html" class="service-tag">Carpentry</a>
        <a href="flooring.html" class="service-tag">Flooring</a>
        <a href="painting.html" class="service-tag">Painting &amp; Finishing</a>
        <a href="doors-windows.html" class="service-tag">Doors &amp; Windows</a>
        <a href="home-repair.html" class="service-tag">Home Repair</a>
        <a href="landscape-design.html" class="service-tag">Landscape Design</a>
        <a href="lawn-care.html" class="service-tag">Lawn Care</a>
        <a href="patios-walkways.html" class="service-tag">Patios &amp; Walkways</a>
        <a href="fencing-decks.html" class="service-tag">Fencing &amp; Decks</a>
        <a href="snow-plowing.html" class="service-tag">Snow Plowing</a>
        <a href="ice-management.html" class="service-tag">Ice Management</a>
        <a href="fall-cleanup.html" class="service-tag">Fall Cleanup</a>
        <a href="spring-prep.html" class="service-tag">Spring Prep</a>
      </div>
    </div>
  </section>

  <section class="cta-banner section">
    <div class="container">
      <h2>Serving Your Neighborhood</h2>
      <p>Not sure if we cover your area? Give us a call — we're always happy to discuss your project.</p>
      <a href="contact.html" class="btn btn-primary">Get a Free Estimate</a>
    </div>
  </section>
  </main>

${footer()}

</body>
</html>`);

// ===================== SERVICE PAGES =====================
const services = [
  {
    file: 'carpentry.html', title: 'Carpentry', heroTitle: 'Carpentry', breadcrumbParent: 'Home Services',
    metaDesc: 'Professional carpentry services in Milford PA — custom woodwork, framing, trim, cabinetry, and structural repairs by Milford Property Maintenance.',
    content: {
      image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80',
      imageAlt: 'Carpentry work in progress',
      heading: 'Expert Carpentry for Every Project',
      paragraphs: [
        'Whether you need custom cabinetry, structural framing, trim work, or furniture-quality woodwork, Milford Property Maintenance delivers precision carpentry that stands the test of time. Our experienced carpenters bring craftsmanship and attention to detail to every project.',
        'From new construction framing to finish carpentry — crown molding, baseboards, wainscoting, and custom built-ins — we handle jobs of every scale. We work with hardwoods, softwoods, and engineered materials to match your style and budget.',
        'Need a deck rebuilt, stairs repaired, or a custom shelving unit designed? We\'re your local carpentry crew. No job too big, no detail too small.'
      ]
    },
    features: [
      { icon: 'fas fa-ruler-combined', title: 'Custom Woodwork', desc: 'Built-in shelves, mantels, wainscoting, and bespoke pieces crafted to your exact specifications.' },
      { icon: 'fas fa-home', title: 'Framing & Structural', desc: 'Wall framing, floor joists, roof trusses, and structural repairs done to code.' },
      { icon: 'fas fa-magic', title: 'Finish Carpentry', desc: 'Crown molding, trim, baseboards, door casings, and window surrounds for a polished look.' }
    ],
    faqItems: [
      { q: 'What types of carpentry do you offer?', a: 'We handle everything from rough framing and structural repairs to finish carpentry like trim, molding, cabinetry, and custom built-ins.' },
      { q: 'Can you match existing woodwork?', a: 'Yes. We carefully match wood species, stain colors, and profiles to blend seamlessly with your existing trim and millwork.' },
      { q: 'Do you build custom furniture?', a: 'We specialize in built-in furniture like bookshelves, window seats, and storage units. For standalone furniture, contact us to discuss your project.' }
    ],
    otherServices: [
      { href: 'painting.html', icon: 'fas fa-paint-roller', title: 'Painting & Finishing', desc: 'Interior and exterior painting with clean lines and lasting finishes.' },
      { href: 'home-repair.html', icon: 'fas fa-wrench', title: 'Home Repair', desc: 'General handyman services and maintenance to keep your home in top shape.' }
    ]
  },
  {
    file: 'flooring.html', title: 'Flooring', heroTitle: 'Flooring', breadcrumbParent: 'Home Services',
    metaDesc: 'Professional flooring installation in Milford PA — hardwood, tile, laminate, vinyl, and refinishing by Milford Property Maintenance.',
    content: {
      image: 'https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?w=600&q=80',
      imageAlt: 'Hardwood floor installation',
      heading: 'Beautiful Floors That Last',
      paragraphs: [
        'Transform your home from the ground up with professional flooring installation from Milford Property Maintenance. We install and refinish hardwood, tile, laminate, luxury vinyl plank, and more.',
        'Whether you\'re updating a single room or re-flooring your entire home, our crew delivers precision installation with clean transitions and meticulous attention to detail. We handle subfloor prep, removal of old flooring, and proper installation to manufacturer specs.',
        'Looking to restore the beauty of existing hardwood? Our refinishing services bring worn floors back to life with sanding, staining, and professional-grade finishes.'
      ]
    },
    features: [
      { icon: 'fas fa-layer-group', title: 'Hardwood & Laminate', desc: 'Expert installation and refinishing of solid hardwood, engineered wood, and laminate flooring.' },
      { icon: 'fas fa-border-all', title: 'Tile & Stone', desc: 'Ceramic, porcelain, and natural stone tile for kitchens, bathrooms, and entryways.' },
      { icon: 'fas fa-water', title: 'Vinyl & LVP', desc: 'Waterproof luxury vinyl plank and sheet vinyl for durable, low-maintenance flooring.' }
    ],
    faqItems: [],
    otherServices: [
      { href: 'carpentry.html', icon: 'fas fa-hammer', title: 'Carpentry', desc: 'Custom woodwork, trim, and structural repairs.' },
      { href: 'painting.html', icon: 'fas fa-paint-roller', title: 'Painting & Finishing', desc: 'Interior and exterior painting services.' },
      { href: 'doors-windows.html', icon: 'fas fa-door-open', title: 'Doors & Windows', desc: 'Installation, replacement, and repair.' }
    ]
  },
  {
    file: 'painting.html', title: 'Painting & Finishing', heroTitle: 'Painting & Finishing', breadcrumbParent: 'Home Services',
    metaDesc: 'Professional interior and exterior painting in Milford PA — clean lines, quality materials, and lasting finishes by Milford Property Maintenance.',
    content: {
      image: 'https://images.unsplash.com/photo-1562259929-b4e1fd3aef09?w=600&q=80',
      imageAlt: 'Interior painting project',
      heading: 'Fresh Paint, Lasting Impressions',
      paragraphs: [
        'Nothing transforms a space faster than a fresh coat of paint. Milford Property Maintenance provides professional interior and exterior painting services with careful prep work, clean lines, and finishes that last.',
        'We handle everything from single accent walls to complete interior repaints and full exterior jobs. Our crew takes the time to properly prep surfaces — patching, sanding, priming, and caulking — because great paint work starts with great preparation.',
        'We use premium paints from trusted brands and offer expert color consultation to help you choose the perfect palette for your home.'
      ]
    },
    features: [
      { icon: 'fas fa-paint-roller', title: 'Interior Painting', desc: 'Walls, ceilings, trim, doors, and cabinets with precision cutting and smooth finishes.' },
      { icon: 'fas fa-house', title: 'Exterior Painting', desc: 'Siding, trim, shutters, doors, and deck staining to protect and beautify your home.' },
      { icon: 'fas fa-brush', title: 'Staining & Finishing', desc: 'Wood staining, polyurethane, and specialty finishes for decks, fences, and interior woodwork.' }
    ],
    faqItems: [],
    otherServices: [
      { href: 'carpentry.html', icon: 'fas fa-hammer', title: 'Carpentry', desc: 'Custom woodwork and finish carpentry.' },
      { href: 'flooring.html', icon: 'fas fa-border-all', title: 'Flooring', desc: 'Hardwood, tile, laminate, and vinyl installation.' },
      { href: 'home-repair.html', icon: 'fas fa-wrench', title: 'Home Repair', desc: 'General maintenance and handyman services.' }
    ]
  },
  {
    file: 'doors-windows.html', title: 'Doors & Windows', heroTitle: 'Doors & Windows', breadcrumbParent: 'Home Services',
    metaDesc: 'Door and window installation, replacement, and repair in Milford PA by Milford Property Maintenance. Improve efficiency, security, and curb appeal.',
    content: {
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&q=80',
      imageAlt: 'New window installation',
      heading: 'Upgrade Your Home\'s Comfort and Style',
      paragraphs: [
        'New doors and windows can dramatically improve your home\'s energy efficiency, security, and curb appeal. Milford Property Maintenance handles professional installation, replacement, and repair of all types of doors and windows.',
        'From entry doors and sliding glass doors to double-hung windows and casements, we ensure proper fitting, insulation, and weathersealing for maximum performance. We work with leading manufacturers to offer a wide range of styles and materials.',
        'Dealing with drafty windows, stuck doors, or broken hardware? Our repair services restore function and efficiency without the cost of full replacement.'
      ]
    },
    features: [
      { icon: 'fas fa-door-open', title: 'Door Installation', desc: 'Entry doors, interior doors, sliding doors, storm doors — installed with precision fit and finish.' },
      { icon: 'fas fa-window-maximize', title: 'Window Replacement', desc: 'Energy-efficient windows in all styles — double-hung, casement, bay, picture, and sliding.' },
      { icon: 'fas fa-screwdriver-wrench', title: 'Repairs & Hardware', desc: 'Fix sticking doors, broken locks, foggy glass, damaged frames, and worn weatherstripping.' }
    ],
    faqItems: [],
    otherServices: [
      { href: 'carpentry.html', icon: 'fas fa-hammer', title: 'Carpentry', desc: 'Custom trim and framing around doors and windows.' },
      { href: 'painting.html', icon: 'fas fa-paint-roller', title: 'Painting & Finishing', desc: 'Fresh paint to complement your new installations.' },
      { href: 'home-repair.html', icon: 'fas fa-wrench', title: 'Home Repair', desc: 'General handyman services and maintenance.' }
    ]
  },
  {
    file: 'home-repair.html', title: 'Home Repair', heroTitle: 'Home Repair', breadcrumbParent: 'Home Services',
    metaDesc: 'General home repair and handyman services in Milford PA — from small fixes to major repairs by Milford Property Maintenance.',
    content: {
      image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&q=80',
      imageAlt: 'Home repair and maintenance work',
      heading: 'No Fix Too Small, No Repair Too Big',
      paragraphs: [
        'Every home needs maintenance, and Milford Property Maintenance is your go-to crew for all the repairs and fixes that keep your property in top shape. From leaky faucets and squeaky doors to drywall patches and structural repairs, we handle it all.',
        'Our general handyman services cover a wide range of tasks — mounting TVs and shelves, repairing drywall, fixing trim, replacing fixtures, adjusting doors, and tackling all those projects on your to-do list.',
        'We also handle larger repair projects including water damage restoration, rotten wood replacement, porch and step repairs, and general property maintenance. One call, one crew, everything fixed.'
      ]
    },
    features: [
      { icon: 'fas fa-wrench', title: 'Handyman Services', desc: 'All those odd jobs, fixes, and installations that keep your home running smoothly.' },
      { icon: 'fas fa-hammer', title: 'Structural Repairs', desc: 'Rotten wood replacement, porch repairs, step rebuilding, and load-bearing fixes.' },
      { icon: 'fas fa-shield-halved', title: 'Preventive Maintenance', desc: 'Regular inspections and upkeep to catch problems early and save money long-term.' }
    ],
    faqItems: [],
    otherServices: [
      { href: 'carpentry.html', icon: 'fas fa-hammer', title: 'Carpentry', desc: 'Custom woodwork and structural carpentry.' },
      { href: 'painting.html', icon: 'fas fa-paint-roller', title: 'Painting & Finishing', desc: 'Interior and exterior painting services.' },
      { href: 'doors-windows.html', icon: 'fas fa-door-open', title: 'Doors & Windows', desc: 'Installation, replacement, and repair.' }
    ]
  },
  {
    file: 'landscape-design.html', title: 'Landscape Design', heroTitle: 'Landscape Design', breadcrumbParent: 'Outdoor',
    metaDesc: 'Custom landscape design in Milford PA — plantings, garden beds, hardscaping, and outdoor living spaces by Milford Property Maintenance.',
    content: {
      image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=600&q=80',
      imageAlt: 'Beautiful landscape design',
      heading: 'Transform Your Outdoor Space',
      paragraphs: [
        'Your outdoor space should be an extension of your home. Milford Property Maintenance creates custom landscape designs that combine beauty, function, and low-maintenance plantings to transform your yard into the outdoor living space you\'ve always wanted.',
        'From foundation plantings and garden beds to retaining walls, water features, and complete yard makeovers, we plan and execute every detail. We work with native plants that thrive in the local climate and design for year-round visual interest.',
        'Whether you have a blank canvas or want to refresh an existing landscape, our design process starts with a conversation about your vision and ends with a property that turns heads.'
      ]
    },
    features: [
      { icon: 'fas fa-seedling', title: 'Plantings & Garden Beds', desc: 'Native plants, shrubs, perennials, and ornamental trees selected for year-round beauty.' },
      { icon: 'fas fa-mountain', title: 'Hardscaping', desc: 'Retaining walls, garden walls, edging, and stone features that add structure and dimension.' },
      { icon: 'fas fa-tree', title: 'Tree Services', desc: 'Tree planting, pruning, and removal to enhance your landscape and protect your property.' }
    ],
    faqItems: [],
    otherServices: [
      { href: 'lawn-care.html', icon: 'fas fa-tree', title: 'Lawn Care', desc: 'Regular mowing, edging, and fertilization.' },
      { href: 'patios-walkways.html', icon: 'fas fa-road', title: 'Patios & Walkways', desc: 'Pavers, stone, and concrete outdoor spaces.' },
      { href: 'fencing-decks.html', icon: 'fas fa-th-large', title: 'Fencing & Decks', desc: 'Quality fence and deck installation.' }
    ]
  },
  {
    file: 'lawn-care.html', title: 'Lawn Care', heroTitle: 'Lawn Care', breadcrumbParent: 'Outdoor',
    metaDesc: 'Professional lawn care and maintenance in Milford PA — mowing, edging, fertilization, aeration, and seasonal cleanup by Milford Property Maintenance.',
    content: {
      image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=600&q=80',
      imageAlt: 'Manicured green lawn',
      heading: 'A Beautiful Lawn, Every Season',
      paragraphs: [
        'A well-maintained lawn is the foundation of great curb appeal. Milford Property Maintenance provides full-service lawn care including regular mowing, edging, trimming, fertilization, aeration, and overseeding to keep your yard lush and healthy year-round.',
        'Our lawn care programs are tailored to your property\'s specific needs. We consider soil type, grass variety, sun exposure, and drainage to create a maintenance plan that delivers results. Weekly, bi-weekly, or custom schedules available.',
        'From first spring mowing to final fall cleanup, we keep your lawn looking its best so you can enjoy your property without the hassle.'
      ]
    },
    features: [
      { icon: 'fas fa-cut', title: 'Mowing & Edging', desc: 'Regular precision mowing, string trimming, and clean edging for a manicured look every visit.' },
      { icon: 'fas fa-flask', title: 'Fertilization & Weed Control', desc: 'Seasonal fertilizer applications and targeted weed treatment for a thick, healthy lawn.' },
      { icon: 'fas fa-tint', title: 'Aeration & Overseeding', desc: 'Core aeration and overseeding to improve root growth, fill bare spots, and thicken your turf.' }
    ],
    faqItems: [],
    otherServices: [
      { href: 'landscape-design.html', icon: 'fas fa-leaf', title: 'Landscape Design', desc: 'Custom plantings and garden beds.' },
      { href: 'fall-cleanup.html', icon: 'fas fa-broom', title: 'Fall Cleanup', desc: 'Leaf removal and winterization.' },
      { href: 'spring-prep.html', icon: 'fas fa-sun', title: 'Spring Prep', desc: 'Mulching, bed prep, and spring cleanup.' }
    ]
  },
  {
    file: 'patios-walkways.html', title: 'Patios & Walkways', heroTitle: 'Patios & Walkways', breadcrumbParent: 'Outdoor',
    metaDesc: 'Custom patio and walkway installation in Milford PA — pavers, flagstone, concrete, and natural stone by Milford Property Maintenance.',
    content: {
      image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=600&q=80',
      imageAlt: 'Paver patio installation',
      heading: 'Outdoor Living Spaces Built to Last',
      paragraphs: [
        'A well-built patio or walkway adds beauty, function, and value to your property. Milford Property Maintenance designs and installs custom patios, walkways, and outdoor living areas using pavers, natural stone, flagstone, and concrete.',
        'From simple front walkways to expansive backyard patios with fire pit areas and seating walls, we handle every phase — excavation, base preparation, drainage, and precision installation. Proper foundation work is key to a surface that stays level and beautiful for years.',
        'We\'ll work with you to choose the right materials, patterns, and layout to complement your home and landscape. Every project is built to withstand our Tri-State Area freeze-thaw cycles.'
      ]
    },
    features: [
      { icon: 'fas fa-road', title: 'Paver Patios', desc: 'Interlocking pavers in countless colors and patterns for durable, beautiful outdoor spaces.' },
      { icon: 'fas fa-shoe-prints', title: 'Walkways & Paths', desc: 'Stone, paver, and concrete walkways that guide traffic and enhance curb appeal.' },
      { icon: 'fas fa-fire', title: 'Outdoor Features', desc: 'Fire pits, seating walls, and built-in planters to create the ultimate outdoor living area.' }
    ],
    faqItems: [],
    otherServices: [
      { href: 'landscape-design.html', icon: 'fas fa-leaf', title: 'Landscape Design', desc: 'Complete landscape plans and plantings.' },
      { href: 'fencing-decks.html', icon: 'fas fa-th-large', title: 'Fencing & Decks', desc: 'Custom fences and deck construction.' },
      { href: 'lawn-care.html', icon: 'fas fa-tree', title: 'Lawn Care', desc: 'Regular lawn maintenance and fertilization.' }
    ]
  },
  {
    file: 'fencing-decks.html', title: 'Fencing & Decks', heroTitle: 'Fencing & Decks', breadcrumbParent: 'Outdoor',
    metaDesc: 'Professional fence installation and custom deck building in Milford PA by Milford Property Maintenance. Wood, vinyl, composite, and chain link.',
    content: {
      image: 'https://images.unsplash.com/photo-1560749003-f4b1e17e2dff?w=600&q=80',
      imageAlt: 'New fence and deck',
      heading: 'Fences & Decks That Define Your Space',
      paragraphs: [
        'Whether you need privacy, security, or a beautiful outdoor living area, Milford Property Maintenance builds quality fences and decks that add value and functionality to your property.',
        'We install wood, vinyl, composite, aluminum, and chain-link fencing for residential and commercial properties. From classic picket fences to tall privacy panels, we build to your specifications with proper post setting and level construction.',
        'Our custom decks are designed for your lifestyle — from simple platforms to multi-level entertaining spaces with built-in seating, railings, and stairs. We work with pressure-treated lumber, cedar, and composite decking materials.'
      ]
    },
    features: [
      { icon: 'fas fa-th-large', title: 'Fence Installation', desc: 'Wood, vinyl, composite, aluminum, and chain-link fencing for privacy, security, and style.' },
      { icon: 'fas fa-layer-group', title: 'Custom Decks', desc: 'Multi-level decks, simple platforms, and screened-in porches built to your specifications.' },
      { icon: 'fas fa-tools', title: 'Repairs & Staining', desc: 'Fence and deck repairs, board replacement, power washing, and protective staining.' }
    ],
    faqItems: [],
    otherServices: [
      { href: 'patios-walkways.html', icon: 'fas fa-road', title: 'Patios & Walkways', desc: 'Paver patios and stone walkways.' },
      { href: 'landscape-design.html', icon: 'fas fa-leaf', title: 'Landscape Design', desc: 'Complete landscape planning.' },
      { href: 'painting.html', icon: 'fas fa-paint-roller', title: 'Painting & Finishing', desc: 'Deck and fence staining and finishing.' }
    ]
  },
  {
    file: 'snow-plowing.html', title: 'Snow Plowing', heroTitle: 'Snow Plowing', breadcrumbParent: 'Seasonal',
    metaDesc: 'Reliable snow plowing in Milford PA — 24/7 response, seasonal contracts, residential and commercial snow removal by Milford Property Maintenance.',
    content: {
      image: 'https://images.unsplash.com/photo-1457269449834-928af64c684d?w=600&q=80',
      imageAlt: 'Snow plow clearing a residential driveway',
      heading: 'Dependable Snow Removal When You Need It Most',
      paragraphs: [
        'Tri-State Area winters bring heavy snowfall that can shut down driveways, parking lots, and walkways in hours. Milford Property Maintenance provides fast, reliable snow plowing services to keep your property safe and accessible all season long.',
        'We serve both residential homeowners and commercial property managers throughout the region. Whether you need a single driveway cleared or a multi-acre parking lot maintained, our fleet handles jobs of every scale.',
        'For worry-free winter coverage, we offer seasonal contracts at competitive rates with priority service, predetermined trigger depths, and unlimited visits. Call us to lock in your rate before the first flake falls.'
      ]
    },
    features: [
      { icon: 'fas fa-clock', title: '24/7 Response', desc: 'Our crews monitor weather and deploy immediately when snow accumulates — day or night.' },
      { icon: 'fas fa-file-signature', title: 'Seasonal Contracts', desc: 'Lock in priority service and predictable pricing with a seasonal contract.' },
      { icon: 'fas fa-building', title: 'Residential & Commercial', desc: 'From driveways to large commercial lots — we have the equipment for any property size.' }
    ],
    faqItems: [
      { q: 'What areas do you service for snow plowing?', a: `We service Milford, Matamoras, Dingmans Ferry, Port Jervis, Sparrowbush, and surrounding communities within our service radius.` },
      { q: 'Do you offer seasonal contracts?', a: 'Yes. Seasonal contracts guarantee priority service and can save you money over the winter season compared to per-visit pricing.' },
      { q: 'What time do you start plowing?', a: 'We begin early morning before commute times. For heavy storms, we run continuous routes throughout the day.' },
      { q: 'Do you also handle ice management?', a: 'Yes. We offer full ice management including salt and sand application. See our ice management page for details.' },
      { q: 'How do I sign up?', a: `Call us at ${SITE.phone} or use our contact form. We recommend signing up before the first snowfall to secure priority placement.` }
    ],
    otherServices: [
      { href: 'ice-management.html', icon: 'fas fa-temperature-low', title: 'Ice Management', desc: 'De-icing and salt application for safe walkways and driveways.' },
      { href: 'fall-cleanup.html', icon: 'fas fa-leaf', title: 'Fall Cleanup', desc: 'Leaf removal, gutter cleaning, and winterization.' },
      { href: 'spring-prep.html', icon: 'fas fa-seedling', title: 'Spring Prep', desc: 'Spring cleanup, mulching, and bed preparation.' }
    ]
  },
  {
    file: 'ice-management.html', title: 'Ice Management', heroTitle: 'Ice Management', breadcrumbParent: 'Seasonal',
    metaDesc: 'Professional ice management in Milford PA — salt application, sand spreading, and de-icing for driveways, walkways, and parking lots.',
    content: {
      image: 'https://images.unsplash.com/photo-1516715094483-75da7dee9758?w=600&q=80',
      imageAlt: 'Ice management and salt application',
      heading: 'Keep Your Property Safe All Winter',
      paragraphs: [
        'Ice buildup on walkways, driveways, and parking areas creates dangerous slip-and-fall hazards. Milford Property Maintenance provides professional ice management services including salt application, sand spreading, and pre-treatment to keep surfaces safe.',
        'We use commercial-grade ice melt products that work in extreme cold while being mindful of your landscaping and concrete surfaces. Our pre-treatment service applies anti-icing agents before storms arrive to prevent ice from bonding to surfaces.',
        'Pair ice management with our snow plowing service for complete winter coverage. Seasonal packages available for residential and commercial properties.'
      ]
    },
    features: [
      { icon: 'fas fa-temperature-low', title: 'De-Icing', desc: 'Commercial-grade salt and ice melt applied to driveways, walkways, and parking areas.' },
      { icon: 'fas fa-shield-halved', title: 'Pre-Treatment', desc: 'Anti-icing application before storms to prevent dangerous ice buildup.' },
      { icon: 'fas fa-building', title: 'Commercial Service', desc: 'Keep your business, parking lot, and walkways safe for employees and customers.' }
    ],
    faqItems: [],
    otherServices: [
      { href: 'snow-plowing.html', icon: 'fas fa-snowflake', title: 'Snow Plowing', desc: 'Reliable snow removal for driveways and parking lots.' },
      { href: 'fall-cleanup.html', icon: 'fas fa-leaf', title: 'Fall Cleanup', desc: 'Prepare your property for winter.' },
      { href: 'spring-prep.html', icon: 'fas fa-seedling', title: 'Spring Prep', desc: 'Get your yard ready for the growing season.' }
    ]
  },
  {
    file: 'fall-cleanup.html', title: 'Fall Cleanup', heroTitle: 'Fall Cleanup', breadcrumbParent: 'Seasonal',
    metaDesc: 'Professional fall cleanup in Milford PA — leaf removal, gutter cleaning, garden winterization, and property prep by Milford Property Maintenance.',
    content: {
      image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&q=80',
      imageAlt: 'Fall cleanup with leaves',
      heading: 'Prepare Your Property for Winter',
      paragraphs: [
        'As the leaves fall and temperatures drop, your property needs attention to stay healthy through winter. Milford Property Maintenance provides comprehensive fall cleanup services to prepare your yard, garden beds, and outdoor spaces for the cold months ahead.',
        'Our fall cleanup package includes leaf removal from lawns and garden beds, gutter cleaning, perennial cutback, garden bed winterization, and final mowing. We also handle storm debris, branch cleanup, and general yard tidying.',
        'A thorough fall cleanup prevents lawn disease, protects plantings, and ensures your property is ready for snow season. Schedule early — our fall slots fill up fast.'
      ]
    },
    features: [
      { icon: 'fas fa-leaf', title: 'Leaf Removal', desc: 'Complete leaf removal from lawns, beds, and hard surfaces using blowers, rakes, and vacuums.' },
      { icon: 'fas fa-droplet', title: 'Gutter Cleaning', desc: 'Clear clogged gutters and downspouts to prevent ice dams and water damage.' },
      { icon: 'fas fa-seedling', title: 'Garden Winterization', desc: 'Perennial cutback, mulching, and bed preparation to protect plants through winter.' }
    ],
    faqItems: [],
    otherServices: [
      { href: 'snow-plowing.html', icon: 'fas fa-snowflake', title: 'Snow Plowing', desc: 'Reliable snow removal all winter long.' },
      { href: 'lawn-care.html', icon: 'fas fa-tree', title: 'Lawn Care', desc: 'Regular lawn maintenance and fertilization.' },
      { href: 'spring-prep.html', icon: 'fas fa-sun', title: 'Spring Prep', desc: 'Get your yard ready for the growing season.' }
    ]
  },
  {
    file: 'spring-prep.html', title: 'Spring Prep', heroTitle: 'Spring Prep', breadcrumbParent: 'Seasonal',
    metaDesc: 'Spring cleanup and yard preparation in Milford PA — mulching, bed prep, debris removal, and early-season maintenance by Milford Property Maintenance.',
    content: {
      image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=600&q=80',
      imageAlt: 'Spring garden preparation',
      heading: 'Get Your Yard Ready for the Season',
      paragraphs: [
        'After a long winter, your property needs a fresh start. Milford Property Maintenance provides spring cleanup and preparation services to revive your lawn, garden beds, and outdoor spaces after the cold months.',
        'Our spring prep package includes winter debris removal, first mowing, edging, bed cleanup, mulch application, pruning, and dividing overgrown perennials. We also address any winter damage to lawns, beds, and hardscaping.',
        'A proper spring prep sets the tone for a beautiful yard all season long. Early scheduling ensures your property is one of the first in the neighborhood to look its best.'
      ]
    },
    features: [
      { icon: 'fas fa-broom', title: 'Spring Cleanup', desc: 'Remove winter debris, dead plant material, and storm damage from your entire property.' },
      { icon: 'fas fa-layer-group', title: 'Mulching', desc: 'Fresh mulch application to garden beds for moisture retention, weed suppression, and a polished look.' },
      { icon: 'fas fa-cut', title: 'Pruning & Edging', desc: 'Shrub pruning, bed edging, and perennial division to promote healthy spring growth.' }
    ],
    faqItems: [],
    otherServices: [
      { href: 'lawn-care.html', icon: 'fas fa-tree', title: 'Lawn Care', desc: 'Regular mowing, edging, and fertilization.' },
      { href: 'landscape-design.html', icon: 'fas fa-leaf', title: 'Landscape Design', desc: 'Custom plantings and garden designs.' },
      { href: 'fall-cleanup.html', icon: 'fas fa-broom', title: 'Fall Cleanup', desc: 'Leaf removal and winterization.' }
    ]
  }
];

services.forEach(s => {
  writePage(s.file, buildServicePage(s));
});

// ---- robots.txt ----
writePage('robots.txt', `User-agent: *
Allow: /

Sitemap: https://${SITE.domain}/sitemap.xml
`);

// ---- sitemap.xml ----
const allPages = [
  { url: '', priority: '1.0', freq: 'weekly' },
  { url: 'about.html', priority: '0.8', freq: 'monthly' },
  { url: 'contact.html', priority: '0.8', freq: 'monthly' },
  { url: 'gallery.html', priority: '0.7', freq: 'monthly' },
  { url: 'service-areas.html', priority: '0.8', freq: 'monthly' },
  ...services.map(s => ({ url: s.file, priority: '0.7', freq: 'monthly' }))
];

const today = new Date().toISOString().split('T')[0];
const sitemapEntries = allPages.map(p => `  <url>
    <loc>https://${SITE.domain}/${p.url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${p.freq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`).join('\n');

writePage('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemapindex.org/schemas/sitemap/0.9">
${sitemapEntries}
</urlset>
`);

console.log(`\nDone! Created ${allPages.length + 2} files (${allPages.length} pages + robots.txt + sitemap.xml)`);
