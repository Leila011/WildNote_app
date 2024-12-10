import { Attribute, AttributeValue } from "~/types/db";

export function isAttributesValuesValid(
  attributes: AttributeValue[],
): boolean {
  let ready = true;
  attributes.forEach((attribute: AttributeValue) => {
    if (attribute.value === "" && attribute.required) {
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
  });
  return ready;
}
