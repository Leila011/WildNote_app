import { DataTable } from "~/components/data-table";
import { createEffect, createMemo, createResource, createSignal } from "solid-js";
import { generateColumns } from "~/components/generateColumns";
import { fetchExperiments } from "~/api/fetchExperiments";
import { buttonVariants } from "~/components/ui/button";
import { fetchTable } from "~/api/fetchTable";
import Counter from "~/components/Counter";
import { Title } from "~/components/title";

export default function Experiments() {
  const [dataAttributes, {refetch}] = createResource(fetchExperiments);

  function getColumnNames(data: any) {
    if (data){
      return Object.keys(data![0]).map((key) => ({ name: key })); }
    else {
      return [] }
  }

  return (
    <div class="container mx-auto py-10">
      <Title>My experiments</Title>
      <a class={buttonVariants({ variant: "default" })} href={`/newExperiment`}>
        Create a new experiment
      </a>

{dataAttributes()?.length}
      {dataAttributes()?.length  && (
        <DataTable
          columns={generateColumns(getColumnNames(dataAttributes()), "experiment", refetch)}
          data={ dataAttributes()||[]}
        />
      )}
    </div>
  );
}
