export type TPeriodType = 'Years' | 'Months' | 'Days';
export type TCompoundFrequency = 'Yearly' | 'Half Yearly' | 'Quarterly';
export interface ISliderMinMaxPeriod {
  min: string;
  max: string;
  minLabel: string;
  maxLabel: string;
  suffix: string;
}

export const getSliderMinMaxPeriod = (
  minYear: string,
  maxYear: string,
  periodType: TPeriodType,
  convertFromValue?: boolean,
): ISliderMinMaxPeriod => {
  const result = {
    min: '0',
    max: '0',
    minLabel: '',
    maxLabel: '',
    suffix: '',
  };
  if (periodType === 'Years') {
    result.suffix = 'Yr';
    result.min = minYear;
    result.max = maxYear;
    result.minLabel = `${minYear}Y`;
    result.maxLabel = `${maxYear}Y`;
  } else if (periodType === 'Months') {
    result.suffix = 'M';
    result.min = '1';
    result.minLabel = '1M';
    if (!convertFromValue) {
      result.max = '11';
      result.maxLabel = '11M';
    } else {
      result.max = String(Number(maxYear) * 12);
      result.maxLabel = `${Number(maxYear) * 12}M`;
    }
  } else if (periodType === 'Days') {
    result.suffix = 'D';
    result.min = '1';
    result.max = '31';
    result.minLabel = '1D';
    result.maxLabel = '31D';
  }
  return result;
};

export const convertPeriodtoYear = (
  val: string,
  periodType: TPeriodType,
): number => {
  if (periodType === 'Years') return Number(val);
  if (periodType === 'Months') return Number(val) / 12;
  if (periodType === 'Days') return Number(val) / 365;
  return 0;
};

export const convertPeriodtoMonths = (
  val: string,
  periodType: TPeriodType,
): number => {
  if (periodType === 'Years') return Number(val) * 12;
  if (periodType === 'Months') return Number(val);
  return 0;
};

export const getCompoundFrequency = (type: TCompoundFrequency): number => {
  switch (type) {
    case 'Yearly':
      return 1;
    case 'Half Yearly':
      return 2;
    case 'Quarterly':
      return 4;
    default:
      return 0;
  }
};
