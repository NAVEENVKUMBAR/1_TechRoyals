"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navigation() {
  const pathname = usePathname()

  return (
    <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 z-30">
      <div className="bg-black bg-opacity-75 rounded-lg p-2 flex gap-2">
        <Link 
          href="/"
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            pathname === '/' 
              ? 'bg-blue-600 text-white' 
              : 'text-gray-300 hover:text-white hover:bg-gray-700'
          }`}
        >
          3D View
        </Link>
        <Link 
          href="/ar"
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            pathname === '/ar' 
              ? 'bg-blue-600 text-white' 
              : 'text-gray-300 hover:text-white hover:bg-gray-700'
          }`}
        >
          AR View
        </Link>
        <Link 
          href="/game"
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            pathname === '/game' 
              ? 'bg-blue-600 text-white' 
              : 'text-gray-300 hover:text-white hover:bg-gray-700'
          }`}
        >
          Game
        </Link>
      </div>
    </nav>
  )
}