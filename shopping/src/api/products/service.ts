import Product from '../../db/models/Product';
import { NotFoundError } from '../base/error/models';
import { IProduct } from './types';

async function getProducts() {
  const products = await Product.findAll({ raw: true });
  return products;
}

async function getProduct(productID: string) {
  const product = await Product.findOne({
    raw: true,
    where: {
      productId: productID,
    },
  });

  if (!product) {
    throw new NotFoundError('Product not found');
  }
  return product;
}

async function addProduct(newProduct: IProduct) {
  const product = await Product.create(newProduct);
  return product;
}

async function updateProduct(productID: string, updatedProduct: IProduct) {
  const product = await Product.update(updatedProduct, { where: { productId: productID } });
  return product;
}

async function deleteProduct(productID: string) {
  const product = await Product.destroy({ where: { productId: productID } });
  return product;
}

export default {
  getProducts,
  getProduct,
  addProduct,
  updateProduct,
  deleteProduct,
};
