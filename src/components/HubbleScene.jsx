import { useRef, useEffect, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useGLTF, Environment } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import * as THREE from 'three'

// ── Easing ────────────────────────────────────────────────────────────────
function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
}

// ── Procedural Star Field (exported for SpaceCanvas) ─────────────────────
export function Stars({ count = 5000, opacity = 0.6 }) {
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      arr[i * 3]     = (Math.random() - 0.5) * 400
      arr[i * 3 + 1] = (Math.random() - 0.5) * 400
      arr[i * 3 + 2] = (Math.random() - 0.5) * 400
    }
    return arr
  }, [count])

  const ref = useRef()
  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.y = clock.getElapsedTime() * 0.005
      ref.current.rotation.x = clock.getElapsedTime() * 0.002
    }
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          count={count}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.32}
        color="#c8d0ff"
        sizeAttenuation
        transparent
        opacity={opacity}
      />
    </points>
  )
}

// ── Hubble Assembly Model — SCROLL DRIVEN ────────────────────────────────
// Reads window.scrollY directly inside useFrame — works with Lenis, native,
// or any scroll library since it bypasses the event system entirely.
function HubbleModel() {
  const groupRef  = useRef()
  const { scene } = useGLTF('/Hubble-1.glb')
  const cloned    = useMemo(() => scene.clone(true), [scene])

  // Stores per-mesh data after the GLB is processed
  const meshData    = useRef([])   // [{ mesh, restPos, scatterOffset, restRot, scatterRot }]
  const isSingleMesh = useRef(false)

  // ASSEMBLE_ZONE: how many viewport-heights of scroll until fully assembled
  const ASSEMBLE_ZONE = 0.55

  useEffect(() => {
    if (!groupRef.current) return

    const meshes = []
    cloned.traverse((child) => {
      if (child.isMesh) {
        meshes.push(child)
        if (child.material) {
          child.material               = child.material.clone()
          child.material.metalness     = 0.88
          child.material.roughness     = 0.22
          child.material.envMapIntensity = 1.4
        }
      }
    })

    // ── Fallback: single merged mesh → animate the whole group ───────────
    if (meshes.length === 0) {
      isSingleMesh.current = true
      meshData.current = [{
        mesh:          null,
        isGroup:       true,
        restPos:       new THREE.Vector3(0, 0, 0),
        scatterOffset: new THREE.Vector3(0, -22, -30),
        restRot:       { x: 0, y: 0, z: 0 },
        scatterRot:    { x: Math.PI * 0.6, y: 1.2, z: 0.3 },
      }]
      // Place group in scattered position right away
      groupRef.current.position.set(0, -22, -30)
      groupRef.current.rotation.set(Math.PI * 0.6, 1.2, 0.3)
      return
    }

    // ── Multi-mesh: scatter each child from its rest position ─────────────
    meshData.current = meshes.map((mesh) => {
      const restPos = mesh.position.clone()
      const restRot = { x: mesh.rotation.x, y: mesh.rotation.y, z: mesh.rotation.z }

      const angle  = Math.random() * Math.PI * 2
      const dist   = 14 + Math.random() * 10
      const scatterOffset = new THREE.Vector3(
        Math.cos(angle) * dist * (0.6 + Math.random() * 0.8),
        (Math.random() - 0.5) * dist * 1.2,
        Math.sin(angle) * dist * 0.5,
      )
      const scatterRot = {
        x: Math.random() * Math.PI * 2,
        y: Math.random() * Math.PI * 2,
        z: Math.random() * Math.PI * 2,
      }

      // Immediately place at scattered position
      mesh.position.set(
        restPos.x + scatterOffset.x,
        restPos.y + scatterOffset.y,
        restPos.z + scatterOffset.z,
      )
      mesh.rotation.set(scatterRot.x, scatterRot.y, scatterRot.z)

      return { mesh, restPos, scatterOffset, restRot, scatterRot }
    })
  }, [cloned])

  useFrame(({ clock }) => {
    if (!groupRef.current || meshData.current.length === 0) return
    const t = clock.getElapsedTime()

    // ── READ SCROLL DIRECTLY — bypasses any ref / event timing issues ───
    const scrolled    = window.scrollY || document.documentElement.scrollTop || 0
    const vh          = window.innerHeight || 800
    const rawProgress = scrolled / (vh * ASSEMBLE_ZONE)
    const progress    = Math.min(Math.max(rawProgress, 0), 1)
    const eased       = easeInOutCubic(progress)

    // ── Per-mesh lerp: scattered → assembled ─────────────────────────────
    meshData.current.forEach(({ mesh, isGroup, restPos, scatterOffset, restRot, scatterRot }) => {
      const target = isGroup ? groupRef.current : mesh
      if (!target) return

      // Position: restPos when eased=1, restPos+scatter when eased=0
      target.position.set(
        restPos.x + scatterOffset.x * (1 - eased),
        restPos.y + scatterOffset.y * (1 - eased),
        restPos.z + scatterOffset.z * (1 - eased),
      )

      // Rotation: lerp scatter → rest
      target.rotation.x = THREE.MathUtils.lerp(scatterRot.x, restRot.x, eased)
      target.rotation.y = THREE.MathUtils.lerp(scatterRot.y, restRot.y, eased)
      target.rotation.z = THREE.MathUtils.lerp(scatterRot.z, restRot.z, eased)
    })

    // ── Group-level: slow float + orbit (more visible after assembled) ────
    groupRef.current.rotation.y += 0.005 * (0.3 + eased * 0.7)
    groupRef.current.position.y += (Math.sin(t * 0.45) * 0.25 * eased - groupRef.current.position.y) * 0.02
  })

  return (
    <group ref={groupRef} scale={[0.78, 0.78, 0.78]} position={[3.2, 0, 0]}>
      <primitive object={cloned} />
    </group>
  )
}

