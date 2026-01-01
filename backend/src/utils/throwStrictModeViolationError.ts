export function getStrictModeViolationElementCount(e: unknown): number {
    if (e instanceof Error && e.message?.includes("strict mode violation")) {
      const match = e.message?.match(/(\d+)\s+elements/);
      return match ? parseInt(match[1], 10) : 0;
    }
}