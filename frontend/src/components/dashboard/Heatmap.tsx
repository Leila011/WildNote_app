import { SolidApexCharts } from "solid-apexcharts";

type HeatmapProps = {
  series: {
    name: string;
    data: { x: string; y: number }[];
  }[];
};

const options = {
  plotOptions: {
    heatmap: {
      colorScale: {
        ranges: [
          {
            from: -1,
            to: 0,
            color: "grey",
            name: "no days",
          },
          {
            from: 1,
            to: 1000,
            color: "#1b1532",
            name: "sample",
          },
        ],
      },
    },
  },
};

export default function Heatmap({ series }: HeatmapProps) {
  return (
    <div class="h-full">
      <SolidApexCharts
        type="heatmap"
        options={options}
        series={series}
        height={"236px"}
      />
    </div>
  );
}
