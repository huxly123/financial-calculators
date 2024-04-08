import React, { useEffect, useState } from 'react';
import CalculatorHOC from '../../CalculatorHOC';
import InputSlider from '../../components/InputSlider';
import CalculatorOutputDetails from '../../components/CalculatorOutputDetails';
import { currencyRepresentation } from '../../../../utils/formatter.helper';

const initalCalculatorInput = {
  joiningAge: '25',
  monthlyPension: '2000',
};

const APYCalculator: React.FC = () => {
  const [calculatorInput, setCalculatorInput] = useState(initalCalculatorInput);
  const [calculatorOutput, setCalculatorOutput] = useState({
    monthlyInvestment: '',
    investmentDuration: '',
    totalAmount: '',
  });

  const handleInputChange = (val: string, type: string): void => {
    if (type === 'joining_age') {
      setCalculatorInput(prev => ({
        ...prev,
        joiningAge: val,
      }));
    } else if (type === 'monthly_pension') {
      setCalculatorInput(prev => ({
        ...prev,
        monthlyPension: val,
      }));
    }
  };

  useEffect(() => {
    const joiningAge = Number(calculatorInput.joiningAge);
    const monthlyPension = Number(calculatorInput.monthlyPension);
    if (joiningAge >= 18 && monthlyPension >= 1000) {
      setCalculatorOutput({
        monthlyInvestment: '',
        investmentDuration: '',
        totalAmount: '',
      });
    }
  }, [calculatorInput]);

  return (
    <CalculatorHOC>
      <div>
        {/* Your Joining Age */}
        <InputSlider
          title="Your Joining Age"
          defaultValue={initalCalculatorInput.joiningAge}
          min="18"
          max="39"
          inputSliderProps={{
            step: '1',
            minLabel: '18Y',
            maxLabel: '39Y',
          }}
          caculatorInputProps={{
            allowDecimal: false,
            suffix: 'Yr',
          }}
          onChange={val => {
            handleInputChange(val, 'joining_age');
          }}
        />
        {/* Desired Monthly Pension */}
        <InputSlider
          title="Desired Monthly Pension"
          defaultValue={initalCalculatorInput.monthlyPension}
          min="1"
          max="5000"
          inputSliderProps={{
            step: '1',
            minLabel: '1K',
            maxLabel: '5K',
          }}
          caculatorInputProps={{
            allowDecimal: false,
            prefix: '₹',
          }}
          className="mt-10"
          onChange={val => {
            handleInputChange(val, 'monthly_pension');
          }}
        />
      </div>
      <CalculatorOutputDetails
        calculatorTextProps={[
          {
            leftTextProps: {
              label: 'Monthly Investment',
              color: 'text-[#A4A5AB]',
              fontSize: 'lg:text-base text-sm',
              weight: 'font-bold',
            },
            rightTextProps: {
              label: currencyRepresentation(calculatorOutput.monthlyInvestment),
              color: 'text-white',
              fontSize: 'lg:text-base text-sm',
              weight: 'font-bold',
            },
          },
          {
            leftTextProps: {
              label: 'Investment Duration',
              color: 'text-[#A4A5AB]',
              fontSize: 'lg:text-base text-sm',
              weight: 'font-bold',
            },
            rightTextProps: {
              label: `${calculatorOutput.investmentDuration}Years`,
              color: 'text-white',
              fontSize: 'lg:text-base text-sm',
              weight: 'font-bold',
            },
          },
          {
            leftTextProps: {
              label: 'Total Amount',
              color: 'text-white',
              fontSize: 'lg:text-2xl text-lg',
              weight: 'lg:font-extrabold font-bold',
            },
            rightTextProps: {
              label: currencyRepresentation(calculatorOutput.totalAmount),
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

export default APYCalculator;
