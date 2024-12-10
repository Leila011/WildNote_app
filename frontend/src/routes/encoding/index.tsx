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
import {
  Experiment,
  Subject,
  TableAttribute,
  TableAttributeValue,
} from "~/types/db";
import { fetchAttributeDescriptions } from "~/api/fetchAttributeDescriptions";
import { Form } from "~/components/Form";
import { createStore } from "solid-js/store";
import { useNavigate, useParams } from "@solidjs/router";
import { addNewSample } from "~/api/addNewSample";
import { fetchSubjects } from "~/api/fetchSubjects";
import { Heading } from "~/components/Heading";
import { updateValue } from "~/api/updateValue";
import { getTimestamp } from "~/utils/db";

export default function EncodingSample() {
  const navigate = useNavigate();
  const params = useParams();

  const [experiments] = createResource(fetchExperiments);
  const [experiment, setExperiment] = createSignal<Experiment>();
  const [subject, setSubject] = createSignal<Subject>();

  function fetcherSubject(props: { experimentId: number }) {
    return props.experimentId ? fetchSubjects(props.experimentId) : undefined;
  }

  const [subjects] = createResource(() => {
    return (
      experiment() && {
        experimentId: experiment()!.experiment_id,
      }
    );
  }, fetcherSubject);

  function fetcher(props: { experimentId: number; tableName: string }) {
    return props.experimentId
      ? fetchAttributeDescriptions(props.tableName, props.experimentId)
      : undefined;
  }

  const [attributes] = createResource(() => {
    return (
      experiment() && {
        experimentId: experiment()!.experiment_id,
        tableName: "sample",
      }
    );
  }, fetcher);

  const [store, setStore] = createStore<TableAttributeValue[]>([]);

  createEffect(() => {
    if (attributes()) {
      const attributesAugmented = attributes()!.attributes.map(
        (attribute: TableAttribute) =>
          ({
            ...attribute,
            value: "",
          }) as TableAttributeValue,
      );
      setStore(attributesAugmented);
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
      const data = {
        columns: {
          subject_id: subject()?.subject_id ?? null,
          timestamp_start: getTimestamp(),
        },
        attributes: store,
      };

      if (experiment()?.timestamp_start === null) {
        updateValue(
          "experiment",
          "timestamp_start",
          experiment()!.experiment_id,
          getTimestamp(),
        );
      }
      const response = await addNewSample(data, experiment()!.experiment_id);
      console.log(response);
      experiment() &&
        response &&
        navigate(
          `/encoding/experiment/${experiment()!.experiment_id}/sample/${response.sample_id}`,
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
