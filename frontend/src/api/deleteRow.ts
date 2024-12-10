import { backendUrl } from "~/db";
import { Level } from "~/types/db";

type Props = {
  level: Level;
  row_id: number;
};
export async function deleteRow(props: Props) {
  const response = await fetch(
    `${backendUrl}/api/${props.level}/${props.row_id}/delete`,
  );
  if (!response.ok) {
    throw new Error("Failed to delete record");
  }
  return response.json();
}
