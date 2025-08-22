"use client"

import './globals.css'
import { Inter } from 'next/font/google'
import AllCars from '../components/AllCars'
import { createContext, useState } from 'react'
import Script from 'next/script'

const inter = Inter({ subsets: ['latin'] })

// Create context for car selection
export const CarSelectionContext = createContext();

export default function RootLayout({ children }) {
  const [selectedCar, setSelectedCar] = useState({ name: 'Mustang', type: 'car' });
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleCarSelect = (car) => {
    setSelectedCar(car);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <html lang="en">
      <head>
        <Script
          type="module"
          src="https://unpkg.com/@google/model-viewer@^3.4.0/dist/model-viewer.min.js"
          strategy="afterInteractive"
          onLoad={() => {
            console.log('Model Viewer script loaded successfully');
          }}
          onError={() => {
            console.error('Failed to load Model Viewer script');
          }}
        />
      </head>
      <body className={inter.className}>
        <CarSelectionContext.Provider value={{ selectedCar, handleCarSelect }}>
          <div className="flex h-screen">
            {/* Mobile Menu Button */}
            <button
              onClick={toggleSidebar}
              className="lg:hidden fixed top-4 left-4 z-50 bg-red-600 text-white p-2 rounded-lg shadow-lg"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            {/* Sidebar */}
            <div className={`
              ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
              lg:translate-x-0
              fixed lg:relative
              w-48 lg:w-48
              h-screen
              bg-red-600
              overflow-y-auto
              transition-transform duration-300 ease-in-out
              z-40
              lg:z-auto
            `}>
              <AllCars selectedCar={selectedCar} onCarSelect={handleCarSelect} />
            </div>

            {/* Overlay for mobile */}
            {sidebarOpen && (
              <div 
                className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
                onClick={toggleSidebar}
              />
            )}

            {/* Main Content */}
            <div className="flex-1 w-full lg:w-auto">
              {children}
            </div>
          </div>
        </CarSelectionContext.Provider>
      </body>
    </html>
  )
}