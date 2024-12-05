import { DataTable } from "~/utils/data-table"
import { createResource } from "solid-js";
import { generateColumns } from "~/utils/generateColumns"	;
import { fetchExperiments } from "~/api/fetchExperiments";
import { fetchTableSchema } from "~/api/fetchTableSchema";
 
export default function Experiments() {
  const [experiments] = createResource(fetchExperiments)
  const [tableSchema] = createResource(() => fetchTableSchema('experiment'))
  
  return (
    <div class="container mx-auto py-10">
     {experiments() && tableSchema() && <DataTable columns={generateColumns(tableSchema(),"experiment")} data={experiments()} />}
    </div>
  )
}

