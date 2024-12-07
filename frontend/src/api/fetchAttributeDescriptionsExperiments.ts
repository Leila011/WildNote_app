import { backendUrl } from "~/db";

/**
 * Fetch the schema of a table from the backend
 * @param {string} tableName The name of the table to fetch the schema for
 * @returns {Promise<any>} A promise that resolves to the schema of the table
 * @throws Will throw an error if the fetch operation fails.
 */
export async function fetchAttributeDescriptionsExperiments(): Promise<any> {
  try {
    const response = await fetch(`${backendUrl}/api/attributes/experiments`);
    if (!response.ok) {
      throw new Error(
        `Failed to fetch attributes descriptions: ${response.statusText}`,
      );
    }
    const data: any[] = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}