// ── Mouse-following rim light ─────────────────────────────────────────────
function SceneLights({ mousePos }) {
  const rimRef = useRef()
  useFrame(() => {
    if (rimRef.current && mousePos?.current) {
      rimRef.current.position.x = mousePos.current.x * 12
      rimRef.current.position.y = mousePos.current.y * 8
    }
  })
  return (
    <>
      <ambientLight intensity={0.22} />
      <directionalLight position={[10, 18, 10]} intensity={2.5} color="#ffffff" />
      <directionalLight ref={rimRef} position={[-12, -8, -12]} intensity={1.3} color="#6366f1" />
      <pointLight position={[0, 10, 5]} intensity={0.9} color="#7c3aed" />
    </>
  )
}

// ── Camera mouse parallax ─────────────────────────────────────────────────
function CameraRig({ mousePos }) {
  const { camera } = useThree()
  useFrame(() => {
    if (!mousePos?.current) return
    camera.position.x += (mousePos.current.x * 0.8 - camera.position.x) * 0.04
    camera.position.y += (mousePos.current.y * 0.5 - camera.position.y) * 0.04
    camera.position.z = 14
    camera.lookAt(0, 0, 0)
  })
  return null
}

// ── Exported scene (no scrollY prop needed anymore) ───────────────────────
export default function HubbleScene({ mousePos }) {
  return (
    <div className="canvas-layer">
      <Canvas
        camera={{ position: [0, 0, 14], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 1.5]}
      >
        <Stars />
        <SceneLights mousePos={mousePos} />
        <CameraRig mousePos={mousePos} />
        <HubbleModel />
        <Environment preset="night" />
        <EffectComposer>
          <Bloom intensity={0.7} luminanceThreshold={0.65} luminanceSmoothing={0.9} mipmapBlur />
        </EffectComposer>
      </Canvas>
    </div>
  )
}

useGLTF.preload('/Hubble-1.glb')
