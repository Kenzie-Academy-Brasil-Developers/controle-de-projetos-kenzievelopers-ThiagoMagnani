import { NextFunction, Request, Response } from "express";
import { QueryConfig } from "pg";
import { client } from "../database";
import { AppError } from "../errors/errors";

export const isDataIdValid = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const queryString = "SELECT * FROM developers WHERE id = $1";
        const queryConfig: QueryConfig = {
            text: queryString,
            values: [req.params.id],
        };
        const rowCount = await client.query(queryConfig);
        if (!rowCount.rows[0]) {
            throw new AppError("Developer not found.", 404);
        }
        return next();
    } catch (error) {
        if (error instanceof AppError) {
            return res.status(error.statusCode).json({ message: error.message });
        }
        console.log(error);
        return res.status(500).json("Internal server error");
    }
}

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
    return next();
}

export const isDataValidNamePatch = async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.body;
    const queryString = "SELECT * FROM developers WHERE email = $1";
    const queryConfig: QueryConfig = {
        text: queryString,
        values: [email],
    };
    const { rowCount } = await client.query(queryConfig);
    if (rowCount > 0) {
        return res.status(409).json({ message: "Email already exists." });
    }
    return next();
}
