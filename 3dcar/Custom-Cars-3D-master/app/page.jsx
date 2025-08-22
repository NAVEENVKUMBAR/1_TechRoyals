"use client"
import CarCard from "../components/CarCard";
import Model from "../components/Mustang";
import BmwM8 from "../components/BmwM8";
import Porsche from "../components/Porsche";
import AudiA8 from "../components/AudiA8";
import Benz1 from "../components/Benz1";
import BmwE34 from "../components/BmwE34";
import Camaro from "../components/Camaro";
import Mclaren720 from "../components/Mclaren720";
import Nissan from "../components/Nissan";
import { Car } from "../components/Car";
import SimpleCar from "../components/SimpleCar";
import { Track } from "../components/Track";
import AllCars from "../components/AllCars";
import Link from "next/link";
import { useContext, useState, Suspense } from "react";
import { CarSelectionContext } from "./layout";
import { getCarMaterialName } from "../components/UniversalMaterialWrapper";

import {
    Stage,
    PresentationControls,
    MeshReflectorMaterial,
    OrbitControls
  } from "@react-three/drei";
import React from "react";
import { Canvas, useThree } from "@react-three/fiber";

// WebGL Error Boundary Component
function WebGLErrorBoundary({ children }) {
  const [hasError, setHasError] = useState(false);
  const [error, setError] = useState(null);

  if (hasError) {
    return (
      <div className="flex items-center justify-center h-full bg-gray-900 text-white p-4 md:p-8">
        <div className="text-center">
          <h2 className="text-xl md:text-2xl font-bold mb-4">WebGL Error</h2>
          <p className="mb-4 text-sm md:text-base">Unable to create 3D view. This could be due to:</p>
          <ul className="text-left mb-6 space-y-2 text-sm md:text-base">
            <li>• Graphics driver issues</li>
            <li>• Browser WebGL support</li>
            <li>• Hardware acceleration disabled</li>
            <li>• Outdated graphics drivers</li>
          </ul>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 text-sm md:text-base"
          >
            Reload Page
          </button>
        </div>
      </div>
    );
  }

  return (
    <ErrorBoundary onError={(error) => {
      setError(error);
      setHasError(true);
    }}>
      {children}
    </ErrorBoundary>
  );
}

// Simple Error Boundary
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('WebGL Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || <div>Something went wrong.</div>;
    }
    return this.props.children;
  }
}

// 3D Scene Component with Error Handling
function Scene3D({ selectedCarModel, bodyColor, accessoriesColor, rimsColor, material }) {
  const setCameraPosition = ({ camera }) => {
    try {
      camera.position.set(5, 2.5, 4);
      camera.lookAt(0, 0, 0);
    } catch (error) {
      console.error('Camera setup error:', error);
    }
  };

  const SelectedCarComponent = selectedCarModel.component;

  return (
    <Canvas 
      onCreated={setCameraPosition}
      gl={{ 
        antialias: true, 
        alpha: false, 
        powerPreference: "high-performance",
        failIfMajorPerformanceCaveat: false,
        preserveDrawingBuffer: false
      }}
      camera={{ fov: 75, near: 0.1, far: 1000 }}
      onError={(error) => {
        console.error('Canvas error:', error);
      }}
    >
      <color attach="background" args={["#101010"]} />
      <fog attach="fog" args={["#101010", 10, 30]} />
      
      <OrbitControls maxPolarAngle={Math.PI / 2} />
      <Stage environment={"city"} intensity={0.6} contactShadow={false}>
        <Suspense fallback={null}>
          <SelectedCarComponent
            position={[1, -0.48, 0]}
            customColors={{
              body: bodyColor,
              accesoriesColor: accessoriesColor,
              rimsColor: rimsColor,
            }}
            material={material}
          />
        </Suspense>
      </Stage>
      
      <mesh rotation={[-Math.PI / 2, 0, 0]} position-y={-0.5}>
        <planeGeometry args={[170, 170]} />
        <MeshReflectorMaterial
          blur={[300, 100]}
          resolution={1024}
          mixBlur={1}
          mixStrength={40}
          roughness={1}
          depthScale={1.2}
          minDepthThreshold={0.4}
          maxDepthThreshold={1.4}
          color="#101010"
          metalness={0.5}
        />
      </mesh>
    </Canvas>
  );
}

