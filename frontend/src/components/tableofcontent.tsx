import { createSignal, onCleanup, createEffect, For } from "solid-js";
import { useLocation } from "@solidjs/router";
import { Heading } from "~/components/Heading";
import { cleanAnchor } from "~/utils";

type TableOfContentProps = {
  content: string[];
};

export function TableOfContent(props: TableOfContentProps) {
  const location = useLocation();
  const [currentSection, setCurrentSection] = createSignal("");

  // Called when the user scrolls the page
  // updates the current section based on the scroll position
  const onScroll = () => {
    const selectors = props.content.map((id) => `#${cleanAnchor(id)}`);
    const headings = document.querySelectorAll(selectors.join(", "));
    let currentSection = "";
    headings.forEach((heading) => {
      // Adjust value to define when the section should be considered as the current section
      if (heading.getBoundingClientRect().top < 200) {
        currentSection = heading.id;
      }
    });
    setCurrentSection(currentSection);
  };

  // Add scroll event listener when the component is mounted
  // Remove the event listener when the component is unmounted
  createEffect(() => {
    window.addEventListener("scroll", onScroll);
    onCleanup(() => {
      window.removeEventListener("scroll", onScroll);
    });
  });

  return (
    <div class="flex flex-col">
      <Heading>Section</Heading>
      <div>
        <For each={props.content}>
          {(item) => (
            <div
              class={`space-y-4 hover:bg-accent ${currentSection() === cleanAnchor(item) ? "bg-accent" : ""}`}
            >
              <div class="pl-4">
                <a
                  class="cursor-pointer block w-full"
                  href={`${location.pathname}?tab=arguments#${cleanAnchor(item)}`}
                  onClick={() => {
                    setCurrentSection(cleanAnchor(item));
                  }}
                  aria-label={`TOC-item-${cleanAnchor(item)}`}
                >
                  {item}
                </a>
              </div>
            </div>
          )}
        </For>
      </div>
    </div>
  );
}
