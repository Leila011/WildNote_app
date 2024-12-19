import { backendUrl } from "~/db";
import { Level } from "~/types/db";

type Props = {
  level: Level;
  row_id: number;
};

export const deleteItem = async(props: Props): Promise<string> =>{
  const response = await fetch(
    `${backendUrl}/api/${props.level}/${props.row_id}/delete`,
  );
  if (!response.ok) {
    throw new Error("Failed to delete record");
  }
  return response.json();
}
