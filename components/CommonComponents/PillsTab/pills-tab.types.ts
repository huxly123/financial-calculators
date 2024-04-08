export interface IPillsData {
  key: string | number;
  label: string;
}

interface IPillsDefaultValueProps {
  index: number;
  label: string;
}
export interface IPillsTab {
  data: IPillsData[];
  isSpacedBetween?: boolean;
  pillRadius?: string;
  isBgTransparent?: boolean;
  onChange?: (label: string, index: number) => void;
  defaultValue?: IPillsDefaultValueProps;
  className?: string;
}
