import { backendUrl } from "~/db";
import { attributeToDb, columnToDb } from "~/utils/db";
import { AttributeValue, SampleDb } from "~/types/db";

type Props = {
  data: {
    columns: Partial<SampleDb>;
    attributes: AttributeValue[];
  };
  experimentId: number;
};

export async function addNewSample(props: Props) {
  const cleanData = {
    columns: columnToDb(props.data.columns),
    attributes: attributeToDb(props.data.attributes),
  };
  const response = await fetch(
    `${backendUrl}/api/experiment/${props.experimentId}/newSample`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cleanData),
    },
  );
  if (!response.ok) {
    throw new Error("Failed to add record");
  }
  return response.json();
}
