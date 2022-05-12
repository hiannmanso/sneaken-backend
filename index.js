import express from 'express';
import dotenv from 'dotenv';
import chalk from 'chalk';

import productsRouter from './Routers/productsRouter.js';
import signInRouter from './Routers/signInRouter.js';
import signUpRouter from './Routers/signUpRouter.js';
import mySneakersRouter from './Routers/mySneakersRouter.js';

dotenv.config();
const app = express();
app.use(express.json());
app.use(signUpRouter);
app.use(signInRouter);
app.use(productsRouter);
app.use(mySneakersRouter);

app.listen(process.env.PORT, () => {
	console.log(
		chalk.bold.green(`BackEND aberto na porta ${process.env.PORT}`)
	);
});
