import * as productDal from "../dal/product";
import { ProductInput, ProductOuput, ProductSearch } from "../models/product";

export const create = (payload: ProductInput): Promise<ProductOuput> => {
  return productDal.create(payload);
};

export const update = (
  id: number,
  payload: Partial<ProductOuput>
): Promise<ProductOuput> => {
  return productDal.update(id, payload);
};

export const getById = (id: number): Promise<ProductOuput> => {
  return productDal.getById(id);
};
export const deleteById = (id: number): Promise<boolean> => {
  return productDal.deleteById(id);
};
export const getAll = (): Promise<ProductOuput[]> => {
  return productDal.getAll();
};

export const search = (payload: ProductSearch): Promise<ProductOuput[]> => {
  return productDal.search(payload);
};
