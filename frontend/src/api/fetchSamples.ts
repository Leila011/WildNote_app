import { backendUrl } from "~/db";
import { SampleDb } from "~/types/db";

type Props = {
  experimentId: number;
};
export async function fetchSamples(props: Props): Promise<SampleDb[]> {
  try {
    const response = await fetch(
      `${backendUrl}/api/experiments/${props.experimentId}/samples/attributeValues`,
    );
    if (!response.ok) {
      throw new Error(`Failed to fetch samples: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}
