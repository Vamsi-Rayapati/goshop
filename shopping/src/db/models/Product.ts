import { DataTypes, Model, Optional } from 'sequelize';
import { IProduct } from '../../api/products/types';
import sequelize from '..';

type ProductCreationAttributes = Optional<IProduct, 'productId'>;

class Product extends Model<IProduct, ProductCreationAttributes> implements IProduct {
  productId: string;

  name: string;

  description: string;

  price: number;

  quantity: number;

  category: string;

  images: string[];
}

Product.init(
  {
    productId: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    images: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'products',

  },
);

export default Product;
