/**
 * Fetches the complete list of samples from the backend for a given experiment id
 * @param id the experiment id
 * @returns {Promise<any[]>} A promise that resolves to an array of sample objects.
 * @throws Will throw an error if the fetch operation fails.
 */

import { addNewRecord } from "~/api/addNewRecord/addNewRecord";
import { unwrap } from "solid-js/store";
import { setAttribute } from "solid-js/web";
import { TableAttribute } from "~/types/Form";

export async function addNewRecordAll(
  store: Record<string, any>,
  attributeDescriptions: TableAttribute[],
  table_name: string,
) {
  const data = unwrap(store);

  const dataPredefinedAttributes = attributeDescriptions.reduce(
    (acc: Record<string, any>, name: string) => {
      acc[name] = data[name]; // Adds a key-value pair to the accumulator object
      return acc;
    },
    {} as Record<string, any>,
  );
  await addNewRecord(
    { custom: dataCustomAttributes, predefined: dataPredefinedAttributes },
    table_name,
  );
}
