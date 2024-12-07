import { backendUrl } from "~/db";

export async function addExperimentalSetup(
  data: Record<string, any>,
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
      body: JSON.stringify(data),
    },
  );
  if (!response.ok) {
    throw new Error("Failed to add record");
  }
  return response.json();
}
