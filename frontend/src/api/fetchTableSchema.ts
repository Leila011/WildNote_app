import { backendUrl } from "~/db";

/**
 * Fetch the schema of a table from the backend
 * @param {string} tableName The name of the table to fetch the schema for
 * @returns {Promise<any>} A promise that resolves to the schema of the table
 * @throws Will throw an error if the fetch operation fails.
 */
export async function fetchTableSchema(tableName: string, parent_id?: number): Promise<any> {
  console.log("fetching schema for parent_id:", parent_id);  
  let response;
    if(parent_id){
      response = await fetch(`${backendUrl}/schema/${tableName}/${parent_id}`);
    } else {
      response = await fetch(`${backendUrl}/schema/${tableName}`);
    }
    if (!response.ok) {
      console.log(response)
      throw new Error("Failed to fetch table schema");
    }
    return response.json();
  }