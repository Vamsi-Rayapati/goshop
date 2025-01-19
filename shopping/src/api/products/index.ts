import { Router } from 'express';
import productController from './controller';

const productsRouter = Router();

productsRouter.get('/', productController.getProducts);
productsRouter.post('/', productController.addProduct);
productsRouter.get('/:productId', productController.getProduct);
productsRouter.patch('/:productId', productController.updateProduct);
productsRouter.delete('/:productId', productController.deleteProduct);

export default productsRouter;
