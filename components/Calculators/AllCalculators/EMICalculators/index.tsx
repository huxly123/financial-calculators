import React, { useEffect, useState } from 'react';
import CalculatorHOC from '../../CalculatorHOC';
import InputSlider from '../../components/InputSlider';
import CalculatorOutputDetails from '../../components/CalculatorOutputDetails';
import { currencyRepresentation } from '../../../../utils/formatter.helper';

const EmiCalculators: React.FC = () => {
  const [calculatorInput, setCalculatorInput] = useState({
    loanAmount: '100000',
    rateOfInterest: '6',
    loanDuration: '5',
  });
  const [calculatorOutput, setCalculatorOutput] = useState({
    emi: '',
    installments: '',
    principalAmount: '',
    totalInterest: '',
    totalAmount: '',
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
    } else if (type === 'loan_duration') {
      setCalculatorInput(prev => ({
        ...prev,
        loanDuration: val,
      }));
    }
  };

  useEffect(() => {
    const loanAmount = Number(calculatorInput.loanAmount);
    const rateOfInterest = Number(calculatorInput.rateOfInterest);
    const loanDuration = Number(calculatorInput.loanDuration);
    if (loanAmount >= 100000 && rateOfInterest >= 1 && loanDuration >= 1) {
      const noOfMonts = loanDuration * 12;
      const monthlyInterest = rateOfInterest / 12 / 100;
      const emi =
        (loanAmount * monthlyInterest * (1 + monthlyInterest) ** noOfMonts) /
        ((1 + monthlyInterest) ** noOfMonts - 1);
      const totalAmount = emi * noOfMonts;
      const totalInterest = totalAmount - loanAmount;

      setCalculatorOutput({
        emi: emi.toFixed(0),
        installments: String(noOfMonts),
        principalAmount: loanAmount.toFixed(0),
        totalInterest: totalInterest.toFixed(0),
        totalAmount: totalAmount.toFixed(0),
      });
    }
  }, [calculatorInput]);

  return (
    <CalculatorHOC>
      <div>
        {/* Your Loan Amount */}
        <InputSlider
          title="Your Loan Amount"
          defaultValue="100000"
          min="100000"
          max="10000000"
          inputSliderProps={{
            step: '100000',
            showMiddleLabel: true,
            minLabel: '1L',
            maxLabel: '1Cr',
            middleLabel: '50L',
          }}
          caculatorInputProps={{
            allowDecimal: false,
            prefix: '₹',
            allowedDecimal: 2,
          }}
          onChange={val => {
            handleInputChange(val, 'loan_amount');
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
        {/* Loan Duration */}
        <InputSlider
          title="Loan Duration"
          defaultValue="5"
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
            handleInputChange(val, 'loan_duration');
          }}
        />
      </div>
      <CalculatorOutputDetails
        calculatorTextProps={[
          {
            leftTextProps: {
              label: 'EMI',
              color: 'text-white',
              fontSize: 'text-2xl',
              weight: 'font-extrabold',
            },
            rightTextProps: {
              label: currencyRepresentation(calculatorOutput.emi),
              color: 'text-white',
              fontSize: 'text-2xl',
              weight: 'font-extrabold',
            },
          },
          {
            leftTextProps: {
              label: 'Installments',
              color: 'text-[#A4A5AB]',
              fontSize: 'text-base',
              weight: 'font-bold',
            },
            rightTextProps: {
              label: calculatorOutput.installments,
              color: 'text-white',
              fontSize: 'text-base',
              weight: 'font-bold',
            },
          },
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
              label: 'Total Amount',
              color: 'text-[#A4A5AB]',
              fontSize: 'text-base',
              weight: 'font-bold',
            },
            rightTextProps: {
              label: currencyRepresentation(calculatorOutput.totalAmount),
              color: 'text-white',
              fontSize: 'text-base',
              weight: 'font-bold',
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

export default EmiCalculators;
