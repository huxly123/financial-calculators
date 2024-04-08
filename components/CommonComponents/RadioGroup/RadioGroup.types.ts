export interface IRadioGroupData {
  key: string | number;
  label: string;
}

interface IRadioDefaultProps {
  index: number;
  label: string;
}

export interface IRadioGroup {
  data: IRadioGroupData[];
  defaultValue?: IRadioDefaultProps;
  onChange?: (label: string) => void;
}