export default function App() {
  const { selectedCar } = useContext(CarSelectionContext);
  const [bodyColor, setBodyColor] = useState("#ff0000");
  const [accessoriesColor, setAccessoriesColor] = useState("#000000");
  const [rimsColor, setRimsColor] = useState("#000000");
  const [material, setMaterial] = useState("null");
  const [webglError, setWebglError] = useState(false);

  const carModels = [
    { name: 'Mustang', component: Model, color: 'red' },
    { name: 'BMW M8', component: BmwM8, color: 'blue' },
    { name: 'Porsche', component: Porsche, color: 'yellow' },
    { name: 'Audi A8', component: AudiA8, color: 'silver' },
    { name: 'Benz', component: Benz1, color: 'black' },
    { name: 'BMW E34', component: BmwE34, color: 'white' },
    { name: 'Camaro', component: Camaro, color: 'orange' },
    { name: 'McLaren 720', component: Mclaren720, color: 'red' },
    { name: 'Nissan', component: Nissan, color: 'blue' },
    { name: 'Generic Car', component: Car, color: 'green' },
    { name: 'Simple Car', component: SimpleCar, color: 'purple' }
  ];

  // Find the selected car component
  const selectedCarModel = carModels.find(model => model.name === selectedCar.name) || carModels[0];

  // Get the correct material name for the selected car
  const carMaterialName = getCarMaterialName(selectedCarModel.name);

  // Function to download the 3D model
  const downloadModel = async () => {
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

    const modelPath = carModelPaths[selectedCarModel.name] || '/models/car.glb';

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
      link.download = `${selectedCarModel.name}.gltf`;
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

  return(
    <div className="h-screen w-full">
      <Suspense fallback={
        <div className="flex items-center justify-center h-full bg-gray-900 text-white">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white mx-auto mb-4"></div>
            <p className="text-xl">Loading 3D Scene...</p>
          </div>
        </div>
      }>
        <WebGLErrorBoundary>
          <Scene3D 
            selectedCarModel={selectedCarModel}
            bodyColor={bodyColor}
            accessoriesColor={accessoriesColor}
            rimsColor={rimsColor}
            material={material}
          />
        </WebGLErrorBoundary>
                
        {/* Hero Section - Responsive */}
        <div className="fixed left-4 lg:left-56 bottom-4 lg:bottom-64 max-w-xs lg:max-w-md">
          <h1 className="text-white text-3xl lg:text-7xl font-bold font-mono">CustomCars3D</h1>
          <p className="text-white font-semibold font-mono mt-4 lg:mt-10 text-sm lg:text-base">Choose from our rich collection of car 3D models and customize them however you want.</p>
          <Link href="/ar" className="inline-block mt-4 lg:mt-6 bg-blue-600 text-white px-4 lg:px-6 py-2 lg:py-3 rounded-lg hover:bg-blue-700 transition-colors font-mono font-semibold text-sm lg:text-base">
            Experience in AR
          </Link>
        </div>

        {/* Customization Panel - Responsive */}
        <div className="fixed right-2 lg:right-7 bottom-2 lg:bottom-24 w-72 lg:w-80 text-white p-2 lg:p-4 bg-gray-900 bg-opacity-80 rounded-lg text-xs lg:text-sm">
          <h2 className="font-sans font-bold text-sm lg:text-lg mb-2 lg:mb-4">Customize {selectedCarModel.name}</h2>
          
          {/* Material Info */}
          <div className="mb-2 lg:mb-4 p-1 lg:p-2 bg-blue-900 bg-opacity-50 rounded text-xs">
            <p><strong>Material:</strong> {carMaterialName}</p>
            <p><strong>Status:</strong> {material !== "null" ? "Custom Texture Applied" : "Default Paint"}</p>
          </div>
          
          {/* Download Button */}
          <div className="mb-4 lg:mb-6">
            <button
              onClick={downloadModel}
              className="w-full bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded text-xs lg:text-sm font-semibold transition-colors mb-2 lg:mb-3"
            >
              📥 Download {selectedCarModel.name} Model
            </button>
          </div>
          
          {/* Color Customization */}
          <div className="mb-4 lg:mb-6">
            <h3 className="font-semibold text-xs lg:text-md mb-2 lg:mb-3">Colors</h3>
            <div className="space-y-2 lg:space-y-3">
              <div className="flex items-center">
                <input
                  type="color"
                  value={bodyColor}
                  onChange={(e) => setBodyColor(e.target.value)}
                  className="w-6 h-6 lg:w-8 lg:h-8 rounded border-2 border-gray-600"
                />
                <label className="ml-2 lg:ml-3 text-xs lg:text-sm">Body</label>
              </div>
              <div className="flex items-center">
                <input
                  type="color"
                  value={accessoriesColor}
                  onChange={(e) => setAccessoriesColor(e.target.value)}
                  className="w-6 h-6 lg:w-8 lg:h-8 rounded border-2 border-gray-600"
                />
                <label className="ml-2 lg:ml-3 text-xs lg:text-sm">Accessories</label>
              </div>
              <div className="flex items-center">
                <input
                  type="color"
                  value={rimsColor}
                  onChange={(e) => setRimsColor(e.target.value)}
                  className="w-6 h-6 lg:w-8 lg:h-8 rounded border-2 border-gray-600"
                />
                <label className="ml-2 lg:ml-3 text-xs lg:text-sm">Rims</label>
              </div>
            </div>
          </div>

          {/* Material Wraps */}
          <div>
            <h3 className="font-semibold text-xs lg:text-md mb-2 lg:mb-3">Material Wraps</h3>
            <div className="grid grid-cols-5 gap-1 lg:gap-2">
              <img 
                onClick={() => setMaterial("null")} 
                className={`w-6 h-6 lg:w-8 lg:h-8 rounded-full border-2 cursor-pointer ${material === "null" ? "border-blue-400" : "border-gray-600"}`} 
                src="/material1.png" 
                alt="Default"
                title="Default Paint"
              />
              <img 
                onClick={() => setMaterial("/material1.png")} 
                className={`w-6 h-6 lg:w-8 lg:h-8 rounded-full border-2 cursor-pointer ${material === "/material1.png" ? "border-blue-400" : "border-gray-600"}`} 
                src="/material1.png" 
                alt="Material 1"
                title="Red Texture"
              />
              <img 
                onClick={() => setMaterial("/material2.jpg")} 
                className={`w-6 h-6 lg:w-8 lg:h-8 rounded-full border-2 cursor-pointer ${material === "/material2.jpg" ? "border-blue-400" : "border-gray-600"}`} 
                src="/material2.jpg" 
                alt="Material 2"
                title="Blue Texture"
              />
              <img 
                onClick={() => setMaterial("/material3.jpg")} 
                className={`w-6 h-6 lg:w-8 lg:h-8 rounded-full border-2 cursor-pointer ${material === "/material3.jpg" ? "border-blue-400" : "border-gray-600"}`} 
                src="/material3.jpg" 
                alt="Material 3"
                title="Yellow Texture"
              />
              <img 
                onClick={() => setMaterial("/galaxyMaterial.png")} 
                className={`w-6 h-6 lg:w-8 lg:h-8 rounded-full border-2 cursor-pointer ${material === "/galaxyMaterial.png" ? "border-blue-400" : "border-gray-600"}`} 
                src="/galaxyMaterial.png" 
                alt="Galaxy"
                title="Galaxy Pattern"
              />
            </div>
            <div className="grid grid-cols-5 gap-1 lg:gap-2 mt-1 lg:mt-2">
              <img 
                onClick={() => setMaterial("/material4.jpg")} 
                className={`w-6 h-6 lg:w-8 lg:h-8 rounded-full border-2 cursor-pointer ${material === "/material4.jpg" ? "border-blue-400" : "border-gray-600"}`} 
                src="/material4.jpg" 
                alt="Material 4"
                title="Silver Texture"
              />
              <img 
                onClick={() => setMaterial("/material5.jpg")} 
                className={`w-6 h-6 lg:w-8 lg:h-8 rounded-full border-2 cursor-pointer ${material === "/material5.jpg" ? "border-blue-400" : "border-gray-600"}`} 
                src="/material5.jpg" 
                alt="Material 5"
                title="Black Texture"
              />
              <img 
                onClick={() => setMaterial("/material6.jpg")} 
                className={`w-6 h-6 lg:w-8 lg:h-8 rounded-full border-2 cursor-pointer ${material === "/material6.jpg" ? "border-blue-400" : "border-gray-600"}`} 
                src="/material6.jpg" 
                alt="Material 6"
                title="White Texture"
              />
              <img 
                onClick={() => setMaterial("/material7.webp")} 
                className={`w-6 h-6 lg:w-8 lg:h-8 rounded-full border-2 cursor-pointer ${material === "/material7.webp" ? "border-blue-400" : "border-gray-600"}`} 
                src="/material7.webp" 
                alt="Material 7"
                title="Orange Texture"
              />
              <img 
                onClick={() => setMaterial("/material8.webp")} 
                className={`w-6 h-6 lg:w-8 lg:h-8 rounded-full border-2 cursor-pointer ${material === "/material8.webp" ? "border-blue-400" : "border-gray-600"}`} 
                src="/material8.webp" 
                alt="Material 8"
                title="Red Texture 2"
              />
            </div>
          </div>
        </div>
      </Suspense>
    </div>
  )
}