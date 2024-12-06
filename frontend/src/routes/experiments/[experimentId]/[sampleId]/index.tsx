import { useParams } from "@solidjs/router";
import { createEffect, createResource, createSignal } from "solid-js";
import { DataTable } from "~/utils/data-table";
import { generateColumns } from "~/utils/generateColumns"	;
import { fetchObservations } from "~/api/fetchObservations";
import { fetchAttributeDescriptions } from "~/api/fetchAttributeDescriptions";

import { Schema } from "~/types/Db";

export default function Observations() {
  const params = useParams();

  const [observations] = createResource(    () => Number(params.sampleId)
  , fetchObservations)
  const [attributeDescriptions] = createResource(() => fetchAttributeDescriptions('observation', Number(params.experimentId)))
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
      
     {observations() && columns() && <DataTable columns={generateColumns(columns(), "observation")} data={observations()} />}
    </div>
  )
}