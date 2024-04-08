import React, { type ChangeEvent, useState, useEffect } from 'react';
import Image from 'next/image';

// types import
import type { ICalculatorInput } from './CalculatorInput.types';

const CalculatorInput: React.FC<ICalculatorInput> = ({
  min,
  max,
  defaultValue,
  prefix,
  suffix,
  allowDecimal = true,
  allowedDecimal = 2,
  customValue,
  onChange,
}) => {
  const [inputVal, setInputVal] = useState(defaultValue ?? '0');
  const [isError, setIsError] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    let inputValue = e.target.value;

    // Allow empty input or input that represents a valid number with optional decimal
    if (allowDecimal) {
      if (new RegExp(`^\\d*\\.?\\d{0,${allowedDecimal}}$`).test(inputValue)) {
        if (Number(inputValue) > Number(max)) inputValue = max;
        setInputVal(inputValue);
        onChange?.(inputValue);
      }
    } else if (inputValue === '' || /^\d+$/.test(inputValue)) {
      if (Number(inputValue) > Number(max)) inputValue = max;
      setInputVal(inputValue);
      onChange?.(inputValue);
    }
  };

  useEffect(() => {
    if (Number(inputVal) < Number(min) || Number(inputVal) > Number(max)) {
      setIsError(true);
    } else {
      setIsError(false);
    }
  }, [inputVal, max, min]);

  useEffect(() => {
    if (customValue) setInputVal(customValue);
  }, [customValue]);

  return (
    <div className="flex gap-4 items-center">
      {/* Error component */}
      {isError && (
        <div className="relative">
          <Image
            src="/icons/stocks/error_info.svg"
            alt="error_info"
            width={20}
            height={20}
          />
          <div className="px-2 py-1 bg-[#ED5D7F] h-6 rounded-lg absolute min-w-max bottom-5 left-1/2 right-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <p className="font-bold text-white text-xs">
              {Number(inputVal) < Number(min)
                ? `Minimum allowed is ${min}`
                : `Maximum allowed is ${max}`}
            </p>
          </div>
        </div>
      )}
      {/* input component */}
      <div
        className={`lg:w-[120px] w-[96px] h-8 bg-[#323542] rounded-lg py-2 pr-3 pl-[6px] flex items-center ${
          prefix ? 'justify-between' : 'justify-end'
        } ${isError ? 'border border-[#ED5D7F]' : ''}`}
      >
        {/* Prefix */}
        {prefix && (
          <p className="text-[#A4A5AB] lg:text-sm text-xs font-bold">
            {prefix}
          </p>
        )}
        <div className="flex items-center">
          <input
            type="text"
            value={inputVal}
            className={`lg:w-[90px] w-[70px] outline-none bg-transparent text-right ${
              isError ? 'text-[#ED5D7F]' : 'text-white'
            } text-white font-bold lg:text-sm text-xs`}
            onChange={handleChange}
            placeholder="0"
          />
          {/* Suffix */}
          {suffix && (
            <p className="text-[#A4A5AB] lg:text-sm text-xs font-bold ml-1">
              {suffix}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CalculatorInput;
