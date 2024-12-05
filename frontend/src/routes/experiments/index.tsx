import { DataTable } from "./data-table"
import { backendUrl } from "../../db";
import { createResource } from "solid-js";
import { generateColumns } from "~/utils/generateColumns"	;
import { fetchExperiments } from "~/api/fetchExperiments";
import { fetchTableSchema } from "~/api/fetchTableSchema";
 
export default function DemoPage() {
  const [experiments] = createResource(fetchExperiments)
  const [tableSchema] = createResource(() => fetchTableSchema('experiment'))
  
  return (
    <div class="container mx-auto py-10">
     {experiments() && tableSchema() && <DataTable columns={generateColumns(tableSchema())} data={experiments()} />}
    </div>
  )
}

