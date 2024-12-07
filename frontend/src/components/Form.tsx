import { For, from, Index, Match, Show, Switch } from "solid-js";
import { SetStoreFunction } from "solid-js/store";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { IconChevronDown } from "~/components/icons";
import { ToggleGroup, ToggleGroupItem } from "~/components/ui/toggle-group";
import { toggleVariants } from "~/components/ui/toggle";
import { TableAttribute, TableAttributeValue } from "~/types/Form";
import {
  NumberField,
  NumberFieldDecrementTrigger,
  NumberFieldErrorMessage,
  NumberFieldIncrementTrigger,
  NumberFieldInput,
} from "~/components/ui/number-field";
import {
  TextField,
  TextFieldErrorMessage,
  TextFieldInput,
} from "~/components/ui/text-field";

type Props = {
  store: TableAttribute[];
  setStore: SetStoreFunction<TableAttribute[]>;
};

/**
 * This function determines the validity of an argument's value based on its config.
 *
 * An argument is considered valid if:
 * -  it is not required
 * -  if it is required and not empty
 *
 * The function returns true if the argument is valid, and false otherwise.
 *
 * @param argConfig - The configuration object for the argument, specifying if it's required.
 * @param argValue - The value of the argument to validate.
 * @returns True if the argument is valid, false otherwise.
 */
export function isValid(argConfig: TableAttribute, argValue: any): boolean {
  const isRequired = "required" in argConfig && argConfig.required;
  const isEmpty =
    argValue === null || argValue === "" || Number.isNaN(argValue); // Because deleting the text field content set value to "". & deleting number field content set value to NaN
  // Argument is invalid if required and empty
  if (isRequired) {
    return !isEmpty;
  } else {
    return true;
  }
}

/**
 * Checks if a given value is a valid number within the specified range.
 *
 * @param argConfig - The configuration object that may contain `min` and `max` properties.
 * @param argValue - The value to be validated.
 * @returns `true` if the value is within the specified range, otherwise `false`.
 */
export function isValidNumber(
  argConfig: TableAttribute,
  argValue: any,
): boolean {
  const isBelowMin =
    "min" in argConfig &&
    argConfig.min !== undefined &&
    argValue < argConfig.min;
  const isAboveMax =
    "max" in argConfig &&
    argConfig.max !== undefined &&
    argValue > argConfig.max;
  return !isBelowMin && !isAboveMax;
}

/**
 * Generates an error message indicating the valid range for a parameter value.
 *
 * @param argConfig - The configuration object that may contain `min` and `max` properties.
 * @returns A string message indicating the valid range for the parameter value.
 */
export function invalidNumberMessage(argConfig: TableAttribute): string {
  const minText = "min" in argConfig ? `>=${argConfig.min}` : "";
  const maxText = "max" in argConfig ? `<=${argConfig.max}` : "";
  const minMaxText = minText && maxText ? ` and ` : "";

  return `Parameter value must be ${minText}${minMaxText}${maxText}`;
}

/**
 * Generates the options for the boolean toggle based on the parameter config.
 *
 * This function returns an array of options for a boolean toggle input.
 * If the argument is required or its typeJS explicitly specifies a boolean value, it returns options for "True" and "False".
 * Otherwise, it includes an additional "Not specified" option.
 * It returns an array of objects, each containing the name and value of the option.
 *
 * @param arg - The argument configuration object.
 * @returns An array of options for the boolean toggle.
 */
export function booleanToggleOptions(
  arg: TableAttribute,
): { name: string; value: any }[] {
  if (
    ("required" in arg && arg.required) ||
    arg.typeJS === "boolean_true" ||
    arg.typeJS === "boolean_false"
  ) {
    return [
      { name: "True", value: true },
      { name: "False", value: false },
    ];
  }
  return [
    { name: "True", value: true },
    { name: "False", value: false },
    { name: "Not specified", value: "" },
  ];
}

