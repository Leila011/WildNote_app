import { useParams } from "@solidjs/router";
import { createEffect, createResource, createSignal } from "solid-js";
import { createStore } from "solid-js/store";
import { fetchAttributeDescriptions } from "~/api/fetchPredeterminedAttributes";
import {Form} from "~/components/Form";
import { Button } from "~/components/ui/button";
import {TableAttribute} from "~/types/Form";
import {sqlToJsType} from "~/utils/typeConvertion";
import { addNewRecordAll } from "~/api/addNewRecord";

export default function newSamples() {
    const params = useParams();
    const [attributeDescriptions] = createResource(() => fetchAttributeDescriptions('sample', Number(params.experimentId)))
    const [attributesConverted, setAttributesConverted] = createSignal<TableAttribute[]>([]);
    const [store, setStore] = createStore<Record<string, any>>({});

    createEffect(() => {

      if (attributeDescriptions()) {
        const { attributes, columns } = attributeDescriptions();
        const combined = [...columns, ...attributes];
        const attributesConverted = combined.map((attribute: TableAttribute) => ({
            ...attribute,
            type: sqlToJsType(attribute.type),
          })as TableAttribute);


          const keyValues = attributesConverted.reduce((acc, attribute) => {
            acc[attribute.name] = "";
            return acc;
          }, {} as Record<string, any>);
          setStore(keyValues);

        setAttributesConverted(attributesConverted);
      }
    });

    return (
        <div>
      {attributesConverted().length && <Form fields={attributesConverted()}
              store={store}
              setStore={setStore}>
        </Form>}
        <Button onClick={()=>{
            setStore("start", Date.now());
            setStore("experiment_id", Number(params.experimentId));
            addNewRecordAll(store, attributeDescriptions(), "sample");	
            }}>Submit</Button>
        </div>
    );
}
