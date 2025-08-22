"use client"
import React, { useState, useEffect } from 'react';

const ModelViewerAR = ({ selectedCar, customColors, material }) => {
  const [modelPath, setModelPath] = useState('');
  const [isARSupported, setIsARSupported] = useState(false);

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
    // Check if Model Viewer AR is supported
    const checkARSupport = () => {
      if (typeof window !== 'undefined' && window.modelViewer) {
        setIsARSupported(true);
      }
    };

    // Set model path based on selected car
    if (selectedCar && carModelPaths[selectedCar.name]) {
      setModelPath(carModelPaths[selectedCar.name]);
    }

    checkARSupport();
  }, [selectedCar]);

  if (!isARSupported) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900 text-white">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Model Viewer AR</h2>
          <p className="mb-4">Loading Model Viewer AR...</p>
          <p className="text-sm text-gray-400">
            This feature requires Model Viewer AR support
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-black">
      <div className="absolute top-4 left-4 z-10">
        <h1 className="text-white text-xl font-bold mb-2">
          {selectedCar?.name || 'Car'} - Model Viewer AR
        </h1>
        <p className="text-white text-sm">
          Tap "View in your space" to place car in AR
        </p>
      </div>

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
        ar-button
        ar-status="not-presenting"
        loading="eager"
        reveal="auto"
        ar-scale="auto"
        ar-placement="floor"
        ar-button>
        
        <button 
          slot="ar-button" 
          className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          View in your space
        </button>

        <div slot="loading" className="flex items-center justify-center h-full">
          <div className="text-center text-white">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white mx-auto mb-4"></div>
            <p>Loading 3D Model...</p>
          </div>
        </div>

        <div slot="error" className="flex items-center justify-center h-full">
          <div className="text-center text-white">
            <p className="text-red-400 mb-4">Error loading model</p>
            <p className="text-sm">Please try refreshing the page</p>
          </div>
        </div>
      </model-viewer>
    </div>
  );
};

export default ModelViewerAR;
