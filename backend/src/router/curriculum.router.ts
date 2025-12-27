import { Router } from "express";
import { CurriculumController } from "../controllers/curriculum.controller";

const curriculumRouter = Router();
const curriculumController = new CurriculumController();

curriculumRouter.get("/curriculum", curriculumController.get);

export default curriculumRouter;
