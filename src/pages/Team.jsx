import { motion } from 'framer-motion'
import SpaceCanvas from '../components/SpaceCanvas'
import SectionReveal, { TitleReveal, EyebrowReveal } from '../components/SectionReveal'
import {
  OrbitalRings, RadarPulse, Constellation,
  ScanlineOverlay, CoordGrid,
} from '../components/SpaceDecor'

function getInitials(name) {
  return name.split(' ').slice(0, 2).map((n) => n[0]).join('').toUpperCase()
}

// Each initials badge gets a random accent hue for variety
const HUES = ['#4f46e5', '#7c3aed', '#6366f1', '#818cf8', '#a78bfa', '#8b5cf6']

function TeamCard({ name, role, desc, instagram, linkedin, hue }) {
  return (
    <div className="team-card">
      <div
        className="team-photo-wrap"
        style={{ background: `linear-gradient(135deg, ${hue ?? '#4f46e5'}, #7c3aed)` }}
      >
        {getInitials(name)}
      </div>
      <h3>{name}</h3>
      <h4>{role}</h4>
      <p>{desc}</p>
      {(instagram && instagram !== '#') || (linkedin && linkedin !== '#') ? (
        <div className="team-social">
          {instagram && instagram !== '#' && (
            <a href={instagram} target="_blank" rel="noopener noreferrer" title="Instagram">
              <i className="fab fa-instagram" />
            </a>
          )}
          {linkedin && linkedin !== '#' && (
            <a href={linkedin} target="_blank" rel="noopener noreferrer" title="LinkedIn">
              <i className="fab fa-linkedin" />
            </a>
          )}
        </div>
      ) : null}
    </div>
  )
}

const leadership = [
  { name: 'Ritabrata Karmarkar',   role: 'Captain',                desc: 'Assisting in operations, cross-departmental communication, and technical oversight.' },
  { name: 'Samriddhi Kulshreshtha', role: 'Vice-Captain',           desc: 'Assisting in operations, cross-departmental communication, and technical oversight.', instagram: 'https://instagram.com/samriddhik22', linkedin: 'https://www.linkedin.com/in/samriddhi-kulshreshtha-05780b32b/' },
  { name: 'Rashmika Kancha',        role: 'Team Manager',           desc: 'Managing team workflow, logistics, timelines, and technical resource allocation.', instagram: 'https://instagram.com/rashmika_kancha_', linkedin: 'https://www.linkedin.com/in/kancha-rashmika-217011327/' },
  { name: 'Kartiki Sinha',          role: 'Assistant Team Manager', desc: 'Supporting administrative tasks, telemetry coordination, and day-to-day team tracking.', instagram: 'https://instagram.com/k.nature_05', linkedin: 'https://www.linkedin.com/in/kartiki-sinha-015b2237a' },
]
const hods = [
  { name: 'Swarup Rajkumar Yevlekar', role: 'CAD/CAE HOD',   desc: 'Overseeing departmental operations, technical designs, and leading the sub-team effectively.', instagram: 'https://www.instagram.com/just._.swarup', linkedin: 'https://www.linkedin.com/in/swarup-yevlekar-99a234339' },
  { name: 'Vatsal Shrivastava',        role: 'HOD — Avionics', desc: 'Managing power systems, avionics, and onboard computing architectures.' },
  { name: 'Ojaswita Jaiswal',          role: 'HOD — Non-Tech', desc: 'Overseeing financing, communications, outreach, and public relations.' },
]
const members = [
  { name: 'Trisha Upadhyay',       role: 'CAD Member',          desc: 'Designing structural integrity modules, lightweight chassis, and stress tolerance analysis.' },
  { name: 'Prathamesh Patil',      role: 'Team Member',         desc: 'Contributing to multidisciplinary engineering efforts, research, and overall project success.' },
  { name: 'Tanisha Deshpande',     role: 'Avionics Member',     desc: 'Working on power systems, flight control scripts, and onboard computing architectures.' },
  { name: 'Sartha Pravin Gade',    role: 'Team Member',         desc: 'Contributing to multidisciplinary engineering efforts, research, and overall project success.' },
  { name: 'Riya Onkar',            role: 'Avionics Member',     desc: 'Working on power systems, flight control scripts, and onboard computing architectures.' },
  { name: 'Aman Singh',            role: 'Avionics Member',     desc: 'Working on power systems, flight control scripts, and onboard computing architectures.' },
  { name: 'Palak Santosh Tapadiya', role: 'Avionics Member',    desc: 'Working on power systems, flight control scripts, and onboard computing architectures.' },
  { name: 'Kumar Karan Bohidar',   role: 'CAD Member',          desc: 'Designing structural integrity modules, lightweight chassis, and stress tolerance analysis.' },
  { name: 'Anubhab Saha',          role: 'Videography Member',  desc: 'Capturing mission progress, editing content, and creating visual documentation for the team.' },
  { name: 'Madhu Kumari',          role: 'Avionics Member',     desc: 'Working on power systems, flight control scripts, and onboard computing architectures.' },
  { name: 'Krittika Haldar',       role: 'CAE Member',          desc: 'Designing structural integrity modules, lightweight chassis, and stress tolerance analysis.' },
]
const mentors = [
  { name: 'Mann Khandelwal',        role: 'Senior Mentor', desc: 'Providing technical guidance and overseeing team operations.' },
  { name: 'Rishika Sinha',          role: 'Senior Mentor', desc: 'Advising on power systems, avionics, and onboard computing.' },
  { name: 'Jaineel Chavda',         role: 'Senior Mentor', desc: 'Providing expertise on structural integrity modules and lightweight chassis.' },
  { name: 'Atharv Prashant Tidke',  role: 'Senior Mentor', desc: 'Mentoring non-technical departments and public relations.' },
  { name: 'Vardaan Chauhan',        role: 'Senior Mentor', desc: 'Guiding outreach, communications, and team logistics.' },
]

