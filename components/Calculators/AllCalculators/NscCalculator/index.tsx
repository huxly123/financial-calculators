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

const initalCalculatorInput = {
  amountInvested: '150000',
  rateOfInterest: '6',
  compoundingFrequency: 'Yearly',
  timePeriod: '5',
};

const NSCCalculator: React.FC = () => {
  const [calculatorInput, setCalculatorInput] = useState(initalCalculatorInput);
  const [calculatorOutput, setCalculatorOutput] = useState({
    principalAmount: '',
    totalInterest: '',
    amount: '',
  });

  const handleInputChange = (val: string, type: string): void => {
    if (type === 'amount_invested') {
      setCalculatorInput(prev => ({
        ...prev,
        amountInvested: val,
      }));
    } else if (type === 'rate_of_interest') {
      setCalculatorInput(prev => ({
        ...prev,
        rateOfInterest: val,
      }));
    } else if (type === 'starting_year') {
      setCalculatorInput(prev => ({
        ...prev,
        startingYear: val,
      }));
    } else if (type === 'compounding_frequency') {
      setCalculatorInput(prev => ({
        ...prev,
        compoundingFrequency: val,
      }));
    }
  };

  useEffect(() => {
    const amountInvested = Number(calculatorInput.amountInvested);
    const rateOfInterest = Number(calculatorInput.rateOfInterest);
    const timePeriod = Number(calculatorInput.timePeriod);
    const compoundingFrequency = getCompoundFrequency(
      calculatorInput.compoundingFrequency as TCompoundFrequency,
    );
    if (amountInvested >= 1000 && rateOfInterest >= 1) {
      const totalInterest = Number(
        amountInvested *
          (1 + rateOfInterest / 100 / compoundingFrequency) **
            (compoundingFrequency * timePeriod),
      );
      const totalInterestAmount = totalInterest - amountInvested;
      const totalAmount = totalInterestAmount + amountInvested;
      setCalculatorOutput({
        principalAmount: amountInvested.toFixed(0),
        totalInterest: totalInterestAmount.toFixed(0),
        amount: totalAmount.toFixed(0),
      });
    }
  }, [calculatorInput]);

  return (
    <CalculatorHOC>
      <div>
        {/* Amount Invested */}
        <InputSlider
          title="Amount Invested"
          defaultValue={initalCalculatorInput.amountInvested}
          min="1000"
          max="10000000"
          inputSliderProps={{
            step: '1000',
            minLabel: '1K',
            maxLabel: '1Cr',
            showMiddleLabel: true,
            middleLabel: '50L',
          }}
          caculatorInputProps={{
            allowDecimal: false,
            prefix: '₹',
          }}
          onChange={val => {
            handleInputChange(val, 'amount_invested');
          }}
        />
        {/* Rate of Interest (P.A) */}
        <InputSlider
          title="Rate of Interest (P.A)"
          defaultValue={initalCalculatorInput.rateOfInterest}
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
        {/* Compounding Frequency */}
        <div className="flex lg:items-center lg:justify-between max-lg:flex-col max-lg:gap-3 mt-10">
          <p className="font-bold text-white lg:text-base text-sm">
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
        <div className="flex justify-between mt-10">
          <p className="font-bold text-white lg:text-base text-sm">
            Time Period
          </p>
          <p className="font-bold text-white lg:text-base text-sm">5 Years</p>
        </div>
      </div>
      <CalculatorOutputDetails
        calculatorTextProps={[
          {
            leftTextProps: {
              label: 'Principal Amount',
              color: 'text-[#A4A5AB]',
              fontSize: 'lg:text-base text-sm',
              weight: 'font-bold',
            },
            rightTextProps: {
              label: currencyRepresentation(calculatorOutput.principalAmount),
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
              label: 'Amount in 5 Yr.',
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
          leftLabel: 'Principal Amount',
          rightLabel: 'Interest',
          leftValue: Number(calculatorOutput.principalAmount),
          rightValue: Number(calculatorOutput.totalInterest),
        }}
      />
    </CalculatorHOC>
  );
};

export default NSCCalculator;
