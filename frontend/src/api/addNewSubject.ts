import { backendUrl } from "~/db";
import { attributeToDb, columnToDb } from "~/utils/db";
import { AttributeValue, SubjectDb } from "~/types/db";

type Props = {
  data: { columns: Partial<SubjectDb>; attributes: AttributeValue[] };
  experimentId: number;
};

export async function addNewSubject(props: Props) {
  const cleanData = {
    columns: columnToDb(props.data.columns),
    attributes: attributeToDb(props.data.attributes),
  };
  const response = await fetch(
    `${backendUrl}/api/experiment/${props.experimentId}/newSubject`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cleanData),
    },
  );
  if (!response.ok) {
    throw new Error("Failed to add new subject");
  }
  return response.json();
}
