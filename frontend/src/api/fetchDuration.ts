import { backendUrl } from "~/db";
type Props = {
  experimentId: number;
};

export async function fetchDuration(props: Props): Promise<number> {
  try {
    const response = await fetch(
      `${backendUrl}/api/experiments/${props.experimentId}/duration`,
    );
    if (!response.ok) {
      throw new Error(`Failed to fetch duration: ${response.statusText}`);
    }
    const data = await response.json();
    return data[0].duration;
  } catch (error) {
    throw error;
  }
}
