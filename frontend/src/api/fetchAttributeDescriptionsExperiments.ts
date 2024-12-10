import { backendUrl } from "~/db";

export async function fetchAttributeDescriptionsExperiments(): Promise<any> {
  try {
    const response = await fetch(`${backendUrl}/api/experiments/attributes`);
    if (!response.ok) {
      throw new Error(
        `Failed to fetch attributes descriptions: ${response.statusText}`,
      );
    }
    const data: any[] = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}
