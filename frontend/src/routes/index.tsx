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
          href: "/newExperiment",
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
          <p></p>
        </div>
      </Hero>

      <div class="px-36">

        <Accordion multiple={false} collapsible class="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>
              Build with ethological science in mind
            </AccordionTrigger>
            <AccordionContent>
              Viash Hub provides a centralized platform for storing and managing
              scripts and data pipelines in the form of standardized executable
              building blocks, including the source code, ensuring easy
              accessibility for the entire team.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>
              A Smarter Way to Design Your Research
            </AccordionTrigger>
            <AccordionContent>
              WildNote supports you at every step of your experimental design
              process: 
              WildNote supports you at every step of your experimental design
              process: 
              <ul class="list-disc list-inside">
                <li>Define Key Study Attributes: Easily set up the variables that matter most—such as the context of your observations, behaviors to monitor, and environmental factors.</li>
                <li>Structure Observation Sessions: Tailor the duration, intervals, and framework of your sessions to align perfectly with your research goals.</li>
                <li>Detail-Oriented Data Collection: Specify all relevant parameters to ensure that each observation session is comprehensive and consistent.</li>
              </ul>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>
              Seamless Data Collection and Management
            </AccordionTrigger>
            <AccordionContent>
            <ul class="list-disc list-inside">
                <li>Automatic Data Encoding: Save time and reduce errors with encoding that’s automatically generated based on your study design.</li>
                <li>Real-Time Validation: The platform checks your data as it’s entered, ensuring accuracy and alignment with your experimental setup.</li>
                <li>Interactive Session Management: Keep track of time with built-in visual timelines, and receive reminders when observation sessions are nearing completion.</li>
              </ul>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger>
              Stay on Track with Built-In Dashboards
            </AccordionTrigger>
            <AccordionContent>
            <ul class="list-disc list-inside">
                <li>Comprehensive Dashboards: Monitor your progress with real-time dashboards that provide insights into your data collection and analysis.</li>
                <li>Customizable Views: Tailor the dashboard views to focus on the metrics that matter most to your research.</li>
                <li>Exportable Reports: Generate detailed reports that can be easily shared with your team or included in your research publications.</li>
              </ul>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-5">
            <AccordionTrigger>
              Secure and Reliable for Fieldwork
            </AccordionTrigger>
            <AccordionContent>
              <ul class="list-disc list-inside">
                <li>Safe Data Storage: All your data is securely stored, giving you peace of mind.</li>
                <li>Offline Capability: Continue working in remote areas without internet access, and seamlessly sync your data when back online.</li>
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </main>
  );
}
