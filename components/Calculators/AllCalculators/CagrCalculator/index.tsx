import React, { useEffect, useState } from 'react';
import CalculatorHOC from '../../CalculatorHOC';
import InputSlider from '../../components/InputSlider';
import CalculatorOutputDetails from '../../components/CalculatorOutputDetails';

const initalCalculatorInput = {
  initialInvestment: '1000',
  finalInvestment: '10000',
  investmentDuration: '1',
};

const CAGRCalculator: React.FC = () => {
  const [calculatorInput, setCalculatorInput] = useState(initalCalculatorInput);
  const [calculatorOutput, setCalculatorOutput] = useState({
    cagr: '',
  });

  const handleInputChange = (val: string, type: string): void => {
    if (type === 'initial_investment') {
      setCalculatorInput(prev => ({
        ...prev,
        initialInvestment: val,
      }));
    } else if (type === 'final_investment') {
      setCalculatorInput(prev => ({
        ...prev,
        finalInvestment: val,
      }));
    } else if (type === 'investment_duration') {
      setCalculatorInput(prev => ({
        ...prev,
        investmentDuration: val,
      }));
    }
  };

  useEffect(() => {
    const initialInvestment = Number(calculatorInput.initialInvestment);
    const finalInvestment = Number(calculatorInput.finalInvestment);
    const investmentDuration = Number(calculatorInput.investmentDuration);
    if (
      initialInvestment >= 1000 &&
      finalInvestment >= 1000 &&
      investmentDuration >= 1
    ) {
      const cagr =
        ((finalInvestment / initialInvestment) ** (1 / investmentDuration) -
          1) *
        100;
      setCalculatorOutput({
        cagr: cagr.toFixed(2),
      });
    }
  }, [calculatorInput]);

  return (
    <CalculatorHOC>
      <div>
        {/* Initial Investment */}
        <InputSlider
          title="Initial Investment"
          defaultValue={initalCalculatorInput.initialInvestment}
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
            handleInputChange(val, 'initial_investment');
          }}
        />
        {/* Final Investment */}
        <InputSlider
          title="Final Investment"
          defaultValue={initalCalculatorInput.finalInvestment}
          min="1000"
          max="10000000"
          inputSliderProps={{
            step: '1',
            minLabel: '1K',
            maxLabel: '1Cr',
          }}
          caculatorInputProps={{
            allowDecimal: false,
            prefix: '₹',
          }}
          className="mt-10"
          onChange={val => {
            handleInputChange(val, 'final_investment');
          }}
        />
        {/* Investment Duration */}
        <InputSlider
          title="Investment Duration"
          defaultValue={initalCalculatorInput.investmentDuration}
          min="1"
          max="40"
          inputSliderProps={{
            step: '1',
            minLabel: '1Y',
            maxLabel: '40Y',
          }}
          caculatorInputProps={{
            allowDecimal: false,
            suffix: 'Yr',
          }}
          className="mt-10"
          onChange={val => {
            handleInputChange(val, 'investment_duration');
          }}
        />
      </div>
      <CalculatorOutputDetails
        calculatorTextProps={[
          {
            leftTextProps: {
              label: 'CAGR',
              color: 'text-white',
              fontSize: 'lg:text-2xl text-lg',
              weight: 'lg:font-extrabold font-bold',
            },
            rightTextProps: {
              label: `${calculatorOutput.cagr}%`,
              color: 'text-white',
              fontSize: 'lg:text-2xl text-lg',
              weight: 'lg:font-extrabold font-bold',
            },
          },
        ]}
      />
    </CalculatorHOC>
  );
};

export default CAGRCalculator;
