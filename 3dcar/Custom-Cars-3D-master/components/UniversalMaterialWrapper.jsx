import React, { useMemo, useEffect } from 'react';
import { TextureLoader } from 'three';
import { useLoader } from '@react-three/fiber';
import * as THREE from 'three';

// Universal Material Wrapper Hook
export function useMaterialWrapper(materialPath, materialName, materials) {
  const customMaterial = useMemo(() => {
    if (materialPath && materialPath !== "null") {
      try {
        const texture = useLoader(TextureLoader, materialPath);
        return new THREE.MeshBasicMaterial({
          map: texture,
          transparent: false,
          side: THREE.DoubleSide
        });
      } catch (error) {
        console.error(`Error loading texture ${materialPath}:`, error);
        return null;
      }
    }
    return null;
  }, [materialPath]);

  // Apply custom material to the specified material
  useEffect(() => {
    if (customMaterial && materials[materialName]) {
      materials[materialName] = customMaterial;
    }
  }, [customMaterial, materials, materialName]);

  return customMaterial;
}

// Material Wrapper Component
export function MaterialWrapper({ 
  children, 
  materialPath, 
  materialName, 
  materials, 
  fallbackColor = "#ff0000" 
}) {
  const customMaterial = useMaterialWrapper(materialPath, materialName, materials);

  // If no custom material, render with fallback color
  if (!customMaterial) {
    return React.cloneElement(children, { 
      'material-color': fallbackColor 
    });
  }

  // If custom material exists, render without color override
  return children;
}

// Common Material Names for Different Car Models
export const CAR_MATERIAL_NAMES = {
  MUSTANG: 'CARPAINT',
  BMW_M8: 'BMW_M8RewardRecycled_2020Paint_Material',
  PORSCHE: 'paint',
  AUDI_A8: 'a8texture12__prim_env_4_spec',
  BENZ: 'carpaint',
  BMW_E34: 'body_paint',
  CAMARO: 'Material.001',
  MCLAREN_720: 'Paint_Material',
  NISSAN: 'body',
  GENERIC: 'body',
  SIMPLE: 'body'
};

// Helper function to get material name for a car
export function getCarMaterialName(carName) {
  const nameMap = {
    'Mustang': CAR_MATERIAL_NAMES.MUSTANG,
    'BMW M8': CAR_MATERIAL_NAMES.BMW_M8,
    'Porsche': CAR_MATERIAL_NAMES.PORSCHE,
    'Audi A8': CAR_MATERIAL_NAMES.AUDI_A8,
    'Benz': CAR_MATERIAL_NAMES.BENZ,
    'BMW E34': CAR_MATERIAL_NAMES.BMW_E34,
    'Camaro': CAR_MATERIAL_NAMES.CAMARO,
    'McLaren 720': CAR_MATERIAL_NAMES.MCLAREN_720,
    'Nissan': CAR_MATERIAL_NAMES.NISSAN,
    'Generic Car': CAR_MATERIAL_NAMES.GENERIC,
    'Simple Car': CAR_MATERIAL_NAMES.SIMPLE
  };
  
  return nameMap[carName] || CAR_MATERIAL_NAMES.GENERIC;
}

export default MaterialWrapper;
