import { backendUrl } from "~/db";
import { SessionDb } from "~/types/db";
import { fetchItems } from "../generic/fetchItems";

type Props = {
  experimentId: number;
};

export const fetchSessions = async(props:Props) : Promise<SessionDb[]> =>{
  const url =       `${backendUrl}/api/experiments/${props.experimentId}/samples/attributeValues`
  return fetchItems({ url });
}

