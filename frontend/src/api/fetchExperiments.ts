import { backendUrl } from "~/db";
import { ExperimentDb } from "~/types/db";

export async function fetchExperiments(): Promise<ExperimentDb[]> {
  try {
    const response = await fetch(
      `${backendUrl}/api/experiments/attributeValues`,
    );
    if (!response.ok) {
      throw new Error(`Failed to fetch experiments: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}
