
import { backendUrl } from "~/db";

export async function fetchSubjects(experimentId: number): Promise<any[]> {
  try {
    const response = await fetch(
      `${backendUrl}/api/experiments/${experimentId}/subjects/attributeValues`,
    );
    if (!response.ok) {
      throw new Error(`Failed to fetch subjects: ${response.statusText}`);
    }
    const data: any[] = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}
