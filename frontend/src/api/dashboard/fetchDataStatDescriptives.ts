import { backendUrl } from "~/db";
import { Level } from "~/types/db";

type Props = {
  level: Level;
  experimentId: number;
};

type DataStatDescriptives = Record<string, any>;

const fetchDataStatDescriptives = async (
  props: Props,
): Promise<DataStatDescriptives> => {
  try {
    const response = await fetch(
      `${backendUrl}/api/experiments/${props.experimentId}/${props.level}/descriptiveStat`,
    );
    if (!response.ok) {
      throw new Error(
        `Failed to fetch observations stat: ${response.statusText}`,
      );
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

export {
  fetchDataStatDescriptives as fetchStatDescriptives,
  type DataStatDescriptives
}
