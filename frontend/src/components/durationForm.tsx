import { SetStoreFunction, Store } from "solid-js/store";
import {
  NumberField,
  NumberFieldDecrementTrigger,
  NumberFieldIncrementTrigger,
  NumberFieldInput,
} from "~/components/ui/number-field";
import { durationHMS } from "~/types/db";

export function DurationForm(props: {
  duration: Store<durationHMS>;
  setDuration: SetStoreFunction<durationHMS>;
}) {
  return (
    <div class="flex flex-row space-x-6">
      <div class="flex flex-col space-x-1 items-center">
        <p>Hours</p>
        <div class="w-16">
          <NumberField
            rawValue={props.duration.hours}
            onRawValueChange={(e: any) => {
              const value = Number.isNaN(e) ? null : e;
              props.setDuration("hours", value);
            }}
            minValue={0}
          >
            <div class="relative">
              <NumberFieldInput
                class={`border border-secondary bg-card text-card-foreground h-10 rounded-md pl-2 w-full`}
              />
              <NumberFieldIncrementTrigger />
              <NumberFieldDecrementTrigger />
            </div>
          </NumberField>
        </div>
      </div>
      <div class="flex flex-col space-x-1 items-center">
        <p>Minutes</p>

        <div class="w-16">
          <NumberField
            rawValue={props.duration.minutes}
            onRawValueChange={(e: any) => {
              const value = Number.isNaN(e) ? null : e;
              props.setDuration("minutes", value);
            }}
            minValue={0}
          >
            <div class="relative">
              <NumberFieldInput
                class={`border border-secondary bg-card text-card-foreground h-10 rounded-md pl-2 w-full`}
              />
              <NumberFieldIncrementTrigger />
              <NumberFieldDecrementTrigger />
            </div>
          </NumberField>
        </div>
      </div>
      <div class="flex flex-col items-center space-x-1 ">
        <p>Seconds</p>

        <div class="w-16">
          <NumberField
            rawValue={props.duration.seconds}
            onRawValueChange={(e: any) => {
              const value = Number.isNaN(e) ? null : e;
              props.setDuration("seconds", value);
            }}
            minValue={0}
          >
            <div class="relative">
              <NumberFieldInput
                class={`border border-secondary bg-card text-card-foreground h-10 rounded-md pl-2 w-full`}
              />
              <NumberFieldIncrementTrigger />
              <NumberFieldDecrementTrigger />
            </div>
          </NumberField>
        </div>
      </div>
    </div>
  );
}
