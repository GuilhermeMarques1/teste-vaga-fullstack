import express, { Express, Request, Response } from "express";
import cors from "cors";
import routes from "./routes";

const app: Express = express();
const port = 3001;

app.use(express.json());
app.use(cors());

app.use(routes);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
