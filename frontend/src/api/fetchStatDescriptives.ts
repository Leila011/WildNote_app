import { backendUrl } from "~/db";
import { Level, StatDescriptives } from "~/types/db";

type Props = {
  level: Level;
  experimentId: number;
};
export async function fetchStatDescriptives(
  props: Props,
): Promise<StatDescriptives> {
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
