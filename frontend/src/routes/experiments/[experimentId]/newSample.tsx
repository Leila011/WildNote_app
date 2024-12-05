import { useParams } from "@solidjs/router";
import { createEffect, createResource, createSignal } from "solid-js";
import { createStore } from "solid-js/store";
import { fetchTableSchema } from "~/api/fetchTableSchema";
import {Form} from "~/components/Form";
import { Button } from "~/components/ui/button";
import {TableAttribute, TableAttributeValue} from "~/types/Form";
import {sqlToJsType} from "~/utils/typeConvertion";


function addtoDB(store:TableAttributeValue[], experimentId:number) {
    console.log("save store to db under experimentId", experimentId);
}

export default function newSamples() {
    const params = useParams();
    const [attributes] = createResource(() => fetchTableSchema('sample', Number(params.experimentId)))
    
    const [attributesConverted, setAttributesConverted] = createSignal<TableAttribute[]>([]);
    const [store, setStore] = createStore<TableAttributeValue[]>([]);

    createEffect(() => {

      if (attributes()) {
        // convert type to js type
        const attributesConverted = attributes().map((attribute: TableAttribute) => ({
            ...attribute,
            type: sqlToJsType(attribute.type),
          })as TableAttribute);

        const keyValues = attributesConverted.map((attribute: TableAttribute) => {
            return {name: attribute.name, value: ""};
        });

        setAttributesConverted(attributesConverted);
        setStore(keyValues);
        console.log("store", keyValues);
      }
    });

    return (
        <div>
      {attributesConverted().length && <Form fields={attributesConverted()}
              store={store}
              setStore={setStore}>
        </Form>}
        <Button onClick={()=>addtoDB(store, Number(params.experimentId))}>Submit</Button>
        </div>
    );
}
