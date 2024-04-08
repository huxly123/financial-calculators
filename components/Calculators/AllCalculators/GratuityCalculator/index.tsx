import React, { useEffect, useState } from 'react';
import CalculatorHOC from '../../CalculatorHOC';
import InputSlider from '../../components/InputSlider';
import CalculatorOutputDetails from '../../components/CalculatorOutputDetails';
import { currencyRepresentation } from '../../../../utils/formatter.helper';

const initalCalculatorInput = {
  monthlySalary: '50000',
  yearsOfService: '5',
};

const GratuityCalculator: React.FC = () => {
  const [calculatorInput, setCalculatorInput] = useState(initalCalculatorInput);
  const [calculatorOutput, setCalculatorOutput] = useState({
    gratuity: '',
    salaryReceived: '',
  });

  const handleInputChange = (val: string, type: string): void => {
    if (type === 'monthly_salary') {
      setCalculatorInput(prev => ({
        ...prev,
        monthlySalary: val,
      }));
    } else if (type === 'years_of_service') {
      setCalculatorInput(prev => ({
        ...prev,
        yearsOfService: val,
      }));
    }
  };

  useEffect(() => {
    const monthlySalary = Number(calculatorInput.monthlySalary);
    const yearsOfService = Number(calculatorInput.yearsOfService);
    if (monthlySalary >= 10000 && yearsOfService >= 1) {
      const gratuity = (yearsOfService * monthlySalary * 15) / 26;
      const salaryReceived = monthlySalary * yearsOfService * 12;
      setCalculatorOutput({
        gratuity: gratuity.toFixed(0),
        salaryReceived: salaryReceived.toFixed(2),
      });
    }
  }, [calculatorInput]);

  return (
    <CalculatorHOC>
      <div>
        {/* Monthly Salary (Basic + DA) */}
        <InputSlider
          title="Monthly Salary (Basic + DA)"
          defaultValue={initalCalculatorInput.monthlySalary}
          min="10000"
          max="10000000"
          inputSliderProps={{
            step: '1000',
            minLabel: '10K',
            maxLabel: '1Cr',
          }}
          caculatorInputProps={{
            allowDecimal: false,
            prefix: '₹',
          }}
          onChange={val => {
            handleInputChange(val, 'monthly_salary');
          }}
        />
        {/* Years of Service */}
        <InputSlider
          title="Years of Service"
          defaultValue={initalCalculatorInput.yearsOfService}
          min="5"
          max="50"
          inputSliderProps={{
            step: '1',
            minLabel: '5Y',
            maxLabel: '50Y',
          }}
          caculatorInputProps={{
            allowDecimal: false,
            suffix: 'Yr',
          }}
          className="mt-10"
          onChange={val => {
            handleInputChange(val, 'years_of_service');
          }}
        />
      </div>
      <CalculatorOutputDetails
        calculatorTextProps={[
          {
            leftTextProps: {
              label: `Gratuity After ${calculatorInput.yearsOfService} Years`,
              color: 'text-white',
              fontSize: 'lg:text-2xl text-lg',
              weight: 'lg:font-extrabold font-bold',
            },
            rightTextProps: {
              label: currencyRepresentation(calculatorOutput.gratuity),
              color: 'text-white',
              fontSize: 'lg:text-2xl text-lg',
              weight: 'lg:font-extrabold font-bold',
            },
          },
        ]}
        progressBarProps={{
          leftLabel: 'Salary Received',
          rightLabel: 'Gratuity',
          leftValue: Number(calculatorOutput.salaryReceived),
          rightValue: Number(calculatorOutput.gratuity),
        }}
      />
    </CalculatorHOC>
  );
};

export default GratuityCalculator;
