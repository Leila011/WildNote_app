import { useParams } from "@solidjs/router";
import { createResource } from "solid-js";


import { DataTable } from "~/utils/data-table";
import { generateColumns } from "~/utils/generateColumns"	;
import { fetchTableSchema } from "~/api/fetchTableSchema";
import { fetchSamples } from "~/api/fetchSamples";
 
export default function Experiments() {
  const params = useParams();
  const [samples] = createResource(    () => Number(params.experimentsId)
  , fetchSamples)
  const [tableSchema] = createResource(() => fetchTableSchema('sample'))

  return (
    <div class="container mx-auto py-10">
     {samples() && tableSchema() && <DataTable columns={generateColumns(tableSchema(), "sample")} data={samples()} />}
    </div>
  )
}