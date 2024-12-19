import { useNavigate, useParams } from "@solidjs/router";
import { createSignal } from "solid-js";
import { createStore } from "solid-js/store";
import { Button, buttonVariants } from "~/components/ui/button";
import { Attribute } from "~/types/db";
import { addExperimentalSetup } from "~/api/addExperimentalSetup";
import { FormNewAttribute } from "~/components/FormNewAttribute";
import { attributeToDb, newAttribute } from "~/utils/db";
import { updateValue } from "~/api/updateValue";
import { Heading } from "~/components/Heading";
import { isAttributesDefValid } from "~/utils/dataValidation";

export default function ObservationSetup() {
  const params = useParams();
  const navigate = useNavigate();
  const [store, setStore] = createStore<Attribute[]>([{ ...newAttribute }]);

  const handleSubmit = async (destination: string) => {
    const isReady = isAttributesDefValid(store);

    if (isReady) {
      await addExperimentalSetup({
        data: attributeToDb(store),
        experimentId: Number(params.experimentId),
        level: "observation",
      });
      await updateValue({
        level: "experiment",
        column_name: "status",
        row_id: Number(params.experimentId),
        value: "created",
      });
      if (destination === "encoding") {
        navigate(`/encoding/experiment/${params.experimentId}`);
      } else if (destination === "home") {
        navigate(`/`);
      }
    }
  };

  return (
    <div class="container mx-auto">
      <Heading>New experiment / Observation's attributes</Heading>
      <div class="flex flex-col space-y-2">
        <div class="border border-primary rounded-md item-center bg-muted">
          <FormNewAttribute store={store} setStore={setStore} />
        </div>
        <div class="flex flex-row space-x-1">
          <Button
            class={buttonVariants({ variant: "accent" })}
            onClick={() => handleSubmit("encoding")}
          >
            Submit and start encoding
          </Button>
          <Button
            class={buttonVariants({ variant: "outline" })}
            onClick={() => handleSubmit("home")}
          >
            Submit and go back home
          </Button>
        </div>
      </div>
    </div>
  );
}
