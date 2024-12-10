import {
  TableAttribute,
  TableAttributeDb,
  TableAttributeValue,
} from "~/types/db";

export function dataToDb(data: Record<string, any>): Record<string, any> {
  const cleanData: Record<string, any> = {};
  Object.entries(data).forEach(([key, value]) => {
    cleanData[key] = typeof value === "boolean" ? (value ? 1 : 0) : value;
  });
  return cleanData;
}

export function attributeToDb(attributes: TableAttribute[]) {
  const cleanAttributes = attributes.map((attribute) => {
    const newAttribute = {
      ...attribute,
      choices: attribute.choices.join("|"),
      autofill: attribute.autofill ? 1 : 0,
      custom: attribute.custom ? 1 : 0,
      required: attribute.required ? 1 : 0,
    };
    return newAttribute;
  });
  return cleanAttributes;
}

export function attributeFromDb(
  attributes: TableAttributeDb[],
): TableAttribute[] {
  const cleanAttributes = attributes.map((attribute) => {
    const newAttribute = {
      ...attribute,
      choices: attribute.choices ? attribute.choices.split("|") : [],
      autofill: attribute.autofill === 1,
      custom: attribute.custom === 1,
      required: attribute.required === 1,
    };
    return newAttribute;
  });
  return cleanAttributes;
}

export const newAttribute: TableAttribute = {
  name: "",
  label: "",
  type: "string",
  autofill: false,
  min: null,
  max: null,
  choices: [],
  default_value: null,
  custom: true,
  required: false,
};

export const statusOptions = [
  { value: "draft", label: "Draft" },
  { value: "active", label: "Active" },
  { value: "completed", label: "Completed" },
];

export function getTimestamp(): string 
{
  const formattedDate = new Date().toISOString().slice(0, 19).replace('T', ' ');

  return formattedDate;
}
