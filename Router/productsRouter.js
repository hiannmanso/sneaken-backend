import express from 'express';
import { productsPOST } from '../Controllers/productsController.js';

const productsRouter = express.Router();
productsRouter.post('/products', productsPOST);

export default productsRouter;