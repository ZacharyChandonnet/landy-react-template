import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { AnimatePresence, MotionConfig, motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { showPreferences } from 'vanilla-cookieconsent'
import logo from './assets/logo.png'
import icon from './assets/logo-icon.png'
import { IMAGES } from './config'
import { BUILD, CLIENTS, ORGS, PILLARS, SERVICES, THEMES, MARQUEE } from './data'
import { Counter, Cursor, ImageSlot, MagButton, MagLink, Pop, Reveal, Words } from './ui'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  const root = useRef(null)
  const mq = useRef(null)
  const [loaded, setLoaded] = useState(false)
  const [menu, setMenu] = useState(false)
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)
  const [formError, setFormError] = useState('')

  /* Menu burger (mobile) : verrouille le scroll, se ferme avec Échap ou si l'écran s'élargit */
  useEffect(() => {
    document.body.style.overflow = menu ? 'hidden' : ''
    const onKey = (e) => e.key === 'Escape' && setMenu(false)
    const onResize = () => window.innerWidth > 760 && setMenu(false)
    window.addEventListener('keydown', onKey); window.addEventListener('resize', onResize)
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', onKey); window.removeEventListener('resize', onResize) }
  }, [menu])

  useLayoutEffect(() => {
    let tick
    const ctx = gsap.context(() => {
      const hw = gsap.utils.toArray('.hero .hw')
      gsap.set(hw, { yPercent: 115, rotate: 6 })
      gsap.set('.hero-r', { opacity: 0, y: 30 })
      gsap.set('#hs', { clipPath: 'inset(0% 0% 100% 0%)' })

      /* GSAP : préchargeur + entrée du hero (un seul moment orchestré) */
      const bar = document.querySelector('#pre i'), p = { v: 0 }
      gsap.timeline()
        .to(p, { v: 1, duration: 1.2, ease: 'power2.inOut', onUpdate: () => bar?.style.setProperty('--p', p.v) })
        .to('#pre', { yPercent: -100, duration: 1, ease: 'expo.inOut' })
        .to(hw, { yPercent: 0, rotate: 0, duration: 1.4, ease: 'expo.out', stagger: 0.07 }, '-=.4')
        .to('.hero-r', { opacity: 1, y: 0, duration: 1, stagger: 0.12, ease: 'power3.out' }, '-=1')
        .fromTo('#hs', { clipPath: 'inset(0% 0% 100% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.4, ease: 'expo.out', immediateRender: false, onComplete: () => gsap.set('#hs', { clearProps: 'clipPath' }) }, '-=1.2')
        .add(() => setLoaded(true))

      /* GSAP : forme organique, parallaxe, icône flottante */
      gsap.to('#bp', { attr: { d: 'M300 60c60 40 70 140 20 200s-120 110-200 70S30 240 70 140 250 20 300 60z' }, duration: 6, repeat: -1, yoyo: true, ease: 'sine.inOut' })
      gsap.to('.blob', { rotate: 40, y: 120, ease: 'none', scrollTrigger: { trigger: '.hero', scrub: true, start: 'top top', end: 'bottom top' } })
      gsap.to('.ico', { y: -18, rotate: 4, duration: 3, repeat: -1, yoyo: true, ease: 'sine.inOut' })
      gsap.to('.wm', { rotate: -25, ease: 'none', scrollTrigger: { trigger: '.contact', scrub: true, start: 'top bottom', end: 'bottom bottom' } })
      gsap.to('#bar', { scaleX: 1, ease: 'none', scrollTrigger: { scrub: 0.2, start: 0, end: 'max' } })
      gsap.to('#big', { xPercent: -35, ease: 'none', scrollTrigger: { trigger: '#big', scrub: 1, start: 'top bottom', end: 'bottom top' } })

      /* GSAP : marquee piloté par la vitesse du scroll */
      let x = 0, vel = 0
      ScrollTrigger.create({ onUpdate: (s) => { vel = s.getVelocity() / -300 } })
      tick = () => {
        x -= 1.2 + Math.abs(vel) * 1.5
        if (x < -mq.current.scrollWidth / 2) x = 0
        gsap.set(mq.current, { x, skewX: gsap.utils.clamp(-12, 12, vel) })
        vel *= 0.9
      }
      gsap.ticker.add(tick)
    }, root)
    return () => { gsap.ticker.remove(tick); ctx.revert() }
  }, [])

  const submit = async (e) => {
    e.preventDefault()
    setSending(true)
    setSent(false)
    setFormError('')
    try {
      const response = await fetch('https://formspree.io/f/xvzeqdeg', {
        method: 'POST',
        body: new FormData(e.currentTarget),
        headers: { Accept: 'application/json' },
      })
      if (!response.ok) throw new Error(`Formspree a répondu avec le statut ${response.status}.`)
      setSent(true)
    } catch (error) {
      console.error("Échec de l'envoi du formulaire :", error)
      setFormError("L’envoi a échoué. Veuillez réessayer ou nous contacter autrement.")
    } finally {
      setSending(false)
    }
  }
  const marquee = [...MARQUEE, ...MARQUEE]

  return (
    <MotionConfig reducedMotion="user">
      <div ref={root}>
        {!loaded && (
          <div id="pre">
            <b className="serif" aria-label="Conformaction"><span>Conform</span><span>action</span></b>
            <i />
          </div>
        )}
        <div id="bar" />
        <Cursor />

        <a className="skip" href="#contenu">Aller au contenu</a>
        <header>
        <nav aria-label="Navigation principale">
          <a href="#top" className="logo" aria-label="Conformaction, accueil"><img src={logo} alt="Conformaction — Conférence · Formation · Action" width="700" height="206" /></a>
          <ul>
            <li><a href="#expertise">Expertise</a></li><li><a href="#services">Services</a></li>
            <li><a href="#ensemble">Ensemble</a></li><li><a href="#contact">Contact</a></li>
          </ul>
          <button type="button" className={`burger${menu ? ' open' : ''}`} aria-expanded={menu} aria-controls="menu-mobile"
            aria-label={menu ? 'Fermer le menu' : 'Ouvrir le menu'} onClick={() => setMenu((m) => !m)}>
            <span /><span />
          </button>
        </nav>
        {/* Hors du <nav> : le flou d'arrière-plan du nav empêcherait le plein écran */}
        <AnimatePresence>
          {menu && (
            <motion.div id="menu-mobile" className="mmenu"
              initial={{ clipPath: 'circle(0% at calc(100% - 2.6rem) 2.6rem)' }}
              animate={{ clipPath: 'circle(150% at calc(100% - 2.6rem) 2.6rem)', transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
              exit={{ clipPath: 'circle(0% at calc(100% - 2.6rem) 2.6rem)', transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] } }}>
              {[['expertise', 'Expertise'], ['services', 'Services'], ['ensemble', 'Ensemble'], ['contact', 'Contact']].map(([id, label], i) => (
                <motion.a key={id} href={`#${id}`} className="serif" onClick={() => setMenu(false)}
                  initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0, transition: { delay: 0.3 + i * 0.08, duration: 0.7, ease: [0.16, 1, 0.3, 1] } }}>
                  <small>0{i + 1}</small>{label}
                </motion.a>
              ))}
              <p className="mfoot">Conférence · Formation · Action<br />Partout au Québec — présentiel, virtuel ou hybride</p>
            </motion.div>
          )}
        </AnimatePresence>
        </header>
        <main id="contenu">

        {/* HERO */}
        <section className="hero" id="top">
          <svg className="blob" viewBox="0 0 400 400" aria-hidden="true">
            <defs><linearGradient id="g" x1="0" x2="1" y1="0" y2="1"><stop offset="0" stopColor="#f37115" /><stop offset="1" stopColor="#25b5af" /></linearGradient></defs>
            <path id="bp" fill="url(#g)" d="M320 90c40 50 50 130 10 190s-130 90-200 60S20 230 50 150 270 30 320 90z" />
          </svg>
          <div>
            <div className="eyebrow hero-r">Conférence · Formation · Action</div>
            <Words as="h1" plain className="serif" parts={[{ t: 'Outiller les équipes,' }, { br: true }, { t: 'préserver', em: true }, { t: ' la confiance.' }]} />
            <p className="lead hero-r">Pour tout organisme qui souhaite mettre en place des pratiques efficientes et donner à ses employé.es les outils et les moyens d’améliorer la qualité de leur travail, leur confiance et leur santé mentale. Présentiel à travers la province, virtuel ou hybride.</p>
            <MagLink href="#expertise" className="cta hero-r">Mon expertise <span>↓</span></MagLink>
          </div>
          <ImageSlot id="hs" n={1} className="arch" initial={IMAGES.hero} priority />
        </section>

        <div className="mq"><div className="serif" ref={mq}>{marquee.map((t, i) => <span key={i}>{t}</span>)}</div></div>

        {/* EXPERTISE */}
        <section id="expertise">
          <div className="split">
            <ImageSlot id="s2" n={2} className="arch" initial={IMAGES.expertise} />
            <div>
              <Reveal className="eyebrow">Un parcours ancré dans l’action</Reveal>
              <Words className="serif" parts={[{ t: '25 ans à accompagner les personnes ' }, { t: 'et les organisations.', em: true }]} />
              <Reveal as="p">Intervenante sociale, cheffe d’équipe, formatrice, animatrice, coordonnatrice et coach professionnelle : une solide pratique d’accompagnement. Depuis plus de 10 ans, conférences, formations et ateliers auprès des services de police et de sécurité incendie, des professionnels des services sociaux, des cabinets d’avocats, des employés municipaux et des organismes communautaires.</Reveal>
              <Reveal as="p">S’y ajoute la supervision clinique de stagiaires en travail social, en éducation spécialisée et en psychoéducation, aux niveaux collégial et universitaire. Une approche terrain, axée sur les pratiques de proximité, la mobilisation des ressources et la cohésion des interventions pour déployer des pratiques durables auprès des personnes en situation de vulnérabilité.</Reveal>
              <Reveal className="stats">
                <div><Counter to={25} /><small>ans d’expérience</small></div>
                <div><Counter to={10} /><small>ans de formation</small></div>
              </Reveal>
            </div>
          </div>
          <div className="pillars">
            {PILLARS.map(([n, t, d], i) => (
              <Pop key={n} i={i} rotate={-1} className="pil">
                <div><i>{n}</i><h3 className="serif">{t}</h3></div><p>{d}</p>
              </Pop>
            ))}
          </div>
        </section>

        {/* SERVICES */}
        <section className="svc" id="services">
          <img className="ico" alt="" src={icon} />
          <h2 className="eyebrow">Offre de services</h2>
          {SERVICES.map(([t, d], i) => (
            <motion.div key={t} className="row" initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-8% 0px' }} transition={{ duration: 0.9, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}>
              <small>0{i + 1}</small><h3 className="serif">{t}</h3><p>{d}</p>
            </motion.div>
          ))}
          <div className="tg">
            <div><h3 className="mini">Thématiques</h3><div className="chips">{THEMES.map((t, i) => <Pop key={t} i={i} className="chip">{t}</Pop>)}</div></div>
            <div>
              <h3 className="mini">Clientèles</h3><div className="chips">{CLIENTS.map((t, i) => <Pop key={t} i={i} className="chip">{t}</Pop>)}</div>
              <MagLink className="cta" style={{ color: 'var(--on-moss)', borderColor: 'var(--on-moss)' }} href="/images/offre-de-services-conformaction.pdf" title="Offre de services Conformaction (PDF)" target="_blank" rel="noopener noreferrer">En savoir plus ↗</MagLink>
            </div>
          </div>
        </section>

        {/* ENSEMBLE */}
        <section id="ensemble" style={{ overflow: 'hidden' }}>
          <h2 className="eyebrow">Ce que nous construisons ensemble</h2>
          <div className="big serif" id="big">Ensemble — Ensemble — Ensemble</div>
          <ul className="list">{BUILD.map((t, i) => <Pop as="li" key={t} i={i}>{t}</Pop>)}</ul>
          <ImageSlot id="s3" n={3} className="wide" initial={IMAGES.wide} />
        </section>

        {/* ORGANISMES */}
        <section style={{ paddingTop: 0 }}>
          <div className="eyebrow">Organismes ciblés</div>
          <Words className="serif sec" style={{ fontSize: 'clamp(2.2rem,5.4vw,5rem)', lineHeight: 1.02, maxWidth: '60rem', marginBottom: '2.5rem' }}
            parts={[{ t: 'Là où ' }, { t: 'le terrain', em: true }, { t: ' rencontre l’action.' }]} />
          <div className="chips">{ORGS.map((t, i) => <Pop key={t} i={i} className="chip">{t}</Pop>)}</div>
        </section>

        {/* CONTACT */}
        <section className="contact" id="contact">
          <img className="wm" alt="" src={icon} />
          <div className="eyebrow">Soumission gratuite</div>
          <Words className="serif" parts={[{ t: 'Parlons de ' }, { t: 'vos besoins.', em: true }]} />
          <Reveal as="p" className="s">Prenez contact pour davantage d’informations ainsi que pour obtenir une soumission gratuite selon l’évaluation de vos besoins. Au plaisir de collaborer avec vous !</Reveal>
          <div className="contact-links">
            <a href="tel:+14383662833">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.79 19.79 0 0 1 11.19 18a19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.09 3.18 2 2 0 0 1 4.08 1h3a2 2 0 0 1 2 1.72c.12.96.35 1.9.69 2.8a2 2 0 0 1-.45 2.11L8.05 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.84.57 2.8.69A2 2 0 0 1 22 16.92z" /></svg>
              <span>438-366-2833</span>
            </a>
            <a href="https://www.linkedin.com/in/caroline-gosselin-951b91416/" target="_blank" rel="noopener noreferrer">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" /><circle cx="4" cy="4" r="2" /></svg>
              <span>LinkedIn</span>
            </a>
          </div>
          <Reveal as="form" onSubmit={submit}>
            <div className="f"><input id="a" name="nom" placeholder=" " required /><label htmlFor="a">Nom</label></div>
            <div className="f"><input id="b" name="email" type="email" placeholder=" " required /><label htmlFor="b">Email</label></div>
            <div className="f full"><textarea id="c" name="message" rows={3} placeholder=" " required /><label htmlFor="c">Message</label></div>
            <div>
              <MagButton className="cta" type="submit" disabled={sending}>{sending ? 'Envoi…' : 'Envoyer'} <span>→</span></MagButton>
              <AnimatePresence>
                {sent && <motion.div role="status" style={{ marginTop: '1.5rem', color: 'var(--acc)' }} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>Merci ! Votre message a bien été envoyé.</motion.div>}
                {formError && <motion.div role="alert" style={{ marginTop: '1.5rem', color: 'var(--acc)' }} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>{formError}</motion.div>}
              </AnimatePresence>
            </div>
          </Reveal>
        </section>

        </main>
        <footer>
          <span>© 2026 Conformaction</span>
          <span>Présentiel · Virtuel · Hybride — partout au Québec</span>
          <button className="cookie-settings" type="button" onClick={showPreferences}>Gérer les cookies</button>
        </footer>
      </div>
    </MotionConfig>
  )
}
