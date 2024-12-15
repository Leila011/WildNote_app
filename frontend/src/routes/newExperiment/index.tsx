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
import { AttributeValue, DurationHMS as DurationHMS } from "~/types/db";
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
import { columnToDb, ExperimentToDb, toAttributeValue } from "~/utils/db";
import {
  NumberField,
  NumberFieldDecrementTrigger,
  NumberFieldIncrementTrigger,
  NumberFieldInput,
} from "~/components/ui/number-field";
import { Experiment, Metadata } from "~/types/db";
import { DurationForm } from "~/components/durationForm";

export default function NewExperiment() {
  const navigate = useNavigate();
  const [data] = createResource<Metadata>(() =>
    fetchAttributeDescriptionsExperiments(),
  );
  const [experiment, setExperiment] = createStore<Partial<Experiment>>({
    name: "",
    predefine_subject: false,
    duration: { hours: 0, minutes: 0, seconds: 0 },
    samples_number_goal: 0,
    samples_time_goal: { hours: 0, minutes: 0, seconds: 0 },
    obs_number_goal: 0,
    obs_time_goal: { hours: 0, minutes: 0, seconds: 0 },
    status: "created",
  });

  const [attributes, setAttributes] = createStore<AttributeValue[]>([]);
  createEffect(() => {
    if (data()) {
      setAttributes(toAttributeValue(data()!.attributes));
    }
  });

  const [hasDuration, setHasDuration] = createSignal<boolean>(true);
  const [hasSampleGoal, setHasSampleGoal] = createSignal<boolean>(true);
  const [hasObservationGoal, setHasObservationGoal] =
    createSignal<boolean>(true);


  const getNotRequired = () => {
    const notRequired = []
    if (!hasDuration()) {
      notRequired.push("duration")
    }
    if (!hasSampleGoal()) {
      notRequired.push("samples_number_goal")
      notRequired.push("samples_time_goal")
    }
    if (!hasObservationGoal()) {
      notRequired.push("obs_number_goal")
      notRequired.push("obs_time_goal")
    }
    return notRequired;
  }
  const handleSubmit = async () => {
    setExperiment("timestamp_start", new Date().toISOString());
    setExperiment("status", "created");

    const dataOut = {
      attributes: attributes,
      columns: columnToDb(ExperimentToDb(experiment)),
    };

    const notRequired = getNotRequired()
    const notZero = ["duration", "samples_time_goal", "obs_time_goal, samples_number_goal, obs_number_goal"]

    const isReady =
      isAttributesValuesValid(dataOut.attributes) &&
      isColumnsValuesValid(dataOut.columns, notRequired, notZero);
    if (isReady) {
      const response = await addNewExperiment({ data: dataOut });
      if (dataOut.columns.predefine_subject) {
        navigate(`/newExperiment/${response.experiment_id}/subjectSetup`);
      } else {
        navigate(`/newExperiment/${response.experiment_id}/sampleSetup`);
      }
    }
  };

  return (
    <div class="container mx-auto">
      <Heading>New experiment</Heading>

      <div class="flex flex-col space-y-4">
        <div class="border border-primary rounded-md item-center bg-muted p-6">
          <div class="flex flex-col space-y-8 px-5 pb-4">
            <div class="flex flex-row space-x-3 items-baseline">
              <p>Experiment name:</p>
              <TextField
                value={experiment.name}
                onChange={(e: any) => {
                  setExperiment("name", e);
                }}
                validationState={
                  experiment.name !== "" && experiment.name
                    ? "valid"
                    : "invalid"
                }
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
              <p>Do you want to define reusable subjects?</p>
              <ToggleGroup
                class={`${toggleVariants({ size: "lg", variant: "outline" })}`}
                value={experiment.predefine_subject!.toString()}
              >
                <For each={["true", "false"]}>
                  {(option) => (
                    <ToggleGroupItem
                      class={`${toggleVariants({ size: "sm" })}`}
                      value={option}
                      onClick={() => {
                        setExperiment("predefine_subject", option === "true");
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
                <p>
                  Do you want to set a target duration for the observation
                  sessions?
                </p>
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
                  <DurationForm
                    duration={experiment.duration!}
                    setDuration={(
                      key: Partial<keyof DurationHMS>,
                      value: number,
                    ) => setExperiment("duration", key, value)}
                  />
                </Show>
              </div>
            </div>
            <div class="flex flex-row space-x-10 pt-16">
              <div class="flex flex-row space-x-10 items-baseline">
                <p>Do you want to set goals for the observation sessions?</p>
                <ToggleGroup
                  class={`${toggleVariants({ size: "lg", variant: "outline" })}`}
                  value={hasSampleGoal().toString()}
                >
                  <For each={["true", "false"]}>
                    {(option) => (
                      <ToggleGroupItem
                        class={`${toggleVariants({ size: "sm" })}`}
                        value={option}
                        onClick={() => {
                          setHasSampleGoal(option === "true");
                        }}
                      >
                        {option}
                      </ToggleGroupItem>
                    )}
                  </For>
                </ToggleGroup>
              </div>

              <div class="-m-5 items-end">
                <Show when={hasObservationGoal()}>
                  <div class="flex flex-row space-x-24 -mt-7">
                    <div class="flex flex-col space-x-1 items-center">
                      <p class="pb-6">Number of observation sessions</p>
                      <NumberField
                        rawValue={experiment.samples_number_goal}
                        onRawValueChange={(e: any) => {
                          const value = Number.isNaN(e) ? null : e;
                          setExperiment("samples_number_goal", value);
                        }}
                        minValue={0}
                      >
                        <div class="relative">
                          <NumberFieldInput
                            class={`border border-secondary bg-card text-card-foreground h-10 rounded-md pl-2 w-full`}
                          />
                          <NumberFieldIncrementTrigger />
                          <NumberFieldDecrementTrigger />
                        </div>
                      </NumberField>
                    </div>
                    <div class="flex flex-col space-x-1 items-center">
                      <p>Cumulative observation session time</p>
                      <DurationForm
                        duration={experiment.samples_time_goal!}
                        setDuration={(
                          key: Partial<keyof DurationHMS>,
                          value: number,
                        ) => setExperiment("samples_time_goal", key, value)}
                      />
                    </div>
                  </div>
                </Show>
              </div>
            </div>
            <div class="flex flex-row space-x-10 pt-16">
              <div class="flex flex-row space-x-10 items-baseline">
                <p>Do you want to set goals for the observations?</p>
                <ToggleGroup
                  class={`${toggleVariants({ size: "lg", variant: "outline" })}`}
                  value={hasObservationGoal().toString()}
                >
                  <For each={["true", "false"]}>
                    {(option) => (
                      <ToggleGroupItem
                        class={`${toggleVariants({ size: "sm" })}`}
                        value={option}
                        onClick={() => {
                          setHasObservationGoal(option === "true");
                        }}
                      >
                        {option}
                      </ToggleGroupItem>
                    )}
                  </For>
                </ToggleGroup>
              </div>

              <div class="-m-5 items-end">
                <Show when={hasObservationGoal()}>
                  <div class="flex flex-row space-x-24 -mt-7">
                    <div class="flex flex-col space-x-1 items-center">
                      <p class="pb-6">Number of observations</p>
                      <NumberField
                        rawValue={experiment.obs_number_goal}
                        onRawValueChange={(e: any) => {
                          const value = Number.isNaN(e) ? null : e;
                          setExperiment("obs_number_goal", value);
                        }}
                        minValue={0}
                      >
                        <div class="relative">
                          <NumberFieldInput
                            class={`border border-secondary bg-card text-card-foreground h-10 rounded-md pl-2 w-full`}
                          />
                          <NumberFieldIncrementTrigger />
                          <NumberFieldDecrementTrigger />
                        </div>
                      </NumberField>
                    </div>
                    <div class="flex flex-col space-x-1 items-center">
                      <p>Cumulative observations time</p>
                      <DurationForm
                        duration={experiment.obs_time_goal!}
                        setDuration={(
                          key: Partial<keyof DurationHMS>,
                          value: number,
                        ) => setExperiment("obs_time_goal", key, value)}
                      />
                    </div>
                  </div>
                </Show>
              </div>
            </div>

            {attributes && (
              <Form store={attributes} setStore={setAttributes}></Form>
            )}
          </div>
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
