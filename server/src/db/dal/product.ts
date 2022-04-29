import { Op } from "sequelize";
import { Product } from "../models";
import { ProductInput, ProductOuput, ProductSearch } from "../models/product";

export const create = async (payload: ProductInput): Promise<ProductOuput> => {
  const product = await Product.create(payload);
  return product;
};

export const update = async (
  id: number,
  payload: Partial<ProductInput>
): Promise<ProductOuput> => {
  const product = await Product.findByPk(id);
  if (!product) {
    // @todo throw custom error
    throw new Error("not found");
  }
  const updatedProduct = await (product as Product).update(payload);
  return updatedProduct;
};

export const getById = async (id: number): Promise<ProductOuput> => {
  const product = await Product.findByPk(id);
  if (!product) {
    // @todo throw custom error
    throw new Error("not found");
  }
  return product;
};

export const deleteById = async (id: number): Promise<boolean> => {
  const deletedProductCount = await Product.destroy({
    where: { id },
  });
  return !!deletedProductCount;
};

export const getAll = async (): Promise<ProductOuput[]> => {
  return Product.findAll();
};

export const search = async (payload: ProductSearch): Promise<ProductOuput[]> => {

  let findoptions: any = {where: {}};

  if (typeof payload.name !== 'undefined' && payload.name != '') findoptions.where['name'] = {[Op.like]: `%${payload.name as string}%`};

  const findoptionsbuilder = (key:string,op:string,value:number) => {
    switch (op) {
      case '=':
        findoptions.where[key] = {[Op.eq]: value};
        break;
      case '<':
        findoptions.where[key] = {[Op.lt]: value};
        break;
      case '>':
        findoptions.where[key] = {[Op.gt]: value};
        break;
      case '<=':
        findoptions.where[key] = {[Op.lte]: value};
        break;
      case '>=':
        findoptions.where[key] = {[Op.gte]: value};
        break;
      case '!=':
        findoptions.where[key] = {[Op.ne]: value};
        break;
      default:
        throw new Error(`operator "${op}" is not a valid operator (=,>,<,<=,>=,!=)`);
    }
  };

  if (typeof payload.price !== 'undefined') {
    findoptionsbuilder('price',payload.price.operator,payload.price.value);
  }
  if (typeof payload.quantity !== 'undefined') {
    findoptionsbuilder('quantity',payload.quantity.operator,payload.quantity.value);
  }
  if (typeof payload.id !== 'undefined') {
    findoptionsbuilder('id',payload.id.operator,payload.id.value);
  }

  return Product.findAll(findoptions);

};
