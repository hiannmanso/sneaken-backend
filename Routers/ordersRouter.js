import express from 'express';
import { ordersPOST } from '../Controllers/ordersController.js';

const ordersRouter = express.Router();
ordersRouter.post('/orders', ordersPOST);

export default ordersRouter;