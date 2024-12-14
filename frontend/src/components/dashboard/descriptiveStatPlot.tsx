import { createEffect, createMemo, Show } from "solid-js";
import { StatDescriptivesPlot } from "~/types/db";
import { BarChart, PieChart } from "~/components/ui/charts";

export function DescriptiveStatPlot(props: {
  stats: () => StatDescriptivesPlot;
  name: string;
}) {
  const pieChartData = () => ({
    datasets: [{ data: props.stats().counts }],
    labels: props.stats().unique,
  });

  const barChartData = () => ({
    datasets: [
      {
        data: props.stats().hist,
        backgroundColor: "#1b1532",
        label: props.name,
      },
    ],

    labels: props.stats().bin_edges,
    options: {
      plugins: {
        legend: {
          position: "bottom",
        },
      },
    },
  });
  const hasCounts = () => "counts" in props.stats();

  return (
    <div>
      <Show when={hasCounts()}>
        <div>
          <PieChart data={pieChartData()} />
        </div>
      </Show>
      <Show when={!hasCounts()}>
        <div>
          <BarChart data={barChartData()} />
        </div>
      </Show>
    </div>
  );
}
