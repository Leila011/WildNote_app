import { useParams } from "@solidjs/router";
import { createEffect, createResource, createSignal } from "solid-js";
import { DataTable } from "~/components/data-table";
import { generateColumns } from "~/components/generateColumns";
import { fetchSamples } from "~/api/fetchSamples";
import { buttonVariants } from "~/components/ui/button";
import { Title } from "~/components/title";

export default function Samples() {
  const params = useParams();
  const [data, {refetch}] = createResource(
    () => Number(params.experimentId),
    fetchSamples,
  );
  
  function getColumnNames(data: any) {
    if (data){
      return Object.keys(data![0]).map((key) => ({ name: key })); }
    else {
      return [] }
  }

  return (
    <div class="container mx-auto py-10">
      <Title>My observation sessions</Title>
      <a
        class={buttonVariants({ variant: "default" })}
        href={`/experiment/${params.experimentId}/newSample`}
      >
        Start a new observation session
      </a>

      {data()?.length  && (
        <DataTable
          columns={generateColumns(getColumnNames(data()), "sample", refetch)}
          data={data()||[]}
        />
      )}
    </div>
  );
}
