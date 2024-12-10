import { JSX } from "solid-js";

interface TitleProps {
  children: JSX.Element | JSX.Element[];
  class?: string;
}

export function Heading(props: TitleProps) {
  return (
    <div class={`flex py-10 ${props.class}`}>
      <h1 class="text-3xl font-bold">{props.children}</h1>
    </div>
  );
}
