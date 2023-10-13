import { NextFunction, Request, Response } from "express";
import { QueryConfig } from "pg";
import { client } from "../database";
import { AppError } from "../errors/errors";

export const isDataIdValidInfos = async (req: Request, res: Response, next: NextFunction) => {

    const queryString = `SELECT * FROM "developerInfos" WHERE id = $1`;
    const queryConfig: QueryConfig = {
        text: queryString,
        values: [req.params.id],
    };
    const rowCount = await client.query(queryConfig);
    if (!rowCount.rows[0]) {
        throw new AppError("Developer not found.", 404);
    }
    return next();
}