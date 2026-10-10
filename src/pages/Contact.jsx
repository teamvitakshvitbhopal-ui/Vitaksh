import { motion } from 'framer-motion'
import SpaceCanvas from '../components/SpaceCanvas'
import SectionReveal, { TitleReveal, EyebrowReveal } from '../components/SectionReveal'
import {
  OrbitalRings, RadarPulse, Constellation,
  ScanlineOverlay, CoordGrid, TelemetryHUD,
} from '../components/SpaceDecor'

const hudData = [
  { label: 'Location',  value: 'Sehore, MP',    unit: '' },
  { label: 'Altitude',  value: '550',           unit: 'm ASL' },
  { label: 'Status',    value: 'ONLINE',        unit: '' },
]

export default function Contact() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Font Awesome */}
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />

      {/* ── 3D Space Background ── */}
      <SpaceCanvas variant="dense" />

      {/* ── CSS Space Decorations ── */}
      <ScanlineOverlay />
      <CoordGrid />
      <Constellation opacity={0.18} />

      {/* Orbital rings */}
      <div style={{ position: 'fixed', top: 0, right: 0, zIndex: 1, pointerEvents: 'none' }}>
        <OrbitalRings top="-80px" right="-80px" />
      </div>

      {/* Radar pulse — bottom left */}
      <RadarPulse bottom="80px" right="auto" />
      <div style={{
        position: 'fixed', bottom: '80px', left: '6%',
        zIndex: 4, pointerEvents: 'none',
      }}>
        <div className="sd-radar">
          <div className="sd-radar-core" />
          <div className="sd-radar-ring r1" />
          <div className="sd-radar-ring r2" />
          <div className="sd-radar-ring r3" />
          <span className="sd-radar-label">SIGNAL ACTIVE</span>
        </div>
      </div>

      {/* Telemetry HUD */}
      <TelemetryHUD data={hudData} />

      <div className="page-content">
        <section className="section section-relative" style={{ paddingTop: '160px', minHeight: '90vh' }}>
          <EyebrowReveal>Get In Touch</EyebrowReveal>
          <TitleReveal>Contact Us</TitleReveal>

          <SectionReveal
            selector=".card"
            stagger={0.15}
            from={{ opacity: 0, y: 50 }}
            to={{ opacity: 1, y: 0, duration: 0.85, ease: 'power3.out' }}
            className="card-grid"
            style={{ marginTop: '48px' }}
          >
            {/* Contact info card */}
            <div className="card" style={{ transition: 'border-color 0.3s, box-shadow 0.3s' }}>
              <div className="card-icon">📡</div>
              <div className="card-tag">Location & Channel</div>
              <h3>Get In Touch</h3>
              <p style={{ marginBottom: '14px' }}>
                <strong style={{ color: 'var(--text)' }}>Team VITAKSH</strong><br />
                VIT Bhopal University
              </p>
              <p style={{ marginBottom: '14px' }}>
                📍 Bhopal-Indore Highway, Kothrikalan,<br />
                Sehore, Madhya Pradesh — 466114
              </p>
              <p>
                📧{' '}
                <a
                  href="mailto:teamvitakshvitbhopal@gmail.com"
                  style={{ color: 'var(--accent)', transition: 'color 0.2s' }}
                >
                  teamvitakshvitbhopal@gmail.com
                </a>
              </p>

              {/* Social links in contact-links style */}
              <div className="contact-links" style={{ marginTop: '24px' }}>
                <a href="#" target="_blank" rel="noopener noreferrer">
                  <i className="fas fa-globe" /> Website
                </a>
                <a href="#" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-linkedin-in" /> LinkedIn
                </a>
                <a href="https://instagram.com/team_vitaksh" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-instagram" /> @team_vitaksh
                </a>
              </div>
              <div className="card-footer">VIT Bhopal · Madhya Pradesh, India</div>
            </div>

            {/* Leadership card */}
            <div className="card" style={{ transition: 'border-color 0.3s, box-shadow 0.3s' }}>
              <div className="card-icon">🚀</div>
              <div className="card-tag">Point of Contact</div>
              <h3>Team Leadership</h3>
              {[
                ['Faculty Coordinators', 'Dr. Prashant G K, Dr. Deepak Kumar'],
                ['Captain',              'Ritabrata Karmarkar'],
                ['Vice Captain',         'Samriddhi Kulshreshtha'],
                ['Team Manager',         'Rashmika Kancha'],
                ['Asst. Team Manager',   'Kartiki Sinha'],
              ].map(([label, value]) => (
                <div key={label} className="sd-telemetry" style={{ margin: '10px 0' }}>
                  <span className="sd-telemetry-label">{label}</span>
                  <span style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '0.9rem',
                    color: 'var(--text)',
                    lineHeight: 1.5,
                  }}>{value}</span>
                </div>
              ))}
              <div className="card-footer">VITAKSH 3.0 · Active</div>
            </div>
          </SectionReveal>

          {/* Stats */}
          <SectionReveal
            selector=".stat-chip"
            stagger={0.1}
            from={{ opacity: 0, y: 20 }}
            to={{ opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }}
            className="stats-row"
            style={{ marginTop: '48px' }}
          >
            <div className="stat-chip"><span className="stat-chip-num">3</span><span className="stat-chip-label">Missions</span></div>
            <div className="stat-chip"><span className="stat-chip-num">20+</span><span className="stat-chip-label">Engineers</span></div>
            <div className="stat-chip"><span className="stat-chip-num">2</span><span className="stat-chip-label">Faculty Advisors</span></div>
            <div className="stat-chip"><span className="stat-chip-num">∞</span><span className="stat-chip-label">Innovation</span></div>
          </SectionReveal>
        </section>

        <div className="footer-credit">
          Team VITAKSH Engineering Innovation · Advancing Space Technology · Inspiring Future Explorers
        </div>
      </div>
    </motion.div>
  )
}
