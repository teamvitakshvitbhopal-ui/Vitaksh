import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

export default function Loader() {
  const loaderRef = useRef(null)
  const barRef = useRef(null)
  const textRef = useRef(null)
  const [progress, setProgress] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const stages = [
      { text: 'INITIALIZING TELEMETRY...', pct: 0 },
      { text: 'LOADING DEEP SPACE MODELS...', pct: 30 },
      { text: 'CALIBRATING OPTICS...', pct: 60 },
      { text: 'ACQUIRING SIGNAL LOCK...', pct: 85 },
      { text: 'SYSTEMS NOMINAL.', pct: 100 },
    ]

    let i = 0
    const interval = setInterval(() => {
      if (i >= stages.length) {
        clearInterval(interval)
        // Fade out
        gsap.to(loaderRef.current, {
          opacity: 0,
          duration: 0.8,
          delay: 0.3,
          ease: 'power2.inOut',
          onComplete: () => setVisible(false),
        })
        return
      }
      if (textRef.current) textRef.current.textContent = stages[i].text
      setProgress(stages[i].pct)
      i++
    }, 480)

    return () => clearInterval(interval)
  }, [])

  if (!visible) return null

  return (
    <div className="loader" ref={loaderRef}>
      <div
        style={{
          fontFamily: "'Barlow Condensed', sans-serif",
          fontSize: 'clamp(2rem,6vw,4rem)',
          fontWeight: 900,
          letterSpacing: '4px',
          color: '#f1f1f3',
        }}
      >
        VITAKSH<span style={{ color: '#4f46e5' }}>.</span>
      </div>
      <p className="loader-text" ref={textRef}>INITIALIZING TELEMETRY...</p>
      <div className="loader-bar-track">
        <div
          className="loader-bar-fill"
          ref={barRef}
          style={{ width: `${progress}%`, transition: 'width 0.45s ease' }}
        />
      </div>
    </div>
  )
}
