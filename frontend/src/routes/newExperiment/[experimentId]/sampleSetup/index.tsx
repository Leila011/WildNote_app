import { useNavigate, useParams } from "@solidjs/router";
import { createEffect, createResource, createSignal } from "solid-js";
import { createStore } from "solid-js/store";
import { fetchAttributeDescriptions } from "~/api/fetchAttributeDescriptions";
import { Form } from "~/components/Form";
import { Button } from "~/components/ui/button";
import { TableAttribute } from "~/types/Form";
import { sqlToJsType } from "~/utils/typeConvertion";
import { addSampleSetup } from "~/api/addSampleSetup";
import { FormNewAttribute } from "~/components/FormNewAttribute";
import { newAttribute } from "~/utils/newAttribute";
/**
 * A page for setting up a new sample for an experiment
 * It takes as input the predetermined attributes and columns of the sample table
 * It renders a form to fill the name of new attributes and their types
 * It return the sample_id of the new sample and navigates to the observationSetup page
 * @input columns: The columns of the experiment table
 * @input attributes: The predefied attributes of the experiment table
 * @output The sample_id of the new sample
 **/
export default function NewSample() {
  const params = useParams();
  const navigate = useNavigate();
  const [data] = createResource(() =>
    fetchAttributeDescriptions("sample", Number(params.experimentId)),
  );
  const [store, setStore] = createStore<TableAttribute[]>([
 {...newAttribute} 
  ]);

  const handleSubmit = async () => {
    console.log(store);
    const response = await addSampleSetup(
      [...store],
      Number(params.experimentId),
    );
    navigate(
      `/newExperiment/${params.experiment_id}/sample/${response.sample_id}/observationSetup`,
    );
  };

  createEffect(() => {
    if (data()) {
      const attributesAugmented = data().attributes.map(
        (attribute: TableAttribute) =>
          ({
            ...attribute,
            typeJS: sqlToJsType(attribute.type),
            value: "",
          }) as TableAttribute,
      );
    }
  });

  return (
    <div>
      <FormNewAttribute store={store} setStore={setStore} />
      <Button onClick={handleSubmit}>Submit</Button>
    </div>
  );
}
