import { logger } from "@core/logger/logger.js";
import { readEnvNumber } from "@utils/env.js";
import type { Server } from "node:http";
import type { IBrowserManager } from "@core/playwright/types.js";

type ShutdownOptions = {
  signal: string;
  server: Server | null;
  browserManager: IBrowserManager | null;
};

export async function gracefulShutdown({ signal, server, browserManager }: ShutdownOptions) {
  const timeoutMs = readEnvNumber("PLAYWRIGHT_SHUTDOWN_TIMEOUT_MS", 10000);
  logger.info({ message: "Shutdown started", signal });

  const tasks: Array<Promise<void>> = [];

  if (server) {
    tasks.push(
      new Promise((resolve) => {
        server.close(() => resolve());
      })
    );
  }

  if (browserManager) {
    tasks.push(browserManager.shutdown());
  }

  let exitCode = 0;
  try {
    await Promise.race([
      Promise.all(tasks),
      new Promise((_, reject) => setTimeout(() => reject(new Error("Shutdown timeout exceeded")), timeoutMs)),
    ]);
    logger.info({ message: "Shutdown completed" });
  } catch (err) {
    exitCode = 1;
    logger.error({ message: "Shutdown failed", err });
  } finally {
    process.exit(exitCode);
  }
}
