import { backendUrl } from "~/db";
import { SubjectDb } from "~/types/db";
import { fetchItems } from "../generic/fetchItems";

type Props = {
  experimentId: number;
};

export const fetchSubjects = async(props:Props) : Promise<SubjectDb[]> =>{
  const url = `${backendUrl}/api/experiments/${props.experimentId}/subjects/attributeValues`
  return fetchItems({ url });
}

