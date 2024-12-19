import { backendUrl } from "~/db";
import { AttributeValue, ExperimentDb } from "~/types/db";
import { createItem } from "~/api/generic/createItem";

type Props = {
  data: {
    columns: Partial<ExperimentDb>;
    attributes: AttributeValue[];
  };
};

type Response = {
  experiment_id: number;
}

const createExperiment = async(props: Props): Promise<Response> => {
  const url = `${backendUrl}/api/experiment`
  return createItem({ data: props.data, url });
}

export {
  createExperiment,
  type Response as CreateExperimentResponse,
}
