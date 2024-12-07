
/**
 * Fetches the complete list of samples from the backend for a given experiment id
 * @param id the experiment id
 * @returns {Promise<any[]>} A promise that resolves to an array of sample objects.
 * @throws Will throw an error if the fetch operation fails.
 */

import { backendUrl } from "~/db";

  export async function fetchSamples(experimentId: number): Promise<any[]> {
    try {
      const response = await fetch(`${backendUrl}/api/experiments/${experimentId}/samples`);
      if (!response.ok) {
        throw new Error(`Failed to fetch samples: ${response.statusText}`);
      }
      const data: any[] = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  }