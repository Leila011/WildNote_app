import { useParams } from "@solidjs/router";
import { createEffect, createResource, createSignal } from "solid-js";
import { DataTable } from "~/utils/data-table";
import { generateColumns } from "~/utils/generateColumns"	;
import { fetchAttributeDescriptions } from "~/api/fetchAttributeDescriptions";
import { fetchSamples } from "~/api/fetchSamples";
import { Button, buttonVariants } from "~/components/ui/button";
import { c } from "vinxi/dist/types/lib/logger";

export default function Samples() {
  const params = useParams();

  const [samples] = createResource(    () => Number(params.experimentId)
  , fetchSamples)
  const [attributeDescriptions] = createResource(() => fetchAttributeDescriptions('sample', Number(params.experimentId)))
  const [columns, setColumns] = createSignal<any[]>()

  createEffect(() => {
    if (attributeDescriptions()) {
      const { attributes, columns } = attributeDescriptions();
      const combined = [...columns, ...attributes];
      setColumns(combined);
    }
  })

  return (
    <div class="container mx-auto py-10">
      <a class={buttonVariants({ variant: "default" })}
 href={`/experiments/${params.experimentId}/newSample`}>Start a new observation session</a>
 
     {samples() && columns() && <DataTable columns={generateColumns(columns(), "sample")} data={samples()} />}
    </div>
  )
}