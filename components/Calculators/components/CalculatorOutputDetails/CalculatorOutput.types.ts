import type { IProgressBar } from '../ProgressBar/ProgressBar.types';

export interface ICalculatorTextProps {
  label: string;
  color: string;
  weight: string;
  fontSize: string;
}

export interface ICalculatorText {
  leftTextProps: ICalculatorTextProps;
  rightTextProps: ICalculatorTextProps;
}

export interface ICalculatorOutputDetails {
  progressBarProps?: IProgressBar;
  calculatorTextProps: ICalculatorText[];
}
