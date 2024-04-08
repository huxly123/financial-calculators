import React from 'react';
import ProgressBar from '../ProgressBar';

// types import
import type { ICalculatorOutputDetails } from './CalculatorOutput.types';

const CalculatorOutputDetails: React.FC<ICalculatorOutputDetails> = ({
  calculatorTextProps,
  progressBarProps,
}) => (
  <div className="w-full">
    <div className="lg:mb-12">
      {calculatorTextProps.map(ele => (
        <div
          className="flex items-center justify-between mt-4"
          key={ele.leftTextProps.label}
        >
          <p
            className={`${ele.leftTextProps.color} ${ele.leftTextProps.fontSize} ${ele.leftTextProps.weight} mr-4`}
          >
            {ele.leftTextProps.label}
          </p>
          <p
            className={`${ele.rightTextProps.color} ${ele.rightTextProps.fontSize} ${ele.rightTextProps.weight}`}
          >
            {ele.rightTextProps.label}
          </p>
        </div>
      ))}
    </div>
    {progressBarProps && (
      <div className="mt-10">
        <ProgressBar
          leftLabel={progressBarProps.leftLabel}
          rightLabel={progressBarProps.rightLabel}
          leftValue={progressBarProps.leftValue}
          rightValue={progressBarProps.rightValue}
        />
      </div>
    )}
  </div>
);

export default CalculatorOutputDetails;
