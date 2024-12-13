import { backendUrl } from "~/db";
import { ExperimentStats } from "~/types/db";

type Props = {
  experimentId: number;
};
export async function fetchStatExperiment(
  props: Props,
): Promise<ExperimentStats> {
  try {
    const response = await fetch(
      `${backendUrl}/api/experiment/${props.experimentId}/stat`,
    );
    if (!response.ok) {
      throw new Error(
        `Failed to fetch stat experiment: ${response.statusText}`,
      );
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}
