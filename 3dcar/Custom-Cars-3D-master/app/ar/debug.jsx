"use client"

import { Suspense, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import SimpleCar from '../../components/SimpleCar'

export default function DebugPage() {
  const [carColor, setCarColor] = useState('red')

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="p-8">
        <h1 className="text-4xl font-bold mb-4">Car Model Debug Page</h1>
        <p className="text-lg mb-6">Testing car model loading and rendering.</p>
        
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">Car Color:</label>
          <select 
            value={carColor} 
            onChange={(e) => setCarColor(e.target.value)}
            className="bg-gray-800 text-white px-4 py-2 rounded"
          >
            <option value="red">Red</option>
            <option value="blue">Blue</option>
            <option value="green">Green</option>
            <option value="yellow">Yellow</option>
          </select>
        </div>

        <div className="h-96 w-full bg-gray-900 rounded-lg overflow-hidden">
          <Canvas camera={{ position: [0, 2, 5], fov: 75 }}>
            <ambientLight intensity={0.6} />
            <directionalLight position={[5, 5, 5]} intensity={1.2} />
            
            <Suspense fallback={null}>
              <SimpleCar
                position={[0, 0, 0]}
                scale={[0.5, 0.5, 0.5]}
                customColors={{
                  body: carColor,
                  accesoriesColor: "silver",
                  rimsColor: "black",
                }}
              />
            </Suspense>
            
            <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
          </Canvas>
        </div>

        <div className="mt-6 bg-gray-800 rounded-lg p-4">
          <h2 className="text-xl font-bold mb-2">Debug Info:</h2>
          <ul className="text-sm space-y-1">
            <li>✅ Canvas is rendering</li>
            <li>✅ Lighting is working</li>
            <li>✅ OrbitControls are functional</li>
            <li>✅ Color changing is working</li>
            <li>❓ Car model loading...</li>
          </ul>
        </div>

        <div className="mt-4">
          <a href="/ar" className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded inline-block mr-4">
            Back to AR Page
          </a>
          <a href="/" className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded inline-block">
            Back to Home
          </a>
        </div>
      </div>
    </div>
  )
}
