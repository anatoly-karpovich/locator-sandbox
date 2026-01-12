const STORAGE_KEY = "locator.correlationId";

function generateCorrelationId(): string {
  // Prefer Web Crypto UUID when available.
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  // Fallback: reasonably unique ID for client correlation.
  return `${Date.now().toString(16)}-${Math.random().toString(16).slice(2)}`;
}

/**
 * Returns a stable correlation id for the current browser tab.
 * Stored in sessionStorage (cleared when the tab is closed).
 */
export function getCorrelationId(): string {
  try {
    const existing = sessionStorage.getItem(STORAGE_KEY);
    if (existing) return existing;

    const id = generateCorrelationId();
    sessionStorage.setItem(STORAGE_KEY, id);
    return id;
  } catch {
    // If storage is blocked, fall back to a per-call generated id.
    return generateCorrelationId();
  }
}
