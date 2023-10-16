import { Router } from "express";
import { createProjectsController, editProjectsController, getProjectsController } from "../controllers/projects.controller";
import { projectsDataDeveloperIdExists, projectsDataIdExists, isDataDeveloperIdValid } from "../middlewares/projects.validation";


const projectRouter = Router();

projectRouter.get('/:id', projectsDataIdExists, getProjectsController);
projectRouter.post('/', isDataDeveloperIdValid, createProjectsController);
projectRouter.patch('/:id', projectsDataDeveloperIdExists, projectsDataIdExists, editProjectsController);

export default projectRouter;
