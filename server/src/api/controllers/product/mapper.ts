import { Product } from "../../interfaces";
import { ProductOuput } from "../../../db/models/product";

export const toProduct = (product: ProductOuput): Product => {
  return {
    id: product.id,
    name: product.name,
    price: product.price,
    quantity: product.quantity,
  };
};
