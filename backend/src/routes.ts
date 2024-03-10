import { Router } from "express";

const routes = Router();

routes.get("/data", (req, res) => {
  return res.json({
    name: "Guilherme",
    age: 23
  });
});

export default routes;
