import { useNavigate, useParams } from "@solidjs/router";
import { createSignal } from "solid-js";
import { createStore } from "solid-js/store";
import { Button, buttonVariants } from "~/components/ui/button";
import { Attribute } from "~/types/db";
import { addExperimentalSetup } from "~/api/addExperimentalSetup";
import { FormNewAttribute } from "~/components/FormNewAttribute";
import { newAttribute } from "~/utils/db";
import { Heading } from "~/components/Heading";
import { isAttributesDefValid } from "~/utils/dataValidation";

export default function SubjectSetup() {
  const params = useParams();
  const navigate = useNavigate();
  const [ready, setReady] = createSignal<boolean>(false);
  const [store, setStore] = createStore<Attribute[]>([
    { ...newAttribute },
  ]);

  const handleSubmit = async () => {
    setReady(isAttributesDefValid(store));

    if (ready()) {
      addExperimentalSetup({ data: [...store], experimentId: Number(params.experimentId), level: "subject" });

      navigate(`/newExperiment/${params.experimentId}/sampleSetup`);
    }
  };

  return (
    <div class="container mx-auto">
      <Heading>New experiment / Subjects</Heading>
      <div class="flex flex-col space-y-2">
        <div class="border border-primary rounded-md item-center bg-primary/10">
          <FormNewAttribute store={store} setStore={setStore} />
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
