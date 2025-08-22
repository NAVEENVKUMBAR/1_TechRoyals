"use client"

import { useState } from 'react'
import Model from './Mustang'
import BmwM8 from './BmwM8'
import Porsche from './Porsche'
import AudiA8 from './AudiA8'
import Benz1 from './Benz1'
import BmwE34 from './BmwE34'
import Camaro from './Camaro'
import Mclaren720 from './Mclaren720'
import Nissan from './Nissan'
import { Car } from './Car'
import SimpleCar from './SimpleCar'
import { Track } from './Track'
import CarThumbnail from './CarThumbnail'

const carModels = [
  { name: 'Mustang', component: Model, color: 'red', type: 'car' },
  { name: 'BMW M8', component: BmwM8, color: 'blue', type: 'car' },
  { name: 'Porsche', component: Porsche, color: 'yellow', type: 'car' },
  { name: 'Audi A8', component: AudiA8, color: 'silver', type: 'car' },
  { name: 'Benz', component: Benz1, color: 'black', type: 'car' },
  { name: 'BMW E34', component: BmwE34, color: 'white', type: 'car' },
  { name: 'Camaro', component: Camaro, color: 'orange', type: 'car' },
  { name: 'McLaren 720', component: Mclaren720, color: 'red', type: 'car' },
  { name: 'Nissan', component: Nissan, color: 'blue', type: 'car' },
  { name: 'Generic Car', component: Car, color: 'green', type: 'car' },
  { name: 'Simple Car', component: SimpleCar, color: 'purple', type: 'car' },
  { name: 'Race Track', component: Track, color: 'gray', type: 'track' }
]

export default function ARCarSelector({ onCarSelect, selectedCar }) {
  const [activeTab, setActiveTab] = useState('cars')

  const cars = carModels.filter(item => item.type === 'car')
  const tracks = carModels.filter(item => item.type === 'track')

  return (
    <div className="fixed bottom-4 left-4 right-4 z-20">
      <div className="bg-black bg-opacity-75 rounded-lg p-4">
        {/* Tab Navigation */}
        <div className="flex gap-2 mb-3">
          <button
            onClick={() => setActiveTab('cars')}
            className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
              activeTab === 'cars'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            Cars ({cars.length})
          </button>
          <button
            onClick={() => setActiveTab('tracks')}
            className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
              activeTab === 'tracks'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            Tracks ({tracks.length})
          </button>
        </div>

        {/* Car Models with Thumbnails */}
        {activeTab === 'cars' && (
          <>
            <h3 className="text-white text-lg font-bold mb-3">Select Car Model</h3>
            <div className="grid grid-cols-4 gap-3 max-h-48 overflow-y-auto">
              {cars.map((car) => (
                <CarThumbnail
                  key={car.name}
                  carModel={car}
                  isSelected={selectedCar?.name === car.name}
                  onClick={() => onCarSelect(car)}
                />
              ))}
            </div>
          </>
        )}

        {/* Track Models with Thumbnails */}
        {activeTab === 'tracks' && (
          <>
            <h3 className="text-white text-lg font-bold mb-3">Select Track</h3>
            <div className="grid grid-cols-4 gap-3 max-h-48 overflow-y-auto">
              {tracks.map((track) => (
                <CarThumbnail
                  key={track.name}
                  carModel={track}
                  isSelected={selectedCar?.name === track.name}
                  onClick={() => onCarSelect(track)}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}