import { Request, Response } from "express";
import { client } from "./database";
import { QueryConfig, QueryResult } from "pg";
import { developers } from "./interfaces";
import format from "pg-format";

export const getData = async (req: Request, res: Response) => {
    const { id } = req.params;
    const queryString = `SELECT * FROM developers WHERE id = $1;`;
    const queryConfig: QueryConfig = {
        text: queryString,
        values: [id],
    };
    const data: QueryResult<developers> = await client.query(queryConfig);
    return res.status(200).json(data.rows[0]);
};

export const createData = async (req: Request, res: Response) => {
    const { email, name } = req.body;
    const queryString = `INSERT INTO developers (email, name) VALUES ($1, $2) RETURNING *;`
    const queryConfig: QueryConfig = {
        text: queryString,
        values: [email, name],
    };
    const data: QueryResult<developers> = await client.query(queryConfig);
    return res.status(201).json(data.rows[0]);
}

export const editData = async (req: Request, res: Response) => {
    const { id } = req.params;
    const query = format('UPDATE developers SET(%I) = ROW(%L) WHERE id = (%s) RETURNING *;', Object.keys(req.body), Object.values(req.body), id)
    const data: QueryResult<developers> = await client.query(query);
    return res.status(200).json(data.rows[0]);
}

export const deleteData = async (req: Request, res: Response) => {
    const { id } = req.params;
    const queryString = `DELETE FROM developers WHERE ID = $1;`;
    const queryConfig: QueryConfig = {
        text: queryString,
        values: [id],
    }
    await client.query(queryConfig);
    return res.status(204).json();
}
