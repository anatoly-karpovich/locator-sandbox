export function normalizeLocatorPayload(input: string): string {
  return input.replace(/\)\s*(?:;\s*)+$/, ")");
}
