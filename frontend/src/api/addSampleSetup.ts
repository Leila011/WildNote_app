import { backendUrl } from "~/db";

export async function addSampleSetup(data:Record<string, any>, experimentId: number){
    const response = await fetch(`${backendUrl}/api/experiment/${experimentId}/sample`, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    if (!response.ok) {
        throw new Error('Failed to add record');
    }
    return response.json();
    }