import { backendUrl } from "~/db";

export async function fetchColumns(table_name: string): Promise<any> {
  try {
    const response = await fetch(
      `${backendUrl}/api/columnNames/<${table_name}>`,
    );
    if (!response.ok) {
      throw new Error(
        `Failed to fetch columns descriptions: ${response.statusText}`,
      );
    }
    const data: any[] = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}
