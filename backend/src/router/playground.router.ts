import { Router } from "express";
import { PlaygroundController } from "@controllers/playground.controller.js";
import { validateHtmlContentMiddleware } from "@middlewares/html.middleware.js";
import { validateLocatorPayloadMiddleware } from "@middlewares/locatorPayload.middleware.js";
import { container, TYPES } from "../container/index.js";

const playgroundRouter = Router();
const controller = container.get<PlaygroundController>(TYPES.PlaygroundController);

playgroundRouter.post(
  "/playground/submit",
  validateHtmlContentMiddleware,
  validateLocatorPayloadMiddleware,
  controller.submit.bind(controller)
);

export default playgroundRouter;
