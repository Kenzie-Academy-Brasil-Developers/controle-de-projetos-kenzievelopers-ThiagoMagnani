import { QueryConfig, QueryResult } from "pg";
import { projects, projectsBody } from "../interfaces/projects.interfaces";
import { client } from "../database";
import format from "pg-format";

export const getProjectsServices = async (id: string) => {
    const ret = {
        projectId: null,
        projectName: null,
        projectDescription: null,
        projectRepository: null,
        projectStartDate: null,
        projectEndDate: null,
        projectDeveloperName: null
    };
    const queryString = `
    SELECT 
    d.id AS "developerId",
    p.name AS "projectName",
    p."description" AS "projectDescription",
    p."repository" AS "projectRepository",
    p."startDate" AS "projectStartDate",
    p."endDate" AS "projectEndDate",
    d.name AS "projectDeveloperName"
    FROM projects AS p
    JOIN developers d ON p."developerId" = d.id 
    WHERE p."developerId" = $1;`;
    const queryConfig: QueryConfig = {
        text: queryString,
        values: [id],
    };
    const data: QueryResult<projects> = await client.query(queryConfig);
    if (data && data.rowCount && data.rowCount > 0) {
        Object.assign(ret, data.rows[0]);
    }
    return ret;
};

export const createProjectsServices = async (body: projectsBody) => {
    const { name, description, repository, startDate, endDate, developerId } = body;
    const queryString = `INSERT INTO projects (name, description, repository, "startDate", "endDate", "developerId") VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;`;
    const queryConfig: QueryConfig = {
        text: queryString,
        values: [name, description, repository, startDate, endDate, developerId],
    };
    const data: QueryResult<projects> = await client.query(queryConfig);
    return data.rows[0];
}

export const editProjectsServices = async (body: projectsBody, id: string) => {
    const ret = {
        id: null,
        name: null,
        description: null,
        repository: null,
        startDate: null,
        endDate: null,
        developerId: null
    };
    const query = format('UPDATE projects SET(%I) = ROW(%L) WHERE id = (%s) RETURNING *;', Object.keys(body), Object.values(body), id);
    const data: QueryResult<projects> = await client.query(query);
    if (data.rows[0]) {
        Object.assign(ret, data.rows[0]);
    }
    return ret;
}
