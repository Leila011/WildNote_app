import { backendUrl } from "~/db";

export async function deleteRow(level: string, row_id: number) {
  const response = await fetch(`${backendUrl}/api/${level}/${row_id}/delete`);
  if (!response.ok) {
    throw new Error("Failed to delete record");
  }
  return response.json();
}
