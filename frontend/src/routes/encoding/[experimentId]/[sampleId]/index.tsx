import {
  createEffect,
  createResource,
  createSignal,
  For,
  Show,
} from "solid-js";
import { fetchExperiments } from "~/api/fetchExperiments";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Button, buttonVariants } from "~/components/ui/button";
import { IconChevronDown } from "~/components/icons";
import {
  Experiment,
  Subject,
  TableAttribute,
  TableAttributeValue,
} from "~/types/db";
import { fetchAttributeDescriptions } from "~/api/fetchAttributeDescriptions";
import { Form } from "~/components/Form";
import { createStore } from "solid-js/store";
import { useNavigate, useParams } from "@solidjs/router";
import { addNewSample } from "~/api/addNewSample";
import { fetchSubjects } from "~/api/fetchSubjects";
import { addNewObservation } from "~/api/addNewObservation";
import { addAttributeValue } from "~/api/addAttributeValue";
import { updateValue } from "~/api/updateValue";
import { Title } from "~/components/title";

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
    await updateValue( "sample", "status", Number(params.sampleId), "completed");
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
    <main class="text-center mx-auto text-gray-700 p-4">
      <div>
      <Title>Start encoding your new observation</Title>
        {store.length && <Form store={store} setStore={setStore}></Form>}
        <Button onClick={handleSubmitNext}>Next observation</Button>
        <Button onClick={handleSubmitNextSample}>
          Next observation session
        </Button>
        <Button onClick={handleSubmitEnd}>End observation session</Button>
      </div>
    </main>
  );
}
