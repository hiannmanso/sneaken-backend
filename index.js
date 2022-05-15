import express from 'express';
import dotenv from 'dotenv';
import chalk from 'chalk';
import cors from 'cors';

import signInRouter from './Routers/signInRouter.js';
import signUpRouter from './Routers/signUpRouter.js';
import mySneakersRouter from './Routers/mySneakersRouter.js';
import productsRouter from './Routers/productsRouter.js';
import ordersRouter from './Routers/ordersRouter.js';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(signUpRouter);
app.use(signInRouter);
app.use(mySneakersRouter);
app.use(productsRouter);
app.use(ordersRouter);

app.listen(process.env.PORT, () => {
	console.log(
		chalk.bold.green(`BackEND aberto na porta ${process.env.PORT}`)
	);
});
