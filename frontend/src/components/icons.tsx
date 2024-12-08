import { splitProps, type ComponentProps } from "solid-js";

import { cn } from "~/lib/utils";

export type IconProps = ComponentProps<"svg">;

export const Icon = (props: IconProps) => {
  const [, rest] = splitProps(props, ["class"]);
  return (
    <svg
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      class={cn("size-4", props.class)}
      {...rest}
    />
  );
};

export function IconChevronDown(props: IconProps) {
  return (
    <Icon
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      {...props}
    >
      <path d="M6 9l6 6l6 -6" />
    </Icon>
  );
}

export function IconSelector(props: IconProps) {
  return (
    <Icon
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      {...props}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
      <path d="M8 9l4 -4l4 4"></path>
      <path d="M16 15l-4 4l-4 -4"></path>
    </Icon>
  );
}

export function IconDots(props: IconProps) {
  return (
    <Icon
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      {...props}
    >
<path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"></path>
    </Icon>
  );
}
