import "dotenv/config";
import "reflect-metadata";
import express from "express";
import expressWinston from "express-winston";
import { v4 as uuidv4 } from "uuid";
import { tasksRouter, trainingsRouter, trainingsRunsRouter, playgroundRouter } from "./router/index.js";
import { errorMiddleware } from "./middlewares/error.middleware.js";
import { logger, getLogFileInfo } from "./core/logger/logger.js";
import { container, TYPES } from "./container/index.js";
import { IBrowserManager } from "@core/playwright/types.js";
import { gracefulShutdown } from "@core/playwright/gracefulShutdown.js";
import type { Server } from "node:http";

const app = express();
app.use(express.json());

// Attach correlation id to every request.
app.use((req, res, next) => {
  const headerId = req.header("x-request-id");
  const requestId = headerId && headerId.trim().length > 0 ? headerId : uuidv4();
  req.requestId = requestId;
  res.setHeader("x-request-id", requestId);
  next();
});

// Structured request logging (one line per request).
app.use(
  expressWinston.logger({
    winstonInstance: logger,
    msg: "HTTP {{req.method}} {{req.url}}",
    // Avoid logging full request/response bodies; keep logs lean and safe.
    requestWhitelist: ["headers", "method", "url", "httpVersion", "originalUrl", "query"],
    responseWhitelist: ["statusCode"],
    dynamicMeta: (req, res) => ({
      requestId: req.requestId,
    }),
    ignoredRoutes: ["/favicon.ico"],
  })
);

app.use("/api", tasksRouter);
app.use("/api", trainingsRunsRouter);
app.use("/api", trainingsRouter);
app.use("/api", playgroundRouter);
app.use(errorMiddleware);

let server: Server | null = null;
let browserManager: IBrowserManager | null = null;

async function startApp() {
  const PORT = 3333;
  try {
    browserManager = container.get<IBrowserManager>(TYPES.BrowserManager);
    await browserManager.init();

    server = app.listen(PORT, () => {
      logger.info({ message: "Server started", port: PORT, ...getLogFileInfo() });
    });
  } catch (e) {
    logger.error({ message: "Failed to start server", err: e });
  }
}

process.on("SIGTERM", () => gracefulShutdown({ signal: "SIGTERM", server, browserManager }));
process.on("SIGINT", () => gracefulShutdown({ signal: "SIGINT", server, browserManager }));

startApp();
