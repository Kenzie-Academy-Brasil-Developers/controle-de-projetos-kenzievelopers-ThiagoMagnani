import { QueryResult } from "pg";
import { developerInfos, developerInfosBody } from "../interfaces/developerInfos.interfaces";
import { client } from "../database";
import format from "pg-format";

export const createDataInfosServices = async (body: developerInfosBody, id: string) => {
    const queryString = format(`INSERT INTO "developerInfos" (%I, "developerId") VALUES (%L, $1) RETURNING *;`, Object.keys(body), Object.values(body));

    const data: QueryResult<developerInfos> = await client.query(queryString, [id]);
    return data.rows[0];
}