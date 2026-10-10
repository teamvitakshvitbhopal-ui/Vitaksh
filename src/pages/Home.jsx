import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import HubbleScene from '../components/HubbleScene'
import SectionReveal, {
  TitleReveal,
  EyebrowReveal,
  BodyReveal,
} from '../components/SectionReveal'

gsap.registerPlugin(ScrollTrigger)

// ── 3D tilt card ────────────────────────────────────────────────────────────
function TiltCard({ children, className = '' }) {
  const ref = useRef(null)

  const handleMove = (e) => {
    const card = ref.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 18
    const y = -((e.clientY - rect.top) / rect.height - 0.5) * 18
    card.style.transform = `perspective(800px) rotateY(${x}deg) rotateX(${y}deg) scale3d(1.02,1.02,1.02)`
  }
  const handleLeave = () => {
    if (ref.current)
      ref.current.style.transform =
        'perspective(800px) rotateY(0deg) rotateX(0deg) scale3d(1,1,1)'
  }

  return (
    <div
      ref={ref}
      className={`card ${className}`}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ transition: 'transform 0.15s ease, border-color 0.3s, box-shadow 0.3s' }}
    >
      {children}
    </div>
  )
}

// ── Achievement item ─────────────────────────────────────────────────────────
const achievements = [
  'We successfully launched the HABSAT mission.',
  'We designed an indigenous atmospheric payload.',
  'We developed an in-house telemetry and communication system.',
  'We participated in national aerospace competitions.',
  'We built a multidisciplinary engineering team.',
]

function AchievementList() {
  const listRef = useRef(null)

  useEffect(() => {
    if (!listRef.current) return
    const items = listRef.current.querySelectorAll('li')
    gsap.set(items, { opacity: 0, x: -30 })

    const ctx = gsap.context(() => {
      gsap.to(items, {
        opacity: 1,
        x: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: listRef.current,
          start: 'top 82%',
          toggleActions: 'play none none none',
        },
      })
    }, listRef)

    return () => ctx.revert()
  }, [])

  return (
    <ul className="achievement-list" ref={listRef}>
      {achievements.map((text, i) => (
        <li key={i}>
          <span className="achievement-num">0{i + 1}</span>
          <span className="achievement-text">{text}</span>
        </li>
      ))}
    </ul>
  )
}

// ── Hero entrance animation ──────────────────────────────────────────────────
function HeroContent() {
  const labelRef = useRef(null)
  const h1Ref = useRef(null)
  const subRef = useRef(null)
  const descRef = useRef(null)
  const dpRef = useRef(null)
  const scrollRef = useRef(null)

  useEffect(() => {
    const tl = gsap.timeline({ delay: 2.8 })
    tl.to(labelRef.current, { opacity: 1, duration: 0.6, ease: 'power2.out' })
      .to(h1Ref.current, { opacity: 1, y: 0, duration: 0.9, ease: 'power4.out' }, '-=0.3')
      .to(subRef.current, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '-=0.5')
      .to(descRef.current, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '-=0.4')
      .to(dpRef.current, { opacity: 1, duration: 0.6, ease: 'power2.out' }, '-=0.3')
      .to(scrollRef.current, { opacity: 1, duration: 0.6 }, '-=0.2')
  }, [])

  return (
    <div className="hero-inner">
      <p ref={labelRef} className="hero-label">
        VIT Bhopal University · Est. 2023
      </p>
      <h1 ref={h1Ref}>VITAKSH</h1>
      <p ref={subRef} className="hero-sub">
        Engineering Tomorrow,<br />Beyond the Sky
      </p>
      <p ref={descRef} className="hero-desc">
        Team VITAKSH is the official student satellite and near-space research
        team of VIT Bhopal University. A multidisciplinary team of passionate
        engineers dedicated to designing, developing, and deploying innovative
        aerospace systems — from high-altitude balloon satellite missions to
        ground station development.
      </p>
      <div ref={dpRef} className="hero-datapoints">
        <div>
          <span className="dp-num">01</span>
          <span className="dp-label">
            Voyager 2 Class<br />Deep Space Comm
          </span>
        </div>
        <div>
          <span className="dp-num">02</span>
          <span className="dp-label">
            Heliosphere Edge<br />Telemetry Arrays
          </span>
        </div>
      </div>
      <div ref={scrollRef} className="scroll-hint">Scroll Down</div>
    </div>
  )
}

// ── Main page ────────────────────────────────────────────────────────────────
export default function Home() {
  // HubbleScene reads window.scrollY directly — no scrollY ref needed here
  const mousePos = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const onMouse = (e) => {
      mousePos.current = {
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: -(e.clientY / window.innerHeight - 0.5) * 2,
      }
    }
    window.addEventListener('mousemove', onMouse, { passive: true })
    return () => window.removeEventListener('mousemove', onMouse)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* 3D Canvas — fixed background, reads window.scrollY directly */}
      <HubbleScene mousePos={mousePos} />

      <div className="page-content">
        {/* ── HERO ── */}
        <section className="hero">
          <HeroContent />
        </section>

        {/* ── WHO WE ARE ── */}
        <section className="section">
          <EyebrowReveal>About</EyebrowReveal>
          <TitleReveal>Who Are We?</TitleReveal>
          <BodyReveal>
            Team VITAKSH is a student-led aerospace research team committed to
            advancing space technology through hands-on engineering projects. Our
            mission is to inspire innovation by designing and developing satellite
            systems, high-altitude balloon payloads, avionics, communication
            systems, and ground station technologies.
          </BodyReveal>

          <SectionReveal
            selector=".card"
            stagger={0.14}
            from={{ opacity: 0, y: 60 }}
            to={{ opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' }}
            className="card-grid"
            style={{ marginTop: '48px' }}
          >
            {/* Vision Card */}
            <TiltCard>
              <div className="card-icon">👁</div>
              <div className="card-tag">2026 — Future · Our Goal</div>
              <h3>Vision</h3>
              <p>
                To become a nationally recognized student aerospace research team
                that empowers future engineers through innovation, research, and
                space technology.
              </p>
              <div className="card-footer">VIT Bhopal University</div>
            </TiltCard>

            {/* Mission Card */}
            <TiltCard>
              <div className="card-icon">🚀</div>
              <div className="card-tag">Current Focus · Our Action</div>
              <h3>Mission</h3>
              <ul>
                <li>Design and develop reliable aerospace systems.</li>
                <li>Promote research and innovation among students.</li>
                <li>Build industry-ready engineering skills.</li>
                <li>Represent the university in competitions.</li>
                <li>Contribute to India's space ecosystem.</li>
              </ul>
              <div className="card-footer">Madhya Pradesh, India</div>
            </TiltCard>
          </SectionReveal>
        </section>

        {/* ── ACHIEVEMENTS ── */}
        <section className="section" style={{ paddingTop: '40px' }}>
          <EyebrowReveal>Track Record</EyebrowReveal>
          <TitleReveal>Achievements</TitleReveal>
          <AchievementList />
        </section>

        <div className="footer-credit">
          Team VITAKSH · Engineering Innovation · Advancing Space Technology
        </div>
      </div>
    </motion.div>
  )
}
