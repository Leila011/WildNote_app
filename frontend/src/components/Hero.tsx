import { buttonVariants } from "~/components/ui/button";
import { ParentComponent } from "solid-js";
import { cva } from "class-variance-authority";
import type { VariantProps } from "class-variance-authority";
import { AiOutlineArrowRight } from "./icons";
import { Heading } from "./Heading";

const heroStyles = cva([""], {
  defaultVariants: {
    size: "md",
    align: "center",
    width: "full",
  },
  variants: {
    size: {
      sm: "py-16",
      md: "py-24",
      lg: "py-48",
      xl: "py-64",
    },
    align: {
      left: "items-start",
      center: "items-center mx-auto",
      right: "items-end ml-auto",
    },
    width: {
      full: "md:w-12/12",
      "1/2": "md:w-1/2",
      "5/12": "md:w-5/12",
      "7/12": "md:w-7/12",
      "3/4": "md:w-3/4",
      "1/4": "md:w-1/4",
    },
  },
});

const heroSubtitleStyles = cva(["font-cal-sans text-fg-gray-text"], {
  defaultVariants: {
    size: "md",
  },
  variants: {
    size: {
      sm: "text-sm",
      md: "text-md",
      lg: "text-lg",
      xl: "text-xl",
    },
  },
});

type Props = VariantProps<typeof heroStyles> & {
  title: string;
  subtitle?: string;
  image?: string;
  background?: string;
  primaryButton?: {
    text: string;
    href: string;
  };
  secondaryButton?: {
    text: string;
    href: string;
  };
};

export const Hero: ParentComponent<Props> = (props) => {
  const style = heroStyles({
    size: props.size,
    align: props.align,
    width: props.width,
  });
  const subtitleStyle = heroSubtitleStyles({ size: props.size });

  return (
    <section class={`relative flex flex-row items-center h-full  bg-primary`}>
      {/* background blur */}
      <div class="absolute inset-0 z-10 flex justify-left items-center">
        <div class="bg-secondary w-1/2 h-[20em] rounded-full opacity-15 blur-3xl" />
      </div>
      {/* centered background image */}
      {props.background && (
        <div
          class="z-20 absolute top-0 left-0 w-full h-full bg-center bg-contain bg-no-repeat"
          style={`background-image: url('${props.background}')`}
        />
      )}
      {/* content */}
      <div class={` relative z-30 flex flex-col space-y-6 ${style} p-36 text-left`}>
        {props.subtitle && (
          <div class="flex flex-row items-start text-accent">
            <div class={subtitleStyle}>{props.subtitle}</div>
          </div>
        )}
        {/* title */}
        <Heading class="text-white">{props.title}</Heading>
        {/* content */}
        {props.children}
        {/* buttons */}
        <div class="flex flex-row gap-x-3 relative">
          {props.primaryButton && (
            <a
              class={buttonVariants({ variant: "accent" })}
              href={props.primaryButton.href}
            >
              <div class="flex flex-row items-start">
                {props.primaryButton.text}
                <AiOutlineArrowRight class="inline-block ml-2" />
              </div>
            </a>
          )}
          {props.secondaryButton && (
            <a
              class={buttonVariants({ variant: "outline" })}
              href={props.secondaryButton.href}
            >
              {props.secondaryButton.text}
            </a>
          )}
        </div>
      </div>
      {/* image */}
      {props.image && (
        <div class="overflow-hidden md:flex md:w-1/2">
          <img src={props.image} alt="Hero image" />
        </div>
      )}
    </section>
  );
};
