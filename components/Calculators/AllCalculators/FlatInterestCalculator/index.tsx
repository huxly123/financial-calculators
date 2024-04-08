import React, { useEffect, useState } from 'react';
import CalculatorHOC from '../../CalculatorHOC';
import InputSlider from '../../components/InputSlider';
import CalculatorOutputDetails from '../../components/CalculatorOutputDetails';
import { currencyRepresentation } from '../../../../utils/formatter.helper';
import {
  type TPeriodType,
  getSliderMinMaxPeriod,
  type ISliderMinMaxPeriod,
  convertPeriodtoYear,
} from '../../utils/formatter.helper';

const initalCalculatorInput = {
  loanAmount: '5000',
  rateOfInterest: '10',
  timePeriod: '1',
  periodType: 'Months',
};

const FlatInterestCalculators: React.FC = () => {
  const [calculatorInput, setCalculatorInput] = useState(initalCalculatorInput);
  const [calculatorOutput, setCalculatorOutput] = useState({
    emi: '',
    totalInterest: '',
    amount: '',
  });
  const [minMaxVal, setMinMaxVals] = useState<ISliderMinMaxPeriod>({
    min: '0',
    max: '0',
    minLabel: '',
    maxLabel: '',
    suffix: '',
  });

  const handleInputChange = (val: string, type: string): void => {
    if (type === 'loan_amount') {
      setCalculatorInput(prev => ({
        ...prev,
        loanAmount: val,
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
    } else if (type === 'period_type') {
      setCalculatorInput(prev => ({
        ...prev,
        periodType: val,
      }));
    }
  };

  useEffect(() => {
    const loanAmount = Number(calculatorInput.loanAmount);
    const rateOfInterest = Number(calculatorInput.rateOfInterest);
    const timePeriod = convertPeriodtoYear(
      calculatorInput.timePeriod,
      calculatorInput.periodType as TPeriodType,
    );
    if (loanAmount >= 1000 && rateOfInterest >= 1) {
      const calculatedTimePeriod = timePeriod;
      const totalInterest =
        loanAmount * (rateOfInterest / 100) * calculatedTimePeriod;
      const amount = totalInterest + loanAmount;
      const emi = amount / (calculatedTimePeriod * 12);
      setCalculatorOutput({
        amount: amount.toFixed(0),
        emi: emi.toFixed(0),
        totalInterest: totalInterest.toFixed(0),
      });
    }
  }, [calculatorInput]);

  useEffect(() => {
    const minMaxValues = getSliderMinMaxPeriod(
      '1',
      '25',
      calculatorInput.periodType as TPeriodType,
      true,
    );
    setMinMaxVals(minMaxValues);
  }, [calculatorInput.periodType]);
  return (
    <CalculatorHOC>
      <div>
        {/* Deposit Amount */}
        <InputSlider
          title="Loan Amount"
          defaultValue={initalCalculatorInput.loanAmount}
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
            handleInputChange(val, 'loan_amount');
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
        {/* Period */}
        <InputSlider
          title="Time period"
          defaultValue={initalCalculatorInput.timePeriod}
          min={minMaxVal.min}
          max={minMaxVal.max}
          inputSliderProps={{
            step: '1',
            minLabel: minMaxVal.minLabel,
            maxLabel: minMaxVal.maxLabel,
          }}
          caculatorInputProps={{
            allowDecimal: false,
            suffix: minMaxVal.suffix,
          }}
          className="mt-10"
          onChange={val => {
            handleInputChange(val, 'time_period');
          }}
          radioData={{
            data: [
              {
                key: 1,
                label: 'Years',
              },
              {
                key: 2,
                label: 'Months',
              },
            ],
            defaultValue: {
              index: 1,
              label: initalCalculatorInput.periodType,
            },
            onChange: val => {
              handleInputChange(val, 'period_type');
            },
          }}
        />
      </div>
      <CalculatorOutputDetails
        calculatorTextProps={[
          {
            leftTextProps: {
              label: 'EMI',
              color: 'text-white',
              fontSize: 'lg:text-2xl text-lg lg:text-2xl text-lg',
              weight: 'lg:font-extrabold font-bold',
            },
            rightTextProps: {
              label: currencyRepresentation(calculatorOutput.emi),
              color: 'text-white',
              fontSize: 'lg:text-2xl text-lg lg:text-2xl text-lg',
              weight: 'lg:font-extrabold font-bold',
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
              label: `Amount in ${calculatorInput.timePeriod} ${calculatorInput.periodType}`,
              color: 'text-[#A4A5AB]',
              fontSize: 'lg:text-base text-sm',
              weight: 'font-bold',
            },
            rightTextProps: {
              label: currencyRepresentation(calculatorOutput.amount),
              color: 'text-white',
              fontSize: 'lg:text-base text-sm',
              weight: 'font-bold',
            },
          },
        ]}
        progressBarProps={{
          leftLabel: 'Deposit',
          rightLabel: 'Returns',
          leftValue: Number(calculatorOutput.amount),
          rightValue: Number(calculatorOutput.totalInterest),
        }}
      />
    </CalculatorHOC>
  );
};

export default FlatInterestCalculators;
