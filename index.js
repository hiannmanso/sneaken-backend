import express from 'express';
import dotenv from 'dotenv';
import chalk from 'chalk';

import signInRouter from './Router/signInRouter.js';

dotenv.config();
const app = express();
app.use(express.json());
app.get('/', (req, res) => {
    res.send("app no ar");
});
app.listen(process.env.PORT, () => {
	console.log(
		chalk.bold.green(`BackEND aberto na porta ${process.env.PORT}`)
	);
});
