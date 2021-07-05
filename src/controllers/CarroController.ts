import { Request, Response } from "express";
import { CarroModel } from "../models/CarroModel";

import Connection from "../database/Connection";

const Carros = () => Connection<CarroModel>("carros");

class CarroController {
  async index(request: Request, response: Response) {
    const carros = await Carros();
    return response.json(carros);
  }

  async show(request: Request, response: Response) {
    const { id } = request.params;
    const carro = await Carros()
      .where({ id: Number(id) })
      .first();
    if (!carro) return response.status(404).send("Not Found");
    return response.json({ carro });
  }

  async store(request: Request, response: Response) {
    const data = request.body;
    const [id] = await Carros().insert(data);
    return response.status(201).json({ id, ...data });
  }

  async update(request: Request, response: Response) {
    const { id } = request.params;
    const data = request.body;

    const carro = await Carros()
      .where({ id: Number(id) })
      .first();

    if (!carro) return response.status(404).send("Not Found");

  await  Carros()
      .where({ id: Number(id) })
      .update(data);

      return response.json({id, ...data})
  }

  async delete(request: Request, response: Response) {
    const { id } = request.params;

    const carro = await Carros()
      .where({ id: Number(id) })
      .first();

    if (!carro) return response.status(404).send("Not Found");

    await Carros()
      .where({ id: Number(id) })
      .delete();

      return response.status(200).send()
  }
}

export default new CarroController();
