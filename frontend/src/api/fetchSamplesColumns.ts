import { backendUrl } from "~/db";
import { SampleDb } from "~/types/db";

type Props = {
  experimentId: number;
};
export async function fetchSamplesColumns(props: Props): Promise<any> {
  try {
    const response = await fetch(
      `${backendUrl}/api/experiments/${props.experimentId}/samples/columnValue`,
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
