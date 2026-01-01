import { Router } from "express";
import { PlaygroundController } from "../controllers/playground.controller";
import { validateHtmlContentMiddleware } from "../middlewares/html.middleware";
import { validateLocatorPayloadMiddleware } from "../middlewares/locatorPayload.middleware";

const playgroundRouter = Router();
const controller = new PlaygroundController();

playgroundRouter.post(
  "/playground/submit",
  validateHtmlContentMiddleware,
  validateLocatorPayloadMiddleware,
  controller.submit.bind(controller)
);

export default playgroundRouter;
