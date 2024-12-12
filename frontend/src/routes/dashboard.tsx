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
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { fetchStatExperiment } from "~/api/fetchStatExperiment";
import { fetchPlotDescriptives } from "~/api/fetchPlotDescriptives";
import { fetchStatDescriptives } from "~/api/fetchStatDescriptives";
import { fetchExperimentsIdentification } from "~/api/fetchgetExperimentIdentification";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import {
  ExperimentDb,
  ExperimentStats,
  ObservationDb,
  SampleDb,
  StatDescriptives,
  StatDescriptivesPlot,
} from "~/types/db";
import Heatmap from "~/components/dashboard/Heatmap";
import { fetchCalendar } from "~/api/fetchCalendar";
import { DescriptiveStatPlot } from "~/components/dashboard/descriptiveStatPlot";
import { DescriptiveStatTable } from "~/components/dashboard/descriptiveStatTable";
import { fetchPlotPolar } from "~/api/fetchPlotPolar";
import { PolarPlot } from "~/components/dashboard/PolarPlot";
import { Heading } from "~/components/Heading";
import { getDate } from "~/utils/db";
import { fetchObservationsExperiment } from "~/api/fetchObservationsExperiment";
import Timeline from "~/components/dashboard/Timeline";
import { fetchSamplesColumns } from "~/api/fetchSamplesColumns";


