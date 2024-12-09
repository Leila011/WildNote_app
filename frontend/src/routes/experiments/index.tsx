import { DataTable } from "~/components/data-table";
import {
  createResource,
} from "solid-js";
import { generateColumns } from "~/components/generateColumns";
import { fetchExperiments } from "~/api/fetchExperiments";
import { buttonVariants } from "~/components/ui/button";
import { Heading } from "~/components/Heading";

export default function Experiments() {
  const [dataAttributes, { refetch }] = createResource(fetchExperiments);

  function getColumnNames(data: any) {
    if (data) {
      return Object.keys(data![0]).map((key) => ({ name: key }));
    } else {
      return [];
    }
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
            getColumnNames(dataAttributes()),
            "experiment",
            refetch,
          )}
          data={dataAttributes() || []}
        />
      )}
    </div>
  );
}
