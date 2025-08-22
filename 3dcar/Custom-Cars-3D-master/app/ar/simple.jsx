"use client"

import { useState } from 'react'

export default function SimpleARPage() {
  const [isVisible, setIsVisible] = useState(true)

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="p-8">
        <h1 className="text-4xl font-bold mb-4">Simple AR Page</h1>
        <p className="text-lg mb-6">This is a simplified version to test basic functionality.</p>
        
        <div className="bg-gray-800 rounded-lg p-6 mb-6">
          <h2 className="text-2xl font-bold mb-4">Basic Components Test</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Visibility Toggle:</label>
              <button
                onClick={() => setIsVisible(!isVisible)}
                className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
              >
                {isVisible ? 'Hide' : 'Show'} Content
              </button>
            </div>
            
            {isVisible && (
              <div className="bg-green-900 p-4 rounded">
                <p>✅ Content is visible and interactive!</p>
                <p>✅ React state is working</p>
                <p>✅ Tailwind CSS is working</p>
              </div>
            )}
          </div>
        </div>
        
        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Navigation</h2>
          <div className="space-x-4">
            <a href="/" className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded inline-block">
              Back to Home
            </a>
            <a href="/ar" className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded inline-block">
              Full AR Page
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
