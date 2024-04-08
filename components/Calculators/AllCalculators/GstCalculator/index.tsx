import React, { useEffect, useState } from 'react';
import CalculatorHOC from '../../CalculatorHOC';
import InputSlider from '../../components/InputSlider';
import CalculatorOutputDetails from '../../components/CalculatorOutputDetails';
import { currencyRepresentation } from '../../../../utils/formatter.helper';

const initalCalculatorInput = {
  gstType: 'Excluding GST',
  totalAmount: '10000',
  taxSlab: '12',
};

const GSTCalculator: React.FC = () => {
  const [calculatorInput, setCalculatorInput] = useState(initalCalculatorInput);
  const [calculatorOutput, setCalculatorOutput] = useState({
    totalGst: '',
    gstAmount: '',
  });

  const handleInputChange = (val: string, type: string): void => {
    if (type === 'total_amount') {
      setCalculatorInput(prev => ({
        ...prev,
        totalAmount: val,
      }));
    } else if (type === 'tax_slab') {
      setCalculatorInput(prev => ({
        ...prev,
        taxSlab: val,
      }));
    } else if (type === 'gst_type') {
      setCalculatorInput(prev => ({
        ...prev,
        gstType: val,
      }));
    }
  };

  useEffect(() => {
    const { gstType } = calculatorInput;
    const totalAmount = Number(calculatorInput.totalAmount);
    const taxSlab = Number(calculatorInput.taxSlab);
    if (totalAmount >= 5000 && taxSlab >= 1) {
      if (gstType === 'Including GST') {
        const preGst = totalAmount / (taxSlab / 100 + 1);
        const totalGst = totalAmount - preGst;
        setCalculatorOutput({
          totalGst: totalGst.toFixed(0),
          gstAmount: preGst.toFixed(0),
        });
      } else {
        const totalGst = totalAmount * (taxSlab / 100);
        const postGst = totalAmount + totalGst;
        setCalculatorOutput({
          totalGst: totalGst.toFixed(0),
          gstAmount: postGst.toFixed(0),
        });
      }
    }
  }, [calculatorInput]);

  return (
    <CalculatorHOC>
      <div>
        {/* Total Amount */}
        <InputSlider
          title="Total Amount"
          defaultValue={initalCalculatorInput.totalAmount}
          min="5000"
          max="500000"
          inputSliderProps={{
            step: '1000',
            minLabel: '5K',
            maxLabel: '5L',
          }}
          caculatorInputProps={{
            allowDecimal: false,
            prefix: '₹',
          }}
          onChange={val => {
            handleInputChange(val, 'total_amount');
          }}
          radioData={{
            data: [
              {
                key: 1,
                label: 'Excluding GST',
              },
              {
                key: 2,
                label: 'Including GST',
              },
            ],
            defaultValue: {
              index: 0,
              label: 'Excluding GST',
            },
            onChange: val => {
              handleInputChange(val, 'gst_type');
            },
          }}
        />
        {/* Tax Slab */}
        <InputSlider
          title="Tax Slab"
          defaultValue={initalCalculatorInput.taxSlab}
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
            handleInputChange(val, 'tax_slab');
          }}
        />
      </div>
      <CalculatorOutputDetails
        calculatorTextProps={[
          {
            leftTextProps: {
              label: 'Total GST',
              color: 'text-white',
              fontSize: 'lg:text-2xl text-lg',
              weight: 'lg:font-extrabold font-bold',
            },
            rightTextProps: {
              label: currencyRepresentation(calculatorOutput.totalGst),
              color: 'text-white',
              fontSize: 'lg:text-2xl text-lg',
              weight: 'lg:font-extrabold font-bold',
            },
          },
          {
            leftTextProps: {
              label:
                calculatorInput.gstType === 'Including GST'
                  ? 'Pre GST Amount'
                  : 'Post GST Amount',
              color: 'text-white',
              fontSize: 'lg:text-2xl text-lg',
              weight: 'lg:font-extrabold font-bold',
            },
            rightTextProps: {
              label: currencyRepresentation(calculatorOutput.gstAmount),
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

export default GSTCalculator;
