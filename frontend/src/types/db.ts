export type Attribute = {
  name: string;
  label: string;
  type: string;
  required: boolean;
  min?: number;
  max?: number;
  choices: string[];
  autofill: boolean;
  default_value?: any;
  custom: boolean;
};

export type AttributeDb = {
  name: string;
  label: string;
  type: string;
  required: number;
  min: number | null;
  max: number | null;
  choices: string | null;
  autofill: number;
  default_value: any;
  custom: number;
};

export type AttributeValue = {
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

export type AttributeValueDb = {
  name: string;
  label: string;
  value: any;
  type: string;
  required: number;
  min: number | null;
  max: number | null;
  choices: string;
  autofill: number;
  default_value: any;
  custom: number;
};

export type SchemaDb = {
  cid: number;
  dflt_value: any;
  name: string;
  notnull: number; // boolean
  pk: string; // primary key - boolean
  type: string;
};

export type Experiment = {
  experiment_id: number;
  name: string;
  status: string;
  predefine_subject: boolean;
  timestamp_start: string;
  timestamp_end: string;
  duration: number;
};

export type Sample = {
  sample_id: number;
  experiment_id: number;
  subject_id?: number;
  status: string;
  timestamp_start: string;
  timestamp_end: string;
};

export type Subject = {
  subject_id: number;
  experiment_id: number;
  name: string;
  timestamp_creation: string;
};

export type Observation = {
  observation_id: number;
  sample_id: string;
  status: string;
  timestamp_start: string;
  timestamp_end: string;
};

export type Level = "experiment" | "sample" | "observation" | "subject";

export type Metadata = {
  attributes: Attribute[];
  schemas: SchemaDb[];
};

export type durationHMS = {
  hours: number;
  minutes: number;
  seconds: number;
};
