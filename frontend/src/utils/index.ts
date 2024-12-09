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