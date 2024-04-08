import React, { useEffect, useState } from 'react';
import CalculatorHOC from '../../CalculatorHOC';
import InputSlider from '../../components/InputSlider';
import CalculatorOutputDetails from '../../components/CalculatorOutputDetails';
import { currencyRepresentation } from '../../../../utils/formatter.helper';

const initalCalculatorInput = {
  yearlyInvestment: '50000',
  timePeriod: '15',
  rateOfInterest: '7.1',
};

const PPFCalculator: React.FC = () => {
  const [calculatorInput, setCalculatorInput] = useState(initalCalculatorInput);
  const [calculatorOutput, setCalculatorOutput] = useState({
    investedAmount: '',
    totalInterest: '',
    maturity: '',
  });

  const handleInputChange = (val: string, type: string): void => {
    if (type === 'yearly_investment') {
      setCalculatorInput(prev => ({
        ...prev,
        yearlyInvestment: val,
      }));
    } else if (type === 'time_period') {
      setCalculatorInput(prev => ({
        ...prev,
        timePeriod: val,
      }));
    }
  };

  useEffect(() => {
    const yearlyInvestment = Number(calculatorInput.yearlyInvestment);
    const timePeriod = Number(calculatorInput.timePeriod);
    const rateOfInterest = Number(calculatorInput.rateOfInterest);
    const investedAmount = yearlyInvestment * timePeriod;
    const totalInterest =
      yearlyInvestment *
        (((1 + rateOfInterest / 100) ** timePeriod - 1) /
          (rateOfInterest / 100)) *
        (1 + rateOfInterest / 100) -
      investedAmount;
    const maturity = totalInterest + investedAmount;
    if (yearlyInvestment >= 500 && timePeriod >= 15) {
      setCalculatorOutput({
        investedAmount: investedAmount.toFixed(0),
        totalInterest: totalInterest.toFixed(0),
        maturity: maturity.toFixed(0),
      });
    }
  }, [calculatorInput]);

  return (
    <CalculatorHOC>
      <div>
        {/* Yearly Investment */}
        <InputSlider
          title="Yearly Investment"
          defaultValue={initalCalculatorInput.yearlyInvestment}
          min="500"
          max="150000"
          inputSliderProps={{
            step: '500',
            minLabel: '500',
            maxLabel: '1.5L',
          }}
          caculatorInputProps={{
            allowDecimal: false,
            prefix: '₹',
          }}
          onChange={val => {
            handleInputChange(val, 'yearly_investment');
          }}
        />
        {/* Time Period */}
        <InputSlider
          title="Time Period"
          defaultValue={initalCalculatorInput.timePeriod}
          min="15"
          max="50"
          inputSliderProps={{
            step: '1',
            minLabel: '15Y',
            maxLabel: '50Y',
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
              label: 'Invested amount',
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
              label: 'Total Interest',
              color: 'text-[#A4A5AB]',
              fontSize: 'lg:text-base text-sm',
              weight: 'font-bold',
            },
            rightTextProps: {
              label: currencyRepresentation(calculatorOutput.totalInterest),
              color: 'text-white',
              fontSize: 'lg:text-base text-sm',
              weight: 'font-bold',
            },
          },
          {
            leftTextProps: {
              label: `Maturity in ${calculatorInput.timePeriod}Yr`,
              color: 'text-white',
              fontSize: 'lg:text-2xl text-lg',
              weight: 'lg:font-extrabold font-bold',
            },
            rightTextProps: {
              label: currencyRepresentation(calculatorOutput.maturity),
              color: 'text-white',
              fontSize: 'lg:text-2xl text-lg',
              weight: 'lg:font-extrabold font-bold',
            },
          },
        ]}
        progressBarProps={{
          leftLabel: 'Loan Amount',
          rightLabel: 'Interest',
          leftValue: Number(calculatorOutput.investedAmount),
          rightValue: Number(calculatorOutput.totalInterest),
        }}
      />
    </CalculatorHOC>
  );
};

export default PPFCalculator;
