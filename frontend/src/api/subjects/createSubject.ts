import { backendUrl } from "~/db";
import { AttributeValue, SubjectDb } from "~/types/db";
import { createItem } from "../generic/createItem";

type Props = {
  data: { columns: Partial<SubjectDb>; attributes: AttributeValue[] };
  experimentId: number;
};

type Response = {
  subject_id: number;
}

const createSubject = async(props: Props): Promise<Response> => {
  const url = `${backendUrl}/api/experiment/${props.experimentId}/newSubject`
  return createItem({ data: props.data, url });
}

export {
  createSubject,
  type Response as CreateSubjectResponse,
}
