"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { Points, PointMaterial } from "@react-three/drei"
import * as random from "maath/random"

export function BackgroundScene() {
  const ref = useRef<any>()
  const sphere = new Float32Array(random.inSphere(new Float32Array(5000), { radius: 1.5 }))

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10
      ref.current.rotation.y -= delta / 15
    }
  })

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#0ea5e9"
          size={0.002}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.5}
        />
      </Points>
    </group>
  )
} 