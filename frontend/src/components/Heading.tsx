
import { cleanAnchor } from "~/utils";
interface TitleProps {
  children: string;
  class?: string;
}

export function Heading(props: TitleProps) {
  return (
    <div class={`flex py-10 ${props.class}`}>
      <h1 class="text-3xl font-bold" id={cleanAnchor(props.children)}
      >{props.children}</h1>
    </div>
  );
}
