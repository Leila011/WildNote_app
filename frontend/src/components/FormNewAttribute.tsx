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
import { IconChevronDown, ImBin } from "~/components/icons";
import { Button, buttonVariants } from "./ui/button";
import { For, Index, Show } from "solid-js";
import { Attribute } from "~/types/db";
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
import { newAttribute } from "~/utils/db";
type Props = {
  store: Attribute[];
  setStore: SetStoreFunction<Attribute[]>;
};

export function FormNewAttribute(props: Props) {
  const { store, setStore } = props;

  const handleAddAttribute = () => {
    const newAttributeInstance = JSON.parse(JSON.stringify(newAttribute)); // Deep copy
    setStore((prev) => [...prev, newAttributeInstance]);
  };

  const handleRemoveAttribute = (attributeIndex: number) => {
    const newStore = store.filter((_, index) => index !== attributeIndex);
    setStore(newStore);
  };

  const handleAddChoice = (index: number) => {
    setStore([index], "choices", (choice) =>
      choice === undefined ? [""] : [...choice, ""],
    );
  };

  const handleRemoveChoice = (attributeIndex: number, index: number) => {
    const newStore = store[attributeIndex].choices.filter(
      (_, choiceIndex) => choiceIndex !== index,
    );
    setStore([attributeIndex], "choices", newStore);
  };
  return (
    <div class=" flex flex-col  space-y-5 pb-6 pt-2 items-left justify-left  px-5">
      <Index each={store}>
        {(attribute, index) => (
          <div class="flex flex-row space-x-4 items-bottom">
            <div class="">
              <Button
                class={`${buttonVariants({ variant: "secondary" })} mt-6`}
                onClick={() => handleRemoveAttribute(index)}
              >
                <ImBin />
              </Button>
            </div>
            <div>
              <h1>name:</h1>
              <TextField
                value={store[index].label}
                validationState={
                  store[index].name !== "" && store[index].name !== undefined
                    ? "valid"
                    : "invalid"
                }
                onChange={(e: any) => {
                  const valueClean = e.toLowerCase().replace(/ /g, "_");
                  setStore([index], "name", valueClean);
                  setStore([index], "label", e);
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
              <h1>Required:</h1>
              <div>
                {/* Toggle button */}
                <ToggleGroup
                  class={`${toggleVariants({ size: "sm", variant: "outline" })} bg-card text-card-foreground border rounded-md h-10 pl-2 justify-start border-secondary w-full md:w-auto`}
                  value={store[index].required ? "Yes" : "No"}
                >
                  <For each={[true, false]}>
                    {(option) => (
                      <ToggleGroupItem
                        class={`${toggleVariants({ size: "sm" })}`}
                        value={option ? "Yes" : "No"}
                        onClick={() => setStore([index], "required", option)}
                      >
                        {option ? "Yes" : "No"}
                      </ToggleGroupItem>
                    )}
                  </For>
                </ToggleGroup>
              </div>
            </div>
            <div>
              <h1>type:</h1>
              <DropdownMenu>
                <DropdownMenuTrigger
                  as={Button<"button">}
                  variant={"outline"}
                  class={`bg-card text-card-foreground  rounded-md h-10 pl-2 justify-start  w-full`}
                >
                  <div class="flex-grow text-left">
                    {store[index].type || "string"}
                  </div>
                  <IconChevronDown />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <For each={typeOptions}>
                    {(choice) => (
                      <DropdownMenuItem
                        onSelect={() => {
                          setStore([index], "choices", []);
                          setStore([index], "default_value", "");
                          setStore([index], "type", choice);
                        }}
                      >
                        <span>{choice}</span>
                      </DropdownMenuItem>
                    )}
                  </For>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <Show when={store[index].type === "number"}>
              <div class="flex flex-row space-x-5">
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
                <div class="flex flex-col space-y-2">
                  <Index each={store[index].choices}>
                    {(choice, choiceIndex) => (
                      <div class="flex flex-row space-x-1 items-start">
                        <Button
                          class={`${buttonVariants({ variant: "secondary" })}`}
                          onClick={() => handleRemoveChoice(index, choiceIndex)}
                        >
                          <ImBin />
                        </Button>
                        <div>
                          <TextField
                            value={store[index].choices[choiceIndex]}
                            validationState={
                              store[index].choices[choiceIndex] !== "" &&
                              store[index].choices[choiceIndex]
                                ? "valid"
                                : "invalid"
                            }
                            onChange={(e: any) => {
                              const value = e;
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
                      </div>
                    )}
                  </Index>
                </div>
                <Button
                  class={`${store[index].choices.length ? "mt-2" : ""}`}
                  onClick={() => handleAddChoice(index)}
                >
                  Add a new choice
                </Button>
              </div>
              <div>
                <h1>default:</h1>
                <Show when={store[index].choices.length > 0}>
                  <DropdownMenu>
                    <DropdownMenuTrigger
                      as={Button<"button">}
                      variant={"outline"}
                      class={`bg-card text-card-foreground  rounded-md h-10 pl-2 justify-start  w-full`}
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
            <Show when={store[index].type === "boolean"}>
              <div>
                <h1>default:</h1>

                <div>
                  {/* Toggle button */}
                  <ToggleGroup
                    class={`${toggleVariants({ size: "sm", variant: "outline" })} bg-card text-card-foreground border rounded-md h-10 pl-2 justify-start border-secondary w-full md:w-auto`}
                    value={store[index].default_value ? "True" : "False"}
                  >
                    <For each={[true, false]}>
                      {(option) => (
                        <ToggleGroupItem
                          class={`${toggleVariants({ size: "sm" })}`}
                          value={option ? "True" : "False"}
                          onClick={() =>
                            setStore([index], "default_value", option)
                          }
                        >
                          {option ? "True" : "False"}
                        </ToggleGroupItem>
                      )}
                    </For>
                  </ToggleGroup>
                </div>
              </div>
            </Show>
          </div>
        )}
      </Index>
      <div>
        <Button onClick={handleAddAttribute}>Add a new attribute</Button>
      </div>
    </div>
  );
}
