export type TableAttribute = {
  name: string;
  label: string;
  type: string;
  value?: any;
  typeJS?: string;
  required?: boolean;
  min?: number;
  max?: number;
  choices?: string[];
  autofill?: boolean;
  default?: any;
  custom?: boolean;
};

export type TableAttributeValue = {
  [key: string]: any[];
};
