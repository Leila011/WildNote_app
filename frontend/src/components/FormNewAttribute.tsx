import {
  TextField,
  TextFieldErrorMessage,
  TextFieldInput,
} from "./ui/text-field";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { IconChevronDown } from "~/components/icons";
import { Button } from "./ui/button";
import { createEffect, For, Index, Show } from "solid-js";
import { TableAttribute } from "~/types/db";
import { SetStoreFunction } from "solid-js/store";
import { typeOptions } from "~/utils/typeOptions";
import { ToggleGroup, ToggleGroupItem } from "~/components/ui/toggle-group";
import {
  NumberField,
  NumberFieldDecrementTrigger,
  NumberFieldIncrementTrigger,
  NumberFieldInput,
} from "~/components/ui/number-field";
import { toggleVariants } from "./ui/toggle";
import { newAttribute } from "~/utils/newAttribute";
type Props = {
  store: TableAttribute[];
  setStore: SetStoreFunction<TableAttribute[]>;
};

export function FormNewAttribute(props: Props) {
  const { store, setStore } = props;
  const handleAddAttribute = () => {
    setStore((prev) => [...prev, newAttribute]);
  };

  const handleAddChoice = (index: number) => {
    setStore([index], "choices", (choice) =>
      choice === undefined ? [""] : [...choice, ""],
    );
  };

  createEffect(() => {
    console.log(store);
  });

  return (
    <div>
      <Index each={store}>
        {(attribute, index) => (
          <div class="flex flex-row space-x-1">
            <div>
              <h1>name:</h1>
              <TextField
                value={store[index].label}
                onChange={(e: any) => {
                  const value = e === "" ? null : e;
                  const valueClean = value.toLowerCase().replace(/ /g,"_");
                  setStore([index], "name", valueClean);
                  setStore([index], "label", value);
                }}
              >
                <TextFieldInput
                  type={"text"}
                  placeholder={"Attribute name"}
                  class={`border border-secondary bg-card text-card-foreground h-10 rounded-md pl-2 w-full`}
                />
                <TextFieldErrorMessage>
                  This parameter is required, a value must be given.
                </TextFieldErrorMessage>
              </TextField>
            </div>
            <div>
              <h1>type:</h1>
              <DropdownMenu>
                <DropdownMenuTrigger
                  as={Button<"button">}
                  variant={"ghost"}
                  class={`bg-card text-card-foreground border rounded-md h-10 pl-2 justify-start  w-full`}
                >
                  <div class="flex-grow text-left">{store[index].type}</div>
                  <IconChevronDown />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <For each={typeOptions}>
                    {(choice) => (
                      <DropdownMenuItem
                        onSelect={() => setStore([index], "type", choice)}
                      >
                        <span>{choice}</span>
                      </DropdownMenuItem>
                    )}
                  </For>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <Show when={store[index].type === "number"}>
              <div class="flex flex-row space-x-1">
                <div>
                  <h1>min:</h1>
                  <NumberField
                    rawValue={store[index].min}
                    onRawValueChange={(e: any) => {
                      const value = Number.isNaN(e) ? null : e;
                      setStore([index], "min", value);
                    }}
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
                <div>
                  <h1>max:</h1>
                  <NumberField
                    rawValue={store[index].max}
                    onRawValueChange={(e: any) => {
                      const value = Number.isNaN(e) ? null : e;
                      setStore([index], "max", value);
                    }}
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
                <div>
                  <h1>default:</h1>
                  <NumberField
                    rawValue={store[index].default_value}
                    onRawValueChange={(e: any) => {
                      const value = Number.isNaN(e) ? null : e;
                      setStore([index], "default_value", value);
                    }}
                    minValue={
                      "min" in store[index] && store[index].min !== undefined
                        ? +store[index].min
                        : Number.MIN_SAFE_INTEGER
                    }
                    maxValue={
                      "max" in store[index] && store[index].max !== undefined
                        ? +store[index].max
                        : Number.MAX_SAFE_INTEGER
                    }
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
            </Show>
            <Show when={store[index].type === "string"}>
              <div>
                <h1>choices:</h1>
                <Index each={store[index].choices}>
                  {(choice, choiceIndex) => (
                    <div>
                      <TextField
                        value={store[index].choices[choiceIndex]}
                        onChange={(e: any) => {
                          const value = e === "" ? null : e;
                          setStore([index], "choices", choiceIndex, value);
                        }}
                      >
                        <TextFieldInput
                          type={"text"}
                          placeholder={"Attribute name"}
                          class={`border border-secondary bg-card text-card-foreground h-10 rounded-md pl-2 w-full`}
                        />
                        <TextFieldErrorMessage>
                          This parameter is required, a value must be given.
                        </TextFieldErrorMessage>
                      </TextField>
                    </div>
                  )}
                </Index>
                <Button onClick={() => handleAddChoice(index)}>
                  Add a new choice
                </Button>
              </div>
              <div>
                <h1>default:</h1>
                <Show when={store[index].choices.length > 0}>
                  <DropdownMenu>
                    <DropdownMenuTrigger
                      as={Button<"button">}
                      variant={"ghost"}
                      class={`bg-card text-card-foreground border rounded-md h-10 pl-2 justify-start  w-full`}
                    >
                      <div class="flex-grow text-left">
                        {store[index].default_value}
                      </div>
                      <IconChevronDown />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <For each={store[index].choices}>
                        {(choice) => (
                          <DropdownMenuItem
                            onSelect={() =>
                              setStore([index], "default_value", choice)
                            }
                          >
                            <span>{choice}</span>
                          </DropdownMenuItem>
                        )}
                      </For>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </Show>
                <Show when={store[index].choices.length === 0}>
                  <TextField
                    value={store[index].default_value}
                    onChange={(e: any) => {
                      const value = e === "" ? null : e;
                      setStore([index], "default_value", value);
                    }}
                  >
                    <TextFieldInput
                      type={"text"}
                      placeholder={"Attribute name"}
                      class={`border border-secondary bg-card text-card-foreground h-10 rounded-md pl-2 w-full`}
                    />
                    <TextFieldErrorMessage>
                      This parameter is required, a value must be given.
                    </TextFieldErrorMessage>
                  </TextField>
                </Show>
              </div>
            </Show>
            <Show when={store[index].type=== "boolean"}>
              <div>
                <h1>default:</h1>
                <ToggleGroup
                  class={`${toggleVariants({ size: "sm", variant: "outline" })}`}
                  value={store[index].default_value}
                >
                  <For each={["true", "false"]}>
                    {(option) => (
                      <ToggleGroupItem
                        class={`${toggleVariants({ size: "sm" })}`}
                        value={option}
                        onClick={() => {
                          setStore([index], "default_value", option);
                        }}
                      >
                        {option}
                      </ToggleGroupItem>
                    )}
                  </For>
                </ToggleGroup>
              </div>
            </Show>
          </div>
        )}
      </Index>
      <Button onClick={handleAddAttribute}>Add a new attribute</Button>
    </div>
  );
}
