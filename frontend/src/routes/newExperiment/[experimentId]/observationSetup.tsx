import { useNavigate, useParams } from "@solidjs/router";
import { createSignal } from "solid-js";
import { createStore } from "solid-js/store";
import { Button, buttonVariants } from "~/components/ui/button";
import { Attribute } from "~/types/db";
import { addExperimentalSetup } from "~/api/addExperimentalSetup";
import { FormNewAttribute } from "~/components/FormNewAttribute";
import { newAttribute } from "~/utils/db";
import { updateValue } from "~/api/updateValue";
import { Heading } from "~/components/Heading";
import { isAttributesDefValid } from "~/utils/dataValidation";

export default function ObservationSetup() {
  const params = useParams();
  const navigate = useNavigate();
  const [ready, setReady] = createSignal<boolean>(false);

  const [store, setStore] = createStore<Attribute[]>([
    { ...newAttribute },
  ]);

  const handleSubmit = async () => {
    setReady(isAttributesDefValid(store));

    if (ready()) {
      await addExperimentalSetup({
        data: store,
        experimentId: Number(params.experimentId),
        level: "observation",
      });
      await updateValue(
        { level: "observation", 
          column_name: "status", 
          row_id: Number(params.experimentId), 
          value: "active" }
      );
      navigate(`/`);
    }
  };

  const handleSubmitStart = async () => {
    setReady(isAttributesDefValid(store));

    if (ready()) {
      await addExperimentalSetup({
        data: store,
        experimentId: Number(params.experimentId),
        level: "observation",
      });
      await updateValue(
        { level: "observation", column_name: "status", row_id: Number(params.experimentId), value: "active" }
      );
      navigate(`/encoding/experiment/${params.experimentId}`);
    }
  };

  return (
    <div class="container mx-auto">
      <Heading>New experiment / Observations</Heading>
      <div class="flex flex-col space-y-2">
        <div class="border border-primary rounded-md item-center bg-primary/10">
          <FormNewAttribute store={store} setStore={setStore} />
        </div>
        <div class="flex flex-row space-x-1">
          <Button
            class={buttonVariants({ variant: "accent" })}
            onClick={handleSubmitStart}
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
