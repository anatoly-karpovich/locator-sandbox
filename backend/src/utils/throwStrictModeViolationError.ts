export function throwStrictModeViolationError(e: unknown): void | Error {
    if (e instanceof Error && e.message?.includes("strict mode violation")) {
      const match = e.message?.match(/(\d+)\s+elements/);
      const number = match ? parseInt(match[1], 10) : null;

      throw new Error(`Locator resolved to ${number} elements`);
    }
}