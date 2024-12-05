import { backendUrl } from "~/db";

export async function fetchSample(id: number): Promise<any[]> {
    try {
      const response = await fetch(`${backendUrl}/api/samples/${id}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch sample: ${response.statusText}`);
      }
      const data: any[] = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  }