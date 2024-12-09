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

export function AiOutlineArrowRight(props: IconProps) {
  return (
    <Icon fill="currentColor" viewBox="0 0 1024 1024" {...props}>
      <path d="M869 487.8 491.2 159.9c-2.9-2.5-6.6-3.9-10.5-3.9h-88.5c-7.4 0-10.8 9.2-5.2 14l350.2 304H152c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h585.1L386.9 854c-5.6 4.9-2.2 14 5.2 14h91.5c1.9 0 3.8-.7 5.2-2L869 536.2a32.07 32.07 0 0 0 0-48.4z "></path>
    </Icon>
  );
}
