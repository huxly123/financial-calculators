import { type FunctionComponent } from 'react';

// custom components
import EmiCalculators from './EMICalculators';
import InterestCalculators from './InterestCalculators';
import MutualFundsCalculators from './MutualFundsCalculators';
import DepositCalculators from './DepositCalculators';
import FlatInterestCalculators from './FlatInterestCalculator';
import CAGRCalculator from './CagrCalculator';
import InflationCalculator from './InflationCalculator';
import GratuityCalculator from './GratuityCalculator';
import PPFCalculator from './PpfCalculator';
import GSTCalculator from './GstCalculator';
import NPSCalculator from './NpsCalculator';
import SSYCalculator from './SsyCalculator';
import NSCCalculator from './NscCalculator';

const SimpleInterestCalculator: React.FunctionComponent = () => (
  <InterestCalculators calculatorType="simple" />
);

const CompoundInterestCalculator: React.FunctionComponent = () => (
  <InterestCalculators calculatorType="compound" />
);

const MutualFundsCalculator: React.FunctionComponent = () => (
  <MutualFundsCalculators calculatorType="mutual_funds" />
);

const LumpSumCalculator: React.FunctionComponent = () => (
  <MutualFundsCalculators calculatorType="lumpsum" />
);

const SipCalculator: React.FunctionComponent = () => (
  <MutualFundsCalculators calculatorType="sip" />
);

const FixedDepositCalculator: React.FunctionComponent = () => (
  <DepositCalculators calculatorType="fixed" />
);

const RecurringDepositCalculator: React.FunctionComponent = () => (
  <DepositCalculators calculatorType="recurring" />
);

const AllCalculators = {
  'EMI calculator': EmiCalculators,
  'Home Loan EMI calculator': EmiCalculators,
  'Car Loan EMI Calculator': EmiCalculators,
  'Simple Interest Calculator': SimpleInterestCalculator,
  'Compound Interest Calculator': CompoundInterestCalculator,
  'Mutual Funds Calculator': MutualFundsCalculator,
  'Lumpsum Calculator': LumpSumCalculator,
  'SIP Calculator': SipCalculator,
  'Fixed Deposit Calculator': FixedDepositCalculator,
  'Recurring Deposit Calculator': RecurringDepositCalculator,
  'Flat Interest Calculator': FlatInterestCalculators,
  'CAGR Calculator': CAGRCalculator,
  'Inflation Calculator': InflationCalculator,
  'Gratuity Calculator': GratuityCalculator,
  'PPF Calculator': PPFCalculator,
  'GST Calculator': GSTCalculator,
  'NPS Calculator': NPSCalculator,
  'SSY Calculator': SSYCalculator,
  'NSC Calculator': NSCCalculator,
};

export type CalculatorType = keyof typeof AllCalculators;

const CurrentCalculator = (
  calculator: CalculatorType,
): FunctionComponent<any> | null => {
  if (calculator) return AllCalculators[calculator] ?? null;
  return null;
};

export default CurrentCalculator;
