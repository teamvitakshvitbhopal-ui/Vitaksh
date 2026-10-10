/**
 * SpaceCanvas — lightweight fixed 3D background for sub-pages.
 * Includes: star field, slow-rotating orbital torus rings, floating debris.
 * No heavy GLB loaded — all procedural geometry.
 */
import { useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { Stars } from './HubbleScene'
import * as THREE from 'three'

// ── Orbital ring ──────────────────────────────────────────────────────────
function OrbitalRing({ radius = 7, tube = 0.018, color = '#4f46e5', speedX = 0.15, speedY = 0.25, tilt = [0.4, 0, 0] }) {
  const ref = useRef()
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    ref.current.rotation.x = tilt[0] + t * speedX
    ref.current.rotation.y = tilt[1] + t * speedY
    ref.current.rotation.z = tilt[2]
  })
  return (
    <mesh ref={ref}>
      <torusGeometry args={[radius, tube, 3, 100]} />
      <meshBasicMaterial color={color} transparent opacity={0.35} />
    </mesh>
  )
}

// ── Single floating debris shard ──────────────────────────────────────────
function Shard({ pos, size, rotSpeed, phase }) {
  const ref = useRef()
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    ref.current.rotation.x = t * rotSpeed
    ref.current.rotation.y = t * rotSpeed * 0.7
    ref.current.position.y = pos[1] + Math.sin(t * 0.35 + phase) * 0.6
  })
  return (
    <mesh ref={ref} position={pos}>
      <octahedronGeometry args={[size, 0]} />
      <meshStandardMaterial color="#5b5ff5" metalness={0.9} roughness={0.1} emissive="#3030a0" emissiveIntensity={0.4} />
    </mesh>
  )
}

// ── Debris field ──────────────────────────────────────────────────────────
function DebrisField({ count = 18 }) {
  const shards = useMemo(() =>
    Array.from({ length: count }, (_, i) => ({
      id: i,
      pos: [
        (Math.random() - 0.5) * 24,
        (Math.random() - 0.5) * 16,
        (Math.random() - 0.5) * 8 - 4,
      ],
      size: Math.random() * 0.09 + 0.03,
      rotSpeed: Math.random() * 0.6 + 0.2,
      phase: Math.random() * Math.PI * 2,
    })),
  [count])

  return shards.map(({ id, ...props }) => <Shard key={id} {...props} />)
}

// ── Small planet ─────────────────────────────────────────────────────────
function Planet({ position = [-8, 4, -6], radius = 1.4 }) {
  const ref = useRef()
  useFrame(({ clock }) => {
    ref.current.rotation.y = clock.getElapsedTime() * 0.12
  })
  return (
    <group ref={ref} position={position}>
      {/* Core */}
      <mesh>
        <sphereGeometry args={[radius, 32, 32]} />
        <meshStandardMaterial
          color="#1a1060"
          metalness={0.1}
          roughness={0.8}
          emissive="#0a0840"
          emissiveIntensity={0.3}
        />
      </mesh>
      {/* Atmosphere glow ring */}
      <mesh>
        <torusGeometry args={[radius + 0.12, 0.06, 8, 64]} />
        <meshBasicMaterial color="#6366f1" transparent opacity={0.5} />
      </mesh>
      {/* Orbital ring around planet */}
      <mesh rotation={[Math.PI * 0.42, 0.3, 0]}>
        <torusGeometry args={[radius + 0.6, 0.025, 3, 80]} />
        <meshBasicMaterial color="#7c3aed" transparent opacity={0.4} />
      </mesh>
    </group>
  )
}

// ── Exported canvas ───────────────────────────────────────────────────────
export default function SpaceCanvas({ variant = 'default' }) {
  return (
    <div className="canvas-layer">
      <Canvas camera={{ position: [0, 0, 14], fov: 50 }} gl={{ antialias: true, alpha: true }} dpr={[1, 1.3]}>
        <Stars count={3500} opacity={0.5} />
        <ambientLight intensity={0.15} />
        <pointLight position={[5, 5, 5]} intensity={1.2} color="#6366f1" />
        <pointLight position={[-8, -4, 2]} intensity={0.8} color="#7c3aed" />

        {/* Orbital rings */}
        <OrbitalRing radius={9}  color="#4f46e5" speedX={0.08} speedY={0.14} tilt={[0.5, 0, 0.2]} />
        <OrbitalRing radius={6}  color="#7c3aed" speedX={0.12} speedY={-0.10} tilt={[1.1, 0.3, 0]} tube={0.022} />
        <OrbitalRing radius={12} color="#312e81" speedX={0.04} speedY={0.06}  tilt={[0.2, 0.6, 0.1]} tube={0.012} />

        {/* Planet — only on certain variants */}
        {variant !== 'minimal' && <Planet />}

        {/* Floating debris */}
        <DebrisField count={variant === 'dense' ? 28 : 14} />

        <EffectComposer>
          <Bloom intensity={0.8} luminanceThreshold={0.6} luminanceSmoothing={0.9} mipmapBlur />
        </EffectComposer>
      </Canvas>
    </div>
  )
}
