import { useParams } from "@solidjs/router";
import { createResource } from "solid-js";


import { DataTable } from "~/utils/data-table";
import { generateColumns } from "~/utils/generateColumns"	;
import { fetchTableSchema } from "~/api/fetchTableSchema";
import { fetchSamples } from "~/api/fetchSamples";
import { Button, buttonVariants } from "~/components/ui/button";

export default function Samples() {
  const params = useParams();

  const [samples] = createResource(    () => Number(params.experimentId)
  , fetchSamples)
  const [tableSchema] = createResource(() => fetchTableSchema('sample', Number(params.experimentId)))

  return (
    <div class="container mx-auto py-10">
      <a class={buttonVariants({ variant: "default" })}
 href={`/experiments/${params.experimentId}/newSample`}>Start a new observation session</a>
 
     {samples() && tableSchema() && <DataTable columns={generateColumns(tableSchema(), "sample")} data={samples()} />}
    </div>
  )
}