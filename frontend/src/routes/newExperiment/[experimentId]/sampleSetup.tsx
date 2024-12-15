import { useNavigate, useParams } from "@solidjs/router";
import { createSignal } from "solid-js";
import { createStore } from "solid-js/store";
import { Button, buttonVariants } from "~/components/ui/button";
import { Attribute } from "~/types/db";
import { addExperimentalSetup } from "~/api/addExperimentalSetup";
import { FormNewAttribute } from "~/components/FormNewAttribute";
import { attributeToDb, newAttribute } from "~/utils/db";
import { Heading } from "~/components/Heading";
import { isAttributesDefValid } from "~/utils/dataValidation";

export default function SampleSetup() {
  const params = useParams();
  const navigate = useNavigate();
  const [store, setStore] = createStore<Attribute[]>([{ ...newAttribute }]);

  const handleSubmit = async () => {
    const isReady = isAttributesDefValid(store);

    if (isReady) {
      const reponse = await addExperimentalSetup({
        data: attributeToDb(store),
        experimentId: Number(params.experimentId),
        level: "sample",
      });
      reponse &&
        navigate(`/newExperiment/${params.experimentId}/observationSetup`);
    }
  };

  return (
    <div class="container mx-auto">
      <Heading>New experiment / Observation session's attributes</Heading>
      <div class="flex flex-col space-y-2">
        <div class="border border-primary rounded-md item-center bg-muted">
          <FormNewAttribute store={store} setStore={setStore} />
          <div></div>
        </div>
        <div>
          <Button
            class={buttonVariants({ variant: "accent" })}
            onClick={handleSubmit}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
