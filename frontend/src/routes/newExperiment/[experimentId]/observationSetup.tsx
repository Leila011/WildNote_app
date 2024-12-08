import { useNavigate, useParams } from "@solidjs/router";
import { createResource } from "solid-js";
import { createStore } from "solid-js/store";
import { fetchAttributeDescriptions } from "~/api/fetchAttributeDescriptions";
import { Button } from "~/components/ui/button";
import { TableAttribute } from "~/types/db";
import { addExperimentalSetup } from "~/api/addExperimentalSetup";
import { FormNewAttribute } from "~/components/FormNewAttribute";
import { newAttribute } from "~/utils/db";
import { updateValue } from "~/api/updateValue";
import { Title } from "~/components/title";
/**
 * A page for setting up a new observation for an experiment
 * It takes as input the predetermined attributes and columns of the sample table
 * It renders a form to fill the name of new attributes and their types
 * It return the sample_id of the new sample and navigates to the observationSetup page
 * @input columns: The columns of the experiment table
 * @input attributes: The predefied attributes of the experiment table
 **/
export default function NewObservation() {
  const params = useParams();
  const navigate = useNavigate();
  const [data] = createResource(() =>
    fetchAttributeDescriptions("observation", Number(params.experimentId)),
  );
  const [store, setStore] = createStore<TableAttribute[]>([
    { ...newAttribute },
  ]);

  const handleSubmit = async () => {
    await addExperimentalSetup(
      [...store],
      Number(params.experimentId),
      "observation",
    );
    await updateValue( "experiment", "status", Number(params.experimentId), "active");
    navigate(`/newExperiment/${params.experimentId}/subjectSetup`);
  };

  return (
    <div>
      <Title>Setup my observation</Title>
      <FormNewAttribute store={store} setStore={setStore} />
      <Button onClick={handleSubmit}>Submit</Button>
    </div>
  );
}
