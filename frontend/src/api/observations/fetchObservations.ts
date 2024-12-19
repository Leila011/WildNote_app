import { backendUrl } from "~/db";
import { ObservationDb } from "~/types/db";
import { fetchItems } from "../generic/fetchItems";

type Props = {
  sampleId: number;
  experimentId: number;
};

export const fetchObservations = async(props:Props) : Promise<ObservationDb[]> =>{
  const url = `${backendUrl}/api/experiments/${props.experimentId}/samples/${props.sampleId}/observations/attributeValues`
  return fetchItems({ url });
}

