import { NextFunction, Request, Response } from "express";
import { QueryConfig } from "pg";
import { client } from "../database";

export const isDataValidName = async (req: Request, res: Response, next: NextFunction) => {
    const { name } = req.body;
    const queryString = "SELECT * FROM developers WHERE name = $1";
    const queryConfig: QueryConfig = {
        text: queryString,
        values: [name],
    };
    const { rowCount } = await client.query(queryConfig);
    if (rowCount > 0) {
        return res.status(409).json({ message: "Developer name already exists!" });
    }
    return next;
}
