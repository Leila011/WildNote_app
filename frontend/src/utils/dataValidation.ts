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
): boolean {

  let ready = true;
  Object.keys(columns).forEach((column: string) => {
    const isValid = columns[column] !== "" && columns[column] !== undefined;
    const isRequired = notRequired ? notRequired?.includes(column) : true;
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
