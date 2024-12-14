import { backendUrl } from "~/db";
import { ExperimentDb } from "~/types/db";

type Props = {
  experimentId: number;
};
export async function fetchExperiment(props: Props): Promise<ExperimentDb> {
  try {
    const response = await fetch(
      `${backendUrl}/api/experiment/${props.experimentId}/attributeValues`,
    );
    if (!response.ok) {
      throw new Error(`Failed to fetch experiment: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}
