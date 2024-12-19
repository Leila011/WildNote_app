import { useParams } from "@solidjs/router";
import { createResource, Show } from "solid-js";
import { DataTable } from "~/data-table/data-table";
import { generateColumns } from "~/data-table/generateColumns";
import { fetchSessions } from "~/api/sessions/fetchSessions";
import { buttonVariants } from "~/components/ui/button";
import { Heading } from "~/components/Heading";
import { SessionDb } from "~/types/db";

export default function Samples() {
  const params = useParams();
  const [data, { refetch }] = createResource<SessionDb[]>(() =>
    fetchSessions({ experimentId: Number(params.experimentId) }),
  );

  function getColumnNames(data: SessionDb[]) {
    if (data) {
      return Object.keys(data![0]).map((key) => ({ name: key }));
    } else {
      return [];
    }
  }

  return (
    <div class="container mx-auto">
      <div class="flex flex-row items-baseline justify-between">
        <Heading>{`Experiment #${params.experimentId} / Observation sessions`}</Heading>
        <a
          class={buttonVariants({ variant: "accent" })}
          href={`/encoding/experiment/${params.experimentId}`}
        >
          Start a new observation session
        </a>
      </div>
      {data() && data()!.length > 0 && (
        <DataTable
          columns={generateColumns(
            getColumnNames(data() ?? []),
            "sample",
            refetch,
          )}
          data={data() ?? []}
        />
      )}
      <Show when={data() && !data()?.length}>
        <div>There is no observation session yet!</div>
      </Show>
    </div>
  );
}
