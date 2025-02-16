import { Canvas } from '@react-three/fiber'
import { BackgroundScene } from './background-scene'

export default function Background() {
  return (
    <div className="fixed inset-0 z-0">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <BackgroundScene />
      </Canvas>
    </div>
  )
} 