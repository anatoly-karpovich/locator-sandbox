import { Router } from "express";
import { PlaygroundController } from "../controllers/playground.controller";
import { validateHtmlContentMiddleware } from "../middlewares/html.middleware";
import { validateLocatorPayloadMiddleware } from "../middlewares/locatorPayload.middleware";
import { container, TYPES } from "../container";

const playgroundRouter = Router();
const controller = container.get<PlaygroundController>(TYPES.PlaygroundController);

playgroundRouter.post(
  "/playground/submit",
  validateHtmlContentMiddleware,
  validateLocatorPayloadMiddleware,
  controller.submit.bind(controller)
);

export default playgroundRouter;
