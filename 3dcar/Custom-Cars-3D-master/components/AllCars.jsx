"use client"
import React from 'react';
import CarThumbnail from './CarThumbnail';

const AllCars = ({ selectedCar, onCarSelect }) => {
  const carModels = [
    { name: 'Mustang', type: 'car', color: 'red' },
    { name: 'BMW M8', type: 'car', color: 'blue' },
    { name: 'Porsche', type: 'car', color: 'yellow' },
    { name: 'Audi A8', type: 'car', color: 'silver' },
    { name: 'Benz', type: 'car', color: 'black' },
    { name: 'BMW E34', type: 'car', color: 'white' },
    { name: 'Camaro', type: 'car', color: 'orange' },
    { name: 'McLaren 720', type: 'car', color: 'red' },
    { name: 'Nissan', type: 'car', color: 'blue' },
    { name: 'Generic Car', type: 'car', color: 'green' },
    { name: 'Simple Car', type: 'car', color: 'purple' }
  ];

  return (
    <div className="p-2 md:p-4">
      <h2 className="text-white text-lg md:text-xl font-bold mb-3 md:mb-4 text-center">
        Car Collection
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-2 gap-2 md:gap-3">
        {carModels.map((car) => (
          <CarThumbnail
            key={car.name}
            car={car}
            isSelected={selectedCar?.name === car.name}
            onSelect={onCarSelect}
          />
        ))}
      </div>
    </div>
  );
};

export default AllCars;