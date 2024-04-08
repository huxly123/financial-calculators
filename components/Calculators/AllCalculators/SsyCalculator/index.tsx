import React, { useEffect, useState } from 'react';
import CalculatorHOC from '../../CalculatorHOC';
import InputSlider from '../../components/InputSlider';
import CalculatorOutputDetails from '../../components/CalculatorOutputDetails';
import { currencyRepresentation } from '../../../../utils/formatter.helper';

const initalCalculatorInput = {
  yearlyInvestment: '20000',
  girlsAge: '5',
  startingYear: '2020',
};

const SSYCalculator: React.FC = () => {
  const [calculatorInput, setCalculatorInput] = useState(initalCalculatorInput);
  const [calculatorOutput, setCalculatorOutput] = useState({
    totalInvestment: '',
    interestEarned: '',
    maturityYear: '',
    maturity: '',
  });

  const handleInputChange = (val: string, type: string): void => {
    if (type === 'yearly_investment') {
      setCalculatorInput(prev => ({
        ...prev,
        yearlyInvestment: val,
      }));
    } else if (type === 'girls_age') {
      setCalculatorInput(prev => ({
        ...prev,
        girlsAge: val,
      }));
    } else if (type === 'starting_year') {
      setCalculatorInput(prev => ({
        ...prev,
        startingYear: val,
      }));
    }
  };

  useEffect(() => {
    const yearlyInvestment = Number(calculatorInput.yearlyInvestment);
    const girlsAge = Number(calculatorInput.girlsAge);
    const startingYear = Number(calculatorInput.startingYear);
    const interestRate = 0.082;
    if (yearlyInvestment >= 250 && girlsAge >= 1 && startingYear >= 2018) {
      const totalInvestment = yearlyInvestment * 15;
      const interestEarned =
        yearlyInvestment *
          (((1 + interestRate) ** 15 - 1) / interestRate) *
          (1 + interestRate) *
          (1 + interestRate) ** 6 -
        totalInvestment;
      const maturityYear = startingYear + 21;
      const maturity = interestEarned + totalInvestment;

      setCalculatorOutput({
        totalInvestment: totalInvestment.toFixed(0),
        interestEarned: interestEarned.toFixed(0),
        maturityYear: maturityYear.toFixed(0),
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
          min="250"
          max="150000"
          inputSliderProps={{
            step: '250',
            minLabel: '250',
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
        {/* Girl’s Age */}
        <InputSlider
          title="Girl's Age"
          defaultValue={initalCalculatorInput.girlsAge}
          min="1"
          max="10"
          inputSliderProps={{
            step: '1',
            minLabel: '1',
            maxLabel: '10',
          }}
          caculatorInputProps={{
            allowDecimal: false,
            suffix: 'Yr.',
          }}
          className="mt-10"
          onChange={val => {
            handleInputChange(val, 'girls_age');
          }}
        />
        {/* Starting Year */}
        <InputSlider
          title="Starting Year"
          defaultValue={initalCalculatorInput.startingYear}
          min="2018"
          max="2030"
          inputSliderProps={{
            step: '1',
            minLabel: '2018',
            maxLabel: '2030',
          }}
          caculatorInputProps={{
            allowDecimal: false,
          }}
          className="mt-10"
          onChange={val => {
            handleInputChange(val, 'starting_year');
          }}
        />
        <div className="flex justify-between mt-10">
          <p className="font-bold text-white lg:text-base text-sm">
            Interest Rate
          </p>
          <p className="font-bold text-white lg:text-base text-sm">8.2%</p>
        </div>
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
              label: 'Maturity Year',
              color: 'text-[#A4A5AB]',
              fontSize: 'lg:text-base text-sm',
              weight: 'font-bold',
            },
            rightTextProps: {
              label: currencyRepresentation(calculatorOutput.maturityYear),
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
        progressBarProps={{
          leftLabel: 'Total Investment',
          rightLabel: 'Interest Earned',
          leftValue: Number(calculatorOutput.totalInvestment),
          rightValue: Number(calculatorOutput.interestEarned),
        }}
      />
    </CalculatorHOC>
  );
};

export default SSYCalculator;
