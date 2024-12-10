import { useParams } from "@solidjs/router";
import { createResource, Show } from "solid-js";
import { DataTable } from "~/components/data-table";
import { generateColumns } from "~/components/generateColumns";
import { fetchObservations } from "~/api/fetchObservations";
import { Heading } from "~/components/Heading";
import { ObservationDb } from "~/types/db";

export default function Observations() {
  const params = useParams();

  const [data, { refetch }] = createResource<ObservationDb[]>(() =>
    fetchObservations({
      sampleId: Number(params.sampleId),
      experimentId: Number(params.experimentId),
    }),
  );

  function getColumnNames(data: ObservationDb[]) {
    if (data) {
      return Object.keys(data![0]).map((key) => ({ name: key }));
    } else {
      return [];
    }
  }

  return (
    <div class="container mx-auto">
      <Heading>{`Experiment #${params.experimentId} / Observation sessions # ${params.sampleId} / Observations`}</Heading>
      {data()?.length && (
        <DataTable
          columns={generateColumns(
            getColumnNames(data() ?? []),
            "observation",
            refetch,
          )}
          data={data() || []}
        />
      )}
      <Show when={data() && !data()?.length}>
        <div>There is no observation yet!</div>
      </Show>
    </div>
  );
}
