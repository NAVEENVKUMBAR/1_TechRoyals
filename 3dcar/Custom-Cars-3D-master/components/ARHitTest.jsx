"use client"

import { useEffect, useRef } from 'react'
import { useXR } from '@react-three/xr'
import { useThree } from '@react-three/fiber'

export default function ARHitTest({ onHitTest }) {
  const { session } = useXR()
  const { gl } = useThree()
  const hitTestSourceRef = useRef()

  useEffect(() => {
    if (!session) return

    const setupHitTest = async () => {
      const referenceSpace = await session.requestReferenceSpace('viewer')
      hitTestSourceRef.current = await session.requestHitTestSource({ space: referenceSpace })
    }

    setupHitTest()

    return () => {
      if (hitTestSourceRef.current) {
        hitTestSourceRef.current.cancel()
      }
    }
  }, [session])

  return null
}