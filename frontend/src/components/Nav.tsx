import { useLocation } from "@solidjs/router";

export default function Nav() {
  const location = useLocation();
  const active = (path: string) =>
    path == location.pathname
      ? "border-sky-600"
      : "border-transparent hover:border-sky-600";
  return (
    <nav class="bg-default flex ">
      <ul class="container flex items-center justify-center p-3 text-foreground border-b">
        <li class={`border-b-2 ${active("/")} mx-1.5 sm:mx-6`}>
          <a href="/">Home</a>
        </li>
        <li class={`border-b-2 ${active("/experiments")} mx-1.5 sm:mx-6`}>
          <a href="/experiments">Experiments</a>
        </li>
        <li class={`border-b-2 ${active("/dashboard")} mx-1.5 sm:mx-6`}>
          <a href="/dashboard">Dashboard</a>
        </li>
        <li class={`border-b-2 ${active("/experimentSetup")} mx-1.5 sm:mx-6`}>
          <a href="/newExperiment">New experiment</a>
        </li>
        <li class={`border-b-2 ${active("/encoding")} mx-1.5 sm:mx-6`}>
          <a href="/encoding">Start encoding</a>
        </li>
        <li class={`border-b-2 ${active("/about")} mx-1.5 sm:mx-6`}>
          <a href="/about">About</a>
        </li>
      </ul>
    </nav>
  );
}
