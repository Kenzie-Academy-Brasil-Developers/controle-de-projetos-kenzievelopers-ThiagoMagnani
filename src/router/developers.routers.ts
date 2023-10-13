import { Router } from "express";
import { createDataController, deleteDataController, editDataController, getDataController } from "../controllers/developers.controllers";
import { isDataIdValid, isDataValidName, isDataValidNamePatch } from "../middlewares/developers.validation";
import { createDataInfosController } from "../controllers/developerInfos.controllers";
import { isDataIdValidInfos } from "../middlewares/developerInfos.validation";
const developerRouter = Router();

developerRouter.post('/', isDataValidName, createDataController);

developerRouter.post('/:id/infos', isDataIdValidInfos, createDataInfosController);

developerRouter.get('/:id', isDataIdValid, getDataController);

developerRouter.patch('/:id', isDataIdValid, isDataValidNamePatch, editDataController);

developerRouter.delete('/:id', isDataIdValid, deleteDataController);

export default developerRouter;
