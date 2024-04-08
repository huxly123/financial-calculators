import React, { useEffect, useMemo, useState } from 'react';
import CalculatorHOC from '../../CalculatorHOC';
import InputSlider from '../../components/InputSlider';
import CalculatorOutputDetails from '../../components/CalculatorOutputDetails';
import { currencyRepresentation } from '../../../../utils/formatter.helper';
import {
  type TPeriodType,
  getSliderMinMaxPeriod,
  type ISliderMinMaxPeriod,
  convertPeriodtoYear,
  getCompoundFrequency,
  type TCompoundFrequency,
  convertPeriodtoMonths,
} from '../../utils/formatter.helper';
import PillsTab from '../../../CommonComponents/PillsTab';

interface IDepositCalculators {
  calculatorType: 'fixed' | 'recurring';
}

const initalCalculatorInput = {
  deposit: '1000',
  rateOfInterest: '6',
  timePeriod: '1',
  periodType: 'Months',
  compoundingFrequency: 'Yearly',
};

const DepositCalculators: React.FC<IDepositCalculators> = ({
  calculatorType,
}) => {
  const [calculatorInput, setCalculatorInput] = useState(initalCalculatorInput);
  const [calculatorOutput, setCalculatorOutput] = useState({
    invested: '',
    estimatedReturns: '',
    maturity: '',
  });
  const [minMaxVal, setMinMaxVals] = useState<ISliderMinMaxPeriod>({
    min: '0',
    max: '0',
    minLabel: '',
    maxLabel: '',
    suffix: '',
  });
  const radioData = useMemo(() => {
    const options = [
      {
        key: 1,
        label: 'Years',
      },
      {
        key: 2,
        label: 'Months',
      },
    ];

    if (calculatorType === 'fixed') {
      options.push({
        key: 3,
        label: 'Days',
      });
    }

    return options;
  }, [calculatorType]);

  const handleInputChange = (val: string, type: string): void => {
    if (type === 'total_deposit') {
      setCalculatorInput(prev => ({
        ...prev,
        deposit: val,
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
    } else if (type === 'compounding_frequency') {
      setCalculatorInput(prev => ({
        ...prev,
        compoundingFrequency: val,
      }));
    }
  };

  useEffect(() => {
    const deposit = Number(calculatorInput.deposit);
    const rateOfInterest = Number(calculatorInput.rateOfInterest);
    const compoundingFrequency = getCompoundFrequency(
      calculatorInput.compoundingFrequency as TCompoundFrequency,
    );

    if (deposit >= 1000 && rateOfInterest >= 1) {
      if (calculatorType === 'fixed') {
        const timePeriod = convertPeriodtoYear(
          calculatorInput.timePeriod,
          calculatorInput.periodType as TPeriodType,
        );
        const maturity =
          deposit *
          (1 + rateOfInterest / 100 / compoundingFrequency) **
            (compoundingFrequency * timePeriod);
        const estimatedReturns = maturity - deposit;

        setCalculatorOutput({
          invested: deposit.toFixed(0),
          estimatedReturns: estimatedReturns.toFixed(0),
          maturity: maturity.toFixed(0),
        });
      } else if (calculatorType === 'recurring') {
        const timePeriod = convertPeriodtoMonths(
          calculatorInput.timePeriod,
          calculatorInput.periodType as TPeriodType,
        );
        const roiPerQuater = rateOfInterest / 4 / 100;
        const noOfQuaters = timePeriod / 3;
        const maturity =
          (deposit * ((1 + roiPerQuater) ** noOfQuaters - 1)) /
          (1 - (1 + roiPerQuater) ** (-1 / 3));
        const investedAmount = deposit * timePeriod;
        const estimatedReturns = maturity - investedAmount;
        setCalculatorOutput({
          invested: investedAmount.toFixed(0),
          estimatedReturns: estimatedReturns.toFixed(0),
          maturity: maturity.toFixed(0),
        });
      }
    }
  }, [calculatorInput, calculatorType]);

  useEffect(() => {
    const minMaxValues = getSliderMinMaxPeriod(
      '1',
      '25',
      calculatorInput.periodType as TPeriodType,
    );
    setMinMaxVals(minMaxValues);
  }, [calculatorInput.periodType]);
  return (
    <CalculatorHOC>
      <div>
        {/* Deposit Amount */}
        <InputSlider
          title={`${
            calculatorType === 'fixed' ? 'Total Deposit' : 'Monthly Deposit'
          }`}
          defaultValue={initalCalculatorInput.deposit}
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
            handleInputChange(val, 'total_deposit');
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
            data: radioData,
            defaultValue: {
              index: 1,
              label: initalCalculatorInput.periodType,
            },
            onChange: val => {
              handleInputChange(val, 'period_type');
            },
          }}
        />
        {/* Compounding Frequency */}
        {calculatorType === 'fixed' && (
          <div className="flex lg:items-center lg:justify-between max-lg:flex-col max-lg:gap-3 mt-10">
            <p className="text-white font-bold lg:text-base text-sm">
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
              label: 'Invested Amount',
              color: 'text-[#A4A5AB]',
              fontSize: 'lg:text-base text-sm',
              weight: 'font-bold',
            },
            rightTextProps: {
              label: currencyRepresentation(calculatorOutput.invested),
              color: 'text-white',
              fontSize: 'lg:text-base text-sm',
              weight: 'font-bold',
            },
          },
          {
            leftTextProps: {
              label: 'Returns',
              color: 'text-[#A4A5AB]',
              fontSize: 'lg:text-base text-sm',
              weight: 'font-bold',
            },
            rightTextProps: {
              label: currencyRepresentation(calculatorOutput.estimatedReturns),
              color: 'text-white',
              fontSize: 'lg:text-base text-sm',
              weight: 'font-bold',
            },
          },
          {
            leftTextProps: {
              label: `Total Value in ${calculatorInput.timePeriod}${minMaxVal.suffix}`,
              color: 'text-white',
              fontSize: 'lg:text-2xl text-lg',
              weight: 'font-extrabold',
            },
            rightTextProps: {
              label: currencyRepresentation(calculatorOutput.maturity),
              color: 'text-white',
              fontSize: 'lg:text-2xl text-lg',
              weight: 'font-bold',
            },
          },
        ]}
        progressBarProps={{
          leftLabel: 'Deposit',
          rightLabel: 'Returns',
          leftValue: Number(calculatorOutput.invested),
          rightValue: Number(calculatorOutput.estimatedReturns),
        }}
      />
    </CalculatorHOC>
  );
};

export default DepositCalculators;
