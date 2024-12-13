import { createEffect } from "solid-js";
import { LineChart } from "~/components/ui/charts";

export default function Timeline(props: {
  values: () => [];
  time: () => [];
  name: string;
}) {
  const data = () => ({
    datasets: [{ data: props.values() }],
    labels: props.time(),
  });

  createEffect(() => {
    console.log("Timeline", props.values(), props.time());
  }
  );

  return (
    <div>
        <div>
          <LineChart  data={data()} />
        </div>
    </div>
  );
}
