
export default function Home() {
  return (
    <main class="text-center mx-auto text-gray-700 p-4">
      <h1> My experiments</h1>

      <a href={"/Experiments"}
      >View all</a>
      <a
       class="bg-black text-white hover:text-blue-800"
          href={"/experimentSetup"}
        >
          Add a new experiment
        </a>
    </main>
  );
}
