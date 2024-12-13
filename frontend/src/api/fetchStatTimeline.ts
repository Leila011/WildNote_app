import { backendUrl } from "~/db";
import { Level, ObservationDb, StatTimeline } from "~/types/db";

type Props = {
  experimentId: number;
  level: Level;
};
export async function fetchStatTimeline(props: Props): Promise<StatTimeline[]> {
  try {
    const response = await fetch(
      `${backendUrl}/api/experiments/${props.experimentId}/${props.level}/timeline`,
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch timeline: ${response.statusText}`);
    }
    console.log("fetchStatTimeline", response);
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}
