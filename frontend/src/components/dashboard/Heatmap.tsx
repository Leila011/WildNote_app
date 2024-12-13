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
      enableShades: false,
      colorScale: {
        ranges: [
          {
            from: -1,
            to: 0,
            color: "grey",
            name: "no record",
          },
          {
            from: 1,
            to: 1000,
            color: "#5db075",
            name: "records (# observation sessions)",
          },
        ],
      },
    },
    
  },yaxis: {
    reversed: true,
  }
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
