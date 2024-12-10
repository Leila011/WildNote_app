import { createEffect, createResource, createSignal } from "solid-js";
import { Button, buttonVariants } from "~/components/ui/button";
import { Attribute, AttributeValue, Metadata } from "~/types/db";
import { fetchAttributeDescriptions } from "~/api/fetchAttributeDescriptions";
import { Form } from "~/components/Form";
import { createStore } from "solid-js/store";
import { useNavigate, useParams } from "@solidjs/router";
import { addNewObservation } from "~/api/addNewObservation";
import { updateValue } from "~/api/updateValue";
import { Heading } from "~/components/Heading";
import { getTimestamp, toAttributeValue } from "~/utils/db";
import { isAttributesValuesValid, isColumnsValuesValid } from "~/utils/dataValidation";

export default function EncodingObservation() {
  const navigate = useNavigate();
  const params = useParams();
  const [timestamp_start, setTimestamp_start] = createSignal(getTimestamp());

  const [data] = createResource<Metadata>(() =>
    fetchAttributeDescriptions({
      experimentId: Number(params.experimentId),
      level: "observation",
    })
  );

  const [store, setStore] = createStore<AttributeValue[]>([]);

  createEffect(() => {
    if (data()) {
      setStore( toAttributeValue(data()!.attributes));
    }
  });

  const endObservation = async () => {
    const dataOut = {
      columns: {
        status: "completed",
        timestamp_start: timestamp_start(),
        timestamp_end: getTimestamp(),
      },
      attributes: store,
    };
    const isReady = isAttributesValuesValid(dataOut.attributes) && isColumnsValuesValid(dataOut.columns)

    if(isReady) {
    const response = await addNewObservation({data:dataOut, sampleId:Number(params.sampleId)});
    setTimestamp_start(getTimestamp());
    return response;
    }
  };

  const endSample = async () => {
    await updateValue({level:"sample", column_name:"status", row_id:Number(params.sampleId), value:"completed"});
    await updateValue({level:"sample", column_name:"timestamp_end", row_id:Number(params.sampleId), value:getTimestamp()});
  };

  const handleSubmitNext = async () => {
    
    const response = await endObservation();

    if(response){
    // reset the stores (this vaoid a=having to refetch everything)
    setStore(toAttributeValue(data()!.attributes));

    navigate(
      `/encoding/experiment/${params.experimentId}/sample/${params.sampleId}`,
    );
  }
  };

  const handleSubmitNextSample = async () => {
    const response = await endObservation();
    if(response){
    await endSample();
    navigate(`/encoding/experiment/${params.experimentId}`);
    }
  };

  const handleSubmitEnd = async () => {
    const response = await endObservation();
    if(response){
    await endSample();
    navigate(`/`);
    }
  };

  return (
    <div class="container mx-auto">
      <div>
        <Heading>Start encoding your new observation</Heading>
        <div class="flex flex-col space-y-2">
          <div class="border border-primary rounded-md item-center bg-primary/10">
            {store.length && <Form store={store} setStore={setStore}></Form>}
          </div>

          <div class="flex flex-row space-x-2">
            <Button
              class={buttonVariants({ variant: "accent" })}
              onClick={handleSubmitNext}
            >
              Next observation
            </Button>
            <Button
              class={buttonVariants({ variant: "outline" })}
              onClick={handleSubmitNextSample}
            >
              Next observation session
            </Button>
            <Button
              class={buttonVariants({ variant: "outline" })}
              onClick={handleSubmitEnd}
            >
              Stop observation session and return home
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
