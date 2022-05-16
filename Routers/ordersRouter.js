import express from 'express';
import { ordersPOST } from '../Controllers/ordersController.js';
import validOrder from '../Middlewares/validOrder.js';

const ordersRouter = express.Router();
ordersRouter.post('/orders',validOrder, ordersPOST);

export default ordersRouter;