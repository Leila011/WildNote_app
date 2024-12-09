import { TableAttribute, TableAttributeValue } from "~/types/db";

export function isAttributesValuesValid(attributes: TableAttributeValue[]): boolean {
    let ready = true;
    attributes.forEach((attribute: TableAttributeValue) => {
      if (attribute.value === "" && attribute.required) {
        ready = false;
      }
    });
    return ready;
  }

export function isAttributesDefValid(attributes: TableAttribute[]): boolean {
    let ready = true;
    attributes.forEach((attribute: TableAttribute) => {
      if (attribute.name === "") {
        ready = false;
      }
    });
    return ready;
}