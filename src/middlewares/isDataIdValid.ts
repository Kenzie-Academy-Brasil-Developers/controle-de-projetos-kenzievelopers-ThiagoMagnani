import { NextFunction, Request, Response } from "express";
import { QueryConfig } from "pg";
import { client } from "../database";

export const isDataIdValid = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const queryString = "SELECT * FROM developers WHERE id = $1";
        const queryConfig: QueryConfig = {
            text: queryString,
            values: [req.params.id],
        };
        const rowCount = await client.query(queryConfig);
        if (!rowCount.rows[0]) {
            throw new Error("Developer not found!");
        }
        return next;
    } catch (error) {
        if (error instanceof Error) {
            return res.status(404).json({ error: error.message });
        }
        console.log(error);
        return res.status(500).json("Internal server error");
    }
}
