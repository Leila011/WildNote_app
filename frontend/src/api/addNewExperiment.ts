import { backendUrl } from "~/db";

export async function addNewExperiment(data: Record<string, any>) {
  const response = await fetch(`${backendUrl}/api/experiment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error("Failed to add record");
  }
  return response.json();
}
