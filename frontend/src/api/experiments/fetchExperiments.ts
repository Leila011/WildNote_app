import { backendUrl } from "~/db";
import { ExperimentDb } from "~/types/db";
import { fetchItems } from "../generic/fetchItems";

export const fetchExperiments = async() : Promise<ExperimentDb[]> =>{
  const url = `${backendUrl}/api/experiments/attributeValues`
  return fetchItems({ url });
}
