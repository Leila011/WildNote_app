import { useNavigate, useParams } from "@solidjs/router";
import { createEffect, createResource, createSignal } from "solid-js";
import { createStore } from "solid-js/store";
import { Form } from "~/components/Form";
import { Button, buttonVariants } from "~/components/ui/button";
import { AttributeValue, Metadata } from "~/types/db";
import { Heading } from "~/components/Heading";
import { isAttributesValuesValid, isColumnsValuesValid } from "~/utils/dataValidation";
import {
  TextField,
  TextFieldErrorMessage,
  TextFieldInput,
} from "~/components/ui/text-field";
import { fetchAttributeDescriptions } from "~/api/fetchAttributeDescriptions";
import { getTimestamp, toAttributeValue } from "~/utils/db";
import { addNewSubject } from "~/api/addNewSubject";

export default function NewExperiment() {
  const navigate = useNavigate();
  const params = useParams();
  const [data] = createResource<Metadata>(() => fetchAttributeDescriptions({
    experimentId: Number(params.experimentId),
    level: "subject"}));
  const [store, setStore] = createStore<AttributeValue[]>([]);
  const [name, setName] = createSignal<string>("");

  async function endSubject() {
    
    const dataOut = {
      attributes: store,
      columns: { name: name(),
        timestamp_creation: getTimestamp(),
       },
    };

    const isReady = isAttributesValuesValid(dataOut.attributes) && isColumnsValuesValid(dataOut.columns)

    if(isReady) {
    const response = addNewSubject({ data: dataOut, experimentId: Number(params.experimentId) });
    return response;
    }
  }
  const handleSubmitToSample = async () => {
    const response  = await endSubject()
    response && navigate(`/newExperiment/${params.experimentId}/sampleSetup`);
  };

  const handleSubmitNext = async () => {
    const response = await endSubject()

    if(response){
    // reset the stores (this vaoid a=having to refetch everything)
    setStore(toAttributeValue(data()!.attributes));
    navigate(`/newExperiment/${params.experimentId}/subjectSetup`);
    }
  };

  createEffect(() => {
    if (data()) {
      setStore(toAttributeValue(data()!.attributes));
    }
  });

  return (
    <div class="container mx-auto">
      <Heading>New experiment / New Subject</Heading>

      <div class="flex flex-col space-y-2">
        <div class="border border-primary rounded-md item-center bg-primary/10 p-6">
          <div class="flex flex-col space-y-6 px-5 pb-4">
            <div class="flex flex-row space-x-3 items-baseline">
              <p>Subject name:</p>
              <TextField
                value={name()}
                onChange={(e: any) => {
                  setName(e);
                }}
                validationState={name() !== "" && name() ? "valid" : "invalid"}
              >
                <TextFieldInput
                  type={"text"}
                  class={`border border-secondary bg-card text-card-foreground h-10 rounded-md pl-2 w-full`}
                />
                <TextFieldErrorMessage>
                  This parameter is required, a value must be given.
                </TextFieldErrorMessage>
              </TextField>
            </div>
          </div>
          {store && <Form store={store} setStore={setStore}></Form>}
        </div>
        <div class="flex flex-row space-x-1">
        <Button
            class={buttonVariants({ variant: "accent" })}
            onClick={handleSubmitNext}
          >
            Add another subject
          </Button>
          <Button
            class={buttonVariants({ variant: "outline" })}
            onClick={handleSubmitToSample}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
