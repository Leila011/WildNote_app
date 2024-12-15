import { DataTable } from "~/components/data-table";
import { createEffect, createResource, createSignal, Show } from "solid-js";
import { generateColumns } from "~/components/generateColumns";
import { fetchExperiments } from "~/api/fetchExperiments";
import { buttonVariants } from "~/components/ui/button";
import { Heading } from "~/components/Heading";
import { ExperimentDb } from "~/types/db";
import { ExperimentFromDb } from "~/utils/db";

export default function Experiments() {
  const [data, { refetch }] = createResource<ExperimentDb[]>(fetchExperiments);

  const [dataFormated, setDataFormated] = createSignal<ExperimentDb[]>([]);

  createEffect(() => {
    if (data() && data()?.length) {
      const formatted = data()!.map((experiment) =>
        ExperimentFromDb(experiment),
      );
      setDataFormated(formatted);
    }
  });

  function getColumnNames(data: ExperimentDb[]) {
    return Object.keys(data![0]).map((key) => ({ name: key }));
  }

  return (
    <div class="container mx-auto">
      <div class="flex flex-row items-baseline justify-between">
        <Heading>Experiments</Heading>

        <a
          class={buttonVariants({ variant: "accent" })}
          href={`/newExperiment`}
        >
          Create a new experiment
        </a>
      </div>

      {dataFormated()?.length && (
        <DataTable
          columns={generateColumns(
            getColumnNames(dataFormated() || []),
            "experiment",
            refetch,
          )}
          data={dataFormated() || []}
          columnVisibilityInit={{
            experiment_id: false,
            name: true,
            status: true,
            predefine_subject: false,
            timestamp_start: true,
            timestamp_end: true,
            duration: false,
            samples_number_goal: false,
            samples_time_goal: false,
            obs_number_goal: false,
            obs_time_goal: false,
          }}
        />
      )}
      <Show when={data() && !data()?.length}>
        <div>There is no experiments yet!</div>
      </Show>
    </div>
  );
}
