"use client"

import React from 'react';

const CarThumbnail = ({ car, isSelected, onSelect }) => {
  const getCarImage = (carName) => {
    const imageMap = {
      'Mustang': '/material1.png',
      'BMW M8': '/material2.jpg',
      'Porsche': '/material3.jpg',
      'Audi A8': '/galaxyMaterial.png',
      'Benz': '/material4.jpg',
      'BMW E34': '/material5.jpg',
      'Camaro': '/material6.jpg',
      'McLaren 720': '/material7.webp',
      'Nissan': '/material8.webp',
      'Generic Car': '/material1.png',
      'Simple Car': '/material2.jpg'
    };
    return imageMap[carName] || '/material1.png';
  };

  const getCarColor = (carName) => {
    const colorMap = {
      'Mustang': '#ff0000',
      'BMW M8': '#0066cc',
      'Porsche': '#ffff00',
      'Audi A8': '#c0c0c0',
      'Benz': '#000000',
      'BMW E34': '#ffffff',
      'Camaro': '#ff6600',
      'McLaren 720': '#ff0000',
      'Nissan': '#0066cc',
      'Generic Car': '#00ff00',
      'Simple Car': '#800080'
    };
    return colorMap[carName] || '#ff0000';
  };

  return (
    <div
      onClick={() => onSelect && onSelect(car)}
      className={`
        bg-white rounded-lg p-2 md:p-3 cursor-pointer transition-all duration-200
        ${isSelected ? 'ring-2 ring-blue-500 shadow-lg' : 'hover:shadow-md'}
      `}
    >
      <div className="flex flex-col items-center space-y-1 md:space-y-2">
        <img
          src={getCarImage(car.name)}
          alt={car.name}
          className="w-8 h-8 md:w-12 md:h-12 rounded-full object-cover"
        />
        <p className="text-xs md:text-sm font-semibold text-gray-800 text-center leading-tight">
          {car.name}
        </p>
        <div
          className="w-3 h-3 md:w-4 md:h-4 rounded-full border border-gray-300"
          style={{ backgroundColor: getCarColor(car.name) }}
        />
      </div>
    </div>
  );
};

export default CarThumbnail;
