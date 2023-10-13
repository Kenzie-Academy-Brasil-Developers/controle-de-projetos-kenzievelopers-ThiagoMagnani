import { QueryConfig, QueryResult } from "pg";
import { projects, projectsBody } from "../interfaces/projects.interfaces";
import { client } from "../database";
import format from "pg-format";

export const getProjectsServices = async (id: string) => {
    const queryString = `SELECT * FROM projects WHERE id = $1;`;
    const queryConfig: QueryConfig = {
        text: queryString,
        values: [id],
    };
    const data: QueryResult<projects> = await client.query(queryConfig);
    return data.rows[0];
};

export const createProjectsServices = async (body: projectsBody) => {
    const { name, description, repository, startDate, endDate, developerId } = body;
    const queryString = `INSERT INTO projects (name, description, repository, startDate, endDate, developerId) VALUES ($1, $2) RETURNING *;`;
    const queryConfig: QueryConfig = {
        text: queryString,
        values: [name, description, repository, startDate, endDate, developerId],
    };
    const data: QueryResult<projects> = await client.query(queryConfig);
    return data.rows[0];
}

export const editProjectsServices = async (body: projectsBody, id: string) => {
    const query = format('UPDATE projects SET(%I) = ROW(%L) WHERE id = (%s) RETURNING *;', Object.keys(body), Object.values(body), id);
    const data: QueryResult<projects> = await client.query(query);

    return data.rows[0];
}
