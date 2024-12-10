import { backendUrl } from "~/db";
import { AttributeValue, Experiment } from "~/types/db";
import { attributeToDb, columnToDb } from "~/utils/db";

type Props = {
  data: {
    columns: Partial<Experiment>;
    attributes: AttributeValue[];
  };
};

export async function addNewExperiment(props: Props) {
  const cleanedData = {
    columns: columnToDb(props.data.columns),
    attributes: attributeToDb(props.data.attributes),
  };
  const response = await fetch(`${backendUrl}/api/experiment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(cleanedData),
  });
  if (!response.ok) {
    throw new Error("Failed to add record");
  }
  return response.json();
}
