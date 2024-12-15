import { TableOfContent } from "~/components/tableofcontent";
import { CardAbout } from "~/components/CardAbout";
import { Heading } from "~/components/Heading";

export default function About() {
  return (
    <div class="container mx-auto my-8">
      <div class="grid grid-cols-12 gap-4">
        <div class="col-span-11 space-y-4">
          <Heading>Introduction</Heading>
          <div>
            WildNote is designed to simplify and enhance the process of
            collecting and managing ethological observation data. It addresses
            the common challenges researchers face, providing a reliable and
            efficient alternative to traditional methods like paper notes and
            spreadsheet storage. WildNote is specifically tailored for
            ethological research, where experiments follow a clear structure
            that includes experiment, observation session, and observation
            levels.
          </div>
          <ul class="ml-5 space-y-3">

            <li class="list-disc">
              For focal sampling: WildNote facilitates focused observations of a
              single subject over a set duration, making it easier to track
              specific behaviors and interactions.
            </li>
            <li class="list-disc">
              Scan sampling: WildNote helps researchers collect data by allowing
              them to observe and record behaviors of multiple subjects at set
              intervals, ensuring systematic and consistent data capture.
            </li>
          </ul>
          <div>
            This structured approach, combined with real-time data validation
            and intuitive user interfaces, ensures an easy, error-free, and
            efficient observation process, reducing the risk of lost data and
            enhancing the reliability of your research outcomes.
          </div>
          <Heading>Functionality</Heading>
          <div class="flex flex-col space-y-6">
            <div class="grid grid-cols-4 gap-3">
              <CardAbout title="Simplified data recording with custom forms">
                <ul class="ml-5 space-y-3">

                  <li class="list-disc">
                    Specify the parameters recorded during your experiment.
                  </li>
                  <li class="list-disc">
                    Custom forms are generated based on your experimental
                    structure to facilitate recording your data.
                  </li>
                  <li class="list-disc">
                    Characterise the subjects you are observing ahead of time or
                    during the observation session.
                  </li>
                </ul>
              </CardAbout>
              <CardAbout title="Data validation and accuracy">
                <ul class="ml-5 space-y-3">

                  <li class="list-disc">
                    Define validation rules for each experimental parameter.
                  </li>
                  <li class="list-disc">
                    Real-time checks reduce errors during data input.
                  </li>
                  <li class="list-disc">
                    Automatically logs the start and end times of observation
                    sessions and observations.
                  </li>
                  <li class="list-disc">
                    Displays a countdown timer when session durations are
                    defined, helping you stay aware of the remaining time.
                  </li>
                </ul>
              </CardAbout>
              <CardAbout title="Secure and Accessible Data Storage">
                <ul class="ml-5 space-y-3">

                  <li class="list-disc">
                    All observations and session data are saved in a secure
                    database.
                  </li>
                  <li class="list-disc">
                    Access all your studies and their associated data in one
                    place.
                  </li>
                  <li class="list-disc">
                    Usable offline which make it perfect for a remote field trip.
                  </li>
                </ul>
              </CardAbout>

              <CardAbout title="Dashboard for Progress and Insights">
                <ul class="ml-5 space-y-3">

                  <li class="list-disc">
                    Visualize your advancement toward observation and session
                    targets.
                  </li>
                  <li class="list-disc">
                    Instantly access summaries and key metrics from your data.
                  </li>
                </ul>
              </CardAbout>
            </div>
          </div>
          <Heading>Technologies</Heading>
          <div class="flex flex-col space-y-6">
            <div class="grid grid-cols-4 gap-3">
              <CardAbout title="Flask">
                <div class="flex flex-wrap items-center">
                  The backend is built with
                  <a
                    href="https://flask.palletsprojects.com/"
                    target="_blank"
                    class="ml-1 inline-block"
                  >
                    Flask,
                  </a>
                  a lightweight and flexible web framework in Python.
                </div>
                Advantage:
                <ul class="ml-5 space-y-3">

                  <li class="list-disc">
                    'Add what you need' type of framework: easy and fast to
                    configure, which make it suitable for prototype
                    developments.
                  </li>
                  <li class="list-disc">
                    Grow with your needs: you can add more features and
                    libraries along the way.
                  </li>
                </ul>
              </CardAbout>
              <CardAbout title="SQLite & SQLite3">
                <div class="flex flex-wrap items-center">
                  The database is powered using:
                  <ul class="ml-5 space-y-3">

                    <li class="list-disc">
                      <a
                        href="https://sqlite.org/"
                        target="_blank"
                        class="inline-block"
                      >
                        SQLite
                      </a>
                      , a lightweight yet powerful database system for secure
                      data storage.
                    </li>
                    <li class="list-disc">
                      <a
                        href="https://docs.python.org/3/library/sqlite3.html"
                        target="_blank"
                      >
                        SQLite3
                      </a>
                      a Python interface for SQLite databases.
                    </li>
                  </ul>
                </div>
                Advantages:
                <ul class="ml-5 space-y-3">

                  <li class="list-disc">Lightweight disk-based database.</li>
                  <li class="list-disc">
                    Easily portable to larger database (e.g., PostgreSQL or
                    Oracle) if necessary.
                  </li>
                </ul>
              </CardAbout>

              <CardAbout title="Solid.js, Tailwind CSS, Solid UI, Chart.js & Apexcharts">
                <div class="flex flex-wrap items-center">
                  The frontend is built and styled with:
                  <ul class="ml-5 space-y-3">
                  <li class="list-disc">
                    <a href="https://tailwindcss.com/" target="_blank">
                    Solid.js,
                    </a>
                    , a reactive JavaScript library ensuring a fast and interactive
                    user experience.
                  </li>
                  <li class="list-disc">
                    <a href="https://tailwindcss.com/" target="_blank">
                      Tailwind CSS
                    </a>
                    , an utility-first CSS framework.
                  </li>
                  <li class="list-disc">
                    <a href="https://solid-ui.com/" target="_blank">
                      Solid UI
                    </a>
                    , which provide customizable UI components.
                  </li>
                  <li class="list-disc">
                    <a href="https://solid-ui.com/" target="_blank">
                      Apexcharts
                    </a>
                    , a library for charts (heatmap).
                  </li>
                  <li class="list-disc">
                    <a href="https://solid-ui.com/" target="_blank">
                      Chart.js
                    </a>
                    , a library for charts.
                  </li>
                </ul>
                </div>
              </CardAbout>
              <CardAbout title="Vercel & PythonAnywhere">
                The tool is deployed using:
                <ul class="ml-5 space-y-3">

                  <li class="list-disc">
                    <a href="https://tailwindcss.com/" target="_blank">
                      Vercel
                    </a>
                    , a cloud-based platform for deploying and hosting frontend web applications.
                  </li>
                  <li class="list-disc">
                    <a href="https://solid-ui.com/" target="_blank">
                      PythonAnywhere
                    </a>
                    , a cloud-based platform for hosting Python applications.
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
                    Create an experiment-specific ID for observations session and
                    observation.
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
                    Define further numerical attributes (e.g. discrete, treat as categorial).
                  </li>
                  <li class="list-disc">
                  Adapt for different screen sizes (phone, tablet).
                  </li>
                  <li class="list-disc">
                    Bug to fix: the dashboard fully re-render when switching
                    between experiment.
                  </li>
                  <li class="list-disc">
                    Add constraints in the database to ensure data integrity (e.g. NOT NULL ).
                  </li>
                </ul>
              </CardAbout>
              <CardAbout title="Functionalities">
                <ul class="ml-5 space-y-3">

                  <li class="list-disc">
                    Add study type coming with pre-defined attributes.
                  </li>
                  <li class="list-disc">
                    Add a map view for visualizing sample locations with GPS
                    data.
                  </li>
                  <li class="list-disc">Add user login.</li>
                  <li class="list-disc">
                    Implement multi-user mode to collaborate on one experiment.
                  </li>
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
                </ul>
              </CardAbout>

              <CardAbout title="Visualisations and analysis">
                Bi-variate visualisation:
                <ul class="ml-5 space-y-3">

                  <li class="list-disc">Correlation matrix + heatmap</li>
                  <li class="list-disc">
                  Box-and-whisker plot, scatter plot, bar chart.
                  </li>
                </ul>
                Multi-variate visualisation:
                <ul class="ml-5 space-y-3">

                  <li class="list-disc">PCA.</li>
                </ul>
                Modeling:
                <ul class="ml-5 space-y-3">

                  <li class="list-disc">
                    Mixed-effect model: model data while taking into account its
                    hierarchical structure.
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
                "Introduction",
                "Functionality",
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
