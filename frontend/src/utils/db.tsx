import { TableAttribute } from "~/types/db";

export function cleanAttributes(attributes: TableAttribute[]) {
  
     const cleanAttributes = attributes.map((attribute) => {
      const newAttribute = {
        ...attribute,
        choices: attribute.choices.join("|"),
      };
      return newAttribute;
    })
    return cleanAttributes;
}