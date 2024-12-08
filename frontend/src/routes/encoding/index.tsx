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
  const [storeAutofill, setStoreAutofill] = createStore<TableAttributeValue[]>(
    [],
  );

  createEffect(() => {
    if (attributes()) {
      const attributesAugmented = attributes()!.attributes.map(
        (attribute: TableAttribute) =>
          ({
            ...attribute,
            value: "",
          }) as TableAttributeValue,
      );
      setStore(
        attributesAugmented.filter(
          (attribute: TableAttributeValue) => attribute.autofill === false,
        ),
      );
      setStoreAutofill(
        attributesAugmented.filter(
          (attribute: TableAttributeValue) => attribute.autofill === true,
        ),
      );
    }
  });

  createEffect(() => {
    if (params.experimentId && experiments()) {
      const experimentId = Number(params.experimentId);
      const experiment = experiments().find(
        (experiment) => experiment.experiment_id === experimentId,
      );
      setExperiment(experiment);
    }
  });

  const handleSubmit = async () => {
    setStoreAutofill((prevStore) =>
      prevStore.map((attribute) =>
        attribute.name === "creation_date"
          ? { ...attribute, value: Date.now() }
          : attribute,
      ),
    );
    const data = {
      columns: {
        subject: { subject_id: subject().subject_id },
      },
      attributes: [...store, ...storeAutofill],
    };

    const response = await addNewSample(data, experiment().experiment_id);
    experiment() &&
      response &&
      navigate(
        `/encoding/${experiment()!.experiment_id}/${response.sample_id}`,
      );
  };

  return (
    <main class="text-center mx-auto text-gray-700 p-4">
      <div>
        <h1>Choose your experiment:</h1>
        <DropdownMenu>
          <DropdownMenuTrigger
            as={Button<"button">}
            variant={"ghost"}
            class={`bg-card text-card-foreground border rounded-md h-10 pl-2 justify-start  w-full`}
          >
            <div class="flex-grow text-left">
              {!experiment() ? "Pick your experiment" : experiment()!.name}
            </div>
            <IconChevronDown />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <For each={experiments()}>
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
        <Show when={experiment()}>
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

          <h1>Fill out sample info</h1>
          {store.length && <Form store={store} setStore={setStore}></Form>}
          <Button onClick={handleSubmit}>Submit</Button>
        </Show>
      </div>
    </main>
  );
}
