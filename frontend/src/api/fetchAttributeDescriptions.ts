import { c } from "vinxi/dist/types/lib/logger";
import { backendUrl } from "~/db";
import { TableAttribute } from "~/types/db";
import { attributeFromDb } from "~/utils/db";

/**
 * Fetch the schema of a table from the backend
 * @param {string} tableName The name of the table to fetch the schema for
 * @returns {Promise<any>} A promise that resolves to the schema of the table
 * @throws Will throw an error if the fetch operation fails.
 */

type props = {
  attributes: TableAttribute[];
  columns: any[];
};
export async function fetchAttributeDescriptions(
  tableName: string,
  experimentId?: number,
): Promise<props> {
  try {
    const response = await fetch(
      `${backendUrl}/api/experiments/${experimentId}/${tableName}/attributes`,
    );
    if (!response.ok) {
      throw new Error(
        `Failed to fetch attributes descriptions: ${response.statusText}`,
      );
    }
    const data = await response.json();
    return {
      attributes: attributeFromDb(data.attributes),
      columns: data.columns,
    };
  } catch (error) {
    throw error;
  }
}
