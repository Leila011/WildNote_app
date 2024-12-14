import { createEffect, For, Show } from "solid-js";
import { StatDescriptives } from "~/types/db";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";

export function DescriptiveStatTable(props: { stats: () => StatDescriptives }) {
  return (
    <div>
      <Show when={props.stats()}>
        <div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead class="w-[100px]"></TableHead>
                <TableHead>Value</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <For each={Object.keys(props.stats())}>
                {(name) => (
                  <TableRow>
                    <TableCell class="font-medium">{name}</TableCell>
                    <TableCell>{props.stats()[name]}</TableCell>
                  </TableRow>
                )}
              </For>
            </TableBody>
          </Table>
        </div>
      </Show>
    </div>
  );
}
