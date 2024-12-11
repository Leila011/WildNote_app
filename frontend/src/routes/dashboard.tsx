
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { createEffect, createResource, createSignal, For, Show } from "solid-js";
import { ExperimentDb, ExperimentStats, StatDescriptives, StatDescriptivesPlot } from "~/types/db";
import { fetchExperiments } from "~/api/fetchExperiments";
import { Button } from "~/components/ui/button";
import { IconChevronDown } from "~/components/icons";
import { GoalsCard } from "~/components/dashboard.tsx/GoalsCard";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/ui/card";
import { fetchStatExperiment } from "~/api/fetchStatExperiment";
import { fetchPlotDescriptives } from "~/api/fetchPlotDescriptives";
import { fetchStatDescriptives } from "~/api/fetchStatDescriptives";

export default function Dashboards() {
  const [experiments] = createResource<ExperimentDb[]>(fetchExperiments);
  const [experiment, setExperiment] = createSignal<ExperimentDb>();

  // fetch stat and plot data
  const [statExperiment, { refetch: refetchStatExp }] = createResource<ExperimentStats|undefined>(() =>
    experiment() ?fetchStatExperiment({ experimentId: Number(experiment()?.experiment_id) }):undefined,
  );

  const [statSamples, { refetch: refetchStatSamples }] = createResource<StatDescriptives|undefined>(() =>
    experiment() ?fetchStatDescriptives({level:"sample", experimentId: Number(experiment()?.experiment_id) }):undefined,
  );
  
  const [statObs, { refetch: refetchStatObs }] = createResource<StatDescriptivesPlot|undefined>(() =>
    experiment() ?fetchStatDescriptives({level:"observation", experimentId: Number(experiment()?.experiment_id) }):undefined,
  );
  const [plotSamples, { refetch: refetchPlotSamples }] = createResource<StatDescriptives|undefined>(() =>
    experiment() ?fetchPlotDescriptives({level:"sample", experimentId: Number(experiment()?.experiment_id) }):undefined,
  );
  const [plotObs, { refetch: refetchPlotObs }] = createResource<StatDescriptivesPlot|undefined>(() =>
    experiment() ?fetchPlotDescriptives({level:"observation", experimentId: Number(experiment()?.experiment_id) }):undefined,
  );

  createEffect(() => {
    console.log("Experiment changed", experiment());
    console.log("Stat changed", statExperiment());
    if (experiment() && !statSamples() && !statObs() && !plotSamples() && !plotObs()) {
      refetchStatExp();
      refetchStatSamples()
      refetchStatObs()
      refetchPlotObs()
      refetchPlotSamples()
    }
  });

  return (
    <div>
      <div>
        <h1>Choose your experiment:</h1>
        <DropdownMenu>
          <DropdownMenuTrigger
            as={Button<"button">}
            variant={"ghost"}
            class={`bg-card text-card-foreground border rounded-md h-10 pl-2 justify-start  w-full`}
          >
            <div class="flex-grow text-left">
              {!experiment() ? "Pick your experiment" : experiment()!.name}
            </div>
            <IconChevronDown />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <For each={experiments()}>
              {(option) => (
                <DropdownMenuItem
                  onSelect={() => {
                    console.log("Selected", option);
                    setExperiment(option);
                  }}
                >
                  <span>{option.name}</span>
                </DropdownMenuItem>
              )}
            </For>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      {experiment() && (
        <Card>
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card Description</CardDescription>
        </CardHeader>
        <CardContent>
           <GoalsCard experiment={experiment()!} stat={statExperiment()!} /> 
        </CardContent>
        <CardFooter>
          <p>Card Footer</p>
        </CardFooter>
        </Card>
      )}
    </div>
  );
}
