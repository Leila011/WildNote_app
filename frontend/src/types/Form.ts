export type TableAttribute = {
    name: string;
    type: string;
    value?: any;
    typeJS?: string;
    required?: boolean;
    min?: number;
    max?: number;
    choices?: string[];
    multiple?: boolean;
    example?: string | string[];
    autofill?: boolean;
  };

  export type TableAttributeValue = {
    [key: string]: any[];
  };