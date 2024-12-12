import { backendUrl } from "~/db";

export async function fetchExperimentsIdentification(): Promise<{name:string, experiment_id: number}[]> {
  try {
    const response = await fetch(
      `${backendUrl}/api/experiments/identification`,
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
