import express from 'express';
import {
	mySneakersDELETE,
	mySneakersGET,
	mySneakersPOST,
} from '../Controllers/mySneakersController.js';
import validRequestMySneakers from '../Middlewares/validRequestMySneakers.js';

const mySneakersRouter = express.Router();

mySneakersRouter.post('/my_sneakers', validRequestMySneakers, mySneakersPOST);
mySneakersRouter.get('/my_sneakers', mySneakersGET);
mySneakersRouter.delete('/my_sneakers', mySneakersDELETE);
//mySneakersRouter.put('/my_sneakers', mySneakersPUT);

export default mySneakersRouter;
