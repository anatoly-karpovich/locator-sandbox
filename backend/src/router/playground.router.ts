import { Router } from "express";
import { PlaygroundController } from "../controllers/playground.controller";

const playgroundRouter = Router();
const controller = new PlaygroundController();

playgroundRouter.post("/playground/submit", controller.submit.bind(controller));

export default playgroundRouter;
