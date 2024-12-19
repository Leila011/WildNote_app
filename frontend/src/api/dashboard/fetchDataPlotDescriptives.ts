import { backendUrl } from "~/db";
import { Level } from "~/types/db";

type Props = {
  level: Level;
  experimentId: number;
};

type DataDescriptivesPlot = Record<string, any>;

const fetchDataPlotDescriptives = async(
  props: Props,
): Promise<DataDescriptivesPlot> =>{
  try {
    const response = await fetch(
      `${backendUrl}/api/experiments/${props.experimentId}/${props.level}/descriptivePlot`,
    );
    if (!response.ok) {
      throw new Error(`Failed to fetch descriptive stat plot for ${props.level}: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

export {
  fetchDataPlotDescriptives as fetchPlotDescriptives,
  type DataDescriptivesPlot as StatDescriptivesPlot,
}
