type Props = {
  url: string;
};

export const fetchItems = async<T extends Record<string, any>>(
  props: Props,
): Promise<T[]> =>{
  try {
    const response = await fetch(props.url);
    if (!response.ok) {
      throw new Error(`Failed to fetch observations: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}
