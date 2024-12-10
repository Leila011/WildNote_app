import { backendUrl } from "~/db";
import { Attribute, Level } from "~/types/db";
import { attributeToDb } from "~/utils/db";

type Props = {
  data: Attribute[];
  experimentId: number;
  level: Level;
};
export async function addExperimentalSetup(props: Props) {
  const response = await fetch(
    `${backendUrl}/api/experiment/${props.experimentId}/${props.level}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(attributeToDb(props.data)),
    },
  );
  if (!response.ok) {
    throw new Error("Failed to add record");
  }
  return response.json();
}
