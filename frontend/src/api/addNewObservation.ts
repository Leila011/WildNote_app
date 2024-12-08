/**
 * Fetches the complete list of samples from the backend for a given experiment id
 * @param id the experiment id
 * @returns {Promise<any[]>} A promise that resolves to an array of sample objects.
 * @throws Will throw an error if the fetch operation fails.
 */

import { backendUrl } from "~/db";
import { attributeToDb } from "~/utils/db";
import { TableAttributeValue } from "~/types/db";

export async function addNewObservation(
  data: {
    columns: {};
    attributes: TableAttributeValue[];
  },
  sampleId: number,
) {
  const cleanData = {
    columns: data.columns,
    attributes: attributeToDb(data.attributes),
  };
  const response = await fetch(
    `${backendUrl}/api/sample/${sampleId}/newObservation`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cleanData),
    },
  );
  if (!response.ok) {
    throw new Error("Failed to add observation");
  }
  return response.json();
}
