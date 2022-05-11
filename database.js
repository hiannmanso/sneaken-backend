import { MongoClient } from 'mongodb';
import chalk from 'chalk';
import dotenv from 'dotenv';

dotenv.config();
let database = null;
const mongocliente = new MongoClient(process.env.MONGO_URL);
try {
	await mongocliente.connect();
	database = mongocliente.db('sneaken');
	console.log(chalk.bold.red('Connected to database!'));
} catch (err) {
	console.log(err);
}

export default database;
