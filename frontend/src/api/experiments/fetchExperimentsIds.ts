import { backendUrl } from "~/db";
import { StatusExperiment } from "~/types/db";

export async function fetchExperimentsIds(): Promise<
  { name: string; experiment_id: number; status: StatusExperiment }[]
> {
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
