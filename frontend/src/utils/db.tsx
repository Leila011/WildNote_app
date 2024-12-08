import { TableAttribute, TableAttributeDb } from "~/types/db";

export function attributeToDb(attributes: TableAttribute[]) {
  const cleanAttributes = attributes.map((attribute) => {
    const newAttribute = {
      ...attribute,
      choices: attribute.choices.join("|"),
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
