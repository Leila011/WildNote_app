import {
  createEffect,
  createResource,
  createSignal,
  For,
  Show,
} from "solid-js";
import { fetchExperiments } from "~/api/fetchExperiments";
import {
  DropdownMenu,
  DropdownMenuContent,
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

export default function EncodingSample() {
  const navigate = useNavigate();
  const params = useParams();

  const [experiments] = createResource<ExperimentDb[]>(fetchExperiments);
  const [experiment, setExperiment] = createSignal<ExperimentDb>();
  const [subject, setSubject] = createSignal<SubjectDb>();

  const [subjects, { refetch: refetchSubject }] = createResource<
    SubjectDb[] | undefined
  >(
    () =>
      experiment() &&
      fetchSubjects({ experimentId: experiment()!.experiment_id }),
  );

  const [data, { refetch: refetchAttributes }] = createResource<
    Metadata | undefined
  >(
    () =>
      experiment() &&
      fetchAttributeDescriptions({
        experimentId: experiment()!.experiment_id,
        level: "sample",
      }),
  );

  createEffect(() => {
    if (experiment()) {
      refetchSubject();
      refetchAttributes();
    }
  });

  const [store, setStore] = createStore<AttributeValue[]>([]);

  createEffect(() => {
    if (data()) {
      setStore(toAttributeValue(data()!.attributes));
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

  const handleSubmit = async () => {
    if (experiment() && (experiment()?.predefine_subject ? subject() : true)) {
      const dataOut = {
        columns: {
          subject_id: subject()?.subject_id ?? undefined,
          timestamp_start: getTimestamp(),
        },
        attributes: store,
      };

      console.log(isAttributesValuesValid(dataOut.attributes));
      console.log(dataOut.columns);

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

        response.sample_id &&
          navigate(
            `/encoding/experiment/${experiment()!.experiment_id}/sample/${response.sample_id}`,
          );
      }
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
                    each={experiments()?.filter(
                      (item) => item.status !== "completed",
                    )}
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
              <Show when={experiment() && subject.length}>
                <h1>Choose your subject:</h1>
                <DropdownMenu>
                  <DropdownMenuTrigger
                    as={Button<"button">}
                    variant={"ghost"}
                    class={`bg-card text-card-foreground border rounded-md h-10 pl-2 justify-start  w-full`}
                  >
                    <div class="flex-grow text-left">
                      {!subject() ? "Pick your Subject" : subject()!.name}
                    </div>
                    <IconChevronDown />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
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
                  </DropdownMenuContent>
                </DropdownMenu>
              </Show>
            </div>
          </div>

          <Show when={experiment()}>
            <div class="border border-primary rounded-md item-center bg-primary/10">
              <h1>Fill out you observation session parameters</h1>
              {store.length && <Form store={store} setStore={setStore}></Form>}
            </div>
            <div>
              <Button
                class={buttonVariants({ variant: "accent" })}
                onClick={handleSubmit}
              >
                Start an observation
              </Button>
            </div>
          </Show>
        </div>
      </div>
    </div>
  );
}
