"use client"

import { useState } from 'react'

export default function ARInstructions({ onClose }) {
  const [currentStep, setCurrentStep] = useState(0)

  const steps = [
    {
      title: "Welcome to AR Car Viewer!",
      content: "Experience cars and tracks in augmented reality. This app lets you place 3D models of cars and race tracks in your real environment.",
      icon: "🚗"
    },
    {
      title: "Getting Started",
      content: "1. Make sure you're on a mobile device\n2. Allow camera permissions when prompted\n3. Point your camera at a flat surface like a table or floor",
      icon: "📱"
    },
    {
      title: "Placing Models",
      content: "1. Use the tabs to switch between Cars and Tracks\n2. Select your desired model from the bottom selector\n3. Tap the AR button to start AR mode\n4. Point at a surface and tap to place your model",
      icon: "🎯"
    },
    {
      title: "Managing Models",
      content: "• Tap the red sphere above any model to remove it\n• Use the red box to clear all placed models\n• Models can be placed anywhere on detected surfaces\n• Each model gets a random rotation for variety",
      icon: "⚙️"
    },
    {
      title: "Available Models",
      content: "Cars: Mustang, BMW M8, Porsche, Audi A8, Benz, BMW E34, Camaro, McLaren 720, Nissan, Generic Car, Simple Car\n\nTracks: Race Track",
      icon: "🏁"
    },
    {
      title: "Tips for Best Experience",
      content: "• Use good lighting for better surface detection\n• Keep your device steady when placing models\n• Try different surfaces - tables, floors, countertops\n• Models scale automatically for your environment",
      icon: "💡"
    }
  ]

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 rounded-lg max-w-md w-full max-h-[80vh] overflow-hidden">
        {/* Header */}
        <div className="bg-blue-600 p-4 text-white">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">AR Instructions</h2>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-200 text-2xl font-bold"
            >
              ×
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 text-white">
          <div className="text-center mb-6">
            <div className="text-4xl mb-2">{steps[currentStep].icon}</div>
            <h3 className="text-lg font-bold mb-2">{steps[currentStep].title}</h3>
            <p className="text-gray-300 text-sm whitespace-pre-line">{steps[currentStep].content}</p>
          </div>

          {/* Progress indicator */}
          <div className="flex justify-center mb-4">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full mx-1 ${
                  index === currentStep ? 'bg-blue-500' : 'bg-gray-600'
                }`}
              />
            ))}
          </div>

          {/* Navigation buttons */}
          <div className="flex justify-between">
            <button
              onClick={prevStep}
              disabled={currentStep === 0}
              className={`px-4 py-2 rounded-lg transition-colors ${
                currentStep === 0
                  ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                  : 'bg-gray-700 text-white hover:bg-gray-600'
              }`}
            >
              Previous
            </button>
            
            {currentStep === steps.length - 1 ? (
              <button
                onClick={onClose}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Get Started!
              </button>
            ) : (
              <button
                onClick={nextStep}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Next
              </button>
            )}
          </div>
        </div>

        {/* Skip button */}
        <div className="p-4 text-center">
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white text-sm transition-colors"
          >
            Skip tutorial
          </button>
        </div>
      </div>
    </div>
  )
}
