import { useParams } from "@solidjs/router";
import { createEffect, createResource, createSignal } from "solid-js";
import { DataTable } from "~/components/data-table";
import { generateColumns } from "~/components/generateColumns";
import { fetchSamples } from "~/api/fetchSamples";
import { buttonVariants } from "~/components/ui/button";
import { Heading } from "~/components/Heading";

export default function Samples() {
  const params = useParams();
  const [data, { refetch }] = createResource(
    () => Number(params.experimentId),
    fetchSamples,
  );

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
        <Heading>{`Experiment #${params.experimentId} / Observation sessions`}</Heading>
        <a
          class={buttonVariants({ variant: "accent" })}
          href={`/experiment/${params.experimentId}/newSample`}
        >
          Start a new observation session
        </a>
      </div>
      {data()?.length && (
        <DataTable
          columns={generateColumns(getColumnNames(data()), "sample", refetch)}
          data={data() || []}
        />
      )}
    </div>
  );
}
