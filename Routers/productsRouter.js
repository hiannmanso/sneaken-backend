import express from 'express';
import { productsGET, productsPOST } from '../Controllers/productsController.js';

const productsRouter = express.Router();
productsRouter.post('/products', productsPOST);
productsRouter.get('/products', productsGET);

export default productsRouter;