import { useNavigate } from "@solidjs/router";
import {
  createEffect,
  createResource,
  createSignal,
  For,
  Show,
} from "solid-js";
import { createStore } from "solid-js/store";
import { fetchAttributeDescriptionsExperiments } from "~/api/fetchAttributeDescriptionsExperiments";
import { Form } from "~/components/Form";
import { Button, buttonVariants } from "~/components/ui/button";
import { AttributeValue, durationHMS, Metadata } from "~/types/db";
import { addNewExperiment } from "~/api/addNewExperiment";
import { Heading } from "~/components/Heading";
import { ToggleGroup, ToggleGroupItem } from "~/components/ui/toggle-group";
import { toggleVariants } from "~/components/ui/toggle";
import {
  isAttributesValuesValid,
  isColumnsValuesValid,
} from "~/utils/dataValidation";
import {
  TextField,
  TextFieldErrorMessage,
  TextFieldInput,
} from "~/components/ui/text-field";
import { toAttributeValue, toSeconds } from "~/utils/db";
import { DurationForm } from "~/components/durationForm";

export default function NewExperiment() {
  const navigate = useNavigate();
  const [data] = createResource<Metadata>(() =>
    fetchAttributeDescriptionsExperiments(),
  );
  const [store, setStore] = createStore<AttributeValue[]>([]);
  const [predefineSubject, setPredefineSubject] = createSignal<boolean>(false);
  const [name, setName] = createSignal<string>("");
  const [hasDuration, setHasDuration] = createSignal<boolean>(true);
  const [duration, setDuration] = createStore<durationHMS>({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const handleSubmit = async () => {
    const dataOut = {
      attributes: store,
      columns: {
        predefine_subject: predefineSubject(),
        name: name(),
        duration: toSeconds(duration),
      },
    };

    const isReady =
      isAttributesValuesValid(dataOut.attributes) &&
      isColumnsValuesValid(dataOut.columns);

    if (isReady) {
      const response = await addNewExperiment({ data: dataOut });
      if (dataOut.columns.predefine_subject) {
        navigate(`/newExperiment/${response.experiment_id}/subjectSetup`);
      } else {
        navigate(`/newExperiment/${response.experiment_id}/sampleSetup`);
      }
    }
  };

  createEffect(() => {
    if (data()) {
      setStore(toAttributeValue(data()!.attributes));
    }
  });

  return (
    <div class="container mx-auto">
      <Heading>New experiment</Heading>

      <div class="flex flex-col space-y-2">
        <div class="border border-primary rounded-md item-center bg-primary/10 p-6">
          <div class="flex flex-col space-y-6 px-5 pb-4">
            <div class="flex flex-row space-x-3 items-baseline">
              <p>Experiment name:</p>
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
            <div class="flex flex-row space-x-3 items-baseline">
              <p>Do you want to predefine subjects?</p>
              <ToggleGroup
                class={`${toggleVariants({ size: "lg", variant: "outline" })}`}
                value={predefineSubject().toString()}
              >
                <For each={["true", "false"]}>
                  {(option) => (
                    <ToggleGroupItem
                      class={`${toggleVariants({ size: "sm" })}`}
                      value={option}
                      onClick={() => {
                        setPredefineSubject(option === "true");
                      }}
                    >
                      {option}
                    </ToggleGroupItem>
                  )}
                </For>
              </ToggleGroup>
            </div>
            <div class="flex flex-row space-x-10">
            <div class="flex flex-row space-x-10 items-baseline">

              <p>Do you want to set a duration for the observation sessions:</p>
              <ToggleGroup
                class={`${toggleVariants({ size: "lg", variant: "outline" })}`}
                value={hasDuration().toString()}
              >
                <For each={["true", "false"]}>
                  {(option) => (
                    <ToggleGroupItem
                      class={`${toggleVariants({ size: "sm" })}`}
                      value={option}
                      onClick={() => {
                        setHasDuration(option === "true");
                      }}
                    >
                      {option}
                    </ToggleGroupItem>
                  )}
                </For>
              </ToggleGroup>
              </div>
              <div class="-m-5">
                <Show when={hasDuration()}>
                  <DurationForm duration={duration} setDuration={setDuration} />
                </Show>
              </div>
            </div>
          </div>
          {store && <Form store={store} setStore={setStore}></Form>}
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
