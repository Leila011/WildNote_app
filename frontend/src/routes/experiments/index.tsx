import { DataTable } from "~/utils/data-table"
import { createEffect, createResource, createSignal } from "solid-js";
import { generateColumns } from "~/utils/generateColumns"	;
import { fetchExperiments } from "~/api/fetchExperiments";
import { fetchAttributeDescriptionsExperiments } from "~/api/fetchAttributeDescriptionsExperiments";
 
export default function Experiments() {
  const [experiments] = createResource(fetchExperiments)
  const [attributeDescriptions] = createResource(() => fetchAttributeDescriptionsExperiments())
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
     {experiments() && columns() && <DataTable columns={generateColumns(columns(),"experiment")} data={experiments()} />}
    </div>
  )
}

