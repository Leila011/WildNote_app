import { useParams } from "@solidjs/router";
import { createEffect, createResource, createSignal } from "solid-js";
import { DataTable } from "~/components/data-table";
import { generateColumns } from "~/components/generateColumns";
import { fetchObservations } from "~/api/fetchObservations";
import { Title } from "~/components/title";

export default function Observations() {
  const params = useParams();

  const [data, {refetch}] = createResource(
    () => Number(params.sampleId),
    fetchObservations,
  );

  function getColumnNames(data: any) {
    if (data){
      return Object.keys(data![0]).map((key) => ({ name: key })); }
    else {
      return [] }
  }

  return (
    <div class="container mx-auto py-10">
      <Title>My Observations</Title>
  {data()?.length  && (
        <DataTable
          columns={generateColumns(getColumnNames(data()), "observation", refetch)}
          data={data()||[]}
        />
  
      )}

    </div>
  );
}
