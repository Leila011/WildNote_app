import { Show } from "solid-js";
import { PolarAreaChart } from "~/components/ui/charts";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

type Polar = {
  day: Record<number, number>;
  night: Record<number, number>;
};

export function PolarPlot(props: {
  samplePolar: () => Polar;
  obsPolar: () => Polar;
}) {
  const data = (input: Record<number, number>) => ({
    datasets: [{ data: Object.values(input) }],
    labels: Object.keys(input),
  });

  const options = {
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      r: {
        startAngle: 210,
        ticks: {
          display: false,
        },

        pointLabels: {
          display: true,
          centerPointLabels: false,
          font: {
            size: 18,
          },
        },
      },
    },
  };

  return (
    <div>
      <Show when={props.samplePolar()}>
        <Card>
          <CardHeader>
            <CardTitle>Observation sessions</CardTitle>
          </CardHeader>
          <CardContent>
            <div class="flex flex-row">
              <div class="flex flex-col items-center space-y-8">
                <p>Day</p>
                <PolarAreaChart
                  data={data(props.samplePolar().day)}
                  options={options}
                />
              </div>

              <div class="flex flex-col items-center space-y-8">
                <p>Night</p>
                <PolarAreaChart
                  data={data(props.samplePolar().night)}
                  options={options}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </Show>
      <Show when={props.obsPolar()}>
        <div class="flex flex-row">
          <Card>
            <CardHeader>
              <CardTitle>Observations</CardTitle>
            </CardHeader>
            <CardContent>
              <div class="flex flex-col items-center space-y-8">
                <p>Day</p>
                <PolarAreaChart
                  data={data(props.obsPolar().day)}
                  options={options}
                />
              </div>
              <div class="flex flex-col items-center space-y-8">
                <p>Night</p>
                <PolarAreaChart
                  data={data(props.obsPolar().night)}
                  options={options}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </Show>
    </div>
  );
}
