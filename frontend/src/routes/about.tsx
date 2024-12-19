import { TableOfContent } from "~/components/Tableofcontent";
import { CardAbout } from "~/components/CardAbout";
import { Heading } from "~/components/Heading";

export default function About() {
  return (
    <div class="container mx-auto my-8">
      <div class="grid grid-cols-12 gap-4">
        <div class="col-span-11 space-y-4">
          <Heading>Technologies</Heading>
          <div class="flex flex-col space-y-6">
            <div class="grid grid-cols-4 gap-3">
              <CardAbout title="Backend">
                <div class="flex flex-wrap items-center">
                  <ul class="ml-5 space-y-3">
                    <li class="list-disc">
                      <a
                        href="https://flask.palletsprojects.com/"
                        target="_blank"
                        class="inline-block"
                      >
                        Flask
                      </a>
                    </li>
                    <li class="list-disc">
                      <a
                        href="https://sqlite.org/"
                        target="_blank"
                        class="inline-block"
                      >
                        SQLite
                      </a>
                    </li>
                    <li class="list-disc">
                      <a
                        href="https://docs.python.org/3/library/sqlite3.html"
                        target="_blank"
                      >
                        SQLite3
                      </a>
                    </li>
                  </ul>
                </div>
              </CardAbout>

              <CardAbout title="Frontend">
                <div class="flex flex-wrap items-center">
                  <ul class="ml-5 space-y-3">
                    <li class="list-disc">
                      <a href="https://www.solidjs.com/" target="_blank">
                        Solid.js
                      </a>
                    </li>
                    <li class="list-disc">
                      <a href="https://tailwindcss.com/" target="_blank">
                        Tailwind CSS
                      </a>
                    </li>
                    <li class="list-disc">
                      <a href="https://solid-ui.com/" target="_blank">
                        Solid UI
                      </a>
                    </li>
                    <li class="list-disc">
                      <a href="https://apexcharts.com/" target="_blank">
                        Apexcharts
                      </a>
                    </li>
                    <li class="list-disc">
                      <a href="https://www.chartjs.org/" target="_blank">
                        Chart.js
                      </a>
                    </li>
                  </ul>
                </div>
              </CardAbout>
              <CardAbout title="Deployement">
                <ul class="ml-5 space-y-3">
                  <li class="list-disc">
                    <a href="https://tailwindcss.com/" target="_blank">
                      Vercel (frontend)
                    </a>
                  </li>
                  <li class="list-disc">
                    <a href="https://solid-ui.com/" target="_blank">
                      PythonAnywhere (backend)
                    </a>
                  </li>
                </ul>
              </CardAbout>
            </div>
          </div>
          <Heading>Database structure</Heading>
          <img src={"db.png"} alt="Hero image" />

          <Heading>Future Developments</Heading>
          <div class="flex flex-col space-y-6">
            <div class="grid grid-cols-4 gap-3">
              <CardAbout title="Improvements">
                <ul class="ml-5 space-y-3">
                  <li class="list-disc">
                    Create an experiment-specific ID for observations session
                    and observation.
                  </li>
                  <li class="list-disc">
                    Allow the user to modify the experiment structure after
                    creation when no recording have been done yet.
                  </li>
                  <li class="list-disc">Add dashboard tab for subjects.</li>
                  <li class="list-disc">
                    Allow adding one or multiple subject in an observation.
                  </li>
                  <li class="list-disc">
                    Add description and unit for attributes.
                  </li>
                  <li class="list-disc">
                    Show which attributes are created by default when
                    configuring a new experiment.
                  </li>
                  <li class="list-disc">
                    Define further numerical attributes (e.g. discrete, treat as
                    categorial).
                  </li>
                  <li class="list-disc">
                    Adapt for different screen sizes (phone, tablet).
                  </li>
                  <li class="list-disc">
                    Bug to fix: the dashboard fully re-render when switching
                    between experiment.
                  </li>
                  <li class="list-disc">
                    Add constraints in the database to ensure data integrity
                    (e.g. NOT NULL, UNIQUE ) and madapt the frontend to respect
                    them.
                  </li>
                </ul>
              </CardAbout>
              <CardAbout title="Functionalities">
                <ul class="ml-5 space-y-3">
                  <li class="list-disc">
                    Add study types (e.g. scan, focal and other ethological
                    methods) coming with predefined attributes and specific type
                    of analysis.
                  </li>
                  <li class="list-disc">
                    Add a map view for visualizing sample locations with GPS
                    data.
                  </li>
                  <li class="list-disc">Add user login.</li>
                  <li class="list-disc">
                    Implement multi-user mode to collaborate on one experiment.
                  </li>
                  <li class="list-disc">Allow user to add pictures.</li>
                </ul>
              </CardAbout>

              <CardAbout title="Data Management">
                <ul class="ml-5 space-y-3">
                  <li class="list-disc">
                    Export and import experiment setups to replicate study
                    designs.
                  </li>
                  <li class="list-disc">
                    Import external data, such as GPS locations.
                  </li>
                  <li class="list-disc">
                    Duplicate existing setups to use as templates.
                  </li>
                  <li class="list-disc">
                    Enable synchronisation with a cloud service.
                  </li>
                  <li class="list-disc">Export data.</li>
                  <li class="list-disc">
                    Export a printable report with the information from the
                    dashboard.
                  </li>
                </ul>
              </CardAbout>

              <CardAbout title="Visualisations and analysis">
                <ul class="ml-5 space-y-3">
                  <li class="list-disc">
                    Exploring the relationship between two variables
                    (Correlation matrix & heatmap, pairwise box-and-whisker
                    plot, scatter plot, bar chart,..)
                  </li>
                  <li class="list-disc">
                    Comparing the occurence of a behavior across groups
                    (Chi-Square test, t-test, Mann-Whitney U Test, ANOVA,
                    Kruskal-Wallis Test,...)
                  </li>
                  <li class="list-disc">
                    Modeling the occurence of a behavior in relation to other
                    variable(s) (Mixed-effect model, GLM,..)
                  </li>
                </ul>
              </CardAbout>
            </div>
          </div>
        </div>
        <div class="col-span-1 ">
          <div class="fixed">
            <TableOfContent
              content={[
                "Technologies",
                "Database structure",
                "Future developments",
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
