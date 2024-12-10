import { backendUrl } from "~/db";
import { Experiment } from "~/types/db";

export async function fetchExperiments(): Promise<Experiment[]> {
  try {
    const response = await fetch(
      `${backendUrl}/api/experiments/attributeValues`,
    );
    if (!response.ok) {
      throw new Error(`Failed to fetch experiments: ${response.statusText}`);
    }
    const data: any[] = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}
