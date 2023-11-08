import { Router } from "express";
import { createProjectsController, editProjectsController, getProjectsController } from "../controllers/projects.controller";
import { projectsDataDeveloperIdExists, projectsDataIdExists, isDataDeveloperIdValid } from "../middlewares/projects.validation";


const projectRouter = Router();

projectRouter.get('/:id', projectsDataIdExists, getProjectsController);
projectRouter.post('/', isDataDeveloperIdValid, createProjectsController);
projectRouter.patch('/:id', projectsDataIdExists, projectsDataDeveloperIdExists, isDataDeveloperIdValid, editProjectsController);

export default projectRouter;
