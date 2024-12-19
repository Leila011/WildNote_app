import { backendUrl } from "~/db";
import { Level } from "~/types/db";

type Props = {
  level: Level;
  experimentId: number;
};

type DataPolar = {
  day: {
    keys: number[];
    values: number[];
  };
  night: {
    keys: number[];
    values: number[];
  };
};

const fetchDataPlotPolar = async (props: Props): Promise<DataPolar> => {
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

export {
  fetchDataPlotPolar as fetchPlotPolar,
  type DataPolar as Polar
}
