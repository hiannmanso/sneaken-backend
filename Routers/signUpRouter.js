import express from 'express';
import { signUpGET, signUpPOST } from '../Controllers/signUpController.js';
import validSignUP from '../Middlewares/validSignUP.js';

const signUpRouter = express.Router();

signUpRouter.post('/sign_up', validSignUP, signUpPOST);
signUpRouter.get('/sign_up', signUpGET);

export default signUpRouter;
