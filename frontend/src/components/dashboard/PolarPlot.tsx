import { Show } from "solid-js";
import { PolarAreaChart } from "~/components/ui/charts";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Level } from "~/types/db";

type Polar = {
  day: Record<number, number>;
  night: Record<number, number>;
};

export function PolarPlot(props: {
  data: () => Polar;
  level:Level
}) {
  const data = (input: Record<number, number>) => ({
    datasets: [{ data: Object.values(input) }],
    labels: Object.keys(input),
  });

  const options = {
    responsive: true,
    maintainAspectRatio: true,
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
            size: 10,
          },
        },
      },
    },
  };

  return (
    <div>
        <Card>
          <CardHeader>
            <CardTitle>{props.level==="sample"? "Observation sessions":"Observations"}</CardTitle>
          </CardHeader>
          <CardContent>
            <div class="flex flex-row space-x-3">
              <div class="flex flex-col items-center space-y-8">
                <p>Day</p>
                <div class="relative h-48">
                <PolarAreaChart
                  data={data(props.data().day)}
                  options={options}
                />
                 </div>

              </div>

              <div class="flex flex-col items-center space-y-8 ">
                <p>Night</p>
                <div class="relative h-48">

                <PolarAreaChart
                  data={data(props.data().night)}
                  options={options}
                />
              </div>
              </div>

            </div>
          </CardContent>
        </Card>     
    </div>
  );
}
