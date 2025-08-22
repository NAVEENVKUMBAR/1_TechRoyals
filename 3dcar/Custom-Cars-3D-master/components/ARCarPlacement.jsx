"use client"

import { useRef, useState, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { useXR } from '@react-three/xr'
import { Interactive } from '@react-three/xr'
import ARModelManager from './ARModelManager'

export default function ARCarPlacement({ selectedCar }) {
  const [cars, setCars] = useState([])
  const [tracks, setTracks] = useState([])
  const [reticlePosition, setReticlePosition] = useState([0, 0, -1])
  const [reticleVisible, setReticleVisible] = useState(false)
  const { session } = useXR()
  const { gl, camera } = useThree()
  const hitTestSourceRef = useRef()
  const hitTestSourceRequestedRef = useRef(false)

  useEffect(() => {
    if (!session) return

    const sessionInit = async () => {
      const viewerSpace = await session.requestReferenceSpace('viewer')
      const hitTestSource = await session.requestHitTestSource({ space: viewerSpace })
      hitTestSourceRef.current = hitTestSource
      hitTestSourceRequestedRef.current = true
    }

    sessionInit()

    return () => {
      if (hitTestSourceRef.current) {
        hitTestSourceRef.current.cancel()
      }
    }
  }, [session])

  useFrame(() => {
    if (!session || !hitTestSourceRef.current) return

    const frame = gl.xr.getFrame()
    if (frame) {
      const hitTestResults = frame.getHitTestResults(hitTestSourceRef.current)
      if (hitTestResults.length > 0) {
        const hit = hitTestResults[0]
        const pose = hit.getPose(session.referenceSpace)
        if (pose) {
          setReticlePosition([
            pose.transform.position.x,
            pose.transform.position.y,
            pose.transform.position.z
          ])
          setReticleVisible(true)
        }
      } else {
        setReticleVisible(false)
      }
    }
  })

  const placeModel = () => {
    if (!reticleVisible) return
    
    const newItem = {
      id: Date.now(),
      position: [...reticlePosition],
      model: selectedCar,
      rotation: [0, Math.random() * Math.PI * 2, 0] // Random rotation around Y axis
    }

    if (selectedCar.type === 'track') {
      setTracks(prev => [...prev, newItem])
    } else {
      setCars(prev => [...prev, newItem])
    }
  }

  const removeCar = (carId) => {
    setCars(prev => prev.filter(car => car.id !== carId))
  }

  const removeTrack = (trackId) => {
    setTracks(prev => prev.filter(track => track.id !== trackId))
  }

  const clearAllModels = () => {
    setCars([])
    setTracks([])
  }

  const getModelScale = (modelType) => {
    if (modelType === 'track') {
      return [0.5, 0.5, 0.5] // Larger scale for tracks
    }
    return [0.3, 0.3, 0.3] // Standard scale for cars
  }

  const getModelPosition = (position, modelType) => {
    if (modelType === 'track') {
      // Place tracks slightly below surface for better grounding
      return [position[0], position[1] - 0.1, position[2]]
    }
    return position
  }

  return (
    <>
      {/* Model Manager UI */}
      <ARModelManager
        cars={cars}
        tracks={tracks}
        onClearAll={clearAllModels}
        onRemoveCar={removeCar}
        onRemoveTrack={removeTrack}
      />

      <group>
        {/* Placed cars */}
        {cars.map(car => {
          const CarModel = car.model?.component
          if (!CarModel) return null
          
          return (
            <group key={car.id} position={car.position} rotation={car.rotation}>
              <CarModel
                scale={getModelScale('car')}
                customColors={{
                  body: car.model?.color || "red",
                  accesoriesColor: "silver",
                  rimsColor: "black",
                }}
                material="null"
              />
              {/* Remove button for each car */}
              <Interactive onSelect={() => removeCar(car.id)}>
                <mesh position={[0, 1, 0]}>
                  <sphereGeometry args={[0.1, 16, 16]} />
                  <meshBasicMaterial color="red" />
                </mesh>
              </Interactive>
            </group>
          )
        })}

        {/* Placed tracks */}
        {tracks.map(track => {
          const TrackModel = track.model?.component
          if (!TrackModel) return null
          
          return (
            <group key={track.id} position={getModelPosition(track.position, 'track')} rotation={track.rotation}>
              <TrackModel />
              {/* Remove button for each track */}
              <Interactive onSelect={() => removeTrack(track.id)}>
                <mesh position={[0, 1.5, 0]}>
                  <sphereGeometry args={[0.15, 16, 16]} />
                  <meshBasicMaterial color="red" />
                </mesh>
              </Interactive>
            </group>
          )
        })}
        
        {/* Reticle for placement */}
        {reticleVisible && (
          <Interactive onSelect={placeModel}>
            <group position={reticlePosition}>
              {/* Main reticle ring */}
              <mesh rotation={[-Math.PI / 2, 0, 0]}>
                <ringGeometry args={[0.1, 0.15, 32]} />
                <meshBasicMaterial color="white" transparent opacity={0.8} />
              </mesh>
              {/* Center dot */}
              <mesh position={[0, 0.001, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <circleGeometry args={[0.02, 32]} />
                <meshBasicMaterial color="white" />
              </mesh>
              {/* Instructions text */}
              <mesh position={[0, 0.1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <planeGeometry args={[0.4, 0.1]} />
                <meshBasicMaterial color="black" transparent opacity={0.7} />
              </mesh>
            </group>
          </Interactive>
        )}

        {/* Clear all models button */}
        {(cars.length > 0 || tracks.length > 0) && (
          <Interactive onSelect={clearAllModels}>
            <mesh position={[0, 0, -2]}>
              <boxGeometry args={[0.3, 0.1, 0.1]} />
              <meshBasicMaterial color="red" />
            </mesh>
          </Interactive>
        )}
      </group>
    </>
  )
}