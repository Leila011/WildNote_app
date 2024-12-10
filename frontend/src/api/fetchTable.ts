import { backendUrl } from "~/db";

export async function fetchTable(level: string): Promise<any[]> {
  try {
    const response = await fetch(`${backendUrl}/api/${level}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch table ${level}: ${response.statusText}`);
    }
    const data: any[] = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}
