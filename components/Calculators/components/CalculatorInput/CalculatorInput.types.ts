export interface ICalculatorInput {
  min: string;
  max: string;
  defaultValue?: string;
  prefix?: string;
  suffix?: string;
  allowDecimal?: boolean;
  customValue?: string;
  onChange?: (e: string) => void;
  allowedDecimal?: number;
}
