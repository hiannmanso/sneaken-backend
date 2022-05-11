import express from 'express';
import { signInGET, signInPOST } from '../Controllers/signInController.js';

const signInRouter = express.Router();
signInRouter.post('/sign_in', signInPOST);
signInRouter.get('/sign_in', signInGET);

export default signInRouter;