function TeamSection({ eyebrow, title, people }) {
  return (
    <section className="section" style={{ paddingTop: '60px' }}>
      <EyebrowReveal>{eyebrow}</EyebrowReveal>
      <TitleReveal>{title}</TitleReveal>
      <SectionReveal
        selector=".team-card"
        stagger={0.09}
        from={{ opacity: 0, y: 50 }}
        to={{ opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }}
        className="card-grid"
      >
        {people.map((p, i) => (
          <TeamCard key={p.name} {...p} hue={HUES[i % HUES.length]} />
        ))}
      </SectionReveal>
    </section>
  )
}

export default function Team() {
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
      <SpaceCanvas variant="minimal" />

      {/* ── CSS Space Decorations ── */}
      <ScanlineOverlay />
      <CoordGrid />
      <Constellation opacity={0.12} />

      {/* Orbital rings fixed at top-right */}
      <div style={{ position: 'fixed', top: 0, right: 0, zIndex: 1, pointerEvents: 'none' }}>
        <OrbitalRings top="-120px" right="-120px" />
      </div>

      {/* Radar pulse at bottom-right */}
      <RadarPulse bottom="70px" right="6%" />

      <div className="page-content">

        {/* ── Page Title ── */}
        <section className="section" style={{ paddingTop: '160px', paddingBottom: '20px' }}>
          <EyebrowReveal>VIT Bhopal University · 2023</EyebrowReveal>
          <TitleReveal>Meet The Team</TitleReveal>

          {/* Team stats */}
          <SectionReveal
            selector=".stat-chip"
            stagger={0.1}
            from={{ opacity: 0, y: 20 }}
            to={{ opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }}
            className="stats-row"
          >
            <div className="stat-chip"><span className="stat-chip-num">20+</span><span className="stat-chip-label">Members</span></div>
            <div className="stat-chip"><span className="stat-chip-num">4</span><span className="stat-chip-label">Departments</span></div>
            <div className="stat-chip"><span className="stat-chip-num">5</span><span className="stat-chip-label">Senior Mentors</span></div>
            <div className="stat-chip"><span className="stat-chip-num">3</span><span className="stat-chip-label">Versions</span></div>
          </SectionReveal>
        </section>

        <TeamSection eyebrow="Leadership" title="Core Leadership" people={leadership} />
        <div className="section-divider" />
        <TeamSection eyebrow="Departments" title="Heads of Departments" people={hods} />
        <div className="section-divider" />
        <TeamSection eyebrow="Members" title="Team Members" people={members} />
        <div className="section-divider" />
        <TeamSection eyebrow="Guidance" title="Mentors &amp; Seniors" people={mentors} />

        <div className="footer-credit">
          Team VITAKSH · Engineering Innovation · Advancing Space Technology
        </div>
      </div>
    </motion.div>
  )
}
