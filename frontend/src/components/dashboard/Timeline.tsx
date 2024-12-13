import { createEffect } from "solid-js";
import { LineChart } from "~/components/ui/charts";
import { getDate } from "~/utils/db";

export default function Timeline(props: {
  values: () => any[];
  time: () => any[];
  name: string;
}) {
  const data = () =>({
    datasets: [{ data: props.values() }],
    labels: props.time().map((time) => getDate(time)),
  });

  const optionsCat =()=> ({
    scales: {
      y: {
        type: 'category' as const,
        labels: Array.from(new Set(props.values()))
      },
    },
  })

  const optionsNum = ()=>({
    scales: {
      y: {
        type: 'category',
      },
    },
  })

  createEffect(() => {
    console.log("Timeline", props.values(), props.time());
  }
  );

  return (
    <div>
        <div>
          <LineChart  data={data()} options={typeof props.values()[0]==="string"?optionsCat(): optionsNum} />
        </div>
    </div>
  );
}
