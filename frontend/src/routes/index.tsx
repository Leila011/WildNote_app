import { Hero } from "~/components/Hero";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
export default function Home() {
  return (
    <main class="text-center">
      <Hero
        title="WildNote"
        primaryButton={{
          text: "Get started",
          href: "/new-experiment",
        }}
        size="md"
        width="1/2"
        align="left"
        image="main.jpg"
      >
        <div class="space-y-3 text-muted-foreground">
          <p>
            Discover a platform designed to collect and manage your ethological
            observations.
          </p>
        </div>
      </Hero>

      <div class="px-36 space-y-6">
        <p class="pt-6">
          Are you tired of struggling with illegible handwritten notes, only to
          realize later forgot to record important data ? Do you lose track of
          time during your observation sessions, or find yourself scrambling to
          transfer data into Excel after a long day of fieldwork?
        </p>
        <p class="text-accent font-bold">
          WildNote offers a solution so you can focus on your study without
          worrying about the details.
        </p>
        <Accordion multiple={false} collapsible class="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>
              Build with ethological science in mind
            </AccordionTrigger>
            <AccordionContent>
              WildNote offers the flexibility to adapt to various research
              needs. Whether you're conducting scan or focal sampling, studying
              known subjects, or working with new ones, you can easily design
              WildNote to match the structure of your experiment.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>
              Easily define you experimental setup
            </AccordionTrigger>
            <AccordionContent>
              <ul class="list-disc list-inside space-y-3">
                <li>
                  Experiment: Name your study, specify if you will observe known
                  subjects, and set goals for the number of records and total
                  observation time.
                </li>
                <li>
                  Subject: Specify the name for your subject and add additional
                  parameters to characterise your subjects such as gender,
                  age,....
                </li>
                <li>
                  Observation session: Set the duration of your observation
                  session as well as additional parameters such as location,
                  weather,... .
                </li>
                <li>
                  Observation: Define parameters you want to record during the
                  observations such as behaviors.
                </li>
              </ul>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>
              Seamless Data Collection and Management
            </AccordionTrigger>
            <AccordionContent>
              <ul class="list-disc list-inside  space-y-3">
                <li>
                  Facilitated Data Encoding: Save time and reduce errors with
                  encoding forms that are automatically generated based on your
                  study design.
                </li>
                <li>
                  Real-Time Validation: The platform checks your data as it is
                  entered based on the constraints that you defined.
                </li>
                <li>
                  Interactive Session Management: Keep track of time with
                  built-in visual timers, and receive reminders your observation
                  session is completed.
                </li>
              </ul>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger>
              Stay on Track with Built-In Dashboards
            </AccordionTrigger>
            <AccordionContent>
              <ul class="list-disc list-inside  space-y-3">
                <li>
                  Comprehensive Dashboards: Monitor your progress with real-time
                  dashboards that provide insights into your data collection.
                </li>
                <li>Descriptive statistics: Get an overview of your data.</li>
                <li>
                  Data Visualization: View your data in charts to identify
                  trends over time and patterns.
                </li>
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </main>
  );
}
