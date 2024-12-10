
import { backendUrl } from "~/db";

export async function addAttributeValue(
  level: string,
  attribute_id: string,
  item_id: number,
  value: any,
) {
  const response = await fetch(
    `${backendUrl}/api/updateAttributeValue/${level}/${attribute_id}/${item_id}`,
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
