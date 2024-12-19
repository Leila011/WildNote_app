import { AttributeValue } from "~/types/db";
import { attributeToDb, columnToDb } from "~/utils/db";

type Props<T extends Record<string, any>> = {
  data: {
    columns: T;
    attributes: AttributeValue[];
  },
  url: string;
};

type Response<K extends string> = Record<K, number>;

export const createItem = async <T extends Record<string, any>, K extends string>(props: Props<T>): Promise<Response<K>> => {
  const dataFormatted = {
    columns: columnToDb(props.data.columns),
    attributes: attributeToDb(props.data.attributes),
  };
  const response = await fetch(props.url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dataFormatted),
  });
  if (!response.ok) {
    throw new Error("Failed to add record");
  }
  return response.json();
}
