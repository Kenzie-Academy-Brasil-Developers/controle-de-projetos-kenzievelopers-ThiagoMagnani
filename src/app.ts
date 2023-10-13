import express, { Application } from "express";
import "dotenv/config";
import developerRouter from "./router/developers.routers";
import projectRouter from "./router/projects.routers";

const app: Application = express();

app.use(express.json());

app.use("/developers", developerRouter);
app.use("/projects", projectRouter);

export default app;
