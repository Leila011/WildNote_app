import { DataTable } from "~/utils/data-table"
import { createEffect, createResource, createSignal } from "solid-js";
import { generateColumns } from "~/utils/generateColumns"	;
import { fetchExperiments } from "~/api/fetchExperiments";
import { buttonVariants } from "~/components/ui/button";
 
export default function Experiments() {
  const [data] = createResource(fetchExperiments)
  const [columns, setColumns] = createSignal<{ name: string }[]>([])

  createEffect(() => {
    if(data()) {
    const columnNames = Object.keys(data()![0]).map(key => ({ name: key }));
    setColumns(columnNames);
    }
  }
  )
  return (
    <div class="container mx-auto py-10">
           <a class={buttonVariants({ variant: "default" })}
 href={`/newExperiment`}>Create a new experiment</a>
 
     {data() && columns().length && <DataTable columns={generateColumns(columns(),"experiment")} data={data()} />}
    </div>
  )
}

