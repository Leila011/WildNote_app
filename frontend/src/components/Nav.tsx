import { useLocation } from "@solidjs/router";

export default function Nav() {
  const location = useLocation();
  const active = (path: string) =>
    path == location.pathname
      ? "border-sky-600"
      : "border-transparent hover:border-sky-600";
  return (
    <nav class="bg-sky-800">
      <ul class="container flex items-center p-3 text-gray-200">
        <li class={`border-b-2 ${active("/")} mx-1.5 sm:mx-6`}>
          <a href="/">Home</a>
        </li>
        <li class={`border-b-2 ${active("/experiments")} mx-1.5 sm:mx-6`}>
          <a href="/experiments">Experiments</a>
        </li>
        <li class={`border-b-2 ${active("/experimentSetup")} mx-1.5 sm:mx-6`}>
          <a href="/newExperiment">New experiment</a>
        </li>
        <li class={`border-b-2 ${active("/encoding")} mx-1.5 sm:mx-6`}>
          <a href="/encoding">Start encoding</a>
        </li>
      </ul>
    </nav>
  );
}
