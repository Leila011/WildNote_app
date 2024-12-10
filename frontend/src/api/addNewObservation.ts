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
