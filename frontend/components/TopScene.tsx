"use client"

import * as React from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { useGLTF, Stage } from "@react-three/drei"
import * as THREE from "three"

/* =========================================================
   EXTREME REALISTIC SPINNING TOP PHYSICS (GYROSCOPE MODEL)
========================================================= */
function useExtremeSpinningTop(
  ref: React.RefObject<THREE.Object3D>,
  baseSpin: number
) {
  // Angular velocities
  const spin = React.useRef(baseSpin)          // main spin (rad/s)
  const precession = React.useRef(0.6)         // slow circular motion
  const wobble = React.useRef(0.45)             // tilt angle (rad)

  // Phase & noise
  const phase = React.useRef(Math.random() * Math.PI * 2)
  const noiseSeed = React.useRef(Math.random() * 1000)

  useFrame((state, delta) => {
    if (!ref.current) return

    // Clamp delta for stability
    delta = Math.min(delta, 0.03)

    /* ---------------------------
       1. MAIN SPIN (ANGULAR MOMENTUM)
    ---------------------------- */
    ref.current.rotation.y += spin.current * delta

    /* ---------------------------
       2. PRECESSION (GYRO EFFECT)
       Faster spin → slower wobble
    ---------------------------- */
    precession.current = THREE.MathUtils.lerp(
      precession.current,
      1 / (spin.current * 0.15),
      delta * 2
    )

    phase.current += precession.current * delta

    /* ---------------------------
       3. NUTATION (WOBBLE OSCILLATION)
    ---------------------------- */
    const nutation =
      wobble.current *
      Math.sin(phase.current * 2.2) *
      Math.exp(-delta * 0.5)

    /* ---------------------------
       4. MICRO IMPERFECTIONS
       (surface + mass imbalance)
    ---------------------------- */
    noiseSeed.current += delta * 10
    const microNoise =
      Math.sin(noiseSeed.current) * 0.008 +
      Math.cos(noiseSeed.current * 0.7) * 0.006

    /* ---------------------------
       5. APPLY TILT
    ---------------------------- */
    ref.current.rotation.x = nutation + microNoise
    ref.current.rotation.z = nutation * 0.65 + microNoise

    /* ---------------------------
       6. FRICTION + AIR DRAG
       (never reaches zero)
    ---------------------------- */
    wobble.current = THREE.MathUtils.lerp(
      wobble.current,
      0.05,
      delta * 0.4
    )

    spin.current = THREE.MathUtils.lerp(
      spin.current,
      baseSpin * 0.97,
      delta * 0.12
    )

    /* ---------------------------
       7. GROUND CONTACT ILLUSION
       (tiny vertical vibration)
    ---------------------------- */
    ref.current.position.y =
      Math.abs(Math.sin(phase.current * 3)) * 0.015
  })
}

/* =========================================================
   GLB MODEL
========================================================= */
function SpinningTopModel({ url, speed }: { url: string; speed: number }) {
  const ref = React.useRef<THREE.Group>(null!)
  const { scene } = useGLTF(url)

  useExtremeSpinningTop(ref, speed)

  // Improve realism
  React.useEffect(() => {
    scene.traverse((obj: any) => {
      if (obj.isMesh) {
        obj.material.metalness = 0.9
        obj.material.roughness = 0.15
        obj.material.envMapIntensity = 1.2
      }
    })
  }, [scene])

  return <primitive ref={ref} object={scene} scale={2.2} />
}

/* =========================================================
   MAIN SCENE
========================================================= */
export default function TopScene({
  modelUrl = "/spinning_top.glb",
  spinSpeed = 14
}: {
  modelUrl?: string
  spinSpeed?: number
}) {
  return (
    <div style={{ width: 280, height: 280 }}>
      <Canvas
        camera={{ position: [0, 2, 4.5], fov: 42 }}
        gl={{ antialias: true, alpha: true }}
      >
        {/* Lighting tuned for metal */}
        <ambientLight intensity={0.7} />
        <directionalLight
          position={[6, 6, 6]}
          intensity={1.1}
        />
        <directionalLight
          position={[-4, -2, 3]}
          intensity={0.4}
        />

        <React.Suspense fallback={null}>
          <Stage
            preset="portrait"
            intensity={1}
            environment="city"
            adjustCamera
            shadows={false}
          >
            <SpinningTopModel
              url={modelUrl}
              speed={spinSpeed}
            />
          </Stage>
        </React.Suspense>
      </Canvas>
    </div>
  )
}

/* =========================================================
   PRELOAD
========================================================= */
useGLTF.preload("/spinning_top.glb")
