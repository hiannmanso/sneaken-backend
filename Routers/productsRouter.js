import express from 'express';
import { productsGET, productsPOST } from '../Controllers/productsController.js';
import { validProducts } from '../Middlewares/validProducts.js';

const productsRouter = express.Router();
productsRouter.post('/products', validProducts, productsPOST);
productsRouter.get('/products', productsGET);
export default productsRouter;