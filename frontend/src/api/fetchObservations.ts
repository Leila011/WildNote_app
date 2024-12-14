import { backendUrl } from "~/db";
import { ObservationDb } from "~/types/db";

type Props = {
  sampleId: number;
  experimentId: number;
};
export async function fetchObservations(
  props: Props,
): Promise<ObservationDb[]> {
  try {
    const response = await fetch(
      `${backendUrl}/api/experiments/${props.experimentId}/samples/${props.sampleId}/observations/attributeValues`,
    );
    if (!response.ok) {
      throw new Error(`Failed to fetch observations: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}
