import { Router } from "express";
import { getData } from "./controllers/CsvController";

const routes = Router();

routes.get("/data", getData);

export default routes;
