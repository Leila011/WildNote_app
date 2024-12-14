import { backendUrl } from "~/db";
import { SubjectDb } from "~/types/db";

type Props = {
  experimentId: number;
};

export async function fetchSubjects(props: Props): Promise<SubjectDb[]> {
  try {
    const response = await fetch(
      `${backendUrl}/api/experiments/${props.experimentId}/subjects/attributeValues`,
    );
    if (!response.ok) {
      throw new Error(`Failed to fetch subjects: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}
