import { createEffect, createResource } from "solid-js";
import { Button, buttonVariants } from "~/components/ui/button";
import { TableAttribute, TableAttributeValue } from "~/types/db";
import { fetchAttributeDescriptions } from "~/api/fetchAttributeDescriptions";
import { Form } from "~/components/Form";
import { createStore } from "solid-js/store";
import { useNavigate, useParams } from "@solidjs/router";
import { addNewObservation } from "~/api/addNewObservation";
import { updateValue } from "~/api/updateValue";
import { Heading } from "~/components/Heading";

export default function EncodingObservation() {
  const navigate = useNavigate();
  const params = useParams();

  function fetcher(props: { experimentId: number; tableName: string }) {
    return props.experimentId
      ? fetchAttributeDescriptions(props.tableName, props.experimentId)
      : undefined;
  }

  const [attributes] = createResource(() => {
    return {
      experimentId: Number(params.experimentId),
      tableName: "observation",
    };
  }, fetcher);

  const [store, setStore] = createStore<TableAttributeValue[]>([]);
  const [storeAutofill, setStoreAutofill] = createStore<TableAttributeValue[]>(
    [],
  );

  createEffect(() => {
    if (attributes()) {
      const attributesAugmented = attributes()!.attributes.map(
        (attribute: TableAttribute) =>
          ({
            ...attribute,
            value: "",
          }) as TableAttributeValue,
      );
      setStore(
        attributesAugmented.filter(
          (attribute: TableAttributeValue) => attribute.autofill === false,
        ),
      );
      setStoreAutofill(
        attributesAugmented.filter(
          (attribute: TableAttributeValue) => attribute.autofill === true,
        ),
      );
    }
  });

  const endObservation = async () => {
    setStoreAutofill((prevStore) =>
      prevStore.map((attribute) =>
        attribute.name === "creation_date"
          ? { ...attribute, value: Date.now() }
          : attribute,
      ),
    );
    const data = {
      columns: [],
      attributes: [...store, ...storeAutofill],
    };

    const response = await addNewObservation(data, Number(params.sampleId));

    // reset the stores (this vaoid a=having to refetch everything)
    const resetStore = store.map((attribute) => {
      return {
        ...attribute,
        value: "",
      };
    });
    setStore(resetStore);

    const resetStoreAutofill = storeAutofill.map((attribute) => {
      return {
        ...attribute,
        value: "",
      };
    });
    setStoreAutofill(resetStoreAutofill);
    return response;
  };

  const endSample = async () => {
    await updateValue("sample", "status", Number(params.sampleId), "completed");
  };

  const handleSubmitNext = async () => {
    const response = await endObservation();
    navigate(`/encoding/${params.experimentId}/${params.sampleId}`);
  };

  const handleSubmitNextSample = async () => {
    const response = await endObservation();
    navigate(`/encoding/${params.experimentId}`);
  };

  const handleSubmitEnd = async () => {
    const response = await endObservation();
    await endSample();
    navigate(`/`);
  };

  return (
    <div class="container mx-auto">
      <div>
        <Heading>Start encoding your new observation</Heading>
        <div class="flex flex-col space-y-2">
          <div class="border border-primary rounded-md item-center bg-primary/10">
            {store.length && <Form store={store} setStore={setStore}></Form>}
          </div>

          <div class="flex flex-row space-x-2">
            <Button
              class={buttonVariants({ variant: "accent" })}
              onClick={handleSubmitNext}
            >
              Next observation
            </Button>
            <Button
              class={buttonVariants({ variant: "outline" })}
              onClick={handleSubmitNextSample}
            >
              Next observation session
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
