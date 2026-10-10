import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Wraps children and applies a GSAP ScrollTrigger stagger reveal.
 * Selector: pass a CSS selector string to target children, or defaults to direct children.
 * 
 * Usage:
 *   <SectionReveal>
 *     <div>item1</div>
 *     <div>item2</div>
 *   </SectionReveal>
 */
export default function SectionReveal({
  children,
  selector = null,
  stagger = 0.12,
  delay = 0,
  from = { opacity: 0, y: 50 },
  to = { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' },
  className = '',
  style = {},
}) {
  const wrapRef = useRef(null)

  useEffect(() => {
    if (!wrapRef.current) return

    const targets = selector
      ? wrapRef.current.querySelectorAll(selector)
      : wrapRef.current.children

    if (!targets || targets.length === 0) return

    // Set initial state
    gsap.set(targets, from)

    const ctx = gsap.context(() => {
      gsap.to(targets, {
        ...to,
        stagger,
        delay,
        scrollTrigger: {
          trigger: wrapRef.current,
          start: 'top 82%',
          toggleActions: 'play none none none',
        },
      })
    }, wrapRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={wrapRef} className={className} style={style}>
      {children}
    </div>
  )
}

/**
 * Clip-reveal for section titles (text slides up from below)
 */
export function TitleReveal({ children, className = '' }) {
  const ref = useRef(null)

  useEffect(() => {
    if (!ref.current) return
    const inner = ref.current.querySelector('.section-title-inner')
    if (!inner) return

    gsap.set(inner, { y: '100%' })

    const ctx = gsap.context(() => {
      gsap.to(inner, {
        y: '0%',
        duration: 1,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      })
    }, ref)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={ref} className={`section-title clip-hidden ${className}`}>
      <span className="section-title-inner">{children}</span>
    </div>
  )
}

/**
 * Eyebrow label fade-in
 */
export function EyebrowReveal({ children, className = '' }) {
  const ref = useRef(null)

  useEffect(() => {
    if (!ref.current) return
    gsap.set(ref.current, { opacity: 0, y: 20 })

    const ctx = gsap.context(() => {
      gsap.to(ref.current, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 88%',
          toggleActions: 'play none none none',
        },
      })
    }, ref)

    return () => ctx.revert()
  }, [])

  return (
    <p ref={ref} className={`section-eyebrow ${className}`}>
      {children}
    </p>
  )
}

/**
 * Fade + slide up for body text
 */
export function BodyReveal({ children, className = '' }) {
  const ref = useRef(null)

  useEffect(() => {
    if (!ref.current) return
    gsap.set(ref.current, { opacity: 0, y: 24 })

    const ctx = gsap.context(() => {
      gsap.to(ref.current, {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      })
    }, ref)

    return () => ctx.revert()
  }, [])

  return (
    <p ref={ref} className={`section-body ${className}`}>
      {children}
    </p>
  )
}
