import { backendUrl } from "~/db";

type Props = {
  level: string;
  column_name: string;
  row_id: number;
  value: any;
};

export async function updateValue(props: Props) {
  const response = await fetch(
    `${backendUrl}/api/updateValue/${props.level}/${props.column_name}/${props.row_id}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(props.value),
    },
  );
  if (!response.ok) {
    throw new Error("Failed to add record");
  }
  return response.json();
}
