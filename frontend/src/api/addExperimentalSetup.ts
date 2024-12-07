import { backendUrl } from "~/db";
import { TableAttribute } from "~/types/db";
import { cleanAttributes } from "~/utils/db";

export async function addExperimentalSetup(
  data: TableAttribute[],
  experimentId: number,
  tableName: string,
) {

  const response = await fetch(
    `${backendUrl}/api/experiment/${experimentId}/${tableName}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cleanAttributes(data)),
    },
  );
  if (!response.ok) {
    throw new Error("Failed to add record");
  }
  return response.json();
}
