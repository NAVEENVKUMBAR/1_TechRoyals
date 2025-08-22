"use client"
import React, { useState, useEffect } from 'react';
import { useContext } from 'react';
import { CarSelectionContext } from '../../layout';
import Link from 'next/link';

const ModelViewerARPage = () => {
  const { selectedCar } = useContext(CarSelectionContext);
  const [modelPath, setModelPath] = useState('');
  const [isARSupported, setIsARSupported] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Map car names to their GLTF model paths
  const carModelPaths = {
    'Mustang': '/mustang.gltf',
    'BMW M8': '/bmwM8.gltf',
    'Porsche': '/porsche.gltf',
    'Audi A8': '/audiA8.gltf',
    'Benz': '/benz1.gltf',
    'BMW E34': '/bmwE34.gltf',
    'Camaro': '/camaro.gltf',
    'McLaren 720': '/mclaren720.gltf',
    'Nissan': '/nissan.gltf',
    'Generic Car': '/models/car.glb',
    'Simple Car': '/models/car.glb'
  };

  useEffect(() => {
    // Set model path based on selected car
    if (selectedCar && carModelPaths[selectedCar.name]) {
      setModelPath(carModelPaths[selectedCar.name]);
    } else {
      setModelPath('/models/car.glb'); // Default fallback
    }

    // Optimized Model Viewer loading check
    let checkCount = 0;
    const maxChecks = 50; // Maximum 5 seconds (50 * 100ms)
    
    const checkModelViewer = () => {
      checkCount++;
      
      if (typeof window !== 'undefined' && window.modelViewer) {
        setIsARSupported(true);
        setIsLoading(false);
        return;
      }
      
      // If we've checked too many times, assume it's not supported
      if (checkCount >= maxChecks) {
        console.warn('Model Viewer not available after timeout');
        setIsARSupported(false);
        setIsLoading(false);
        return;
      }
      
      // Check more frequently (every 100ms instead of longer intervals)
      setTimeout(checkModelViewer, 100);
    };

    // Start checking immediately
    checkModelViewer();
  }, [selectedCar]);

  // Function to download the 3D model
  const downloadModel = async () => {
    try {
      const response = await fetch(modelPath);
      if (!response.ok) {
        throw new Error('Failed to fetch model');
      }
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      
      // Create download link
      const link = document.createElement('a');
      link.href = url;
      link.download = `${selectedCar?.name || 'car'}.gltf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Clean up
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download failed:', error);
      alert('Download failed. Please try again.');
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900 text-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white mx-auto mb-4"></div>
          <h2 className="text-2xl font-bold mb-4">Loading Model Viewer AR</h2>
          <p className="text-gray-400">Initializing AR experience...</p>
          <p className="text-sm text-gray-500 mt-2">This should take just a few seconds</p>
        </div>
      </div>
    );
  }

  if (!isARSupported) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900 text-white">
        <div className="text-center max-w-md mx-auto p-4 md:p-8">
          <h2 className="text-xl md:text-2xl font-bold mb-4">Model Viewer AR</h2>
          <p className="mb-6 text-sm md:text-base">This AR experience requires Model Viewer support.</p>
          <div className="space-y-4 text-xs md:text-sm">
            <p>✅ Supported browsers:</p>
            <ul className="text-left ml-4 space-y-1">
              <li>• Chrome 79+</li>
              <li>• Safari 13.1+</li>
              <li>• Edge 79+</li>
            </ul>
            <p>❌ Not supported:</p>
            <ul className="text-left ml-4 space-y-1">
              <li>• Firefox (limited AR support)</li>
              <li>• Older browsers</li>
            </ul>
          </div>
          <div className="mt-6 space-y-3">
            <Link 
              href="/" 
              className="inline-block bg-blue-600 text-white px-4 md:px-6 py-2 md:py-3 rounded-lg hover:bg-blue-700 transition-colors text-sm md:text-base"
            >
              Back to 3D View
            </Link>
            <button
              onClick={downloadModel}
              className="block w-full bg-green-600 hover:bg-green-700 text-white px-4 md:px-6 py-2 md:py-3 rounded-lg transition-colors text-sm md:text-base font-semibold"
            >
              📥 Download {selectedCar?.name || 'Car'} Model
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-black relative">
      {/* Header - Responsive */}
      <div className="absolute top-2 md:top-4 left-2 md:left-4 z-10 bg-black bg-opacity-50 text-white p-2 md:p-4 rounded-lg max-w-xs md:max-w-md">
        <h1 className="text-sm md:text-xl font-bold mb-1 md:mb-2">
          {selectedCar?.name || 'Car'} - Model Viewer AR
        </h1>
        <p className="text-xs md:text-sm mb-1 md:mb-2">
          Tap "View in your space" to place car in AR
        </p>
        <div className="flex flex-col space-y-2">
          <Link 
            href="/" 
            className="text-blue-400 hover:text-blue-300 text-xs md:text-sm underline"
          >
            ← Back to 3D View
          </Link>
          <button
            onClick={downloadModel}
            className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-xs md:text-sm font-semibold transition-colors"
          >
            📥 Download {selectedCar?.name || 'Car'} Model
          </button>
        </div>
      </div>

      {/* Model Viewer */}
      <model-viewer
        src={modelPath}
        ar
        ar-modes="webxr scene-viewer quick-look"
        camera-controls
        shadow-intensity="1"
        auto-rotate
        camera-orbit="45deg 55deg 2.5m"
        min-camera-orbit="auto auto 1m"
        max-camera-orbit="auto auto 10m"
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: '#000000'
        }}
        ar-status="not-presenting"
        loading="eager"
        reveal="auto"
        ar-scale="auto"
        ar-placement="floor"
        exposure="1"
        environment-image="neutral"
        shadow-softness="0.5"
        animation-name="idle"
        interaction-prompt="auto"
        interaction-prompt-style="wiggle"
        camera-target="0m 0m 0m"
        field-of-view="30deg"
        min-field-of-view="10deg"
        max-field-of-view="45deg"
        interpolation-decay="200"
        orientation="0deg 0deg 0deg"
        scale="1 1 1"
        ar-button>

        {/* Loading State */}
        <div slot="loading" className="flex items-center justify-center h-full">
          <div className="text-center text-white">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white mx-auto mb-4"></div>
            <p className="text-xl">Loading 3D Model...</p>
            <p className="text-sm text-gray-400 mt-2">Please wait while we prepare your car</p>
          </div>
        </div>

        {/* Error State */}
        <div slot="error" className="flex items-center justify-center h-full">
          <div className="text-center text-white">
            <div className="text-red-400 text-6xl mb-4">⚠️</div>
            <p className="text-xl mb-2">Error loading model</p>
            <p className="text-sm text-gray-400 mb-4">The 3D model could not be loaded</p>
            <button 
              onClick={() => window.location.reload()} 
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Try Again
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div slot="progress-bar" className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64">
          <div className="bg-gray-700 rounded-full h-2">
            <div className="bg-blue-600 h-2 rounded-full transition-all duration-300" style={{width: '0%'}}></div>
          </div>
        </div>
      </model-viewer>

      {/* Instructions Overlay - Responsive */}
      <div className="absolute bottom-16 md:bottom-20 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-75 text-white p-2 md:p-4 rounded-lg text-center max-w-xs md:max-w-sm">
        <h3 className="font-bold mb-1 md:mb-2 text-xs md:text-sm">How to use AR:</h3>
        <ol className="text-xs md:text-sm text-left space-y-1">
          <li>1. Tap "View in your space" button</li>
          <li>2. Point camera at a flat surface</li>
          <li>3. Tap to place the car</li>
          <li>4. Move around to view from different angles</li>
        </ol>
      </div>

      {/* AR Status Indicator - Responsive */}
      <div className="absolute top-2 md:top-4 right-2 md:right-4 z-10">
        <div className="bg-green-500 text-white px-2 md:px-3 py-1 rounded-full text-xs md:text-sm font-semibold">
          AR Ready
        </div>
      </div>
    </div>
  );
};

export default ModelViewerARPage;
