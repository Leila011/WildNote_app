import { TableOfContent } from "~/components/tableofcontent";
import { Card } from "~/components/card";
import { Heading } from "~/components/Heading";

export default function About() {
  return (
    <div class="container mx-auto">
      <div class="grid grid-cols-12 gap-4">
        <div class="col-span-11 space-y-4">
          <Heading>Introduction</Heading>
            <div>
            WildNote is designed to simplify and enhance the process of collecting and managing ethological observation data. It addresses the common challenges researchers face, providing a reliable and efficient alternative to traditional methods like paper notes and spreadsheet storage.

WildNote is specifically tailored for ethological research, where experiments follow a clear structure that includes experiment, observation session, and observation levels.
</div>
<ul>
      <li class="list-disc">For focal sampling: WildNote facilitates focused observations of a single subject over a set duration, making it easier to track specific behaviors and interactions.
      </li>
        <li class="list-disc">Scan sampling: WildNote helps researchers collect data by allowing them to observe and record behaviors of multiple subjects at set intervals, ensuring systematic and consistent data capture.</li>
</ul>
<div>
This structured approach, combined with real-time data validation and intuitive user interfaces, ensures a streamlined, error-free, and efficient observation process, reducing the risk of lost data and enhancing the reliability of your research outcomes.
</div>    
            <Heading>Functionality</Heading>
<div class="flex flex-col space-y-6">
  <div class="grid grid-cols-4 gap-3">
    <Card title="Simplified Data Recording with custom Forms">
      <ul>
      <li class="list-disc">Specify the parameters recorded during your experiment.</li>
        <li class="list-disc">Set validation rules for each attribute, ensuring consistent and error-free data collection. Validation rules are enforced in real-time, reducing errors and improving data accuracy.</li>
        <li class="list-disc">Add detailed information about the subjects you are observing.</li>
        <li class="list-disc">Custom forms are generated based on your experimental structure to record observations.</li>
        <li class="list-disc">The intuitive interface ensures that recording behavioral observations is fast and straightforward.</li>
      </ul>
    </Card>
    <Card title="Data validty">
      <ul>
        <li class="list-disc">Real-time checks reduce errors during data input.</li>
        <li class="list-disc">Enforces experiment-specific constraints automatically.</li>
        <li class="list-disc">Automatically logs the start and end times of observation sessions and individual observations.</li>
        <li class="list-disc">Displays a countdown timer when session durations are defined, helping you stay aware of the remaining time.</li>
        <li class="list-disc">Ensures precise time-stamping for all data entries.</li>
      </ul>
    </Card>
    <Card title="Secure and Accessible Data Storage">
      <ul>
        <li class="list-disc">All observations and session data are saved in a secure, searchable database.</li>
        <li class="list-disc">Access all your studies and their associated data in one place, simplifying review and analysis.</li>
        <li class="list-disc">Usable offline which make it perfect for osbervation trip in the wild</li>
      </ul>
    </Card>

    <Card title="Dashboard for Progress and Insights">
      <ul>
        <li class="list-disc">Visualize your advancement toward observation and session targets.</li>
        <li class="list-disc">Instantly access summaries and key metrics from your data.</li>
      </ul>
    </Card> 
  </div>
</div>

<Heading>Technologies</Heading>
scalability and concurnacy control:
<div class="flex flex-col space-y-6">
  <div class="grid grid-cols-4 gap-3">
    <Card title="Python Flask">
      <ul>
        <li class="list-disc">The backend is powered by <a href="https://flask.palletsprojects.com/" target="_blank">Flask</a>, a lightweight and flexible web framework in Python.</li>
      </ul>
    </Card>
    <Card title="SQLite3">
      <ul>
        <li class="list-disc">WildNote uses <a href="https://sqlite.org/" target="_blank">SQLite3</a>, a lightweight yet powerful database system for secure data storage.</li>
      </ul>
    </Card>

    <Card title="Solid.js">
      <ul>
        <li class="list-disc">Built with <a href="https://solidjs.com/" target="_blank">Solid.js</a>, a reactive JavaScript library ensuring a fast and interactive user experience.</li>
      </ul>
    </Card>
    <Card title="Tailwind CSS & Solid UI">
      <ul>
        <li class="list-disc">Leverages <a href="https://tailwindcss.com/" target="_blank">Tailwind CSS</a> for rapid and responsive design implementation.</li>
        <li class="list-disc">Enhanced with <a href="https://solid-ui.com/" target="_blank">Solid UI</a>, providing customizable interface components.</li>
      </ul>
    </Card>
  </div>
</div>

<Heading>Database structure</Heading>


<Heading>Future Developments</Heading>
<div class="flex flex-col space-y-6">
  <div class="grid grid-cols-4 gap-3">
    <Card title="Enhanced Modularity">
      <ul>
        <li class="list-disc">Add experimental type coming with a serie of pre-defined attributes</li>
      </ul>
    </Card>
    <Card title="User Login and Multiuser Collaboration">
      <ul>
        <li class="list-disc">Introduce secure, personalized access to the platform.</li>
        <li class="list-disc">Enable teams to work together on the same experiment in real-time.</li>
      </ul>
    </Card>
    <Card title="Data Management">
      <ul>
        <li class="list-disc">Export and import experiment setups to replicate study designs.</li>
        <li class="list-disc">Import external data, such as GPS locations.</li>
        <li class="list-disc">Duplicate existing setups to use as templates.</li>
        <li class="list-disc">Enable synchronisation with a cloud service</li>
      </ul>
    </Card>
    <Card title="Advanced Features">
      <ul>
        <li class="list-disc">Incorporate a map view for visualizing sample locations with GPS data.</li>
      </ul>
    </Card>
  </div>


  

</div>
</div>
        <div class="col-span-1">
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
  );
}