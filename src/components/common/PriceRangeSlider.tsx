import React, { useState, useEffect, useCallback } from 'react';

interface PriceRangeSliderProps {
  min: number;
  max: number;
  step?: number;
  initialMin?: number;
  initialMax?: number;
  onChange: (min: number, max: number) => void;
  currency?: string;
}

export const PriceRangeSlider: React.FC<PriceRangeSliderProps> = ({
  min,
  max,
  step = 1,
  initialMin = min,
  initialMax = max,
  onChange,
  currency = '₹'
}) => {
  const [minVal, setMinVal] = useState(initialMin);
  const [maxVal, setMaxVal] = useState(initialMax);
  const [isDragging, setIsDragging] = useState<'min' | 'max' | null>(null);

  const formatCurrency = (value: number) => {
    return `${currency}${value.toLocaleString()}`;
  };

  const getPercent = useCallback(
    (value: number) => Math.round(((value - min) / (max - min)) * 100),
    [min, max]
  );

  useEffect(() => {
    const minPercent = getPercent(minVal);
    const maxPercent = getPercent(maxVal);

    if (maxPercent - minPercent < 10) {
      if (isDragging === 'min') {
        setMaxVal(Math.min(max, minVal + (max - min) * 0.1));
      } else if (isDragging === 'max') {
        setMinVal(Math.max(min, maxVal - (max - min) * 0.1));
      }
    }
  }, [minVal, maxVal, isDragging, min, max, getPercent]);

  useEffect(() => {
    onChange(minVal, maxVal);
  }, [minVal, maxVal, onChange]);

  return (
    <div className="relative w-full py-4">
      <div className="flex justify-between mb-2">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {formatCurrency(minVal)}
        </span>
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {formatCurrency(maxVal)}
        </span>
      </div>

      <div className="relative h-2">
        {/* Background track */}
        <div className="absolute w-full h-1 bg-gray-200 dark:bg-gray-700 rounded-full" />

        {/* Selected range track */}
        <div
          className="absolute h-1 bg-primary-500 rounded-full transition-all duration-150"
          style={{
            left: `${getPercent(minVal)}%`,
            width: `${getPercent(maxVal) - getPercent(minVal)}%`
          }}
        />

        {/* Min handle */}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={minVal}
          onChange={(e) => {
            const value = Math.min(Number(e.target.value), maxVal - step);
            setMinVal(value);
          }}
          onMouseDown={() => setIsDragging('min')}
          onMouseUp={() => setIsDragging(null)}
          onTouchStart={() => setIsDragging('min')}
          onTouchEnd={() => setIsDragging(null)}
          className="absolute w-full h-1 -mt-1 bg-transparent appearance-none pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto
            [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full
            [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-primary-500
            [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:cursor-pointer
            [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:transition-all [&::-webkit-slider-thumb]:duration-150
            [&::-webkit-slider-thumb]:hover:scale-110
            [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full
            [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-primary-500
            [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:shadow-md
            [&::-moz-range-thumb]:transition-all [&::-moz-range-thumb]:duration-150
            [&::-moz-range-thumb]:hover:scale-110"
        />

        {/* Max handle */}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={maxVal}
          onChange={(e) => {
            const value = Math.max(Number(e.target.value), minVal + step);
            setMaxVal(value);
          }}
          onMouseDown={() => setIsDragging('max')}
          onMouseUp={() => setIsDragging(null)}
          onTouchStart={() => setIsDragging('max')}
          onTouchEnd={() => setIsDragging(null)}
          className="absolute w-full h-1 -mt-1 bg-transparent appearance-none pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto
            [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full
            [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-primary-500
            [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:cursor-pointer
            [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:transition-all [&::-webkit-slider-thumb]:duration-150
            [&::-webkit-slider-thumb]:hover:scale-110
            [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full
            [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-primary-500
            [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:shadow-md
            [&::-moz-range-thumb]:transition-all [&::-moz-range-thumb]:duration-150
            [&::-moz-range-thumb]:hover:scale-110"
        />
      </div>
    </div>
  );
};