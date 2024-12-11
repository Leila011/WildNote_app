import {
    Progress,
    ProgressLabel,
    ProgressValueLabel,
  } from "~/components/ui/progress";
import { ExperimentDb, ExperimentStats } from "~/types/db";
import { Card } from "~/components/ui/card";
import { Show } from "solid-js";

type Props = {
  experiment: ExperimentDb;
  stat: ExperimentStats;
};

export function GoalsCard({ experiment, stat }: Props) { 


    return(
        <div class="flex flex-row justify-between">
        <Card class="w-[300px]">
        <Show when={experiment.samples_number_goal}>
        <Progress
          value={stat.sample_nb}
          minValue={0}
          maxValue={experiment.samples_number_goal}
          getValueLabel={({ value, max }) =>
            `${value} of ${max} observation sessions completed`
          }
          class="w-[300px] space-y-1"
        >
          <div class="flex justify-between">
            <ProgressLabel>Processing...</ProgressLabel>
            <ProgressValueLabel />
          </div>
        </Progress>
        </Show>
        <Show when={experiment.samples_time_goal}>
        <Progress
          value={stat.sample_time_tot}
          minValue={0}
          maxValue={experiment.samples_time_goal}
          getValueLabel={({ value, max }) =>
            `${value} of ${max} of observation session time completed`
          }
          class="w-[300px] space-y-1"
        >
          <div class="flex justify-between">
            <ProgressLabel>Processing...</ProgressLabel>
            <ProgressValueLabel />
          </div>
        </Progress>
        </Show>
        </Card>
        <Card class="w-[300px]">
          <Show when={experiment.obs_number_goal}>
        <Progress
          value={stat.obs_nb}
          minValue={0}
          maxValue={experiment.obs_number_goal}
          getValueLabel={({ value, max }) =>
            `${value} of ${max} observations completed`
          }
          class="w-[300px] space-y-1"
        >
          <div class="flex justify-between">
            <ProgressLabel>Processing...</ProgressLabel>
            <ProgressValueLabel />
          </div>
        </Progress>
        </Show>
        <Show when={experiment.obs_time_goal}>
        <Progress
          value={(stat.obs_time_tot)}
          minValue={0}
          maxValue={(experiment.obs_time_goal)}
          getValueLabel={({ value, max }) =>
            `${value} of ${max} of observation time completed`
          }
          class="w-[300px] space-y-1"
        >
          <div class="flex justify-between">
            <ProgressLabel>Processing...</ProgressLabel>
            <ProgressValueLabel />
          </div>
        </Progress>
        </Show>
        </Card>
      </div>
    )
}