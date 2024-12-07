import { useParams } from "@solidjs/router";
import { createEffect, createResource, createSignal } from "solid-js";
import { DataTable } from "~/utils/data-table";
import { generateColumns } from "~/utils/generateColumns";
import { fetchSamples } from "~/api/fetchSamples";
import { buttonVariants } from "~/components/ui/button";

export default function Samples() {
  const params = useParams();
  const [data] = createResource(
    () => Number(params.experimentId),
    fetchSamples,
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
      <a
        class={buttonVariants({ variant: "default" })}
        href={`/experiment/${params.experimentId}/newSample`}
      >
        Start a new observation session
      </a>

      {data() && columns().length && (
        <DataTable
          columns={generateColumns(columns(), "sample")}
          data={data()}
        />
      )}
    </div>
  );
}
