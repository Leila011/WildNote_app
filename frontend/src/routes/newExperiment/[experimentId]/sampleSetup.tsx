import { useNavigate, useParams } from "@solidjs/router";
import { createResource, createSignal } from "solid-js";
import { createStore } from "solid-js/store";
import { fetchAttributeDescriptions } from "~/api/fetchAttributeDescriptions";
import { Button, buttonVariants } from "~/components/ui/button";
import { TableAttribute } from "~/types/db";
import { addExperimentalSetup } from "~/api/addExperimentalSetup";
import { FormNewAttribute } from "~/components/FormNewAttribute";
import { newAttribute } from "~/utils/db";
import { Heading } from "~/components/Heading";
import { isAttributesDefValid } from "~/utils/dataValidation";

export default function SampleSetup() {
  const params = useParams();
  const navigate = useNavigate();
  const [ready, setReady] = createSignal<boolean>(false);
  const [store, setStore] = createStore<TableAttribute[]>([
    { ...newAttribute },
  ]);

  const handleSubmit = async () => {

    setReady(isAttributesDefValid(store));
    
    if(ready()) {
    addExperimentalSetup([...store], Number(params.experimentId), "sample");
    navigate(`/newExperiment/${params.experimentId}/observationSetup`);
    }
  };

  return (
    <div class="container mx-auto">
      <Heading>New experiment / Observation sessions</Heading>
      <div class="flex flex-col space-y-2">
        <div class="border border-primary rounded-md item-center bg-primary/10">
          <FormNewAttribute store={store} setStore={setStore} />
          <div></div>
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
