import type { IRadioGroup } from '../../../CommonComponents/RadioGroup/RadioGroup.types';

interface ICalculatorInputProps {
  prefix?: string;
  suffix?: string;
  allowDecimal?: boolean;
  allowedDecimal?: number;
}

interface ISliderInputProps {
  step: string;
  showMiddleLabel?: boolean;
  minLabel?: string;
  middleLabel?: string;
  maxLabel?: string;
}

export interface IInputSlider {
  title: string;
  caculatorInputProps: ICalculatorInputProps;
  inputSliderProps: ISliderInputProps;
  max: string;
  min: string;
  defaultValue: string;
  onChange?: (val: string) => void;
  radioData?: IRadioGroup;
  className?: string;
}
