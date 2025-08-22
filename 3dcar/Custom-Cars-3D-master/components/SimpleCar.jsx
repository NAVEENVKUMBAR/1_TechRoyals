"use client"

import React from 'react'
import { useGLTF } from '@react-three/drei'

function SimpleCar(props) {
  try {
    const { nodes, materials } = useGLTF('/mustang.gltf')
    
    return (
      <group {...props} dispose={null}>
        <mesh 
          geometry={nodes.Object_33?.geometry} 
          material={materials.CARPAINT}
          material-color={props.customColors?.body || "red"}
        />
        <mesh 
          geometry={nodes.Object_34?.geometry} 
          material={materials.CARPAINT}
          material-color={props.customColors?.body || "red"}
        />
        {/* Add more mesh elements if they exist in the model */}
        {nodes.Object_35 && (
          <mesh 
            geometry={nodes.Object_35.geometry} 
            material={materials.CARPAINT}
            material-color={props.customColors?.body || "red"}
          />
        )}
        {nodes.Object_36 && (
          <mesh 
            geometry={nodes.Object_36.geometry} 
            material={materials.CARPAINT}
            material-color={props.customColors?.body || "red"}
          />
        )}
      </group>
    )
  } catch (error) {
    console.error('Error loading car model:', error)
    // Fallback to a simple car shape if GLTF fails
    return (
      <group {...props}>
        {/* Car body */}
        <mesh position={[0, 0.25, 0]}>
          <boxGeometry args={[1, 0.5, 2]} />
          <meshStandardMaterial color={props.customColors?.body || "red"} />
        </mesh>
        {/* Car roof */}
        <mesh position={[0, 0.75, -0.2]}>
          <boxGeometry args={[0.8, 0.5, 1.2]} />
          <meshStandardMaterial color={props.customColors?.body || "red"} />
        </mesh>
        {/* Wheels */}
        <mesh position={[-0.6, 0.1, 0.6]}>
          <cylinderGeometry args={[0.2, 0.2, 0.1, 16]} />
          <meshStandardMaterial color={props.customColors?.rimsColor || "black"} />
        </mesh>
        <mesh position={[0.6, 0.1, 0.6]}>
          <cylinderGeometry args={[0.2, 0.2, 0.1, 16]} />
          <meshStandardMaterial color={props.customColors?.rimsColor || "black"} />
        </mesh>
        <mesh position={[-0.6, 0.1, -0.6]}>
          <cylinderGeometry args={[0.2, 0.2, 0.1, 16]} />
          <meshStandardMaterial color={props.customColors?.rimsColor || "black"} />
        </mesh>
        <mesh position={[0.6, 0.1, -0.6]}>
          <cylinderGeometry args={[0.2, 0.2, 0.1, 16]} />
          <meshStandardMaterial color={props.customColors?.rimsColor || "black"} />
        </mesh>
      </group>
    )
  }
}

useGLTF.preload('/mustang.gltf')
export default SimpleCar

