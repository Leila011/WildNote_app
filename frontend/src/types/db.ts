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

export type ExperimentDb = {
  experiment_id: number;
  name: string;
  status: string;
  predefine_subject: boolean;
  timestamp_start: string;
  timestamp_end: string;
  duration: number;
  samples_number_goal: number;
  samples_time_goal: number;
  obs_number_goal: number;
  obs_time_goal: number;
};

export type Experiment = {
  experiment_id: number;
  name: string;
  status: string;
  predefine_subject: boolean;
  timestamp_start: string;
  timestamp_end: string;
  duration: DurationHMS;
  samples_number_goal: number;
  samples_time_goal: DurationHMS;
  obs_number_goal: number;
  obs_time_goal: DurationHMS;
};

export type SampleDb = {
  sample_id: number;
  experiment_id: number;
  subject_id: number | null;
  status: string;
  timestamp_start: string;
  timestamp_end: string;
};

export type SubjectDb = {
  subject_id: number;
  experiment_id: number;
  name: string;
  timestamp_creation: string;
};

export type ObservationDb = {
  observation_id: number;
  sample_id: string;
  status: string;
  timestamp_start: string;
  timestamp_end: string;
};

export type Level = "experiment" | "sample" | "observation" | "subject";

export type StatusExperiment = "draft" | "created" | "active" | "completed";

export type Metadata = {
  attributes: Attribute[];
  schemas: SchemaDb[];
};

export type DurationHMS = {
  hours: number;
  minutes: number;
  seconds: number;
};

export interface ExperimentStats {
  sample_nb: number;
  sample_time_tot: number;
  sample_time_mean: number;
  sample_time_median: number;
  sample_incomplete_nb: number;
  sample_short_nb?: number;
  sample_empty_nb: number;
  obs_nb: number;
  obs_time_tot: number;
  obs_time_mean: number;
  obs_time_median: number;
  obs_incomplete_nb: number;
}

export type StatDescriptives = Record<string, any>;

export type StatDescriptivesPlot = Record<string, any>;

export type StatTimeline = Record<string, StatTimelineItem>;

export type StatTimelineItem = {
  type: "categorical" | "continuous";
  dates: string[];
  data: Record<string, number[]>;
};

export type StatCalendar = {
  year: string;
  series: StatCalendarItem[];
};

export type StatCalendarItem = {
  name: string;
  data: { x: string; y: number }[];
};
export type StatPolar = {
  day: {
    keys: number[];
    values: number[];
  };
  night: {
    keys: number[];
    values: number[];
  };
};
