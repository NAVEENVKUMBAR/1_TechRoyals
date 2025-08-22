"use client"

import { Canvas } from '@react-three/fiber'
import { ARButton, XR } from '@react-three/xr'
import { Suspense, useState } from 'react'
import { Environment, OrbitControls } from '@react-three/drei'
import ARCarSelector from './ARCarSelector'
import ARCarPlacement from './ARCarPlacement'
import Model from './Mustang'

export default function ARScene() {
  const [selectedCar, setSelectedCar] = useState({ 
    name: 'Mustang', 
    component: Model, 
    color: 'red',
    type: 'car'
  })
  const [isARActive, setIsARActive] = useState(false)

  const handleARStart = () => {
    setIsARActive(true)
  }

  const handleAREnd = () => {
    setIsARActive(false)
  }

  return (
    <div className="h-screen w-full">
      <ARButton
        className="fixed top-4 right-4 z-10 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-blue-700 transition-colors"
        sessionInit={{
          requiredFeatures: ['hit-test'],
          optionalFeatures: ['dom-overlay', 'local-floor', 'bounded-floor'],
          domOverlay: { root: document.body }
        }}
        onUnsupported={() => {
          alert('AR not supported on this device')
        }}
        onStart={handleARStart}
        onEnd={handleAREnd}
      />
      
      <ARCarSelector 
        selectedCar={selectedCar}
        onCarSelect={setSelectedCar}
      />
      
      <Canvas
        camera={{ position: [0, 1.6, 3], fov: 75 }}
        gl={{ preserveDrawingBuffer: true, antialias: true }}
      >
        <XR>
          {/* Lighting */}
          <ambientLight intensity={0.6} />
          <directionalLight 
            position={[5, 5, 5]} 
            intensity={1.2} 
            castShadow 
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
          />
          <directionalLight 
            position={[-5, 5, -5]} 
            intensity={0.8} 
            color="#ffffff"
          />
          
          {/* Environment */}
          <Environment preset="city" />
          
          {/* AR Content */}
          <Suspense fallback={null}>
            <ARCarPlacement selectedCar={selectedCar} />
          </Suspense>
          
          {/* Fallback controls for non-AR mode */}
          {!isARActive && <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />}
        </XR>
      </Canvas>
      
      {/* AR Instructions */}
      {!isARActive && (
        <div className="fixed top-20 left-4 z-20 text-white bg-black bg-opacity-75 rounded-lg p-4 max-w-sm">
          <h2 className="text-lg font-bold mb-2">AR Instructions</h2>
          <ul className="text-sm space-y-1">
            <li>• Click the AR button to start AR mode</li>
            <li>• Point your device at a flat surface</li>
            <li>• Tap to place cars and tracks where the reticle appears</li>
            <li>• Use the tabs to switch between cars and tracks</li>
            <li>• Tap the red sphere above models to remove them</li>
            <li>• Use the red box to clear all placed models</li>
          </ul>
        </div>
      )}
    </div>
  )
}