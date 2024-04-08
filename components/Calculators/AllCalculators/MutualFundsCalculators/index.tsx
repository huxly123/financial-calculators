import React, { useEffect, useState } from 'react';
import CalculatorHOC from '../../CalculatorHOC';
import InputSlider from '../../components/InputSlider';
import CalculatorOutputDetails from '../../components/CalculatorOutputDetails';
import { currencyRepresentation } from '../../../../utils/formatter.helper';

interface IMutualFundsCalculators {
  calculatorType: 'mutual_funds' | 'sip' | 'lumpsum';
}

const MutualFundsCalculators: React.FC<IMutualFundsCalculators> = ({
  calculatorType,
}) => {
  const [calculatorInput, setCalculatorInput] = useState({
    totalInvestment: '500',
    expectedReturn: '12',
    period: '5',
  });
  const [calculatorOutput, setCalculatorOutput] = useState({
    invested: '',
    estimatedReturns: '',
    growth: '',
    maturity: '',
  });

  const handleInputChange = (val: string, type: string): void => {
    if (type === 'principal_amount') {
      setCalculatorInput(prev => ({
        ...prev,
        totalInvestment: val,
      }));
    } else if (type === 'rate_of_interest') {
      setCalculatorInput(prev => ({
        ...prev,
        expectedReturn: val,
      }));
    } else if (type === 'time_period') {
      setCalculatorInput(prev => ({
        ...prev,
        period: val,
      }));
    }
  };

  useEffect(() => {
    const totalInvestment = Number(calculatorInput.totalInvestment);
    const expectedReturn = Number(calculatorInput.expectedReturn);
    const period = Number(calculatorInput.period);
    if (totalInvestment >= 500 && expectedReturn >= 1 && period >= 1) {
      if (calculatorType === 'mutual_funds') {
        const maturity = totalInvestment * (1 + expectedReturn / 100) ** period;
        const growth = (maturity / totalInvestment - 1) * 100;
        const estimatedReturns = maturity - totalInvestment;
        setCalculatorOutput({
          estimatedReturns: estimatedReturns.toFixed(0),
          growth: growth.toFixed(2),
          invested: totalInvestment.toFixed(0),
          maturity: maturity.toFixed(0),
        });
      } else if (calculatorType === 'sip') {
        const monthlyInterest = expectedReturn / 12 / 100;
        const noOfMonths = period * 12;
        const totalAmount = totalInvestment * noOfMonths;
        const estimatedReturns =
          totalInvestment *
            (((1 + monthlyInterest) ** noOfMonths - 1) / monthlyInterest) *
            (1 + monthlyInterest) -
          totalAmount;
        const maturity = estimatedReturns + totalAmount;
        const growth = (maturity / totalAmount - 1) * 100;
        setCalculatorOutput({
          estimatedReturns: estimatedReturns.toFixed(0),
          growth: growth.toFixed(2),
          invested: totalAmount.toFixed(0),
          maturity: maturity.toFixed(0),
        });
      } else if (calculatorType === 'lumpsum') {
        const maturity = totalInvestment * (1 + expectedReturn / 100) ** period;
        const estimatedReturns = maturity - totalInvestment;
        const growth = (maturity / totalInvestment - 1) * 100;
        setCalculatorOutput({
          estimatedReturns: estimatedReturns.toFixed(0),
          growth: growth.toFixed(2),
          invested: totalInvestment.toFixed(0),
          maturity: maturity.toFixed(0),
        });
      }
    }
  }, [calculatorInput, calculatorType]);

  return (
    <CalculatorHOC>
      <div>
        {/* Your Loan Amount */}
        <InputSlider
          title={`${
            calculatorType === 'sip' ? 'Monthly Investment' : 'Total Investment'
          }`}
          defaultValue="500"
          min="500"
          max={`${calculatorType === 'sip' ? '100000' : '10000000'}`}
          inputSliderProps={{
            step: '500',
            showMiddleLabel: false,
            minLabel: '500',
            maxLabel: calculatorType === 'sip' ? '1 Lakh' : '1Cr',
          }}
          caculatorInputProps={{
            allowDecimal: false,
            prefix: '₹',
          }}
          onChange={val => {
            handleInputChange(val, 'principal_amount');
          }}
        />
        {/* Expected Return (P.A) */}
        <InputSlider
          title="Expected Return (P.A)"
          defaultValue="12"
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
          title="Period"
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
            handleInputChange(val, 'time_period');
          }}
        />
      </div>
      <CalculatorOutputDetails
        calculatorTextProps={[
          {
            leftTextProps: {
              label: 'Invested',
              color: 'text-[#A4A5AB]',
              fontSize: 'text-base',
              weight: 'font-bold',
            },
            rightTextProps: {
              label: currencyRepresentation(calculatorOutput.invested),
              color: 'text-white',
              fontSize: 'text-base',
              weight: 'font-bold',
            },
          },
          {
            leftTextProps: {
              label: 'Estimated Returns',
              color: 'text-[#A4A5AB]',
              fontSize: 'text-base',
              weight: 'font-bold',
            },
            rightTextProps: {
              label: currencyRepresentation(calculatorOutput.estimatedReturns),
              color: 'text-white',
              fontSize: 'text-base',
              weight: 'font-bold',
            },
          },
          {
            leftTextProps: {
              label: 'Growth',
              color: 'text-[#A4A5AB]',
              fontSize: 'text-base',
              weight: 'font-bold',
            },
            rightTextProps: {
              label: `${calculatorOutput.growth}%`,
              color: 'text-white',
              fontSize: 'text-base',
              weight: 'font-bold',
            },
          },
          {
            leftTextProps: {
              label: `${
                calculatorType === 'mutual_funds'
                  ? `Maturity in ${calculatorInput.period}Y.`
                  : `${calculatorInput.period} ${
                      Number(calculatorInput.period) > 1 ? 'Years' : 'Year'
                    } Value`
              } `,
              color: 'text-white',
              fontSize: 'lg:text-2xl text-lg',
              weight: 'font-extrabold',
            },
            rightTextProps: {
              label: currencyRepresentation(calculatorOutput.maturity),
              color: 'text-white',
              fontSize: 'lg:text-2xl text-lg',
              weight: 'font-extrabold',
            },
          },
        ]}
        progressBarProps={{
          leftLabel: 'Invested',
          rightLabel: 'Returns',
          leftValue: Number(calculatorOutput.invested),
          rightValue: Number(calculatorOutput.estimatedReturns),
        }}
      />
    </CalculatorHOC>
  );
};

export default MutualFundsCalculators;
