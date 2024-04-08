import React, { useEffect, useState } from 'react';
import CalculatorHOC from '../../CalculatorHOC';
import InputSlider from '../../components/InputSlider';
import CalculatorOutputDetails from '../../components/CalculatorOutputDetails';
import { currencyRepresentation } from '../../../../utils/formatter.helper';

const initalCalculatorInput = {
  totalInvestment: '5000',
  monthlyWithdrawl: '5000',
  expectedReturnRate: '11',
  timePeriod: '15',
};

const SWPCalculator: React.FC = () => {
  const [calculatorInput, setCalculatorInput] = useState(initalCalculatorInput);
  const [calculatorOutput, setCalculatorOutput] = useState({
    totalInvestment: '',
    totalWithdrawal: '',
    finalValue: '',
  });

  const handleInputChange = (val: string, type: string): void => {
    if (type === 'total_investment') {
      setCalculatorInput(prev => ({
        ...prev,
        totalInvestment: val,
      }));
    } else if (type === 'monthly_withdrawal') {
      setCalculatorInput(prev => ({
        ...prev,
        monthlyWithdrawl: val,
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

  useEffect(() => {
    const totalInvestment = Number(calculatorInput.totalInvestment);
    const monthlyWithdrawl = Number(calculatorInput.monthlyWithdrawl);
    const expectedReturnRate = Number(calculatorInput.expectedReturnRate) / 100;
    const timePeriod = Number(calculatorInput.timePeriod);
    if (
      totalInvestment >= 500 &&
      monthlyWithdrawl >= 500 &&
      expectedReturnRate >= 0.01 &&
      timePeriod >= 1
    ) {
      const totalWithdrawal = monthlyWithdrawl * 12 * timePeriod;
      const finalValue =
        totalInvestment * (1 + expectedReturnRate / 12) ** (timePeriod * 12) -
        (monthlyWithdrawl *
          ((1 + expectedReturnRate / 12) ** (12 * timePeriod) - 1)) /
          (expectedReturnRate / 12);
      setCalculatorOutput({
        totalInvestment: totalInvestment.toFixed(0),
        totalWithdrawal: totalWithdrawal.toFixed(0),
        finalValue: finalValue.toFixed(0),
      });
    }
  }, [calculatorInput]);

  return (
    <CalculatorHOC>
      <div>
        {/* Total Investment */}
        <InputSlider
          title="Total Investment"
          defaultValue={initalCalculatorInput.totalInvestment}
          min="500"
          max="5000000"
          inputSliderProps={{
            step: '500',
            minLabel: '500',
            maxLabel: '50L',
          }}
          caculatorInputProps={{
            allowDecimal: false,
            prefix: '₹',
          }}
          onChange={val => {
            handleInputChange(val, 'total_investment');
          }}
        />
        {/* Monthly Withdrawal */}
        <InputSlider
          title="Monthly Withdrawal"
          defaultValue={initalCalculatorInput.monthlyWithdrawl}
          min="500"
          max="50000"
          inputSliderProps={{
            step: '500',
            minLabel: '500',
            maxLabel: '50K',
          }}
          caculatorInputProps={{
            allowDecimal: false,
            suffix: '₹',
          }}
          className="mt-10"
          onChange={val => {
            handleInputChange(val, 'monthly_withdrawal');
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
          max="30"
          inputSliderProps={{
            step: '1',
            minLabel: '1Y',
            maxLabel: '30Y',
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
              label: 'Total Investment',
              color: 'text-[#A4A5AB]',
              fontSize: 'lg:text-base text-sm',
              weight: 'font-bold',
            },
            rightTextProps: {
              label: currencyRepresentation(calculatorOutput.totalInvestment),
              color: 'text-white',
              fontSize: 'lg:text-base text-sm',
              weight: 'font-bold',
            },
          },
          {
            leftTextProps: {
              label: 'Total Withdrawal',
              color: 'text-[#A4A5AB]',
              fontSize: 'lg:text-base text-sm',
              weight: 'font-bold',
            },
            rightTextProps: {
              label: currencyRepresentation(calculatorOutput.totalWithdrawal),
              color: 'text-white',
              fontSize: 'lg:text-base text-sm',
              weight: 'font-bold',
            },
          },
          {
            leftTextProps: {
              label: 'Final Value',
              color: 'text-white',
              fontSize: 'lg:text-2xl text-lg',
              weight: 'lg:font-extrabold font-bold',
            },
            rightTextProps: {
              label: currencyRepresentation(calculatorOutput.finalValue),
              color: 'text-white',
              fontSize: 'lg:text-2xl text-lg',
              weight: 'lg:font-extrabold font-bold',
            },
          },
        ]}
        progressBarProps={{
          leftLabel: 'Investment',
          rightLabel: 'Withdrawal',
          leftValue: Number(calculatorOutput.totalInvestment),
          rightValue: Number(calculatorOutput.totalWithdrawal),
        }}
      />
    </CalculatorHOC>
  );
};

export default SWPCalculator;
