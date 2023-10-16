import { Router } from "express";
import { createDataController, deleteDataController, editDataController, getDataController } from "../controllers/developers.controllers";
import { developerInfoDataExists, isDataIdValid, isDataValidEmail } from "../middlewares/developers.validation";
import { createDataInfosController } from "../controllers/developerInfos.controllers";

const developerRouter = Router();

developerRouter.post('/', isDataValidEmail, createDataController);

developerRouter.get('/:id', isDataIdValid, getDataController);

developerRouter.post('/:id/infos', isDataIdValid, developerInfoDataExists, createDataInfosController);

developerRouter.patch('/:id', isDataIdValid, isDataValidEmail, editDataController);

developerRouter.delete('/:id', isDataIdValid, deleteDataController);

export default developerRouter;
