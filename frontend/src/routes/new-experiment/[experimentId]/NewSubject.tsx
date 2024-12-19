import { useNavigate, useParams } from "@solidjs/router";
import { createEffect, createResource, createSignal, Show } from "solid-js";
import { createStore } from "solid-js/store";
import { Form } from "~/components/Form";
import { Button, buttonVariants } from "~/components/ui/button";
import { AttributeValue, Metadata } from "~/types/db";
import { Heading } from "~/components/Heading";
import {
  isAttributesValuesValid,
  isColumnsValuesValid,
} from "~/utils/dataValidation";
import {
  TextField,
  TextFieldErrorMessage,
  TextFieldInput,
} from "~/components/ui/text-field";
import { fetchItemMetadata } from "~/api/common/fetchItemMetadata";
import { getTimestamp, toAttributeValue } from "~/utils/db";
import { createSubject } from "~/api/subjects/createSubject";
import NewSubjectForm from "~/components/new-items-form/NewSubjectForm";

export default function NewExperiment() {
  const navigate = useNavigate();
  const params = useParams();
  const [data] = createResource<Metadata>(() =>
    fetchItemMetadata({
      experimentId: Number(params.experimentId),
      level: "subject",
    }),
  );
  const [store, setStore] = createStore<AttributeValue[]>([]);
  const [name, setName] = createSignal<string>("");

  // Insure the button skip is present only for first subject
  const [isFirst, setIsFirst] = createSignal<boolean>(true);
  async function endSubject() {
    const dataOut = {
      attributes: store,
      columns: { name: name(), timestamp_creation: getTimestamp() },
    };

    const isReady =
      isAttributesValuesValid(dataOut.attributes) &&
      isColumnsValuesValid(dataOut.columns);

    if (isReady) {
      const response = createSubject({
        data: dataOut,
        experimentId: Number(params.experimentId),
      });
      return response;
    }
  }
  const handleSubmitToSample = async () => {
    const response = await endSubject();
    response && navigate(`/newExperiment/${params.experimentId}/sampleSetup`);
  };

  const handleSubmitSkip = async () => {
    navigate(`/newExperiment/${params.experimentId}/sampleSetup`);
  };

  const handleSubmitNext = async () => {
    const response = await endSubject();

    if (response) {
      // reset the stores (this vaoid a=having to refetch everything)
      setStore(toAttributeValue(data()!.attributes));
      setName("");
      setIsFirst(false);
      navigate(`/newExperiment/${params.experimentId}/newSubject`);
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
        <NewSubjectForm
          store={store}
          setStore={setStore}
          name={name}
          setName={setName}
        ></NewSubjectForm>
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
          <Show when={isFirst()}>
            <Button
              class={buttonVariants({ variant: "outline" })}
              onClick={handleSubmitSkip}
            >
              Skip
            </Button>
          </Show>
        </div>
      </div>
    </div>
  );
}
