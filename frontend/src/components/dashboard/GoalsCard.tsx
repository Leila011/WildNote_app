import {
  Progress,
  ProgressLabel,
  ProgressValueLabel,
} from "~/components/ui/progress";
import { ExperimentDb, ExperimentStats } from "~/types/db";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Show } from "solid-js";
import { secondToString } from "~/utils";

type Props = {
  experiment: ExperimentDb;
  stat: ExperimentStats;
};

export function GoalsCard({ experiment, stat }: Props) {
  console.log("GoalsCard", experiment, stat);

  return (
    <div class="flex flex-row space-x-3">
      <Card>
        <CardHeader>
          <CardTitle>Samples</CardTitle>
        </CardHeader>
        <CardContent class="flex flex-col space-y-5">
          <Show
            when={
              experiment.samples_number_goal &&
              experiment.samples_number_goal > 0
            }
          >
            <Progress
              value={stat.sample_nb}
              minValue={0}
              maxValue={experiment.samples_number_goal}
              getValueLabel={({ value, max }) => `${stat.sample_nb} of ${max} `}
              class="w-[300px] space-y-1"
            >
              <div class="flex justify-between">
                <ProgressLabel>Number</ProgressLabel>
                <ProgressValueLabel />
              </div>
            </Progress>
          </Show>
          <Show
            when={
              experiment.samples_time_goal && experiment.samples_time_goal > 0
            }
          >
            <Progress
              value={stat.sample_time_tot}
              minValue={0}
              maxValue={experiment.samples_time_goal}
              getValueLabel={({ value, max }) => {
                const valueHMS = secondToString(stat.sample_time_tot);
                const maxHMS = secondToString(max);
                return `${valueHMS} of ${maxHMS} `;
              }}
              class="w-[300px] space-y-1"
            >
              <div class="flex justify-between">
                <ProgressLabel>Cumulative time</ProgressLabel>
                <ProgressValueLabel />
              </div>
            </Progress>
          </Show>
          <p>Average time: {secondToString(stat.sample_time_mean)}</p>
          <p>Median time: {secondToString(stat.sample_time_median)}</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Observations</CardTitle>
        </CardHeader>
        <CardContent class="flex flex-col space-y-5">
          <Show
            when={experiment.obs_number_goal && experiment.obs_number_goal > 0}
          >
            <Progress
              value={stat.obs_nb}
              minValue={0}
              maxValue={experiment.obs_number_goal}
              getValueLabel={({ value, max }) => `${stat.obs_nb} of ${max} `}
              class="w-[300px] space-y-1"
            >
              <div class="flex justify-between">
                <ProgressLabel>Number</ProgressLabel>
                <ProgressValueLabel />
              </div>
            </Progress>
          </Show>
          <Show when={experiment.obs_time_goal && experiment.obs_time_goal > 0}>
            <Progress
              value={stat.obs_time_tot}
              minValue={0}
              maxValue={experiment.obs_time_goal}
              getValueLabel={({ value, max }) => {
                const valueHMS = secondToString(stat.obs_time_tot);
                const maxHMS = secondToString(max);
                return `${valueHMS} of ${maxHMS} `;
              }}
              class="w-[300px] space-y-1"
            >
              <div class="flex justify-between">
                <ProgressLabel>Cumulative time</ProgressLabel>
                <ProgressValueLabel />
              </div>
            </Progress>
          </Show>
          <p>Average time: {secondToString(stat.obs_time_mean)}</p>
          <p>Median time: {secondToString(stat.obs_time_median)}</p>
        </CardContent>
      </Card>
    </div>
  );
}
