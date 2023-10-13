import { NextFunction, Request, Response } from "express";
import { QueryConfig } from "pg";
import { client } from "../database";
import { AppError } from "../errors/errors";

export const isProjectsIdValid = async (req: Request, res: Response, next: NextFunction) => {
    const queryString = `SELECT * FROM projects WHERE projectId = $1`;
    const queryConfig: QueryConfig = {
        text: queryString,
        values: [req.params.id],
    };
    const rowCount = await client.query(queryConfig);
    if (!rowCount.rows[0]) {
        throw new AppError("Project not found.", 404);
    }
    return next();
}

export const isProjectsValidName = async (req: Request, res: Response, next: NextFunction) => {
    const { projectName } = req.body;
    const queryString = "SELECT * FROM projects WHERE projectName = $1";
    const queryConfig: QueryConfig = {
        text: queryString,
        values: [projectName],
    };
    const { rowCount } = await client.query(queryConfig);
    if (rowCount > 0) {
        return res.status(409).json({ message: "Project name already exists!" });
    }
    return next();
}

export const isProjectsValidDeveloper = async (req: Request, res: Response, next: NextFunction) => {
    const { developerId } = req.body;
    const queryString = "SELECT * FROM developers WHERE id = $1";
    const queryConfig: QueryConfig = {
        text: queryString,
        values: [developerId],
    };
    const { rowCount } = await client.query(queryConfig);
    if (rowCount > 0) {
        return res.status(409).json({ message: "Developer not found." });
    }
    return next();
}
