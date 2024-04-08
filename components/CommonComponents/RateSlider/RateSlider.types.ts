export interface ISliderInput {
  onChange: (e: string) => void;
  min: string;
  max: string;
  step: string;
  minLabel?: string;
  maxLabel?: string;
  middleLabel?: string;
  showMiddleLabel?: boolean;
  defaultValue?: string;
  customValue?: string;
}
