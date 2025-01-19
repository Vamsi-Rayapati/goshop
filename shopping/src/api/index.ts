import { Router } from 'express';
import productsRouter from './products';

const mainRouter = Router();

mainRouter.use('/products', productsRouter);

export default mainRouter;
