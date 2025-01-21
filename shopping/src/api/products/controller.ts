import { Request, Response } from 'express';
import service from './service';
import validate from '../base/validation/validate';
import { Product } from './models';
import gaurd from '../base/error/gaurd';
import UploadClient from '../base/aws/UploadClient';

async function getProducts(req: Request, res: Response): Promise<void> {
  const products = await service.getProducts();
  res.json({ products });
}

async function getProduct(req: Request, res: Response): Promise<void> {
  const { productId } = req.params;
  const product = await service.getProduct(productId);
  res.json(product);
}

async function addProduct(req: Request, res: Response): Promise<void> {
  const newProduct = await validate(Product, req.body);
  const product = await service.addProduct(newProduct);
  res.json(product);
}

async function updateProduct(req: Request, res: Response): Promise<void> {
  const { productId } = req.params;
  const newProduct = await validate(Product, req.body);
  const product = await service.updateProduct(productId, newProduct);
  res.json(product);
}

async function deleteProduct(req: Request, res: Response): Promise<void> {
  const { productId } = req.params;
  const product = await service.deleteProduct(productId);
  res.json(product);
}

async function uploadImage(req: Request, res: Response): Promise<void> {
  const { file } = req;
  if (!file) {
    throw new Error('No file provided');
  }
  const upload = new UploadClient({
    Bucket: 'micro-shopping-bucket',
    Key: `images/${file?.originalname}`,
    ACL: 'public-read',
    file,
  });

  const uploadRes = await upload.done();

  res.status(200);
}

export default {
  getProducts: gaurd(getProducts),
  getProduct: gaurd(getProduct),
  addProduct: gaurd(addProduct),
  updateProduct: gaurd(updateProduct),
  deleteProduct: gaurd(deleteProduct),
  uploadImage: gaurd(uploadImage),
};
