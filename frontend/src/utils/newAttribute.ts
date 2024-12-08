import { TableAttribute } from "~/types/db";

export const newAttribute: TableAttribute = {
  name: "",
  label: "",
  type: "",
  autofill: false,
  min: null,
  max: null,
  choices: [],
  default_value: null,
  custom: true,
  required: false,
};
