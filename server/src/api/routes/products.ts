import { Router, Request, Response } from "express";

import * as productController from "../controllers/product";
import { CreateProductDTO, UpdateProductDTO, SearchProductDTO } from "../dto/product.dto";
import wrapError from '../../utils/wrapError';

const productsRouter = Router();

productsRouter.post("/search", wrapError(async (req: Request, res: Response) => {
  const payload: SearchProductDTO = req.body;
  const results = await productController.search(payload);
  return res.status(200).send(results);
}));

productsRouter.get("/:id", wrapError(async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  const result = await productController.getById(id);
  return res.status(200).send(result);
}));

productsRouter.put("/:id", wrapError(async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const payload: UpdateProductDTO = req.body;

  const result = await productController.update(id, payload);
  return res.status(201).send(result);
}));

productsRouter.delete("/:id", wrapError(async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  const result = await productController.deleteById(id);
  return res.status(204).send({
    success: result,
  });
}));

productsRouter.post("/", wrapError(async (req: Request, res: Response) => {
  const payload: CreateProductDTO = req.body;
  
  const result = await productController.create(payload);
  return res.status(200).send(result);
}));

productsRouter.get("/", wrapError(async (req: Request, res: Response) => {
  const results = await productController.getAll();
  return res.status(200).send(results);
}));

export default productsRouter;
