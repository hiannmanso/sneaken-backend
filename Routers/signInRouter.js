import express from 'express';
import { signInGET, signInPOST } from '../Controllers/signInController.js';
import validSignIN from '../Middlewares/validSignIN.js';

const signInRouter = express.Router();
signInRouter.post('/sign_in', validSignIN, signInPOST);
signInRouter.get('/sign_in', signInGET);

export default signInRouter;
