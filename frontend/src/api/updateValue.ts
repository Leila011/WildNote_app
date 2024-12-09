/**
 * Fetches the complete list of samples from the backend for a given experiment id
 * @param id the experiment id
 * @returns {Promise<any[]>} A promise that resolves to an array of sample objects.
 * @throws Will throw an error if the fetch operation fails.
 */

import { backendUrl } from "~/db";

export async function updateValue(
  level: string,
  column_name: string,
  row_id: number,
  value: any,
) {
  const response = await fetch(
    `${backendUrl}/api/updateValue/${level}/${column_name}/${row_id}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(value),
    },
  );
  if (!response.ok) {
    throw new Error("Failed to add record");
  }
  return response.json();
}