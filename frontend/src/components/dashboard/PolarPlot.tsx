import { createEffect, Show } from "solid-js";
import { PolarAreaChart } from "~/components/ui/charts";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Level } from "~/types/db";

type Polar = {
  day: {
    keys: number[];
    values: number[];
  }
  night: {
    keys: number[];
    values: number[];
  }
};

export function PolarPlot(props: {
  data: () => Polar;
  level:Level
}) {

  const data = (input:  {
    keys: number[];
    values: number[];
  }) => ({
    datasets: [{ data: input.values }],
    labels: input.keys
  });

  const options = {
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      r: {
        startAngle: 0,
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
            <div class="flex flex-row space-x-16 justify-center w-full h-44 mb-2">
              <div class="flex flex-col items-center space-y-2">
                <p>Day</p>
                <div class="relative h-36">
                <PolarAreaChart
                  data={data(props.data().day)}
                  options={options}
                />
                 </div>

              </div>

              <div class="flex flex-col items-center space-y-2 ">
                <p>Night</p>
                <div class="relative h-36">

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
