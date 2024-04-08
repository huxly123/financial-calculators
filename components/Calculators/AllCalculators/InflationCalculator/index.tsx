import React, { useEffect, useState } from 'react';
import CalculatorHOC from '../../CalculatorHOC';
import InputSlider from '../../components/InputSlider';
import CalculatorOutputDetails from '../../components/CalculatorOutputDetails';
import { currencyRepresentation } from '../../../../utils/formatter.helper';

const initalCalculatorInput = {
  currentCost: '1000',
  rateOfInterest: '6',
  timePeriod: '1',
};

const InflationCalculator: React.FC = () => {
  const [calculatorInput, setCalculatorInput] = useState(initalCalculatorInput);
  const [calculatorOutput, setCalculatorOutput] = useState({
    currentCost: '',
    costIncrease: '',
    futureCost: '',
  });

  const handleInputChange = (val: string, type: string): void => {
    if (type === 'current_cost') {
      setCalculatorInput(prev => ({
        ...prev,
        currentCost: val,
      }));
    } else if (type === 'rate_of_interest') {
      setCalculatorInput(prev => ({
        ...prev,
        rateOfInterest: val,
      }));
    } else if (type === 'time_period') {
      setCalculatorInput(prev => ({
        ...prev,
        timePeriod: val,
      }));
    }
  };

  useEffect(() => {
    const currentCost = Number(calculatorInput.currentCost);
    const rateOfInterest = Number(calculatorInput.rateOfInterest);
    const timePeriod = Number(calculatorInput.timePeriod);
    if (currentCost >= 1000 && rateOfInterest >= 1 && timePeriod >= 1) {
      const costIncrease =
        currentCost * (1 + rateOfInterest / 100) ** timePeriod - currentCost;
      const futureCost = costIncrease + currentCost;
      setCalculatorOutput({
        currentCost: currentCost.toFixed(0),
        costIncrease: costIncrease.toFixed(0),
        futureCost: futureCost.toFixed(0),
      });
    }
  }, [calculatorInput]);

  return (
    <CalculatorHOC>
      <div>
        {/* Current Cost */}
        <InputSlider
          title="Current Cost"
          defaultValue={initalCalculatorInput.currentCost}
          min="1000"
          max="10000000"
          inputSliderProps={{
            step: '1000',
            minLabel: '1K',
            maxLabel: '1Cr',
          }}
          caculatorInputProps={{
            allowDecimal: false,
            prefix: '₹',
          }}
          onChange={val => {
            handleInputChange(val, 'current_cost');
          }}
        />
        {/* Rate of Inflation (p.a) */}
        <InputSlider
          title="Rate of Inflation (p.a)"
          defaultValue={initalCalculatorInput.rateOfInterest}
          min="1"
          max="10"
          inputSliderProps={{
            step: '1',
            minLabel: '1%',
            maxLabel: '10%',
          }}
          caculatorInputProps={{
            allowDecimal: true,
            suffix: '%',
          }}
          className="mt-10"
          onChange={val => {
            handleInputChange(val, 'rate_of_interest');
          }}
        />
        {/* Time Period */}
        <InputSlider
          title="Time Period"
          defaultValue={initalCalculatorInput.timePeriod}
          min="1"
          max="30"
          inputSliderProps={{
            step: '1',
            minLabel: '1Y',
            maxLabel: '30Y',
          }}
          caculatorInputProps={{
            allowDecimal: false,
            suffix: 'Yr',
          }}
          className="mt-10"
          onChange={val => {
            handleInputChange(val, 'time_period');
          }}
        />
      </div>
      <CalculatorOutputDetails
        calculatorTextProps={[
          {
            leftTextProps: {
              label: 'Current Cost',
              color: 'text-[#A4A5AB]',
              fontSize: 'lg:text-base text-sm',
              weight: 'font-bold',
            },
            rightTextProps: {
              label: currencyRepresentation(calculatorOutput.currentCost),
              color: 'text-white',
              fontSize: 'lg:text-base text-sm',
              weight: 'font-bold',
            },
          },
          {
            leftTextProps: {
              label: 'Cost Increase',
              color: 'text-[#A4A5AB]',
              fontSize: 'lg:text-base text-sm',
              weight: 'font-bold',
            },
            rightTextProps: {
              label: currencyRepresentation(calculatorOutput.costIncrease),
              color: 'text-white',
              fontSize: 'lg:text-base text-sm',
              weight: 'font-bold',
            },
          },
          {
            leftTextProps: {
              label: 'Future Cost',
              color: 'text-white',
              fontSize: 'lg:text-2xl text-lg',
              weight: 'lg:font-extrabold font-bold',
            },
            rightTextProps: {
              label: currencyRepresentation(calculatorOutput.futureCost),
              color: 'text-white',
              fontSize: 'lg:text-2xl text-lg',
              weight: 'lg:font-extrabold font-bold',
            },
          },
        ]}
        progressBarProps={{
          leftLabel: 'Current Cost',
          rightLabel: 'Total Inflation',
          leftValue: Number(calculatorOutput.currentCost),
          rightValue: Number(calculatorOutput.costIncrease),
        }}
      />
    </CalculatorHOC>
  );
};

export default InflationCalculator;
