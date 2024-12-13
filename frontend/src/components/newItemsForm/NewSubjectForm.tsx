import { Form } from "../Form";
import { TextField, TextFieldErrorMessage, TextFieldInput } from "../ui/text-field";

export default function NewSubjectForm(
    {store, setStore, name, setName}: {store: any, setStore: any, name: any, setName: any}
) {
    return(
        <div class="border border-primary rounded-md item-center bg-muted p-6">
        <div class="flex flex-col space-y-6 px-5 pb-4">
          <div class="flex flex-row space-x-3 items-baseline">
            <p>Subject name:</p>
            <TextField
              value={name()}
              onChange={(e: any) => {
                setName(e);
              }}
              validationState={name() !== "" && name() ? "valid" : "invalid"}
            >
              <TextFieldInput
                type={"text"}
                class={`border border-secondary bg-card text-card-foreground h-10 rounded-md pl-2 w-full`}
              />
              <TextFieldErrorMessage>
                This parameter is required, a value must be given.
              </TextFieldErrorMessage>
            </TextField>
          </div>
        </div>
        {store && <Form store={store} setStore={setStore}></Form>}
      </div>
    )
}