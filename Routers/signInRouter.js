import express from 'express';
import {
	signInGET,
	signInPOST,
	signInPUT,
} from '../Controllers/signInController.js';
import validSignIN from '../Middlewares/validSignIN.js';

const signInRouter = express.Router();
signInRouter.post('/sign_in', validSignIN, signInPOST);
signInRouter.get('/sign_in', signInGET);
signInRouter.put('/sign_in', signInPUT);

export default signInRouter;
