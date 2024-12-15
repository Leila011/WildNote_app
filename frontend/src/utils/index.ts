import { DurationHMS } from "~/types/db";

/**
 * Cleans an anchor string by converting it to lowercase, removing non-alphanumeric characters (except spaces),
 * and replacing spaces with hyphens.
 *
 * This function is useful for generating URL-friendly anchor names from arbitrary strings.
 *
 * @param anchor - The original anchor string to be cleaned.
 * @returns The cleaned anchor string, suitable for use in URLs or HTML id attributes.
 */
export function cleanAnchor(anchor: string): string {
  return anchor
    .toLowerCase()
    .replace(/[^a-zA-Z0-9 ]/g, "")
    .replace(/ /g, "-");
}

export function getTimePassed(start: number) {
  var delta = Date.now() - start; // milliseconds elapsed since start
  //output(Math.floor(delta / 1000)); // in seconds
  // alternatively just show wall clock time:
  return Math.floor(delta / 1000); // in seconds
}

export function getPercentageTimePassed(timePassed: number, duration: number) {
  return Math.floor((timePassed / duration) * 100);
}

export function secondToHMS(seconds: number): DurationHMS {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;
  return { hours, minutes, seconds: remainingSeconds };
}

export function secondToString(seconds: number): string {
  const duration = secondToHMS(seconds);
  let result = "";

  if (duration.hours > 0) {
    result += `${duration.hours}h`;
  }
  if (duration.minutes > 0) {
    result += `${duration.minutes}m`;
  }
  if (
    duration.seconds > 0 ||
    (duration.hours === 0 && duration.minutes === 0)
  ) {
    result += `${duration.seconds}s`;
  }

  return result;
}
