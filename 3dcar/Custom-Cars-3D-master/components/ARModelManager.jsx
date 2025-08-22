"use client"

import { useState } from 'react'

export default function ARModelManager({ cars, tracks, onClearAll, onRemoveCar, onRemoveTrack }) {
  const [isExpanded, setIsExpanded] = useState(false)

  const totalModels = cars.length + tracks.length

  if (totalModels === 0) return null

  return (
    <div className="fixed top-24 right-4 z-30">
      {/* Compact view */}
      {!isExpanded && (
        <button
          onClick={() => setIsExpanded(true)}
          className="bg-black bg-opacity-75 rounded-lg p-3 text-white hover:bg-opacity-90 transition-all"
        >
          <div className="text-center">
            <div className="text-2xl">🚗</div>
            <div className="text-xs opacity-75">{totalModels} models</div>
          </div>
        </button>
      )}

      {/* Expanded view */}
      {isExpanded && (
        <div className="bg-black bg-opacity-75 rounded-lg p-4 text-white min-w-[200px]">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold">Model Manager</h3>
            <button
              onClick={() => setIsExpanded(false)}
              className="text-gray-400 hover:text-white text-lg"
            >
              ×
            </button>
          </div>

          {/* Cars section */}
          {cars.length > 0 && (
            <div className="mb-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-blue-400 font-medium">Cars ({cars.length})</span>
                <button
                  onClick={() => cars.forEach(car => onRemoveCar(car.id))}
                  className="text-xs text-red-400 hover:text-red-300"
                >
                  Clear All
                </button>
              </div>
              <div className="space-y-1 max-h-20 overflow-y-auto">
                {cars.map(car => (
                  <div key={car.id} className="flex items-center justify-between text-xs">
                    <span className="truncate">{car.model.name}</span>
                    <button
                      onClick={() => onRemoveCar(car.id)}
                      className="text-red-400 hover:text-red-300 ml-2"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tracks section */}
          {tracks.length > 0 && (
            <div className="mb-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-green-400 font-medium">Tracks ({tracks.length})</span>
                <button
                  onClick={() => tracks.forEach(track => onRemoveTrack(track.id))}
                  className="text-xs text-red-400 hover:text-red-300"
                >
                  Clear All
                </button>
              </div>
              <div className="space-y-1 max-h-20 overflow-y-auto">
                {tracks.map(track => (
                  <div key={track.id} className="flex items-center justify-between text-xs">
                    <span className="truncate">{track.model.name}</span>
                    <button
                      onClick={() => onRemoveTrack(track.id)}
                      className="text-red-400 hover:text-red-300 ml-2"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="pt-2 border-t border-gray-700">
            <button
              onClick={onClearAll}
              className="w-full bg-red-600 hover:bg-red-700 text-white text-xs py-2 rounded transition-colors"
            >
              Clear All Models
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
