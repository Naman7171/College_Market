import React, { useState, useEffect } from 'react';

interface PriceRangeFilterProps {
  min: number;
  max: number;
  initialMin?: number;
  initialMax?: number;
  onChange: (min: number, max: number) => void;
}

export const PriceRangeFilter: React.FC<PriceRangeFilterProps> = ({
  min,
  max,
  initialMin = min,
  initialMax = max,
  onChange,
}) => {
  const [minVal, setMinVal] = useState(initialMin);
  const [maxVal, setMaxVal] = useState(initialMax);

    useEffect(() => {
      setMinVal(initialMin);
  }, [initialMin]);

  useEffect(() => {
      setMaxVal(initialMax);
  }, [initialMax]);

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(Number(e.target.value), maxVal - 1);
    setMinVal(value);
    e.target.value = value.toString(); // Ensure the input reflects the constrained value
    onChange(value, maxVal);
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(Number(e.target.value), minVal + 1);
    setMaxVal(value);
    e.target.value = value.toString();
    onChange(minVal, value);
  };

  // Function to convert price to slider position (percentage)
  const getPercent = (value: number) => {
    return ((value - min) / (max - min)) * 100;
  };

  return (
    <div className="w-full max-w-md p-4">
      <h3 className="text-lg font-semibold mb-4">Price Range</h3>

      <div className="relative">
        {/* Background track */}
        <div className="absolute h-1 bg-gray-200 dark:bg-gray-700 rounded-full w-full" style={{
          top: '50%',
          transform: 'translateY(-50%)'
        }}></div>

        {/* Progress track */}
        <div
          className="absolute h-1 bg-primary-500 rounded-full"
          style={{
            left: `${getPercent(minVal)}%`,
            width: `${getPercent(maxVal) - getPercent(minVal)}%`,
            top: '50%',
            transform: 'translateY(-50%)'
          }}
        ></div>

        {/* Sliders */}
        <input
          type="range"
          min={min}
          max={max}
          value={minVal}
          onChange={handleMinChange}
          className="absolute pointer-events-none appearance-none z-20 h-1 w-full opacity-0"
          style={{
            top: '50%',
            transform: 'translateY(-50%)'
          }}
        />
        <input
          type="range"
          min={min}
          max={max}
          value={maxVal}
          onChange={handleMaxChange}
          className="absolute pointer-events-none appearance-none z-20 h-1 w-full opacity-0"
          style={{
            top: '50%',
            transform: 'translateY(-50%)'
          }}
        />
          {/* Display Min and Max Values */}
        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mt-1">
          <span>₹{minVal}</span>
          <span>₹{maxVal}</span>
        </div>
      </div>
    </div>
  );
};
