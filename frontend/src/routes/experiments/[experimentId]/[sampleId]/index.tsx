import { useParams } from "@solidjs/router";
import { createEffect, createResource } from "solid-js";


import { DataTable } from "~/utils/data-table";
import { generateColumns } from "~/utils/generateColumns"	;
import { fetchTableSchema } from "~/api/fetchTableSchema";
import { fetchObservations } from "~/api/fetchObservations";
 
export default function Observations() {
  const params = useParams();

  const [observations] = createResource(    () => Number(params.sampleId)
  , fetchObservations)
  const [tableSchema] = createResource(() => fetchTableSchema('observation', Number(params.experimentId)))


  return (
    <div class="container mx-auto py-10">
     {observations() && tableSchema() && <DataTable columns={generateColumns(tableSchema(), "observation")} data={observations()} />}
    </div>
  )
}