import React, { useState } from 'react';

// custom components
import CalculatorInput from '../CalculatorInput';
import SliderInput from '../../../CommonComponents/RateSlider';
import RadioGroup from '../../../CommonComponents/RadioGroup';

// type import
import type { IInputSlider } from './InputSlider.types';

const InputSlider: React.FC<IInputSlider> = ({
  title,
  caculatorInputProps,
  inputSliderProps,
  max,
  min,
  defaultValue,
  onChange,
  radioData,
  className,
}) => {
  const [inputValue, setInputValue] = useState(defaultValue);

  const handleCalculatorInputChange = (value: string): void => {
    setInputValue(value);
    onChange?.(value);
  };

  const handleSliderInputChange = (value: string): void => {
    setInputValue(value);
    onChange?.(value);
  };

  return (
    <div className={className}>
      <div className="flex justify-between items-center max-lg:items-start mb-2">
        <div className="flex lg:items-center lg:gap-10 gap-3 max-lg:flex-col">
          <p className="text-white lg:text-base text-sm font-bold">{title}</p>
          {radioData && (
            <RadioGroup
              data={radioData.data}
              defaultValue={radioData?.defaultValue}
              onChange={radioData?.onChange}
            />
          )}
        </div>
        <CalculatorInput
          min={min}
          max={max}
          suffix={caculatorInputProps.suffix}
          prefix={caculatorInputProps.prefix}
          allowDecimal={caculatorInputProps.allowDecimal}
          defaultValue={defaultValue}
          customValue={inputValue}
          onChange={e => handleCalculatorInputChange(e)}
          allowedDecimal={caculatorInputProps.allowedDecimal}
        />
      </div>
      <SliderInput
        min={min}
        max={max}
        step={inputSliderProps.step}
        onChange={e => handleSliderInputChange(e)}
        minLabel={inputSliderProps.minLabel}
        maxLabel={inputSliderProps.maxLabel}
        middleLabel={inputSliderProps.middleLabel}
        showMiddleLabel={inputSliderProps.showMiddleLabel}
        defaultValue={defaultValue}
        customValue={inputValue}
      />
    </div>
  );
};

export default InputSlider;
