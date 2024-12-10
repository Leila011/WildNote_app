import {
  Attribute,
  AttributeDb,
  AttributeValue,
  AttributeValueDb,
  DurationHMS,
} from "~/types/db";

export function columnToDb(data: Record<string, any>): Record<string, any> {
  const cleanData: Record<string, any> = {};
  Object.entries(data).forEach(([key, value]) => {
    cleanData[key] = typeof value === "boolean" ? (value ? 1 : 0) : value;
    cleanData[key] = value === undefined ? null : value;
  });
  return cleanData;
}

export function ExperimentToDb(data: Record<string, any>): Record<string, any> {
  const cleanData = data;
  cleanData["duration"] = toSeconds(data.duration);
  cleanData["samples_time_goal"] = toSeconds(data.duration);
  cleanData["obs_time_goal"] = toSeconds(data.duration);
  return cleanData;
}

export function attributeToDb(
  attributes: Attribute[] | AttributeValue[],
): AttributeDb[] | AttributeValueDb[] {
  const cleanAttributes = attributes.map((attribute) => {
    const newAttribute = {
      ...attribute,
      choices:
        attribute.choices && attribute.choices.length
          ? attribute.choices.join("|")
          : null,
      autofill: attribute.autofill ? 1 : 0,
      custom: attribute.custom ? 1 : 0,
      required: attribute.required ? 1 : 0,
      min: attribute.min === undefined ? null : attribute.min,
      max: attribute.max === undefined ? null : attribute.max,
      default_value:
        attribute.default_value === undefined ? null : attribute.default_value,
    };
    return newAttribute;
  });
  return cleanAttributes;
}

export function attributeFromDb(attributes: AttributeDb[]): Attribute[] {
  const cleanAttributes = attributes.map((attribute) => {
    const newAttribute = {
      ...attribute,
      choices: attribute.choices ? attribute.choices.split("|") : [],
      autofill: attribute.autofill === 1,
      custom: attribute.custom === 1,
      required: attribute.required === 1,
      min: attribute.min === null ? undefined : attribute.min,
      max: attribute.max === null ? undefined : attribute.max,
      default_value:
        attribute.default_value === null ? undefined : attribute.default_value,
    };
    return newAttribute;
  });
  return cleanAttributes;
}

export const newAttribute: Attribute = {
  name: "",
  label: "",
  type: "string",
  autofill: false,
  min: undefined,
  max: undefined,
  choices: [],
  default_value: undefined,
  custom: true,
  required: false,
};

export const statusOptions = [
  { value: "draft", label: "Draft" },
  { value: "active", label: "Active" },
  { value: "completed", label: "Completed" },
];

export function getTimestamp(): string {
  const formattedDate = new Date().toISOString().slice(0, 19).replace("T", " ");

  return formattedDate;
}

export function toAttributeValue(attributes: Attribute[]): AttributeValue[] {
  return attributes.map(
    (attribute: Attribute) =>
      ({
        ...attribute,
        value: "",
      }) as AttributeValue,
  );
}

export function toSeconds(duration: DurationHMS): number {
  return duration.hours * 3600 + duration.minutes * 60 + duration.seconds;
}
