export type TableAttribute = {
    name: string;
    type: string;
    required?: boolean;
    min?: number;
    max?: number;
    choices?: string[];
    multiple?: boolean;
    example?: string | string[];
  };

  export type TableAttributeValue = {
    [key: string]: any[];
  };