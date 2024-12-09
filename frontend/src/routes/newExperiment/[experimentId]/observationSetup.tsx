import { useNavigate, useParams } from "@solidjs/router";
import { createResource } from "solid-js";
import { createStore } from "solid-js/store";
import { fetchAttributeDescriptions } from "~/api/fetchAttributeDescriptions";
import { Button, buttonVariants } from "~/components/ui/button";
import { TableAttribute } from "~/types/db";
import { addExperimentalSetup } from "~/api/addExperimentalSetup";
import { FormNewAttribute } from "~/components/FormNewAttribute";
import { newAttribute } from "~/utils/db";
import { updateValue } from "~/api/updateValue";
import { Heading } from "~/components/Heading";
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
    await updateValue(
      "experiment",
      "status",
      Number(params.experimentId),
      "active",
    );
    navigate(`/newExperiment/${params.experimentId}/subjectSetup`);
  };

  return (
    <div class="container mx-auto">
      <Heading>New experiment / Observations</Heading>
      <div class="flex flex-col space-y-2">
        <div class="border border-primary rounded-md item-center bg-primary/10">
          <FormNewAttribute store={store} setStore={setStore} />
        </div>
        <div>
          <Button
            class={buttonVariants({ variant: "accent" })}
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
}
