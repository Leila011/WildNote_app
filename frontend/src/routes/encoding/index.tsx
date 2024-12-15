import {
  createEffect,
  createResource,
  createSignal,
  For,
  onMount,
  Show,
} from "solid-js";
import { fetchExperiments } from "~/api/fetchExperiments";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuGroupLabel,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Button, buttonVariants } from "~/components/ui/button";
import { IconChevronDown } from "~/components/icons";
import { ExperimentDb, SubjectDb, AttributeValue, Metadata } from "~/types/db";
import { fetchAttributeDescriptions } from "~/api/fetchAttributeDescriptions";
import { Form } from "~/components/Form";
import { createStore } from "solid-js/store";
import { useNavigate, useParams } from "@solidjs/router";
import { addNewSample } from "~/api/addNewSample";
import { fetchSubjects } from "~/api/fetchSubjects";
import { Heading } from "~/components/Heading";
import { updateValue } from "~/api/updateValue";
import { getTimestamp, toAttributeValue } from "~/utils/db";
import {
  isAttributesValuesValid,
  isColumnsValuesValid,
} from "~/utils/dataValidation";
import NewSubjectForm from "~/components/newItemsForm/NewSubjectForm";
import { addNewSubject } from "~/api/addNewSubject";

export default function EncodingSample() {
  const navigate = useNavigate();
  const params = useParams();

  const [experiments] = createResource<ExperimentDb[]>(fetchExperiments);
  const [experiment, setExperiment] = createSignal<ExperimentDb | undefined>();

  const [subjects] = createResource<SubjectDb[]>(
    () => experiment() && { experimentId: experiment()!.experiment_id },
    fetchSubjects,
  );
  const [subject, setSubject] = createSignal<SubjectDb | undefined>();

  const [data] = createResource<Metadata>(
    () =>
      experiment() && {
        experimentId: experiment()!.experiment_id,
        level: "sample",
      },
    fetchAttributeDescriptions,
  );

  const [dataSubject] = createResource<Metadata>(
    () =>
      experiment() && {
        experimentId: experiment()!.experiment_id,
        level: "subject",
      },
    fetchAttributeDescriptions,
  );

  const [name, setName] = createSignal<string>("");

  createEffect(() => {
    // open the page for the last experiment
    if (experiments() && !experiment()) {
      const eligibleExperiments = experiments()!.filter(
        (e) => e.status === "active" || e.status === "created",
      );
      setExperiment(eligibleExperiments[eligibleExperiments!.length - 1]);
    }
    // set subject to the last one
    if (subjects() && !subject()) {
      setSubject(subjects()![subjects()!.length - 1]);
    }
  });

  const [store, setStore] = createStore<AttributeValue[]>([]);
  const [storeSubject, setStoreSubject] = createStore<AttributeValue[]>([]);

  createEffect(() => {
    if (data()) {
      setStore(toAttributeValue(data()!.attributes));
    }
    if (dataSubject()) {
      setStoreSubject(toAttributeValue(dataSubject()!.attributes));
    }
  });

  createEffect(() => {
    if (params.experimentId && experiments()) {
      const experimentId = Number(params.experimentId);
      const experiment = experiments()!.find(
        (experiment) => experiment.experiment_id === experimentId,
      );
      setExperiment(experiment);
    }
  });

  async function endSubject() {
    const dataOut = {
      attributes: store,
      columns: { name: name(), timestamp_creation: getTimestamp() },
    };

    const isReady =
      isAttributesValuesValid(dataOut.attributes) &&
      isColumnsValuesValid(dataOut.columns);

    if (isReady) {
      const response = addNewSubject({
        data: dataOut,
        experimentId: Number(params.experimentId),
      });
      return response;
    }
  }

  async function endSample() {
    const dataOut = {
      columns: {
        subject_id: subject()?.subject_id ?? null,
        timestamp_start: getTimestamp(),
      },
      attributes: store,
    };
    const isNotRequired = experiment()?.predefine_subject
      ? undefined
      : ["subject_id"];

    const isReady =
      isAttributesValuesValid(dataOut.attributes) &&
      isColumnsValuesValid(dataOut.columns, isNotRequired);

    if (isReady) {
      if (experiment()?.timestamp_start === null) {
        updateValue({
          level: "experiment",
          column_name: "timestamp_start",
          row_id: experiment()!.experiment_id,
          value: getTimestamp(),
        });
      }
      const response = await addNewSample({
        data: dataOut,
        experimentId: experiment()!.experiment_id,
      });
      return response;
    }
  }
  const handleSubmit = async () => {
    if (experiment() && (!experiment()!.predefine_subject || subject())) {
      const responseSample = await endSample();
      if (experiment()?.predefine_subject) {
        const responseSubject = await endSubject();
      }
      responseSample.sample_id &&
        navigate(
          `/encoding/experiment/${experiment()!.experiment_id}/sample/${responseSample.sample_id}`,
        );
    }
  };

  return (
    <div class="container mx-auto">
      <div>
        <Heading>
          Select your experiment and fill out your observation session
          parameters
        </Heading>
        <div class="flex flex-col space-y-5">
          <div class="grid grid-cols-2 gap-20">
            <div>
              <h1>Choose your experiment:</h1>
              <DropdownMenu>
                <DropdownMenuTrigger
                  as={Button<"button">}
                  variant={"ghost"}
                  class={`bg-card text-card-foreground border rounded-md h-10 pl-2 justify-start  w-full`}
                >
                  <div class="flex-grow text-left">
                    {!experiment()
                      ? "Pick your experiment"
                      : experiment()!.name}
                  </div>
                  <IconChevronDown />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <For
                    each={experiments()?.filter((e) => e.status === "active" || e.status === "created")}
                  >
                    {(option) => (
                      <DropdownMenuItem
                        onSelect={() => {
                          setExperiment(option);
                        }}
                      >
                        <span>{option.name}</span>
                      </DropdownMenuItem>
                    )}
                  </For>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div>
              <Show when={subjects() && subjects().length}>
                <h1>Choose your subject:</h1>
                <DropdownMenu>
                  <DropdownMenuTrigger
                    as={Button<"button">}
                    variant={"ghost"}
                    class={`bg-card text-card-foreground border rounded-md h-10 pl-2 justify-start  w-full`}
                  >
                    <div class="flex-grow text-left">
                      {subject() ? subject()!.name : "None"}
                    </div>
                    <IconChevronDown />
                  </DropdownMenuTrigger>

                  <DropdownMenuContent>
                    <DropdownMenuGroup>
                      <DropdownMenuItem
                        onSelect={() => {
                          setSubject(undefined);
                        }}
                      >
                        <span>None</span>
                      </DropdownMenuItem>
                      <DropdownMenuGroupLabel>
                        <span>Existing subjects</span>
                      </DropdownMenuGroupLabel>
                    </DropdownMenuGroup>

                    <DropdownMenuGroup>
                      <For each={subjects()}>
                        {(option) => (
                          <DropdownMenuItem
                            onSelect={() => {
                              setSubject(option);
                            }}
                          >
                            <span>{option.name}</span>
                          </DropdownMenuItem>
                        )}
                      </For>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </Show>
            </div>
          </div>
          <div>
            <Show
              when={
                experiment() &&
                experiment()?.predefine_subject &&
                !subject() &&
                storeSubject.length
              }
            >
              <h1>Add a new subject:</h1>

              {storeSubject.length && (
                <NewSubjectForm
                  store={store}
                  setStore={setStore}
                  name={name}
                  setName={setName}
                ></NewSubjectForm>
              )}
            </Show>
          </div>
          <div>
            <Show when={experiment() && store.length}>
              <h1>Fill out you observation session parameters</h1>
              <div class="border border-primary rounded-md item-center bg-muted">
                {store.length && (
                  <Form store={store} setStore={setStore}></Form>
                )}
              </div>
              <div></div>
            </Show>
            <div class="mt-4">
              <Button
                class={buttonVariants({ variant: "accent" })}
                onClick={handleSubmit}
              >
                Start an observation
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
