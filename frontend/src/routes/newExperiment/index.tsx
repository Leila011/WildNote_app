import { useNavigate, useParams } from "@solidjs/router";
import { createEffect, createResource, createSignal } from "solid-js";
import { createStore } from "solid-js/store";
import { fetchAttributeDescriptionsExperiments } from "~/api/fetchAttributeDescriptionsExperiments";
import {Form} from "~/components/Form";
import { Button } from "~/components/ui/button";
import {TableAttribute} from "~/types/Form";
import {sqlToJsType} from "~/utils/typeConvertion";
import { addNewExperiment } from "~/api/addNewExperiment";

/**
 * A page for creating a new experiment
 * It takes as input the predetermined attributes and columns of the experiment table
 * It renders a form with the predetermined attributes with autofill is false and columns (manually filtered)
 * @input columns: The columns of the experiment table
 * @input attributes: The predefied attributes of the experiment table
 **/
export default function NewExperiment() {
    const navigate = useNavigate();
    const [data] = createResource(() => fetchAttributeDescriptionsExperiments())
    const [store, setStore] = createStore<TableAttribute[]>([]);
    const [storeAutofill, setStoreAutofill] = createStore<TableAttribute[]>([]);

    createEffect(() => {
      if (data()) {
          const attributesAugmented = data().attributes.map((attribute: TableAttribute) => ({
            ...attribute,
            typeJS: sqlToJsType(attribute.type),
            value: ""
          })as TableAttribute);

        setStore(attributesAugmented.filter((attribute: TableAttribute) => attribute.autofill === false))
        setStoreAutofill(attributesAugmented.filter((attribute: TableAttribute) => attribute.autofill === true));
      }
    });

    return (
        <div>
           {store.length && <Form
              store={store}
              setStore={setStore}>
        </Form>}  
        <Button onClick={()=>{
          const creation_date = data().attributes.filter((attribute: TableAttribute) => {attribute.name = "Creation_Date"})
         
           setStoreAutofill(prevStore => prevStore.map(attribute =>
            attribute.name === "Creation_Date" ? { ...attribute, value: Date.now() } : attribute
          ))
          const experiment_id = addNewExperiment([...store, ...storeAutofill]);
          console.log("experiment_id", experiment_id)
            navigate(`/newExperiment/${experiment_id}`);	
            }}>Submit</Button>
        </div>
    );
}
