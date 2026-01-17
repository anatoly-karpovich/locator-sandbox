import fs from "node:fs";
import path from "node:path";
import winston from "winston";
import DailyRotateFile from "winston-daily-rotate-file";

const LOG_LEVEL = process.env.LOG_LEVEL ?? "debug";
const LOG_DIR = process.env.LOG_DIR ?? "logs";
const LOG_TO_CONSOLE = (process.env.LOG_TO_CONSOLE ?? "true").toLowerCase() === "true";

/**
 * JSON logs, one object per line (JSONL/NDJSON).
 *
 * Note: Winston's json() already outputs a single-line JSON string.
 */
const jsonFormat = winston.format.combine(
  winston.format.timestamp(),
  winston.format.errors({ stack: true }),
  winston.format.json()
);

function ensureLogDir(dir: string) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

ensureLogDir(LOG_DIR);

const transports: winston.transport[] = [
  new DailyRotateFile({
    dirname: LOG_DIR,
    filename: "backend-%DATE%.jsonl",
    datePattern: "YYYY-MM-DD",
    maxFiles: "3d",
    zippedArchive: true,
    level: LOG_LEVEL,
  }),
  new DailyRotateFile({
    dirname: LOG_DIR,
    filename: "backend-error-%DATE%.jsonl",
    datePattern: "YYYY-MM-DD",
    maxFiles: "3d",
    zippedArchive: true,
    level: "error",
  }),
];

if (LOG_TO_CONSOLE) {
  transports.push(new winston.transports.Console({ level: LOG_LEVEL }));
}

export const logger = winston.createLogger({
  level: LOG_LEVEL,
  format: jsonFormat,
  defaultMeta: {
    service: "locator-backend",
    env: process.env.NODE_ENV ?? "development",
  },
  transports,
});

export function getLogFileInfo() {
  return {
    level: LOG_LEVEL,
    dir: path.resolve(LOG_DIR),
    toConsole: LOG_TO_CONSOLE,
    retention: "3d",
  };
}
