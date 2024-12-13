import { SolidApexCharts } from "solid-apexcharts";
import { createEffect } from "solid-js";

type HeatmapProps = {
  series: {
    name: string;
    data: { x: string; y: number }[];
  }[];
  year: number;
};

const options = {
  plotOptions: {
    heatmap: {
      enableShades: false,
      colorScale: {
        ranges: [
          {
            from: -1,
            to: -1,
            color: "white",
            foreColor: undefined,
            name: "not in study",
          },
          {
            from: 0,
            to: 0,
            color: "grey",
            name: "no record",
          },
          {
            from: 1,
            to: 1000,
            color: "#5db075",
            name: "# observation sessions",
          },
        ],
      },
    },
    
  },yaxis: {
    reversed: true,
  }
};



export default function Heatmap({ series, year }: HeatmapProps) {
  createEffect(() => {
    console.log("Heatmap", series);
  })
  return (
    <div class="h-full">
      <p>{year}</p>
      <SolidApexCharts
        type="heatmap"
        options={options}
        series={series}
        height={"236px"}
      />
    </div>
  );
}
