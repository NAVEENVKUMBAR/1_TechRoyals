"use client"

import { useState } from 'react'

export default function TestPage() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-purple-900 flex items-center justify-center">
      <div className="text-center text-white p-8 max-w-md">
        <h1 className="text-4xl font-bold mb-4">AR Test Page</h1>
        <p className="text-lg mb-6">This is a simple test to check if the page is loading.</p>
        
        <div className="bg-white bg-opacity-20 rounded-lg p-6 mb-6">
          <p className="text-2xl font-bold mb-2">Counter: {count}</p>
          <button
            onClick={() => setCount(count + 1)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Increment
          </button>
        </div>
        
        <div className="space-y-2 text-sm">
          <p>✅ Page is loading</p>
          <p>✅ React is working</p>
          <p>✅ State is functional</p>
          <p>✅ Tailwind CSS is working</p>
        </div>
      </div>
    </div>
  )
}
