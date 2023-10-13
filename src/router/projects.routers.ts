import { Router } from "express";
import { createProjectsController, editProjectsController, getProjectsController } from "../controllers/projects.controller";
import { isProjectsIdValid } from "../middlewares/projects.validation";

const projectRouter = Router();

projectRouter.get('/', isProjectsIdValid, getProjectsController);
projectRouter.post('/:id', createProjectsController);
projectRouter.patch('/:id', editProjectsController);

export default projectRouter;
