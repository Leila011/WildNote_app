import { DataTable } from "~/components/data-table";
import { createResource, Show } from "solid-js";
import { generateColumns } from "~/components/generateColumns";
import { fetchExperiments } from "~/api/fetchExperiments";
import { buttonVariants } from "~/components/ui/button";
import { Heading } from "~/components/Heading";
import { Experiment } from "~/types/db";

export default function Experiments() {
  const [dataAttributes, { refetch }] =
    createResource<Experiment[]>(fetchExperiments);

  function getColumnNames(data: Experiment[]) {
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

      {dataAttributes()?.length && (
        <DataTable
          columns={generateColumns(
            getColumnNames(dataAttributes() || []),
            "experiment",
            refetch,
          )}
          data={dataAttributes() || []}
        />
      )}
      <Show when={dataAttributes() && !dataAttributes()?.length}>
        <div>There is no experiments yet!</div>
      </Show>
    </div>
  );
}
