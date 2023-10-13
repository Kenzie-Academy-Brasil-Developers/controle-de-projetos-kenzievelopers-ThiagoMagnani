import { Request, Response } from "express";
import { createProjectsServices, editProjectsServices, getProjectsServices } from "../services/projects.services";

export const getProjectsController = async (req: Request, res: Response) => {
    const response = await getProjectsServices(req.params.id);
    return res.status(200).json(response);
};

export const createProjectsController = async (req: Request, res: Response) => {
    const response = await createProjectsServices(req.body);
    return res.status(201).json(response);
}

export const editProjectsController = async (req: Request, res: Response) => {
    const response = await editProjectsServices(req.body, req.params.id);
    return res.status(200).json(response);
}