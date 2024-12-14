import { backendUrl } from "~/db";
import { attributeToDb, columnToDb } from "~/utils/db";
import { AttributeValue, ObservationDb } from "~/types/db";

type Props = {
  data: { columns: Partial<ObservationDb>; attributes: AttributeValue[] };
  sampleId: number;
};

export async function addNewObservation(props: Props) {
  const cleanData = {
    columns: columnToDb(props.data.columns),
    attributes: attributeToDb(props.data.attributes),
  };
  const response = await fetch(
    `${backendUrl}/api/sample/${props.sampleId}/newObservation`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cleanData),
    },
  );
  if (!response.ok) {
    throw new Error("Failed to add observation");
  }
  return response.json();
}
