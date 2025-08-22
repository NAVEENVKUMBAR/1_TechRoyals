"use client"
import React, { useState, useEffect } from 'react';
import ARScene from '../../components/ARScene';
import Link from 'next/link';

export default function ARPage() {
  const [isSecure, setIsSecure] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    // Check if running on HTTPS or localhost
    const isSecureContext = window.location.protocol === 'https:' || window.location.hostname === 'localhost';
    setIsSecure(isSecureContext);

    // Check if mobile device
    const mobileCheck = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    setIsMobile(mobileCheck);

    // Check if user has seen instructions before
    const hasSeenInstructions = localStorage.getItem('ar-instructions-seen');
    if (!hasSeenInstructions) {
      setShowInstructions(true);
    }
  }, []);

  if (!isSecure) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900 text-white">
        <div className="text-center max-w-md mx-auto p-8">
          <h1 className="text-3xl font-bold mb-6">🚗 CustomCars3D AR</h1>
          <div className="bg-yellow-900 bg-opacity-50 border border-yellow-600 rounded-lg p-4 mb-6">
            <h2 className="text-xl font-semibold mb-2">HTTPS Required</h2>
            <p className="text-sm">AR functionality requires a secure connection (HTTPS) or localhost.</p>
          </div>
          <p className="mb-6 text-gray-300">
            To experience AR, please access this page via HTTPS or run locally on localhost.
          </p>
          <Link href="/" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
            Back to 3D View
          </Link>
        </div>
      </div>
    );
  }

  if (!isMobile) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900 text-white">
        <div className="text-center max-w-md mx-auto p-8">
          <h1 className="text-3xl font-bold mb-6">🚗 CustomCars3D AR</h1>
          <div className="bg-blue-900 bg-opacity-50 border border-blue-600 rounded-lg p-4 mb-6">
            <h2 className="text-xl font-semibold mb-2">Mobile Device Required</h2>
            <p className="text-sm">AR experience works best on mobile devices with ARCore (Android) or ARKit (iOS).</p>
          </div>
          <p className="mb-6 text-gray-300">
            Please open this page on your mobile device to experience AR.
          </p>
          <div className="space-y-3">
            <Link href="/" className="block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
              Back to 3D View
            </Link>
            <Link href="/ar/model-viewer" className="block bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors">
              Try Model Viewer AR (Desktop Compatible)
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (hasError) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900 text-white">
        <div className="text-center max-w-md mx-auto p-8">
          <h1 className="text-3xl font-bold mb-6">🚗 CustomCars3D AR</h1>
          <div className="bg-red-900 bg-opacity-50 border border-red-600 rounded-lg p-4 mb-6">
            <h2 className="text-xl font-semibold mb-2">AR Error</h2>
            <p className="text-sm">There was an error initializing the AR experience.</p>
          </div>
          <p className="mb-6 text-gray-300">
            Please try refreshing the page or check if your device supports AR.
          </p>
          <div className="space-y-3">
            <button 
              onClick={() => window.location.reload()} 
              className="block w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Refresh Page
            </button>
            <Link href="/" className="block bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors">
              Back to 3D View
            </Link>
            <Link href="/ar/model-viewer" className="block bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors">
              Try Alternative AR
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen">
      {/* Instructions Modal */}
      {showInstructions && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-gray-800 text-white p-6 rounded-lg max-w-md mx-4">
            <h2 className="text-2xl font-bold mb-4">Welcome to AR Experience! 🚗</h2>
            <div className="space-y-3 text-sm">
              <p><strong>How to use AR:</strong></p>
              <ol className="list-decimal list-inside space-y-1 ml-4">
                <li>Allow camera permissions when prompted</li>
                <li>Point your camera at a flat surface</li>
                <li>Tap to place the car in AR</li>
                <li>Move around to view from different angles</li>
                <li>Use the car selector to switch models</li>
              </ol>
              <p className="text-yellow-400 mt-4">
                <strong>Tip:</strong> Good lighting and textured surfaces work best!
              </p>
            </div>
            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => {
                  setShowInstructions(false);
                  localStorage.setItem('ar-instructions-seen', 'true');
                }}
                className="flex-1 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Got it!
              </button>
              <button
                onClick={() => setShowInstructions(false)}
                className="flex-1 bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
              >
                Skip
              </button>
            </div>
          </div>
        </div>
      )}

      {/* AR Experience */}
      <ARScene />

      {/* Alternative AR Link */}
      <div className="absolute top-4 right-4 z-10">
        <Link 
          href="/ar/model-viewer" 
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm font-semibold"
        >
          Try Model Viewer AR
        </Link>
      </div>
    </div>
  );
}