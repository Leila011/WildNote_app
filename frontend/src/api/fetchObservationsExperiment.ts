import { backendUrl } from "~/db";
import { ObservationDb } from "~/types/db";

type Props = {
  experimentId: number;
};
export async function fetchObservationsExperiment(
  props: Props,
): Promise<any> {
  try {
    const response = await fetch(`${backendUrl}/api/experiments/${props.experimentId}/observations/columnValue`);

    if (!response.ok) {
      throw new Error(`Failed to fetch observations: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}
