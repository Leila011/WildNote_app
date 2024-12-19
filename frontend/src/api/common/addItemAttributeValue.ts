import { backendUrl } from "~/db";
import { Level } from "~/types/db";

type Props = {
  level: Level;
  attribute_id: string;
  item_id: number;
  value: any;
};

type Response = {
  attributeValueId: number;
};

export const addItemAttributeValue = async(props: Props): Promise<Response> =>{
  const response = await fetch(
    `${backendUrl}/api/updateAttributeValue/${props.level}/${props.attribute_id}/${props.item_id}`,
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
