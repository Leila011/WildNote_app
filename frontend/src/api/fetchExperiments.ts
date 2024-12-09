import { backendUrl } from "~/db";
import { Experiment } from "~/types/db";

/**
 * Fetch the complete list of experiments from the backend
 * @returns
 * @returns {Promise<any[]>} A promise that resolves to an array of Experiment objects.
 * @throws Will throw an error if the fetch operation fails.
 */

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
