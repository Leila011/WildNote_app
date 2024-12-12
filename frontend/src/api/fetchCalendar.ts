import { backendUrl } from "~/db";
import { ExperimentDb } from "~/types/db";

type Props = {
  experimentId: number;
};
export async function fetchCalendar(props: Props): Promise<any> {
  try {
    const response = await fetch(
      `${backendUrl}/api/experiment/${props.experimentId}/calendar`,
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
