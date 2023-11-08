import { NextFunction, Request, Response } from "express";
import { QueryConfig } from "pg";
import { client } from "../database";

export const projectsDataDeveloperIdExists = async (req: Request, res: Response, next: NextFunction) => {
    const queryString = `SELECT * FROM projects WHERE "developerId" = $1;`;
    const queryConfig: QueryConfig = {
        text: queryString,
        values: [req.body.developerId],
    };
    const rowCount = await client.query(queryConfig);
    if (rowCount.rows[0]) {
        return res.status(404).json({ message: "Project not found." });
    }
    return next();
}

export const projectsDataIdExists = async (req: Request, res: Response, next: NextFunction) => {
    const queryString = `SELECT * FROM projects WHERE id = $1;`;
    const queryConfig: QueryConfig = {
        text: queryString,
        values: [req.params.id],
    };
    const rowCount = await client.query(queryConfig);
    if (!rowCount.rows[0]) {
        return res.status(404).json({ message: "Project not found." });
    }
    return next();
}

export const isDataDeveloperIdValid = async (req: Request, res: Response, next: NextFunction) => {
    const queryString = `SELECT * FROM developers WHERE id = $1;`;
    const queryConfig: QueryConfig = {
        text: queryString,
        values: [req.body.developerId],
    };
    const rowCount = await client.query(queryConfig);
    if (!rowCount.rows[0]) {
        return res.status(404).json({ message: "Developer not found." });
    }
    return next();
}
