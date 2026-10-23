import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { SERVICES, THEMES, CLIENTS, PILLARS, BUILD, ORGS } from './src/data.js'

const SITE = 'https://conformaction.com'
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;')

/* SEO : injecte dans index.html (1) les données structurées JSON-LD et (2) une version texte du contenu
   lisible sans JavaScript. Tout est généré depuis src/data.js : modifiez vos textes à un seul endroit. */
function seo() {
  const jsonld = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite', '@id': `${SITE}/#website`, url: `${SITE}/`, name: 'Conformaction', inLanguage: 'fr-CA',
        publisher: { '@id': `${SITE}/#org` },
      },
      {
        '@type': ['ProfessionalService', 'Organization'], '@id': `${SITE}/#org`, name: 'Conformaction', url: `${SITE}/`,
        slogan: 'Conférence · Formation · Action',
        description: 'Conférences, formations, coaching et consultations en intervention de proximité et intervention mixte pour les organismes du Québec : services de police, sécurité incendie, municipalités, santé et services sociaux, milieu scolaire.',
        logo: `${SITE}/conformaction-logo-conference-formation-action.png`,
        image: `${SITE}/conformaction-formation-intervention-proximite-quebec-og.png`,
        areaServed: { '@type': 'AdministrativeArea', name: 'Québec', containedInPlace: { '@type': 'Country', name: 'Canada' } },
        availableLanguage: 'fr',
        knowsAbout: [...THEMES, 'Intervention de proximité', 'Intervention mixte', 'Partenariat et concertation'],
        audience: ORGS.map((name) => ({ '@type': 'Audience', audienceType: name })),
        hasOfferCatalog: {
          '@type': 'OfferCatalog', name: 'Offre de services',
          itemListElement: SERVICES.map(([name, d]) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name, description: d.replace(/ • /g, ', '), areaServed: 'Québec' } })),
        },
      },
    ],
  }
  const li = (a) => a.map((t) => `<li>${esc(t)}</li>`).join('')
  const fallback = `<div class="seo-static">
<header><a href="/"><img src="/conformaction-logo-conference-formation-action.png" alt="Conformaction — Conférence · Formation · Action" width="700" height="206"></a></header>
<main>
<h1>Conformaction : formation et conférences en intervention de proximité au Québec</h1>
<p>Pour tout organisme qui souhaite mettre en place des pratiques efficientes et donner à ses employé.es les outils et les moyens d’améliorer la qualité de leur travail, leur confiance et leur santé mentale. Service en présentiel à travers la province, virtuel ou hybride.</p>
<h2>Expertise</h2>${PILLARS.map(([, t, d]) => `<h3>${esc(t)}</h3><p>${esc(d)}</p>`).join('')}
<h2>Offre de services</h2>${SERVICES.map(([t, d]) => `<h3>${esc(t)}</h3><p>${esc(d)}</p>`).join('')}
<h3>Thématiques</h3><ul>${li(THEMES)}</ul><h3>Clientèles</h3><ul>${li(CLIENTS)}</ul>
<h2>Ce que nous construisons ensemble</h2><ul>${li(BUILD)}</ul>
<h2>Organismes ciblés</h2><ul>${li(ORGS)}</ul>
<h2>Soumission gratuite</h2><p>Parlons de vos besoins : soumission gratuite selon l’évaluation de vos besoins.</p>
</main>
</div>`
  return {
    name: 'conformaction-seo',
    transformIndexHtml: (html) =>
      html
        .replace('<!--JSONLD-->', `<script type="application/ld+json">${JSON.stringify(jsonld)}</script>`)
        .replace('<!--FALLBACK-->', fallback),
  }
}

export default defineConfig({ plugins: [react(), seo()] })
