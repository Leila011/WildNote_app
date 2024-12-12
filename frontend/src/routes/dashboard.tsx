
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { createEffect, createResource, createSignal, For } from "solid-js";
import { fetchExperiment } from "~/api/fetchExperiment";
import { Button } from "~/components/ui/button";
import { IconChevronDown } from "~/components/icons";
import { GoalsCard } from "~/components/dashboard/GoalsCard";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "~/components/ui/card";
import { fetchStatExperiment } from "~/api/fetchStatExperiment";
import { fetchPlotDescriptives } from "~/api/fetchPlotDescriptives";
import { fetchStatDescriptives } from "~/api/fetchStatDescriptives";
import { fetchExperimentsIdentification } from "~/api/fetchgetExperimentIdentification";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs"
import { Experiment, ExperimentDb, ExperimentStats, StatDescriptives, StatDescriptivesPlot } from "~/types/db";
import Heatmap from "~/components/dashboard/Heatmap";
import { fetchCalendar } from "~/api/fetchCalendar";
import { secondToString } from "~/utils";
import { DescriptiveStatPlot } from "~/components/dashboard/descriptiveStatPlot";
import { DescriptiveStatTable } from "~/components/dashboard/descriptiveStatTable";

export default function Dashboards() {
  const [experiments] = createResource<{name:string, experiment_id:number}[]>(fetchExperimentsIdentification);
  const [experimentId, setExperimentId] = createSignal<number|undefined>(1); //! dev: change back to undefined
  const [sampleVariable, setSampleVariable] = createSignal<string|undefined>(undefined);
  const [obsVariable, setObsVariable] = createSignal<string|undefined>(undefined);
  const [experimentData] = createResource<ExperimentDb>(
    () => experimentId() && ({ experimentId: experimentId() }),
    fetchExperiment
    );

  // fetch stat and plot data
  // typescript is not happy but the reason is weird and it works
  const [experimentStat] = createResource<ExperimentStats>(
    () => experimentId() && ({ experimentId: experimentId() }),
    fetchStatExperiment
    );
    const [samplesStat] = createResource<StatDescriptives>(
      () => experimentId() && ({level:"sample", experimentId: experimentId() }),
      fetchStatDescriptives
    );
    const [obsStat] = createResource<StatDescriptives>(
      () => experimentId() && ({level:"observation", experimentId: experimentId() }),
      fetchStatDescriptives
    );
    const [samplesPlot] = createResource<StatDescriptivesPlot>(
      () => experimentId() && ({level:"sample", experimentId: experimentId() }),
      fetchPlotDescriptives
    );

    const [obsPlot] = createResource<StatDescriptivesPlot>(
      () => experimentId() && ({level:"observation", experimentId: experimentId() }),
      fetchPlotDescriptives
    );

    const [calendar] = createResource<any>(
      () => experimentId() && ({experimentId: experimentId() }),
      fetchCalendar
    );

    createEffect(() => {
      console.log("experimentData", experimentData());
      console.log("experimentStat", experimentStat());
      console.log("samplesStat", samplesStat());
      console.log("ObsStat", obsStat());
      console.log("samplesPlot", samplesPlot());
      console.log("ObsPlot", obsPlot());
      console.log("calendar", calendar());
      console.log("obsVariable", obsVariable());
      console.log("sampleVariable", sampleVariable());
      samplesStat() && sampleVariable() && console.log("stat sample var", samplesStat()[sampleVariable()!])
    } );

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
              {!experimentId() ? "Pick your experiment" : experimentId()!.name}
            </div>
            <IconChevronDown />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <For each={experiments()}>
              {(option) => (
                <DropdownMenuItem
                  onSelect={() => {
                    console.log("Selected", option);
                    setExperimentId(option.experiment_id);
                  }}
                >
                  <span>{option.name}</span>
                </DropdownMenuItem>
              )}
            </For>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <Tabs defaultValue="account" class="w-full">
  <TabsList class="grid w-full grid-cols-4">
    <TabsTrigger value="overview">Overview</TabsTrigger>
    <TabsTrigger value="overview-sample">Observation sessions</TabsTrigger>
    <TabsTrigger value="overview-obs">Observations</TabsTrigger>
    <TabsTrigger value="datasanity">Data quality</TabsTrigger>
  </TabsList>
  <TabsContent value="overview">
  <div class="flex flex-row space-x-3">

        <Card>
        <CardHeader>
          <CardTitle>Goals</CardTitle>
        </CardHeader>
        <CardContent>
       { experimentData() && experimentStat() && <GoalsCard experiment={experimentData()!} stat={experimentStat()!} /> }
        </CardContent>
 
        </Card>
        <Card>
        <CardHeader>
          <CardTitle>Calendar</CardTitle>
        </CardHeader>
        <CardContent>
        { calendar() && <Heatmap series={calendar()["2024"].series} /> }
        </CardContent>
 
        </Card>

        </div>

  </TabsContent>


        <TabsContent value="overview-sample">
        <div>
        <h1>Select a variable:</h1>
        <DropdownMenu>
          <DropdownMenuTrigger
            as={Button<"button">}
            variant={"ghost"}
            class={`bg-card text-card-foreground border rounded-md h-10 pl-2 justify-start  w-full`}
          >
            <div class="flex-grow text-left">
              {!samplesStat() ? "Select a variable" : sampleVariable()!}
            </div>
            <IconChevronDown />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <For each={Object.keys(samplesStat())}>
              {(option) => (
                <DropdownMenuItem
                  onSelect={() => {
                    console.log("Selected", option);
                    setSampleVariable(option);
                  }}
                >
                  <span>{option}</span>
                </DropdownMenuItem>
              )}
            </For>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div class="flex flex-row">

        <Card>
        <CardContent>
        {samplesStat() && sampleVariable() &&  <DescriptiveStatTable stats={()=>samplesStat()[sampleVariable()!]}/>}
        </CardContent>
        </Card>
        <Card>
        <CardContent>
        {samplesPlot() && sampleVariable() &&  <DescriptiveStatPlot stats={()=>samplesPlot()[sampleVariable()!]} name={sampleVariable()!}/>}
        </CardContent>
        </Card>
        </div>
        </TabsContent>
        <TabsContent value="overview-obs">
        <div>
        <h1>Select a variable:</h1>
        <DropdownMenu>
          <DropdownMenuTrigger
            as={Button<"button">}
            variant={"ghost"}
            class={`bg-card text-card-foreground border rounded-md h-10 pl-2 justify-start  w-full`}
          >
            <div class="flex-grow text-left">
              {!obsStat() ? "Select a variable" : obsVariable()!}
            </div>
            <IconChevronDown />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <For each={Object.keys(obsStat())}>
              {(option) => (
                <DropdownMenuItem
                  onSelect={() => {
                    console.log("Selected", option);
                    setObsVariable(option);
                  }}
                >
                  <span>{option}</span>
                </DropdownMenuItem>
              )}
            </For>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
        <div class="flex flex-row">

        <Card>
        <CardContent>
        {obsStat() && obsVariable() && <DescriptiveStatTable stats={()=>obsStat()[obsVariable()!]}/>}
        </CardContent>
        </Card>
        <Card>
        <CardContent>
        {obsPlot() && obsVariable()&&  <DescriptiveStatPlot stats={()=>obsPlot()[obsVariable()!]} name={sampleVariable()!}/>}
        </CardContent>
        </Card>
        </div>
        </TabsContent>
        <TabsContent value="datasanity"></TabsContent>

        </Tabs>
        
    </div>
  );
}
