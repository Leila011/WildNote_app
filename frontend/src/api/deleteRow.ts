/**
 * Fetches the complete list of samples from the backend for a given experiment id
 * @param id the experiment id
 * @returns {Promise<any[]>} A promise that resolves to an array of sample objects.
 * @throws Will throw an error if the fetch operation fails.
 */

import { backendUrl } from "~/db";

export async function deleteRow(level: string, row_id: number) {
  const response = await fetch(`${backendUrl}/api/${level}/${row_id}/delete`);
  if (!response.ok) {
    throw new Error("Failed to delete record");
  }
  return response.json();
}
