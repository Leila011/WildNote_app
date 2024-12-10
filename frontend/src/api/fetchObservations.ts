import { backendUrl } from "~/db";

export async function fetchObservations(props: {
  sampleId: number;
  experimentId: number;
}): Promise<any[]> {
  try {
    const response = await fetch(
      `${backendUrl}/api/experiments/${props.experimentId}/samples/${props.sampleId}/observations/attributeValues`,
    );
    if (!response.ok) {
      throw new Error(`Failed to fetch observations: ${response.statusText}`);
    }
    const data: any[] = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}
