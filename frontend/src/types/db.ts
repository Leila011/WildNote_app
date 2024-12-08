export type TableAttribute = {
  name: string;
  label: string;
  type: string;
  required: boolean;
  min: number | null;
  max: number | null;
  choices: string[];
  autofill: boolean;
  default_value: any;
  custom: boolean;
};

export type TableAttributeDb = {
  name: string;
  label: string;
  type: string;
  required: number;
  min: number | null;
  max: number | null;
  choices: string;
  autofill: number;
  default_value: any;
  custom: number;
};

export type TableAttributeValue = {
  name: string;
  label: string;
  value: any;
  type: string;
  required: boolean;
  min: number | null;
  max: number | null;
  choices: string[];
  autofill: boolean;
  default_value: any;
  custom: boolean;
};

// export type TableAttributeValue = {
//   [key: string]: any[];
// };

export type Experiment = {
  experiment_id: number;
  name: string;
}

export type Sample = {
sample_id: number;
experiment_id: number;
subject_id: number;
}

export type Subject = {
subject_id: number;
experiment_id: number;
}

export type Observation = {
observation_id: number;
sample_id: string;
}

