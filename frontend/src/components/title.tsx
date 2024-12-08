import { JSX } from "solid-js";

export function Title (props: { children: JSX.Element }) {
  return (
    <div class="flex items-center">
      <h1 class="text-3xl font-bold text-gray-900">{props.children}</h1>
    </div>
  )
}
