import { For } from "solid-js";
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";
import { toggleVariants } from "../ui/toggle";


type Props = {
    signal: ()=> boolean;
    setSignal: (value: boolean) => void;
}
const ToggleYesNo = (props:Props) => {
    return(
        <ToggleGroup
        class={`${toggleVariants({ size: "lg", variant: "outline" })}`}
        value={props.signal().toString()}
        onChange={(value) => {
            props.setSignal(value=== 'yes');
        }}
        >
        <For each={[true, false]}>
          {(option) => (
            <ToggleGroupItem
              class={`${toggleVariants({ size: "sm" })}`}
              value={option.toString()}
            >
              {option ? "Yes" : "No"}
            </ToggleGroupItem>
          )}
        </For>
        </ToggleGroup>

)}

 export { ToggleYesNo };