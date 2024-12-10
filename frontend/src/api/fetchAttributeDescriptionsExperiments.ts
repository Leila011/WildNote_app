import { backendUrl } from "~/db";
import { AttributeDb, Metadata, SchemaDb } from "~/types/db";
import { attributeFromDb } from "~/utils/db";

type RawData = {
  attributes: AttributeDb[];
  schemas: SchemaDb[];
};

export async function fetchAttributeDescriptionsExperiments(): Promise<Metadata> {
  try {
    const response = await fetch(`${backendUrl}/api/experiments/attributes`);
    if (!response.ok) {
      throw new Error(
        `Failed to fetch attributes descriptions: ${response.statusText}`,
      );
    }
    const rawData: RawData = await response.json();
    const formattedData = {
      attributes: attributeFromDb(rawData.attributes),
      schemas: rawData.schemas,
    };
    return formattedData;
  } catch (error) {
    throw error;
  }
}
