export function readEnvVariable(name: string, fallback?: string) {
  const raw = process.env[name];
  if (!raw) {
    return fallback;
  }

  return raw;
}

export function readEnvNumber(name: string, fallback: number) {
  const raw = readEnvVariable(name);
  if (!raw) {
    return fallback;
  }

  const parsed = Number.parseInt(raw, 10);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : fallback;
}
