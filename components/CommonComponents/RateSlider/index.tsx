import React, { useEffect, useState } from 'react';

// css imports
import styles from './rate-slider.module.scss';

// types import
import type { ISliderInput } from './RateSlider.types';

const SliderInput: React.FC<ISliderInput> = ({
  onChange,
  min,
  max,
  step,
  showMiddleLabel,
  defaultValue,
  customValue,
  middleLabel,
  maxLabel,
  minLabel,
}) => {
  const [inputValue, setInputValue] = useState(defaultValue ?? '0');

  useEffect(() => {
    if (customValue && !/^\d+\.$/.test(customValue)) {
      setInputValue(customValue);
    }
  }, [customValue]);

  return (
    <div className="relative w-full">
      {/* Slider */}
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={inputValue}
        onChange={e => {
          onChange?.(e.target.value);
          setInputValue(e.target.value);
        }}
        className={styles.slider}
        style={{
          backgroundSize: `${
            ((+inputValue - +min) * 100) / (+max - +min) < 0
              ? 0
              : ((+inputValue - +min) * 100) / (+max - +min)
          }% 100%`,
        }}
      />
      {/* Left Label */}
      <p className="text-[#494B57] lg:text-xs text-[10px] font-bold absolute left-1 top-6 z-[1]">
        {minLabel}
      </p>
      {/* Middle Label */}
      {showMiddleLabel && (
        <p
          className="text-[#494B57] lg:text-xs text-[10px] font-bold absolute top-4 z-[1] left-1/2 right-1/2"
          style={{
            transform: 'translateX(-10px) translateY(10px)',
          }}
        >
          {middleLabel}
        </p>
      )}
      {/* RightLabel */}
      <p className="text-[#494B57] lg:text-xs text-[10px] font-bold absolute right-1 top-6 z-[1]">
        {maxLabel}
      </p>
    </div>
  );
};

export default SliderInput;
