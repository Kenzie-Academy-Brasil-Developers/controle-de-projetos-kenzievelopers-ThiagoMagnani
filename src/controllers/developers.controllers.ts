import { Request, Response } from "express";
import { createDataServices, deleteDataServices, editDataServices, getDataServices } from "../services/developers.service";

export const getDataController = async (req: Request, res: Response) => {
    const response = await getDataServices(req.params.id);
    return res.status(200).json(response);
};

export const createDataController = async (req: Request, res: Response) => {
    const response = await createDataServices(req.body);
    return res.status(201).json(response);
}

export const editDataController = async (req: Request, res: Response) => {
    const response = await editDataServices(req.body, req.params.id);
    return res.status(200).json(response);
}

export const deleteDataController = async (req: Request, res: Response) => {
    const response = await deleteDataServices(req.params.id);
    return res.status(204).json(response);
}
