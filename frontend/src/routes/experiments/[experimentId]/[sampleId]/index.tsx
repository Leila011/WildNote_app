import { useParams } from "@solidjs/router";
import { createEffect, createResource, createSignal } from "solid-js";
import { DataTable } from "~/utils/data-table";
import { generateColumns } from "~/utils/generateColumns";
import { fetchObservations } from "~/api/fetchObservations";

export default function Observations() {
  const params = useParams();

  const [data] = createResource(
    () => Number(params.sampleId),
    fetchObservations,
  );
  const [columns, setColumns] = createSignal<{ name: string }[]>([]);

  createEffect(() => {
    if (data()) {
      const columnNames = Object.keys(data()![0]).map((key) => ({ name: key }));
      setColumns(columnNames);
    }
  });

  return (
    <div class="container mx-auto py-10">
      {data() && columns().length && (
        <DataTable
          columns={generateColumns(columns(), "observation")}
          data={data()}
        />
      )}
    </div>
  );
}
