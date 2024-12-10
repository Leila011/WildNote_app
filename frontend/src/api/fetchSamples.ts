import { backendUrl } from "~/db";

export async function fetchSamples(experimentId: number): Promise<any[]> {
  try {
    const response = await fetch(
      `${backendUrl}/api/experiments/${experimentId}/samples/attributeValues`,
    );
    if (!response.ok) {
      throw new Error(`Failed to fetch samples: ${response.statusText}`);
    }
    const data: any[] = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}
