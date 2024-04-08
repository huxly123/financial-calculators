import React, { useEffect, useState } from 'react';
import CalculatorHOC from '../../CalculatorHOC';
import InputSlider from '../../components/InputSlider';
import CalculatorOutputDetails from '../../components/CalculatorOutputDetails';
import { currencyRepresentation } from '../../../../utils/formatter.helper';

const initalCalculatorInput = {
  investmentPerMonth: '10000',
  rateOfInterest: '10',
  age: '26',
};

const NPSCalculator: React.FC = () => {
  const [calculatorInput, setCalculatorInput] = useState(initalCalculatorInput);
  const [calculatorOutput, setCalculatorOutput] = useState({
    totalInvestment: '',
    interestEarned: '',
    minAnnuityInvestment: '',
    maturity: '',
  });

  const handleInputChange = (val: string, type: string): void => {
    if (type === 'investment_per_month') {
      setCalculatorInput(prev => ({
        ...prev,
        investmentPerMonth: val,
      }));
    } else if (type === 'rate_of_interest') {
      setCalculatorInput(prev => ({
        ...prev,
        rateOfInterest: val,
      }));
    } else if (type === 'age') {
      setCalculatorInput(prev => ({
        ...prev,
        age: val,
      }));
    }
  };

  useEffect(() => {
    const investmentPerMonth = Number(calculatorInput.investmentPerMonth);
    const rateOfInterest = Number(calculatorInput.rateOfInterest);
    const age = Number(calculatorInput.age);
    if (investmentPerMonth >= 500 && rateOfInterest >= 8 && age >= 18) {
      const totalInvestment = (60 - age) * 12 * investmentPerMonth;
      const monthlyInterest = rateOfInterest / 12;
      const noOfMonths = 12 * (60 - age);
      const maturity =
        investmentPerMonth *
        ((((1 + monthlyInterest / 100) ** noOfMonths - 1) *
          (1 + monthlyInterest / 100)) /
          (monthlyInterest / 100));
      const interestEarned = maturity - totalInvestment;
      const minAnnuityInvestment = maturity * 0.4;
      setCalculatorOutput({
        totalInvestment: totalInvestment.toFixed(0),
        interestEarned: interestEarned.toFixed(0),
        minAnnuityInvestment: minAnnuityInvestment.toFixed(0),
        maturity: maturity.toFixed(0),
      });
    }
  }, [calculatorInput]);

  return (
    <CalculatorHOC>
      <div>
        {/* Investment per Month */}
        <InputSlider
          title="Investment per Month"
          defaultValue={initalCalculatorInput.investmentPerMonth}
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
            handleInputChange(val, 'investment_per_month');
          }}
        />
        {/* Expected Return (p.a) */}
        <InputSlider
          title="Expected Return (p.a)"
          defaultValue={initalCalculatorInput.rateOfInterest}
          min="8"
          max="15"
          inputSliderProps={{
            step: '1',
            minLabel: '8%',
            maxLabel: '15%',
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
        {/* Your Age */}
        <InputSlider
          title="Your Age"
          defaultValue={initalCalculatorInput.age}
          min="18"
          max="60"
          inputSliderProps={{
            step: '1',
            minLabel: '18',
            maxLabel: '60',
          }}
          caculatorInputProps={{
            allowDecimal: false,
            suffix: 'Yr.',
          }}
          className="mt-10"
          onChange={val => {
            handleInputChange(val, 'age');
          }}
        />
      </div>
      <CalculatorOutputDetails
        calculatorTextProps={[
          {
            leftTextProps: {
              label: 'Total Investement',
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
              label: 'Interest Earned',
              color: 'text-[#A4A5AB]',
              fontSize: 'lg:text-base text-sm',
              weight: 'font-bold',
            },
            rightTextProps: {
              label: currencyRepresentation(calculatorOutput.interestEarned),
              color: 'text-white',
              fontSize: 'lg:text-base text-sm',
              weight: 'font-bold',
            },
          },
          {
            leftTextProps: {
              label: 'Min. Annuity Investment',
              color: 'text-[#A4A5AB]',
              fontSize: 'lg:text-base text-sm',
              weight: 'font-bold',
            },
            rightTextProps: {
              label: currencyRepresentation(
                calculatorOutput.minAnnuityInvestment,
              ),
              color: 'text-white',
              fontSize: 'lg:text-base text-sm',
              weight: 'font-bold',
            },
          },
          {
            leftTextProps: {
              label: 'Maturity amount',
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
      />
    </CalculatorHOC>
  );
};

export default NPSCalculator;
