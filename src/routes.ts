import { Router } from "express";
import "./controllers/CarroController";
import CarroController from "./controllers/CarroController";

const routes = Router();

routes.get("/", (req, res) => {
    res.render("index.html");
});

routes.get("/carros", CarroController.index);
routes.get("/carros/:id", CarroController.show);
routes.post("/carros", CarroController.store);
routes.put("/carros/:id", CarroController.update);
routes.delete("/carros/:id", CarroController.delete);

export default routes;
