import React, { useEffect, useState } from 'react';
import CalculatorHOC from '../../CalculatorHOC';
import InputSlider from '../../components/InputSlider';
import CalculatorOutputDetails from '../../components/CalculatorOutputDetails';
import { currencyRepresentation } from '../../../../utils/formatter.helper';

const initalCalculatorInput = {
  monthlyInvestment: '25000',
  annualStepUp: '10',
  expectedReturnRate: '12',
  timePeriod: '40',
};

const StepUpSipCalculator: React.FC = () => {
  const [calculatorInput, setCalculatorInput] = useState(initalCalculatorInput);
  const [calculatorOutput, setCalculatorOutput] = useState({
    investedAmount: '',
    estimatedReturns: '',
    growth: '',
    amount: '',
  });

  const handleInputChange = (val: string, type: string): void => {
    if (type === 'monthly_investment') {
      setCalculatorInput(prev => ({
        ...prev,
        monthlyInvestment: val,
      }));
    } else if (type === 'annual_step_up') {
      setCalculatorInput(prev => ({
        ...prev,
        annualStepUp: val,
      }));
    } else if (type === 'expected_return_rate') {
      setCalculatorInput(prev => ({
        ...prev,
        expectedReturnRate: val,
      }));
    } else if (type === 'time_period') {
      setCalculatorInput(prev => ({
        ...prev,
        timePeriod: val,
      }));
    }
  };

  useEffect(() => {}, [calculatorInput]);

  return (
    <CalculatorHOC>
      <div>
        {/* Monthly Investment */}
        <InputSlider
          title="Monthly Investment"
          defaultValue={initalCalculatorInput.monthlyInvestment}
          min="500"
          max="100000"
          inputSliderProps={{
            step: '500',
            minLabel: '500',
            maxLabel: '1Lakh',
          }}
          caculatorInputProps={{
            allowDecimal: false,
            prefix: '₹',
          }}
          onChange={val => {
            handleInputChange(val, 'monthly_investment');
          }}
        />
        {/* Annual Step Up */}
        <InputSlider
          title="Annual Step Up"
          defaultValue={initalCalculatorInput.annualStepUp}
          min="1"
          max="50"
          inputSliderProps={{
            step: '1',
            minLabel: '1%',
            maxLabel: '50%',
          }}
          caculatorInputProps={{
            allowDecimal: true,
            suffix: '%',
          }}
          className="mt-10"
          onChange={val => {
            handleInputChange(val, 'annual_step_up');
          }}
        />
        {/* Expected Return Rate (p.a) */}
        <InputSlider
          title="Expected Return Rate (p.a)"
          defaultValue={initalCalculatorInput.expectedReturnRate}
          min="1"
          max="30"
          inputSliderProps={{
            step: '1',
            minLabel: '1%',
            maxLabel: '30%',
          }}
          caculatorInputProps={{
            allowDecimal: true,
            suffix: '%',
          }}
          className="mt-10"
          onChange={val => {
            handleInputChange(val, 'expected_return_rate');
          }}
        />
        {/* Time Period */}
        <InputSlider
          title="Time Period"
          defaultValue={initalCalculatorInput.timePeriod}
          min="1"
          max="40"
          inputSliderProps={{
            step: '1',
            minLabel: '1Y',
            maxLabel: '40Y',
          }}
          caculatorInputProps={{
            allowDecimal: false,
            suffix: 'Yr.',
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
              label: 'Invested Amount',
              color: 'text-[#A4A5AB]',
              fontSize: 'lg:text-base text-sm',
              weight: 'font-bold',
            },
            rightTextProps: {
              label: currencyRepresentation(calculatorOutput.investedAmount),
              color: 'text-white',
              fontSize: 'lg:text-base text-sm',
              weight: 'font-bold',
            },
          },
          {
            leftTextProps: {
              label: 'Estimated Returns',
              color: 'text-[#A4A5AB]',
              fontSize: 'lg:text-base text-sm',
              weight: 'font-bold',
            },
            rightTextProps: {
              label: currencyRepresentation(calculatorOutput.estimatedReturns),
              color: 'text-white',
              fontSize: 'lg:text-base text-sm',
              weight: 'font-bold',
            },
          },
          {
            leftTextProps: {
              label: 'Growth',
              color: 'text-[#A4A5AB]',
              fontSize: 'lg:text-base text-sm',
              weight: 'font-bold',
            },
            rightTextProps: {
              label: `${calculatorOutput.growth}%`,
              color: 'text-white',
              fontSize: 'lg:text-base text-sm',
              weight: 'font-bold',
            },
          },
          {
            leftTextProps: {
              label: `${calculatorInput.timePeriod} Years Value`,
              color: 'text-white',
              fontSize: 'lg:text-2xl text-lg',
              weight: 'lg:font-extrabold font-bold',
            },
            rightTextProps: {
              label: currencyRepresentation(calculatorOutput.amount),
              color: 'text-white',
              fontSize: 'lg:text-2xl text-lg',
              weight: 'lg:font-extrabold font-bold',
            },
          },
        ]}
        progressBarProps={{
          leftLabel: 'Invested',
          rightLabel: 'Returns',
          leftValue: Number(calculatorOutput.investedAmount),
          rightValue: Number(calculatorOutput.estimatedReturns),
        }}
      />
    </CalculatorHOC>
  );
};

export default StepUpSipCalculator;
