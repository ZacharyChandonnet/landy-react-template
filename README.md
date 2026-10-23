# Conformaction — site React

Stack : React 18 · Vite · GSAP (+ ScrollTrigger) · Framer Motion

## Lancer le projet
```
npm install
npm run dev      # http://localhost:5173
npm run build    # sortie dans /dist
```

## Images et offre de services
- Image du hero : `public/images/Portraits-Caroline-Oct2026-2216-HR.jpg`
- Image expertise : `public/images/Portraits-Caroline-Oct2026-2309-HR.jpg`
- Image large : `public/images/STCO.png`
- PDF de l’offre : `public/images/Offre de services.pdf` (lié dans la section Services)

Les chemins des images sont configurés dans `src/config.js`. Les fichiers placés dans
`public/` sont servis depuis la racine du site.

## Où modifier quoi
- `src/App.jsx` : structure de la page et animations GSAP (préchargeur, hero, parallaxe, marquee)
- `src/ui.jsx` : composants Framer Motion (titres mot par mot, révélations, ressorts au survol, compteurs)
- `src/data.js` : textes des listes · `src/styles.css` : couleurs (variables en haut)
- Formulaire : brancher votre envoi dans `submit()` de `App.jsx`

## SEO (ajouté)
- `index.html` : title, description, canonical, Open Graph, Twitter, hreflang, favicons, preload de l'image principale.
- `vite.config.js` : injecte au build les données structurées JSON-LD (ProfessionalService) et une version texte du contenu (sans JavaScript), générées depuis `src/data.js`.
- `public/robots.txt`, `public/sitemap.xml`, `public/site.webmanifest`.
- Images : fichiers WebP allégés (≈ 230 Ko au total au lieu de 7 Mo) avec noms descriptifs et `alt` dans `src/config.js`.
- Si le domaine n'est pas `https://conformaction.com`, remplacez-le dans `index.html`, `vite.config.js`, `sitemap.xml` et `robots.txt`.
