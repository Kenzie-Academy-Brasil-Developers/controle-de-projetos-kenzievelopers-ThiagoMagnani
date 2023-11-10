import { QueryConfig, QueryResult } from "pg";
import format from "pg-format";
import { client } from "../database";
import { developers, developersBody } from "../interfaces/developers.interfaces";

export const getDataServices = async (id: string) => {
    const ret = {
        developerId: null,
        developerName: null,
        developerEmail: null,
        developerInfoDeveloperSince: null,
        developerInfoPreferredOS: null
    };
    const queryString = `
    SELECT 
    d.id AS "developerId",
    d.name AS "developerName",
    d.email AS "developerEmail",
    di."developerSince" AS "developerInfoDeveloperSince",
    di."preferredOS" AS "developerInfoPreferredOS"
    FROM "developerInfos" AS di
    JOIN developers d ON di."developerId" = d.id 
    WHERE di."developerId" = $1; `;
    const queryConfig: QueryConfig = {
        text: queryString,
        values: [id],
    };
    const data: QueryResult<developers> = await client.query(queryConfig);
    if (data && data.rowCount && data.rowCount > 0) {
        Object.assign(ret, data.rows[0]);
    }
    return ret;
};

export const createDataServices = async (body: developersBody) => {
    const { email, name } = body;
    const queryString = `INSERT INTO developers (email, name) VALUES ($1, $2) RETURNING *;`;
    const queryConfig: QueryConfig = {
        text: queryString,
        values: [email, name],
    };
    const data: QueryResult<developers> = await client.query(queryConfig);
    return data.rows[0];
}

export const editDataServices = async (body: developersBody, id: string) => {
    const query = format('UPDATE developers SET(%I) = ROW(%L) WHERE id = (%s) RETURNING *;', Object.keys(body), Object.values(body), id);
    const data: QueryResult<developers> = await client.query(query);
    return data.rows[0];
}

export const deleteDataServices = async (id: string) => {
    const queryString = `DELETE FROM developers WHERE id = $1;`;
    const queryConfig: QueryConfig = {
        text: queryString,
        values: [id],
    }
    const data: QueryResult<developers> = await client.query(queryConfig);
    await client.query(queryConfig);
    return data.rows[0];
}
