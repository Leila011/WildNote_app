import { backendUrl } from "~/db";

type Props = {
  experimentId: number;
};

type DataCalendar = {
  year: string;
  series: DataCalendarItem[];
};

type DataCalendarItem = {
  name: string;
  data: { x: string; y: number }[];
};

const fetchDataCalendar = async(props: Props): Promise<DataCalendar[]> => {
  try {
    const response = await fetch(
      `${backendUrl}/api/experiment/${props.experimentId}/calendar`,
    );
    if (!response.ok) {
      throw new Error(`Failed to fetch calendar data: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

export {
  fetchDataCalendar as fetchCalendar,
  type DataCalendar as StatCalendar,
  type DataCalendarItem as StatCalendarItem,
}
