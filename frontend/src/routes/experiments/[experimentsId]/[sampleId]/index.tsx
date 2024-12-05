import { useParams } from "@solidjs/router";
import { createResource } from "solid-js";


import { DataTable } from "~/utils/data-table";
import { generateColumns } from "~/utils/generateColumns"	;
import { fetchTableSchema } from "~/api/fetchTableSchema";
import { fetchSamples } from "~/api/fetchSamples";
import { fetchObservations } from "~/api/fetchObservations";
 
export default function Experiments() {
  const params = useParams();

  const [observations] = createResource(    () => Number(params.sampleId)
  , fetchObservations)
  const [tableSchema] = createResource(() => fetchTableSchema('observation'))
 
  return (
    <div class="container mx-auto py-10">
     {observations() && tableSchema() && <DataTable columns={generateColumns(tableSchema(), "observation")} data={observations()} />}
    </div>
  )
}