import { Attribute, AttributeValue } from "~/types/db";

export function isAttributesValuesValid(attributes: AttributeValue[]): boolean {
  let ready = true;
  attributes.forEach((attribute: AttributeValue) => {
    if (attribute.value === "" && attribute.required) {
      ready = false;
    }
  });
  return ready;
}

export function isColumnsValuesValid(
  columns: Record<string, any>,
  notRequired?: string[],
  notZero?: string[],
): boolean {
  console.log(notRequired);

  let ready = true;
  Object.keys(columns).forEach((column: string) => {
    const isTimeHMSzero =
      typeof columns[column] === "object" &&
      columns[column] !== null &&
      "hours" in columns[column] &&
      "minutes" in columns[column] &&
      "seconds" in columns[column] &&
      columns[column].hours === 0 &&
      columns[column].minutes === 0 &&
      columns[column].seconds === 0;
    const isZero = columns[column] === 0;
    const isZeroAllowed = notZero ? !notZero?.includes(column) : true;
    const isValid =
      columns[column] !== "" &&
      columns[column] !== undefined &&
      !isTimeHMSzero &&
      !(isZero && !isZeroAllowed);
    const isRequired = notRequired ? !notRequired?.includes(column) : true;

    if (!isValid && isRequired) {
      ready = false;
    }
  });
  return ready;
}

export function isAttributesDefValid(attributes: Attribute[]): boolean {
  let ready = true;
  attributes.forEach((attribute: Attribute) => {
    if (attribute.name === "") {
      ready = false;
    }
    if (attribute.choices.includes("")) {
      ready = false;
    }
  });
  return ready;
}
