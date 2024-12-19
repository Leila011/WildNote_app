import { backendUrl } from "~/db";
import { AttributeDb, Level } from "~/types/db";
import { attributeToDb } from "~/utils/db";

type Props = {
  data: AttributeDb[];
  experimentId: number;
  level: Level;
};

type Response = {
  attributeId: number;
};

export const createItemAttributes = async(props: Props): Promise<Response> =>{
  const response = await fetch(
    `${backendUrl}/api/experiment/${props.experimentId}/${props.level}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(props.data),
    },
  );
  if (!response.ok) {
    throw new Error("Failed to add record");
  }
  return response.json();
}
