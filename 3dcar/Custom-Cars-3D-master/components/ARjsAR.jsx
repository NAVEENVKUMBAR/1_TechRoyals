"use client"
import React, { useEffect, useRef } from 'react';

const ARjsAR = ({ selectedCar }) => {
  const sceneRef = useRef(null);

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
    // Load AR.js scripts dynamically
    const loadARScripts = () => {
      // Load A-Frame
      const aframeScript = document.createElement('script');
      aframeScript.src = 'https://aframe.io/releases/1.2.0/aframe.min.js';
      aframeScript.onload = () => {
        // Load AR.js after A-Frame
        const arjsScript = document.createElement('script');
        arjsScript.src = 'https://raw.githack.com/AR-js-org/AR.js/master/aframe/build/aframe-ar.js';
        arjsScript.onload = () => {
          console.log('AR.js loaded successfully');
        };
        document.head.appendChild(arjsScript);
      };
      document.head.appendChild(aframeScript);
    };

    loadARScripts();
  }, []);

  const currentModelPath = selectedCar ? carModelPaths[selectedCar.name] : '/models/car.glb';

  return (
    <div className="h-screen">
      <div className="absolute top-4 left-4 z-10 bg-black bg-opacity-50 text-white p-4 rounded">
        <h1 className="text-xl font-bold mb-2">
          {selectedCar?.name || 'Car'} - AR.js Marker AR
        </h1>
        <p className="text-sm">
          Point camera at AR marker to view car
        </p>
        <a 
          href="/ar-marker.png" 
          download 
          className="text-blue-400 hover:text-blue-300 text-sm underline"
        >
          Download AR Marker
        </a>
      </div>

      <a-scene 
        ref={sceneRef}
        embedded 
        arjs="sourceType: webcam; debugUIEnabled: false;"
        renderer="logarithmicDepthBuffer: true;"
        vr-mode-ui="enabled: false"
      >
        {/* AR Marker */}
        <a-marker preset="hiro">
          <a-entity
            position="0 0.5 0"
            scale="0.05 0.05 0.05"
            rotation="0 45 0"
            gltf-model={currentModelPath}
            animation-mixer
          >
          </a-entity>
        </a-marker>

        {/* Camera */}
        <a-entity camera></a-entity>

        {/* Lighting */}
        <a-light type="ambient" color="#ffffff" intensity="0.5"></a-light>
        <a-light type="directional" position="0 1 0" intensity="0.8"></a-light>
      </a-scene>

      {/* Instructions Overlay */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-75 text-white p-4 rounded text-center">
        <h3 className="font-bold mb-2">How to use:</h3>
        <ol className="text-sm text-left">
          <li>1. Download the AR marker</li>
          <li>2. Print or display on another device</li>
          <li>3. Point camera at the marker</li>
          <li>4. Car will appear in AR!</li>
        </ol>
      </div>
    </div>
  );
};

export default ARjsAR;
