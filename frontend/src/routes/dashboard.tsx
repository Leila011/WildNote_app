import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import {
  batch,
  createEffect,
  createResource,
  createSignal,
  For,
  onMount,
  Show,
} from "solid-js";
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
  StatCalendar,
  StatDescriptives,
  StatDescriptivesPlot,
  StatPolar,
  StatTimeline,
  StatusExperiment,
} from "~/types/db";
import Heatmap from "~/components/dashboard/Heatmap";
import { fetchCalendar } from "~/api/fetchCalendar";
import { DescriptiveStatPlot } from "~/components/dashboard/descriptiveStatPlot";
import { DescriptiveStatTable } from "~/components/dashboard/descriptiveStatTable";
import { fetchPlotPolar } from "~/api/fetchPlotPolar";
import { PolarPlot } from "~/components/dashboard/PolarPlot";
import { Heading } from "~/components/Heading";
import { getDate } from "~/utils/db";
import { fetchStatTimeline } from "~/api/fetchStatTimeline";
import Timeline from "~/components/dashboard/Timeline";

export default function Dashboards() {
  const [experiments] = createResource<
    { name: string; experiment_id: number; status: StatusExperiment }[]
  >(fetchExperimentsIdentification);

  const [experimentId, setExperimentId] = createSignal<number | undefined>(
    undefined,
  );
  const [sampleVariable, setSampleVariable] = createSignal<string>("duration");
  const [obsVariable, setObsVariable] = createSignal<string>("duration");
  const [selectedTab, setSelectedTab] = createSignal<string>("overview");

  const [experimentData] = createResource<ExperimentDb>(
    () => (experimentId() ? { experimentId: experimentId() } : undefined),
    fetchExperiment,
  );

  // fetch stat and plot data
  // typescript is not happy but the reason is weird and it works
  const [experimentStat] = createResource<ExperimentStats>(
    () => (experimentId() ? { experimentId: experimentId() } : undefined),
    fetchStatExperiment,
  );

  const [samplesStat] = createResource<StatDescriptives>(
    () =>
      experimentId()
        ? { level: "sample", experimentId: experimentId() }
        : undefined,
    fetchStatDescriptives,
  );

  const [obsStat] = createResource<StatDescriptives>(
    () =>
      experimentId()
        ? { level: "observation", experimentId: experimentId() }
        : undefined,
    fetchStatDescriptives,
  );

  const [samplesPlot] = createResource<StatDescriptivesPlot>(
    () =>
      experimentId()
        ? { level: "sample", experimentId: experimentId() }
        : undefined,
    fetchPlotDescriptives,
  );

  const [obsPlot] = createResource<StatDescriptivesPlot>(
    () =>
      experimentId()
        ? { level: "observation", experimentId: experimentId() }
        : undefined,
    fetchPlotDescriptives,
  );

  const [calendar] = createResource<StatCalendar[]>(
    () => (experimentId() ? { experimentId: experimentId() } : undefined),
    fetchCalendar,
  );

  const [samplePolar] = createResource<StatPolar>(
    () =>
      experimentId()
        ? { level: "sample", experimentId: experimentId() }
        : undefined,
    fetchPlotPolar,
  );

  const [obsPolar] = createResource<StatPolar>(
    () =>
      experimentId()
        ? { level: "observation", experimentId: experimentId() }
        : undefined,
    fetchPlotPolar,
  );

  const [sampleTimeline] = createResource<StatTimeline[]>(
    () =>
      experimentId()
        ? { experimentId: experimentId(), level: "sample" }
        : undefined,
    fetchStatTimeline,
  );

  const [obsTimeline] = createResource<StatTimeline[]>(
    () =>
      experimentId()
        ? { experimentId: experimentId(), level: "observation" }
        : undefined,
    fetchStatTimeline,
  );

  createEffect(() => {
    if (experiments() && !experimentId()) {
      const eligibleExperiments = experiments()!.filter(
        (e) => e.status !== "created",
      );
      setExperimentId(
        eligibleExperiments[eligibleExperiments!.length - 1].experiment_id,
      );
    }
    if (obsStat() && !obsVariable()) {
      setObsVariable(Object.keys(obsStat())[0]);
    }
    if (samplesStat() && !sampleVariable()) {
      setSampleVariable(Object.keys(samplesStat())[0]);
    }
    if (samplePolar()) {
      setSamplePolarData(samplePolar());
    }
    if (obsPolar()) {
      setObsPolarData(obsPolar());
    }
  });
  // fix for the polar plot diseapearing on data change
  // set to undefined when user change the experience to force the component to rerender
  const [samplePolarData, setSamplePolarData] = createSignal<StatPolar>();
  const [obsPolarData, setObsPolarData] = createSignal<StatPolar>();

  const [title, setTitle] = createSignal<string>("No experiment selected");

  createEffect(() => {
    if (experimentData()) {
      const to = experimentData().timestamp_end
        ? `to ${getDate(experimentData().timestamp_end)}`
        : "(ongoing)";
      setTitle(
        `${experimentData().name} (from ${getDate(experimentData().timestamp_start)} ${to})`,
      );
    }
  });

  return (
    <div>
      <div class="flex flex-row justify-between items-baseline px-10">
        <Heading class="py-4">{title()}</Heading>

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
              <For each={experiments()?.filter((e) => e.status !== "created")}>
                {(option) => (
                  <DropdownMenuItem
                    onSelect={() => {
                      batch(() => {
                        setObsPolarData(undefined);
                        setSamplePolarData(undefined);

                        setExperimentId(option.experiment_id);
                        setSelectedTab("overview");
                      });
                    }}
                  >
                    <span>{option.name}</span>
                  </DropdownMenuItem>
                )}
              </For>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div class="px-4">
        <Tabs
          defaultValue="overview"
          class="w-full  rounded-md"
          value={selectedTab()}
          onChange={setSelectedTab}
        >
          <TabsList class="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="overview-sample">
              Observation sessions
            </TabsTrigger>
            <TabsTrigger value="overview-obs">Observations</TabsTrigger>
            <TabsTrigger value="subject">Subject</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" class="bg-secondary p-4 rounded-md">
            <div class="flex flex-row space-x-4">
              <div class="flex flex-col space-y-4">
                <div class="">
                  <Card class="bg-muted">
                    <CardHeader class="py-2">
                      <CardTitle>Goals</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Show
                        when={experimentData() && experimentStat()}
                        fallback={<div>Loading experiment statistics...</div>}
                      >
                        {(stat) => (
                          <GoalsCard
                            experiment={experimentData()!}
                            stat={stat()}
                          />
                        )}
                      </Show>
                    </CardContent>
                  </Card>
                </div>
                <div class="">
                  <Card class="bg-muted">
                    <CardHeader class="py-2">
                      <CardTitle>
                        Calendar of the observation sessions
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Show
                        when={calendar()}
                        fallback={<div>Loading calendar data...</div>}
                      >
                        {(data) => (
                          <For each={Object.keys(data())}>
                            {(year) => (
                              <Heatmap
                                series={data()[Number(year)].series}
                                year={Number(year)}
                              />
                            )}
                          </For>
                        )}
                      </Show>
                    </CardContent>
                  </Card>
                </div>
              </div>
              <div class="flex flex-col space-y-4 w-full">
                <Card class="bg-muted w-full pb-1">
                  <CardHeader class="py-2">
                    <CardTitle>
                      Distribution of the records accross hours
                    </CardTitle>
                  </CardHeader>
                  <CardContent class="items-center">
                    <div class="flex flex-col space-y-6">
                      <div>
                        <Show
                          when={samplePolarData()}
                          fallback={<div>Loading...</div>}
                        >
                          {(data) => <PolarPlot data={data} level="sample" />}
                        </Show>
                      </div>
                      <div>
                        <Show
                          when={obsPolarData()}
                          fallback={<div>Loading...</div>}
                        >
                          {(data) => (
                            <PolarPlot data={data} level="observation" />
                          )}
                        </Show>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent
            value="overview-sample"
            class="bg-secondary p-4 rounded-md"
          >
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
                <Card class="bg-muted w-full">
                  <CardHeader class="py-2">
                    <CardTitle>Metrics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {samplesStat() && sampleVariable() && (
                      <DescriptiveStatTable
                        stats={() => samplesStat()[sampleVariable()!]}
                      />
                    )}
                  </CardContent>
                </Card>
                <Card class="bg-muted">
                  <CardHeader class="py-2">
                    <CardTitle>Distribution</CardTitle>
                  </CardHeader>
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
                  <CardHeader class="py-2">
                    <CardTitle>Timeline</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {sampleTimeline() && sampleVariable() && (
                      <Timeline
                        data={() =>
                          sampleVariable() && sampleTimeline()[sampleVariable()]
                        }
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
                <Card class="bg-muted w-full">
                  <CardHeader class="py-2">
                    <CardTitle>Metrics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {obsStat() && obsVariable() && (
                      <DescriptiveStatTable
                        stats={() => obsStat()[obsVariable()!]}
                      />
                    )}
                  </CardContent>
                </Card>
                <Card class="bg-muted">
                  <CardHeader class="py-2">
                    <CardTitle>Distribution</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {obsPlot() && obsVariable() && (
                      <DescriptiveStatPlot
                        stats={() => obsPlot()[obsVariable()!]}
                        name={obsVariable()!}
                      />
                    )}
                  </CardContent>
                </Card>
                <Card class="bg-muted">
                  <CardHeader class="py-2">
                    <CardTitle>Timeline</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {obsTimeline() && obsVariable() && (
                      <Timeline
                        data={() => obsVariable && obsTimeline()[obsVariable()]}
                        name={obsVariable()!}
                      />
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="subject"></TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
