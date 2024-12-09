import { useNavigate, useParams } from "@solidjs/router";
import { createEffect, createResource } from "solid-js";
import { createStore } from "solid-js/store";
import { fetchAttributeDescriptions } from "~/api/fetchAttributeDescriptions";
import { Button, buttonVariants } from "~/components/ui/button";
import { TableAttribute } from "~/types/db";
import { addExperimentalSetup } from "~/api/addExperimentalSetup";
import { FormNewAttribute } from "~/components/FormNewAttribute";
import { newAttribute } from "~/utils/db";
import { Heading } from "~/components/Heading";
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
    fetchAttributeDescriptions("subject", Number(params.experimentId)),
  );
  const [store, setStore] = createStore<TableAttribute[]>([
    { ...newAttribute },
  ]);

  const handleSubmit = async () => {
    addExperimentalSetup([...store], Number(params.experimentId), "subject");

    navigate(`/`);
  };

  return (
    <div class="container mx-auto">
      <Heading>New experiment / Subjects</Heading>
      <div class="flex flex-col space-y-2">
        <div class="border border-primary rounded-md item-center bg-primary/10">
          <FormNewAttribute store={store} setStore={setStore} />
        </div>
        <div class="flex flex-row space-x-1">
          <Button
            class={buttonVariants({ variant: "accent" })}
            onClick={handleSubmit}
          >
            Submit and start encoding
          </Button>
          <Button
            class={buttonVariants({ variant: "outline" })}
            onClick={handleSubmit}
          >
            Submit and go back home
          </Button>
        </div>
      </div>
    </div>
  );
}
