import { useParams } from "@solidjs/router";
import { createEffect, createResource, createSignal } from "solid-js";
import { DataTable } from "~/components/data-table";
import { generateColumns } from "~/components/generateColumns";
import { fetchObservations } from "~/api/fetchObservations";
import { Heading } from "~/components/Heading";

export default function Observations() {
  const params = useParams();

  const [data, { refetch }] = createResource(
    () => ({
      experimentId: Number(params.experimentId),
      sampleId: Number(params.sampleId),
    }),
    fetchObservations,
  );

  createEffect(() => {
    console.log(params.sampleId);
    data() && console.log(data());
  });

  function getColumnNames(data: any) {
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
            getColumnNames(data()),
            "observation",
            refetch,
          )}
          data={data() || []}
        />
      )}
    </div>
  );
}
