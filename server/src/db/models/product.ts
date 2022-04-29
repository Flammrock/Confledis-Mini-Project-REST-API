import { DataTypes, Model, Optional } from "sequelize";
import sequelizeConnection from "../config";

interface ProductAttributes {
  id: number;
  name: string;
  price: number;
  quantity: number;
}
export interface ProductInput extends Optional<ProductAttributes, "id"> {}
export interface ProductOuput extends Required<ProductAttributes> {}

export type ProductNumberCompare = {
  operator: string;
  value: number;
};

export type ProductSearch = {
  id?: ProductNumberCompare;
  name?: string;
  price?: ProductNumberCompare;
  quantity?: ProductNumberCompare;
};


export class Product
  extends Model<ProductAttributes, ProductInput>
  implements ProductAttributes
{
  public id!: number;
  public name!: string;
  public price!: number;
  public quantity!: number;
}

Product.init(
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize: sequelizeConnection,
  }
);
