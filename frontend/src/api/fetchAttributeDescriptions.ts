import { backendUrl } from "~/db";

/**
 * Fetch the schema of a table from the backend
 * @param {string} tableName The name of the table to fetch the schema for
 * @returns {Promise<any>} A promise that resolves to the schema of the table
 * @throws Will throw an error if the fetch operation fails.
 */
export async function fetchAttributeDescriptions(tableName: string, experimentId?: number): Promise<any> {
  try {
    const response = await fetch(`${backendUrl}/api/attributes/${tableName}/experiment_id/${experimentId}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch attributes descriptions: ${response.statusText}`);
    }
    const data: any[] = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}