export const Form = (props: Props) => {
  const { store, setStore } = props;

  const handleChange = (name: string, value: any) => {
    console.log(name, value);
    setStore((prevStore) =>
      prevStore.map((attribute) =>
        attribute.name === name ? { ...attribute, value } : attribute,
      ),
    );
    console.log(store);
  };

  // Function to render input fields for each argument
  const RenderInputField = (
    field: TableAttribute,
    key: string,
    store: TableAttribute[],
    handleChange: (name: string, value: any) => void,
  ) => {
    return (
      <div class="flex flex-row">
        <div class="flex flex-col w-full">
          <Switch>
            {/* Dropdown */}
            <Match when={"choices" in field}>
              <DropdownMenu>
                <DropdownMenuTrigger
                  as={Button<"button">}
                  variant={"ghost"}
                  class={`bg-card text-card-foreground border rounded-md h-10 pl-2 justify-start ${isValid(field, store.filter((attribute) => attribute.name === key)[0].value) ? "border-secondary" : "border-warning-foreground"} w-full`}
                >
                  <div class="flex-grow text-left">
                    {
                      store.filter((attribute) => attribute.name === key)[0]
                        .value
                    }
                  </div>
                  <IconChevronDown />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <For each={"choices" in field ? field.choices : []}>
                    {(choice) => (
                      <DropdownMenuItem
                        onSelect={() => handleChange(key, choice)}
                      >
                        <span>{choice}</span>
                      </DropdownMenuItem>
                    )}
                  </For>
                </DropdownMenuContent>
              </DropdownMenu>
            </Match>

            {/* Number input */}
            <Match when={field.typeJS === "number"}>
              <NumberField
                rawValue={
                  Array.isArray(
                    store.filter((attribute) => attribute.name === key)[0]
                      .value,
                  )
                    ? store.filter((attribute) => attribute.name === key)[0]
                        .value[0]
                    : store.filter((attribute) => attribute.name === key)[0]
                        .value
                }
                onRawValueChange={(e: any) => {
                  const value = Number.isNaN(e) ? null : e;
                  handleChange(key, value);
                }}
                validationState={
                  isValid(
                    field,
                    store.filter((attribute) => attribute.name === key)[0]
                      .value,
                  ) &&
                  isValidNumber(
                    field,
                    store.filter((attribute) => attribute.name === key)[0]
                      .value,
                  )
                    ? "valid"
                    : "invalid"
                }
                minValue={
                  "min" in field && field.min !== undefined
                    ? +field.min
                    : Number.MIN_SAFE_INTEGER
                }
                maxValue={
                  "max" in field && field.max !== undefined
                    ? +field.max
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
                <Show
                  when={
                    !isValidNumber(
                      field,
                      store.filter((attribute) => attribute.name === key)[0]
                        .value,
                    )
                  }
                >
                  <NumberFieldErrorMessage>
                    {invalidNumberMessage(field)}
                  </NumberFieldErrorMessage>
                </Show>
                <Show
                  when={
                    !isValid(
                      field,
                      store.filter((attribute) => attribute.name === key)[0]
                        .value,
                    )
                  }
                >
                  <NumberFieldErrorMessage>
                    This parameter is required, a value must be given.
                  </NumberFieldErrorMessage>
                </Show>
              </NumberField>
            </Match>

            {/* Text input */}
            <Match when={field.typeJS === "string"}>
              <TextField
                value={
                  Array.isArray(
                    store.filter((attribute) => attribute.name === key)[0]
                      .value,
                  )
                    ? store
                        .filter((attribute) => attribute.name === key)[0]
                        .value.join(", ")
                    : store.filter((attribute) => attribute.name === key)[0]
                        .value
                }
                onChange={(e: any) => {
                  const value = e === "" ? null : e;
                  handleChange(key, value);
                }}
                validationState={
                  isValid(
                    field,
                    store.filter((attribute) => attribute.name === key)[0]
                      .value,
                  )
                    ? "valid"
                    : "invalid"
                }
              >
                <TextFieldInput
                  type={"text"}
                  placeholder={
                    "example" in field
                      ? Array.isArray(field.example)
                        ? `example: ${field.example[0]}`
                        : `example: ${field.example}`
                      : ""
                  }
                  class={`border border-secondary bg-card text-card-foreground h-10 rounded-md pl-2 w-full`}
                />
                <TextFieldErrorMessage>
                  This parameter is required, a value must be given.
                </TextFieldErrorMessage>
              </TextField>
            </Match>

            {/* Boolean toggle */}
            <Match when={field.typeJS === "boolean"}>
              <div>
                {/* Toggle button */}
                <ToggleGroup
                  class={`${toggleVariants({ size: "sm", variant: "outline" })} bg-card text-card-foreground border rounded-md h-10 pl-2 justify-start border-secondary w-full md:w-auto`}
                  value={store
                    .filter((attribute) => attribute.name === key)[0]
                    .value?.toString()}
                >
                  <For each={booleanToggleOptions(field)}>
                    {(option) => (
                      <ToggleGroupItem
                        class={`${toggleVariants({ size: "sm" })}`}
                        value={option.value.toString()}
                        onClick={() => handleChange(key, option.value)}
                      >
                        {option.name}
                      </ToggleGroupItem>
                    )}
                  </For>
                </ToggleGroup>
              </div>
            </Match>
          </Switch>
        </div>
      </div>
    );
  };

  return (
    <div class="border p-4 border-secondary bg-secondary/15 rounded-md space-y-5">
      <Index each={store}>
        {(field, index) => {
          const key = field().name;
          return (
            // Argument
            <div class="grid grid-cols-12 gap-2 ml-3 pr-2 space-y-4">
              {/* Argument name */}
              <div
                class={`col-span-12 md:col-span-3 mr-2 flex ${field().multiple ? "items-start mt-6" : "items-center"} break-all`}
              ></div>

              {/* Argument input field(s) */}
              <div class="md:col-span-8 col-span-12 space-y-2 mr-2">
                <p class="text-sm text-secondary">{field().name}</p>
                <div class="flex flex-row">
                  <div class="flex flex-col w-full">
                    <Switch>
                      {/* Dropdown */}
                      <Match when={"choices" in field}>
                        <DropdownMenu>
                          <DropdownMenuTrigger
                            as={Button<"button">}
                            variant={"ghost"}
                            class={`bg-card text-card-foreground border rounded-md h-10 pl-2 justify-start ${isValid(field(), store.filter((attribute) => attribute.name === key)[0].value) ? "border-secondary" : "border-warning-foreground"} w-full`}
                          >
                            <div class="flex-grow text-left">
                              {
                                store.filter(
                                  (attribute) => attribute.name === key,
                                )[0].value
                              }
                            </div>
                            <IconChevronDown />
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <For
                              each={"choices" in field() ? field().choices : []}
                            >
                              {(choice) => (
                                <DropdownMenuItem
                                  onSelect={() => handleChange(key, choice)}
                                >
                                  <span>{choice}</span>
                                </DropdownMenuItem>
                              )}
                            </For>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </Match>

                      {/* Number input */}
                      <Match when={field().typeJS === "number"}>
                        <NumberField
                          rawValue={
                            Array.isArray(
                              store.filter(
                                (attribute) => attribute.name === key,
                              )[0].value,
                            )
                              ? store.filter(
                                  (attribute) => attribute.name === key,
                                )[0].value[0]
                              : store.filter(
                                  (attribute) => attribute.name === key,
                                )[0].value
                          }
                          onRawValueChange={(e: any) => {
                            const value = Number.isNaN(e) ? null : e;
                            handleChange(key, value);
                          }}
                          validationState={
                            isValid(
                              field(),
                              store.filter(
                                (attribute) => attribute.name === key,
                              )[0].value,
                            ) &&
                            isValidNumber(
                              field(),
                              store.filter(
                                (attribute) => attribute.name === key,
                              )[0].value,
                            )
                              ? "valid"
                              : "invalid"
                          }
                          minValue={
                            "min" in field() && field().min !== undefined
                              ? +field().min
                              : Number.MIN_SAFE_INTEGER
                          }
                          maxValue={
                            "max" in field() && field().max !== undefined
                              ? +field().max
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
                          <Show
                            when={
                              !isValidNumber(
                                field(),
                                store.filter(
                                  (attribute) => attribute.name === key,
                                )[0].value,
                              )
                            }
                          >
                            <NumberFieldErrorMessage>
                              {invalidNumberMessage(field())}
                            </NumberFieldErrorMessage>
                          </Show>
                          <Show
                            when={
                              !isValid(
                                field(),
                                store.filter(
                                  (attribute) => attribute.name === key,
                                )[0].value,
                              )
                            }
                          >
                            <NumberFieldErrorMessage>
                              This parameter is required, a value must be given.
                            </NumberFieldErrorMessage>
                          </Show>
                        </NumberField>
                      </Match>

                      {/* Text input */}
                      <Match when={field().typeJS === "string"}>
                        <TextField
                          value={
                            Array.isArray(
                              store.filter(
                                (attribute) => attribute.name === key,
                              )[0].value,
                            )
                              ? store
                                  .filter(
                                    (attribute) => attribute.name === key,
                                  )[0]
                                  .value.join(", ")
                              : store.filter(
                                  (attribute) => attribute.name === key,
                                )[0].value
                          }
                          onChange={(e: any) => {
                            const value = e === "" ? null : e;
                            handleChange(key, value);
                          }}
                          validationState={
                            isValid(
                              field(),
                              store.filter(
                                (attribute) => attribute.name === key,
                              )[0].value,
                            )
                              ? "valid"
                              : "invalid"
                          }
                        >
                          <TextFieldInput
                            type={"text"}
                            placeholder={
                              "example" in field()
                                ? Array.isArray(field().example)
                                  ? `example: ${field().example[0]}`
                                  : `example: ${field().example}`
                                : ""
                            }
                            class={`border border-secondary bg-card text-card-foreground h-10 rounded-md pl-2 w-full`}
                          />
                          <TextFieldErrorMessage>
                            This parameter is required, a value must be given.
                          </TextFieldErrorMessage>
                        </TextField>
                      </Match>

                      {/* Boolean toggle */}
                      <Match when={field().typeJS === "boolean"}>
                        <div>
                          {/* Toggle button */}
                          <ToggleGroup
                            class={`${toggleVariants({ size: "sm", variant: "outline" })} bg-card text-card-foreground border rounded-md h-10 pl-2 justify-start border-secondary w-full md:w-auto`}
                            value={store
                              .filter((attribute) => attribute.name === key)[0]
                              .value?.toString()}
                          >
                            <For each={booleanToggleOptions(field())}>
                              {(option) => (
                                <ToggleGroupItem
                                  class={`${toggleVariants({ size: "sm" })}`}
                                  value={option.value.toString()}
                                  onClick={() =>
                                    handleChange(key, option.value)
                                  }
                                >
                                  {option.name}
                                </ToggleGroupItem>
                              )}
                            </For>
                          </ToggleGroup>
                        </div>
                      </Match>
                    </Switch>
                  </div>
                </div>
              </div>
            </div>
          );
        }}
      </Index>
    </div>
  );
};
