import { createEffect } from "solid-js";
import { LineChart } from "~/components/ui/charts";
import { StatTimelineItem } from "~/types/db";
import { getDate } from "~/utils/db";

export default function Timeline(props: {
  data: () => StatTimelineItem;
  name: string;
}) {
  const data = () => {
    const datasets = Object.keys(props.data().data).map((item) => {
      const dataItem = props.data().data[item];
      return {
        label: item,
        data: dataItem,
        yAxisID: "y",
      };
    });

    return {
      datasets: datasets,
      labels: props.data().dates.map(getDate),
    };
  };

  const options = {
    responsive: true,
    interaction: {
      mode: "index" as const,
      intersect: false,
    },
  };

  return (
    <div>
      <div>
        <LineChart data={data()} options={options} />
      </div>
    </div>
  );
}
