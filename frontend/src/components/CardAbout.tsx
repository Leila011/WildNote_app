import { JSX } from "solid-js";

export function CardAbout(props: { children: JSX.Element; title?: string }) {
  return (
    <div class="border border-primary  mb-4 rounded-md bg-muted w-full h-full flex flex-col  p-4 pl-6 ">
      {props.title && (
        <h1 class="text-xl font-bold text-primary/50 h-14">{props.title}</h1>
      )}
      <hr class="my-2 border-primary/50" />
      {props.children}
    </div>
  );
}
