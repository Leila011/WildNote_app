import { backendUrl } from "~/db";
import { TableAttribute } from "~/types/db";
import { attributeToDb, dataToDb } from "~/utils/db";

export async function addNewExperiment(data: {
  columns: Record<string, any>;
  attributes: TableAttribute[];
}) {
  console.log("addNewExperiment", data);
  const cleanedData = {
    columns: dataToDb(data.columns),
    attributes: attributeToDb(data.attributes),
  };
  const response = await fetch(`${backendUrl}/api/experiment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(cleanedData),
  });
  if (!response.ok) {
    throw new Error("Failed to add record");
  }
  return response.json();
}
