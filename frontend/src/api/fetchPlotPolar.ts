import { backendUrl } from "~/db";
import { Level, StatPolar } from "~/types/db";

type Props = {
  level: Level;
  experimentId: number;
};
export async function fetchPlotPolar(
  props: Props,
): Promise<StatPolar> {
  try {
    const response = await fetch(
      `${backendUrl}/api/experiment/${props.experimentId}/${props.level}/polarPlot`,
    );
    if (!response.ok) {
      throw new Error(`Failed to fetch samples stat: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}
