import React from 'react'
import { createRoot } from 'react-dom/client'
import { run } from 'vanilla-cookieconsent'
import App from './App.jsx'
import './styles.css'
import 'vanilla-cookieconsent/dist/cookieconsent.css'

run({
  guiOptions: {
    consentModal: {
      layout: 'box',
      position: 'bottom right',
      equalWeightButtons: true,
    },
    preferencesModal: {
      layout: 'box',
      equalWeightButtons: true,
    },
  },
  categories: {
    necessary: {
      enabled: true,
      readOnly: true,
    },
    analytics: {},
  },
  language: {
    default: 'fr',
    translations: {
      fr: {
        consentModal: {
          title: 'Votre confidentialité compte',
          description: 'Nous utilisons des cookies nécessaires au fonctionnement du site. Les cookies facultatifs de mesure d’audience ne seront utilisés qu’avec votre accord.',
          acceptAllBtn: 'Tout accepter',
          acceptNecessaryBtn: 'Tout refuser',
          showPreferencesBtn: 'Personnaliser',
        },
        preferencesModal: {
          title: 'Préférences de consentement',
          acceptAllBtn: 'Tout accepter',
          acceptNecessaryBtn: 'Tout refuser',
          savePreferencesBtn: 'Enregistrer mes choix',
          closeIconLabel: 'Fermer',
          sections: [
            {
              title: 'Utilisation des cookies',
              description: 'Les cookies nécessaires sont toujours actifs pour assurer le fonctionnement du site. Aucun outil de mesure d’audience n’est actuellement activé.',
            },
            {
              title: 'Cookies nécessaires',
              description: 'Ils permettent le fonctionnement du site et la mémorisation de votre choix de consentement.',
              linkedCategory: 'necessary',
            },
            {
              title: 'Mesure d’audience',
              description: 'Cette catégorie pourra être utilisée pour mesurer la fréquentation si un outil d’analyse est ajouté au site. Aucun cookie analytique n’est utilisé actuellement.',
              linkedCategory: 'analytics',
            },
          ],
        },
      },
    },
  },
})

createRoot(document.getElementById('root')).render(<React.StrictMode><App /></React.StrictMode>)

// Le préchargeur React couvre la page : on peut retirer la couleur de fond temporaire du HTML (voir index.html)
requestAnimationFrame(() => requestAnimationFrame(() => document.documentElement.classList.add('app-ready')))
