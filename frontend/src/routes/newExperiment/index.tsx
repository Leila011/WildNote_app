import { useNavigate, useParams } from "@solidjs/router";
import { createEffect, createResource, createSignal } from "solid-js";
import { createStore } from "solid-js/store";
import { fetchAttributeDescriptionsExperiments } from "~/api/fetchAttributeDescriptionsExperiments";
import { Form } from "~/components/Form";
import { Button } from "~/components/ui/button";
import { TableAttribute } from "~/types/db";
import { sqlToJsType } from "~/utils/typeConvertion";
import { addNewExperiment } from "~/api/addNewExperiment";

/**
 * A page for creating a new experiment
 * It takes as input the predetermined attributes and columns of the experiment table
 * It renders a form with the predetermined attributes with autofill is false and columns (manually filtered)
 * Submitting the data will return the id of the new experiment and redirect to the sampleSetup page
 * @input columns: The columns of the experiment table
 * @input attributes: The predefied attributes of the experiment table
 * @output experiment_id: The id of the new experiment
 **/
export default function NewExperiment() {
  const navigate = useNavigate();
  const [data] = createResource(() => fetchAttributeDescriptionsExperiments());
  const [store, setStore] = createStore<TableAttribute[]>([]);
  const [storeAutofill, setStoreAutofill] = createStore<TableAttribute[]>([]);

  const handleSubmit = async () => {
    setStore((prevStore) =>
      prevStore.map((attribute) =>
        attribute.name === "creation_date"
          ? { ...attribute, value: Date.now() }
          : attribute,
      ),
    );
    const response = await addNewExperiment([...store, ...storeAutofill]);
    navigate(`/newExperiment/${response.experiment_id}/sampleSetup`);
  };

  createEffect(() => {
    if (data()) {
      const attributesAugmented = data().attributes.map(
        (attribute: TableAttribute) =>
          ({
            ...attribute,
            typeJS: sqlToJsType(attribute.type),
            value: "",
          }) as TableAttribute,
      );

      setStore(
        attributesAugmented.filter(
          (attribute: TableAttribute) => attribute.autofill === false,
        ),
      );
      setStoreAutofill(
        attributesAugmented.filter(
          (attribute: TableAttribute) => attribute.autofill === true,
        ),
      );
    }
  });

  return (
    <div>
      {store.length && <Form store={store} setStore={setStore}></Form>}
      <Button onClick={handleSubmit}>Submit</Button>
    </div>
  );
}
