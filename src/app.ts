import express, { Application } from "express";
import "dotenv/config";
import { createData, deleteData, editData, getData } from "./logic";
import { isDataValidName } from "./middlewares/validation";
import { isDataIdValid } from "./middlewares/isDataIdValid";

const app: Application = express();
app.use(express.json());

app.post('/developers', isDataValidName, createData);

// app.post('/developers/:id/infos', ... );

app.get('/developers/:id', getData);

app.patch('/developers/:id', isDataIdValid, isDataValidName, editData);

app.delete('/developers/:id', isDataIdValid, deleteData);

export default app;
