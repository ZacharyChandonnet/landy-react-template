import { useEffect, useRef, useState } from 'react'
import { motion, animate, stagger, useInView } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

const EASE = [0.16, 1, 0.3, 1]

/* Titre découpé mot par mot.
   plain = animé par GSAP (hero) ; sinon : déclenché par ScrollTrigger, animé par Framer Motion.
   Les mots sont masqués par défaut (CSS inline) ; une sécurité les affiche toujours après 6 s. */
export function Words({ parts, plain = false, as: Tag = 'h2', className = '', style }) {
  const ref = useRef(null)
  useEffect(() => {
    if (plain) return
    const words = ref.current.querySelectorAll('.hw')
    let done = false
    const show = () => {
      if (done) return
      done = true
      animate(words, { transform: ['translateY(115%)', 'translateY(0%)'] }, { duration: 1.1, ease: EASE, delay: stagger(0.05) })
    }
    const st = ScrollTrigger.create({ trigger: ref.current, start: 'top 92%', onEnter: show, onEnterBack: show })
    if (st.progress > 0) show()
    const safety = setTimeout(() => { if (ref.current && ref.current.getBoundingClientRect().top < innerHeight) show() }, 1500)
    const last = setTimeout(show, 8000)
    return () => { st.kill(); clearTimeout(safety); clearTimeout(last) }
  }, [plain])
  const hidden = plain ? undefined : { transform: 'translateY(115%)' }
  const nodes = parts.map((p, pi) => {
    if (p.br) return <br key={pi} />
    const inner = p.t.split(/(\s+)/).map((w, wi) =>
      !w.trim() ? w : <span className="w" key={wi}><span className="hw" style={hidden}>{w}</span></span>)
    return p.em ? <em key={pi}>{inner}</em> : <span key={pi}>{inner}</span>
  })
  return <Tag ref={ref} className={className} style={style}>{nodes}</Tag>
}

export function Reveal({ as = 'div', delay = 0, className = '', children, ...rest }) {
  const M = motion[as]
  return (
    <M className={className} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-8% 0px' }} transition={{ duration: 1, delay, ease: EASE }} {...rest}>{children}</M>
  )
}

/* Pastille / carte : entrée au scroll + rebond « spring » au survol */
export function Pop({ as = 'div', i = 0, rotate = 0, className = '', children }) {
  const M = motion[as]
  const spring = { type: 'spring', stiffness: 300, damping: 14 }
  return (
    <M className={className} initial={{ opacity: 0, y: 40, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1, transition: { duration: 0.9, delay: (i % 6) * 0.07, ease: EASE } }}
      whileHover={{ scale: 1.04, rotate, transition: spring }} viewport={{ once: true, margin: '-8% 0px' }}>{children}</M>
  )
}

/* Affiche simplement une image (aucun téléversement possible). Les images se définissent dans src/config.js */
export function ImageSlot({ id, className = '', initial = {}, priority = false }) {
  if (!initial.src) return null
  return (
    <figure id={id} className={`slot has ${className}`}>
      <img src={initial.src} alt={initial.alt || ''} width={initial.width} height={initial.height}
        loading={priority ? 'eager' : 'lazy'} fetchPriority={priority ? 'high' : 'auto'} decoding="async"
        draggable="false" onLoad={() => ScrollTrigger.refresh()} />
    </figure>
  )
}

export function Counter({ to }) {
  const ref = useRef(null), inView = useInView(ref, { once: true })
  const [v, setV] = useState(0)
  useEffect(() => { if (!inView) return; const c = animate(0, to, { duration: 2, ease: 'easeOut', onUpdate: (x) => setV(Math.round(x)) }); return () => c.stop() }, [inView, to])
  return <b className="serif" ref={ref}>{v}+</b>
}

export function Cursor() {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current, qx = gsap.quickTo(el, 'x', { duration: 0.4 }), qy = gsap.quickTo(el, 'y', { duration: 0.4 })
    const mv = (e) => { el.style.opacity = 1; qx(e.clientX); qy(e.clientY) }
    const ov = (e) => { const hit = e.target.closest?.('a,button,.row,.pil,.chip'); gsap.to(el, { scale: hit ? 3.2 : 1, opacity: hit ? 0.35 : 1, duration: 0.3, overwrite: 'auto' }) }
    window.addEventListener('mousemove', mv); window.addEventListener('mouseover', ov)
    return () => { window.removeEventListener('mousemove', mv); window.removeEventListener('mouseover', ov) }
  }, [])
  return <div id="cur" ref={ref} />
}

function useMagnetic() {
  const ref = useRef(null)
  useEffect(() => {
    const b = ref.current; if (!b) return
    const m = (e) => { const r = b.getBoundingClientRect(); gsap.to(b, { x: (e.clientX - r.left - r.width / 2) * 0.3, y: (e.clientY - r.top - r.height / 2) * 0.4, duration: 0.4 }) }
    const l = () => gsap.to(b, { x: 0, y: 0, duration: 0.8, ease: 'elastic.out(1,.4)' })
    b.addEventListener('mousemove', m); b.addEventListener('mouseleave', l)
    return () => { b.removeEventListener('mousemove', m); b.removeEventListener('mouseleave', l) }
  }, [])
  return ref
}
export const MagLink = ({ children, ...p }) => { const ref = useMagnetic(); return <a ref={ref} {...p}>{children}</a> }
export const MagButton = ({ children, ...p }) => { const ref = useMagnetic(); return <button ref={ref} {...p}>{children}</button> }
