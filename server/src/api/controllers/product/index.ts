import * as service from "../../../db/services/productService";
import { CreateProductDTO, UpdateProductDTO, SearchProductDTO } from "../../dto/product.dto";
import { Product } from "../../interfaces";
import * as mapper from "./mapper";

export const create = async (payload: CreateProductDTO): Promise<Product> => {
  
  // check payload data
  if (typeof payload.name === 'undefined' || payload.name=="") throw new Error('name cannot be empty');
  if (typeof payload.price === 'undefined' || payload.price.toString()=="") throw new Error('price cannot be empty');
  if (typeof payload.quantity === 'undefined' || payload.quantity.toString()=="") throw new Error('quantity cannot be empty');
  if (isNaN(Number(payload.price))) throw new Error('price must be a number');
  if (isNaN(Number(payload.quantity))) throw new Error('quantity must be a number');
  if (!Number.isInteger(Number(payload.quantity))) throw new Error('quantity must be a integer');

  return mapper.toProduct(await service.create(payload));
};

export const update = async (
  id: number,
  payload: UpdateProductDTO
): Promise<Product> => {
  return mapper.toProduct(await service.update(id, payload));
};

export const getById = async (id: number): Promise<Product> => {
  return mapper.toProduct(await service.getById(id));
};

export const deleteById = async (id: number): Promise<Boolean> => {
  const isDeleted = await service.deleteById(id);
  return isDeleted;
};

export const getAll = async (): Promise<Product[]> => {
  return (await service.getAll()).map(mapper.toProduct);
};

export const search = async (payload: SearchProductDTO): Promise<Product[]> => {
  return (await service.search(payload)).map(mapper.toProduct);
};
