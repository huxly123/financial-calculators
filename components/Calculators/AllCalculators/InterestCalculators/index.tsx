import React, { useEffect, useState } from 'react';
import CalculatorHOC from '../../CalculatorHOC';
import InputSlider from '../../components/InputSlider';
import CalculatorOutputDetails from '../../components/CalculatorOutputDetails';
import { currencyRepresentation } from '../../../../utils/formatter.helper';
import PillsTab from '../../../CommonComponents/PillsTab';
import {
  type TCompoundFrequency,
  getCompoundFrequency,
} from '../../utils/formatter.helper';

interface IInterestCalculators {
  calculatorType: 'simple' | 'compound';
}

const InterestCalculators: React.FC<IInterestCalculators> = ({
  calculatorType,
}) => {
  const [calculatorInput, setCalculatorInput] = useState({
    principalAmount: '700000',
    rateOfInterest: '6',
    timePeriod: '10',
    compoundingFrequency: 'Yearly',
  });
  const [calculatorOutput, setCalculatorOutput] = useState({
    principalAmount: '',
    totalInterest: '',
    totalAmount: '',
  });

  const handleInputChange = (val: string, type: string): void => {
    if (type === 'principal_amount') {
      setCalculatorInput(prev => ({
        ...prev,
        principalAmount: val,
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
    } else if (type === 'compounding_frequency') {
      setCalculatorInput(prev => ({
        ...prev,
        compoundingFrequency: val,
      }));
    }
  };

  useEffect(() => {
    const principalAmount = Number(calculatorInput.principalAmount);
    const rateOfInterest = Number(calculatorInput.rateOfInterest);
    const timePeriod = Number(calculatorInput.timePeriod);
    const compoundingFrequency = getCompoundFrequency(
      calculatorInput.compoundingFrequency as TCompoundFrequency,
    );
    if (principalAmount >= 1000 && rateOfInterest >= 1 && timePeriod >= 1) {
      if (calculatorType === 'compound') {
        const totalInterest = Number(
          principalAmount *
            (1 + rateOfInterest / 100 / compoundingFrequency) **
              (compoundingFrequency * timePeriod),
        );
        const totalInterestAmount = totalInterest - principalAmount;
        const totalAmount = totalInterestAmount + principalAmount;
        setCalculatorOutput({
          principalAmount: principalAmount.toFixed(0),
          totalAmount: totalAmount.toFixed(0),
          totalInterest: totalInterestAmount.toFixed(0),
        });
      } else {
        const totalInterestAmount =
          (principalAmount * rateOfInterest * timePeriod) / 100;
        const totalAmount = totalInterestAmount + principalAmount;
        setCalculatorOutput({
          principalAmount: principalAmount.toFixed(0),
          totalAmount: totalAmount.toFixed(0),
          totalInterest: totalInterestAmount.toFixed(0),
        });
      }
    }
  }, [calculatorInput, calculatorType]);

  return (
    <CalculatorHOC>
      <div>
        {/* Your Loan Amount */}
        <InputSlider
          title="Principal Amount"
          defaultValue="700000"
          min="1000"
          max="10000000"
          inputSliderProps={{
            step: '1000',
            showMiddleLabel: true,
            minLabel: '1K',
            maxLabel: '1Cr',
            middleLabel: '50L',
          }}
          caculatorInputProps={{
            allowDecimal: false,
            prefix: '₹',
          }}
          onChange={val => {
            handleInputChange(val, 'principal_amount');
          }}
        />
        {/* Rate of Interest (P.A) */}
        <InputSlider
          title="Rate of Interest (P.A)"
          defaultValue="6"
          min="1"
          max="20"
          inputSliderProps={{
            step: '1',
            minLabel: '1%',
            maxLabel: '20%',
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
        {/* Time period */}
        <InputSlider
          title="Time period"
          defaultValue="10"
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
        {/* Compounding Frequency */}
        {calculatorType === 'compound' && (
          <div className="flex lg:items-center lg:justify-between max-lg:flex-col max-lg:gap-3 mt-10">
            <p className="text-white font-bold text-base">
              Compounding Frequency
            </p>
            <PillsTab
              data={[
                {
                  key: 1,
                  label: 'Yearly',
                },
                {
                  key: 2,
                  label: 'Half Yearly',
                },
                {
                  key: 3,
                  label: 'Quarterly',
                },
              ]}
              defaultValue={{
                index: 0,
                label: 'Yearly',
              }}
              isBgTransparent
              pillRadius="rounded-3xl"
              onChange={val => {
                handleInputChange(val, 'compounding_frequency');
              }}
            />
          </div>
        )}
      </div>
      <CalculatorOutputDetails
        calculatorTextProps={[
          {
            leftTextProps: {
              label: 'Principal Amount',
              color: 'text-[#A4A5AB]',
              fontSize: 'text-base',
              weight: 'font-bold',
            },
            rightTextProps: {
              label: currencyRepresentation(calculatorOutput.principalAmount),
              color: 'text-white',
              fontSize: 'text-base',
              weight: 'font-bold',
            },
          },
          {
            leftTextProps: {
              label: 'Total Interest',
              color: 'text-[#A4A5AB]',
              fontSize: 'text-base',
              weight: 'font-bold',
            },
            rightTextProps: {
              label: currencyRepresentation(calculatorOutput.totalInterest),
              color: 'text-white',
              fontSize: 'text-base',
              weight: 'font-bold',
            },
          },
          {
            leftTextProps: {
              label: `Amount in ${calculatorInput.timePeriod} Yr.`,
              color: 'text-white',
              fontSize: 'lg:text-2xl text-lg',
              weight: 'font-extrabold',
            },
            rightTextProps: {
              label: currencyRepresentation(calculatorOutput.totalAmount),
              color: 'text-white',
              fontSize: 'lg:text-2xl text-lg',
              weight: 'font-extrabold',
            },
          },
        ]}
        progressBarProps={{
          leftLabel: 'Principal Amount',
          rightLabel: 'Interest',
          leftValue: Number(calculatorOutput.principalAmount),
          rightValue: Number(calculatorOutput.totalInterest),
        }}
      />
    </CalculatorHOC>
  );
};

export default InterestCalculators;