export default function Dashboards() {
  const [experiments] = createResource<
    { name: string; experiment_id: number }[]
  >(fetchExperimentsIdentification);
  const [experimentId, setExperimentId] = createSignal<number | undefined>(1); //! dev: change back to undefined
  const [sampleVariable, setSampleVariable] = createSignal<string | undefined>(
    undefined,
  );
  const [obsVariable, setObsVariable] = createSignal<string | undefined>(
    undefined,
  );
  const [experimentData] = createResource<ExperimentDb>(
    () => experimentId() && { experimentId: experimentId() },
    fetchExperiment,
  );

  // fetch stat and plot data
  // typescript is not happy but the reason is weird and it works
  const [experimentStat] = createResource<ExperimentStats>(
    () => experimentId() && { experimentId: experimentId() },
    fetchStatExperiment,
  );
  const [samplesStat] = createResource<StatDescriptives>(
    () => experimentId() && { level: "sample", experimentId: experimentId() },
    fetchStatDescriptives,
  );
  const [obsStat] = createResource<StatDescriptives>(
    () =>
      experimentId() && { level: "observation", experimentId: experimentId() },
    fetchStatDescriptives,
  );
  const [samplesPlot] = createResource<StatDescriptivesPlot>(
    () => experimentId() && { level: "sample", experimentId: experimentId() },
    fetchPlotDescriptives,
  );

  const [obsPlot] = createResource<StatDescriptivesPlot>(
    () =>
      experimentId() && { level: "observation", experimentId: experimentId() },
    fetchPlotDescriptives,
  );

  const [calendar] = createResource<any>(
    () => experimentId() && { experimentId: experimentId() },
    fetchCalendar,
  );

  const [samplePolar] = createResource<any>(
    () => experimentId() && { level: "sample", experimentId: experimentId() },
    fetchPlotPolar,
  );

  const [obsPolar] = createResource<any>(
    () =>
      experimentId() && { level: "observation", experimentId: experimentId() },
    fetchPlotPolar,
  );

  const [sampleData] = createResource(
    () =>
      experimentId() && {experimentId: experimentId() },
    fetchSamplesColumns,
  );

  const [obsData] = createResource(
    () =>
      experimentId() && {experimentId: experimentId() },
    fetchObservationsExperiment,
  );

  createEffect(() => {
    if (obsStat() && !obsVariable()) {
      setObsVariable(Object.keys(obsStat())[0]);
    }
    if (samplesStat() && !sampleVariable()) {
      setSampleVariable(Object.keys(samplesStat())[0]);
    }
    console.log("experimentData", experimentData());
    console.log("experimentStat", experimentStat());
    console.log("samplesStat", samplesStat());
    console.log("ObsStat", obsStat());
    console.log("samplesPlot", samplesPlot());
    console.log("ObsPlot", obsPlot());
    console.log("calendar", calendar());
    console.log("obsVariable", obsVariable());
    console.log("sampleVariable", sampleVariable());
    console.log("samplePolar", samplePolar());
    console.log("obsPolar", obsPolar());
    console.log("sampleData", sampleData());
    console.log("obsData", obsData());
    samplesStat() &&
      sampleVariable() &&
      console.log("stat sample var", samplesStat()[sampleVariable()!]);
  });

  return (
    <div >
      <div class="flex flex-row justify-between items-baseline px-10">
      {experimentData()&&<Heading class="py-4">{`${experimentData().name} (from ${getDate(experimentData().timestamp_start)} to ${getDate(experimentData().timestamp_end) ?? "ongoing"})`}</Heading>}

        <div>
        <DropdownMenu>
          <DropdownMenuTrigger
            as={Button<"button">}
            variant={"ghost"}
            class={`bg-card text-card-foreground border rounded-md h-6 pl-2 justify-start  w-full`}
          >
            <div class="flex-grow text-left m-10">
             {`See another experiment`}
        

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
                </DropdownMenuItem>
              )}
            </For>
          </DropdownMenuContent>
        </DropdownMenu>
        </div>
      </div>
      <div class="px-4">
      <Tabs defaultValue="overview" class="w-full  rounded-md">
        <TabsList class="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="overview-sample">
            Observation sessions
          </TabsTrigger>
          <TabsTrigger value="overview-obs">Observations</TabsTrigger>
          <TabsTrigger value="datasanity">Data quality</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" class="bg-secondary p-4 rounded-md">
          <div class="space-y-4">
            <div class="flex flex-row space-x-4">
              <div class='h-1/3'>
              <Card class="bg-muted">
                <CardHeader class="py-2">
                  <CardTitle>Goals</CardTitle>
                </CardHeader>
                <CardContent>
                  {experimentData() && experimentStat() && (
                    <GoalsCard
                      experiment={experimentData()!}
                      stat={experimentStat()!}
                    />
                  )}
                </CardContent>
              </Card>
              </div>
              <div class='h-1/3'>
              <Card class="bg-muted">
                <CardHeader class="py-2">
                  <CardTitle>Calendar</CardTitle>
                </CardHeader>
                <CardContent>
                  {calendar() && <Heatmap series={calendar()["2024"].series} />}
                </CardContent>
              </Card>
              </div>
            </div>
            <div class="flex flex-row space-x-4 h-1/3">
            <Card class="bg-muted">
                <CardHeader class="py-2">
                  <CardTitle>Time</CardTitle>
                </CardHeader>
                <CardContent>
                  <div class="flex flex-row space-x-4">
                  {samplePolar() && (
                    <PolarPlot
                      data={() => samplePolar()}
                      level={"sample"}	
                    />
                  )}
          
                  {obsPolar() && (
                    <PolarPlot
                      data={() => obsPolar()}
                      level={"observation"}	
                    />
                  )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="overview-sample" class="bg-secondary p-4 rounded-md">
        <div class="flex flex-col space-y-4">
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
          <div class="flex flex-row space-x-4">
            <Card class="bg-muted">
              <CardContent>
                {samplesStat() && sampleVariable() && (
                  <DescriptiveStatTable
                    stats={() => samplesStat()[sampleVariable()!]}
                  />
                )}
              </CardContent>
            </Card>
            <Card class="bg-muted">
              <CardContent>
                {samplesPlot() && sampleVariable() && (
                  <DescriptiveStatPlot
                    stats={() => samplesPlot()[sampleVariable()!]}
                    name={sampleVariable()!}
                  />
                )}
              </CardContent>
            </Card>
            <Card class="bg-muted">
              <CardContent>
                {sampleData() && sampleVariable() && (
                  <Timeline
                    values={() => sampleData()[sampleVariable()!]}	
                    time={()=> sampleData()["timestamp_start"]}
                    name={sampleVariable()!}
                  />
                )}
              </CardContent>
            </Card>
          </div>
          </div>
        </TabsContent>
        <TabsContent value="overview-obs" class="bg-secondary p-4 rounded-md">
          <div class="flex flex-col space-y-4">
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
            
    
          <div class="flex flex-row space-x-4 ">
            <Card class="bg-muted">
              <CardContent>
                {obsStat() && obsVariable() && (
                  <DescriptiveStatTable
                    stats={() => obsStat()[obsVariable()!]}
                  />
                )}
              </CardContent>
            </Card>
            <Card class="bg-muted">
              <CardContent>
                {obsPlot() && obsVariable() && (
                  <DescriptiveStatPlot
                    stats={() => obsPlot()[obsVariable()!]}
                    name={sampleVariable()!}
                  />
                )}
              </CardContent>
            </Card>
          </div>
          </div>
        </TabsContent>
        <TabsContent value="datasanity"></TabsContent>
      </Tabs>
      </div>
    </div>
  );
}
