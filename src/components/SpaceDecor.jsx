/**
 * SpaceDecor — CSS / React decorative space-theme UI elements.
 * No 3D canvas required. Pure DOM/CSS animations.
 */

// ── Orbital ring decoration (top-right corner) ────────────────────────────
export function OrbitalRings({ top = '-120px', right = '-120px' }) {
  return (
    <div className="sd-orbital-wrap" style={{ top, right }}>
      <div className="sd-ring sd-ring--1" />
      <div className="sd-ring sd-ring--2" />
      <div className="sd-ring sd-ring--3" />
      <div className="sd-ring-dot" />
    </div>
  )
}

// ── Telemetry readout bar ─────────────────────────────────────────────────
export function TelemetryBar({ label, value, unit = '' }) {
  return (
    <div className="sd-telemetry">
      <span className="sd-telemetry-label">{label}</span>
      <span className="sd-telemetry-value">{value}<em>{unit}</em></span>
    </div>
  )
}

// ── Full telemetry HUD (top-left corner) ─────────────────────────────────
export function TelemetryHUD({ data }) {
  return (
    <div className="sd-hud">
      {data.map(({ label, value, unit }) => (
        <TelemetryBar key={label} label={label} value={value} unit={unit} />
      ))}
      <div className="sd-hud-pulse" />
    </div>
  )
}

// ── Radar pulse (circle ripple) ───────────────────────────────────────────
export function RadarPulse({ bottom = '60px', right = '6%' }) {
  return (
    <div className="sd-radar" style={{ bottom, right }}>
      <div className="sd-radar-core" />
      <div className="sd-radar-ring r1" />
      <div className="sd-radar-ring r2" />
      <div className="sd-radar-ring r3" />
      <span className="sd-radar-label">SIGNAL LOCK</span>
    </div>
  )
}

// ── Constellation dot grid ────────────────────────────────────────────────
const DOTS = [
  { x: 10, y: 20 }, { x: 22, y: 12 }, { x: 35, y: 28 },
  { x: 18, y: 40 }, { x: 45, y: 18 }, { x: 55, y: 35 },
  { x: 30, y: 55 }, { x: 60, y: 55 }, { x: 72, y: 25 },
  { x: 80, y: 45 }, { x: 48, y: 70 }, { x: 65, y: 78 },
]

const LINES = [
  [0, 1], [1, 2], [2, 4], [4, 5], [3, 0], [3, 6],
  [5, 8], [8, 9], [6, 10], [10, 11], [7, 11],
]

export function Constellation({ opacity = 0.18 }) {
  return (
    <div className="sd-constellation" style={{ opacity }}>
      <svg viewBox="0 0 100 100" preserveAspectRatio="none">
        {/* Lines */}
        {LINES.map(([a, b], i) => (
          <line
            key={i}
            x1={DOTS[a].x} y1={DOTS[a].y}
            x2={DOTS[b].x} y2={DOTS[b].y}
            stroke="#4f46e5" strokeWidth="0.3" opacity="0.6"
          />
        ))}
        {/* Dots */}
        {DOTS.map((d, i) => (
          <circle key={i} cx={d.x} cy={d.y} r="0.8" fill="#818cf8" />
        ))}
      </svg>
    </div>
  )
}

// ── Section corner tag (scanline style) ──────────────────────────────────
export function CornerTag({ text, position = 'tr' }) {
  const pos = {
    tl: { top: '24px', left: '0' },
    tr: { top: '24px', right: '0' },
    bl: { bottom: '24px', left: '0' },
    br: { bottom: '24px', right: '0' },
  }[position]

  return (
    <div className="sd-corner-tag" style={{ position: 'absolute', ...pos }}>
      <span className="sd-corner-tag-text">{text}</span>
    </div>
  )
}

// ── Floating orbit badge ──────────────────────────────────────────────────
export function OrbitBadge({ icon, label }) {
  return (
    <div className="sd-orbit-badge">
      <div className="sd-orbit-badge-icon">{icon}</div>
      <div className="sd-orbit-badge-ring" />
      <span className="sd-orbit-badge-label">{label}</span>
    </div>
  )
}

// ── Scanline overlay ──────────────────────────────────────────────────────
export function ScanlineOverlay() {
  return <div className="sd-scanlines" aria-hidden="true" />
}

// ── Grid coordinates overlay ──────────────────────────────────────────────
export function CoordGrid() {
  return (
    <div className="sd-coord-grid" aria-hidden="true">
      <span className="sd-coord sd-coord--tl">00°N 77°E</span>
      <span className="sd-coord sd-coord--tr">ALT: 412km</span>
      <span className="sd-coord sd-coord--bl">VIT·BPL·2023</span>
      <span className="sd-coord sd-coord--br">FREQ: 437.525 MHz</span>
    </div>
  )
}
