import { backendUrl } from "~/db";
import { attributeToDb } from "~/utils/db";
import { TableAttributeValue } from "~/types/db";

export async function addNewSample(
  data: {
    columns: {
      subject: { subject_id: number |null };
    };
    attributes: TableAttributeValue[];
  },
  experimentId: number,
) {
  const cleanData = {
    columns: data.columns,
    attributes: attributeToDb(data.attributes),
  };
  const response = await fetch(
    `${backendUrl}/api/experiment/${experimentId}/newSample`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cleanData),
    },
  );
  if (!response.ok) {
    throw new Error("Failed to add record");
  }
  return response.json();
}
