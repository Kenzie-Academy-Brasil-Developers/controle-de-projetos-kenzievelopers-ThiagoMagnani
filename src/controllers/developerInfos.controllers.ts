import { Request, Response } from "express";
import { createDataInfosServices } from "../services/developersInfos.services";

export const createDataInfosController = async (req: Request, res: Response) => {
    const developerInfos = await createDataInfosServices(req.body, req.params.id);
    return res.status(201).json(developerInfos);
}