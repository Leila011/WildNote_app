import { backendUrl } from "~/db";
import { AttributeValue, SessionDb } from "~/types/db";
import { createItem } from "../generic/createItem";

type Props = {
  data: {
    columns: Partial<SessionDb>;
    attributes: AttributeValue[];
  };
  experimentId: number;
};

type Response = {
  session_id: number;
}

const createSession = async(props: Props): Promise<Response> => {
  const url = `${backendUrl}/api/experiment/${props.experimentId}/newSample`

  return createItem({ data: props.data, url });
}

export {
  createSession,
  type Response as CreateSessionResponse,
}
