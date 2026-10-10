import { motion } from 'framer-motion'
import SpaceCanvas from '../components/SpaceCanvas'
import SectionReveal, { TitleReveal, EyebrowReveal, BodyReveal } from '../components/SectionReveal'
import {
  OrbitalRings, TelemetryHUD, Constellation,
  ScanlineOverlay, CoordGrid,
} from '../components/SpaceDecor'

function TiltCard({ children }) {
  const handleMove = (e) => {
    const card = e.currentTarget
    const rect = card.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 16
    const y = -((e.clientY - rect.top) / rect.height - 0.5) * 16
    card.style.transform = `perspective(800px) rotateY(${x}deg) rotateX(${y}deg) scale3d(1.02,1.02,1.02)`
  }
  const handleLeave = (e) => {
    e.currentTarget.style.transform = 'perspective(800px) rotateY(0deg) rotateX(0deg) scale3d(1,1,1)'
  }
  return (
    <div className="card" onMouseMove={handleMove} onMouseLeave={handleLeave}
      style={{ transition: 'transform 0.15s ease, border-color 0.3s, box-shadow 0.3s' }}>
      {children}
    </div>
  )
}

const habsatObjectives = [
  'Measure atmospheric parameters',
  'Capture high-altitude imagery',
  'Demonstrate real-time telemetry',
  'Validate onboard avionics',
  'Test payload recovery systems',
]
const payloadFeatures = [
  'Environmental Sensors',
  'GPS Tracking & IMU',
  'ESP32-based distributed computing',
  'Raspberry Pi onboard processing',
  'LoRa Communication & Camera System',
]
const researchDomains = [
  'Satellite Systems (CubeSat, HABSAT)',
  'Communication & Ground Station',
  'Avionics & Embedded Systems',
  'Atmospheric Science & Flight Software',
  'Artificial Intelligence & Autonomous Systems',
]

const journey = [
  { version: 'VITAKSH 1.0', desc: 'The foundation of Team VITAKSH was laid with a vision to introduce students to practical aerospace engineering and collaborative innovation.' },
  { version: 'VITAKSH 2.0', desc: 'We successfully designed, built, and launched a High Altitude Balloon Satellite (HABSAT) carrying scientific payloads for atmospheric data collection and near-space experimentation.' },
  { version: 'VITAKSH 3.0', desc: 'We are excited to begin our next major projects: the development of a Ground Station and a CanSat. These projects will strengthen our expertise in satellite communication and mission operations.' },
]

const hudData = [
  { label: 'Mission',   value: 'HABSAT-2',   unit: '' },
  { label: 'Altitude',  value: '412',        unit: 'km' },
  { label: 'Status',    value: 'NOMINAL',    unit: '' },
  { label: 'Freq',      value: '437.525',    unit: 'MHz' },
]

const domainBadges = [
  '🛰 CubeSat', '📡 Ground Station', '⚡ Avionics', '🌡 Atmo Science',
  '🤖 AI Systems', '💻 Flight Software', '📻 LoRa Comms', '🔭 Near-Space',
]

export default function Mission() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* ── 3D Space Background ── */}
      <SpaceCanvas variant="default" />

      {/* ── CSS Decorations ── */}
      <ScanlineOverlay />
      <CoordGrid />
      <Constellation opacity={0.15} />

      <div className="page-content" style={{ position: 'relative' }}>

        {/* ── Telemetry HUD (top-left) ── */}
        <TelemetryHUD data={hudData} />

        {/* ── Orbital rings (top-right) ── */}
        <div style={{ position: 'fixed', top: '-100px', right: '-100px', zIndex: 1 }}>
          <OrbitalRings top="-100px" right="-100px" />
        </div>

        {/* ── HABSAT Section ── */}
        <section className="section section-relative" style={{ paddingTop: '160px' }}>
          <EyebrowReveal>Projects & Research</EyebrowReveal>
          <TitleReveal>Projects &amp; Research</TitleReveal>
          <BodyReveal>
            The HABSAT mission was developed to conduct atmospheric profiling and
            near-space experimentation using a high-altitude balloon platform — 
            carried to altitudes exceeding 30 km above the Earth's surface.
          </BodyReveal>

          {/* Stats chips */}
          <SectionReveal
            selector=".stat-chip"
            stagger={0.1}
            from={{ opacity: 0, y: 20 }}
            to={{ opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }}
            className="stats-row"
          >
            <div className="stat-chip"><span className="stat-chip-num">30+</span><span className="stat-chip-label">km Altitude</span></div>
            <div className="stat-chip"><span className="stat-chip-num">5</span><span className="stat-chip-label">Payloads</span></div>
            <div className="stat-chip"><span className="stat-chip-num">3</span><span className="stat-chip-label">Departments</span></div>
            <div className="stat-chip"><span className="stat-chip-num">24h</span><span className="stat-chip-label">Telemetry</span></div>
          </SectionReveal>

          <SectionReveal
            selector=".card"
            stagger={0.13}
            from={{ opacity: 0, y: 60 }}
            to={{ opacity: 1, y: 0, duration: 0.85, ease: 'power3.out' }}
            className="card-grid"
            style={{ marginTop: '32px' }}
          >
            <TiltCard>
              <div className="card-icon">🎯</div>
              <div className="card-tag">HABSAT Mission</div>
              <h3>Mission Objectives</h3>
              <ul>{habsatObjectives.map((item, i) => <li key={i}>{item}</li>)}</ul>
            </TiltCard>
            <TiltCard>
              <div className="card-icon">📡</div>
              <div className="card-tag">Technology Stack</div>
              <h3>Payload Features</h3>
              <ul>{payloadFeatures.map((item, i) => <li key={i}>{item}</li>)}</ul>
            </TiltCard>
            <TiltCard>
              <div className="card-icon">🔬</div>
              <div className="card-tag">Current Focus</div>
              <h3>Research Domains</h3>
              <ul>{researchDomains.map((item, i) => <li key={i}>{item}</li>)}</ul>
            </TiltCard>
          </SectionReveal>

          {/* Domain badges */}
          <SectionReveal
            selector=".domain-badge"
            stagger={0.06}
            from={{ opacity: 0, scale: 0.8 }}
            to={{ opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.5)' }}
            className="domain-badges"
          >
            {domainBadges.map((b) => (
              <span key={b} className="domain-badge">{b}</span>
            ))}
          </SectionReveal>
        </section>

        {/* ── Journey Section ── */}
        <section className="section" style={{ paddingTop: '60px', paddingBottom: '120px' }}>
          <EyebrowReveal>Timeline</EyebrowReveal>
          <TitleReveal>Our Journey</TitleReveal>

          <SectionReveal
            selector=".journey-card"
            stagger={0.16}
            from={{ opacity: 0, y: 40 }}
            to={{ opacity: 1, y: 0, duration: 0.85, ease: 'power3.out' }}
            className="journey-grid"
          >
            {journey.map((item) => (
              <div className="journey-card" key={item.version}>
                <p className="j-version">{item.version}</p>
                <h3>{item.version}</h3>
                <p>{item.desc}</p>
              </div>
            ))}
          </SectionReveal>
        </section>

        <div className="footer-credit">
          Team VITAKSH · Engineering Innovation · Advancing Space Technology
        </div>
      </div>
    </motion.div>
  )
}
