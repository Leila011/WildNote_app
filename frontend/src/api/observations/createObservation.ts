import { backendUrl } from "~/db";
import { AttributeValue, ObservationDb } from "~/types/db";
import { createItem } from "../generic/createItem";

type Props = {
  data: { columns: Partial<ObservationDb>; attributes: AttributeValue[] };
  sampleId: number;
};

type Response = {
  observation_id: number;
}

const createObservation = async(props: Props): Promise<Response> => {
  const url = `${backendUrl}/api/sample/${props.sampleId}/newObservation`
  return createItem({ data: props.data, url });
}

export {
  createObservation,
  type Response as CreateObservationResponse,
}
