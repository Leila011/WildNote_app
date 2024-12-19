import { backendUrl } from "~/db";

type Props = {
  experimentId: number;
};

type DataOverview = {
  sample_nb: number;
  sample_time_tot: number;
  sample_time_mean: number;
  sample_time_median: number;
  sample_incomplete_nb: number;
  sample_short_nb?: number;
  sample_empty_nb: number;
  obs_nb: number;
  obs_time_tot: number;
  obs_time_mean: number;
  obs_time_median: number;
  obs_incomplete_nb: number;
}

const fetchDataOverview = async (
  props: Props,
): Promise<DataOverview> => {
  try {
    const response = await fetch(
      `${backendUrl}/api/experiment/${props.experimentId}/stat`,
    );
    if (!response.ok) {
      throw new Error(
        `Failed to fetch stat experiment: ${response.statusText}`,
      );
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

export {
  fetchDataOverview as fetchStatExperiment,
  type DataOverview,
}


