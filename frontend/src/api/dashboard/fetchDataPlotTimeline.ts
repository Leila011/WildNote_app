import { backendUrl } from "~/db";
import { Level } from "~/types/db";

type Props = {
  experimentId: number;
  level: Level;
};

type DataPlotTimeline = Record<string, DataPlotTimelineItem>;

type DataPlotTimelineItem = {
  type: "categorical" | "continuous";
  dates: string[];
  data: Record<string, number[]>;
};

const fetchDataPlotTimeline = async (props: Props): Promise<DataPlotTimeline[]> => {
  try {
    const response = await fetch(
      `${backendUrl}/api/experiments/${props.experimentId}/${props.level}/timeline`,
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch timeline: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

export {
  fetchDataPlotTimeline,
  type DataPlotTimeline,
  type DataPlotTimelineItem,
}
